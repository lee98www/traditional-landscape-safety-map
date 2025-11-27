/**
 * GeoJSON 좌표계 변환 스크립트
 * Web Mercator (EPSG:3857) / TM 좌표 → WGS84 (EPSG:4326)
 */

const proj4 = require('proj4');
const fs = require('fs');

// 좌표계 정의
// EPSG:3857 - Web Mercator
proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs');

// EPSG:5186 - Korea 2000 / Central Belt 2010
proj4.defs('EPSG:5186', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs');

// EPSG:4326 - WGS84 (목표 좌표계)
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');

const files = [
  {
    file: 'data/gis/nakseonjae-walls.geojson',
    from: 'EPSG:3857',
    name: '석축'
  },
  {
    file: 'data/gis/nakseonjae-fences.geojson',
    from: 'EPSG:3857',
    name: '담장'
  },
  {
    file: 'data/gis/nakseonjae-trees.geojson',
    from: 'EPSG:5186',
    name: '단일목'
  },
  {
    file: 'data/gis/nakseonjae-groves.geojson',
    from: 'EPSG:5186',
    name: '군락'
  },
  {
    file: 'data/gis/nakseonjae-chimneys.geojson',
    from: 'EPSG:5186',
    name: '굴뚝'
  },
  {
    file: 'data/gis/nakseonjae-drains.geojson',
    from: 'EPSG:3857',
    name: '집수정'
  }
];

/**
 * 좌표 변환
 */
function transformCoordinates(coords, fromProj, toProj, geomType) {
  if (geomType === 'Point') {
    return proj4(fromProj, toProj, coords);
  } else if (geomType === 'LineString') {
    return coords.map(coord => proj4(fromProj, toProj, coord));
  } else if (geomType === 'Polygon') {
    return coords.map(ring =>
      ring.map(coord => proj4(fromProj, toProj, coord))
    );
  }
  return coords;
}

/**
 * GeoJSON 파일 좌표 변환
 */
function convertGeoJSON(filepath, fromEPSG, name) {
  console.log(`\n[${name}] 좌표 변환 중...`);
  console.log(`  파일: ${filepath}`);
  console.log(`  변환: ${fromEPSG} → EPSG:4326`);

  try {
    // 파일 읽기
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    // 변환 전 샘플 좌표
    const firstFeature = data.features[0];
    const beforeCoords = firstFeature.geometry.coordinates;
    console.log(`  변환 전: ${JSON.stringify(beforeCoords.slice ? beforeCoords.slice(0, 2) : beforeCoords)}`);

    // 각 피처 변환
    data.features.forEach(feature => {
      feature.geometry.coordinates = transformCoordinates(
        feature.geometry.coordinates,
        fromEPSG,
        'EPSG:4326',
        feature.geometry.type
      );
    });

    // 변환 후 샘플 좌표
    const afterCoords = data.features[0].geometry.coordinates;
    if (data.features[0].geometry.type === 'Point') {
      console.log(`  변환 후: [경도: ${afterCoords[0].toFixed(6)}, 위도: ${afterCoords[1].toFixed(6)}]`);
    } else if (data.features[0].geometry.type === 'LineString') {
      console.log(`  변환 후: [경도: ${afterCoords[0][0].toFixed(6)}, 위도: ${afterCoords[0][1].toFixed(6)}]`);
    } else if (data.features[0].geometry.type === 'Polygon') {
      console.log(`  변환 후: [경도: ${afterCoords[0][0][0].toFixed(6)}, 위도: ${afterCoords[0][0][1].toFixed(6)}]`);
    }

    // 파일 저장
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`  ✓ 완료`);

    return true;
  } catch (error) {
    console.error(`  ✗ 오류: ${error.message}`);
    return false;
  }
}

/**
 * 메인 실행
 */
function main() {
  console.log('=== GeoJSON 좌표 변환 시작 ===');
  console.log('목표: WGS84 (EPSG:4326) - Google Maps 호환\n');

  let successCount = 0;
  for (const item of files) {
    if (convertGeoJSON(item.file, item.from, item.name)) {
      successCount++;
    }
  }

  console.log('\n=== 변환 완료 ===');
  console.log(`성공: ${successCount}/${files.length}개`);

  if (successCount === files.length) {
    console.log('\n✓ 모든 파일 좌표 변환 성공!');
    console.log('\n좌표 범위 확인:');
    console.log('  낙선재 위치: 경도 126.99~127.00, 위도 37.57~37.58');
  }
}

main();
