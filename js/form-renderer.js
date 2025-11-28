/**
 * FormRenderer - 동적 폼 렌더링 모듈
 * 점검 대상 타입(석축, 담장, 수목 등)에 따라 동적으로 폼을 생성합니다.
 */

const FormRenderer = {
  /**
   * 타입별 폼 렌더링 메인 함수
   * @param {string} targetType - 점검 대상 타입 (석축, 담장, 단일목, 군락, 굴뚝, 집수정)
   * @param {object} data - 점검 데이터 (checklistItems, generalInfo, etc.)
   * @returns {string} HTML 문자열
   */
  renderChecklistForm(targetType, data) {
    console.log('FormRenderer: 폼 렌더링 시작', targetType, data);

    switch(targetType) {
      case '석축':
        return this.renderWallForm(data);
      case '담장':
        return this.renderFenceForm(data);
      case '단일목':
        return this.renderTreeForm(data);
      case '군락':
        return this.renderGroveForm(data);
      case '굴뚝':
        return this.renderChimneyForm(data);
      case '집수정':
      case '배수시설':
        return this.renderDrainForm(data);
      default:
        return `<div class="error">알 수 없는 점검 타입: ${targetType}</div>`;
    }
  },

  /**
   * 일반 현황 섹션 렌더링
   */
  renderGeneralInfo(generalInfo) {
    if (!generalInfo) return '';

    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>코드</label>
          <input type="text" name="code" value="${generalInfo.code || ''}" readonly>
        </div>
        ${generalInfo.materials ? `
        <div class="form-field">
          <label>재료</label>
          <input type="text" name="materials" value="${(generalInfo.materials || []).join(', ')}" readonly>
        </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * 기본 필드 렌더링 (상태 + 판정)
   * @param {string} label - 필드 라벨
   * @param {object} fieldData - {status, severity, remark}
   * @param {string} fieldKey - 필드 키 (name 속성용)
   */
  renderField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const severity = fieldData?.severity || '';
    const remark = fieldData?.remark || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
            <option value="원활" ${status === '원활' ? 'selected' : ''}>원활</option>
            <option value="불량" ${status === '불량' ? 'selected' : ''}>불량</option>
          </select>

          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">선택</option>
            <option value="안전" ${severity === '안전' ? 'selected' : ''}>안전</option>
            <option value="관심" ${severity === '관심' ? 'selected' : ''}>관심</option>
            <option value="주의" ${severity === '주의' ? 'selected' : ''}>주의</option>
            <option value="경계" ${severity === '경계' ? 'selected' : ''}>경계</option>
            <option value="위험" ${severity === '위험' ? 'selected' : ''}>위험</option>
          </select>

          <input type="text" name="${fieldKey}-remark"
                 class="remark-input" placeholder="비고"
                 value="${remark}">
        </div>
      </div>
    `;
  },

  /**
   * 등급 포함 필드 렌더링 (상태 + 판정 + 등급)
   * @param {string} label - 필드 라벨
   * @param {object} fieldData - {status, severity, grade, remark}
   * @param {string} fieldKey - 필드 키
   */
  renderFieldWithGrade(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const severity = fieldData?.severity || '';
    const grade = fieldData?.grade || '';
    const remark = fieldData?.remark || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>

          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">선택</option>
            <option value="안전" ${severity === '안전' ? 'selected' : ''}>안전</option>
            <option value="관심" ${severity === '관심' ? 'selected' : ''}>관심</option>
            <option value="주의" ${severity === '주의' ? 'selected' : ''}>주의</option>
            <option value="경계" ${severity === '경계' ? 'selected' : ''}>경계</option>
            <option value="위험" ${severity === '위험' ? 'selected' : ''}>위험</option>
          </select>

          <select name="${fieldKey}-grade" class="grade-select">
            <option value="">등급</option>
            <option value="경미" ${grade === '경미' ? 'selected' : ''}>경미</option>
            <option value="약간 심각" ${grade === '약간 심각' ? 'selected' : ''}>약간 심각</option>
            <option value="심각" ${grade === '심각' ? 'selected' : ''}>심각</option>
            <option value="매우 심각" ${grade === '매우 심각' ? 'selected' : ''}>매우 심각</option>
          </select>

          <input type="text" name="${fieldKey}-remark"
                 class="remark-input" placeholder="비고"
                 value="${remark}">
        </div>
      </div>
    `;
  },

  /**
   * 석축(Wall) 폼 렌더링
   */
  renderWallForm(data) {
    const checklistItems = data.checklistItems || {};
    const foundation = checklistItems.foundation || {};
    const front = checklistItems.front || {};
    const drainage = checklistItems.drainage || {};
    const rockfall = checklistItems.rockfall || {};
    const top = checklistItems.top || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>기초부</h3>
          ${this.renderField('세굴', foundation.scour, 'foundation-scour')}
          ${this.renderField('침하', foundation.subsidence, 'foundation-subsidence')}
          ${this.renderField('수분침투', foundation.waterInfiltration, 'foundation-waterInfiltration')}
        </div>

        <div class="form-section">
          <h3>전면부</h3>
          ${this.renderFieldWithGrade('균열', front.crack, 'front-crack')}
          ${this.renderFieldWithGrade('손상/탈락', front.damage, 'front-damage')}
          ${this.renderFieldWithGrade('열화', front.weathering, 'front-weathering')}
          ${this.renderField('누수', front.leakage, 'front-leakage')}
          ${this.renderField('충진재 유실', front.fillingLoss, 'front-fillingLoss')}
          ${this.renderField('줄눈 유실', front.jointLoss, 'front-jointLoss')}
          ${this.renderFieldWithGrade('변형', front.deformation, 'front-deformation')}
        </div>

        <div class="form-section">
          <h3>배수</h3>
          ${this.renderField('배수 상태', drainage, 'drainage')}
        </div>

        <div class="form-section">
          <h3>낙석</h3>
          ${this.renderField('낙석 위험', rockfall, 'rockfall')}
        </div>

        <div class="form-section">
          <h3>상부</h3>
          ${this.renderField('지반침하', top.groundSubsidence, 'top-groundSubsidence')}
        </div>

        <div class="form-section">
          <h3>추가 피해 요소</h3>
          <div class="form-field">
            <label>존재 여부</label>
            <select name="additionalDamage-exist">
              <option value="없음" ${additionalDamage.exist === '없음' ? 'selected' : ''}>없음</option>
              <option value="있음" ${additionalDamage.exist === '있음' ? 'selected' : ''}>있음</option>
            </select>
          </div>
          ${this.renderField('수로', additionalDamage.waterway, 'additionalDamage-waterway')}
          ${this.renderField('집수정', additionalDamage.sump, 'additionalDamage-sump')}
        </div>
      </div>
    `;
  },

  /**
   * 담장(Fence) 폼 렌더링 - 석축과 유사한 구조
   */
  renderFenceForm(data) {
    // 담장은 석축과 구조가 유사하므로 Wall 폼 재사용
    return this.renderWallForm(data);
  },

  /**
   * 단일목(Tree) 폼 렌더링
   */
  renderTreeForm(data) {
    const checklistItems = data.checklistItems || {};
    const root = checklistItems.root || checklistItems.뿌리 || {};
    const base = checklistItems.base || checklistItems.근원 || {};
    const trunk = checklistItems.trunk || checklistItems.줄기 || {};
    const branch = checklistItems.branch || checklistItems.가지 || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>뿌리</h3>
          ${this.renderFieldWithGrade('복토·심토', root.burial, 'root-burial')}
          ${this.renderFieldWithGrade('뿌리들림', root.uprooting, 'root-uprooting')}
          ${this.renderFieldWithGrade('뿌리감기', root.circling, 'root-circling')}
          ${this.renderFieldWithGrade('결함', root.defect, 'root-defect')}
        </div>

        <div class="form-section">
          <h3>근원</h3>
          ${this.renderFieldWithGrade('결함', base.defect, 'base-defect')}
          ${this.renderFieldWithGrade('병충해', base.pestDisease, 'base-pestDisease')}
        </div>

        <div class="form-section">
          <h3>줄기</h3>
          ${this.renderField('밀도', trunk.density, 'trunk-density')}
          ${this.renderField('엽색', trunk.leafColor, 'trunk-leafColor')}
          ${this.renderFieldWithGrade('결함', trunk.defect, 'trunk-defect')}
          ${this.renderFieldWithGrade('병충해', trunk.pestDisease, 'trunk-pestDisease')}
        </div>

        <div class="form-section">
          <h3>가지</h3>
          ${this.renderFieldWithGrade('고사지', branch.deadBranch, 'branch-deadBranch')}
          ${this.renderFieldWithGrade('결함', branch.defect, 'branch-defect')}
          ${this.renderFieldWithGrade('병충해', branch.pestDisease, 'branch-pestDisease')}
        </div>
      </div>
    `;
  },

  /**
   * 군락(Grove) 폼 렌더링
   */
  renderGroveForm(data) {
    const checklistItems = data.checklistItems || {};
    const structural = checklistItems.structural || checklistItems.구조적요소 || {};
    const physiological = checklistItems.physiological || checklistItems.생리적요소 || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>구조적 요소</h3>
          ${this.renderFieldWithGrade('결함', structural.defect, 'structural-defect')}
          ${this.renderField('기울기', structural.leaning, 'structural-leaning')}
          ${this.renderFieldWithGrade('뿌리들림', structural.uprooting, 'structural-uprooting')}
          ${this.renderField('토사결합력', structural.soilBinding, 'structural-soilBinding')}
          ${this.renderField('토양상태', structural.soilCondition, 'structural-soilCondition')}
          ${this.renderField('외과수술', structural.surgery, 'structural-surgery')}
          ${this.renderField('보강시설', structural.reinforcement, 'structural-reinforcement')}
        </div>

        <div class="form-section">
          <h3>생리적 요소</h3>
          ${this.renderField('생육상태', physiological.growthCondition, 'physiological-growthCondition')}
          ${this.renderFieldWithGrade('병충해', physiological.pestDisease, 'physiological-pestDisease')}
          ${this.renderField('고사목', physiological.deadTree, 'physiological-deadTree')}
        </div>
      </div>
    `;
  },

  /**
   * 굴뚝(Chimney) 폼 렌더링
   */
  renderChimneyForm(data) {
    const checklistItems = data.checklistItems || {};
    const foundation = checklistItems.foundation || {};
    const body = checklistItems.body || {};
    const top = checklistItems.top || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>기초부</h3>
          ${this.renderField('세굴', foundation.scour, 'foundation-scour')}
          ${this.renderField('침하', foundation.subsidence, 'foundation-subsidence')}
        </div>

        <div class="form-section">
          <h3>몸체부</h3>
          ${this.renderFieldWithGrade('균열', body.crack, 'body-crack')}
          ${this.renderFieldWithGrade('파손/탈락', body.damage, 'body-damage')}
          ${this.renderFieldWithGrade('열화', body.weathering, 'body-weathering')}
          ${this.renderFieldWithGrade('기울기', body.leaning, 'body-leaning')}
        </div>

        <div class="form-section">
          <h3>상부</h3>
          ${this.renderField('파손', top.damage, 'top-damage')}
        </div>
      </div>
    `;
  },

  /**
   * 집수정(Drain) 폼 렌더링
   */
  renderDrainForm(data) {
    const checklistItems = data.checklistItems || {};
    const floor = checklistItems.floor || checklistItems.바닥부 || {};
    const wall = checklistItems.wall || checklistItems.벽체부 || {};
    const cover = checklistItems.cover || checklistItems.덮개부 || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>바닥부</h3>
          ${this.renderFieldWithGrade('균열', floor.crack, 'floor-crack')}
          ${this.renderFieldWithGrade('파손/탈락', floor.damage, 'floor-damage')}
          ${this.renderFieldWithGrade('열화', floor.weathering, 'floor-weathering')}
          ${this.renderField('퇴적', floor.sedimentation, 'floor-sedimentation')}
          ${this.renderField('침하', floor.subsidence, 'floor-subsidence')}
          ${this.renderField('누수', floor.leakage, 'floor-leakage')}
        </div>

        <div class="form-section">
          <h3>벽체부</h3>
          ${this.renderFieldWithGrade('균열', wall.crack, 'wall-crack')}
          ${this.renderFieldWithGrade('파손/탈락', wall.damage, 'wall-damage')}
          ${this.renderFieldWithGrade('열화', wall.weathering, 'wall-weathering')}
        </div>

        <div class="form-section">
          <h3>덮개부</h3>
          ${this.renderFieldWithGrade('균열', cover.crack, 'cover-crack')}
          ${this.renderFieldWithGrade('파손', cover.damage, 'cover-damage')}
          ${this.renderField('탈락', cover.falling, 'cover-falling')}
        </div>
      </div>
    `;
  }
};

// 전역으로 등록
if (typeof window !== 'undefined') {
  window.FormRenderer = FormRenderer;
}
