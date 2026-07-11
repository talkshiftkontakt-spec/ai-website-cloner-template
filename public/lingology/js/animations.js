const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.documentElement.classList.add('reduce-motion');
  document.querySelectorAll('.fu').forEach(el => el.classList.add('visible'));
} else {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fu').forEach(el => obs.observe(el));
}
