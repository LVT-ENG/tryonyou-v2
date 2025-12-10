// AGENTE DOM-FIX: protege llamadas peligrosas al DOM
function safeDomExecution(callback) {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    callback();
  }
}

const products = [
  { name: "Classic Jacket", img: "jacket.webp" },
  { name: "Urban Sneakers", img: "sneakers.webp" }
];

async function loadCasaPavoReal() {
  try {
    const res = await fetch('products/casa_pavo_real.json');
    if (res.ok) {
      const collection = await res.json();
      products.push(...collection);
    }
  } catch (err) {
    console.error('Failed to load Casa Pavo Real collection', err);
  }
}

function displayProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  products.forEach(p => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.innerHTML = `<img src="${p.img}" alt="${p.name}"><p>${p.name}</p>`;
    grid.appendChild(item);
  });
}

safeDomExecution(() => {
  document.addEventListener('DOMContentLoaded', async () => {
    await loadCasaPavoReal();
    displayProducts();

  const lang = navigator.language || navigator.userLanguage;
  let videoSrc = '';
  if (lang.startsWith('es')) {
    videoSrc = 'videos/intro_espanol.mp4';
  } else if (lang.startsWith('fr')) {
    videoSrc = 'videos/intro_frances.mp4';
  } else {
    videoSrc = 'videos/intro_ingles.mp4';
  }
  const videoEl = document.getElementById('videoIntro');
  if (videoEl) {
    videoEl.src = videoSrc;
  }

    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
});
