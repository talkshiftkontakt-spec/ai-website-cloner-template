# PAGE_TOPOLOGY — tutoreo.pl

## Target
https://tutoreo.pl/ — landing page only

## Overall layout
1. Fixed navbar (`#MainNavbar`, z-index 1000) overlays content
2. Cookie banner (fixed bottom overlay) until dismissed
3. `main#PageBG` — light gray (`#E6E6E6`), bottom border-radius 50px, pop-off shadow, z-index 1
4. Footer sits under PageBG with negative margin overlap (−50px)

## Sections (top → bottom)

| Order | Name | ID | Interaction | Notes |
|------:|------|-----|-------------|-------|
| 0 | CookiesBanner | cookies-banner | click | Fixed overlay |
| 1 | Navbar | MainNavbar | scroll + click | Transparent → white `.LightNavbar` |
| 2 | Hero / CTA | CTASection | static + sticky video | Purple gradient; sticky `#CTAImageDiv` |
| 3 | HowItWorks | HowItWorks | click (whiteboard demo) | Radial purple, border-radius 200px top |
| 4 | Benefits | BenefitsSection | click tabs | Tutor / Student card sets |
| 5 | FAQ | FAQSection | click accordion | One open at a time |
| 6 | SecondaryCTA | SecondaryCTA | static | Gray, bottom radius 50px |
| 7 | Footer | footer | static | Purple gradient under PageBG |

## Sticky / z-index layers
- Navbar: fixed, z 1000
- Cookie banner: fixed, high z
- Hero video container: sticky top 128px, overlaps into HowItWorks area
- PageBG: z 1 over footer

## Breakpoints
- Desktop nav / desktop headline: > 1000px
- Mobile: ≤ 1000px (NavbarToggle visible, Mobile headline, stacked layouts)
