function safeDomExecution(callback) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

function getLocalizedVideo(lang = 'en') {
  const videoMap = {
    es: 'videos/intro_espanol.mp4',
    fr: 'videos/intro_frances.mp4',
    en: 'videos/intro_ingles.mp4'
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

safeDomExecution(async () => {
  try {
    await loadCasaPavoReal();
    displayProducts();
    loadIntroVideo();
    updateFooterYear();
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
  displayProducts
};
