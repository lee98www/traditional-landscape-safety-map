/**
 * 사진 갤러리 모듈
 * 점검표 사진 표시 및 슬라이드쇼
 */

const PhotoGallery = {
  currentIndex: 0,
  photos: [],
  container: null,
  modal: null,

  /**
   * 갤러리 초기화
   * @param {string} containerId - 갤러리 컨테이너 ID
   * @param {Array<string>} photoUrls - 사진 URL 배열
   */
  init(containerId, photoUrls) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('갤러리 컨테이너를 찾을 수 없습니다:', containerId);
      return;
    }

    this.photos = photoUrls || [];
    this.currentIndex = 0;
    this.render();
  },

  /**
   * 갤러리 렌더링
   */
  render() {
    if (this.photos.length === 0) {
      this.container.innerHTML = `
        <div class="photo-gallery__empty">
          <p>등록된 사진이 없습니다.</p>
        </div>
      `;
      return;
    }

    // 썸네일 그리드
    const thumbnails = this.photos.map((url, index) => `
      <div class="photo-gallery__thumbnail" onclick="PhotoGallery.openModal(${index})">
        <img src="${url}" alt="점검 사진 ${index + 1}" loading="lazy">
        <div class="photo-gallery__thumbnail-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
            <path d="M11 8v6"/>
            <path d="M8 11h6"/>
          </svg>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="photo-gallery__grid">
        ${thumbnails}
      </div>
      <div class="photo-gallery__count">
        총 ${this.photos.length}장
      </div>
    `;

    // 모달 생성 (한 번만)
    if (!this.modal) {
      this.createModal();
    }
  },

  /**
   * 모달 생성
   */
  createModal() {
    const modalHTML = `
      <div class="photo-modal" id="photoModal" onclick="PhotoGallery.handleModalClick(event)">
        <div class="photo-modal__header">
          <div class="photo-modal__counter">
            <span id="photoCurrentIndex">1</span> / <span id="photoTotalCount">${this.photos.length}</span>
          </div>
          <button class="photo-modal__close" onclick="PhotoGallery.closeModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="photo-modal__body">
          <button class="photo-modal__nav photo-modal__nav--prev" onclick="PhotoGallery.prev()">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div class="photo-modal__image-container">
            <img id="photoModalImage" src="" alt="점검 사진">
          </div>
          <button class="photo-modal__nav photo-modal__nav--next" onclick="PhotoGallery.next()">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        <div class="photo-modal__footer">
          <div class="photo-modal__thumbnails" id="photoModalThumbnails"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('photoModal');

    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;

      if (e.key === 'ArrowLeft') this.prev();
      else if (e.key === 'ArrowRight') this.next();
      else if (e.key === 'Escape') this.closeModal();
    });
  },

  /**
   * 모달 열기
   * @param {number} index - 사진 인덱스
   */
  openModal(index) {
    if (!this.modal) return;

    this.currentIndex = index;
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.updateModal();
    this.renderThumbnails();
  },

  /**
   * 모달 닫기
   */
  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  /**
   * 모달 클릭 핸들러 (배경 클릭 시 닫기)
   */
  handleModalClick(event) {
    if (event.target.classList.contains('photo-modal')) {
      this.closeModal();
    }
  },

  /**
   * 이전 사진
   */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateModal();
  },

  /**
   * 다음 사진
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateModal();
  },

  /**
   * 모달 업데이트
   */
  updateModal() {
    const image = document.getElementById('photoModalImage');
    const counter = document.getElementById('photoCurrentIndex');

    if (image) image.src = this.photos[this.currentIndex];
    if (counter) counter.textContent = this.currentIndex + 1;

    // 썸네일 활성화 업데이트
    const thumbnails = document.querySelectorAll('.photo-modal__thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
  },

  /**
   * 모달 썸네일 렌더링
   */
  renderThumbnails() {
    const container = document.getElementById('photoModalThumbnails');
    if (!container) return;

    const thumbnails = this.photos.map((url, index) => `
      <div class="photo-modal__thumbnail ${index === this.currentIndex ? 'active' : ''}"
           onclick="PhotoGallery.goToPhoto(${index})">
        <img src="${url}" alt="썸네일 ${index + 1}">
      </div>
    `).join('');

    container.innerHTML = thumbnails;
  },

  /**
   * 특정 사진으로 이동
   * @param {number} index - 사진 인덱스
   */
  goToPhoto(index) {
    this.currentIndex = index;
    this.updateModal();
  },

  /**
   * 그리드 뷰 (간단한 사진 목록)
   * @param {string} containerId - 컨테이너 ID
   * @param {Array<string>} photoUrls - 사진 URL 배열
   * @param {Object} options - 옵션 (columns, gap 등)
   */
  renderGrid(containerId, photoUrls, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { columns = 4, gap = '12px', height = '200px' } = options;

    const html = photoUrls.map((url, index) => `
      <div class="photo-grid__item" style="cursor: pointer;" onclick="PhotoGallery.openSimpleModal('${url}')">
        <img src="${url}" alt="사진 ${index + 1}" style="width: 100%; height: ${height}; object-fit: cover; border-radius: 8px;">
      </div>
    `).join('');

    container.innerHTML = `
      <div class="photo-grid" style="display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: ${gap};">
        ${html}
      </div>
    `;
  },

  /**
   * 간단한 모달 (단일 이미지만 표시)
   * @param {string} url - 이미지 URL
   */
  openSimpleModal(url) {
    const modalHTML = `
      <div class="simple-photo-modal" onclick="this.remove(); document.body.style.overflow = '';"
           style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9);
                  z-index: 9999; display: flex; align-items: center; justify-content: center; cursor: zoom-out;">
        <img src="${url}" alt="사진"
             style="max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 8px;"
             onclick="event.stopPropagation();">
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
  }
};

// 전역 접근
if (typeof window !== 'undefined') {
  window.PhotoGallery = PhotoGallery;
}
