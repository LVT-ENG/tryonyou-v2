const products = [
  { name: "Classic Jacket", img: "jacket.webp" },
  { name: "Urban Sneakers", img: "sneakers.webp" }
];

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

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
});
