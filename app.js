window.addEventListener('DOMContentLoaded', () => {
  fetch("https://raw.githubusercontent.com/tuusuario/tryonme-framer-assets/main/tryonme_data.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const output = document.getElementById('data-output');
      if (output) {
        output.textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      const output = document.getElementById('data-output');
      if (output) {
        output.textContent = `Error fetching data: ${err.message}`;
      }
    });
});
