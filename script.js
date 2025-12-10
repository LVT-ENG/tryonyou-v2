function safeDomExecution(callback) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', callback);
  }
}

const frasesPau = [
  'Lev\u00e1ntate. Tu ropa tambi\u00e9n.',
  '\u00bfBuscas inspiraci\u00f3n o atenci\u00f3n? Te doy ambas.',
  'Esto ya no es moda, es archivo municipal.',
  'Hoy brillas. No seas t\u00edmido. Ni soso.',
  'S\u00ed. Esa. C\u00f3mprala o su\u00e9ltala. Pero decide ya.'
];

function fraseRandom() {
  const output = document.getElementById('outputFrase');
  if (!output) return;
  const frase = frasesPau[Math.floor(Math.random() * frasesPau.length)];
  output.textContent = `"${frase}"`;
}

const frasesLook = [
  'Interesante elección, aunque no es para todos.',
  'Podría funcionar con actitud y un buen filtro.',
  'No es tu mejor día, pero hay potencial.',
  'Esto parece un experimento sin final feliz. Pero aún hay tiempo.'
];

function analizarLook() {
  const respuesta = document.getElementById('respuestaPau');
  if (!respuesta) return;
  const frase = frasesLook[Math.floor(Math.random() * frasesLook.length)];
  respuesta.textContent = `"${frase}"`;
}

function reiniciarTryOn() {
  const input = document.getElementById('lookImg');
  if (input) input.value = '';
  const respuesta = document.getElementById('respuestaPau');
  if (respuesta) {
    respuesta.textContent =
      '“Esto parece un experimento sin final feliz. Pero aún hay tiempo.”';
  }
  const fraseReinicio = document.getElementById('fraseReinicio');
  if (fraseReinicio) {
    fraseReinicio.textContent =
      '“Esto no es un adiós. Es un: ‘Hazlo mejor esta vez.’” – Pau';
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
  fraseRandom,
  analizarLook,
  reiniciarTryOn
};
