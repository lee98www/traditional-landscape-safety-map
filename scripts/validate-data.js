/**
 * 데이터 무결성 검증 스크립트
 * 점검표, GIS, 사진 데이터 검증
 */

const fs = require('fs');
const path = require('path');

let errorCount = 0;
let warningCount = 0;

function error(message) {
  console.error(`❌ 오류: ${message}`);
  errorCount++;
}

function warn(message) {
  console.warn(`⚠️  경고: ${message}`);
  warningCount++;
}

function success(message) {
  console.log(`✓ ${message}`);
}

/**
 * 점검표 JSON 검증
 */
function validateInspections() {
  console.log('\n=== 점검표 데이터 검증 ===\n');

  const inspectionDir = 'data/nakseonjae/inspections';
  const expectedIds = [
    'pl1_wall', 'pl2_wall', 'pl3_wall',
    'pl4_fence', 'pl5_fence', 'pl6_fence',
    'pt2_tree', 'pt3_tree', 'pt4_grove',
    'pt5_chimney', 'pt6_chimney',
    'drain'
  ];

  let validCount = 0;

  expectedIds.forEach(id => {
    const filePath = `${inspectionDir}/${id}.json`;

    if (!fs.existsSync(filePath)) {
      error(`점검표 파일 없음: ${filePath}`);
      return;
    }

    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // 필수 필드 검증
      const requiredFields = ['id', 'targetType', 'targetName', 'code', 'site', 'coordinates'];
      const missingFields = requiredFields.filter(field => !data[field]);

      if (missingFields.length > 0) {
        error(`${id}: 필수 필드 누락 - ${missingFields.join(', ')}`);
        return;
      }

      // 좌표 검증
      if (!data.coordinates.lat || !data.coordinates.lng) {
        error(`${id}: 좌표 정보 불완전`);
        return;
      }

      // 좌표 범위 검증 (낙선재 주변)
      const { lat, lng } = data.coordinates;
      if (lat < 37.577 || lat > 37.582 || lng < 126.990 || lng > 126.996) {
        warn(`${id}: 좌표가 예상 범위를 벗어남 (lat: ${lat}, lng: ${lng})`);
      }

      // 사진 목록 검증
      if (data.photos && data.photos.length > 0) {
        data.photos.forEach(photo => {
          const photoPath = `assets/photos/nakseonjae/${photo}`;
          if (!fs.existsSync(photoPath)) {
            warn(`${id}: 사진 파일 없음 - ${photoPath}`);
          }
        });
      } else {
        warn(`${id}: 사진 목록이 비어있음`);
      }

      success(`${id} - 필드: ${requiredFields.length}, 사진: ${data.photos?.length || 0}개`);
      validCount++;

    } catch (err) {
      error(`${id}: JSON 파싱 실패 - ${err.message}`);
    }
  });

  console.log(`\n점검표 검증 완료: ${validCount}/${expectedIds.length}개 정상`);
}

/**
 * GIS 데이터 검증
 */
function validateGIS() {
  console.log('\n=== GIS 데이터 검증 ===\n');

  const gisDir = 'data/gis';
  const expectedFiles = [
    'nakseonjae-walls.geojson',
    'nakseonjae-fences.geojson',
    'nakseonjae-trees.geojson',
    'nakseonjae-groves.geojson',
    'nakseonjae-chimneys.geojson',
    'nakseonjae-drains.geojson'
  ];

  let validCount = 0;
  let totalFeatures = 0;

  expectedFiles.forEach(filename => {
    const filePath = `${gisDir}/${filename}`;

    if (!fs.existsSync(filePath)) {
      error(`GIS 파일 없음: ${filePath}`);
      return;
    }

    try {
      const geojson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (geojson.type !== 'FeatureCollection') {
        error(`${filename}: 잘못된 GeoJSON 타입`);
        return;
      }

      if (!geojson.features || !Array.isArray(geojson.features)) {
        error(`${filename}: features 배열 없음`);
        return;
      }

      // 좌표계 검증 (WGS84 범위 체크)
      let invalidCoords = 0;
      geojson.features.forEach((feature, idx) => {
        const coords = feature.geometry.coordinates;

        if (feature.geometry.type === 'Point') {
          const [lng, lat] = coords;
          if (lng < 126 || lng > 128 || lat < 37 || lat > 38) {
            invalidCoords++;
          }
        } else if (feature.geometry.type === 'LineString') {
          coords.forEach(([lng, lat]) => {
            if (lng < 126 || lng > 128 || lat < 37 || lat > 38) {
              invalidCoords++;
            }
          });
        } else if (feature.geometry.type === 'Polygon') {
          coords.forEach(ring => {
            ring.forEach(([lng, lat]) => {
              if (lng < 126 || lng > 128 || lat < 37 || lat > 38) {
                invalidCoords++;
              }
            });
          });
        }
      });

      if (invalidCoords > 0) {
        warn(`${filename}: ${invalidCoords}개 좌표가 WGS84 범위를 벗어남`);
      }

      success(`${filename} - features: ${geojson.features.length}개`);
      totalFeatures += geojson.features.length;
      validCount++;

    } catch (err) {
      error(`${filename}: JSON 파싱 실패 - ${err.message}`);
    }
  });

  console.log(`\nGIS 검증 완료: ${validCount}/${expectedFiles.length}개 파일, 총 ${totalFeatures}개 피처`);
}

/**
 * 사진 파일 검증
 */
function validatePhotos() {
  console.log('\n=== 사진 파일 검증 ===\n');

  const photoDir = 'assets/photos/nakseonjae';
  const expectedFolders = [
    'pl1_wall', 'pl2_wall', 'pl3_wall',
    'pl4_fence', 'pl5_fence', 'pl6_fence',
    'pt2_tree', 'pt3_tree', 'pt4_grove',
    'pt5_chimney', 'pt6_chimney',
    'drain'
  ];

  let totalPhotos = 0;

  expectedFolders.forEach(folder => {
    const folderPath = `${photoDir}/${folder}`;

    if (!fs.existsSync(folderPath)) {
      warn(`사진 폴더 없음: ${folderPath}`);
      return;
    }

    try {
      const files = fs.readdirSync(folderPath);
      const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

      if (imageFiles.length === 0) {
        warn(`${folder}: 사진 파일 없음`);
      } else {
        success(`${folder} - ${imageFiles.length}개 사진`);
        totalPhotos += imageFiles.length;
      }
    } catch (err) {
      error(`${folder}: 폴더 읽기 실패 - ${err.message}`);
    }
  });

  console.log(`\n사진 검증 완료: 총 ${totalPhotos}개 파일`);
}

/**
 * 데이터 일관성 검증
 */
function validateConsistency() {
  console.log('\n=== 데이터 일관성 검증 ===\n');

  const inspectionDir = 'data/nakseonjae/inspections';
  const inspectionIds = [
    'pl1_wall', 'pl2_wall', 'pl3_wall',
    'pl4_fence', 'pl5_fence', 'pl6_fence',
    'pt2_tree', 'pt3_tree', 'pt4_grove',
    'pt5_chimney', 'pt6_chimney',
    'drain'
  ];

  const inspections = [];
  inspectionIds.forEach(id => {
    const filePath = `${inspectionDir}/${id}.json`;
    if (fs.existsSync(filePath)) {
      try {
        inspections.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
      } catch (err) {
        // 이미 검증 단계에서 오류 출력됨
      }
    }
  });

  // 코드 중복 검증
  const codes = inspections.map(i => i.code);
  const duplicates = codes.filter((c, idx) => codes.indexOf(c) !== idx);
  if (duplicates.length > 0) {
    error(`중복된 코드: ${duplicates.join(', ')}`);
  } else {
    success('코드 중복 없음');
  }

  // 좌표 중복 검증 (같은 위치에 여러 점검표)
  const coordMap = {};
  inspections.forEach(i => {
    if (i.coordinates) {
      const key = `${i.coordinates.lat.toFixed(6)},${i.coordinates.lng.toFixed(6)}`;
      if (coordMap[key]) {
        warn(`같은 좌표에 여러 점검표: ${coordMap[key]} & ${i.id}`);
      } else {
        coordMap[key] = i.id;
      }
    }
  });

  // 사이트 일관성 검증
  const sites = inspections.map(i => i.site);
  const uniqueSites = [...new Set(sites)];
  if (uniqueSites.length > 1) {
    warn(`여러 사이트 발견: ${uniqueSites.join(', ')}`);
  } else {
    success(`사이트 일관성: ${uniqueSites[0]}`);
  }

  console.log('\n일관성 검증 완료');
}

/**
 * 메인 실행
 */
function main() {
  console.log('=== 데이터 무결성 검증 시작 ===');

  validateInspections();
  validateGIS();
  validatePhotos();
  validateConsistency();

  console.log('\n=== 검증 완료 ===');
  console.log(`오류: ${errorCount}개`);
  console.log(`경고: ${warningCount}개`);

  if (errorCount > 0) {
    console.log('\n⚠️  오류가 발견되었습니다. 수정이 필요합니다.');
    process.exit(1);
  } else if (warningCount > 0) {
    console.log('\n✓ 데이터가 정상이지만 경고가 있습니다.');
    process.exit(0);
  } else {
    console.log('\n✓ 모든 데이터가 정상입니다!');
    process.exit(0);
  }
}

main();
