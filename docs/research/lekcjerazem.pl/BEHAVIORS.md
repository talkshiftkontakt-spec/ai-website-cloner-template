# LekcjeRazem.pl — Behaviors

## Scroll-Driven

| Element | Trigger | Effect |
|---------|---------|--------|
| `#main-nav` | scrollY > 20 | `.scrolled` class: shadow + opaque bg |
| `.hero-visual` | scroll < 120vh | parallax translateY(scroll * 0.045) |
| `.sr`, `[data-target]` | IntersectionObserver threshold 0.08 | `.vis` class + counter animation |
| `.steps-wrap[data-steps]` | scroll through steps | `.step-line-fill` progress |

## Click-Driven

| Element | Action |
|---------|--------|
| Hero `.ptbtn` | Toggle tutor/student CTAs (`switchHero`) |
| `#nav-burger` | Open/close mobile nav |
| `.faq-item` | Accordion toggle |
| Cookie buttons | Accept/decline cookies (localStorage) |

## Time-Driven (Auto)

| Element | Interval | Notes |
|---------|----------|-------|
| Board `.c-line` | staggered 600–2600ms | Typing animation loop every 10s |
| `.lr-carousel` | data-interval (1800–2600ms) | Mobile-only carousels at ≤600px |
| `[data-flow]` | sequential step activation | Flow cards in przeplyw section |
| Counter `[data-target]` | 4s ease + 1s pause | Loops 600+, 6800+ |

## Hover

- Nav links: underline grow
- `.btn-prim`: lift + shadow
- `.pcard`, `.wcard`: translateY(-6px)
- `.fb` floating badges: scale + shadow

## Responsive

- **≤1120px:** Nav links shrink, icons hidden
- **≤960px:** Hamburger menu, grid nav → mobile overlay
- **≤600px:** Carousels activate for grids (why, adv, shots, etc.)
