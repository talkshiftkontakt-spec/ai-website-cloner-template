# LekcjeRazem.pl — Page Topology

Target: `https://lekcjerazem.pl/`

## Fixed Overlays

1. **Main Nav** (`#main-nav`) — fixed top, z-index 200, blur backdrop
2. **Mobile Nav** (`#nav-mobile`) — full-screen overlay, z-index 199
3. **Cookie Banner** (`#cookie-banner`) — bottom fixed

## Section Order (top → bottom)

| # | Section ID | Name | Background |
|---|------------|------|------------|
| 1 | — | Hero | `--paper` with orbs |
| 2 | — | Stats Strip | `--ink` (dark) |
| 3 | `dla-ucznia` | Path Cards (Tutor/Student) | white |
| 4 | `ai` | AI Section | `--ink` dark |
| 5 | `podglad` | App Screenshots | white |
| 6 | `dlaczego` | Why LekcjeRazem + Steps | `--ink` dark |
| 7 | `porownanie` | Comparison Table | white |
| 8 | `przewaga` | Competitive Advantages | `--chalk` alt |
| 9 | `przeplyw` | Live Product Flows | white |
| 10 | — | Trust Numbers | `--chalk` alt |
| 11 | `historie` | Success Stories | white |
| 12 | `z-bloga` | Blog Carousel | `--chalk` alt |
| 13 | `materialy` | Matematix Materials | `--chalk` alt |
| 14 | `kontakt` | CTA Bottom | gradient dark |
| 15 | `funkcje-platformy-linki` | Feature Links Grid | `--chalk` alt |
| 16 | — | Footer | dark |

## Dependencies

- Body `padding-top` synced to nav height via JS
- Hero visual has parallax on scroll
- All carousels share `.lr-carousel` JS module
