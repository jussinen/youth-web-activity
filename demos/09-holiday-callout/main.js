document.addEventListener('DOMContentLoaded', () => {
  fetch('holidays.json')
    .then(res => res.json())
    .then(holidays => {
      const today = new Date().toISOString().split('T')[0];
      const match = holidays.find(h => h.date === today);
      if (match) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-info';
        alert.role = 'alert';
        alert.innerText = `🎉 Today is ${match.name}!`;
        document.body.prepend(alert);
      }
    });
});