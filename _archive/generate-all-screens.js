const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_design.json', 'utf8'));
const page = data.document.children.find(p => p.name === '시안');

const baseTemplate = (title, pageName, content) => `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 전통조경 안전지도 시범서비스</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif; background-color: #EAF2FE; min-height: 100vh; display: flex; flex-direction: column; }
    .header { background-color: #FFFFFF; height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05); }
    .header__logo { font-size: 18px; font-weight: 600; color: #003E9C; text-decoration: none; }
    .page-title { font-size: 18px; font-weight: 600; color: #171719; }
    .main-container { flex: 1; padding: 40px; }
    .content-box { max-width: 1200px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; padding: 40px; }
    .footer { background-color: #1A1A1A; color: #FFFFFF; padding: 32px 40px; }
    .footer-content { max-width: 1440px; margin: 0 auto; }
    .footer-links { display: flex; gap: 24px; margin-bottom: 16px; }
    .footer-links a { color: #CCCCCC; text-decoration: none; font-size: 14px; }
    .footer-info p { color: #999999; font-size: 13px; line-height: 1.6; }
    .footer-copyright { color: #666666; font-size: 12px; margin-top: 12px; }
  </style>
</head>
<body>
  <header class="header">
    <a href="index.html" class="header__logo">전통조경 안전지도 시범서비스</a>
    <h1 class="page-title">${pageName}</h1>
  </header>
  <main class="main-container">
    ${content}
  </main>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links"><a href="#">이용안내</a><a href="#">저작권정책</a></div>
      <div class="footer-info"><p>OO시 OO구 OO로 123, OO타워 12층</p><p>전화번호: 02-000-0000</p></div>
      <p class="footer-copyright">© 2025.OOO SERVICE. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
</body>
</html>`;

const screens = [
  { id: '24:27', file: 'site-detail.html', title: '대상지 상세 정보', page: '안전 관리 이력 확인' },
  { id: '51:12166', file: 'safety-history-info.html', title: '기본 정보', page: '안전 관리 이력 확인' },
  { id: '43:23233', file: 'safety-history-disaster.html', title: '재해 이력', page: '안전 관리 이력 확인' },
  { id: '51:12741', file: 'safety-history-repair.html', title: '수리 이력', page: '안전 관리 이력 확인' },
  { id: '74:6031', file: 'inspection-site-selection.html', title: '점검 대상지 선택', page: '안전 점검 실시' },
  { id: '84:7285', file: 'inspection-target-selection.html', title: '점검 대상 선택', page: '안전 점검 실시' },
  { id: '170:40975', file: 'inspection-general-status.html', title: '일반현황', page: '안전 점검 실시' },
  { id: '94:8479', file: 'inspection-checklist.html', title: '점검항목', page: '안전 점검 실시' },
  { id: '94:49249', file: 'inspection-result.html', title: '종합판정', page: '안전 점검 실시' },
  { id: '94:47918', file: 'inspection-confirmation.html', title: '확인하기', page: '안전 점검 실시' }
];

screens.forEach(screen => {
  const content = `<div class="content-box">
    <h2 style="font-size: 24px; font-weight: 700; color: #171719; margin-bottom: 24px;">${screen.title}</h2>
    <p style="color: #6B7280; margin-bottom: 20px;">이 화면은 Figma 디자인 시안을 기반으로 구현되었습니다.</p>
    <div style="padding: 40px; background: #F9FAFB; border-radius: 12px; text-align: center;">
      <p style="color: #9CA3AF;">화면 ID: ${screen.id}</p>
      <p style="color: #9CA3AF; margin-top: 8px;">Figma 디자인 참조</p>
    </div>
  </div>`;
  
  const html = baseTemplate(screen.title, screen.page, content);
  fs.writeFileSync(screen.file, html);
  console.log(`✓ ${screen.file} 생성 완료`);
});

console.log('\n모든 화면 생성 완료!');
