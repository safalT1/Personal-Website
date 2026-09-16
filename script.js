document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const navbar = document.querySelector('[data-navbar]');
  const overlay = document.querySelector('[data-overlay]');
  const navTogglers = document.querySelectorAll('[data-nav-toggler]');

  navTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.classList.toggle('nav-active');
    });
  });

  /* ---------- Smooth scroll + close nav on link click ---------- */
  document.querySelectorAll('a.navbar-link, a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

      window.scrollTo({ top: targetPosition, behavior: 'smooth' });

      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-active');
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('[data-header]');
  window.addEventListener('scroll', () => {
    header.classList.toggle('active', window.scrollY > 10);
  });

  /* ---------- Reset nav on resize to desktop ---------- */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('nav-active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Progress bar fill ---------- */
  const progressFills = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = `${el.dataset.width}%`;
        progressObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  progressFills.forEach(el => progressObserver.observe(el));

  /* ---------- Metric / badge counters ---------- */
  const counters = document.querySelectorAll('.metric-value, .badge-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Placeholder demo/code links (other projects) ---------- */
  document.querySelectorAll('[data-demo-placeholder]').forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Add your live demo or repository link here once it is deployed.');
      }
    });
  });

  /* ---------- AgniDrishti demo — open instantly, wake backend silently ---------- */
  const AGNI_BACKEND = 'https://agnidrishti-if27.onrender.com';
  const AGNI_FRONTEND = 'https://agnidrishti.vercel.app/';

  const demoBtn = document.getElementById('agnidrishti-demo-btn');

  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Open the frontend immediately — no waiting
      window.open(AGNI_FRONTEND, '_blank');

      // Silently ping the backend in the background to wake it up
      fetch(`${AGNI_BACKEND}/health`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
      }).catch(() => {
        // Ignore — server is sleeping, it'll wake on its own
      });
    });
  }

});