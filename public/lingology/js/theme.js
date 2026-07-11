function consentGiven() {
  if (typeof window.hasCookieConsent === 'function') return window.hasCookieConsent();
  return /(?:^|;\s*)ll_cookie_consent=1(?:;|$)/.test(document.cookie || '');
}

// ── Natychmiastowe ustawienie motywu (anti-flash) ──────────────────────────────
(function () {
  if (!consentGiven()) return;
  var saved = localStorage.getItem('theme') || 'system';
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

// ── Interakcja po załadowaniu DOM ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var switcher = document.getElementById('theme-switcher');
  if (!switcher) return;

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (consentGiven()) {
      localStorage.setItem('theme', theme);
      if (theme === 'dark' || theme === 'light') {
        document.cookie = 'theme=' + encodeURIComponent(theme) + ';path=/;max-age=31536000;SameSite=Lax';
      } else {
        document.cookie = 'theme=;path=/;max-age=0;SameSite=Lax';
      }
    }
    updateUI(theme);
  }

  function updateUI(theme) {
    switcher.querySelectorAll('button').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  switcher.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (btn && btn.dataset.theme) applyTheme(btn.dataset.theme);
  });

  var initialTheme = consentGiven() ? (localStorage.getItem('theme') || 'system') : 'system';
  updateUI(initialTheme);
});
