/**
 * 공통 사이드바 HTML 생성 함수
 * @param {string} currentPage - 현재 활성화할 페이지 ('dashboard', 'history', 'inspection')
 * @returns {string} 사이드바 HTML
 */
function getCommonSidebarHTML(currentPage) {
  return `
    <div class="sidebar">
      <ul class="sidebar__menu">
        <li class="sidebar__item">
          <a href="dashboard.html" class="sidebar__link ${currentPage === 'dashboard' ? 'sidebar__link--active' : ''}">
            🏠 대시보드
          </a>
        </li>
        <li class="sidebar__item">
          <a href="site-selection.html" class="sidebar__link ${currentPage === 'history' ? 'sidebar__link--active' : ''}">
            📋 안전 관리 이력 조회
          </a>
        </li>
        <li class="sidebar__item">
          <a href="inspection-site-selection.html" class="sidebar__link ${currentPage === 'inspection' ? 'sidebar__link--active' : ''}">
            ✓ 안전 점검 실시
          </a>
        </li>
      </ul>
    </div>
  `;
}

// 페이지 로드 시 사이드바 자동 렌더링 (data-sidebar 속성이 있는 요소에)
document.addEventListener('DOMContentLoaded', function() {
  const sidebarPlaceholder = document.querySelector('[data-sidebar]');
  if (sidebarPlaceholder) {
    const currentPage = sidebarPlaceholder.getAttribute('data-sidebar');
    sidebarPlaceholder.innerHTML = getCommonSidebarHTML(currentPage);
  }
});
