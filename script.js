const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    if (!open) {
      nav.style.cssText = 'display:flex; position:absolute; top:70px; left:0; right:0; padding:20px 24px; background:#182d35; flex-direction:column; gap:15px;';
    } else nav.removeAttribute('style');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (menuButton) { menuButton.setAttribute('aria-expanded', 'false'); nav.removeAttribute('style'); }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const feedback = form.querySelector('.form-feedback');
  feedback.textContent = 'Thank you. Your enquiry is ready to send - we will be in touch shortly.';
  form.reset();
});
