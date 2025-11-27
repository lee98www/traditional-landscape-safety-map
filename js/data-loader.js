/**
 * 데이터 로더 모듈
 * 낙선재 권역 데이터 로드 및 관리
 */

const DataLoader = {
  // 기본 경로 설정
  basePaths: {
    inspections: 'data/nakseonjae/inspections/',
    gis: 'data/gis/',
    photos: 'assets/photos/nakseonjae/'
  },

  // 캐시 저장소
  cache: {
    inspections: null,
    gis: null,
    siteInfo: null
  },

  /**
   * 점검표 데이터 로드
   * @param {string} inspectionId - 점검표 ID (예: 'pl1_wall', 'pt2_tree')
   * @returns {Promise<Object>} 점검표 데이터
   */
  async loadInspection(inspectionId) {
    try {
      const response = await fetch(`${this.basePaths.inspections}${inspectionId}.json`);
      if (!response.ok) {
        throw new Error(`점검표 로드 실패: ${inspectionId}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('점검표 로드 오류:', error);
      return null;
    }
  },

  /**
   * 모든 점검표 데이터 로드
   * @returns {Promise<Array>} 점검표 배열
   */
  async loadAllInspections() {
    if (this.cache.inspections) {
      return this.cache.inspections;
    }

    const inspectionIds = [
      'pl1_wall', 'pl2_wall', 'pl3_wall',
      'pl4_fence', 'pl5_fence', 'pl6_fence',
      'pt2_tree', 'pt3_tree', 'pt4_grove',
      'pt5_chimney', 'pt6_chimney',
      'drain'
    ];

    try {
      const promises = inspectionIds.map(id => this.loadInspection(id));
      const results = await Promise.all(promises);
      this.cache.inspections = results.filter(r => r !== null);
      return this.cache.inspections;
    } catch (error) {
      console.error('전체 점검표 로드 오류:', error);
      return [];
    }
  },

  /**
   * GIS 데이터 로드
   * @param {string} type - GIS 파일 타입 (walls, fences, trees, groves, chimneys, drains)
   * @returns {Promise<Object>} GeoJSON 데이터
   */
  async loadGIS(type) {
    try {
      const response = await fetch(`${this.basePaths.gis}nakseonjae-${type}.geojson`);
      if (!response.ok) {
        throw new Error(`GIS 데이터 로드 실패: ${type}`);
      }
      return await response.json();
    } catch (error) {
      console.error('GIS 로드 오류:', error);
      return null;
    }
  },

  /**
   * 모든 GIS 데이터 로드
   * @returns {Promise<Object>} GIS 데이터 객체
   */
  async loadAllGIS() {
    if (this.cache.gis) {
      return this.cache.gis;
    }

    const types = ['walls', 'fences', 'trees', 'groves', 'chimneys', 'drains'];

    try {
      const promises = types.map(type => this.loadGIS(type));
      const results = await Promise.all(promises);

      this.cache.gis = {};
      types.forEach((type, index) => {
        if (results[index]) {
          this.cache.gis[type] = results[index];
        }
      });

      return this.cache.gis;
    } catch (error) {
      console.error('전체 GIS 로드 오류:', error);
      return {};
    }
  },

  /**
   * 사진 경로 생성
   * @param {string} photoPath - 상대 경로 (예: 'pl1_wall/1. 전경.jpg')
   * @returns {string} 전체 사진 경로
   */
  getPhotoUrl(photoPath) {
    return `${this.basePaths.photos}${photoPath}`;
  },

  /**
   * 점검표에서 사진 URL 목록 생성
   * @param {Object} inspection - 점검표 데이터
   * @returns {Array<string>} 사진 URL 배열
   */
  getPhotoUrls(inspection) {
    if (!inspection || !inspection.photos) {
      return [];
    }
    return inspection.photos.map(photo => this.getPhotoUrl(photo));
  },

  /**
   * 좌표로 점검표 검색
   * @param {number} lat - 위도
   * @param {number} lng - 경도
   * @param {number} threshold - 검색 반경 (기본: 0.0001도 ≈ 11m)
   * @returns {Promise<Array>} 근처 점검표 배열
   */
  async findInspectionsByLocation(lat, lng, threshold = 0.0001) {
    const inspections = await this.loadAllInspections();

    return inspections.filter(inspection => {
      if (!inspection.coordinates) return false;

      const latDiff = Math.abs(inspection.coordinates.lat - lat);
      const lngDiff = Math.abs(inspection.coordinates.lng - lng);

      return latDiff <= threshold && lngDiff <= threshold;
    });
  },

  /**
   * 타입별 점검표 필터링
   * @param {string} targetType - 대상 유형 (석축, 담장, 단일목, 군락, 굴뚝, 집수정)
   * @returns {Promise<Array>} 필터링된 점검표 배열
   */
  async getInspectionsByType(targetType) {
    const inspections = await this.loadAllInspections();
    return inspections.filter(i => i.targetType === targetType);
  },

  /**
   * 점검 결과 등급별 필터링
   * @param {string} rating - 등급 (안전, 관심, 주의, 경계, 위험)
   * @returns {Promise<Array>} 필터링된 점검표 배열
   */
  async getInspectionsByRating(rating) {
    const inspections = await this.loadAllInspections();
    return inspections.filter(i => {
      return i.overallAssessment && i.overallAssessment.rating === rating;
    });
  },

  /**
   * 낙선재 권역 기본 정보
   * @returns {Object} 권역 정보
   */
  getSiteInfo() {
    if (this.cache.siteInfo) {
      return this.cache.siteInfo;
    }

    this.cache.siteInfo = {
      id: 'nakseonjae',
      name: '낙선재 권역',
      center: {
        lat: 37.5790,
        lng: 126.9940
      },
      bounds: {
        north: 37.5800,
        south: 37.5780,
        east: 126.9950,
        west: 126.9930
      },
      zoom: 18,
      totalInspections: 12,
      features: {
        walls: 3,      // 석축
        fences: 3,     // 담장
        trees: 2,      // 단일목
        groves: 1,     // 군락
        chimneys: 2,   // 굴뚝
        drains: 1      // 집수정
      }
    };

    return this.cache.siteInfo;
  },

  /**
   * 캐시 초기화
   */
  clearCache() {
    this.cache = {
      inspections: null,
      gis: null,
      siteInfo: null
    };
  }
};

// 전역 접근 가능하도록 window 객체에 등록
if (typeof window !== 'undefined') {
  window.DataLoader = DataLoader;
}
