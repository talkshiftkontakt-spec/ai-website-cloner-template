const ROTATION_KEY = 'LingoLogy_popup_rotation_index';
const SESSION_AUTO_KEY = 'LingoLogy_auto_popup_session';
const FORM_SENT_KEY = 'll_form_sent';
const TYPES = ['poradnik', 'diagnostic', 'lead'];
const DWELL_MS = 35000;

function hasConsent() {
  if (typeof window.hasCookieConsent === 'function') return window.hasCookieConsent();
  return /(?:^|;\s*)ll_cookie_consent=1(?:;|$)/.test(document.cookie || '');
}

function getRotationSlot() {
  const idx = parseInt(localStorage.getItem(ROTATION_KEY) || '0', 10) % TYPES.length;
  return { type: TYPES[idx], idx };
}

function advanceRotation(currentIdx) {
  if (!hasConsent()) return;
  localStorage.setItem(ROTATION_KEY, String((currentIdx + 1) % TYPES.length));
}

function shouldSkipAuto() {
  if (!hasConsent()) return true;
  if (!document.getElementById('popupDiagnostic')) return true;
  if (sessionStorage.getItem(SESSION_AUTO_KEY)) return true;
  if (sessionStorage.getItem(FORM_SENT_KEY)) return true;
  return false;
}

function overlayOpen() {
  return Boolean(
    document.querySelector('.modal-overlay.active')
    || document.querySelector('.popup-overlay:not([hidden])')
  );
}

function showAutoPopup(type) {
  sessionStorage.setItem(SESSION_AUTO_KEY, '1');

  if (type === 'poradnik' && typeof window.openPoradnikModal === 'function') {
    window.openPoradnikModal();
    if (typeof gtag !== 'undefined') gtag('event', 'popup_auto_poradnik');
    return;
  }

  if (type === 'diagnostic' && typeof window.openDiagnosticPopup === 'function') {
    window.openDiagnosticPopup();
    return;
  }

  if (type === 'lead' && typeof window.openModal === 'function') {
    window.openModal();
    if (typeof gtag !== 'undefined') gtag('event', 'popup_auto_lead');
  }
}

function scheduleAutoPopup() {
  if (shouldSkipAuto()) return;

  const { type, idx } = getRotationSlot();

  setTimeout(() => {
    if (shouldSkipAuto() || overlayOpen()) return;
    showAutoPopup(type);
    advanceRotation(idx);
  }, DWELL_MS);
}

if (hasConsent()) {
  scheduleAutoPopup();
} else {
  window.addEventListener('cookieConsentGranted', scheduleAutoPopup, { once: true });
}
