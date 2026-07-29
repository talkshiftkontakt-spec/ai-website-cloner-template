# korepetycje-pro.pl — Page Topology

Single-page WordPress/Elementor site. No separate content subpages (sitemap has only `/`).
Anchor sections act as "podstrony" navigation targets.

## Structure (top → bottom)

1. **TopBar** — fixed green strip, phone + email (sticky with header)
2. **Header / Nav** — sticky white nav, logo, anchor links, Kontakt CTA, mobile hamburger
3. **Hero** — full-bleed photo bg + white gradient, headline, CTAs, 3 icon bullets, wave bottom
4. **Features (#zajecia)** — "Jak wyglądają zajęcia?" — 4 icon cards
5. **Offer (#oferta)** — mint bg — 2 offer cards (SP / Liceum) + Kontakt CTA
6. **About (#omnie)** — photo bg + white gradient — bio + 3 icon boxes
7. **Pricing (#cennik)** — 3 pricing cards with animated counters (70/80/100 zł)
8. **Testimonials (#opinie)** — swiper carousel, 10 reviews, 2 visible desktop
9. **Contact (#kontakt)** — form + side image on mint bg
10. **Footer** — green bar, copyright + credit
11. **ScrollToTop** — fixed green button bottom-right

## Interaction models
- Nav: click → smooth scroll to anchors
- Header: sticky top
- Cards/buttons: hover translateY(-5px)
- Pricing: scroll-triggered count-up 1000ms
- Testimonials: time-driven carousel + dots/arrows
- Sections: fade-up on enter viewport
