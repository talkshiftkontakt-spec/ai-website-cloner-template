# Navbar Specification

## Overview
- **Target file:** `src/components/Navbar.tsx`
- **Screenshot:** `docs/design-references/raycast/navbar.png`, `viewport-top-1440.png`
- **Interaction model:** hover-driven (link color), fixed overlay

## DOM Structure
- Fixed container full width, z-index 2, height 92px, padding top ~16px
- Inner floating bar (~1200px max, centered): rounded ~16px, dark translucent bg, thin border rgba(255,255,255,0.1), backdrop blur
- Left: RaycastLogoIcon 28x28 + "Raycast" wordmark (white, 15-16px, semibold)
- Center: nav links Store Pro AI iOS Windows Teams Enterprise Blog Pricing
- Right: "Log in" text + Download button (Apple icon + "Download", bg #e6e6e6, color #2f3031, radius 8px, h 36px, px 12)

## Computed Styles
### Outer
- position: fixed; top: 0; z-index: 2; width: 100%; height: 92px; display flex; justify center; align flex-start; padding-top 16px; bg transparent

### Inner bar
- display: flex; align-items: center; justify-content: space-between; gap: 16px
- height: ~74-76px; max-width: ~1200px; width: calc(100% - 32px)
- border-radius: 16px; border: 1px solid rgba(255,255,255,0.08)
- background: rgba(17,18,20,0.72); backdrop-filter: blur(20px)

### Nav links
- fontSize: 14px; fontWeight: 500; color: #9c9c9d; padding: 12px 8px; border-radius: 6px
- Hover: color #ffffff; transition 150ms

### Download button
- fontSize: 14px; fontWeight: 500; color: #2f3031; background: #e6e6e6
- padding: 8px 12px; border-radius: 8px; height: 36px; gap: 8px; display flex; align center

## States & Behaviors
- Fixed on scroll (no major style change observed)
- Mobile: hide center links, show logo + Download (simplify)

## Assets
- RaycastLogoIcon, AppleIcon from icons.tsx

## Text Content
Store, Pro, AI, iOS, Windows, Teams, Enterprise, Blog, Pricing, Log in, Download

## Responsive
- Desktop 1440: full links
- Tablet 768: may wrap/hide some links
- Mobile 390: logo + Download only (or hamburger simplified)
