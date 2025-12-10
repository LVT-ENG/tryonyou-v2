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

function analizarLook() {
  const frases = [
    'Me gusta, pero podrías arriesgar más.',
    'No está mal, pero intenta combinar colores de forma más atrevida.',
    '¡Fantástico! Sigue así.'
  ];
  const respuesta = document.getElementById('respuestaPau');
  if (respuesta) {
    respuesta.textContent =
      frases[Math.floor(Math.random() * frases.length)];
  }
}

function reiniciarTryOn() {
  const fileInput = document.getElementById('lookImg');
  if (fileInput) fileInput.value = '';
  const respuesta = document.getElementById('respuestaPau');
  if (respuesta) {
    respuesta.textContent =
      'Esto parece un experimento sin final feliz. Pero aún hay tiempo.';
  }
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
  setupCarousel,
  analizarLook,
  reiniciarTryOn
};
