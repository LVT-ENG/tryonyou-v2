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
  console.log('🦚 Cargando datos de Casa Pavo Real...');
}

function displayProducts() {
  console.log('🧥 Mostrando productos renderizados...');
}

function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  carousel.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    carousel.scrollBy({ left: evt.deltaY < 0 ? -200 : 200 });
  });
}

function loadAutoDonate() {
  const list = document.querySelector('.autodonate-panel ul');
  if (!list) return;
  const items = [
    'Camisa estampada sin uso desde 2023',
    'Chaqueta denim vintage',
    'Falda floral en buen estado'
  ];
  list.innerHTML = items.map(i => `<li><strong>${i}</strong></li>`).join('');
}

safeDomExecution(async () => {
  try {
    await loadCasaPavoReal();
    displayProducts();
    loadIntroVideo();
    updateFooterYear();
    setupCarousel();
    loadAutoDonate();
  } catch (error) {
    console.error('🛑 Error en la ejecución de los superagentes:', error);
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
  ,loadAutoDonate
};
