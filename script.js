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

document.addEventListener('DOMContentLoaded', async () => {
  await loadCasaPavoReal();
  displayProducts();
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
