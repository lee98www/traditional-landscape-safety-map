/**
 * HWPX 파일에서 텍스트 추출 스크립트
 */

const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

// HWPX 파일 경로
const hwpxPath = process.argv[2];

if (!hwpxPath) {
  console.error('사용법: node extract-hwpx.js <hwpx파일경로>');
  process.exit(1);
}

try {
  console.log(`HWPX 파일 추출: ${hwpxPath}\n`);

  // ZIP 압축 해제
  const zip = new AdmZip(hwpxPath);
  const zipEntries = zip.getEntries();

  // PrvText.txt 찾기 (텍스트 미리보기)
  const prvTextEntry = zipEntries.find(entry => entry.entryName === 'Preview/PrvText.txt');

  if (prvTextEntry) {
    const text = prvTextEntry.getData().toString('utf8');
    console.log('=== 텍스트 내용 ===\n');
    console.log(text);
  } else {
    console.log('PrvText.txt를 찾을 수 없습니다.');

    // 다른 파일 목록 출력
    console.log('\n파일 목록:');
    zipEntries.forEach(entry => {
      console.log(`  - ${entry.entryName}`);
    });
  }

} catch (error) {
  console.error('오류:', error.message);
  process.exit(1);
}
