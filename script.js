/* =============================================
   Left vs Right Brain — Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll effect ---
  const nav = document.getElementById('nav');
  const scrollThreshold = 60;

  function handleNavScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // --- Fade-up on scroll ---
  const fadeElements = document.querySelectorAll(
    '.section-header, .about-text, .about-visual, .host-card, .approach-item, .topic-card, .listen-content, .topics-title'
  );

  fadeElements.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Hide scroll cue on scroll ---
  const scrollCue = document.getElementById('scroll-cue');

  function handleScrollCue() {
    if (window.scrollY > 100) {
      scrollCue.style.opacity = '0';
    } else {
      scrollCue.style.opacity = '1';
    }
  }

  scrollCue.style.transition = 'opacity 0.5s ease';
  window.addEventListener('scroll', handleScrollCue, { passive: true });

  // --- Email signup (placeholder) ---
  const form = document.getElementById('signup-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const btn = form.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Got it!';
    btn.style.background = 'var(--terracotta-dark)';
    email.value = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 2500);
  });

});
