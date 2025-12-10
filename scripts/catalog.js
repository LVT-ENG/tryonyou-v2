console.log('Catalog script loaded');

export async function fetchCatalog() {
  try {
    const resp = await fetch('/products/tryon-products.json');
    if (!resp.ok) throw new Error('Failed to load catalog');
    const data = await resp.json();
    console.log('Catalog size:', data.length);
    return data;
  } catch (err) {
    console.error('Catalog error', err);
    return [];
  }
}
