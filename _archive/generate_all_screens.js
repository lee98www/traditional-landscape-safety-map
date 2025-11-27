const fs = require('fs');

const screens = JSON.parse(fs.readFileSync('extracted_screens.json', 'utf8'));

// Helper to convert rgba to hex
function rgbaToHex(rgba) {
  if (!rgba) return '#FFFFFF';
  const r = Math.round(rgba.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(rgba.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(rgba.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

// Common header and footer
function generateHeader(title) {
  return `  <header class="header">
    <a href="index.html" class="header__logo">전통조경 안전지도 시범서비스</a>
    <h1 class="page-title">${title}</h1>
    <button class="logout-button">로그아웃</button>
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
    .search-box {
      position: relative; display: flex; align-items: center; gap: 12px;
      border: 1.5px solid #E5E7EB; border-radius: 8px; padding: 12px 16px;
      background-color: #FFFFFF; margin-bottom: 24px;
    }
    .search-input {
      flex: 1; border: none; outline: none; font-size: 15px; color: #171719;
    }
    .search-input::placeholder { color: #9CA3AF; }
    .search-button {
      background-color: #0066FF; color: #FFFFFF; border: none;
      padding: 8px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .section-title { font-size: 16px; font-weight: 700; color: #171719; margin-bottom: 16px; }
    .site-list { display: flex; flex-direction: column; gap: 12px; }
    .site-item {
      display: flex; align-items: center; padding: 16px;
      background-color: #F9FAFB; border-radius: 12px; cursor: pointer; transition: all 0.2s;
    }
    .site-item:hover { background-color: #F3F4F6; transform: translateX(4px); }
    .site-icon {
      width: 48px; height: 48px; background-color: #E5E7EB; border-radius: 8px;
      display: flex; align-items: center; justify-content: center; font-size: 24px;
      margin-right: 16px; flex-shrink: 0;
    }
    .site-info { flex: 1; }
    .site-name { font-size: 16px; font-weight: 700; color: #171719; margin-bottom: 4px; }
    .site-desc { font-size: 13px; color: #6B7280; }
    .footer {
      background-color: #1A1A1A; color: #FFFFFF; padding: 32px 40px;
    }
    .footer-content { max-width: 1440px; margin: 0 auto; }
    .footer-links { display: flex; gap: 24px; margin-bottom: 16px; }
    .footer-links a { color: #CCCCCC; text-decoration: none; font-size: 14px; }
    .footer-info p { color: #999999; font-size: 13px; line-height: 1.6; }
    .footer-copyright { color: #666666; font-size: 12px; margin-top: 12px; }`;

// Generate HTML template
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

// 1. inspection-site-selection.html (74:6031)
const inspectionSiteSelectionContent = `    <div class="content-box">
      <div class="search-box">
        <input type="text" class="search-input" placeholder="검색어를 입력해 주세요." id="siteSearch">
        <button class="search-button" onclick="searchSite()">검색</button>
      </div>
      <h3 class="section-title">대상지 리스트</h3>
      <div class="site-list">
        <div class="site-item" onclick="window.location.href='inspection-target-selection.html?site=juhaplu'">
          <div class="site-icon">🏯</div>
          <div class="site-info">
            <h4 class="site-name">주합루</h4>
            <p class="site-desc">서울 종로구 율곡로 99</p>
          </div>
        </div>
        <div class="site-item" onclick="window.location.href='inspection-target-selection.html?site=uiduhap'">
          <div class="site-icon">🏯</div>
          <div class="site-info">
            <h4 class="site-name">의두합</h4>
            <p class="site-desc">서울 종로구 율곡로 99</p>
          </div>
        </div>
        <div class="site-item" onclick="window.location.href='inspection-target-selection.html?site=nakseonjae'">
          <div class="site-icon">🏯</div>
          <div class="site-info">
            <h4 class="site-name">낙선재</h4>
            <p class="site-desc">서울 종로구 율곡로 99</p>
          </div>
        </div>
      </div>
    </div>
  <script>
    function searchSite() {
      const searchInput = document.getElementById('siteSearch');
      const searchTerm = searchInput.value.toLowerCase();
      const siteItems = document.querySelectorAll('.site-item');
      siteItems.forEach(item => {
        const siteName = item.querySelector('.site-name').textContent.toLowerCase();
        if (siteName.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }
    document.getElementById('siteSearch').addEventListener('input', searchSite);
  </script>`;

fs.writeFileSync('inspection-site-selection.html',
  generateHTML('점검 대상지 선택', inspectionSiteSelectionContent));

// 2. site-detail.html (24:27) - Map view
const siteDetailStyles = `    .map-container {
      width: 100%; height: 500px; background-color: #E5E7EB;
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      font-size: 18px; color: #6B7280; margin-bottom: 24px;
    }
    .detail-info { display: flex; flex-direction: column; gap: 16px; }
    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E5E7EB; }
    .info-label { font-weight: 600; color: #171719; }
    .info-value { color: #6B7280; }`;

const siteDetailContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">대상지 상세 정보</h2>
      <div class="map-container">
        지도 영역 (Kakao Map or Google Map 연동)
      </div>
      <div class="detail-info">
        <div class="info-row">
          <span class="info-label">대상지명</span>
          <span class="info-value">주합루</span>
        </div>
        <div class="info-row">
          <span class="info-label">위치</span>
          <span class="info-value">서울 종로구 율곡로 99</span>
        </div>
        <div class="info-row">
          <span class="info-label">관리번호</span>
          <span class="info-value">CH-2024-001</span>
        </div>
      </div>
      <button onclick="window.location.href='safety-history-info.html'"
        style="width: 100%; margin-top: 24px; padding: 14px; background-color: #0066FF; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
        기본 정보 보기
      </button>
    </div>`;

fs.writeFileSync('site-detail.html',
  generateHTML('대상지 상세 정보', siteDetailContent, siteDetailStyles));

// 3. safety-history-info.html (51:12166)
const safetyHistoryInfoContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">기본 정보</h2>
      <div class="detail-info">
        <div class="info-row">
          <span class="info-label">대상지명</span>
          <span class="info-value">주합루</span>
        </div>
        <div class="info-row">
          <span class="info-label">소재지</span>
          <span class="info-value">서울 종로구 율곡로 99</span>
        </div>
        <div class="info-row">
          <span class="info-label">관리번호</span>
          <span class="info-value">CH-2024-001</span>
        </div>
        <div class="info-row">
          <span class="info-label">등록일</span>
          <span class="info-value">2024-01-15</span>
        </div>
        <div class="info-row">
          <span class="info-label">최근 점검일</span>
          <span class="info-value">2024-11-20</span>
        </div>
        <div class="info-row">
          <span class="info-label">상태</span>
          <span class="info-value" style="color: #10B981; font-weight: 600;">정상</span>
        </div>
      </div>
      <div style="display: flex; gap: 12px; margin-top: 24px;">
        <button onclick="window.location.href='safety-history-disaster.html'"
          style="flex: 1; padding: 14px; background-color: #EF4444; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
          재해 이력
        </button>
        <button onclick="window.location.href='safety-history-repair.html'"
          style="flex: 1; padding: 14px; background-color: #0066FF; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
          수리 이력
        </button>
      </div>
    </div>`;

fs.writeFileSync('safety-history-info.html',
  generateHTML('기본 정보', safetyHistoryInfoContent, siteDetailStyles));

// 4. safety-history-disaster.html (51:12300 - has 41 texts)
console.log('Processing safety-history-disaster.html...');
const disasterTexts = screens['51:12300'].allTexts;
const safetyHistoryDisasterStyles = `    .timeline { position: relative; padding-left: 32px; }
    .timeline::before {
      content: ''; position: absolute; left: 8px; top: 0; bottom: 0;
      width: 2px; background-color: #E5E7EB;
    }
    .timeline-item {
      position: relative; margin-bottom: 32px; padding: 20px; background-color: #F9FAFB;
      border-radius: 12px; border-left: 4px solid #EF4444;
    }
    .timeline-item::before {
      content: ''; position: absolute; left: -38px; top: 20px;
      width: 12px; height: 12px; border-radius: 50%; background-color: #EF4444;
    }
    .timeline-date { font-size: 14px; font-weight: 600; color: #EF4444; margin-bottom: 8px; }
    .timeline-title { font-size: 16px; font-weight: 700; color: #171719; margin-bottom: 8px; }
    .timeline-desc { font-size: 14px; color: #6B7280; line-height: 1.6; }`;

const safetyHistoryDisasterContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">재해 이력</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2024년 7월 15일</div>
          <div class="timeline-title">집중호우로 인한 석축 균열 발생</div>
          <div class="timeline-desc">
            장마 기간 중 발생한 집중호우로 인해 북측 석축 하단부에 3cm 폭의 수평 균열이 발생하였습니다.
            즉시 임시 보강 조치를 실시하였으며, 전문가 정밀 조사가 진행 중입니다.
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2023년 9월 3일</div>
          <div class="timeline-title">태풍으로 인한 수목 피해</div>
          <div class="timeline-desc">
            태풍 카눈의 영향으로 정원 내 소나무 1그루가 뿌리째 뽑히는 피해가 발생하였습니다.
            신속하게 제거 작업을 완료하였으며, 주변 수목에 대한 안전성 점검을 실시하였습니다.
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2022년 12월 10일</div>
          <div class="timeline-title">한파로 인한 급수 시설 동파</div>
          <div class="timeline-desc">
            영하 15도 이하의 한파로 인해 정원 내 급수 배관이 동파되었습니다.
            동파 구간을 교체하고 보온 조치를 강화하였습니다.
          </div>
        </div>
      </div>
    </div>`;

fs.writeFileSync('safety-history-disaster.html',
  generateHTML('재해 이력', safetyHistoryDisasterContent, safetyHistoryDisasterStyles));

// 5. safety-history-repair.html (51:12741 - has 45 texts)
const safetyHistoryRepairStyles = safetyHistoryDisasterStyles.replace(/#EF4444/g, '#0066FF');
const safetyHistoryRepairContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">수리 이력</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2024년 8월 20일</div>
          <div class="timeline-title">석축 균열 보수 공사 완료</div>
          <div class="timeline-desc">
            7월 집중호우로 발생한 석축 균열에 대한 정밀 조사 결과를 바탕으로
            전통 방식의 보수 공법을 적용하여 균열 부위를 완전히 보수하였습니다.
            공사 기간: 2024.08.01 ~ 2024.08.20 (20일)
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2024년 5월 15일</div>
          <div class="timeline-title">기와 보수 및 교체</div>
          <div class="timeline-desc">
            경년 변화로 인해 파손된 기와 32장을 전통 방식으로 제작된 신규 기와로 교체하였습니다.
            또한 처마 부분의 기와 배치를 재정비하여 우수 배수가 원활하도록 개선하였습니다.
            공사 기간: 2024.05.01 ~ 2024.05.15 (15일)
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2023년 10월 10일</div>
          <div class="timeline-title">목재 부재 교체 및 보강</div>
          <div class="timeline-desc">
            정기 점검 결과 발견된 부후 목재 부재 8개소를 교체하고,
            구조적으로 취약한 부분을 전통 공법으로 보강하였습니다.
            공사 기간: 2023.09.25 ~ 2023.10.10 (16일)
          </div>
        </div>
      </div>
    </div>`;

fs.writeFileSync('safety-history-repair.html',
  generateHTML('수리 이력', safetyHistoryRepairContent, safetyHistoryRepairStyles));

// 6. inspection-target-selection.html (84:7285 - has 38 texts)
const inspectionTargetStyles = `    .target-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .target-card {
      padding: 24px; background-color: #F9FAFB; border: 2px solid #E5E7EB;
      border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s;
    }
    .target-card:hover { border-color: #0066FF; background-color: #FFFFFF; transform: translateY(-4px); }
    .target-card.selected { border-color: #0066FF; background-color: #EFF6FF; }
    .target-icon { font-size: 48px; margin-bottom: 12px; }
    .target-name { font-size: 16px; font-weight: 600; color: #171719; }
    .submit-button {
      width: 100%; margin-top: 24px; padding: 14px; background-color: #0066FF;
      color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px;
      font-weight: 600; cursor: pointer;
    }
    .submit-button:disabled { background-color: #9CA3AF; cursor: not-allowed; }`;

const inspectionTargetContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">점검 대상 선택</h2>
      <p style="color: #6B7280; margin-bottom: 24px;">점검할 대상을 선택해주세요.</p>
      <div class="target-grid">
        <div class="target-card" onclick="selectTarget(this, 'stone')">
          <div class="target-icon">🪨</div>
          <div class="target-name">석축 및 옹벽</div>
        </div>
        <div class="target-card" onclick="selectTarget(this, 'tree')">
          <div class="target-icon">🌳</div>
          <div class="target-name">수목</div>
        </div>
        <div class="target-card" onclick="selectTarget(this, 'building')">
          <div class="target-icon">🏛️</div>
          <div class="target-name">건축물</div>
        </div>
        <div class="target-card" onclick="selectTarget(this, 'facility')">
          <div class="target-icon">🔧</div>
          <div class="target-name">편의시설</div>
        </div>
        <div class="target-card" onclick="selectTarget(this, 'drainage')">
          <div class="target-icon">💧</div>
          <div class="target-name">배수시설</div>
        </div>
        <div class="target-card" onclick="selectTarget(this, 'landscape')">
          <div class="target-icon">🏞️</div>
          <div class="target-name">조경시설</div>
        </div>
      </div>
      <button class="submit-button" id="submitBtn" disabled onclick="window.location.href='inspection-general-status.html'">
        다음 단계
      </button>
    </div>
  <script>
    let selectedTarget = null;
    function selectTarget(card, target) {
      document.querySelectorAll('.target-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedTarget = target;
      document.getElementById('submitBtn').disabled = false;
    }
  </script>`;

fs.writeFileSync('inspection-target-selection.html',
  generateHTML('점검 대상 선택', inspectionTargetContent, inspectionTargetStyles));

// 7. inspection-general-status.html (170:40975 - has 64 texts)
const inspectionGeneralStyles = `    .form-section { margin-bottom: 32px; }
    .form-section-title { font-size: 18px; font-weight: 700; color: #171719; margin-bottom: 16px; }
    .form-group { margin-bottom: 20px; }
    .form-label { display: block; font-size: 14px; font-weight: 600; color: #171719; margin-bottom: 8px; }
    .form-input, .form-select, .form-textarea {
      width: 100%; padding: 12px 16px; border: 1.5px solid #E5E7EB;
      border-radius: 8px; font-size: 15px; color: #171719;
    }
    .form-textarea { min-height: 120px; resize: vertical; }
    .radio-group { display: flex; gap: 16px; }
    .radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; }`;

const inspectionGeneralContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">일반현황</h2>
      <form id="generalStatusForm">
        <div class="form-section">
          <h3 class="form-section-title">기본 정보</h3>
          <div class="form-group">
            <label class="form-label">점검 대상</label>
            <input type="text" class="form-input" value="석축 및 옹벽" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">점검 일시</label>
            <input type="datetime-local" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">점검자</label>
            <input type="text" class="form-input" placeholder="점검자 이름을 입력하세요" required>
          </div>
        </div>
        <div class="form-section">
          <h3 class="form-section-title">날씨 정보</h3>
          <div class="form-group">
            <label class="form-label">날씨</label>
            <div class="radio-group">
              <label class="radio-label"><input type="radio" name="weather" value="맑음" required> 맑음</label>
              <label class="radio-label"><input type="radio" name="weather" value="흐림"> 흐림</label>
              <label class="radio-label"><input type="radio" name="weather" value="비"> 비</label>
              <label class="radio-label"><input type="radio" name="weather" value="눈"> 눈</label>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">기온 (°C)</label>
            <input type="number" class="form-input" placeholder="예: 20" required>
          </div>
        </div>
        <div class="form-section">
          <h3 class="form-section-title">특이사항</h3>
          <div class="form-group">
            <label class="form-label">메모</label>
            <textarea class="form-textarea" placeholder="점검 시 특이사항이나 참고사항을 입력하세요"></textarea>
          </div>
        </div>
        <button type="submit" class="submit-button">다음 단계</button>
      </form>
    </div>
  <script>
    document.getElementById('generalStatusForm').onsubmit = function(e) {
      e.preventDefault();
      window.location.href = 'inspection-checklist.html';
    };
  </script>`;

fs.writeFileSync('inspection-general-status.html',
  generateHTML('일반현황', inspectionGeneralContent, inspectionGeneralStyles + inspectionTargetStyles));

// 8. inspection-checklist.html (94:8479 - has 64 texts)
const inspectionChecklistStyles = `    .checklist { display: flex; flex-direction: column; gap: 16px; }
    .checklist-item {
      padding: 20px; background-color: #F9FAFB; border-radius: 12px;
      border-left: 4px solid #0066FF;
    }
    .checklist-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .checklist-title { font-size: 16px; font-weight: 600; color: #171719; }
    .checklist-status {
      display: flex; gap: 8px;
    }
    .status-btn {
      padding: 6px 16px; border: 1.5px solid #E5E7EB; border-radius: 6px;
      background-color: #FFFFFF; cursor: pointer; font-size: 14px; font-weight: 500;
    }
    .status-btn.active { background-color: #0066FF; color: #FFFFFF; border-color: #0066FF; }
    .status-btn.good { background-color: #10B981; color: #FFFFFF; border-color: #10B981; }
    .status-btn.bad { background-color: #EF4444; color: #FFFFFF; border-color: #EF4444; }`;

const inspectionChecklistContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">점검항목 (석축 및 옹벽)</h2>
      <p style="color: #6B7280; margin-bottom: 24px;">각 항목의 상태를 평가해주세요.</p>
      <div class="checklist">
        <div class="checklist-item">
          <div class="checklist-header">
            <div class="checklist-title">1. 석축의 변형 및 변위</div>
            <div class="checklist-status">
              <button class="status-btn" onclick="setStatus(this, 'good')">양호</button>
              <button class="status-btn" onclick="setStatus(this, 'bad')">불량</button>
            </div>
          </div>
          <p style="font-size: 13px; color: #6B7280;">석축의 배부름, 기울기, 침하 등을 확인합니다.</p>
        </div>
        <div class="checklist-item">
          <div class="checklist-header">
            <div class="checklist-title">2. 균열 및 파손</div>
            <div class="checklist-status">
              <button class="status-btn" onclick="setStatus(this, 'good')">양호</button>
              <button class="status-btn" onclick="setStatus(this, 'bad')">불량</button>
            </div>
          </div>
          <p style="font-size: 13px; color: #6B7280;">석재의 균열, 파손, 탈락 상태를 확인합니다.</p>
        </div>
        <div class="checklist-item">
          <div class="checklist-header">
            <div class="checklist-title">3. 줄눈 및 충진재</div>
            <div class="checklist-status">
              <button class="status-btn" onclick="setStatus(this, 'good')">양호</button>
              <button class="status-btn" onclick="setStatus(this, 'bad')">불량</button>
            </div>
          </div>
          <p style="font-size: 13px; color: #6B7280;">줄눈의 벌어짐, 충진재 유실 상태를 확인합니다.</p>
        </div>
        <div class="checklist-item">
          <div class="checklist-header">
            <div class="checklist-title">4. 배수 시설</div>
            <div class="checklist-status">
              <button class="status-btn" onclick="setStatus(this, 'good')">양호</button>
              <button class="status-btn" onclick="setStatus(this, 'bad')">불량</button>
            </div>
          </div>
          <p style="font-size: 13px; color: #6B7280;">배수공의 막힘, 손상 여부를 확인합니다.</p>
        </div>
        <div class="checklist-item">
          <div class="checklist-header">
            <div class="checklist-title">5. 수목 뿌리 침투</div>
            <div class="checklist-status">
              <button class="status-btn" onclick="setStatus(this, 'good')">양호</button>
              <button class="status-btn" onclick="setStatus(this, 'bad')">불량</button>
            </div>
          </div>
          <p style="font-size: 13px; color: #6B7280;">석축 사이로 침투한 수목 뿌리를 확인합니다.</p>
        </div>
      </div>
      <button class="submit-button" style="margin-top: 24px;" onclick="window.location.href='inspection-result.html'">
        종합판정 단계로
      </button>
    </div>
  <script>
    function setStatus(btn, status) {
      const statusBtns = btn.parentElement.querySelectorAll('.status-btn');
      statusBtns.forEach(b => b.classList.remove('active', 'good', 'bad'));
      btn.classList.add('active', status);
    }
  </script>`;

fs.writeFileSync('inspection-checklist.html',
  generateHTML('점검항목', inspectionChecklistContent, inspectionGeneralStyles + inspectionChecklistStyles));

// 9. inspection-result.html (94:49249 - has 94 texts)
const inspectionResultStyles = `    .result-summary {
      padding: 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px; color: #FFFFFF; margin-bottom: 24px; text-align: center;
    }
    .result-score { font-size: 48px; font-weight: 700; margin: 16px 0; }
    .result-grade { font-size: 24px; font-weight: 600; }
    .result-details { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .result-row {
      display: flex; justify-content: space-between; padding: 16px;
      background-color: #F9FAFB; border-radius: 8px;
    }
    .result-label { font-weight: 600; color: #171719; }
    .result-value { color: #6B7280; }
    .result-value.good { color: #10B981; font-weight: 600; }
    .result-value.bad { color: #EF4444; font-weight: 600; }`;

const inspectionResultContent = `    <div class="content-box">
      <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 24px;">종합판정</h2>
      <div class="result-summary">
        <div style="font-size: 18px; opacity: 0.9;">석축 및 옹벽 점검 결과</div>
        <div class="result-score">85점</div>
        <div class="result-grade">양호 (B등급)</div>
      </div>
      <div class="result-details">
        <div class="result-row">
          <span class="result-label">1. 석축의 변형 및 변위</span>
          <span class="result-value good">양호</span>
        </div>
        <div class="result-row">
          <span class="result-label">2. 균열 및 파손</span>
          <span class="result-value good">양호</span>
        </div>
        <div class="result-row">
          <span class="result-label">3. 줄눈 및 충진재</span>
          <span class="result-value bad">불량</span>
        </div>
        <div class="result-row">
          <span class="result-label">4. 배수 시설</span>
          <span class="result-value good">양호</span>
        </div>
        <div class="result-row">
          <span class="result-label">5. 수목 뿌리 침투</span>
          <span class="result-value good">양호</span>
        </div>
      </div>
      <div style="padding: 20px; background-color: #FEF3C7; border-radius: 8px; margin-bottom: 24px;">
        <h3 style="font-size: 16px; font-weight: 700; color: #92400E; margin-bottom: 8px;">조치 필요 사항</h3>
        <p style="font-size: 14px; color: #78350F; line-height: 1.6;">
          줄눈 및 충진재 상태가 불량하므로 보수가 필요합니다.
          줄눈 재시공 및 충진재 보강 작업을 2주 이내에 실시하는 것을 권장합니다.
        </p>
      </div>
      <button class="submit-button" onclick="window.location.href='inspection-confirmation.html'">
        최종 확인
      </button>
    </div>`;

fs.writeFileSync('inspection-result.html',
  generateHTML('종합판정', inspectionResultContent, inspectionGeneralStyles + inspectionResultStyles));

// 10. inspection-confirmation.html (94:47918 - has 25 texts)
const inspectionConfirmationContent = `    <div class="content-box">
      <div style="text-align: center; padding: 40px 0;">
        <div style="font-size: 64px; margin-bottom: 24px;">✅</div>
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 16px;">점검이 완료되었습니다!</h2>
        <p style="font-size: 16px; color: #6B7280; margin-bottom: 32px;">
          점검 결과가 성공적으로 저장되었습니다.<br>
          보고서는 이메일로 발송됩니다.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button onclick="window.location.href='site-selection.html'"
            style="padding: 14px 32px; background-color: #FFFFFF; color: #0066FF; border: 1.5px solid #0066FF; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
            이력 확인하기
          </button>
          <button onclick="window.location.href='inspection-site-selection.html'"
            style="padding: 14px 32px; background-color: #0066FF; color: #FFFFFF; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
            새 점검 시작
          </button>
        </div>
      </div>
    </div>`;

fs.writeFileSync('inspection-confirmation.html',
  generateHTML('확인하기', inspectionConfirmationContent));

console.log('\n=== Generation Complete ===');
console.log('Created 10 HTML files:');
console.log('1. inspection-site-selection.html');
console.log('2. site-detail.html');
console.log('3. safety-history-info.html');
console.log('4. safety-history-disaster.html');
console.log('5. safety-history-repair.html');
console.log('6. inspection-target-selection.html');
console.log('7. inspection-general-status.html');
console.log('8. inspection-checklist.html');
console.log('9. inspection-result.html');
console.log('10. inspection-confirmation.html');
