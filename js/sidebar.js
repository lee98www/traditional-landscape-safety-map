/**
 * Sidebar Navigation Component
 * 사이드바 네비게이션 초기화 및 동작 관리
 */

// 사이드바 HTML 생성
function renderSidebar(currentPage = '') {
  return `
    <div class="sidebar">
      <ul class="sidebar__menu">
        <li class="sidebar__item">
          <a href="dashboard.html" class="sidebar__link ${currentPage === 'dashboard' ? 'sidebar__link--active' : ''}">
            <span>🏠 대시보드</span>
          </a>
        </li>
        <li class="sidebar__item sidebar__item--expandable ${currentPage.startsWith('history') ? 'sidebar__item--expanded' : ''}" id="historyMenu">
          <div class="sidebar__link">
            <span>📋 안전 관리 이력</span>
            <span class="sidebar__expand-icon">▶</span>
          </div>
          <ul class="sidebar__submenu">
            <li><a href="safety-history-info.html" class="sidebar__sublink ${currentPage === 'history-info' ? 'sidebar__sublink--active' : ''}">일반 정보</a></li>
            <li><a href="safety-history-disaster.html" class="sidebar__sublink ${currentPage === 'history-disaster' ? 'sidebar__sublink--active' : ''}">재해 이력</a></li>
            <li><a href="safety-history-repair.html" class="sidebar__sublink ${currentPage === 'history-repair' ? 'sidebar__sublink--active' : ''}">수리 이력</a></li>
            <li><a href="safety-history-environment.html" class="sidebar__sublink ${currentPage === 'history-environment' ? 'sidebar__sublink--active' : ''}">환경 관리</a></li>
          </ul>
        </li>
        <li class="sidebar__item sidebar__item--expandable ${currentPage.startsWith('inspection') ? 'sidebar__item--expanded' : ''}" id="inspectionMenu">
          <div class="sidebar__link">
            <span>✓ 안전 점검</span>
            <span class="sidebar__expand-icon">▶</span>
          </div>
          <ul class="sidebar__submenu">
            <li><a href="inspection-site-selection.html" class="sidebar__sublink ${currentPage === 'inspection-site' ? 'sidebar__sublink--active' : ''}">점검 실시</a></li>
            <li><a href="inspection-result.html" class="sidebar__sublink ${currentPage === 'inspection-result' ? 'sidebar__sublink--active' : ''}">점검 결과</a></li>
            <li><a href="inspection-report-preview.html" class="sidebar__sublink ${currentPage === 'inspection-report' ? 'sidebar__sublink--active' : ''}">보고서 관리</a></li>
          </ul>
        </li>
      </ul>
    </div>
  `;
}

// 사이드바 확장/축소 기능 초기화
function initSidebar() {
  const expandableItems = document.querySelectorAll('.sidebar__item--expandable');

  expandableItems.forEach(item => {
    const link = item.querySelector('.sidebar__link');

    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Toggle current item
      item.classList.toggle('sidebar__item--expanded');

      // Close other expanded items (optional - comment out for multi-open)
      expandableItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('sidebar__item--expanded');
        }
      });
    });
  });
}

// 사이드바 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
});
