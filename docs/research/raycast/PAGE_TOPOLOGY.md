# Raycast Homepage — Page Topology

Target: https://www.raycast.com/
Viewport refs: docs/design-references/raycast/

## Overall
- Dark theme site, background `#07080A` / near-black
- Fonts: Inter (UI), Geist Mono (code), SF Pro (occasional)
- Fixed floating navbar (pill/rounded bar)
- Hero uses canvas-animated red geometric glow
- No Lenis; native scroll
- Page height ~15673px at 1440px width

## Sections (top → bottom)

1. **Navbar** (`Navbar`) — fixed, z-index 2, floating rounded bar
   - Interaction: hover on links; Download CTA
2. **Hero** (`page_hero`) — h≈940px
   - Title, subtitle, dual download CTAs, homebrew link, "Meet Glaze" announcement
   - Interaction: static + canvas animation (time-driven glow)
3. **Features Showcase** (`Features`) — "Take shortcuts, not detours"
   - Mac-frame Raycast UI mock + dock of feature icons
   - Interaction: click/hover dock items switch showcase panels (Clipboard, AI, Emoji, Calculator, etc.)
4. **GetYourTimeBack** — "It's not about saving time..."
   - Keyboard visual + Fast/Ergonomic/Keyboard First copy
5. **ExtensionHighlight** — "There's an extension for that"
   - Tabs: Productivity / Engineering / Design / Writing
   - Interaction: click-driven category tabs + horizontal carousel of extension cards
6. **AI Showcase** (`AIShowCase`) — "Your Mac just got smarter"
   - Feature cards for Quick AI / ChatGPT / AI Commands
7. **Testimonials** — "Built for professionals like you"
   - Embla carousel of people cards
   - Interaction: auto/manual carousel
8. **Automation** — "Don't repeat yourself"
   - Snippets (full width) + Quicklinks + Hotkeys cards
9. **FeatureWall** — "What else can Raycast do?"
   - Grid of feature tiles with images
10. **CommunitySection** — "Stay in the loop"
    - Social links + YouTube video ticker
11. **APISection** — "Build the perfect tools"
    - Code/grid visual + docs CTA
12. **CommandYourTime** — large keyboard CTA "Command your time"
13. **Footer** — 6-column link grid + newsletter

## Overlays
- Fixed Navbar
- Optional flash message container (z=200)
