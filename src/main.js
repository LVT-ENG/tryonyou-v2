export async function fetchDemoData() {
  try {
    const res = await fetch('/api/fetch-data');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const out = document.getElementById('dataOutput');
    if (out) out.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error('API fetch failed:', err);
  }
}

export default function initApiData() {
  if (typeof document !== 'undefined') {
    fetchDemoData();
  }
}
