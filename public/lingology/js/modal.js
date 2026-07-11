function _openModal() {
  const modal = document.getElementById('leadModal');
  if (!modal || modal.classList.contains('active')) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeModal(e = null) {
  if (e) e.preventDefault();
  const modal = document.getElementById('leadModal');
  modal?.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    const els = { leadHeader: 'block', leadImage: 'block', leadForm: 'block', leadOk: 'none' };
    Object.entries(els).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = val;
    });
    const form = document.getElementById('leadForm');
    if (form) {
      form.reset();
      const btn = form.querySelector('button');
      if (btn) btn.textContent = 'Chcę odebrać materiały!';
      form.querySelectorAll('.invalid').forEach(f => f.classList.remove('invalid'));
      form.querySelectorAll('.error-msg').forEach(m => { m.style.display = 'none'; });
    }
  }, 300);
}

window.closeModal = closeModal;

window.openModal = function (e = null) {
  if (e) e.preventDefault();
  _openModal();
};
