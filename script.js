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
  const data = new FormData(form);
  const subject = encodeURIComponent('Website enquiry from ' + data.get('name'));
  const body = encodeURIComponent('Name: ' + data.get('name') + '\nEmail: ' + data.get('email') + '\n\nProject details:\n' + data.get('message'));
  feedback.textContent = 'Opening your email app so you can send the enquiry directly to our team.';
  window.location.href = 'mailto:info@opulencepower.com?subject=' + subject + '&body=' + body;
});

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});
