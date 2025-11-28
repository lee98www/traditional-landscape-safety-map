/**
 * GIS 렌더링 모듈
 * Google Maps에 GeoJSON 레이어 표시
 */

const GISRenderer = {
  map: null,
  layers: {},
  markers: {},
  infoWindow: null,

  /**
   * 초기화
   * @param {google.maps.Map} map - Google Maps 인스턴스
   */
  init(map) {
    this.map = map;
    this.infoWindow = new google.maps.InfoWindow();
    this.layers = {};
    this.markers = {};
  },

  /**
   * GeoJSON 레이어 스타일 설정
   */
  getLayerStyle(type) {
    const styles = {
      walls: {
        strokeColor: '#8B4513',
        strokeWeight: 3,
        strokeOpacity: 0.8
      },
      fences: {
        strokeColor: '#A0522D',
        strokeWeight: 2,
        strokeOpacity: 0.7
      },
      trees: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#228B22',
          fillOpacity: 0.8,
          strokeColor: '#006400',
          strokeWeight: 2
        }
      },
      groves: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#2E8B57',
          fillOpacity: 0.7,
          strokeColor: '#006400',
          strokeWeight: 2
        }
      },
      chimneys: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#DC143C',
          fillOpacity: 0.8,
          strokeColor: '#8B0000',
          strokeWeight: 2
        }
      },
      drains: {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#4169E1',
          fillOpacity: 0.8,
          strokeColor: '#00008B',
          strokeWeight: 2
        }
      }
    };

    return styles[type] || {};
  },

  /**
   * GeoJSON 데이터 렌더링
   * @param {string} type - 레이어 타입
   * @param {Object} geojson - GeoJSON 데이터
   * @param {Function} onClick - 클릭 이벤트 핸들러
   */
  renderLayer(type, geojson, onClick) {
    if (!this.map || !geojson) {
      console.warn('맵 또는 GeoJSON 데이터가 없습니다:', type);
      return;
    }

    // 기존 레이어 제거
    if (this.layers[type]) {
      this.map.data.remove(this.layers[type]);
    }

    // GeoJSON 데이터 추가
    const features = this.map.data.addGeoJson(geojson);
    this.layers[type] = features;

    // 스타일 적용
    const style = this.getLayerStyle(type);
    features.forEach(feature => {
      this.map.data.overrideStyle(feature, style);
    });

    // 클릭 이벤트
    if (onClick) {
      this.map.data.addListener('click', (event) => {
        onClick(event);
      });
    }
  },

  /**
   * 모든 GIS 레이어 렌더링
   * @param {Object} gisData - 모든 GIS 데이터
   * @param {Function} onFeatureClick - 피처 클릭 핸들러
   */
  async renderAllLayers(gisData, onFeatureClick) {
    if (!gisData) {
      gisData = await DataLoader.loadAllGIS();
    }

    Object.keys(gisData).forEach(type => {
      this.renderLayer(type, gisData[type], onFeatureClick);
    });
  },

  /**
   * 점검표 마커 추가
   * @param {Object} inspection - 점검표 데이터
   * @param {Function} onClick - 클릭 핸들러
   */
  addInspectionMarker(inspection, onClick) {
    if (!inspection.coordinates) {
      console.warn('좌표 정보가 없습니다:', inspection.id);
      return null;
    }

    const position = {
      lat: inspection.coordinates.lat,
      lng: inspection.coordinates.lng
    };

    // 마커 아이콘 설정 (점검 결과에 따라)
    const rating = inspection.overallAssessment?.rating || '검토 필요';
    const icon = this.getMarkerIcon(rating, inspection.targetType);

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: inspection.targetName,
      icon: icon,
      inspectionData: inspection
    });

    // 클릭 이벤트 (onClick이 null이면 클릭 이벤트 없음)
    if (onClick) {
      marker.addListener('click', () => {
        onClick(inspection);
      });
    }

    this.markers[inspection.id] = marker;
    return marker;
  },

  /**
   * 점검 결과에 따른 마커 아이콘 (통일된 파란색 핀)
   * @param {string} rating - 점검 등급 (사용 안함)
   * @param {string} targetType - 대상 유형
   */
  getMarkerIcon(rating, targetType) {
    // 점검 이력은 통일된 파란색 위치 핀 아이콘 사용
    const pinPath = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';

    return {
      path: pinPath,
      fillColor: '#1976D2',
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
      scale: 1.5,
      anchor: new google.maps.Point(12, 22)
    };
  },

  /**
   * 모든 점검표 마커 추가
   * @param {Array} inspections - 점검표 배열
   * @param {Function} onClick - 클릭 핸들러
   */
  async addAllInspectionMarkers(inspections, onClick) {
    if (!inspections) {
      inspections = await DataLoader.loadAllInspections();
    }

    inspections.forEach(inspection => {
      this.addInspectionMarker(inspection, onClick);
    });
  },

  /**
   * 정보 창 표시
   * @param {google.maps.Marker} marker - 마커
   * @param {Object} inspection - 점검표 데이터
   */
  showInfoWindow(marker, inspection) {
    const content = `
      <div class="gis-info-window">
        <h3>${inspection.targetName}</h3>
        <p><strong>유형:</strong> ${inspection.targetType}</p>
        <p><strong>점검일:</strong> ${inspection.inspectionDate}</p>
        <p><strong>결과:</strong> <span class="rating rating--${inspection.overallAssessment?.rating}">${inspection.overallAssessment?.rating || '검토 필요'}</span></p>
        <button onclick="window.location.href='inspection-confirm.html?id=${inspection.id}'">상세 보기</button>
      </div>
    `;

    this.infoWindow.setContent(content);
    this.infoWindow.open(this.map, marker);
  },

  /**
   * 마커 제거
   * @param {string} inspectionId - 점검표 ID
   */
  removeMarker(inspectionId) {
    if (this.markers[inspectionId]) {
      this.markers[inspectionId].setMap(null);
      delete this.markers[inspectionId];
    }
  },

  /**
   * 모든 마커 제거
   */
  clearMarkers() {
    Object.keys(this.markers).forEach(id => {
      this.markers[id].setMap(null);
    });
    this.markers = {};
  },

  /**
   * 레이어 표시/숨김 토글
   * @param {string} type - 레이어 타입
   * @param {boolean} visible - 표시 여부
   */
  toggleLayer(type, visible) {
    if (!this.layers[type]) return;

    this.layers[type].forEach(feature => {
      this.map.data.overrideStyle(feature, {
        visible: visible
      });
    });
  },

  /**
   * 특정 위치로 지도 이동
   * @param {number} lat - 위도
   * @param {number} lng - 경도
   * @param {number} zoom - 줌 레벨
   */
  panTo(lat, lng, zoom) {
    if (!this.map) return;

    this.map.panTo({ lat, lng });
    if (zoom) {
      this.map.setZoom(zoom);
    }
  },

  /**
   * 점검표로 지도 이동
   * @param {string} inspectionId - 점검표 ID
   */
  async focusInspection(inspectionId) {
    const inspection = await DataLoader.loadInspection(inspectionId);
    if (!inspection || !inspection.coordinates) {
      console.warn('점검표 또는 좌표를 찾을 수 없습니다:', inspectionId);
      return;
    }

    this.panTo(inspection.coordinates.lat, inspection.coordinates.lng, 19);

    // 마커가 있으면 정보 창 표시
    const marker = this.markers[inspectionId];
    if (marker) {
      this.showInfoWindow(marker, inspection);
    }
  },

  /**
   * 경계 박스로 지도 맞추기
   * @param {Array} inspections - 점검표 배열
   */
  fitBounds(inspections) {
    if (!this.map || !inspections || inspections.length === 0) return;

    const bounds = new google.maps.LatLngBounds();

    inspections.forEach(inspection => {
      if (inspection.coordinates) {
        bounds.extend({
          lat: inspection.coordinates.lat,
          lng: inspection.coordinates.lng
        });
      }
    });

    this.map.fitBounds(bounds);
  },

  /**
   * 정리
   */
  cleanup() {
    this.clearMarkers();
    this.layers = {};
    this.infoWindow = null;
    this.map = null;
  }
};

// 전역 접근
if (typeof window !== 'undefined') {
  window.GISRenderer = GISRenderer;
}
