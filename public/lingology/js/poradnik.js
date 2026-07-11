import { validateCustom } from './forms.js';
import { csrfHeaders } from './csrf.js';

const MAIL_REQUEST_TIMEOUT_MS = 25_000;

function showPoradnikError(message) {
  const el = document.getElementById('poradnikFormError');
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function hidePoradnikError() {
  const el = document.getElementById('poradnikFormError');
  if (el) el.style.display = 'none';
}

function formToObject(form) {
  const data = {};
  for (const el of form.elements) {
    if (!el.name || el.disabled) continue;
    if (el.type === 'checkbox') {
      data[el.name] = el.checked ? 'Tak' : 'Nie';
    } else {
      const val = el.value.trim();
      if (val) data[el.name] = val;
    }
  }
  return data;
}

function _openPoradnikModal() {
  const modal = document.getElementById('poradnikModal');
  if (!modal || modal.classList.contains('active')) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const first = modal.querySelector('input:not([type="hidden"])');
  if (first) first.focus();
}

export function closePoradnikModal(e = null) {
  if (e) e.preventDefault();
  const modal = document.getElementById('poradnikModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    const els = {
      poradnikHeader: 'block',
      poradnikImage: 'block',
      poradnikForm: 'block',
      poradnikOk: 'none',
    };
    Object.entries(els).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = val;
    });
    const form = document.getElementById('poradnikForm');
    if (form) {
      form.reset();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.textContent = 'Wyślij i pobierz PDF';
      form.querySelectorAll('.invalid').forEach(f => f.classList.remove('invalid'));
      form.querySelectorAll('.error-msg').forEach(m => { m.style.display = 'none'; });
    }
    hidePoradnikError();
    const dl = document.getElementById('poradnikDownloadBtn');
    if (dl) dl.href = '#';
  }, 300);
}

window.closePoradnikModal = closePoradnikModal;

window.openPoradnikModal = function (e = null) {
  if (e) e.preventDefault();
  _openPoradnikModal();
};

const poradnikForm = document.getElementById('poradnikForm');
if (poradnikForm) {
  poradnikForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validateCustom('poradnikForm')) return;

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Trwa wysyłka…';
    btn.disabled = true;
    hidePoradnikError();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MAIL_REQUEST_TIMEOUT_MS);

    try {
      const r = await fetch('/api/mail', {
        method: 'POST',
        signal: controller.signal,
        headers: csrfHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          ...formToObject(this),
          material: 'Poradnik LingoLogy (e-book)',
          zrodlo: `${window.location.pathname}${window.location.hash || ''}`,
          _subject: 'Lead magnet — Poradnik LingoLogy',
          typ_formularza: 'Poradnik LingoLogy',
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok !== false) {
        document.getElementById('poradnikHeader').style.display = 'none';
        document.getElementById('poradnikImage').style.display = 'none';
        this.style.display = 'none';
        const dlBtn = document.getElementById('poradnikDownloadBtn');
        if (dlBtn && data.downloadUrl) dlBtn.href = data.downloadUrl;
        document.getElementById('poradnikOk').style.display = 'block';
        if (typeof gtag !== 'undefined') gtag('event', 'poradnik_lead_submit');
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
        showPoradnikError(
          data.error
            || 'Nie udało się wysłać formularza. Spróbuj ponownie lub napisz na kontakt@lingology.pl.',
        );
      }
    } catch {
      btn.textContent = originalText;
      btn.disabled = false;
      showPoradnikError(
        'Połączenie trwa zbyt długo. Odśwież stronę i spróbuj ponownie, albo napisz na kontakt@lingology.pl.',
      );
    } finally {
      clearTimeout(timeoutId);
    }
  });
}
