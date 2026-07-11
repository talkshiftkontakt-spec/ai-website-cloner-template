const KEY_DIAGNOSTIC = 'll_diagnostic_shown';
const KEY_FORM_SENT = 'll_form_sent';

function hasConsent() {
  if (typeof window.hasCookieConsent === 'function') return window.hasCookieConsent();
  return /(?:^|;\s*)ll_cookie_consent=1(?:;|$)/.test(document.cookie || '');
}

let lastFocused = null;

function getFocusable(el) {
  return Array.from(el.querySelectorAll(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  ));
}

function trapFocus(el, e) {
  const focusable = getFocusable(el);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

function openPopup(id, trackEvent) {
  const el = document.getElementById(id);
  if (!el) return;
  lastFocused = document.activeElement;
  el.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  const focusable = getFocusable(el);
  if (focusable.length) focusable[0].focus();
  el._keyHandler = (e) => {
    if (e.key === 'Escape') closePopup(id);
    if (e.key === 'Tab') trapFocus(el, e);
  };
  document.addEventListener('keydown', el._keyHandler);
  if (trackEvent && typeof gtag !== 'undefined') {
    gtag('event', trackEvent);
  }
}

function closePopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute('hidden', '');
  document.body.style.overflow = '';
  if (el._keyHandler) document.removeEventListener('keydown', el._keyHandler);
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

function openDiagnosticPopup() {
  if (!hasConsent()) return;
  if (sessionStorage.getItem(KEY_DIAGNOSTIC)) return;
  if (sessionStorage.getItem(KEY_FORM_SENT)) return;
  sessionStorage.setItem(KEY_DIAGNOSTIC, '1');
  openPopup('popupDiagnostic', 'popup-diagnostic-open');
}

window.openDiagnosticPopup = openDiagnosticPopup;


// Close buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-close]');
  if (btn) closePopup(btn.dataset.close);
});

// Backdrop close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup-backdrop')) {
    const overlay = e.target.closest('.popup-overlay');
    if (overlay) closePopup(overlay.id);
  }
});

// Mark form sent via MutationObserver on #formOk
const formOk = document.getElementById('formOk');
if (formOk) {
  const observer = new MutationObserver(() => {
    if (!hasConsent()) return;
    if (formOk.style.display !== 'none' && formOk.style.display !== '') {
      sessionStorage.setItem(KEY_FORM_SENT, '1');
    }
  });
  observer.observe(formOk, { attributes: true, attributeFilter: ['style'] });
}


// Scroll depth tracking
const depthMarkers = [
  { pct: 25, key: 'depth25', event: 'scroll-depth-25' },
  { pct: 50, key: 'depth50', event: 'scroll-depth-50' },
  { pct: 75, key: 'depth75', event: 'scroll-depth-75' },
];
const depthFired = {};
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  depthMarkers.forEach(({ pct, key, event }) => {
    if (!depthFired[key] && scrolled >= pct) {
      depthFired[key] = true;
      if (typeof gtag !== 'undefined') gtag('event', event);
    }
  });
}, { passive: true });
