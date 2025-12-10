const responses = {
  happy: "Pau loves your energy! Keep shining.",
  sad: "Pau sends a virtual hug.",
  angry: "Pau suggests taking a deep breath.",
  neutral: "Pau is ready whenever you are.",
  disgusted: "Pau looks uneasy but stays supportive."
};

document.querySelectorAll('.mood-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    const msg = responses[mood] || '';
    document.getElementById('pau-response').textContent = msg;
  });
});
