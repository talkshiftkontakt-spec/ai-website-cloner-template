# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Screenshot:** `docs/design-references/tutoreo.pl/desktop-hero.png`
- **Interaction model:** scroll-driven + click (mobile menu)

## Computed Styles
- Fixed, height 80px, z-index 1000
- Restrainer: flex row, justify end, align center, gap 48px, padding 16px 24px
- Logo: 178×38
- Links: 18px bold; white on transparent, `#5800FF` on `.LightNavbar`
- CTA: height 48px, radius 16px; white bg / dark text at top; purple bg / white text scrolled

## States
- Scroll > ~40px → white background + PopOffShadow + purple chrome + dark logo
- Mobile ≤1000px: hamburger toggle opens full-screen white menu
