# FeaturesSection Specification

## Overview
- **Target file:** `src/components/FeaturesSection.tsx`
- **Screenshot:** `docs/design-references/raycast/scroll-01-y900.png`, `scroll-02-y1800.png`
- **Interaction model:** click-driven dock switches showcase panel

## Structure
- Section title: "Take shortcuts, not detours." / "One interface, everything you need."
- Large macOS-framed window mock (rounded, dark glass, red glow backdrop using featureBackground.7492bde9.png)
- Inside: Raycast search UI mock for Clipboard History (default)
- Bottom dock of 5 icons; active shows label "Clipboard History"
- Caption under dock updates per selection

## Styles
- Title 32px/600 white; subtitle 16px #9c9c9d centered
- Frame ~max-width 1000px, height ~720px, border-radius ~16-20px, border 1px rgba(255,255,255,0.08)
- Background glow image behind frame
- Dock: pill, dark translucent, centered, gap between icons

## Content per dock item
See `featureDockItems` in raycast-content.ts

## Default mock UI
Search "Type to filter entries...", list of clipboard items (colors, URLs), detail pane

## Responsive
- Mobile: scale down frame; dock may scroll horizontally
