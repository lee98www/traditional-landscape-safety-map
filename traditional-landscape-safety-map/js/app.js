// ===================================
// Traditional Landscape Safety Map
// Main Application JavaScript
// ===================================

// ===================================
// Application State
// ===================================
const AppState = {
    currentPage: 'main',
    selectedSite: null,
    searchQuery: '',
    activeFilter: 'all',
    darkMode: false,
    sites: []
};

// ===================================
// Mock Data - Sample Sites
// ===================================
const MOCK_SITES = [
    {
        id: 1,
        name: '창덕궁 후원',
        category: 'palace',
        location: '서울시 종로구',
        managementNumber: 'CDP-2024-001',
        status: 'warning',
        statusText: '점검 필요',
        description: '창덕궁 후원의 전통 조경 및 석조물',
        registeredDate: '2024-01-15',
        lastInspection: '2024-11-20',
        disasterCount: 3,
        repairCount: 2,
        inspectionCount: 12,
        image: 'https://images.unsplash.com/photo-1545893794-c2b0fb6b5c42?w=400&h=300&fit=crop'
    },
    {
        id: 2,
        name: '경복궁 경회루',
        category: 'palace',
        location: '서울시 종로구',
        managementNumber: 'GBP-2024-002',
        status: 'safe',
        statusText: '정상',
        description: '경복궁 경회루 연못 및 주변 조경',
        registeredDate: '2024-02-01',
        lastInspection: '2024-11-18',
        disasterCount: 1,
        repairCount: 5,
        inspectionCount: 15,
        image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=400&h=300&fit=crop'
    },
    {
        id: 3,
        name: '불국사 석가탑',
        category: 'temple',
        location: '경북 경주시',
        managementNumber: 'BGS-2024-003',
        status: 'safe',
        statusText: '정상',
        description: '불국사 경내 석조물 및 조경',
        registeredDate: '2024-01-20',
        lastInspection: '2024-11-10',
        disasterCount: 0,
        repairCount: 3,
        inspectionCount: 8,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop'
    },
    {
        id: 4,
        name: '소쇄원',
        category: 'garden',
        location: '전남 담양군',
        managementNumber: 'SSW-2024-004',
        status: 'safe',
        statusText: '정상',
        description: '조선시대 대표 별서정원',
        registeredDate: '2024-03-05',
        lastInspection: '2024-11-15',
        disasterCount: 2,
        repairCount: 4,
        inspectionCount: 10,
        image: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=300&fit=crop'
    },
    {
        id: 5,
        name: '종묘 정전',
        category: 'palace',
        location: '서울시 종로구',
        managementNumber: 'JMJ-2024-005',
        status: 'safe',
        statusText: '정상',
        description: '종묘 정전 주변 전통 조경',
        registeredDate: '2024-02-15',
        lastInspection: '2024-11-15',
        disasterCount: 0,
        repairCount: 1,
        inspectionCount: 11,
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop'
    },
    {
        id: 6,
        name: '해인사 장경판전',
        category: 'temple',
        location: '경남 합천군',
        managementNumber: 'HJS-2024-006',
        status: 'safe',
        statusText: '정상',
        description: '해인사 장경판전 주변 조경',
        registeredDate: '2024-03-20',
        lastInspection: '2024-11-05',
        disasterCount: 1,
        repairCount: 2,
        inspectionCount: 7,
        image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=400&h=300&fit=crop'
    },
    {
        id: 7,
        name: '양산보 정원',
        category: 'garden',
        location: '전북 완주군',
        managementNumber: 'YSB-2024-007',
        status: 'warning',
        statusText: '점검 필요',
        description: '조선시대 양반가 정원',
        registeredDate: '2024-04-10',
        lastInspection: '2024-10-28',
        disasterCount: 2,
        repairCount: 1,
        inspectionCount: 6,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
        id: 8,
        name: '부석사 무량수전',
        category: 'temple',
        location: '경북 영주시',
        managementNumber: 'BSS-2024-008',
        status: 'safe',
        statusText: '정상',
        description: '부석사 경내 전통 조경',
        registeredDate: '2024-04-25',
        lastInspection: '2024-11-12',
        disasterCount: 0,
        repairCount: 3,
        inspectionCount: 9,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop'
    }
];

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Traditional Landscape Safety Map - Initializing...');

    // Initialize app state
    AppState.sites = MOCK_SITES;

    // Setup event listeners
    setupNavigation();
    setupSearch();
    setupFilters();
    setupDarkMode();

    // Render initial content
    renderSiteGrid();

    // Check for saved preferences
    loadUserPreferences();

    console.log('Application initialized successfully');
});

// ===================================
// Navigation
// ===================================
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(pageName) {
    // Update state
    AppState.currentPage = pageName;

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === pageName) {
            btn.classList.add('active');
        }
    });

    // Update page visibility
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToHistory() {
    navigateToPage('history');
}

// ===================================
// Search Functionality
// ===================================
function setupSearch() {
    const searchInput = document.getElementById('siteSearch');
    const searchClear = document.getElementById('searchClear');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        AppState.searchQuery = e.target.value;

        // Show/hide clear button
        if (e.target.value) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
        }

        // Filter and render sites
        filterAndRenderSites();
    });

    if (searchClear) {
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            AppState.searchQuery = '';
            searchClear.style.display = 'none';
            filterAndRenderSites();
            searchInput.focus();
        });
    }
}

// ===================================
// Filter Functionality
// ===================================
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update state and render
            AppState.activeFilter = filter;
            filterAndRenderSites();
        });
    });
}

function filterAndRenderSites() {
    let filteredSites = [...AppState.sites];

    // Apply category filter
    if (AppState.activeFilter !== 'all') {
        filteredSites = filteredSites.filter(site =>
            site.category === AppState.activeFilter
        );
    }

    // Apply search filter
    if (AppState.searchQuery) {
        const query = AppState.searchQuery.toLowerCase();
        filteredSites = filteredSites.filter(site =>
            site.name.toLowerCase().includes(query) ||
            site.location.toLowerCase().includes(query) ||
            site.managementNumber.toLowerCase().includes(query) ||
            site.description.toLowerCase().includes(query)
        );
    }

    renderSiteGrid(filteredSites);
}

// ===================================
// Site Grid Rendering
// ===================================
function renderSiteGrid(sites = AppState.sites) {
    const gridContainer = document.getElementById('siteGrid');

    if (!gridContainer) return;

    if (sites.length === 0) {
        gridContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
                <svg style="width: 64px; height: 64px; margin: 0 auto 1rem; color: var(--text-tertiary);" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path d="M12 8v4m0 4h.01" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">검색 결과가 없습니다</h3>
                <p style="color: var(--text-tertiary); font-size: 0.875rem;">다른 검색어나 필터를 시도해보세요</p>
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = sites.map(site => createSiteCard(site)).join('');

    // Add click listeners to site cards
    const siteCards = gridContainer.querySelectorAll('.site-card');
    siteCards.forEach((card, index) => {
        card.addEventListener('click', () => openSiteDetail(sites[index]));
    });
}

function createSiteCard(site) {
    const statusClass = site.status === 'warning' ? 'warning' : 'safe';
    const statusColor = site.status === 'warning' ? '#F59E0B' : '#10B981';

    return `
        <div class="site-card" data-site-id="${site.id}">
            <div class="site-card-image" style="background-image: url('${site.image}'); background-size: cover; background-position: center;">
            </div>
            <div class="site-card-content">
                <div class="site-card-header">
                    <h3 class="site-card-title">${site.name}</h3>
                    <span class="site-card-badge" style="background-color: ${statusColor};">
                        ${site.statusText}
                    </span>
                </div>
                <div class="site-card-info">
                    <div class="site-card-info-item">
                        <svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 2a4 4 0 00-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 00-4-4zm0 5.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                        </svg>
                        ${site.location}
                    </div>
                    <div class="site-card-info-item">
                        <svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2 2h12a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm1 2v8h10V4H3z"/>
                        </svg>
                        ${site.managementNumber}
                    </div>
                    <div class="site-card-info-item">
                        <svg class="icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm1 9H7V5h2v6z"/>
                        </svg>
                        최근 점검: ${site.lastInspection}
                    </div>
                </div>
                <div class="site-card-stats">
                    <div class="site-card-stat">
                        <div class="site-card-stat-value">${site.disasterCount}</div>
                        <div class="site-card-stat-label">재해</div>
                    </div>
                    <div class="site-card-stat">
                        <div class="site-card-stat-value">${site.repairCount}</div>
                        <div class="site-card-stat-label">수리</div>
                    </div>
                    <div class="site-card-stat">
                        <div class="site-card-stat-value">${site.inspectionCount}</div>
                        <div class="site-card-stat-label">점검</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// Modal Functionality
// ===================================
function openSiteDetail(site) {
    AppState.selectedSite = site;

    const modal = document.getElementById('siteDetailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (!modal || !modalTitle || !modalBody) return;

    // Update modal content
    modalTitle.textContent = site.name;
    modalBody.innerHTML = createSiteDetailContent(site);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Setup tab navigation
    setupDetailTabs();
}

function closeModal() {
    const modal = document.getElementById('siteDetailModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function createSiteDetailContent(site) {
    return `
        <div class="detail-tabs">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="info">기본 정보</button>
                <button class="tab-btn" data-tab="disaster">재해 이력</button>
                <button class="tab-btn" data-tab="repair">수리 이력</button>
            </div>

            <div class="tab-content active" id="tab-info">
                <div class="detail-section">
                    <img src="${site.image}" alt="${site.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">

                    <div class="detail-grid">
                        <div class="detail-item">
                            <label class="detail-label">대상지명</label>
                            <div class="detail-value">${site.name}</div>
                        </div>
                        <div class="detail-item">
                            <label class="detail-label">관리번호</label>
                            <div class="detail-value">${site.managementNumber}</div>
                        </div>
                        <div class="detail-item">
                            <label class="detail-label">위치</label>
                            <div class="detail-value">${site.location}</div>
                        </div>
                        <div class="detail-item">
                            <label class="detail-label">상태</label>
                            <div class="detail-value">
                                <span class="status-badge status-${site.status}">${site.statusText}</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <label class="detail-label">등록일</label>
                            <div class="detail-value">${site.registeredDate}</div>
                        </div>
                        <div class="detail-item">
                            <label class="detail-label">최근 점검일</label>
                            <div class="detail-value">${site.lastInspection}</div>
                        </div>
                    </div>

                    <div class="detail-item" style="margin-top: var(--spacing-lg);">
                        <label class="detail-label">설명</label>
                        <div class="detail-value">${site.description}</div>
                    </div>

                    <div class="detail-stats" style="margin-top: var(--spacing-xl);">
                        <div class="stat-box">
                            <div class="stat-box-value">${site.disasterCount}</div>
                            <div class="stat-box-label">총 재해 이력</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">${site.repairCount}</div>
                            <div class="stat-box-label">총 수리 이력</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-box-value">${site.inspectionCount}</div>
                            <div class="stat-box-label">총 점검 횟수</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="tab-disaster">
                <div class="detail-section">
                    <h4 style="margin-bottom: var(--spacing-md);">재해 발생 이력</h4>
                    ${createDisasterHistory(site)}
                </div>
            </div>

            <div class="tab-content" id="tab-repair">
                <div class="detail-section">
                    <h4 style="margin-bottom: var(--spacing-md);">수리 및 보수 이력</h4>
                    ${createRepairHistory(site)}
                </div>
            </div>
        </div>

        <style>
            .tab-buttons {
                display: flex;
                gap: var(--spacing-sm);
                border-bottom: 2px solid var(--border-light);
                margin-bottom: var(--spacing-lg);
            }

            .tab-btn {
                padding: var(--spacing-md) var(--spacing-lg);
                font-weight: var(--font-weight-medium);
                color: var(--text-secondary);
                border-bottom: 2px solid transparent;
                margin-bottom: -2px;
                transition: all var(--transition-fast);
            }

            .tab-btn:hover {
                color: var(--text-primary);
            }

            .tab-btn.active {
                color: var(--color-primary);
                border-bottom-color: var(--color-primary);
            }

            .tab-content {
                display: none;
            }

            .tab-content.active {
                display: block;
                animation: fadeIn 0.3s ease-in-out;
            }

            .detail-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: var(--spacing-lg);
            }

            .detail-item {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-xs);
            }

            .detail-label {
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-medium);
                color: var(--text-secondary);
            }

            .detail-value {
                font-size: var(--font-size-base);
                color: var(--text-primary);
                font-weight: var(--font-weight-medium);
            }

            .status-badge {
                display: inline-block;
                padding: var(--spacing-xs) var(--spacing-sm);
                border-radius: var(--radius-sm);
                font-size: var(--font-size-sm);
                font-weight: var(--font-weight-medium);
            }

            .status-badge.status-safe {
                background-color: rgba(16, 185, 129, 0.1);
                color: var(--color-success);
            }

            .status-badge.status-warning {
                background-color: rgba(245, 158, 11, 0.1);
                color: var(--color-warning);
            }

            .detail-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--spacing-md);
            }

            .stat-box {
                background-color: var(--bg-secondary);
                padding: var(--spacing-lg);
                border-radius: var(--radius-md);
                text-align: center;
            }

            .stat-box-value {
                font-size: var(--font-size-3xl);
                font-weight: var(--font-weight-bold);
                color: var(--color-primary);
                margin-bottom: var(--spacing-xs);
            }

            .stat-box-label {
                font-size: var(--font-size-sm);
                color: var(--text-secondary);
            }

            .timeline {
                position: relative;
                padding-left: var(--spacing-lg);
            }

            .timeline::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background-color: var(--border-light);
            }

            .timeline-item {
                position: relative;
                padding-bottom: var(--spacing-lg);
            }

            .timeline-item::before {
                content: '';
                position: absolute;
                left: -22px;
                top: 4px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: var(--color-primary);
                border: 2px solid var(--bg-primary);
            }

            .timeline-date {
                font-size: var(--font-size-sm);
                color: var(--text-tertiary);
                margin-bottom: var(--spacing-xs);
            }

            .timeline-title {
                font-weight: var(--font-weight-medium);
                color: var(--text-primary);
                margin-bottom: var(--spacing-xs);
            }

            .timeline-desc {
                font-size: var(--font-size-sm);
                color: var(--text-secondary);
            }
        </style>
    `;
}

function createDisasterHistory(site) {
    const disasters = [
        { date: '2024-11-20', title: '낙석 발생', desc: '강풍으로 인한 석조물 일부 낙석', severity: 'high' },
        { date: '2024-08-15', title: '침수 피해', desc: '집중호우로 인한 일부 지역 침수', severity: 'medium' },
        { date: '2024-03-10', title: '동파 발생', desc: '한파로 인한 수도 시설 동파', severity: 'low' }
    ];

    if (site.disasterCount === 0) {
        return '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">재해 이력이 없습니다.</p>';
    }

    return `
        <div class="timeline">
            ${disasters.slice(0, site.disasterCount).map(disaster => `
                <div class="timeline-item">
                    <div class="timeline-date">${disaster.date}</div>
                    <div class="timeline-title">${disaster.title}</div>
                    <div class="timeline-desc">${disaster.desc}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function createRepairHistory(site) {
    const repairs = [
        { date: '2024-10-05', title: '석조물 보수', desc: '낙석 부위 복원 및 보강 작업 완료', status: '완료' },
        { date: '2024-07-20', title: '배수로 정비', desc: '침수 방지를 위한 배수 시설 개선', status: '완료' },
        { date: '2024-05-15', title: '정기 점검', desc: '전체 시설물 안전 점검 실시', status: '완료' }
    ];

    if (site.repairCount === 0) {
        return '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">수리 이력이 없습니다.</p>';
    }

    return `
        <div class="timeline">
            ${repairs.slice(0, site.repairCount).map(repair => `
                <div class="timeline-item">
                    <div class="timeline-date">${repair.date}</div>
                    <div class="timeline-title">${repair.title}</div>
                    <div class="timeline-desc">${repair.desc}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function setupDetailTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Update active content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabName}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ===================================
// Dark Mode
// ===================================
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');

    if (!darkModeToggle) return;

    darkModeToggle.addEventListener('change', function(e) {
        AppState.darkMode = e.target.checked;

        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('darkMode', 'true');
            showToast('다크 모드가 활성화되었습니다');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('darkMode', 'false');
            showToast('라이트 모드로 전환되었습니다');
        }
    });
}

// ===================================
// Toast Notifications
// ===================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ===================================
// User Preferences
// ===================================
function loadUserPreferences() {
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) darkModeToggle.checked = true;
        AppState.darkMode = true;
    }
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Keyboard Shortcuts
// ===================================
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        closeModal();
    }

    // Ctrl/Cmd + K focuses search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('siteSearch');
        if (searchInput) {
            navigateToHistory();
            setTimeout(() => searchInput.focus(), 100);
        }
    }
});

// ===================================
// Export functions for global access
// ===================================
window.navigateToHistory = navigateToHistory;
window.closeModal = closeModal;
window.showToast = showToast;

console.log('App.js loaded successfully');
