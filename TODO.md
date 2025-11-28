# 전통조경 안전지도 v1.0 - 남은 작업 목록

**작성일**: 2025-11-27
**프로젝트**: Traditional Landscape Safety Map (TLSM) v1.0

---

## ✅ 완료된 작업

### Phase A: site-detail.html 긴급 수정 (2-3시간)
- [x] A-1: data-loader.js 확장 (30분)
- [x] A-2: 재해/수리 이력 데이터 추출 (1시간)
- [x] A-3: site-detail.html 수정 (1시간)
- [x] A-4: 모달 팝업 CSS 추가 (30분)
- [x] A-5: 테스트 (30분)
- [x] A-6: 필터 기능 최종 수정 (1시간)

**완료 시간**: 4.5시간
**상태**: ✅ 완료

---

## 🔄 남은 작업 목록

### Phase 1: 데이터 준비 (6-8시간)

#### 1.1 HWP 점검표 → JSON 수동 전사 (4시간)
**우선순위**: 높음
**예상 소요**: 4시간

**작업 내용**:
- [ ] 석축 점검표 3개 (pl1, pl2, pl3)
- [ ] 담장 점검표 3개 (pm1, pm2, pm3)
- [ ] 수목 점검표 4개 (pt1, pt2, pt3, pt4)
- [ ] 굴뚝 점검표 2개 (pf1, pf2)
- [ ] 집수정 점검표 1개 (pd1)

**원본 파일 위치**: `참고자료/송부용(낙선재)/점검표/`

**출력 위치**: `data/nakseonjae/inspections/`

**파일명 규칙**:
```
pl1_wall.json       # 석축 1번
pl2_wall.json       # 석축 2번
pl3_wall.json       # 석축 3번
pm1_fence.json      # 담장 1번
pm2_fence.json      # 담장 2번
pm3_fence.json      # 담장 3번
pt1_tree.json       # 단일목 1번 (미송나무)
pt2_tree.json       # 단일목 2번
pt3_grove.json      # 군락 1번 (대나무)
pt4_grove.json      # 군락 2번
pf1_chimney.json    # 굴뚝 1번
pf2_chimney.json    # 굴뚝 2번
pd1_drain.json      # 집수정 1번
```

**JSON 구조 예시**:
```json
{
  "id": "pl1_wall",
  "siteId": "nakseonjae",
  "targetName": "석축 1번",
  "targetType": "석축",
  "inspectionDate": "2024-06-15",
  "inspector": "홍길동",
  "overallRating": "A",
  "coordinates": { "lat": 37.578900, "lng": 126.993300 },
  "photos": [
    "pl1_overview.jpg",
    "pl1_detail1.jpg",
    "pl1_detail2.jpg"
  ],
  "sections": [
    {
      "category": "기본 정보",
      "items": [
        { "label": "높이", "value": "2.5m" },
        { "label": "길이", "value": "15m" },
        { "label": "재질", "value": "화강암" }
      ]
    },
    {
      "category": "안전성 평가",
      "items": [
        { "label": "균열", "value": "없음", "rating": "A" },
        { "label": "기울기", "value": "정상", "rating": "A" },
        { "label": "침하", "value": "없음", "rating": "A" }
      ]
    }
  ],
  "recommendations": [
    "정기적인 육안 점검 필요",
    "배수로 청소 필요"
  ],
  "nextInspectionDate": "2025-06-15"
}
```

**작업 절차**:
1. 한컴오피스 뷰어로 HWP/HWPX 파일 열기
2. 각 섹션별 데이터 수동 전사
3. JSON 유효성 검증 (VSCode JSON 검증 기능 활용)
4. UTF-8 인코딩 확인
5. 좌표 정확성 검증 (낙선재 권역 내)

---

#### 1.2 기본정보 및 이력 데이터 추출 (1시간)
**우선순위**: 중간
**예상 소요**: 1시간

**작업 내용**:
- [ ] `0. 기본정보 및 재해이력, 수리이력_한글파일.hwpx`에서 추가 데이터 확인
- [ ] 기본정보 섹션 JSON 생성 (`data/nakseonjae/site-info.json`)
- [ ] 환경 이력 데이터 추출 (있는 경우)
- [ ] disaster-history.json, repair-history.json 데이터 검증 및 보완

**출력 파일**: `data/nakseonjae/site-info.json`

**JSON 구조 예시**:
```json
{
  "siteId": "nakseonjae",
  "name": "창덕궁 낙선재 권역",
  "culturalHeritageNumber": "사적 제122호",
  "location": "서울특별시 종로구 율곡로 99",
  "area": "약 5,000㎡",
  "designatedDate": "1963-01-18",
  "managementAgency": "문화재청 궁능유적본부",
  "description": "조선 후기 왕실 건축물...",
  "coordinates": {
    "center": { "lat": 37.579000, "lng": 126.993000 },
    "bounds": {
      "north": 37.579500,
      "south": 37.578500,
      "east": 126.994000,
      "west": 126.992000
    }
  },
  "elements": {
    "walls": 3,
    "fences": 3,
    "trees": 4,
    "groves": 0,
    "chimneys": 2,
    "drains": 1
  }
}
```

---

#### 1.3 Shapefile → GeoJSON 변환 (30분)
**우선순위**: 높음
**예상 소요**: 30분

**작업 내용**:
- [ ] 석축 shp → geojson (walls.geojson)
- [ ] 담장 shp → geojson (fences.geojson)
- [ ] 단일목 shp → geojson (single-trees.geojson)
- [ ] 군락 shp → geojson (tree-groves.geojson)
- [ ] 굴뚝 shp → geojson (chimneys.geojson)
- [ ] 집수정 shp → geojson (drains.geojson)

**원본 파일 위치**: `참고자료/송부용(낙선재)/GIS 데이터/`

**출력 위치**: `data/gis/nakseonjae/`

**변환 도구 옵션**:
1. **QGIS** (추천):
   - 설치: https://qgis.org/
   - Layer 우클릭 → Export → Save Features As → GeoJSON
   - CRS: EPSG:4326 (WGS84) 설정

2. **ogr2ogr** (CLI):
   ```bash
   ogr2ogr -f GeoJSON walls.geojson walls.shp -t_srs EPSG:4326
   ```

3. **온라인 변환**:
   - https://mygeodata.cloud/converter/shp-to-geojson
   - https://mapshaper.org/

**GeoJSON 구조 예시**:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "pl1_wall",
        "name": "석축 1번",
        "height": "2.5m",
        "material": "화강암",
        "rating": "A"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [126.993300, 37.578900],
            [126.993350, 37.578900],
            [126.993350, 37.578920],
            [126.993300, 37.578920],
            [126.993300, 37.578900]
          ]
        ]
      }
    }
  ]
}
```

**검증 항목**:
- [ ] 좌표계가 WGS84 (EPSG:4326)인지 확인
- [ ] properties에 id, name 필드가 있는지 확인
- [ ] 좌표가 낙선재 권역 내에 있는지 확인
- [ ] GeoJSON 유효성 검증: http://geojson.io/

---

#### 1.4 사진 파일 복사 및 정리 (1시간)
**우선순위**: 중간
**예상 소요**: 1시간

**작업 내용**:
- [ ] 참고자료에서 점검 사진 47개 파일 찾기
- [ ] 파일명 정규화 (예: `pl1_overview.jpg`, `pl1_detail1.jpg`)
- [ ] `assets/photos/nakseonjae/` 폴더로 복사
- [ ] 이미지 최적화 (필요시 리사이즈)

**원본 파일 위치**: `참고자료/송부용(낙선재)/사진/` (추정)

**출력 위치**: `assets/photos/nakseonjae/`

**파일명 규칙**:
```
{inspection_id}_{photo_type}{number}.jpg

예시:
pl1_overview.jpg        # 석축 1번 전경
pl1_detail1.jpg         # 석축 1번 상세 1
pl1_detail2.jpg         # 석축 1번 상세 2
pm1_overview.jpg        # 담장 1번 전경
pt1_overview.jpg        # 수목 1번 전경
pt1_bark.jpg            # 수목 1번 수피
pt1_crown.jpg           # 수목 1번 수관
pf1_overview.jpg        # 굴뚝 1번 전경
pd1_overview.jpg        # 집수정 1번 전경
```

**이미지 최적화** (선택사항):
```bash
# ImageMagick 사용
mogrify -resize 1920x1080\> -quality 85 *.jpg

# 또는 온라인 도구
https://tinypng.com/
https://squoosh.app/
```

---

#### 1.5 점검표 템플릿 12종 추출 (2시간)
**우선순위**: 중간
**예상 소요**: 2시간

**작업 내용**:
- [ ] 석축 점검표 템플릿
- [ ] 담장 점검표 템플릿
- [ ] 단일목 점검표 템플릿
- [ ] 군락 점검표 템플릿
- [ ] 굴뚝 점검표 템플릿
- [ ] 집수정 점검표 템플릿

**원본 파일 위치**: `참고자료/안전점검표/`

**출력 위치**: `data/checklists/`

**파일명 규칙**:
```
wall-checklist.json             # 석축
fence-checklist.json            # 담장
single-tree-checklist.json      # 단일목
tree-grove-checklist.json       # 군락
chimney-checklist.json          # 굴뚝
drain-checklist.json            # 집수정
```

**JSON 구조 예시**:
```json
{
  "templateId": "wall-checklist",
  "name": "석축 안전점검표",
  "targetType": "석축",
  "version": "1.0",
  "sections": [
    {
      "sectionId": "basic_info",
      "title": "기본 정보",
      "fields": [
        { "id": "height", "label": "높이", "type": "text", "unit": "m" },
        { "id": "length", "label": "길이", "type": "text", "unit": "m" },
        { "id": "material", "label": "재질", "type": "select", "options": ["화강암", "대리석", "벽돌"] }
      ]
    },
    {
      "sectionId": "safety_check",
      "title": "안전성 평가",
      "fields": [
        { "id": "crack", "label": "균열", "type": "rating", "options": ["A", "B", "C"] },
        { "id": "tilt", "label": "기울기", "type": "rating", "options": ["A", "B", "C"] },
        { "id": "settlement", "label": "침하", "type": "rating", "options": ["A", "B", "C"] }
      ]
    }
  ]
}
```

**작업 절차**:
1. 한컴오피스 뷰어로 점검표 템플릿 HWP 파일 열기
2. 각 섹션 및 필드 구조 파악
3. JSON 스키마 설계
4. 템플릿 JSON 파일 작성
5. inspection-checklist.html에서 동적 렌더링 테스트

---

### Phase 2: 앱 통합 (6-8시간)

#### 2.1 데이터 로더 모듈 완성 (2시간)
**우선순위**: 높음
**예상 소요**: 2시간

**파일**: `js/data-loader.js`

**작업 내용**:
- [ ] loadInspections() 함수 구현 (12개 점검표 로딩)
- [ ] loadGIS() 함수 구현 (6개 GeoJSON 로딩)
- [ ] loadSiteInfo() 함수 구현 (사이트 기본정보 로딩)
- [ ] loadChecklistTemplate() 함수 구현 (템플릿 로딩)
- [ ] 에러 핸들링 개선
- [ ] 캐싱 로직 강화
- [ ] JSDoc 주석 완성

**추가 함수 목록**:
```javascript
// 점검표 로딩
async loadInspections(siteId = 'nakseonjae')
async loadInspection(inspectionId)

// GIS 데이터 로딩
async loadGIS(siteId = 'nakseonjae', layer)
async loadAllGISLayers(siteId = 'nakseonjae')

// 사이트 정보 로딩
async loadSiteInfo(siteId = 'nakseonjae')

// 점검표 템플릿 로딩
async loadChecklistTemplate(targetType)

// 유틸리티
filterInspections(inspections, filters)
getInspectionStats(inspections)
```

---

#### 2.2 GIS 렌더러 모듈 완성 (2시간)
**우선순위**: 높음
**예상 소요**: 2시간

**파일**: `js/gis-renderer.js`

**작업 내용**:
- [ ] renderGeoJSON() 함수 구현 (폴리곤/폴리라인 렌더링)
- [ ] renderMarkers() 함수 구현 (마커 렌더링)
- [ ] clearLayer() 함수 구현 (레이어 삭제)
- [ ] 레이어 관리 시스템 구현
- [ ] 스타일링 옵션 추가
- [ ] 이벤트 핸들러 (클릭, 호버)

**추가 함수 목록**:
```javascript
// GeoJSON 렌더링
renderGeoJSON(geojson, style)
renderPolygon(feature, style)
renderPolyline(feature, style)

// 마커 렌더링
renderMarker(coordinates, options)
renderMarkers(features, options)

// 레이어 관리
addLayer(layerId, layer)
removeLayer(layerId)
clearAllLayers()
toggleLayer(layerId, visible)

// 스타일링
getDefaultStyle(type)
applyStyle(feature, style)

// 이벤트
onFeatureClick(feature, callback)
onFeatureHover(feature, callback)
```

---

#### 2.3 site-detail.html 완전 통합 (2시간)
**우선순위**: 높음
**예상 소요**: 2시간

**파일**: `site-detail.html`

**작업 내용**:
- [ ] 점검 대상 버튼 클릭 시 12개 마커 렌더링
- [ ] GIS 레이어 버튼 클릭 시 GeoJSON 렌더링
- [ ] 마커 클릭 시 모달에 실제 점검표 데이터 표시
- [ ] 사진 갤러리 연동
- [ ] 필터링 기능 개선

**수정 섹션**:
```javascript
// 점검 대상 렌더링
async function renderInspectionTargets() {
  const inspections = await DataLoader.loadInspections('nakseonjae');
  inspections.forEach(inspection => {
    const marker = gisRenderer.renderMarker(
      inspection.coordinates,
      { color: getRatingColor(inspection.overallRating) }
    );
    marker.addListener('click', () => {
      showInspectionModal(inspection);
    });
  });
}

// GIS 레이어 렌더링
async function renderGISLayer(layerType) {
  const geojson = await DataLoader.loadGIS('nakseonjae', layerType);
  gisRenderer.renderGeoJSON(geojson, {
    strokeColor: '#0052CC',
    strokeWeight: 2,
    fillColor: '#0052CC',
    fillOpacity: 0.2
  });
}
```

---

#### 2.4 inspection-checklist.html 동적 렌더링 (2시간)
**우선순위**: 중간
**예상 소요**: 2시간

**파일**: `inspection-checklist.html`

**작업 내용**:
- [ ] URL 파라미터에서 점검 대상 ID 읽기
- [ ] 해당 점검 대상의 템플릿 로딩
- [ ] 템플릿 기반으로 폼 동적 생성
- [ ] 입력 값 검증
- [ ] 사진 업로드 기능 (선택사항)
- [ ] 저장 기능 구현

**JavaScript 구현**:
```javascript
// URL에서 파라미터 읽기
const params = new URLSearchParams(window.location.search);
const inspectionId = params.get('id');
const targetType = params.get('type'); // 'wall', 'fence', 'tree', etc.

// 템플릿 로딩
const template = await DataLoader.loadChecklistTemplate(targetType);

// 폼 동적 생성
function renderChecklistForm(template) {
  const form = document.getElementById('checklistForm');

  template.sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'checklist-section';

    const title = document.createElement('h3');
    title.textContent = section.title;
    sectionDiv.appendChild(title);

    section.fields.forEach(field => {
      const fieldDiv = createField(field);
      sectionDiv.appendChild(fieldDiv);
    });

    form.appendChild(sectionDiv);
  });
}

function createField(field) {
  const div = document.createElement('div');
  div.className = 'form-field';

  const label = document.createElement('label');
  label.textContent = field.label;
  div.appendChild(label);

  let input;
  if (field.type === 'text') {
    input = document.createElement('input');
    input.type = 'text';
  } else if (field.type === 'select') {
    input = document.createElement('select');
    field.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      input.appendChild(opt);
    });
  } else if (field.type === 'rating') {
    input = createRatingButtons(field.options);
  }

  input.id = field.id;
  div.appendChild(input);

  return div;
}
```

---

#### 2.5 사진 갤러리 모듈 (1시간)
**우선순위**: 낮음
**예상 소요**: 1시간

**파일**: `js/photo-gallery.js`

**작업 내용**:
- [ ] 사진 그리드 렌더링
- [ ] 전체화면 갤러리 모달
- [ ] 좌우 네비게이션
- [ ] 확대/축소 기능
- [ ] 키보드 단축키 (←, →, ESC)

**JavaScript 구현**:
```javascript
const PhotoGallery = {
  openGallery(inspectionId, startIndex = 0) {
    // 전체화면 갤러리 모달 열기
  },

  closeGallery() {
    // 갤러리 모달 닫기
  },

  nextPhoto() {
    // 다음 사진
  },

  prevPhoto() {
    // 이전 사진
  },

  renderGrid(photos, containerId) {
    // 그리드 렌더링
  }
};
```

---

#### 2.6 CSS 스타일 추가 (1시간)
**우선순위**: 낮음
**예상 소요**: 1시간

**작업 내용**:
- [ ] inspection-checklist.html 스타일링
- [ ] 사진 갤러리 모달 스타일링
- [ ] 반응형 디자인 개선
- [ ] 모바일 최적화

---

### Phase 3: 검증 및 테스트 (3-4시간)

#### 3.1 데이터 무결성 검증 (1시간)
**우선순위**: 높음
**예상 소요**: 1시간

**작업 내용**:
- [ ] JSON 유효성 검증 스크립트 작성
- [ ] 점검표 ID ↔ GIS 좌표 매칭 확인
- [ ] 점검표 사진 경로 ↔ 실제 파일 존재 확인
- [ ] 좌표 범위 검증 (낙선재 권역 내)
- [ ] 한글 인코딩 문제 확인

**검증 스크립트 예시** (`scripts/validate-data.js`):
```javascript
const fs = require('fs');
const path = require('path');

// JSON 유효성 검증
function validateJSON(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✅ ${filePath}: 유효한 JSON`);
    return data;
  } catch (error) {
    console.error(`❌ ${filePath}: JSON 오류 - ${error.message}`);
    return null;
  }
}

// 좌표 범위 검증
function validateCoordinates(coords, bounds) {
  const { lat, lng } = coords;
  const { north, south, east, west } = bounds;

  if (lat >= south && lat <= north && lng >= west && lng <= east) {
    console.log(`✅ 좌표 ${lat}, ${lng}: 범위 내`);
    return true;
  } else {
    console.error(`❌ 좌표 ${lat}, ${lng}: 범위 밖`);
    return false;
  }
}

// 사진 파일 존재 확인
function validatePhotos(inspection) {
  inspection.photos.forEach(photo => {
    const photoPath = path.join('assets/photos/nakseonjae', photo);
    if (fs.existsSync(photoPath)) {
      console.log(`✅ ${photo}: 존재`);
    } else {
      console.error(`❌ ${photo}: 파일 없음`);
    }
  });
}
```

---

#### 3.2 브라우저 테스트 시나리오 (2시간)
**우선순위**: 높음
**예상 소요**: 2시간

**테스트 시나리오**:

**시나리오 1: 사이트 상세 페이지**
- [ ] index.html에서 낙선재 카드 클릭
- [ ] site-detail.html 로딩 확인
- [ ] 지도 초기화 확인 (비어있는 상태)
- [ ] "점검 대상" 버튼 클릭 → 12개 마커 표시 확인
- [ ] 마커 클릭 → 모달 팝업 확인
- [ ] 모달에서 "전체 보고서 보기" 클릭 → inspection-confirm.html 이동 확인

**시나리오 2: 재해 이력**
- [ ] "재해 이력" 버튼 클릭 → 5개 마커 표시 확인
- [ ] 필터 "전통조경요소: 수목" 선택 → 3개 마커만 표시 확인
- [ ] 필터 "재해: 호우" 선택 → 해당 마커만 표시 확인
- [ ] 필터 "연도: 2023" 선택 → 해당 마커만 표시 확인
- [ ] 필터 "모두보기" 선택 → 전체 마커 표시 확인

**시나리오 3: 수리 이력**
- [ ] "수리 이력" 버튼 클릭 → 11개 마커 표시 확인
- [ ] 서브메뉴 "범람 위험 요소" 클릭 → 필터링 확인
- [ ] 서브메뉴 "모두보기" 클릭 → 전체 마커 표시 확인

**시나리오 4: 점검 프로세스**
- [ ] inspection-site-select.html에서 낙선재 선택
- [ ] 점검 대상 선택 (예: 석축 1번)
- [ ] inspection-checklist.html 로딩 확인
- [ ] 동적으로 생성된 폼 확인
- [ ] 데이터 입력 후 제출
- [ ] inspection-confirm.html에서 결과 확인

**브라우저 호환성 테스트**:
- [ ] Chrome (최신 버전)
- [ ] Edge (최신 버전)
- [ ] Firefox (최신 버전)
- [ ] Safari (Mac, 가능한 경우)

---

#### 3.3 샘플 대조 검증 (1시간)
**우선순위**: 중간
**예상 소요**: 1시간

**작업 내용**:
- [ ] 원본 HWP 점검표와 JSON 데이터 대조 (최소 3개)
- [ ] 원본 Shapefile과 GeoJSON 좌표 대조 (최소 2개)
- [ ] 참고자료 사진과 웹 사진 비교 (최소 10개)
- [ ] 불일치 항목 수정

---

### Phase 4: 문서화 (2시간)

#### 4.1 데이터 통합 보고서 작성 (1시간)
**우선순위**: 낮음
**예상 소요**: 1시간

**파일**: `DATA_INTEGRATION_REPORT.md`

**작성 내용**:
- [ ] 추출된 데이터 통계
- [ ] 파일 구조 및 경로
- [ ] 데이터 변환 과정 설명
- [ ] 좌표 매핑 방법
- [ ] 알려진 이슈 및 제한사항
- [ ] 향후 개선 사항

---

#### 4.2 README 업데이트 (30분)
**우선순위**: 중간
**예상 소요**: 30분

**파일**: `README.md`

**작성 내용**:
- [ ] 프로젝트 개요
- [ ] 설치 및 실행 방법
- [ ] 폴더 구조 설명
- [ ] 사용 방법
- [ ] API 문서 (data-loader, gis-renderer)
- [ ] 라이선스 정보

---

#### 4.3 최종 체크리스트 (30분)
**우선순위**: 높음
**예상 소요**: 30분

**체크 항목**:
- [ ] 모든 HTML 페이지가 정상 작동
- [ ] 브라우저 콘솔 에러 0개
- [ ] 모든 JSON 파일 UTF-8 인코딩
- [ ] 모든 사진 파일 존재
- [ ] GeoJSON 좌표 정확성
- [ ] 점검표 템플릿 12종 완성
- [ ] Git 커밋 메시지 정리
- [ ] 불필요한 파일 삭제 (.DS_Store, Thumbs.db 등)

---

## 📊 전체 작업 타임라인

| Phase | 작업 내용 | 예상 소요 | 상태 |
|-------|-----------|----------|------|
| Phase A | site-detail.html 긴급 수정 | 2-3시간 | ✅ 완료 (4.5시간) |
| Phase 1 | 데이터 준비 | 6-8시간 | ⏳ 대기 |
| Phase 2 | 앱 통합 | 6-8시간 | ⏳ 대기 |
| Phase 3 | 검증 및 테스트 | 3-4시간 | ⏳ 대기 |
| Phase 4 | 문서화 | 2시간 | ⏳ 대기 |
| **합계** | **전체 작업** | **19-25시간** | **18% 완료** |

---

## 🎯 우선순위별 작업 순서

### 높음 (즉시 시작)
1. Phase 1.1: HWP 점검표 → JSON 전사 (4시간)
2. Phase 1.3: Shapefile → GeoJSON 변환 (30분)
3. Phase 2.1: 데이터 로더 모듈 완성 (2시간)
4. Phase 2.2: GIS 렌더러 모듈 완성 (2시간)
5. Phase 2.3: site-detail.html 완전 통합 (2시간)

### 중간 (순차 진행)
6. Phase 1.2: 기본정보 및 이력 데이터 추출 (1시간)
7. Phase 1.4: 사진 파일 복사 및 정리 (1시간)
8. Phase 1.5: 점검표 템플릿 12종 추출 (2시간)
9. Phase 2.4: inspection-checklist.html 동적 렌더링 (2시간)
10. Phase 3.3: 샘플 대조 검증 (1시간)
11. Phase 4.2: README 업데이트 (30분)

### 낮음 (여유 시 진행)
12. Phase 2.5: 사진 갤러리 모듈 (1시간)
13. Phase 2.6: CSS 스타일 추가 (1시간)
14. Phase 4.1: 데이터 통합 보고서 작성 (1시간)

---

## 📝 참고사항

### 원본 데이터 위치
```
참고자료/
├── 송부용(낙선재)/
│   ├── 점검표/                  # HWP/HWPX 점검표 12개
│   ├── GIS 데이터/              # Shapefile 6개
│   ├── 사진/                    # 점검 사진 47개 (추정)
│   └── 안전 관리 이력 확인/
│       └── 0. 기본정보 및 재해이력, 수리이력_한글파일.hwpx
└── 안전점검표/                  # 점검표 템플릿 12종
```

### 출력 데이터 위치
```
TLSM_v1.0_Release_Final/
├── data/
│   ├── nakseonjae/
│   │   ├── inspections/         # 점검표 JSON 12개
│   │   ├── disaster-history.json
│   │   ├── repair-history.json
│   │   └── site-info.json
│   ├── gis/
│   │   └── nakseonjae/          # GeoJSON 6개
│   └── checklists/              # 템플릿 JSON 12종
├── assets/
│   └── photos/
│       └── nakseonjae/          # 사진 47개
└── js/
    ├── data-loader.js
    ├── gis-renderer.js
    └── photo-gallery.js
```

---

## ⚠️ 주의사항

### 사용자 요구사항 준수
- **"설계서대로 누락 없이 완벽하게 구현"**
- **"시간 걸리더라도 똑바로 다 구현해"**
- **"내용은 틀릴지 몰라. 확인은 해야지"**

### 데이터 무결성
- UTF-8 인코딩 필수
- 좌표계 WGS84 (EPSG:4326) 통일
- 점검표 ID ↔ GIS 좌표 매칭 정확성
- 사진 파일 경로 정확성

### Git 커밋 전략
- Phase 단위로 커밋
- 의미 있는 커밋 메시지 작성
- 작업 완료 후 푸시

---

**작성일**: 2025-11-27
**마지막 업데이트**: 2025-11-27
**다음 세션 시작 작업**: Phase 1.1 (HWP 점검표 → JSON 전사)
