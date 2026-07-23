# HeroSection Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Screenshot:** `docs/design-references/raycast/hero-section.png`, `viewport-top-1440.png`
- **Interaction model:** time-driven (canvas glow) + static content; fade-in-up on load

## DOM Structure
- Section height ~940px, flex column, align center, justify center, margin-bottom 224px
- Background layer: red diagonal geometric glow (use `/images/raycast/features/hero-glow.png` OR CSS beams with blur) centered, max 1200px
- Text block centered over glow
- H1 + P + CTA row + utility links + Meet Glaze announcement near bottom

## Computed Styles
### H1
- fontSize: 64px; fontWeight: 600; lineHeight: 70.4px; color: #fff; text-align: center; maxWidth: 540px

### Subtitle P
- fontSize: 18px; fontWeight: 400; letterSpacing: 0.2px; color: #fff; text-align: center; width ~786px; margin-top ~16-20px

### CTA buttons (both light)
- fontSize: 14px; fontWeight: 500; color: #2f3031; background: #e6e6e6
- padding: 8px 12px; border-radius: 8px; height: 36px; gap: 8px; display flex
- "Download for Mac" (AppleIcon) + "Download for Windows (beta)" (WindowsIcon)
- margin-top ~28px; gap between buttons ~12px

### Utility links
- Small gray text #9c9c9d ~13px: "Install via homebrew or winget" | "Try the new Raycast beta"

### Meet Glaze announcement
- Pill ~223x32; bg rgb(69,35,36); conic gradient border pink; text "Meet Glaze" + "Learn more"

## Assets
- hero-glow.png as background image (canvas replacement)
- AppleIcon, WindowsIcon

## Text Content (verbatim)
Your shortcut to everything.
A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable.
Download for Mac / Download for Windows (beta)
Install via homebrew or winget / Try the new Raycast beta
Meet Glaze / Learn more

## Responsive
- Desktop: 64px title
- Mobile 390: title ~36-40px; stack CTAs; full-width padding 24px
