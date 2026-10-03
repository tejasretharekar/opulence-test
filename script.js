/* ==========================================================================
   OPULENCE POWER - MAIN SCRIPT
   Theme Management, Mobile Navigation, Scrollspy & Form Handling
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('opulence_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('opulence_theme', newTheme);
    });
  }

  // 2. Mobile Menu Navigation
  const menuButton = document.getElementById('menu-toggle-btn') || document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav') || document.querySelector('.desktop-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close mobile nav on clicking any navigation anchor
  document.querySelectorAll('.desktop-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 3. Dynamic Footer Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 4. Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const feedback = contactForm.querySelector('.form-feedback');
      const formData = new FormData(contactForm);

      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const message = formData.get('message') || '';

      const subject = encodeURIComponent(`Solar Feasibility Enquiry - ${name}`);
      const body = encodeURIComponent(
        `Hello Opulence Power Team,\n\nI would like to request a consultation/feasibility study.\n\nName: ${name}\nEmail: ${email}\n\nProject Details:\n${message}\n\nThank you.`
      );

      if (feedback) {
        feedback.textContent = 'Opening your mail client with your inquiry details...';
        feedback.className = 'form-feedback success';
      }

      window.location.href = `mailto:info@opulencepower.com?subject=${subject}&body=${body}`;
    });
  }

  // 5. Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }
});
