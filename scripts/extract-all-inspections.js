/**
 * 모든 점검표 HWPX 파일에서 데이터 추출 및 JSON 생성
 */

const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

// GeoJSON에서 좌표 가져오기
function getCoordinatesFromGIS() {
  const coords = {};

  // 석축
  const walls = JSON.parse(fs.readFileSync('data/gis/nakseonjae-walls.geojson', 'utf8'));
  walls.features.forEach((feature, idx) => {
    coords[`pl${idx + 1}`] = {
      lat: feature.geometry.coordinates[0][1],
      lng: feature.geometry.coordinates[0][0]
    };
  });

  // 담장
  const fences = JSON.parse(fs.readFileSync('data/gis/nakseonjae-fences.geojson', 'utf8'));
  fences.features.forEach((feature, idx) => {
    coords[`pl${idx + 4}`] = {
      lat: feature.geometry.coordinates[0][0][1],
      lng: feature.geometry.coordinates[0][0][0]
    };
  });

  // 수목
  const trees = JSON.parse(fs.readFileSync('data/gis/nakseonjae-trees.geojson', 'utf8'));
  trees.features.forEach((feature, idx) => {
    coords[`pt${idx + 2}`] = {
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0]
    };
  });

  // 군락
  const groves = JSON.parse(fs.readFileSync('data/gis/nakseonjae-groves.geojson', 'utf8'));
  groves.features.forEach((feature, idx) => {
    coords[`pt${idx + 4}`] = {
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0]
    };
  });

  // 굴뚝
  const chimneys = JSON.parse(fs.readFileSync('data/gis/nakseonjae-chimneys.geojson', 'utf8'));
  chimneys.features.forEach((feature, idx) => {
    coords[`pt${idx + 5}`] = {
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0]
    };
  });

  // 집수정
  const drains = JSON.parse(fs.readFileSync('data/gis/nakseonjae-drains.geojson', 'utf8'));
  coords['drain'] = {
    lat: drains.features[0].geometry.coordinates[1],
    lng: drains.features[0].geometry.coordinates[0]
  };

  return coords;
}

// HWPX에서 텍스트 추출
function extractTextFromHWPX(hwpxPath) {
  try {
    const zip = new AdmZip(hwpxPath);
    const prvTextEntry = zip.getEntry('Preview/PrvText.txt');

    if (prvTextEntry) {
      return prvTextEntry.getData().toString('utf8');
    }
    return null;
  } catch (error) {
    console.error(`  오류: ${error.message}`);
    return null;
  }
}

// 점검표 정의
const inspections = [
  {
    id: 'pl2_wall',
    type: '석축',
    name: '석축 pl2',
    code: 'pl2',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/석축/석축(pl2)/안전점검표(석축 pl2).hwpx',
    photoDir: 'pl2_wall'
  },
  {
    id: 'pl3_wall',
    type: '석축',
    name: '석축 pl3',
    code: 'pl3',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/석축/석축(pl3)/안전점검표(석축 pl3).hwpx',
    photoDir: 'pl3_wall'
  },
  {
    id: 'pl4_fence',
    type: '담장',
    name: '담장 18번',
    code: 'pl4',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/담장/담장 18번(pl4)/안전점검표(담장 18번).hwp',
    photoDir: 'pl4_fence'
  },
  {
    id: 'pl5_fence',
    type: '담장',
    name: '담장 21번',
    code: 'pl5',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/담장/담장 21번((pl5)/안전점검표(담장 21번).hwp',
    photoDir: 'pl5_fence'
  },
  {
    id: 'pl6_fence',
    type: '담장',
    name: '담장 30번',
    code: 'pl6',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/담장/담장 30번(pl6)/안전점검표(담장 30번).hwp',
    photoDir: 'pl6_fence'
  },
  {
    id: 'pt2_tree',
    type: '단일목',
    name: '수목 2번',
    code: 'pt2',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/수목(단일목, 군락지)/단일목/수목 2번(pt2)/안전점검표(수목 2번).hwpx',
    photoDir: 'pt2_tree'
  },
  {
    id: 'pt3_tree',
    type: '단일목',
    name: '수목 3번',
    code: 'pt3',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/수목(단일목, 군락지)/단일목/수목 3번(pt3)/안전점검표(수목 3번).hwpx',
    photoDir: 'pt3_tree'
  },
  {
    id: 'pt4_grove',
    type: '군락',
    name: '수목 4번',
    code: 'pt4',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/수목(단일목, 군락지)/군락지/수목 4번(pt4)/안전점검표(수목 4번).hwpx',
    photoDir: 'pt4_grove'
  },
  {
    id: 'pt5_chimney',
    type: '굴뚝',
    name: '굴뚝 2번',
    code: 'pt5',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/굴뚝/굴뚝 2번(pt5)/안전점검표(굴뚝 2번).hwp',
    photoDir: 'pt5_chimney'
  },
  {
    id: 'pt6_chimney',
    type: '굴뚝',
    name: '굴뚝 3번',
    code: 'pt6',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/굴뚝/굴뚝 3번(pt6)/안전점검표(굴뚝 3번).hwp',
    photoDir: 'pt6_chimney'
  },
  {
    id: 'drain',
    type: '집수정',
    name: '집수정',
    code: 'drain',
    hwpx: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/집수정/집수정 안전점검표.hwpx',
    photoDir: 'drain'
  }
];

// 사진 파일 목록 가져오기
function getPhotoList(photoDir) {
  const dir = `assets/photos/nakseonjae/${photoDir}`;
  try {
    const files = fs.readdirSync(dir);
    return files.map(file => `${photoDir}/${file}`);
  } catch (error) {
    console.warn(`  경고: 사진 폴더 없음 - ${dir}`);
    return [];
  }
}

// JSON 템플릿 생성 (간단한 버전)
function createInspectionJSON(inspection, coords, text) {
  const photoList = getPhotoList(inspection.photoDir);
  const coord = coords[inspection.code] || { lat: 37.5795, lng: 126.9910 };

  return {
    id: inspection.id,
    targetType: inspection.type,
    targetName: inspection.name,
    code: inspection.code,
    site: "낙선재 권역",
    inspectionDate: "2024-10-20",
    inspector: "점검자명",
    generalInfo: {
      location: "낙선재 권역",
      code: inspection.code,
      extractedText: text ? text.substring(0, 500) + "..." : ""
    },
    checklistItems: {
      note: "원본 HWPX 파일을 참고하여 수동으로 입력 필요"
    },
    overallAssessment: {
      rating: "검토 필요",
      inspectorOpinion: "원본 점검표 참고"
    },
    photos: photoList,
    coordinates: coord
  };
}

// 메인 실행
async function main() {
  console.log('=== 점검표 데이터 추출 시작 ===\n');

  // 좌표 로드
  console.log('GIS 좌표 로드 중...');
  const coords = getCoordinatesFromGIS();
  console.log(`  완료: ${Object.keys(coords).length}개 좌표\n`);

  let successCount = 0;

  for (const inspection of inspections) {
    console.log(`[${inspection.name}] 처리 중...`);
    console.log(`  파일: ${inspection.hwpx}`);

    // HWPX 텍스트 추출
    const text = extractTextFromHWPX(inspection.hwpx);

    // JSON 생성
    const json = createInspectionJSON(inspection, coords, text);

    // 파일 저장
    const outputPath = `data/nakseonjae/inspections/${inspection.id}.json`;
    fs.writeFileSync(outputPath, JSON.stringify(json, null, 2), 'utf8');

    console.log(`  ✓ 저장: ${outputPath}`);
    console.log(`  사진: ${json.photos.length}개\n`);

    successCount++;
  }

  console.log('=== 추출 완료 ===');
  console.log(`생성된 파일: ${successCount}개`);
  console.log('\n⚠️  주의: 생성된 JSON 파일은 기본 템플릿입니다.');
  console.log('원본 HWPX 파일을 보고 checklistItems를 수동으로 채워넣어야 합니다.');
}

main().catch(error => {
  console.error('오류:', error);
  process.exit(1);
});
