// Expose globally for inline onclick= usage
window.toggleAcc = function (btn) {
  const item    = btn.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const isActive = item.classList.contains('active');

  document.querySelectorAll('.accordion-item').forEach(other => {
    other.classList.remove('active');
    other.querySelector('.accordion-content').style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
};

window.toggleOffer = function (btn) {
  const details    = btn.previousElementSibling;
  const isExpanded = details.classList.contains('expanded');
  const chevronDown  = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
  const chevronUp    = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';

  if (isExpanded) {
    details.style.maxHeight = null;
    details.classList.remove('expanded');
    btn.classList.remove('expanded');
    btn.innerHTML = 'Rozwiń szczegóły ' + chevronDown;
  } else {
    details.classList.add('expanded');
    details.style.maxHeight = details.scrollHeight + 'px';
    btn.classList.add('expanded');
    btn.innerHTML = 'Zwiń szczegóły ' + chevronUp;
  }
};

// Open first active accordion on load
window.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.accordion-item.active');
  if (active) {
    active.querySelector('.accordion-content').style.maxHeight =
      active.querySelector('.accordion-content').scrollHeight + 'px';
  }
});
