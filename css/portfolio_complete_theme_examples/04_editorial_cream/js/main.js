document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.theme-toggle');
  if (localStorage.getItem('portfolio-theme') === 'light') document.body.classList.add('light-mode');
  const refresh = () => { if (toggle) { const light = document.body.classList.contains('light-mode'); toggle.textContent = light ? '☾' : '☀'; toggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode'); } };
  refresh();
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('portfolio-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    refresh();
  });
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.projects-section .project-card');
  function filter(category) {
    let count = 0;
    cards.forEach(card => {
      const match = category === 'all' || (card.dataset.category || '').split(/\s+/).includes(category);
      card.hidden = !match;
      if (match) count++;
    });
    buttons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const label = document.querySelector('.project-count');
    if (label) label.textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
  if (buttons.length) filter('all');
  document.getElementById('year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
});
