# LekkiStart.pl — Implementation Blueprint

**Phase 13–14 deliverable** | Production-ready specification for Next.js 16 build

---

## Overview

Build on existing scaffold at `/workspace` (Next.js 16, App Router, React 19, TypeScript strict, Tailwind v4, shadcn/ui).

**Do not use default scaffold styling.** Replace entirely with LekkiStart design tokens.

---

## Folder Architecture

```
src/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, metadata, schema
│   ├── page.tsx                   # Landing page (composition)
│   ├── globals.css                # Tailwind v4 + design tokens
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── oferta/
│   │   ├── page.tsx               # Offer overview
│   │   ├── starter/page.tsx
│   │   ├── standard/page.tsx
│   │   └── premium/page.tsx
│   ├── uslugi/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── dla-kogo/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── wiedza/
│   │   ├── page.tsx               # Knowledge hub
│   │   └── [cluster]/[slug]/page.tsx
│   ├── historie/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── cennik/page.tsx
│   ├── faq/page.tsx
│   ├── trener/page.tsx
│   ├── kontakt/page.tsx
│   ├── aplikacja/page.tsx
│   ├── o-nas/page.tsx
│   ├── polityka-prywatnosci/page.tsx
│   ├── regulamin/page.tsx
│   └── api/
│       ├── aplikacja/route.ts     # Form submission
│       └── revalidate/route.ts    # CMS webhook (future)
├── components/
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── section.tsx            # Section wrapper with theme prop
│   │   └── container.tsx
│   ├── landing/
│   │   ├── hero.tsx
│   │   ├── pricing-cards.tsx
│   │   ├── transformation-gallery.tsx
│   │   ├── client-stories.tsx
│   │   ├── testimonials.tsx
│   │   ├── how-it-works.tsx
│   │   ├── feature-section.tsx    # Reusable for training/nutrition/support
│   │   ├── progress-tracking.tsx
│   │   ├── faq-accordion.tsx
│   │   ├── about-coach.tsx
│   │   ├── guarantee.tsx
│   │   └── application-form.tsx
│   ├── seo/
│   │   ├── json-ld.tsx
│   │   └── breadcrumb.tsx
│   ├── content/
│   │   ├── prose.tsx              # MDX/article typography
│   │   ├── article-card.tsx
│   │   └── story-card.tsx
│   ├── ui/                        # shadcn primitives (customized)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── radio-group.tsx
│   │   ├── accordion.tsx
│   │   └── label.tsx
│   └── motion/
│       ├── fade-up.tsx
│       └── stagger-children.tsx
├── lib/
│   ├── utils.ts                   # cn() — existing
│   ├── fonts.ts                   # next/font configuration
│   ├── metadata.ts                # Metadata helpers
│   ├── schema.ts                  # JSON-LD builders
│   ├── validations/
│   │   └── application.ts         # Zod schema
│   └── constants/
│       ├── pricing.ts
│       ├── navigation.ts
│       └── faq.ts
├── content/                       # MDX or JSON content (launch)
│   ├── faq.json
│   ├── pricing.json
│   ├── stories/
│   └── wiedza/
├── styles/
│   └── tokens.css                 # CSS custom properties
├── types/
│   ├── pricing.ts
│   ├── application.ts
│   └── content.ts
└── hooks/
    ├── use-scroll-to.ts
    └── use-media-query.ts

public/
├── images/
│   ├── hero/
│   ├── gallery/
│   ├── coach/
│   └── wiedza/
├── seo/
│   ├── favicon.ico
│   ├── og-landing.jpg
│   ├── og-default.jpg
│   └── site.webmanifest
└── fonts/                         # Self-hosted if licensed
    ├── tiempos-headline/
    └── soehne/
```

---

## Component Architecture

### Composition Pattern (Landing Page)

```tsx
// src/app/page.tsx
import { Hero } from "@/components/landing/hero";
import { PricingCards } from "@/components/landing/pricing-cards";
// ...

export default function HomePage() {
  return (
    <>
      <Hero />
      <TransformationGallery />
      <ClientStories />
      <Testimonials />
      <HowItWorks />
      <FeatureSection id="trening" title="..." image="..." />
      <FeatureSection id="zywienie" title="..." image="..." />
      <FeatureSection id="wsparcie" title="..." image="..." />
      <ProgressTracking />
      <FaqAccordion />
      <AboutCoach />
      <PricingCards variant="full" id="cennik" theme="light" />
      <Guarantee />
      <ApplicationForm id="aplikacja" theme="light" />
    </>
  );
}
```

### Section Wrapper

```tsx
// src/components/layout/section.tsx
type SectionProps = {
  id?: string;
  theme?: "dark" | "light" | "raised";
  padding?: "default" | "hero" | "compact";
  children: React.ReactNode;
};

export function Section({ id, theme = "dark", padding = "default", children }: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme === "light" ? "light" : undefined}
      className={cn(
        "bg-canvas text-primary",
        theme === "raised" && "bg-canvas-raised",
        theme === "light" && "bg-light-canvas text-light-text",
        padding === "hero" && "py-32 lg:py-40",
        padding === "default" && "py-24 lg:py-32",
        padding === "compact" && "py-16 lg:py-24",
      )}
    >
      {children}
    </section>
  );
}
```

### Container

```tsx
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-5 md:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
```

---

## Design Tokens Implementation

### `src/styles/tokens.css`

```css
@theme {
  /* Colors */
  --color-canvas: oklch(0.12 0.005 80);
  --color-canvas-raised: oklch(0.16 0.005 80);
  --color-canvas-sunken: oklch(0.09 0.005 80);
  --color-text-primary: oklch(0.95 0.01 85);
  --color-text-secondary: oklch(0.70 0.01 80);
  --color-text-tertiary: oklch(0.55 0.01 80);
  --color-accent: oklch(0.72 0.08 75);
  --color-accent-hover: oklch(0.78 0.09 75);
  --color-accent-muted: oklch(0.25 0.03 75);
  --color-border: oklch(0.25 0.005 80);
  --color-border-strong: oklch(0.35 0.005 80);
  --color-light-canvas: oklch(0.97 0.01 85);
  --color-light-text: oklch(0.20 0.01 80);

  /* Typography */
  --font-display: var(--font-tiempos), Georgia, serif;
  --font-body: var(--font-soehne), system-ui, sans-serif;
  --font-mono: var(--font-soehne-mono), ui-monospace, monospace;

  /* Spacing */
  --spacing-container: 1280px;
  --spacing-prose: 720px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Animation */
  --ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
}

[data-theme="light"] {
  --color-canvas: var(--color-light-canvas);
  --color-text-primary: var(--color-light-text);
  --color-canvas-raised: oklch(1 0 0);
  --color-border: oklch(0.90 0.01 85);
}
```

### `src/lib/fonts.ts`

```tsx
import localFont from "next/font/local";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Production: replace with localFont for Tiempos + Söhne
export const fontDisplay = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-tiempos",
  display: "swap",
});

export const fontBody = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-soehne",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-soehne-mono",
  display: "swap",
});
```

---

## Typography Scale (Tailwind)

```css
/* globals.css utilities */
@utility text-hero {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 5vw + 1rem, 6rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}

@utility text-display {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw + 0.5rem, 4rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@utility text-price {
  font-family: var(--font-mono);
  font-size: clamp(2.5rem, 3vw + 1rem, 4rem);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
```

---

## Reusable UI Specifications

### Button (shadcn override)

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-canvas hover:bg-accent-hover",
        secondary: "border border-border-strong bg-transparent text-primary hover:border-primary",
        ghost: "text-secondary hover:text-primary",
      },
      size: {
        lg: "h-[52px] px-8 text-base rounded-md",
        md: "h-11 px-6 text-[15px] rounded-md",
        sm: "h-9 px-4 text-sm rounded-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);
```

### Pricing Card

```tsx
type PricingTier = {
  id: "starter" | "standard" | "premium";
  name: string;
  price: number;
  featured?: boolean;
  audience: string;
  includes: string[];
  commitment: string;
};

// Data from src/lib/constants/pricing.ts
```

---

## Animation Library

**Package:** `motion` (Framer Motion v11+)

```tsx
// src/components/motion/fade-up.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

**Rules:**
- `viewport={{ once: true }}` — no repeat animations
- No `whileHover={{ scale }}` — opacity/border only
- Lazy-load motion components with `dynamic(() => import(...), { ssr: false })` only if needed

---

## Image Guidelines

### next/image Configuration

```tsx
// next.config.ts
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};
```

### Image Component Pattern

```tsx
<Image
  src="/images/hero/walking-park.jpg"
  alt="Kobieta idąca spokojnym tempem parkową alejką"
  width={1920}
  height={1080}
  priority          // hero only
  sizes="100vw"
  className="object-cover"
  placeholder="blur"
  blurDataURL="..."  // generate at build
/>
```

### Performance Rules

| Rule | Implementation |
|------|----------------|
| Hero image | `priority`, preload |
| Below fold | `loading="lazy"` default |
| Responsive | `sizes` attribute always set |
| Format | AVIF → WebP → JPEG fallback |
| Max dimensions | Resize source to 1920px wide max |
| Blur placeholder | `plaiceholder` or static LQIP |

---

## SEO Implementation

### Metadata helper

```tsx
// src/lib/metadata.ts
import type { Metadata } from "next";

export function createMetadata({
  title,
  description,
  path,
  image = "/seo/og-default.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `https://lekkistart.pl${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [image], locale: "pl_PL", type: "website" },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
```

### JSON-LD component

```tsx
// src/components/seo/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## Accessibility Implementation

| Requirement | File / pattern |
|-------------|----------------|
| Skip link | `site-header.tsx` — first element |
| Focus management | Mobile nav trap focus |
| ARIA | Accordion: `aria-expanded`, form: `aria-invalid` |
| Color contrast | Test with oklch values — 4.5:1 minimum |
| Reduced motion | All motion components check `useReducedMotion` |
| Form errors | `aria-describedby` linking to error message |
| Language | `<html lang="pl">` in root layout |

---

## Application Form API

```tsx
// src/app/api/aplikacja/route.ts
import { applicationSchema } from "@/lib/validations/application";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  // 1. Store in database (Supabase/Neon) or send email (Resend)
  // 2. Send confirmation email to applicant
  // 3. Notify coach

  return NextResponse.json({ success: true });
}
```

```tsx
// src/lib/validations/application.ts
import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(2, "Podaj imię"),
  email: z.string().email("Podaj prawidłowy email"),
  phone: z.string().min(9, "Podaj numer telefonu"),
  tier: z.enum(["starter", "standard", "premium"]),
  goal: z.string().min(20, "Opisz cel dokładniej"),
  currentWeight: z.number().min(40).max(300),
  targetWeight: z.number().min(40).max(300),
  age: z.number().min(18).max(80),
  trainingExperience: z.enum(["none", "beginner", "intermediate", "advanced"]),
  biggestStruggle: z.string().min(10),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  gdprConsent: z.literal(true),
  marketingConsent: z.boolean().optional(),
});
```

---

## Performance Targets (Phase 13)

| Metric | Target | Implementation |
|--------|--------|----------------|
| Lighthouse Performance | 100 | SSG, image optimization, minimal JS |
| Lighthouse Accessibility | 100 | See a11y section |
| Lighthouse SEO | 100 | Metadata, schema, semantic HTML |
| LCP | < 2.0s | Priority hero image, font display swap |
| INP | < 200ms | Minimal client JS, no heavy listeners |
| CLS | < 0.05 | Explicit image dimensions, no layout shift fonts |
| Total JS (landing) | < 100kb gzip | RSC default, motion lazy |
| Font load | < 100ms perceived | `display: swap`, subset latin-ext |

### Performance Checklist

- [ ] Static generation for landing + content pages
- [ ] `next/font` with subsetting
- [ ] No third-party scripts on landing (defer analytics)
- [ ] CSS-only animations where possible
- [ ] Route-level code splitting (automatic App Router)
- [ ] `loading.tsx` only for dynamic routes
- [ ] Compress images at build (sharp via next/image)
- [ ] Enable Vercel Speed Insights

---

## CMS Structure (Future Scalability)

### Phase 1 (Launch): File-based content

```
src/content/
├── faq.json
├── pricing.json
├── stories/*.mdx
└── wiedza/**/*.mdx
```

Use `next-mdx-remote` or Contentlayer successor for MDX.

### Phase 2: Headless CMS

Recommended: **Sanity** or **Payload CMS** (self-hosted)

| Content type | Fields |
|--------------|--------|
| `story` | title, slug, body, pullQuote, clientName, duration, portrait |
| `article` | title, slug, cluster, body, author, publishedAt, updatedAt |
| `faq` | question, answer, category |
| `pricingTier` | name, price, features, commitment, featured |
| `coach` | name, bio, credentials, photo, philosophy |

Webhook → `/api/revalidate` for ISR.

---

## Environment Variables

```env
# .env.local
RESEND_API_KEY=              # Email notifications
DATABASE_URL=                # Application storage (Neon/Supabase)
NEXT_PUBLIC_SITE_URL=https://lekkistart.pl
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=lekkistart.pl  # Analytics (privacy-first)
```

---

## Build Order (Recommended)

| Step | Task | Depends on |
|------|------|------------|
| 1 | Design tokens + fonts + globals.css | — |
| 2 | Layout (header, footer, section, container) | Step 1 |
| 3 | UI primitives (button, input, accordion) | Step 1 |
| 4 | Hero + pricing cards (above fold) | Steps 2–3 |
| 5 | Remaining landing sections | Steps 2–3 |
| 6 | Application form + API route | Step 3 |
| 7 | SEO (metadata, schema, sitemap) | Step 4 |
| 8 | Static pages (cennik, faq, trener) | Steps 2–3 |
| 9 | Knowledge base MDX pipeline | Step 8 |
| 10 | Performance audit + image optimization | All |
| 11 | Accessibility audit | All |
| 12 | Launch content (5 articles, 3 stories) | Step 9 |

---

## Dependencies to Add

```json
{
  "dependencies": {
    "motion": "^11.x",
    "zod": "^3.x",
    "@hookform/resolvers": "^3.x",
    "react-hook-form": "^7.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

**Do not add:** Framer Motion legacy package, heavy carousel libraries, icon packs beyond Lucide.

---

## Testing Checklist

| Test | Method |
|------|--------|
| Above-fold pricing visible | Playwright viewport 1440×900 and 390×844 |
| Form validation | Unit tests on Zod schema |
| Lighthouse 100 | `npm run build && npx lighthouse` |
| Schema valid | Google Rich Results Test |
| Keyboard nav | Manual tab through entire landing |
| Reduced motion | OS setting + verify no animation |
| Polish copy | Native speaker review |

---

## Git / Deployment

- **Branch:** `cursor/lekkistart-implementation-02fb` (when building)
- **Deploy:** Vercel, production domain `lekkistart.pl`
- **Preview:** Every PR gets preview URL
- **CI:** Existing `npm run check` (lint + typecheck + build)

---

## Open Questions for Stakeholder (Before Build)

1. Coach name, photo, credentials for `/trener`
2. Font licensing budget (Tiempos + Söhne ≈ €200–400)
3. Payment integration timing (Stripe vs manual invoicing Phase 1)
4. CRM for application leads (HubSpot, Notion, email-only)
5. Legal: regulamin, polityka prywatności text (lawyer review)
6. Real client stories — written permission for publication
7. GLP-1 content stance (awareness articles vs no medical positioning)

---

## Summary

This blueprint provides everything a senior developer needs to build LekkiStart without design questions:

- **120 competitors analyzed** → positioning clear
- **45 design references** → visual direction locked
- **Design tokens** → CSS + Tailwind implementation
- **Landing page** → section-by-section content spec
- **Pricing** → 3 tiers with full copy
- **Form** → fields, validation, API
- **SEO** → 25+ URLs, schema, metadata
- **Performance** → Lighthouse 100 targets
- **Folder structure** → copy-paste ready

**Next action:** Stakeholder approval → begin Step 1 (design tokens) on feature branch.
