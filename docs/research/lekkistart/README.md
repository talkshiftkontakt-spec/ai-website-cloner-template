# LekkiStart.pl — Research & Implementation Specification

**Status:** Phase 1–14 complete (research only — no website build yet)  
**Brand:** LekkiStart.pl  
**Positioning:** Premium online coaching for overweight and obese people  
**Last updated:** July 2026

---

## Document Index

| Document | Contents |
|----------|----------|
| [COMPETITOR_RESEARCH.md](./COMPETITOR_RESEARCH.md) | 110+ competitor catalog, cross-market patterns, deep-dive on 30 brands |
| [DESIGN_DIRECTION.md](./DESIGN_DIRECTION.md) | Brand personality, visual direction, 45 design references, anti-patterns |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Colors, typography, spacing, components, motion, photography rules |
| [LANDING_PAGE_SPEC.md](./LANDING_PAGE_SPEC.md) | Above-fold structure, full page sections, pricing, application form |
| [SEO_ARCHITECTURE.md](./SEO_ARCHITECTURE.md) | URL structure, content clusters, schema, metadata, internal linking |
| [IMPLEMENTATION_BLUEPRINT.md](./IMPLEMENTATION_BLUEPRINT.md) | Folder architecture, components, tokens, performance, CMS, scalability |

---

## Executive Summary

### Market Opportunity

LekkiStart occupies a **whitespace between three Polish market clusters**:

1. **Mass-market apps** (BeDiet, Diet & Training by Ann, Fit Lovers) — celebrity/influencer energy, diet-as-product, hidden or buried pricing
2. **Mid-tier clinical** (Centrum Respo) — strong science, app-heavy, still diet-first not coaching-first
3. **Medical obesity clinics** (Femilite, FITEDO, DietaGLP) — clinical Rx focus, women-only or GLP-1-specific

**LekkiStart differentiator:** Premium **human coaching** for obesity — evidence-based, behavior-first, transparent pricing, editorial brand — without gym culture, without fake transformation hype, without hiding cost.

### Global Benchmarks to Beat

| Dimension | Best-in-class reference | What LekkiStart adopts |
|-----------|------------------------|------------------------|
| Transparent pricing above fold | Future, Born Fitness, Forge PT | Starter / Standard / Premium cards immediately visible |
| Behavior change depth | Noom, Calibrate, Precision Nutrition | Psychology + habits, not calorie obsession |
| Premium visual identity | Oura, Aesop, Ceano Health, Superpower | Dark editorial, museum spacing, serif/sans tension |
| Human accountability | Future, GoalsWon, Born Fitness | Weekly check-ins + async support |
| Dignified body representation | Caliber "Logs", Oura, Function Health | Real people, lifestyle — never before/after grids |
| SEO architecture | YMYL health coach case study (The Drum) | Service-line pages, schema, content pruning |

### Pricing Recommendation (PLN)

Based on Polish mid-premium (200–600 PLN/mo) and global premium ($150–300/mo ≈ 600–1200 PLN):

| Tier | Price | Target |
|------|-------|--------|
| **Starter** | 399 PLN/mo | BMI 27–32, first-time coaching, 2x check-ins/month |
| **Standard** | 699 PLN/mo | BMI 32–40, weekly check-ins, full training + nutrition |
| **Premium** | 1 199 PLN/mo | BMI 40+, 2x weekly touchpoints, priority access, extended education |

*Display all three above the fold. No "contact for pricing."*

### Typography Decision (Distinctive, Not Banned)

| Role | Font | Rationale |
|------|------|-----------|
| Display | **Tiempos Headline** or **PP Editorial New** | Editorial authority; instantly not-Tailwind |
| UI / Body | **Söhne** or **Neue Montreal** | Premium grotesque; pairs with serif |
| Data / Metrics | **Söhne Mono** or **FF DIN** tabular | Weight, BMI, progress numbers |

**Explicitly banned:** Inter, Poppins, Manrope, DM Sans, Outfit, Space Grotesk, Sora, Plus Jakarta Sans.

### Core Conversion Insight

Research across 110 competitors confirms: **sites that bury pricing lose high-intent mobile visitors**. The Drum case study documented 190% organic growth after restructuring service pages with **pricing above fold** and **program comparison**. LekkiStart must communicate **who / how much / how to start** without scrolling.

---

## Next Step

When approved, implementation follows [IMPLEMENTATION_BLUEPRINT.md](./IMPLEMENTATION_BLUEPRINT.md) in the existing Next.js 16 scaffold at `/workspace`.
