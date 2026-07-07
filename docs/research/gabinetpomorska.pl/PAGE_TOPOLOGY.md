# Page Topology — gabinetpomorska.pl

## Section Order (top to bottom)

1. **SiteHeader** — sticky/fixed dark nav with logo + dropdown menu
2. **HeroSection** — "Gabinety Pomorska w Krakowie" + CTA + hero interior image
3. **AboutSection** — "Czym się zajmujemy?" + description + interior photo
4. **ServicesSection** — 8 icon boxes (Psychiatria, Psychoterapia, etc.)
5. **TeamSection** — 2-column specialist cards grid (14 members)
6. **PricingSection** — 6 price list items + "Pełny cennik" CTA
7. **GallerySection** — 3 interior photos
8. **ContactSection** — green contact form panel
9. **SiteFooter** — logo, info links, contact, map

## Interaction Model

- **Header**: click-driven dropdowns on desktop; burger menu on mobile
- **All other sections**: static (no scroll-driven behaviors)
- **Contact form**: client-side mock submit (no backend)

## Design Tokens

| Token | Value |
|-------|-------|
| Primary green | `#134340` |
| Accent sage | `#879d91` |
| Header bg | `#2a3532` |
| Contact panel | `#5a6b62` |
| Cream bg | `#f4efe6` / `#f8f6f2` |
| Body text | `#333333` |
| Heading font | Playfair Display |
| Role font | Montserrat |
| Body font | System sans-serif stack |
| H2 size | 25.5px / 700 |

## Assets Downloaded

13 images in `public/images/gabinetpomorska/`

## Known Gaps

- Holiday hours modal not included (seasonal popup)
- Cookie consent banner omitted
- Form does not submit to WordPress backend
- Subpages (Specjaliści, Oferta, etc.) link to original site
