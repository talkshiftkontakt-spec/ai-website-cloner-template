# LekkiStart.pl — Design Direction & Inspiration

**Phase 3–6 deliverable** | Dark-mode-first premium digital health brand

---

## Brand Personality

### We Are

| Trait | Expression |
|-------|------------|
| **Calm confidence** | Measured copy; no exclamation marks; no urgency timers |
| **Professional** | Credentials visible; evidence cited; proper Polish |
| **Strong** | Large typography; decisive layout; no softness overload |
| **Honest** | Realistic timelines; no miracle claims; pricing transparent |
| **Modern** | Dark editorial; contemporary serif; minimal UI chrome |
| **Minimal** | One accent color; one CTA style; museum whitespace |
| **Premium** | Commercial typography; art-directed photography; no stock |
| **Evidence-based** | Research references; coach qualifications; methodology named |
| **Supportive** | Warm text color on dark; coaching language; stigma-free |
| **Life-changing** | Long-horizon framing; habit permanence; not 12-week shred |
| **Hope without fake promises** | "Realna zmiana w Twoim tempie" not "Schudnij 15 kg w miesiąc" |

### We Are NOT

- Gym / siłownia / CrossFit
- Protein powder / suplementy
- Bodybuilding / kulturystyka
- Fitness influencer / "motywacja"
- Diet fad / detox / keto hype
- Clinical hospital white-teal
- Bright pink mint Polish diet app
- Generic SaaS startup

---

## Visual North Star

**Blend references (principles only — never copy):**

| Brand | What we take | What we reject |
|-------|-------------|----------------|
| **Apple** | Museum spacing, one action per section, precision grid | Light mode default, product hardware focus |
| **Notion** | Dark hero → structured content transition | SaaS blocky UI, productivity aesthetic |
| **Patagonia** | Long-form editorial storytelling | Outdoor/adventure imagery |
| **WHOOP** | Data confidence via typography scale | Athlete bro culture, neon strain colors |
| **Nothing** | Radical reduction, accent scarcity | Dot-matrix type, pure black eye strain |
| **Linear** | Surface ladder, hairline borders, 96px padding | Developer tool coldness |
| **Aesop** | Whitespace as separation, serif headlines, 1600px max | Light sepia palette |
| **Nike Training Club** | Content as hero, B&W discipline | Workout-centric framing |
| **Oura** | Serif italic emphasis, warm neutrals | Wearable product focus |
| **Superpower** | Dark cinematic hero, single warm accent | Biohacker optimization tone |

**Composite mood:** Private clinic at night meets editorial magazine. Sanctuary + science.

---

## Forbidden Design Elements

### Visual Anti-Patterns (Phase 4)

| Forbidden | Why | Alternative |
|-----------|-----|-------------|
| AI-looking illustrations | Instant cheap signal | Real photography or none |
| AI gradients (purple-pink blobs) | 2023 SaaS cliché | Solid surfaces + single accent |
| Generic Tailwind SaaS layouts | Indistinguishable | Asymmetric editorial grid |
| Glassmorphism spam | Dated, illegible | Opaque raised surfaces |
| Floating blobs | Startup template marker | Geometric sections |
| Generic icons everywhere | Visual noise | Icons only for wayfinding |
| Stock SaaS hero sections | "Team collaborating" | Real coach portrait or lifestyle |
| Cookie-cutter Framer templates | Recognizable templates | Custom component system |
| Before/after transformation grids | Harmful, stigmatizing | Narrative client stories |
| Neon green on black | Fitness influencer | Warm amber accent |
| Fire/orange gradients | Aggressive | Muted amber |
| Cute mascots | Infantilizing | Human coach photography |
| Countdown urgency timers | Mass-market | Calm evergreen CTAs |

### Banned Typography

**Never use:** Poppins, Inter, Manrope, DM Sans, Outfit, Space Grotesk, Sora, Plus Jakarta Sans

### Banned Animation

- Bouncing elements
- Floating idle animations
- Excessive parallax
- Fake 3D tilts
- Particle effects
- Scroll-jacking
- Decorative-only motion

---

## Approved Typography System

### Primary Stack (Licensed — Production)

```css
--font-display: "Tiempos Headline", "PP Editorial New", Georgia, serif;
--font-body: "Söhne", "Neue Montreal", system-ui, sans-serif;
--font-mono: "Söhne Mono", "FF DIN", ui-monospace, monospace;
```

### Fallback Stack (Development / Budget)

```css
--font-display: "Fraunces", Georgia, serif;
--font-body: "IBM Plex Sans", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, monospace;
```

### Typography Rules

| Element | Font | Size (desktop) | Weight | Tracking |
|---------|------|----------------|--------|----------|
| Hero H1 | Display serif | 72–96px | 400 | -0.03em |
| Section H2 | Display serif | 48–64px | 400 | -0.02em |
| Section H3 | Body sans | 24–32px | 500 | -0.01em |
| Body | Body sans | 18px | 400 | 0 |
| Caption | Body sans | 14px | 400 | 0.01em |
| Label / UI | Body sans | 12px | 500 | 0.08em (uppercase) |
| Price | Mono | 48–64px | 500 | -0.02em (tabular) |
| Pull quote | Display serif italic | 28–36px | 400 | -0.01em |

**Editorial rule:** One italic serif phrase per headline for warmth.

---

## Colour System

### Dark-Mode-First Palette

```css
--color-canvas:           oklch(0.12 0.005 80);
--color-canvas-raised:    oklch(0.16 0.005 80);
--color-canvas-sunken:    oklch(0.09 0.005 80);
--color-text-primary:     oklch(0.95 0.01 85);
--color-text-secondary:   oklch(0.70 0.01 80);
--color-text-tertiary:    oklch(0.55 0.01 80);
--color-accent:           oklch(0.72 0.08 75);
--color-accent-hover:     oklch(0.78 0.09 75);
--color-accent-muted:     oklch(0.25 0.03 75);
--color-success:          oklch(0.72 0.12 145);
--color-border:           oklch(0.25 0.005 80);
--color-light-canvas:     oklch(0.97 0.01 85);
--color-light-text:       oklch(0.20 0.01 80);
```

---

## Photography Direction

### Subject Matter (Priority)

1. Real overweight/obese people in daily life
2. Cooking at home
3. Walking outdoors
4. Coaching consultations
5. Coach portrait
6. Food preparation

### Treatment

- Warm, desaturated grading
- Dark gradient overlays on heroes
- Dignified framing — never ashamed poses
- Unsplash/Pexels placeholders until custom shoot

### Forbidden

Before/after, measuring tape, shirtless transformation, gym mirrors, AI people, protein shakes

---

## Design Inspiration Catalog (45 References)

See [COMPETITOR_RESEARCH.md](./COMPETITOR_RESEARCH.md) for competitive context.

**Tier A (study first):** Ceano Health, MyHealthPrac, Superpower, Oura, Aesop, Unbloated, Moonlight Longevity, Linear, Hims & Hers, Eight Sleep

**Tier B (health):** Function Health, Bevel, Levels, Fern, Caliber Logs, Future, VISIO Wellness, Veri

**Tier C (reference brands):** Apple, Notion, Patagonia, WHOOP, Nothing, Nike TC

**Tier D (anti-patterns):** BetterMe, Respo timers, Cox Coaching B/A, AlterCall gradients, Fit Lovers influencer aesthetic

---

## Brand Voice

| Do | Don't |
|----|-------|
| "Pomożemy Ci zbudować nawyki, które zostaną" | "Zrób formę marzeń!" |
| "Coaching oparty na dowodach naukowych" | "Tajna metoda odchudzania" |
| "Dla osób z nadwagą i otyłością" | "Dla wszystkich, którzy chcą rzeźbić sylwetkę" |

**Hero headline:** *"Odzyskaj lekkość. Coaching, który zostaje z Tobą na lata."*

---

## Recognizability Test

Without logo, identifiable by: dark warm-black canvas, oversized serif headlines, single amber CTA accent, museum whitespace, editorial lifestyle photography, three visible pricing cards, zero before/after imagery.

---

## Motion Principles

| Property | Value |
|----------|-------|
| Duration | 400–800ms entrances, 200ms micro |
| Easing | cubic-bezier(0.22, 1, 0.36, 1) |
| Properties | opacity, transform only |
| Reduced motion | prefers-reduced-motion → instant |
