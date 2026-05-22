/* ============================================================
   GRĂDINA NOASTRĂ — main.js
   ============================================================ */

/* ─── HERO LOAD ANIMATION ────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('loaded');
  }, 80);
});

/* ─── NAV: SCROLL SHADOW ─────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
});

/* ─── MOBILE MENU ────────────────────────────────────────────── */
function toggleMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (toggle) toggle.classList.toggle('open');
  if (menu)   menu.classList.toggle('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('mobileMenu');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    }
  }
});

/* ─── REVEAL ON SCROLL ───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ─── LIGHTBOX ───────────────────────────────────────────────── */
function openLightbox(src) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (lb && img) {
    img.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    // Clear src after transition to avoid flicker on reopen
    setTimeout(() => {
      const img = document.getElementById('lbImg');
      if (img && !lb.classList.contains('open')) img.src = '';
    }, 300);
  }
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

/* ─── CONTACT FORM ───────────────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  const successMsg = document.getElementById('successMsg');
  const form       = e.target;

  // Show success message
  if (successMsg) {
    successMsg.classList.add('show');
    form.reset();

    // Auto-hide after 5 seconds
    setTimeout(() => {
      successMsg.classList.remove('show');
    }, 5000);
  }
}

/* ─── SMOOTH SCROLL FOR NAV LINKS ────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
