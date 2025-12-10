console.log('TryOnMe dashboard loaded');

export function initDashboard() {
  const container = document.getElementById('tryon-container');
  if (container) {
    container.textContent = 'Dashboard initialized';
  }
}

document.addEventListener('DOMContentLoaded', initDashboard);
