function loadProfile() {
  for (let i = 0; i < 3; i++) {
    const data = JSON.parse(localStorage.getItem(`avatar${i}`) || '{}');
    const nameEl = document.getElementById(`name-${i}`);
    const moodEl = document.getElementById(`mood-${i}`);
    if (data.name) nameEl.value = data.name;
    if (data.mood) moodEl.value = data.mood;
  }
}

function saveProfile() {
  for (let i = 0; i < 3; i++) {
    const nameEl = document.getElementById(`name-${i}`);
    const moodEl = document.getElementById(`mood-${i}`);
    const data = { name: nameEl.value.trim(), mood: moodEl.value };
    localStorage.setItem(`avatar${i}`, JSON.stringify(data));
  }
  alert('Perfil guardado');
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  const btn = document.getElementById('saveProfile');
  if (btn) btn.addEventListener('click', saveProfile);
});
