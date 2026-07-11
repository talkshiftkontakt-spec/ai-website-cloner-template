(function () {
  var CONSENT_COOKIE = 'll_cookie_consent=1';
  var CONSENT_MAX_AGE = '31536000';

  function hasCookieConsent() {
    return /(?:^|;\s*)ll_cookie_consent=1(?:;|$)/.test(document.cookie || '');
  }

  function cookieSuffix() {
    return location.protocol === 'https:' ? ';Secure' : '';
  }

  function grantCookieConsent() {
    document.cookie = CONSENT_COOKIE + ';path=/;max-age=' + CONSENT_MAX_AGE + ';SameSite=Lax' + cookieSuffix();
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    hideBanner();
    document.documentElement.classList.remove('cookie-banner-visible');
    window.dispatchEvent(new CustomEvent('cookieConsentGranted'));
  }

  function hideBanner() {
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.hidden = true;
  }

  function showBanner() {
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.hidden = false;
    document.documentElement.classList.add('cookie-banner-visible');
    var btn = document.getElementById('cookieBannerAccept');
    if (btn) btn.focus();
  }

  function init() {
    if (hasCookieConsent()) {
      hideBanner();
      return;
    }
    showBanner();
    var btn = document.getElementById('cookieBannerAccept');
    if (btn) btn.addEventListener('click', grantCookieConsent);
  }

  window.hasCookieConsent = hasCookieConsent;
  window.grantCookieConsent = grantCookieConsent;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
