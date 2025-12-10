async function loadHomeText() {
  const res = await fetch('../assets/textos_home.txt');
  const text = await res.text();
  document.getElementById('home-text').innerText = text;
}

async function loadProducts() {
  const res = await fetch('../products/productos.csv');
  const csv = await res.text();
  const lines = csv.trim().split(/\n/);
  const products = lines.map(l => {
    const [name, price] = l.split(',');
    return {name, price};
  });
  const div = document.getElementById('product-list');
  products.forEach(p => {
    const item = document.createElement('div');
    item.innerText = `${p.name} - $${p.price}`;
    div.appendChild(item);
  });
}

async function createAvatar() {
  try {
    const res = await fetch('/api/avatar');
    const data = await res.json();
    alert('Avatar listo: ' + data.status);
  } catch(err) {
    alert('Backend no disponible');
  }
}

document.getElementById('avatar-btn').onclick = createAvatar;

document.getElementById('recommend-btn').onclick = function() {
  // TODO Integrar con GPT y AutoDonate
  alert('Recomendaciones en camino');
};

window.onload = () => { loadHomeText(); loadProducts(); };
