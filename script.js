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
    item.innerHTML = `<img src="${p.img}" alt="${p.name}" width="150" height="150"><p>${p.name}</p>`;
    grid.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadCasaPavoReal();
  displayProducts();

  const videoEl = document.getElementById('videoIntro');
  if (videoEl) {
    // Placeholder video assignment removed to avoid 404 errors
    // videoEl.src can be set here when valid video files are available
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
