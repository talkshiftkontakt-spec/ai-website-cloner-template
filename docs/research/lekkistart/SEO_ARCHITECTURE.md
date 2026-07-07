# LekkiStart.pl — SEO Architecture

**Phase 12 deliverable** | YMYL-aware structure for Polish + international discoverability

---

## Strategic Principles

1. **Service-line architecture** — separate authority page per offering, not one "weight loss" page
2. **YMYL compliance** — expertise signals in structure (schema, author bios), not just copy
3. **Polish-first URLs** — diacritics avoided in slugs; Polish content, ASCII paths
4. **Prune over publish** — quality clusters beat 373 mediocre blog posts
5. **AI search ready** — standalone pages answering single conversational queries

---

## URL Structure

```
lekkistart.pl/
├── /                          # Landing page (primary conversion)
├── /oferta/
│   ├── /oferta/starter
│   ├── /oferta/standard
│   └── /oferta/premium
├── /uslugi/
│   ├── /uslugi/coaching-indywidualny
│   ├── /uslugi/plan-treningowy
│   ├── /uslugi/plan-zywieniowy
│   ├── /uslugi/wsparcie-i-odpowiedzialnosc
│   └── /uslugi/edukacja-i-nawyki
├── /dla-kogo/
│   ├── /dla-kogo/nadwaga
│   ├── /dla-kogo/otylosc
│   └── /dla-kogo/emocjonalne-jedzenie
├── /historie/                 # Success stories index
│   └── /historie/[slug]       # Individual story pages
├── /wiedza/                   # Knowledge base index
│   ├── /wiedza/otylosc/
│   ├── /wiedza/odchudzanie/
│   ├── /wiedza/odzywianie/
│   ├── /wiedza/trening/
│   └── /wiedza/zdrowe-nawyki/
├── /o-nas
├── /trener                    # Coach bio
├── /cennik                    # Dedicated pricing (duplicate for SEO)
├── /faq
├── /kontakt
├── /aplikacja                 # Application form standalone
├── /polityka-prywatnosci
├── /regulamin
└── /sitemap.xml
```

---

## Landing Pages (Priority)

| Page | Primary keyword | Secondary keywords |
|------|----------------|-------------------|
| `/` | coaching odchudzanie online | premium coaching otyłość |
| `/oferta/standard` | program odchudzania online | coaching z trenerem cena |
| `/dla-kogo/otylosc` | coaching dla osób z otyłością | jak schudnąć przy otyłości |
| `/uslugi/coaching-indywidualny` | indywidualny coaching odchudzanie | trener online otyłość |
| `/cennik` | ile kosztuje coaching odchudzanie | cennik trener personalny online |
| `/aplikacja` | zapisz się na coaching | aplikacja coaching odchudzanie |

---

## Knowledge Base Clusters

### Cluster 1: Otyłość (Obesity)

| Slug | Title | Intent |
|------|-------|--------|
| `/wiedza/otylosc/co-to-jest-otylosc` | Czym jest otyłość? Definicja i stopnie | Informational |
| `/wiedza/otylosc/przyczyny-otylosci` | Przyczyny otyłości — co naprawdę ma znaczenie | Informational |
| `/wiedza/otylosc/otylosc-a-zdrowie` | Otyłość a zdrowie: ryzyka i korzyści redukcji | Informational |
| `/wiedza/otylosc/leczenie-otylosci` | Leczenie otyłości: metody i podejścia | Commercial |
| `/wiedza/otylosc/bmi-jak-obliczyc` | BMI — jak obliczyć i co oznacza | Informational |

### Cluster 2: Odchudzanie (Weight Loss)

| Slug | Title | Intent |
|------|-------|--------|
| `/wiedza/odchudzanie/jak-zaczac` | Jak zacząć odchudzanie — praktyczny przewodnik | Informational |
| `/wiedza/odchudzanie/dlaczego-diety-nie-dzialaja` | Dlaczego diety nie działają długoterminowo | Informational |
| `/wiedza/odchudzanie/ile-schudnac-miesiecznie` | Ile można schudnąć miesięcznie — realne tempo | Informational |
| `/wiedza/odchudzanie/coaching-vs-dieta` | Coaching odchudzania vs dieta — co wybrać? | Commercial |
| `/wiedza/odchudzanie/utrzymanie-wagi` | Jak utrzymać wagę po odchudzaniu | Informational |

### Cluster 3: Odżywianie (Nutrition)

| Slug | Title |
|------|-------|
| `/wiedza/odzywianie/zdrowe-odzywianie-bez-restrykcji` | Zdrowe odżywianie bez restrykcji |
| `/wiedza/odzywianie/bialko-w-redukcji` | Rola białka w redukcji masy ciała |
| `/wiedza/odzywianie/emocjonalne-jedzenie` | Emocjonalne jedzenie — jak sobie z tym radzić |
| `/wiedza/odzywianie/plan-zywieniowy-online` | Plan żywieniowy online — na co zwrócić uwagę |

### Cluster 4: Trening (Training)

| Slug | Title |
|------|-------|
| `/wiedza/trening/trening-dla-osob-z-nadwaga` | Trening dla osób z nadwagą — od czego zacząć |
| `/wiedza/trening/trening-w-domu` | Trening w domu — skuteczny plan bez siłowni |
| `/wiedza/trening/spacer-jako-trening` | Spacer jako trening — niedoceniana forma aktywności |
| `/wiedza/trening/trening-a-bol-stawow` | Trening a ból stawów przy nadwadze |

### Cluster 5: Zdrowe Nawyki (Healthy Habits)

| Slug | Title |
|------|-------|
| `/wiedza/zdrowe-nawyki/jak-budowac-nawyki` | Jak budować trwałe nawyki żywieniowe |
| `/wiedza/zdrowe-nawyki/sen-a-otylosc` | Sen a otyłość — co mówi nauka |
| `/wiedza/zdrowe-nawyki/stres-i-jedzenie` | Stres i jedzenie — jak przerwać błędne koło |
| `/wiedza/zdrowe-nawyki/odpowiedzialnosc-w-coachingu` | Rola accountability w coachingu zdrowotnym |

**Total launch knowledge base:** 25 articles minimum. Add 2/month post-launch.

---

## AI-Optimized Standalone Pages

Single-query pages for conversational search:

| URL | Query target |
|-----|-------------|
| `/wiedza/coaching-odchudzanie-online-cena` | ile kosztuje coaching odchudzanie online |
| `/wiedza/trener-personalny-dla-otylosci` | trener personalny dla osób z otyłością |
| `/wiedza/coaching-behawioralny-odchudzanie` | coaching behawioralny odchudzanie |
| `/wiedza/odchudzanie-bez-silowni` | jak schudnąć bez siłowni |
| `/wiedza/coaching-vs-aplikacja` | coaching vs aplikacja do odchudzania |

---

## Internal Linking Strategy

```
Landing (/)
  → /oferta/* (pricing tiers)
  → /dla-kogo/otylosc
  → /uslugi/*
  → /wiedza/* (contextual links in sections)
  → /aplikacja

Knowledge articles
  → Parent cluster hub (/wiedza/otylosc/)
  → Related articles (2–3 per post)
  → Relevant service page
  → /aplikacja (CTA in conclusion)

Service pages
  → /oferta/* (tier recommendation)
  → /wiedza/* (supporting articles)
  → /trener
```

**Rule:** Every knowledge article links to exactly 1 service page + 1 conversion page.

---

## Schema Markup (JSON-LD)

### Site-wide (`layout.tsx`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lekkistart.pl/#organization",
      "name": "LekkiStart",
      "url": "https://lekkistart.pl",
      "logo": "https://lekkistart.pl/seo/logo.png",
      "description": "Premium coaching online dla osób z nadwagą i otyłością.",
      "areaServed": "PL",
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "@id": "https://lekkistart.pl/#website",
      "url": "https://lekkistart.pl",
      "name": "LekkiStart",
      "publisher": { "@id": "https://lekkistart.pl/#organization" }
    }
  ]
}
```

### Landing page

```json
{
  "@type": "ProfessionalService",
  "name": "LekkiStart — Coaching Odchudzania",
  "description": "Indywidualny coaching treningowy i żywieniowy dla osób z nadwagą i otyłością.",
  "provider": { "@id": "https://lekkistart.pl/#organization" },
  "areaServed": { "@type": "Country", "name": "Poland" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Pakiety coachingowe",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Starter",
        "price": "399",
        "priceCurrency": "PLN",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "billingDuration": "P1M"
        }
      }
    ]
  }
}
```

### Coach page (`/trener`)

```json
{
  "@type": "Person",
  "name": "[Coach Name]",
  "jobTitle": "Coach zdrowia i odchudzania",
  "worksFor": { "@id": "https://lekkistart.pl/#organization" },
  "knowsAbout": ["weight management", "obesity coaching", "nutrition", "behavior change"]
}
```

### FAQ page

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Dla kogo jest LekkiStart?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

### Knowledge articles

```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "[Coach Name]" },
  "publisher": { "@id": "https://lekkistart.pl/#organization" },
  "datePublished": "2026-07-01",
  "dateModified": "2026-07-01",
  "about": { "@type": "MedicalCondition", "name": "Obesity" }
}
```

---

## Metadata Templates

### Landing

```typescript
export const metadata: Metadata = {
  title: "LekkiStart — Premium Coaching Odchudzania dla Osób z Nadwagą i Otyłością",
  description: "Indywidualny trening, żywienie i cotygodniowe wsparcie. Od 399 zł/mies. Złóż aplikację i zacznij realną zmianę.",
  openGraph: {
    title: "LekkiStart — Coaching, który zostaje",
    description: "...",
    images: [{ url: "/seo/og-landing.jpg", width: 1200, height: 630 }],
    locale: "pl_PL",
    type: "website",
  },
  alternates: { canonical: "https://lekkistart.pl" },
  robots: { index: true, follow: true },
};
```

### Knowledge article

```typescript
{
  title: "{Article Title} | LekkiStart Wiedza",
  description: "{150 chars, answer-first}",
  alternates: { canonical: "https://lekkistart.pl/wiedza/{slug}" },
}
```

---

## Technical SEO

| Item | Implementation |
|------|----------------|
| Sitemap | `app/sitemap.ts` — dynamic, all routes |
| Robots | `app/robots.ts` — allow all, disallow /api/ |
| Canonical | Every page self-referencing canonical |
| hreflang | `pl` only at launch; `en` future |
| Structured data | JSON-LD per page type |
| Image alt | Descriptive Polish, keyword-natural |
| Core content | SSR/SSG — no client-only content for crawlers |

---

## Content Quality (YMYL)

- Author byline on every knowledge article with credentials
- "Ostatnia aktualizacja" date visible
- Medical claims sourced (PTLO, WHO, peer-reviewed)
- Disclaimer: "Treść ma charakter edukacyjny i nie zastępuje porady lekarskiej"
- No before/after claims with specific kg in SEO titles

---

## Launch SEO Checklist

- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Core landing indexed
- [ ] 5 knowledge articles published at launch
- [ ] Schema validated (Google Rich Results Test)
- [ ] Lighthouse SEO score 100
- [ ] Open Graph images per major page type
- [ ] Favicon + web manifest in `/public/seo/`
