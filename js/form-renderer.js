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
      case '석축 및 옹벽':
        return this.renderWallForm(data);
      case '담장':
        return this.renderWallFenceForm(data);
      case '단일목':
      case '수목: 단일목':
        return this.renderSingleTreeForm(data);
      case '군락':
      case '수목: 군락':
        return this.renderTreeColonyForm(data);
      case '굴뚝':
        return this.renderChimneyForm(data);
      case '집수정':
      case '배수시설':
        return this.renderDrainageForm(data);
      case '비탈면':
        return this.renderSlopeForm(data);
      case '지반':
        return this.renderGroundForm(data);
      case '다리':
        return this.renderBridgeForm(data);
      case '지당':
        return this.renderPondForm(data);
      case '문':
        return this.renderGateForm(data);
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
   * 집수정(Drain) 폼 렌더링 - 기존 유지
   */
  renderDrainForm(data) {
    return this.renderDrainageForm(data);
  },

  /**
   * 배수시설(Drainage) 폼 렌더링 - PDF 기준 업데이트
   */
  renderDrainageForm(data) {
    const checklistItems = data.checklistItems || {};
    const floor = checklistItems.floor || checklistItems.바닥부 || {};
    const wall = checklistItems.wall || checklistItems.벽체부 || {};
    const cover = checklistItems.cover || checklistItems.덮개부 || {};
    const coating = checklistItems.coating || checklistItems.피복재료 || {};
    const drainage = checklistItems.drainage || checklistItems.배수상태 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>바닥부</h3>
          ${this.renderFieldWithGrade('균열', floor.crack, 'floor-crack')}
          ${this.renderFieldWithGrade('파손/탈락', floor.damage, 'floor-damage')}
          ${this.renderFieldWithGrade('열화', floor.weathering, 'floor-weathering')}
          ${this.renderField('퇴적', floor.sedimentation, 'floor-sedimentation')}
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

        <div class="form-section">
          <h3>피복재료</h3>
          ${this.renderFieldWithGrade('균열', coating.crack, 'coating-crack')}
          ${this.renderFieldWithGrade('파손', coating.damage, 'coating-damage')}
          ${this.renderFieldWithGrade('열화', coating.weathering, 'coating-weathering')}
        </div>

        <div class="form-section">
          <h3>배수상태</h3>
          ${this.renderDrainageStatusField(drainage, 'drainage')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 비탈면(Slope) 폼 렌더링
   */
  renderSlopeForm(data) {
    const checklistItems = data.checklistItems || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderSlopeGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>점검항목</h3>
          ${this.renderSelectField('토사암반층 결합력', checklistItems.soilBinding, 'soilBinding', ['강', '중', '약'])}
          ${this.renderSelectField('토층 심도', checklistItems.soilDepth, 'soilDepth', ['얕음', '중간', '깊음'])}
          ${this.renderSelectField('피복율', checklistItems.coverageRate, 'coverageRate', ['높음', '중간', '낮음', '없음'])}
          ${this.renderField('낙석흔적', checklistItems.rockfallTrace, 'rockfallTrace')}
          ${this.renderSelectField('풍화도', checklistItems.weatheringDegree, 'weatheringDegree', ['양호', '경미', '심각', '매우심각'])}
          ${this.renderDrainageStatusField(checklistItems.drainageStatus, 'drainageStatus')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 지반(Ground) 폼 렌더링
   */
  renderGroundForm(data) {
    const checklistItems = data.checklistItems || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>점검항목</h3>
          ${this.renderFieldWithGrade('세굴', checklistItems.scour, 'scour')}
          ${this.renderFieldWithGrade('침하', checklistItems.subsidence, 'subsidence')}
          ${this.renderFieldWithGrade('공동', checklistItems.cavity, 'cavity')}
          ${this.renderField('지반노출', checklistItems.groundExposure, 'groundExposure')}
          ${this.renderField('지면유출흔적', checklistItems.surfaceRunoff, 'surfaceRunoff')}
          ${this.renderSelectField('지면구배', checklistItems.surfaceSlope, 'surfaceSlope', ['평탄', '완만', '경사'])}
          ${this.renderDrainageStatusField(checklistItems.drainageStatus, 'drainageStatus')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 다리(Bridge) 폼 렌더링
   */
  renderBridgeForm(data) {
    const checklistItems = data.checklistItems || {};
    const foundation = checklistItems.foundation || checklistItems.기초부 || {};
    const pier = checklistItems.pier || checklistItems.교각부 || {};
    const deck = checklistItems.deck || checklistItems.교면부 || {};
    const railing = checklistItems.railing || checklistItems.난간 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderBridgeGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>기초부</h3>
          ${this.renderFieldWithGrade('세굴', foundation.scour, 'foundation-scour')}
          ${this.renderFieldWithGrade('침하', foundation.subsidence, 'foundation-subsidence')}
          ${this.renderFieldWithGrade('균열', foundation.crack, 'foundation-crack')}
          ${this.renderFieldWithGrade('파손', foundation.damage, 'foundation-damage')}
        </div>

        <div class="form-section">
          <h3>교각부</h3>
          ${this.renderFieldWithGrade('균열', pier.crack, 'pier-crack')}
          ${this.renderFieldWithGrade('파손/탈락', pier.damage, 'pier-damage')}
          ${this.renderFieldWithGrade('열화', pier.weathering, 'pier-weathering')}
          ${this.renderFieldWithGrade('변형', pier.deformation, 'pier-deformation')}
          ${this.renderFieldWithGrade('부식', pier.corrosion, 'pier-corrosion')}
          ${this.renderField('유간', pier.gap, 'pier-gap')}
        </div>

        <div class="form-section">
          <h3>교면부</h3>
          ${this.renderFieldWithGrade('균열', deck.crack, 'deck-crack')}
          ${this.renderFieldWithGrade('파손/탈락', deck.damage, 'deck-damage')}
          ${this.renderFieldWithGrade('열화', deck.weathering, 'deck-weathering')}
          ${this.renderFieldWithGrade('부식', deck.corrosion, 'deck-corrosion')}
        </div>

        <div class="form-section">
          <h3>난간</h3>
          ${this.renderFieldWithGrade('균열', railing.crack, 'railing-crack')}
          ${this.renderFieldWithGrade('파손/탈락', railing.damage, 'railing-damage')}
          ${this.renderFieldWithGrade('부식', railing.corrosion, 'railing-corrosion')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 지당(Pond) 폼 렌더링
   */
  renderPondForm(data) {
    const checklistItems = data.checklistItems || {};
    const floor = checklistItems.floor || checklistItems.바닥부 || {};
    const sideWall = checklistItems.sideWall || checklistItems.측벽부 || {};
    const island = checklistItems.island || checklistItems.중도 || {};
    const inlet = checklistItems.inlet || checklistItems.입수구 || {};
    const outlet = checklistItems.outlet || checklistItems.출수구 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderPondGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>바닥부</h3>
          ${this.renderFieldWithGrade('균열', floor.crack, 'floor-crack')}
          ${this.renderFieldWithGrade('파손', floor.damage, 'floor-damage')}
          ${this.renderFieldWithGrade('열화', floor.weathering, 'floor-weathering')}
          ${this.renderField('퇴적', floor.sedimentation, 'floor-sedimentation')}
          ${this.renderField('침하', floor.subsidence, 'floor-subsidence')}
          ${this.renderField('누수', floor.leakage, 'floor-leakage')}
        </div>

        <div class="form-section">
          <h3>측벽부</h3>
          ${this.renderFieldWithGrade('균열', sideWall.crack, 'sideWall-crack')}
          ${this.renderFieldWithGrade('파손/탈락', sideWall.damage, 'sideWall-damage')}
          ${this.renderFieldWithGrade('열화', sideWall.weathering, 'sideWall-weathering')}
          ${this.renderField('누수', sideWall.leakage, 'sideWall-leakage')}
          ${this.renderField('줄눈유실', sideWall.jointLoss, 'sideWall-jointLoss')}
          ${this.renderFieldWithGrade('변형', sideWall.deformation, 'sideWall-deformation')}
        </div>

        <div class="form-section">
          <h3>중도</h3>
          ${this.renderFieldWithGrade('균열', island.crack, 'island-crack')}
          ${this.renderFieldWithGrade('파손/탈락', island.damage, 'island-damage')}
          ${this.renderFieldWithGrade('열화', island.weathering, 'island-weathering')}
          ${this.renderField('침하', island.subsidence, 'island-subsidence')}
        </div>

        <div class="form-section">
          <h3>배수시설 - 입수구</h3>
          ${this.renderField('막힘', inlet.clogged, 'inlet-clogged')}
          ${this.renderField('파손', inlet.damage, 'inlet-damage')}
        </div>

        <div class="form-section">
          <h3>배수시설 - 출수구</h3>
          ${this.renderField('막힘', outlet.clogged, 'outlet-clogged')}
          ${this.renderField('파손', outlet.damage, 'outlet-damage')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 문(Gate) 폼 렌더링
   */
  renderGateForm(data) {
    const checklistItems = data.checklistItems || {};
    const foundation = checklistItems.foundation || checklistItems.기초부 || {};
    const wall = checklistItems.wall || checklistItems.벽체부 || {};
    const roof = checklistItems.roof || checklistItems.지붕부 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderBuildingGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>기초부</h3>
          ${this.renderField('세굴', foundation.scour, 'foundation-scour')}
          ${this.renderField('침하', foundation.subsidence, 'foundation-subsidence')}
          ${this.renderField('우수침투흔', foundation.waterTrace, 'foundation-waterTrace')}
        </div>

        <div class="form-section">
          <h3>벽체부</h3>
          ${this.renderFieldWithGrade('균열', wall.crack, 'wall-crack')}
          ${this.renderFieldWithGrade('파손/탈락', wall.damage, 'wall-damage')}
          ${this.renderFieldWithGrade('열화', wall.weathering, 'wall-weathering')}
          ${this.renderField('누수흔', wall.leakageTrace, 'wall-leakageTrace')}
          ${this.renderFieldWithGrade('변형', wall.deformation, 'wall-deformation')}
          ${this.renderFieldWithGrade('부식', wall.corrosion, 'wall-corrosion')}
        </div>

        <div class="form-section">
          <h3>지붕부</h3>
          ${this.renderFieldWithGrade('균열', roof.crack, 'roof-crack')}
          ${this.renderFieldWithGrade('파손/탈락', roof.damage, 'roof-damage')}
          ${this.renderFieldWithGrade('열화', roof.weathering, 'roof-weathering')}
          ${this.renderFieldWithGrade('변형', roof.deformation, 'roof-deformation')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 담장(WallFence) 폼 렌더링 - PDF 기준 업데이트
   */
  renderWallFenceForm(data) {
    const checklistItems = data.checklistItems || {};
    const foundation = checklistItems.foundation || checklistItems.기초부 || {};
    const wall = checklistItems.wall || checklistItems.벽체부 || {};
    const roof = checklistItems.roof || checklistItems.지붕부 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderBuildingGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>기초부</h3>
          ${this.renderField('세굴', foundation.scour, 'foundation-scour')}
          ${this.renderField('침하', foundation.subsidence, 'foundation-subsidence')}
          ${this.renderField('우수침투흔', foundation.waterTrace, 'foundation-waterTrace')}
        </div>

        <div class="form-section">
          <h3>벽체부</h3>
          ${this.renderFieldWithGrade('균열', wall.crack, 'wall-crack')}
          ${this.renderFieldWithGrade('파손/탈락', wall.damage, 'wall-damage')}
          ${this.renderFieldWithGrade('열화', wall.weathering, 'wall-weathering')}
          ${this.renderField('누수흔', wall.leakageTrace, 'wall-leakageTrace')}
          ${this.renderField('줄눈유실', wall.jointLoss, 'wall-jointLoss')}
          ${this.renderFieldWithGrade('변형', wall.deformation, 'wall-deformation')}
          ${this.renderFieldWithGrade('부식', wall.corrosion, 'wall-corrosion')}
        </div>

        <div class="form-section">
          <h3>지붕부</h3>
          ${this.renderFieldWithGrade('균열', roof.crack, 'roof-crack')}
          ${this.renderFieldWithGrade('파손/탈락', roof.damage, 'roof-damage')}
          ${this.renderFieldWithGrade('열화', roof.weathering, 'roof-weathering')}
          ${this.renderFieldWithGrade('변형', roof.deformation, 'roof-deformation')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 단일목(SingleTree) 폼 렌더링 - PDF 기준 업데이트
   */
  renderSingleTreeForm(data) {
    const checklistItems = data.checklistItems || {};
    const root = checklistItems.root || checklistItems.뿌리 || {};
    const base = checklistItems.base || checklistItems.근원 || {};
    const trunk = checklistItems.trunk || checklistItems.줄기 || {};
    const branch = checklistItems.branch || checklistItems.가지 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderTreeGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>뿌리</h3>
          ${this.renderSelectField('복토·심토', root.burial, 'root-burial', ['양호', '보통', '불량'])}
          ${this.renderFieldWithGrade('뿌리들림', root.uprooting, 'root-uprooting')}
          ${this.renderFieldWithGrade('뿌리감기', root.circling, 'root-circling')}
          ${this.renderDefectField('결함', root.defect, 'root-defect')}
        </div>

        <div class="form-section">
          <h3>근원</h3>
          ${this.renderDefectField('결함', base.defect, 'base-defect')}
          ${this.renderPestField('병충해', base.pest, 'base-pest')}
        </div>

        <div class="form-section">
          <h3>줄기</h3>
          ${this.renderSelectField('밀도', trunk.density, 'trunk-density', ['밀생', '보통', '성글게'])}
          ${this.renderSelectField('엽색', trunk.leafColor, 'trunk-leafColor', ['정상', '이상'])}
          ${this.renderDefectField('결함', trunk.defect, 'trunk-defect')}
          ${this.renderPestField('병충해', trunk.pest, 'trunk-pest')}
        </div>

        <div class="form-section">
          <h3>가지</h3>
          ${this.renderFieldWithGrade('고사지', branch.deadBranch, 'branch-deadBranch')}
          ${this.renderDefectField('결함', branch.defect, 'branch-defect')}
          ${this.renderPestField('병충해', branch.pest, 'branch-pest')}
        </div>

        <div class="form-section">
          <h3>기타</h3>
          ${this.renderLeaningField('기울기', checklistItems.leaning, 'leaning')}
          ${this.renderSelectField('토사결합력', checklistItems.soilBinding, 'soilBinding', ['강', '중', '약'])}
          ${this.renderSelectField('토양상태', checklistItems.soilCondition, 'soilCondition', ['양호', '보통', '불량'])}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  /**
   * 군락(TreeColony) 폼 렌더링 - PDF 기준 업데이트
   */
  renderTreeColonyForm(data) {
    const checklistItems = data.checklistItems || {};
    const structural = checklistItems.structural || checklistItems.구조적요소 || {};
    const physiological = checklistItems.physiological || checklistItems.생리적요소 || {};
    const additionalDamage = checklistItems.additionalDamage || {};

    return `
      <div class="form-container">
        ${this.renderColonyGeneralInfo(data.generalInfo)}

        <div class="form-section">
          <h3>구조적 요소</h3>
          ${this.renderDefectField('결함', structural.defect, 'structural-defect')}
          ${this.renderColonyLeaningField('기울기', structural.leaning, 'structural-leaning')}
          ${this.renderColonyUprootingField('뿌리들림', structural.uprooting, 'structural-uprooting')}
          ${this.renderSelectField('토사결합력', structural.soilBinding, 'structural-soilBinding', ['강', '중', '약'])}
          ${this.renderSelectField('토양상태', structural.soilCondition, 'structural-soilCondition', ['양호', '보통', '불량'])}
          ${this.renderField('외과수술', structural.surgery, 'structural-surgery')}
          ${this.renderReinforcementField('보강시설', structural.reinforcement, 'structural-reinforcement')}
        </div>

        <div class="form-section">
          <h3>생리적 요소</h3>
          ${this.renderPestTypeField('병해', physiological.disease, 'physiological-disease')}
          ${this.renderPestTypeField('충해', physiological.insect, 'physiological-insect')}
        </div>

        ${this.renderAdditionalDamageSection(additionalDamage)}
      </div>
    `;
  },

  // ========== Helper Functions ==========

  /**
   * 배수상태 필드 렌더링
   */
  renderDrainageStatusField(fieldData, fieldKey) {
    const status = fieldData?.status || '';
    return `
      <div class="form-field">
        <label class="field-label">배수상태</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="원활" ${status === '원활' ? 'selected' : ''}>원활</option>
            <option value="불량" ${status === '불량' ? 'selected' : ''}>불량</option>
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 선택형 필드 렌더링
   */
  renderSelectField(label, fieldData, fieldKey, options) {
    const value = fieldData?.value || fieldData || '';
    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}" class="status-select">
            <option value="">선택</option>
            ${options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 결함 필드 렌더링 (결함유형 + 판정 + 등급)
   */
  renderDefectField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const defectType = fieldData?.defectType || '';
    const severity = fieldData?.severity || '';
    const grade = fieldData?.grade || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-defectType" class="remark-input" placeholder="결함유형" value="${defectType}">
          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">판정</option>
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
        </div>
      </div>
    `;
  },

  /**
   * 병충해 필드 렌더링 (병해/충해 + 판정)
   */
  renderPestField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const disease = fieldData?.disease || '';
    const insect = fieldData?.insect || '';
    const severity = fieldData?.severity || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-disease" class="remark-input" placeholder="병해" value="${disease}">
          <input type="text" name="${fieldKey}-insect" class="remark-input" placeholder="충해" value="${insect}">
          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">판정</option>
            <option value="안전" ${severity === '안전' ? 'selected' : ''}>안전</option>
            <option value="관심" ${severity === '관심' ? 'selected' : ''}>관심</option>
            <option value="주의" ${severity === '주의' ? 'selected' : ''}>주의</option>
            <option value="경계" ${severity === '경계' ? 'selected' : ''}>경계</option>
            <option value="위험" ${severity === '위험' ? 'selected' : ''}>위험</option>
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 기울기 필드 렌더링 (각도 + 방향 + 판정)
   */
  renderLeaningField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const angle = fieldData?.angle || '';
    const direction = fieldData?.direction || '';
    const severity = fieldData?.severity || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-angle" class="remark-input" placeholder="각도(°)" value="${angle}" style="width: 80px;">
          <input type="text" name="${fieldKey}-direction" class="remark-input" placeholder="방향" value="${direction}" style="width: 80px;">
          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">판정</option>
            <option value="안전" ${severity === '안전' ? 'selected' : ''}>안전</option>
            <option value="관심" ${severity === '관심' ? 'selected' : ''}>관심</option>
            <option value="주의" ${severity === '주의' ? 'selected' : ''}>주의</option>
            <option value="경계" ${severity === '경계' ? 'selected' : ''}>경계</option>
            <option value="위험" ${severity === '위험' ? 'selected' : ''}>위험</option>
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 군락 기울기 필드 렌더링 (본수 + 판정)
   */
  renderColonyLeaningField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const count = fieldData?.count || '';
    const severity = fieldData?.severity || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-count" class="remark-input" placeholder="본수" value="${count}" style="width: 80px;">
          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">판정</option>
            <option value="안전" ${severity === '안전' ? 'selected' : ''}>안전</option>
            <option value="관심" ${severity === '관심' ? 'selected' : ''}>관심</option>
            <option value="주의" ${severity === '주의' ? 'selected' : ''}>주의</option>
            <option value="경계" ${severity === '경계' ? 'selected' : ''}>경계</option>
            <option value="위험" ${severity === '위험' ? 'selected' : ''}>위험</option>
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 군락 뿌리들림 필드 렌더링 (본수 + 판정 + 등급)
   */
  renderColonyUprootingField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const count = fieldData?.count || '';
    const severity = fieldData?.severity || '';
    const grade = fieldData?.grade || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-count" class="remark-input" placeholder="본수" value="${count}" style="width: 80px;">
          <select name="${fieldKey}-severity" class="severity-select">
            <option value="">판정</option>
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
        </div>
      </div>
    `;
  },

  /**
   * 보강시설 필드 렌더링
   */
  renderReinforcementField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const condition = fieldData?.condition || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <select name="${fieldKey}-condition" class="status-select">
            <option value="">상태</option>
            <option value="양호" ${condition === '양호' ? 'selected' : ''}>양호</option>
            <option value="보통" ${condition === '보통' ? 'selected' : ''}>보통</option>
            <option value="불량" ${condition === '불량' ? 'selected' : ''}>불량</option>
          </select>
        </div>
      </div>
    `;
  },

  /**
   * 병해/충해 종류 필드 렌더링
   */
  renderPestTypeField(label, fieldData, fieldKey) {
    const status = fieldData?.status || '';
    const type = fieldData?.type || '';

    return `
      <div class="form-field">
        <label class="field-label">${label}</label>
        <div class="field-controls">
          <select name="${fieldKey}-status" class="status-select">
            <option value="">선택</option>
            <option value="없음" ${status === '없음' ? 'selected' : ''}>없음</option>
            <option value="있음" ${status === '있음' ? 'selected' : ''}>있음</option>
          </select>
          <input type="text" name="${fieldKey}-type" class="remark-input" placeholder="${label} 종류" value="${type}">
        </div>
      </div>
    `;
  },

  /**
   * 추가 피해요소 섹션 렌더링 (공통)
   */
  renderAdditionalDamageSection(additionalDamage) {
    return `
      <div class="form-section">
        <h3>추가 피해요소</h3>
        ${this.renderField('배수로', additionalDamage.drainChannel, 'additionalDamage-drainChannel')}
        ${this.renderField('도로/시설물', additionalDamage.roadFacility, 'additionalDamage-roadFacility')}
        ${this.renderField('건축물', additionalDamage.building, 'additionalDamage-building')}
      </div>
    `;
  },

  // ========== GeneralInfo Renderers ==========

  /**
   * 비탈면 일반현황 렌더링
   */
  renderSlopeGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>높이</label>
          <input type="text" name="height" value="${generalInfo.height || ''}" placeholder="m">
        </div>
        <div class="form-field">
          <label>경사각</label>
          <input type="text" name="slopeAngle" value="${generalInfo.slopeAngle || ''}" placeholder="°">
        </div>
      </div>
    `;
  },

  /**
   * 다리 일반현황 렌더링
   */
  renderBridgeGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>길이</label>
          <input type="text" name="length" value="${generalInfo.length || ''}" placeholder="m">
        </div>
        <div class="form-field">
          <label>폭</label>
          <input type="text" name="width" value="${generalInfo.width || ''}" placeholder="m">
        </div>
      </div>
    `;
  },

  /**
   * 지당 일반현황 렌더링
   */
  renderPondGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>면적</label>
          <input type="text" name="area" value="${generalInfo.area || ''}" placeholder="㎡">
        </div>
      </div>
    `;
  },

  /**
   * 건축물형(문, 담장, 굴뚝) 일반현황 렌더링
   */
  renderBuildingGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>규모</label>
          <input type="text" name="scale" value="${generalInfo.scale || ''}" placeholder="가로×세로×높이(m)">
        </div>
      </div>
    `;
  },

  /**
   * 단일목 일반현황 렌더링
   */
  renderTreeGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>수고</label>
          <input type="text" name="treeHeight" value="${generalInfo.treeHeight || ''}" placeholder="m">
        </div>
        <div class="form-field">
          <label>흉고직경</label>
          <input type="text" name="dbh" value="${generalInfo.dbh || ''}" placeholder="cm">
        </div>
        <div class="form-field">
          <label>수관폭</label>
          <input type="text" name="crownWidth" value="${generalInfo.crownWidth || ''}" placeholder="m">
        </div>
      </div>
    `;
  },

  /**
   * 군락 일반현황 렌더링
   */
  renderColonyGeneralInfo(generalInfo) {
    if (!generalInfo) return '';
    return `
      <div class="form-section">
        <h3>일반 현황</h3>
        <div class="form-field">
          <label>위치</label>
          <input type="text" name="location" value="${generalInfo.location || ''}" readonly>
        </div>
        <div class="form-field">
          <label>본수</label>
          <input type="text" name="treeCount" value="${generalInfo.treeCount || ''}" placeholder="본">
        </div>
        <div class="form-field">
          <label>주요 수종</label>
          <input type="text" name="mainSpecies" value="${generalInfo.mainSpecies || ''}">
        </div>
        <div class="form-field">
          <label>평균 수고</label>
          <input type="text" name="avgHeight" value="${generalInfo.avgHeight || ''}" placeholder="m">
        </div>
        <div class="form-field">
          <label>평균 수관폭</label>
          <input type="text" name="avgCrownWidth" value="${generalInfo.avgCrownWidth || ''}" placeholder="m">
        </div>
      </div>
    `;
  }
};

// 전역으로 등록
if (typeof window !== 'undefined') {
  window.FormRenderer = FormRenderer;
}
