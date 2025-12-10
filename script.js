import { AvatarRenderer } from './tryon/tryon-3d-render.js';

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

function initCarousel() {
  const carousel = document.getElementById('product-carousel');
  if (!carousel) return;
  const sample = [1, 2, 3, 4, 5].map(i => `https://via.placeholder.com/200x250?text=Look+${i}`);
  sample.forEach(src => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    const img = document.createElement('img');
    img.src = src;
    item.appendChild(img);
    carousel.appendChild(item);
  });
}

function initAvatar() {
  const canvas = document.getElementById('avatar-canvas');
  if (!canvas) return;
  const renderer = new AvatarRenderer('avatar-canvas');
  renderer.loadModel('/models/avatar.glb');
}

function initForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('form-msg');
    form.reset();
    if (msg) {
      msg.hidden = false;
      setTimeout(() => (msg.hidden = true), 3000);
    }
  });
}

safeDomExecution(async () => {
  try {
    await loadCasaPavoReal();
    displayProducts();
    loadIntroVideo();
    updateFooterYear();
    initCarousel();
    initAvatar();
    initForm();
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
  initCarousel,
  initAvatar,
  initForm
};
