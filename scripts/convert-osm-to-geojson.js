/**
 * OSM Overpass API 결과를 GeoJSON으로 변환
 */
const fs = require('fs');
const path = require('path');

const osmFile = path.join(__dirname, '../data/gis/nakseonjae-buildings.json');
const outputFile = path.join(__dirname, '../data/gis/nakseonjae-buildings.geojson');

// OSM 데이터 읽기
const osmData = JSON.parse(fs.readFileSync(osmFile, 'utf-8'));

// GeoJSON 구조 생성
const geojson = {
  type: 'FeatureCollection',
  features: []
};

// OSM elements를 GeoJSON features로 변환
osmData.elements.forEach(element => {
  if (element.type === 'way' && element.geometry) {
    // Polygon 좌표 생성 (lon, lat 순서로 변환)
    const coordinates = element.geometry.map(point => [point.lon, point.lat]);

    const feature = {
      type: 'Feature',
      properties: {
        id: element.id,
        name: element.tags?.name || element.tags?.['name:ko'] || '건물',
        building: element.tags?.building || 'yes',
        historic: element.tags?.historic || null,
        architecture: element.tags?.['building:architecture'] || null
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      }
    };

    geojson.features.push(feature);
  }
});

// GeoJSON 파일 저장
fs.writeFileSync(outputFile, JSON.stringify(geojson, null, 2), 'utf-8');

console.log(`✓ 변환 완료: ${geojson.features.length}개 건물`);
console.log(`✓ 저장 위치: ${outputFile}`);
