# 전통 조경 안전지도 (Traditional Landscape Safety Map)

문화재 및 전통 조경의 안전 관리 이력을 체계적으로 관리하고, 재해 예방 및 수리 이력을 효율적으로 추적하는 웹 애플리케이션입니다.

## 주요 기능

### 1. 대시보드
- 관리 대상지 현황 통계
- 최근 활동 이력 표시
- 빠른 접근 카드

### 2. 안전 관리 이력 확인
- 대상지 검색 (이름, 위치, 관리번호)
- 카테고리별 필터링 (궁궐, 사찰, 정원, 기타)
- 대상지 상세 정보 모달
- 재해 이력 타임라인
- 수리 이력 타임라인

### 3. 설정
- 다크 모드 지원
- 알림 설정
- 사용자 환경 설정

## 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **UI/UX**:
  - 모던하고 깔끔한 인터페이스
  - 반응형 디자인 (모바일, 태블릿, 데스크톱)
  - 다크 모드 지원
  - 부드러운 애니메이션 및 트랜지션
- **디자인 시스템**:
  - CSS Variables를 활용한 디자인 토큰
  - Semantic Color System
  - 일관된 Typography

## 프로젝트 구조

```
traditional-landscape-safety-map/
├── index.html          # 메인 HTML 파일
├── css/
│   └── styles.css      # 통합 스타일시트
├── js/
│   └── app.js          # 메인 JavaScript 애플리케이션
├── images/             # 이미지 리소스
├── assets/             # 기타 에셋
└── README.md           # 프로젝트 문서
```

## 시작하기

### 설치 및 실행

1. 프로젝트 클론 또는 다운로드
```bash
git clone [repository-url]
cd traditional-landscape-safety-map
```

2. 웹 브라우저로 `index.html` 파일 열기
```bash
# 간단한 방법
open index.html  # macOS
start index.html # Windows

# 또는 로컬 서버 사용 (권장)
python -m http.server 8000
# http://localhost:8000 접속
```

3. Live Server 사용 (VS Code)
- VS Code에서 Live Server 확장 설치
- `index.html` 우클릭 > "Open with Live Server"

### 시스템 요구사항

- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- JavaScript 활성화 필요
- 권장 해상도: 1280x720 이상

## 사용 방법

### 메인 화면
1. 대시보드에서 전체 통계 확인
2. 빠른 접근 카드를 통해 주요 기능 바로 이동
3. 최근 활동 섹션에서 최신 재해/수리 이력 확인

### 안전 관리 이력 확인
1. 상단 네비게이션에서 "이력 확인" 클릭
2. 검색창에서 대상지 검색
3. 카테고리 필터로 궁궐/사찰/정원 등 필터링
4. 대상지 카드 클릭하여 상세 정보 확인
5. 탭 메뉴로 기본 정보/재해 이력/수리 이력 전환

### 키보드 단축키
- `Ctrl/Cmd + K`: 검색창 포커스
- `Esc`: 모달 닫기

## 주요 UI/UX 개선사항

### 디자인 개선
- ✅ 모던한 그라데이션 및 그림자 효과
- ✅ 일관된 색상 시스템 (Primary, Secondary, Success, Warning, Danger)
- ✅ 직관적인 아이콘 사용
- ✅ 카드 기반 레이아웃
- ✅ 부드러운 호버 효과 및 애니메이션

### 사용성 개선
- ✅ 실시간 검색 및 필터링
- ✅ 반응형 디자인 (모든 디바이스 지원)
- ✅ 접근성 개선 (ARIA 레이블, 시맨틱 HTML)
- ✅ 로딩 상태 표시
- ✅ 에러 처리 및 피드백

### 성능 최적화
- ✅ CSS Variables로 테마 전환 최적화
- ✅ 효율적인 이벤트 리스너 관리
- ✅ Debounce를 활용한 검색 최적화
- ✅ 이미지 Lazy Loading 준비

## 기능 상세 설명

### 1. 네비게이션 시스템
- SPA (Single Page Application) 방식
- 페이지 전환 시 부드러운 애니메이션
- 활성 페이지 하이라이트

### 2. 검색 및 필터링
```javascript
// 실시간 검색
- 대상지명, 위치, 관리번호로 검색
- 대소문자 구분 없음
- 부분 일치 검색 지원

// 카테고리 필터
- 전체, 궁궐, 사찰, 정원, 기타
- 검색과 필터 동시 적용 가능
```

### 3. 모달 시스템
- 탭 기반 네비게이션
- ESC 키로 닫기
- 배경 클릭으로 닫기
- 스크롤 잠금

### 4. 다크 모드
- 사용자 설정 저장 (localStorage)
- 부드러운 테마 전환
- 모든 컴포넌트 다크 모드 지원

## 데이터 구조

### Site 객체
```javascript
{
    id: Number,
    name: String,              // 대상지명
    category: String,          // 'palace' | 'temple' | 'garden' | 'other'
    location: String,          // 위치
    managementNumber: String,  // 관리번호
    status: String,            // 'safe' | 'warning' | 'danger'
    statusText: String,        // 상태 텍스트
    description: String,       // 설명
    registeredDate: String,    // 등록일 (YYYY-MM-DD)
    lastInspection: String,    // 최근 점검일 (YYYY-MM-DD)
    disasterCount: Number,     // 재해 건수
    repairCount: Number,       // 수리 건수
    inspectionCount: Number,   // 점검 횟수
    image: String              // 이미지 URL
}
```

## 브라우저 지원

| 브라우저 | 최소 버전 |
|---------|---------|
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## 향후 개선 계획

### Phase 2
- [ ] 백엔드 API 연동
- [ ] 실제 데이터베이스 연동
- [ ] 사용자 인증 및 권한 관리
- [ ] 이미지 업로드 기능
- [ ] PDF 리포트 생성

### Phase 3
- [ ] 지도 기반 대상지 표시
- [ ] 재해 위험도 분석
- [ ] 통계 대시보드 고도화
- [ ] 모바일 앱 개발
- [ ] PWA (Progressive Web App) 전환

### Phase 4
- [ ] AI 기반 재해 예측
- [ ] 자동 알림 시스템
- [ ] 다국어 지원
- [ ] 엑셀 데이터 임포트/익스포트
- [ ] 고급 검색 필터

## 문제 해결

### 일반적인 문제

**Q: 페이지가 로드되지 않아요**
- 브라우저의 JavaScript가 활성화되어 있는지 확인하세요
- 콘솔(F12)에서 에러 메시지를 확인하세요
- 최신 브라우저를 사용하고 있는지 확인하세요

**Q: 이미지가 표시되지 않아요**
- 인터넷 연결을 확인하세요 (외부 이미지 사용)
- 브라우저 캐시를 삭제해보세요

**Q: 다크 모드가 작동하지 않아요**
- localStorage가 활성화되어 있는지 확인하세요
- 시크릿 모드에서는 설정이 저장되지 않습니다

## 개발자 정보

### 코드 스타일
- ES6+ JavaScript 사용
- BEM 방식의 CSS 클래스 네이밍
- 시맨틱 HTML5
- 접근성 고려 (ARIA, 시맨틱 태그)

### 커스터마이징

**색상 변경**
```css
:root {
    --color-primary: #4F46E5;  /* 원하는 색상으로 변경 */
    --color-secondary: #06B6D4;
}
```

**폰트 변경**
```css
:root {
    --font-family: 'Your Font', sans-serif;
}
```

## 라이선스

이 프로젝트는 교육 및 비상업적 목적으로 사용 가능합니다.

## 기여하기

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다.

## 변경 이력

### v1.0.0 (2024-11-24)
- 초기 릴리스
- 기본 기능 구현
  - 대시보드
  - 검색 및 필터링
  - 상세 정보 모달
  - 다크 모드
- 반응형 디자인 적용
- 8개 샘플 대상지 데이터

## 연락처

프로젝트 관련 문의: [your-email@example.com]

---

**전통 조경 안전지도**로 우리의 소중한 문화유산을 안전하게 관리하세요! 🏯
