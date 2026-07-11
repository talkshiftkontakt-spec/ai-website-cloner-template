// Testimonials carousel — mouse-driven scroll (desktop only)
import { csrfHeaders } from './csrf.js';

const carousel = document.getElementById('opinionsCarousel');
if (carousel && window.matchMedia('(hover: hover)').matches) {
  let scrollSpeed = 0;
  let animationFrameId;

  carousel.addEventListener('mousemove', e => {
    const rect = carousel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edge = 200;
    if (x < edge) {
      scrollSpeed = -12 * ((edge - x) / edge);
    } else if (x > rect.width - edge) {
      scrollSpeed =  12 * ((x - (rect.width - edge)) / edge);
    } else {
      scrollSpeed = 0;
    }
  });

  carousel.addEventListener('mouseenter', () => {
    const play = () => {
      if (scrollSpeed !== 0) carousel.scrollLeft += scrollSpeed;
      animationFrameId = requestAnimationFrame(play);
    };
    play();
  });

  carousel.addEventListener('mouseleave', () => {
    scrollSpeed = 0;
    cancelAnimationFrame(animationFrameId);
  });
}

// ── Mobile sticky CTA ───────────────────────────────────────────────────────
const stickyCta = document.getElementById('mobileStickyCta');
const heroSection = document.getElementById('hero');
if (stickyCta && heroSection) {
  const stickyObs = new IntersectionObserver(
    ([entry]) => {
      // Show sticky bar once hero is no longer visible
      stickyCta.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  stickyObs.observe(heroSection);
}

// ── Notify form (resources "coming soon") ──────────────────────────────────
window.submitNotify = function(btn, formId) {
  const wrap  = btn.closest('.notify-form');
  const input = wrap.querySelector('.notify-input');
  const ok    = wrap.querySelector('.notify-ok');
  const row   = wrap.querySelector('.notify-row');
  const email = input.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    input.style.borderColor = 'var(--error)';
    input.focus();
    return;
  }
  input.style.borderColor = '';

  btn.textContent = '…';
  btn.disabled = true;
  fetch('/api/mail', {
    method: 'POST',
    headers: csrfHeaders({ Accept: 'application/json', 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      email,
      _subject: `Powiadom mnie: ${formId} — LingoLogy`,
      typ_formularza: 'Zapis na powiadomienie o teście',
      test: formId,
      zrodlo: window.location.pathname,
    }),
  })
    .then(r => {
      row.style.display = 'none';
      ok.style.display  = 'block';
    })
    .catch(() => {
      btn.textContent = 'Spróbuj ponownie';
      btn.disabled = false;
    });
};
