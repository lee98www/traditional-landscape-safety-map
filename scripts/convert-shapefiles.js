/**
 * Shapefile → GeoJSON 변환 스크립트
 * 낙선재 안전점검 대상지 GIS 데이터 변환
 */

const shapefile = require('shapefile');
const fs = require('fs');
const path = require('path');

// Shapefile 경로 정의
const shapefiles = [
  {
    name: '석축(라인)',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/석축/위치데이터/석축(라인).shp',
    output: 'data/gis/nakseonjae-walls.geojson',
    type: 'LineString'
  },
  {
    name: '담장',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/담장/위치데이터/담장.shp',
    output: 'data/gis/nakseonjae-fences.geojson',
    type: 'Polygon'
  },
  {
    name: '단일목',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/수목(단일목, 군락지)/단일목/위치데이터/단일목.shp',
    output: 'data/gis/nakseonjae-trees.geojson',
    type: 'Point'
  },
  {
    name: '군락',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/수목(단일목, 군락지)/군락지/위치데이터/군락.shp',
    output: 'data/gis/nakseonjae-groves.geojson',
    type: 'Point'
  },
  {
    name: '굴뚝',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/굴뚝/위치 데이터/굴뚝.shp',
    output: 'data/gis/nakseonjae-chimneys.geojson',
    type: 'Point'
  },
  {
    name: '집수정',
    path: '참고자료/송부용(낙선재)/안전 점검 실시 (점검표)/집수정/위치데이터/집수정.shp',
    output: 'data/gis/nakseonjae-drains.geojson',
    type: 'Point'
  }
];

/**
 * Shapefile을 GeoJSON으로 변환
 */
async function convertShapefile(shpPath, outputPath, name) {
  try {
    console.log(`\n[${name}] 변환 시작...`);
    console.log(`  입력: ${shpPath}`);
    console.log(`  출력: ${outputPath}`);

    // Shapefile 읽기
    const features = [];
    await shapefile.open(shpPath)
      .then(source => source.read()
        .then(function log(result) {
          if (result.done) return;
          features.push(result.value);
          return source.read().then(log);
        }));

    // GeoJSON 생성
    const geojson = {
      type: 'FeatureCollection',
      features: features
    };

    // 파일 저장
    fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2), 'utf8');

    console.log(`  ✓ 완료: ${features.length}개 피처 변환`);

    // 좌표 범위 출력 (검증용)
    if (features.length > 0) {
      const firstFeature = features[0];
      if (firstFeature.geometry && firstFeature.geometry.coordinates) {
        const coords = firstFeature.geometry.coordinates;
        if (firstFeature.geometry.type === 'Point') {
          console.log(`  좌표 샘플: [${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}]`);
        } else if (firstFeature.geometry.type === 'LineString') {
          console.log(`  좌표 샘플: [${coords[0][0].toFixed(6)}, ${coords[0][1].toFixed(6)}]`);
        } else if (firstFeature.geometry.type === 'Polygon') {
          console.log(`  좌표 샘플: [${coords[0][0][0].toFixed(6)}, ${coords[0][0][1].toFixed(6)}]`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error(`  ✗ 오류: ${error.message}`);
    return false;
  }
}

/**
 * 메인 실행
 */
async function main() {
  console.log('=== Shapefile → GeoJSON 변환 시작 ===\n');

  let successCount = 0;
  let failCount = 0;

  for (const shp of shapefiles) {
    const success = await convertShapefile(shp.path, shp.output, shp.name);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n=== 변환 완료 ===');
  console.log(`성공: ${successCount}개`);
  console.log(`실패: ${failCount}개`);

  if (failCount > 0) {
    console.log('\n⚠️  일부 파일 변환 실패. 경로를 확인해주세요.');
    process.exit(1);
  } else {
    console.log('\n✓ 모든 Shapefile 변환 성공!');
  }
}

// 실행
main().catch(error => {
  console.error('치명적 오류:', error);
  process.exit(1);
});
