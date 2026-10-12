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

// ==========================================================================
// Task 4: Basic Homepage Solar Calculator
// ==========================================================================
const calcForm = document.getElementById('solar-calc-form');
if (calcForm) {
  const billInput = document.getElementById('monthly-bill');
  const errorEl = document.getElementById('calc-error');
  const systemSizeEl = document.getElementById('res-system-size');
  const monthlySavingsEl = document.getElementById('res-monthly-savings');
  const annualSavingsEl = document.getElementById('res-annual-savings');
  const statusIndicatorEl = document.getElementById('calc-status-indicator');
  const resultsContainer = document.getElementById('calc-results');

  // Documented Preliminary Estimation Parameters:
  // 1. TARIFF: Average blended electricity tariff across residential and C&I slabs in India (₹8.00/kWh)
  // 2. ENERGY_CHARGE_RATIO: Variable energy charges represent ~85% of total bill (15% fixed charges/duties)
  // 3. MONTHLY_YIELD_PER_KW: 120 kWh per kW installed per month (approx 4.0 kWh/kW/day x 30 days)
  // 4. SOLAR_OFFSET_RATIO: Conservative 80% maximum bill reduction (retaining fixed grid demand charges)
  const TARIFF = 8.0;
  const ENERGY_CHARGE_RATIO = 0.85;
  const MONTHLY_YIELD_PER_KW = 120;
  const SOLAR_OFFSET_RATIO = 0.80;
  const MIN_BILL = 500;
  const MAX_BILL = 10000000; // ₹1 Crore

  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  function clearError() {
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
    if (billInput) {
      billInput.removeAttribute('aria-invalid');
    }
  }

  function showError(msg) {
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
    if (billInput) {
      billInput.setAttribute('aria-invalid', 'true');
      billInput.focus();
    }
  }

  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const rawValue = billInput.value.trim();

    if (!rawValue) {
      showError('Please enter your average monthly electricity bill.');
      return;
    }

    const bill = parseFloat(rawValue);

    if (isNaN(bill)) {
      showError('Please enter a valid numeric bill amount.');
      return;
    }

    if (bill <= 0) {
      showError('Bill amount must be greater than zero.');
      return;
    }

    if (bill < MIN_BILL) {
      showError('Please enter an amount of at least ₹500 for a rooftop solar estimate.');
      return;
    }

    if (bill > MAX_BILL) {
      showError('For utility or commercial projects over ₹1 Crore/month, please contact us for custom engineering advisory.');
      return;
    }

    // Formulas:
    // Estimated Monthly Units = (Bill * ENERGY_CHARGE_RATIO) / TARIFF
    // System Size (kW) = Units / MONTHLY_YIELD_PER_KW (rounded to 1 decimal place, minimum 1.0 kW)
    // Monthly Savings (₹) = Bill * SOLAR_OFFSET_RATIO (rounded to nearest integer)
    // Annual Savings (₹) = Monthly Savings * 12
    const monthlyUnits = (bill * ENERGY_CHARGE_RATIO) / TARIFF;
    const rawSystemSize = monthlyUnits / MONTHLY_YIELD_PER_KW;
    const systemSize = Math.max(1.0, Math.round(rawSystemSize * 10) / 10);

    const monthlySavings = Math.round(bill * SOLAR_OFFSET_RATIO);
    const annualSavings = monthlySavings * 12;

    // Display outputs
    if (systemSizeEl) systemSizeEl.textContent = systemSize.toFixed(1);
    if (monthlySavingsEl) monthlySavingsEl.textContent = formatINR(monthlySavings);
    if (annualSavingsEl) annualSavingsEl.textContent = formatINR(annualSavings);

    if (statusIndicatorEl) {
      statusIndicatorEl.textContent = 'Calculated for ' + formatINR(bill) + '/mo';
      statusIndicatorEl.classList.add('active');
    }

    if (resultsContainer) {
      resultsContainer.classList.add('has-results');
    }
  });

  billInput.addEventListener('input', () => {
    if (errorEl && errorEl.textContent) {
      clearError();
    }
  });
}

