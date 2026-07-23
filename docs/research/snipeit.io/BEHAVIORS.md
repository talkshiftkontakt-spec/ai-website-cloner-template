# Behaviors — snipeit.io

## Scroll

- **Nav at top (scrollY ≈ 0):** `bg-transparent`, `backdrop-blur-0`, `border-transparent`, `shadow-none`
- **Nav scrolled:** `bg-[#0e1716]/80`, `backdrop-blur-xl`, border-b white/10, shadow `0 8px 30px rgba(0,0,0,0.25)`
- Transition: `duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`
- Trigger threshold: ~20–50px scroll
- Page uses native `scroll-behavior: smooth` (no Lenis)

## Motion (implemented)

### Continuous CSS
- `animate-union-pulse` — hero / outline decorations (5s scale+opacity)
- `hero-grad-anim` — hero background gradient drift (12s)
- `metal-move` — Pro pricing outline + Popularne badge
- `animate-cta-shimmer` — secondary CTAs shimmer overlay

### Scroll-linked (motion)
- **Product demo 3D tilt** — `useScroll` maps progress → `rotateX` 14→0, `scale` 0.96→1, `y` 40→0 with spring
- **Offer feed** — auto-advancing carousel every 2.2s
- **Express notifications** — staggered opacity + Y fan-out + rotate as section scrolls into view
- **All-in-one lines** — lines/pulse opacity + logo/node scale on scroll; source logos stagger in
- **Rings** — subtle infinite scale pulse

### Enter / whileInView
- Hero H1 / subtitle / CTAs staggered entrance on load
- Features bento cards stagger (`Stagger` / `StaggerItem`)
- Section headings & copy via `Reveal` (opacity + translate)
- Pricing cards stagger up; footer columns stagger
- Category tiles fade/slide + hover scale

### Click
- Pricing toggle → `t-digit-pop-in` staggered digit animation on price change (tokens: `--digit-stagger` 70ms, `--digit-dur` 0.5s, spring ease)
- FAQ accordion height/opacity expand 300ms
- Cookie dismiss

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| Desktop 1440 | Full nav, side-by-side layouts, 3 pricing cards |
| Tablet 768 | Reduced padding; stacks begin |
| Mobile 390 | Burger menu; stacked CTAs; single-column pricing |

## Reduced motion
`prefers-reduced-motion` disables CSS loops; motion hooks fall back to static transforms/opacity.
