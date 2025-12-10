function safeDomExecution(callback) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function getLocalizedVideo(lang = 'en') {
  const videoMap = {
    es: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/puppy.mp4',
    fr: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/puppy.mp4',
    en: 'https://storage.googleapis.com/web-dev-assets/video-and-source-tags/puppy.mp4'
  };
  const shortLang = lang.slice(0, 2).toLowerCase();
  return videoMap[shortLang] || videoMap['en'];
}

function updateFooterYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function loadIntroVideo() {
  const videoEl = document.getElementById('intro-video');
  if (videoEl) {
    videoEl.src = getLocalizedVideo(navigator.language);
    videoEl.load();
  }
}

async function loadCasaPavoReal() {
  console.log('🦚 Loading Casa Pavo Real data...');
}

function displayProducts() {
  console.log('🧥 Displaying rendered products...');
}

function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  carousel.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    carousel.scrollBy({ left: evt.deltaY < 0 ? -200 : 200 });
  });
}

safeDomExecution(async () => {
  try {
    await loadCasaPavoReal();
    displayProducts();
    loadIntroVideo();
    updateFooterYear();
    setupCarousel();
  } catch (error) {
    console.error('🛑 Error during super agent execution:', error);
  }
});

export {
  safeDomExecution,
  getLocalizedVideo,
  updateFooterYear,
  loadIntroVideo,
  loadCasaPavoReal,
  displayProducts,
  setupCarousel
};
