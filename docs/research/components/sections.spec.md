# Remaining Sections Specs (Extensions, AI, Testimonials, Automation, FeatureWall, Community, API, CTA, Footer)

Shared visual language: bg #07080a, Inter, white titles, #9c9c9d muted, cards #111214 with border rgba(255,255,255,0.06), radius 16px.

## ExtensionHighlight (`ExtensionHighlight.tsx`)
- Title: "There's an extension for that." / "Use your favorite tools without even opening them."
- Tabs: Productivity Engineering Design Writing — click-driven; active pill backdrop
- Horizontal carousel of tall gradient cards (name + description); arrows left/right
- Footer link "Browse thousands more →"
- Data: extensionCards filtered by category

## AIShowcase (`AIShowcase.tsx`)
- Eyebrow "AI"
- Title: "Your Mac just got smarter." / "AI where it's most useful - on your OS."
- Three feature blurbs from aiFeatures
- Visual: quick-ai-mobile or isolatedCube image
- CTA "More about AI"

## Testimonials (`Testimonials.tsx`)
- Title: "Built for professionals like you." / "Used by seriously productive people."
- Horizontal marquee/carousel of cards: avatar, name, handle, role
- Data: testimonials

## Automation (`AutomationSection.tsx`)
- Title: "Don't repeat yourself." / "Automate the things you do all the time."
- Grid: Snippets wide card on top; Quicklinks + Hotkeys below
- Images from automationCards

## FeatureWall (`FeatureWall.tsx`)
- Title: "What else can Raycast do?" + supporting sentence about notes/flights/etc.
- Grid of feature tiles with images from featureTiles

## Community (`CommunitySection.tsx`)
- Title: "Stay in the loop." / "Join the community..."
- Social link row
- YouTube thumbnail ticker (youtubeVideos) with animate-marquee
- Background: community-background.31147d7b.png

## APISection (`APISection.tsx`)
- Title: "Build the perfect tools."
- Body about extension API + "Read the docs"
- Decorative grid/code aesthetic; isolatedCube optional

## CommandYourTime (`CommandYourTime.tsx`)
- Large centered headline about commanding time / download CTA
- Stylized keyboard visual (CSS grid of keys) with ⌘ highlighted
- Red glow streaks behind (can reuse hero-glow)

## Footer (`Footer.tsx`)
- 6 columns from footerColumns
- External links show ExternalLinkIcon
- Newsletter block: "Subscribe to our newsletter." + email input + submit
- Privacy consent microcopy
