const fs = require('fs');

const screens = JSON.parse(fs.readFileSync('extracted_screens.json', 'utf8'));

// Common styles
const commonStyles = `    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif;
      background-color: #EAF2FE; min-height: 100vh; display: flex; flex-direction: column;
    }
    .header {
      background-color: #FFFFFF; height: 80px; display: flex;
      align-items: center; justify-content: space-between; padding: 0 40px;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
    }
    .header__logo { font-size: 18px; font-weight: 600; color: #003E9C; text-decoration: none; }
    .page-title { font-size: 18px; font-weight: 600; color: #171719; }
    .logout-button {
      padding: 8px 16px; background-color: #EF4444; color: #FFFFFF; border: none;
      border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .main-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 60px 40px; }
    .content-box {
      width: 100%; max-width: 740px; background-color: #FFFFFF;
      border: 1.5px solid #0066FF; border-radius: 30px; padding: 40px;
    }
    .footer {
      background-color: #1A1A1A; color: #FFFFFF; padding: 32px 40px;
    }
    .footer-content { max-width: 1440px; margin: 0 auto; }
    .footer-links { display: flex; gap: 24px; margin-bottom: 16px; }
    .footer-links a { color: #CCCCCC; text-decoration: none; font-size: 14px; }
    .footer-info p { color: #999999; font-size: 13px; line-height: 1.6; }
    .footer-copyright { color: #666666; font-size: 12px; margin-top: 12px; }`;

function generateHeader(title) {
  return `  <header class="header">
    <a href="index.html" class="header__logo">전통조경 안전지도 시범서비스</a>
    <h1 class="page-title">${title}</h1>
    <button class="logout-button" onclick="window.location.href='index.html'">로그아웃</button>
  </header>`;
}

function generateFooter() {
  return `  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="#">이용안내</a>
        <a href="#">저작권정책</a>
      </div>
      <div class="footer-info">
        <p>OO시 OO구 OO로 123, OO타워 12층</p>
        <p>전화번호: 02-000-0000</p>
      </div>
      <p class="footer-copyright">© 2025.OOO SERVICE. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>`;
}

function generateHTML(title, content, additionalStyles = '') {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 전통조경 안전지도 시범서비스</title>
  <style>
${commonStyles}
${additionalStyles}
  </style>
</head>
<body>
${generateHeader(title)}
  <main class="main-container">
${content}
  </main>
${generateFooter()}
</body>
</html>
`;
}

// 1. Map Popup Screen (292:11074, 292:11480)
const mapPopupStyles = `    .map-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); display: flex;
      align-items: center; justify-content: center; z-index: 1000;
    }
    .map-popup {
      width: 90%; max-width: 1200px; height: 80vh;
      background-color: #FFFFFF; border-radius: 20px;
      overflow: hidden; display: flex; flex-direction: column;
    }
    .map-popup-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid #E5E7EB;
    }
    .map-popup-title { font-size: 20px; font-weight: 700; color: #171719; }
    .close-btn {
      width: 32px; height: 32px; border: none; background: #F3F4F6;
      border-radius: 50%; cursor: pointer; font-size: 18px;
    }
    .map-container { flex: 1; background-color: #E5E7EB; position: relative; }
    .map-placeholder {
      width: 100%; height: 100%; display: flex; align-items: center;
      justify-content: center; font-size: 18px; color: #6B7280;
    }
    .map-marker {
      position: absolute; width: 40px; height: 40px; background-color: #EF4444;
      border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4); cursor: pointer;
    }
    .map-marker::after {
      content: ''; width: 16px; height: 16px; background-color: #FFFFFF;
      border-radius: 50%; transform: rotate(45deg);
    }
    .map-info-card {
      position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
      background-color: #FFFFFF; padding: 16px 24px; border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); min-width: 300px;
    }
    .map-info-title { font-size: 18px; font-weight: 700; color: #171719; margin-bottom: 4px; }
    .map-info-address { font-size: 14px; color: #6B7280; margin-bottom: 12px; }
    .map-select-btn {
      width: 100%; padding: 12px; background-color: #0066FF; color: #FFFFFF;
      border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
    }`;

const mapPopupContent = `    <div class="map-overlay" id="mapOverlay">
      <div class="map-popup">
        <div class="map-popup-header">
          <h2 class="map-popup-title">대상지 위치 선택</h2>
          <button class="close-btn" onclick="closeMapPopup()">✕</button>
        </div>
        <div class="map-container">
          <div class="map-placeholder">
            지도 영역 (Kakao Map API 연동)
          </div>
          <div class="map-marker" style="top: 40%; left: 45%;"></div>
          <div class="map-marker" style="top: 35%; left: 55%;"></div>
          <div class="map-marker" style="top: 50%; left: 50%;"></div>
          <div class="map-info-card">
            <div class="map-info-title">주합루</div>
            <div class="map-info-address">서울 종로구 율곡로 99</div>
            <button class="map-select-btn" onclick="selectLocation()">이 위치 선택</button>
          </div>
        </div>
      </div>
    </div>
  <script>
    function closeMapPopup() {
      window.history.back();
    }
    function selectLocation() {
      window.location.href = 'inspection-target-selection.html';
    }
  </script>`;

fs.writeFileSync('map-popup.html', generateHTML('지도에서 선택', mapPopupContent, mapPopupStyles));

// 2. Disaster History Initial (43:23233 - 13 texts)
const disasterInitialStyles = `    .empty-state {
      text-align: center; padding: 60px 40px;
    }
    .empty-icon { font-size: 64px; margin-bottom: 24px; opacity: 0.5; }
    .empty-title { font-size: 20px; font-weight: 700; color: #171719; margin-bottom: 8px; }
    .empty-desc { font-size: 14px; color: #6B7280; }
    .action-buttons { display: flex; gap: 12px; justify-content: center; margin-top: 32px; }
    .btn-primary {
      padding: 12px 32px; background-color: #0066FF; color: #FFFFFF;
      border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .btn-secondary {
      padding: 12px 32px; background-color: #FFFFFF; color: #0066FF;
      border: 1.5px solid #0066FF; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
    }`;

const disasterInitialContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">재해 이력</h2>
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div class="empty-title">재해 이력이 없습니다</div>
        <div class="empty-desc">현재 등록된 재해 이력 정보가 없습니다.</div>
        <div class="action-buttons">
          <button class="btn-secondary" onclick="window.history.back()">돌아가기</button>
          <button class="btn-primary" onclick="window.location.href='safety-history-disaster.html'">이력 보기</button>
        </div>
      </div>
    </div>`;

fs.writeFileSync('disaster-history-empty.html', generateHTML('재해 이력', disasterInitialContent, disasterInitialStyles));

// 3. Disaster History Timeline (51:13323 - 7 texts)
const disasterTimelineStyles = `    .year-selector {
      display: flex; gap: 8px; margin-bottom: 24px; overflow-x: auto; padding-bottom: 8px;
    }
    .year-btn {
      padding: 8px 20px; border: 1.5px solid #E5E7EB; border-radius: 20px;
      background-color: #FFFFFF; font-size: 14px; font-weight: 500;
      color: #6B7280; cursor: pointer; white-space: nowrap;
    }
    .year-btn.active { background-color: #0066FF; color: #FFFFFF; border-color: #0066FF; }
    .timeline-visual {
      display: flex; align-items: center; gap: 4px; margin-bottom: 32px;
      padding: 20px; background-color: #F9FAFB; border-radius: 12px;
    }
    .timeline-dot {
      width: 12px; height: 12px; border-radius: 50%; background-color: #E5E7EB;
    }
    .timeline-dot.active { background-color: #EF4444; }
    .timeline-line { flex: 1; height: 2px; background-color: #E5E7EB; }`;

const disasterTimelineContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">재해 이력 타임라인</h2>
      <div class="year-selector">
        <button class="year-btn">2020</button>
        <button class="year-btn">2021</button>
        <button class="year-btn">2022</button>
        <button class="year-btn">2023</button>
        <button class="year-btn active">2024</button>
      </div>
      <div class="timeline-visual">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
        <div class="timeline-dot active"></div>
        <div class="timeline-line"></div>
        <div class="timeline-dot active"></div>
        <div class="timeline-line"></div>
        <div class="timeline-dot"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="padding: 20px; background-color: #FEF2F2; border-radius: 12px; border-left: 4px solid #EF4444;">
          <div style="font-size: 14px; color: #EF4444; font-weight: 600; margin-bottom: 4px;">2024.07.15</div>
          <div style="font-size: 16px; font-weight: 600; color: #171719;">집중호우로 인한 석축 균열</div>
        </div>
        <div style="padding: 20px; background-color: #FEF2F2; border-radius: 12px; border-left: 4px solid #EF4444;">
          <div style="font-size: 14px; color: #EF4444; font-weight: 600; margin-bottom: 4px;">2024.03.20</div>
          <div style="font-size: 16px; font-weight: 600; color: #171719;">동절기 동파 피해</div>
        </div>
      </div>
      <button onclick="window.location.href='safety-history-disaster.html'"
        style="width: 100%; margin-top: 24px; padding: 14px; background-color: #0066FF; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
        상세 이력 보기
      </button>
    </div>`;

fs.writeFileSync('disaster-history-timeline.html', generateHTML('재해 이력 타임라인', disasterTimelineContent, disasterTimelineStyles));

// 4. Repair History Detail (141:6702 - 39 texts)
const repairDetailStyles = `    .repair-detail-card {
      background-color: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 24px;
    }
    .repair-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .repair-title { font-size: 18px; font-weight: 700; color: #171719; }
    .repair-status {
      padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
    }
    .status-complete { background-color: #D1FAE5; color: #059669; }
    .status-progress { background-color: #FEF3C7; color: #D97706; }
    .repair-info { display: flex; flex-direction: column; gap: 12px; }
    .repair-row { display: flex; justify-content: space-between; }
    .repair-label { font-size: 14px; color: #6B7280; }
    .repair-value { font-size: 14px; font-weight: 500; color: #171719; }
    .photo-gallery {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px;
    }
    .photo-item {
      aspect-ratio: 1; background-color: #E5E7EB; border-radius: 8px;
      display: flex; align-items: center; justify-content: center; font-size: 24px;
    }`;

const repairDetailContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">수리 이력 상세</h2>
      <div class="repair-detail-card">
        <div class="repair-header">
          <div class="repair-title">석축 균열 보수 공사</div>
          <span class="repair-status status-complete">완료</span>
        </div>
        <div class="repair-info">
          <div class="repair-row">
            <span class="repair-label">공사 기간</span>
            <span class="repair-value">2024.08.01 ~ 2024.08.20 (20일)</span>
          </div>
          <div class="repair-row">
            <span class="repair-label">담당 업체</span>
            <span class="repair-value">전통건축보수 주식회사</span>
          </div>
          <div class="repair-row">
            <span class="repair-label">공사 비용</span>
            <span class="repair-value">15,000,000원</span>
          </div>
          <div class="repair-row">
            <span class="repair-label">담당자</span>
            <span class="repair-value">김철수 (010-1234-5678)</span>
          </div>
        </div>
      </div>
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">공사 내역</h3>
      <p style="font-size: 14px; color: #6B7280; line-height: 1.8; margin-bottom: 24px;">
        7월 집중호우로 발생한 석축 균열에 대한 정밀 조사 결과를 바탕으로
        전통 방식의 보수 공법을 적용하여 균열 부위를 완전히 보수하였습니다.
        석재 교체 5개소, 줄눈 재시공 12m, 배수로 정비 3개소를 완료하였습니다.
      </p>
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">공사 사진</h3>
      <div class="photo-gallery">
        <div class="photo-item">📷</div>
        <div class="photo-item">📷</div>
        <div class="photo-item">📷</div>
        <div class="photo-item">📷</div>
        <div class="photo-item">📷</div>
        <div class="photo-item">📷</div>
      </div>
      <button onclick="window.history.back()"
        style="width: 100%; margin-top: 24px; padding: 14px; background-color: #0066FF; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
        목록으로 돌아가기
      </button>
    </div>`;

fs.writeFileSync('repair-history-detail.html', generateHTML('수리 이력 상세', repairDetailContent, repairDetailStyles));

// 5. Inspection Target Selection Active (170:9393)
const targetActiveStyles = `    .target-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .target-card {
      padding: 24px; background-color: #F9FAFB; border: 2px solid #E5E7EB;
      border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s;
    }
    .target-card:hover { border-color: #0066FF; background-color: #FFFFFF; transform: translateY(-4px); }
    .target-card.selected { border-color: #0066FF; background-color: #EFF6FF; }
    .target-icon { font-size: 48px; margin-bottom: 12px; }
    .target-name { font-size: 16px; font-weight: 600; color: #171719; }
    .target-desc { font-size: 13px; color: #6B7280; margin-top: 8px; }
    .submit-button {
      width: 100%; margin-top: 24px; padding: 14px; background-color: #0066FF;
      color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px;
      font-weight: 600; cursor: pointer;
    }`;

const targetActiveContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">점검 대상 선택</h2>
      <p style="color: #6B7280; margin-bottom: 24px;">점검할 대상을 선택해주세요. (다중 선택 가능)</p>
      <div class="target-grid">
        <div class="target-card selected" onclick="toggleTarget(this)">
          <div class="target-icon">🪨</div>
          <div class="target-name">석축 및 옹벽</div>
          <div class="target-desc">균열, 변위, 배수 상태</div>
        </div>
        <div class="target-card" onclick="toggleTarget(this)">
          <div class="target-icon">🌳</div>
          <div class="target-name">수목</div>
          <div class="target-desc">고사, 병충해, 기울기</div>
        </div>
        <div class="target-card selected" onclick="toggleTarget(this)">
          <div class="target-icon">🏛️</div>
          <div class="target-name">건축물</div>
          <div class="target-desc">구조, 지붕, 기둥</div>
        </div>
        <div class="target-card" onclick="toggleTarget(this)">
          <div class="target-icon">🔧</div>
          <div class="target-name">편의시설</div>
          <div class="target-desc">안내판, 벤치, 조명</div>
        </div>
        <div class="target-card" onclick="toggleTarget(this)">
          <div class="target-icon">💧</div>
          <div class="target-name">배수시설</div>
          <div class="target-desc">배수로, 집수정</div>
        </div>
        <div class="target-card" onclick="toggleTarget(this)">
          <div class="target-icon">🏞️</div>
          <div class="target-name">조경시설</div>
          <div class="target-desc">연못, 정자, 담장</div>
        </div>
      </div>
      <button class="submit-button" onclick="window.location.href='inspection-general-status.html'">
        다음 단계 (2개 선택됨)
      </button>
    </div>
  <script>
    let selectedCount = 2;
    function toggleTarget(card) {
      card.classList.toggle('selected');
      selectedCount = document.querySelectorAll('.target-card.selected').length;
      document.querySelector('.submit-button').textContent = '다음 단계 (' + selectedCount + '개 선택됨)';
    }
  </script>`;

fs.writeFileSync('inspection-target-selection-active.html', generateHTML('점검 대상 선택', targetActiveContent, targetActiveStyles));

// 6. Checklist Before Selection (292:11665)
const checklistBeforeStyles = `    .checklist { display: flex; flex-direction: column; gap: 16px; }
    .checklist-item {
      padding: 20px; background-color: #F9FAFB; border-radius: 12px;
      border-left: 4px solid #E5E7EB;
    }
    .checklist-item.active { border-left-color: #0066FF; }
    .checklist-header { display: flex; justify-content: space-between; align-items: center; }
    .checklist-title { font-size: 16px; font-weight: 600; color: #171719; }
    .checklist-arrow { color: #6B7280; font-size: 20px; }`;

const checklistBeforeContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">점검항목 (석축 및 옹벽)</h2>
      <p style="color: #6B7280; margin-bottom: 24px;">점검할 세부 항목을 선택하세요.</p>
      <div class="checklist">
        <div class="checklist-item" onclick="window.location.href='inspection-checklist.html'">
          <div class="checklist-header">
            <div class="checklist-title">1. 석축의 변형 및 변위</div>
            <span class="checklist-arrow">›</span>
          </div>
        </div>
        <div class="checklist-item" onclick="window.location.href='inspection-checklist.html'">
          <div class="checklist-header">
            <div class="checklist-title">2. 균열 및 파손</div>
            <span class="checklist-arrow">›</span>
          </div>
        </div>
        <div class="checklist-item" onclick="window.location.href='inspection-checklist.html'">
          <div class="checklist-header">
            <div class="checklist-title">3. 줄눈 및 충진재</div>
            <span class="checklist-arrow">›</span>
          </div>
        </div>
        <div class="checklist-item" onclick="window.location.href='inspection-checklist.html'">
          <div class="checklist-header">
            <div class="checklist-title">4. 배수 시설</div>
            <span class="checklist-arrow">›</span>
          </div>
        </div>
        <div class="checklist-item" onclick="window.location.href='inspection-checklist.html'">
          <div class="checklist-header">
            <div class="checklist-title">5. 수목 뿌리 침투</div>
            <span class="checklist-arrow">›</span>
          </div>
        </div>
      </div>
    </div>`;

fs.writeFileSync('inspection-checklist-select.html', generateHTML('점검항목', checklistBeforeContent, checklistBeforeStyles));

// 7. Confirmation Popup (170:9595)
const confirmPopupStyles = `    .popup-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); display: flex;
      align-items: center; justify-content: center; z-index: 1000;
    }
    .popup-card {
      background-color: #FFFFFF; border-radius: 20px; padding: 40px;
      max-width: 400px; width: 90%; text-align: center;
    }
    .popup-icon { font-size: 64px; margin-bottom: 24px; }
    .popup-title { font-size: 24px; font-weight: 700; color: #171719; margin-bottom: 12px; }
    .popup-desc { font-size: 14px; color: #6B7280; margin-bottom: 32px; line-height: 1.6; }
    .popup-buttons { display: flex; gap: 12px; }
    .popup-btn {
      flex: 1; padding: 14px; border-radius: 8px; font-size: 16px;
      font-weight: 600; cursor: pointer;
    }
    .popup-btn-cancel { background-color: #F3F4F6; color: #6B7280; border: none; }
    .popup-btn-confirm { background-color: #0066FF; color: #FFFFFF; border: none; }`;

const confirmPopupContent = `    <div class="popup-overlay">
      <div class="popup-card">
        <div class="popup-icon">✅</div>
        <div class="popup-title">제출하시겠습니까?</div>
        <div class="popup-desc">
          점검 결과를 제출하면 수정할 수 없습니다.<br>
          제출 전 내용을 다시 한번 확인해 주세요.
        </div>
        <div class="popup-buttons">
          <button class="popup-btn popup-btn-cancel" onclick="window.history.back()">취소</button>
          <button class="popup-btn popup-btn-confirm" onclick="window.location.href='inspection-confirmation.html'">제출</button>
        </div>
      </div>
    </div>`;

fs.writeFileSync('inspection-submit-popup.html', generateHTML('제출 확인', confirmPopupContent, confirmPopupStyles));

// 8. Report Download Popup (170:40200)
const downloadPopupContent = `    <div class="popup-overlay">
      <div class="popup-card">
        <div class="popup-icon">📥</div>
        <div class="popup-title">보고서 다운로드 완료</div>
        <div class="popup-desc">
          점검 보고서가 성공적으로 다운로드되었습니다.<br>
          다운로드 폴더를 확인해 주세요.
        </div>
        <div class="popup-buttons">
          <button class="popup-btn popup-btn-confirm" onclick="window.location.href='index.html'" style="flex: 1;">확인</button>
        </div>
      </div>
    </div>`;

fs.writeFileSync('report-download-popup.html', generateHTML('보고서 다운로드', downloadPopupContent, confirmPopupStyles));

// 9. Text Input Search (141:6385)
const textInputStyles = `    .search-container { margin-bottom: 24px; }
    .search-label { display: block; font-size: 14px; font-weight: 600; color: #171719; margin-bottom: 8px; }
    .search-label span { color: #EF4444; }
    .search-wrapper { display: flex; gap: 12px; }
    .search-input {
      flex: 1; padding: 14px 16px; border: 1.5px solid #E5E7EB;
      border-radius: 8px; font-size: 15px;
    }
    .search-btn {
      padding: 14px 32px; background-color: #0066FF; color: #FFFFFF;
      border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;
    }
    .search-results { margin-top: 24px; }
    .result-item {
      display: flex; align-items: center; padding: 16px;
      background-color: #F9FAFB; border-radius: 12px; margin-bottom: 12px;
      cursor: pointer; transition: all 0.2s;
    }
    .result-item:hover { background-color: #EFF6FF; transform: translateX(4px); }
    .result-icon { font-size: 32px; margin-right: 16px; }
    .result-info { flex: 1; }
    .result-name { font-size: 16px; font-weight: 600; color: #171719; }
    .result-address { font-size: 13px; color: #6B7280; margin-top: 4px; }`;

const textInputContent = `    <div class="content-box">
      <div class="search-container">
        <label class="search-label">대상지 검색 <span>*</span></label>
        <div class="search-wrapper">
          <input type="text" class="search-input" placeholder="검색어를 입력해 주세요." id="searchInput" value="주합">
          <button class="search-btn" onclick="search()">검색</button>
        </div>
      </div>
      <div class="search-results">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px;">검색 결과 (1건)</h3>
        <div class="result-item" onclick="window.location.href='site-detail.html'">
          <div class="result-icon">🏯</div>
          <div class="result-info">
            <div class="result-name">주합루</div>
            <div class="result-address">서울 종로구 율곡로 99</div>
          </div>
        </div>
      </div>
    </div>
  <script>
    function search() {
      alert('검색을 수행합니다.');
    }
  </script>`;

fs.writeFileSync('site-search-result.html', generateHTML('대상지 선택', textInputContent, textInputStyles));

console.log('\\n=== Remaining Screens Generated ===');
console.log('1. map-popup.html');
console.log('2. disaster-history-empty.html');
console.log('3. disaster-history-timeline.html');
console.log('4. repair-history-detail.html');
console.log('5. inspection-target-selection-active.html');
console.log('6. inspection-checklist-select.html');
console.log('7. inspection-submit-popup.html');
console.log('8. report-download-popup.html');
console.log('9. site-search-result.html');
