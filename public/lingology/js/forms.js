// ── Validation ──────────────────────────────────────────────────────────────
import { csrfHeaders } from './csrf.js';
export function validateCustom(formId) {
  const form = document.getElementById(formId);
  let isValid = true;

  form.querySelectorAll('[required]').forEach(field => {
    let valid;
    if (field.type === 'checkbox') {
      valid = field.checked;
    } else if (field.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    } else if (field.tagName === 'SELECT') {
      valid = field.value !== '';
    } else {
      valid = field.value.trim() !== '';
    }

    const container = field.closest('.form-field') || field.closest('.checkbox-group');
    if (!valid) {
      field.classList.add('invalid');
      const err = container?.querySelector('.error-msg');
      if (err) err.style.display = 'block';
      isValid = false;
    } else {
      field.classList.remove('invalid');
      const err = container?.querySelector('.error-msg');
      if (err) err.style.display = 'none';
    }
  });

  return isValid;
}

// Clear errors on input/change
document.querySelectorAll('[required]').forEach(field => {
  const evt = field.tagName === 'SELECT' ? 'change' : 'input';
  field.addEventListener(evt, function () {
    this.classList.remove('invalid');
    const container = this.closest('.form-field') || this.closest('.checkbox-group');
    const err = container?.querySelector('.error-msg');
    if (err) err.style.display = 'none';
  });
});

// ── Contact form ─────────────────────────────────────────────────────────────
function formToObject(form) {
  const data = {};
  for (const el of form.elements) {
    if (!el.name || el.disabled) continue;
    if (el.type === 'checkbox') {
      data[el.name] = el.checked ? 'Tak' : 'Nie';
    } else if (el.type === 'radio') {
      if (el.checked) data[el.name] = el.value;
    } else {
      const val = el.value.trim();
      if (val) data[el.name] = val;
    }
  }
  return data;
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validateCustom('contactForm')) return;

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Wysyłanie…';
    btn.disabled = true;

    try {
      const r = await fetch('/api/mail', {
        method: 'POST',
        headers: csrfHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          ...formToObject(this),
          zrodlo: `${window.location.pathname}${window.location.hash || ''}`,
          _subject:
            window.location.pathname === '/kontakt'
              ? 'Konsultacja (/kontakt) — LingoLogy'
              : 'Konsultacja (strona główna) — LingoLogy',
          typ_formularza: 'Bezpłatna konsultacja',
        }),
      });
      if (r.ok) {
        this.style.display = 'none';
        document.getElementById('formOk').style.display = 'block';
        // track
        if (typeof gtag !== 'undefined') gtag('event', 'contact_form_submit');
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ── Lead magnet (Podręcznik Podróżnika) ───────────────────────────────────────
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validateCustom('leadForm')) return;

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Trwa wysyłka…';
    btn.disabled = true;

    try {
      const r = await fetch('/api/mail', {
        method: 'POST',
        headers: csrfHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          ...formToObject(this),
          material: 'Podręcznik Podróżnika (lead magnet)',
          zrodlo: `${window.location.pathname}${window.location.hash || ''}`,
          _subject: 'Lead magnet — Podręcznik Podróżnika',
          typ_formularza: 'Lead magnet',
        }),
      });
      if (r.ok) {
        document.getElementById('leadHeader').style.display = 'none';
        document.getElementById('leadImage').style.display = 'none';
        this.style.display = 'none';
        document.getElementById('leadOk').style.display = 'block';
        if (typeof gtag !== 'undefined') gtag('event', 'lead_magnet_submit');
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}

// ── Tracking — data-track attributes ─────────────────────────────────────────
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', function () {
    const event = this.getAttribute('data-track');
    if (typeof gtag !== 'undefined') gtag('event', event);
  });
});
