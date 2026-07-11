function closeMenu() {
  const links = document.querySelector('.nav-links');
  const burger = document.querySelector('.nav-burger');
  links?.classList.remove('active');
  burger?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
  document.querySelectorAll('.nav-dropdown-menu.open').forEach((menu) => {
    menu.classList.remove('open');
    menu.previousElementSibling?.setAttribute('aria-expanded', 'false');
  });
}

window.toggleMenu = function () {
  const links = document.querySelector('.nav-links');
  const burger = document.querySelector('.nav-burger');
  if (!links) return;
  const willOpen = !links.classList.contains('active');
  if (willOpen) {
    links.classList.add('active');
    burger?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  } else {
    closeMenu();
  }
};

window.toggleDropdown = function (btn, event) {
  event?.preventDefault();
  event?.stopPropagation();

  const menu = btn.nextElementSibling;
  if (!menu) return;

  const willOpen = !menu.classList.contains('open');

  document.querySelectorAll('.nav-dropdown-menu.open').forEach((openMenu) => {
    if (openMenu !== menu) {
      openMenu.classList.remove('open');
      openMenu.previousElementSibling?.setAttribute('aria-expanded', 'false');
    }
  });

  menu.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', String(willOpen));

  if (willOpen && window.matchMedia('(min-width: 901px)').matches) {
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if (!btn.closest('.nav-dropdown').contains(e.target)) {
          menu.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          document.removeEventListener('click', handler);
        }
      });
    }, 0);
  }
};

const navLinks = document.getElementById('navLinks');
if (navLinks) {
  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) closeMenu();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Sticky mobile CTA — show after scrolling past hero, hide when contact visible
const mobileStickyCta = document.getElementById('mobileStickyCta');
if (mobileStickyCta) {
  let heroVisible = true;
  let contactVisible = false;

  function updateStickyCta() {
    const show = !heroVisible && !contactVisible;
    mobileStickyCta.classList.toggle('visible', show);
    if (show) {
      mobileStickyCta.removeAttribute('inert');
    } else {
      mobileStickyCta.setAttribute('inert', '');
    }
  }

  const hero = document.getElementById('hero');
  if (hero) {
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; updateStickyCta(); }, { threshold: 0 }).observe(hero);
  }

  const contact = document.getElementById('contact');
  if (contact) {
    new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; updateStickyCta(); }, { threshold: 0 }).observe(contact);
  }
}
