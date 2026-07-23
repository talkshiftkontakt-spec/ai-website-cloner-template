# Page Topology — snipeit.io

## Section Order (top to bottom)

1. **SiteHeader / Nav** — fixed top nav; transparent at top → frosted dark + border/shadow on scroll
2. **HeroSection** (`#hero`) — H1 + subtitle + 2 CTAs; decorative union SVGs left/right
3. **ProductDemoSection** (`#produkt`) — interactive dashboard mockup (sidebar + categories + new offers)
4. **FeaturesBentoSection** — "ŁATWA KONFIGURACJA" / Idealne narzędzie… — 3 feature cards with UI mockups
5. **AllInOneSection** — "NARZĘDZIE ALL IN ONE" — text left + source logos / lines visual
6. **ExpressActionSection** — "EKSPRESOWE DZIAŁANIE" — text + car listing cards / phone mockup
7. **PricingSection** (`#plany`) — 3 plan cards + monthly/yearly toggle (−10% yearly)
8. **ContactSection** (`#kontakt`) — contact form
9. **FaqSection** — accordion FAQ (8 items)
10. **SiteFooter** — logo, nav, legal, socials on `#1c2625`
11. **CookieBanner** — fixed bottom-left consent card (dismissible)

## Interaction Model

| Section | Model |
|---------|-------|
| Nav | scroll-driven style change; click anchors; mobile burger |
| Hero | static + CSS pulse on union decorations |
| Product demo | static mock (visual only) |
| Features bento | static |
| All-in-one / Express | static |
| Pricing | click-driven monthly/yearly toggle (prices + savings badges) |
| Contact | client mock submit |
| FAQ | click accordion (one/multi expand) |
| Cookie | click dismiss |

## Design Tokens

| Token | Value |
|-------|-------|
| Background | `#0e1716` |
| Surface / card dark | `#1f2b2a` / `#1c2625` |
| Accent teal | `#bae3df` |
| Text primary | `#f0f0f0` / `#f5fefd` |
| Text muted | `#759390` / `#6d8886` |
| Border | `#2a3938` |
| Pricing card bg | white / off-white |
| Pro badge | teal "Popularne" |
| Font display | Roboto Flex (variable) |
| Font UI / body | Satoshi / Inter |
| Max content | `1480px` (nav/sections), `1200px` (hero) |
| Nav height | ~95px |
| Smooth scroll | `html { scroll-behavior: smooth }` |

## Page shell

- `html.lang=pl`, dark theme
- `main.min-h-screen.relative` with light-blue class remnant `bg-[#EDF7FC]` overridden by dark body/`html.dark`
- Soft radial/SVG glow overlays (`hl-glow.svg`) behind content
- Cookie banner overlays bottom-left until accepted

## Assets

67 files under `public/images/snipeit/` (+ fonts in `public/fonts/`, SEO in `public/seo/`)

## Known Gaps / Out of Scope

- Real auth / Stripe checkout
- Real contact form backend / Turnstile
- Cookie preference modal detail panel (custom categories UI)
- Live offer feed
