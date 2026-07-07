/* ============================================================
   EQUIPE PERSONAL NACIONAL — SCRIPT
   1. Navbar scroll state
   2. Menu mobile
   3. Rolagem suave para links internos
   4. Scroll Reveal (IntersectionObserver)
   5. Contadores animados
   6. FAQ accordion
   7. Formulário de contato
   8. Botão voltar ao topo
   9. Ano do rodapé
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  const onScrollNavbar = () => {
    if (window.scrollY > 40) navbar.classList.add('is-scrolled');
    else navbar.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* ---------- 2. MENU MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navMenu.classList.toggle('is-open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navMenu.classList.remove('is-open');
    });
  });

  /* ---------- 3. ROLAGEM SUAVE ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- 4. SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => el.classList.add('is-visible'), Number(delay));
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 5. CONTADORES ANIMADOS ---------- */
  const counters = document.querySelectorAll('.number-item__value');
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-count'));
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('pt-BR');
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------- 6. FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));

      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* ---------- 7. FORMULÁRIO DE CONTATO ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      formStatus.textContent = 'Preencha os campos obrigatórios antes de enviar.';
      formStatus.style.color = '#ff6b6b';
      return;
    }

    formStatus.style.color = '';
    formStatus.textContent = 'Recebemos sua solicitação! Em breve entraremos em contato.';
    form.reset();
  });

  /* ---------- 8. BOTÃO VOLTAR AO TOPO ---------- */
  const backToTop = document.getElementById('backToTop');
  const onScrollTopBtn = () => {
    if (window.scrollY > 500) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScrollTopBtn, { passive: true });
  onScrollTopBtn();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 9. ANO DO RODAPÉ ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
