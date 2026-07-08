# LekkiStart.pl — Landing Page Specification

**Phase 7–9 deliverable**

---

## Above-the-Fold (No Scroll Required)

The first viewport (100vh on desktop, ~90vh mobile) MUST contain:

```
┌────────────────────────────────────────────────────────────────┐
│ [Logo]     Oferta  Jak działa  Cennik  FAQ          [Zacznij]  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  H1: Odzyskaj lekkość.                                         │
│      Coaching, który zostaje z Tobą na lata.                   │
│                                                                │
│  Sub: Indywidualny trening, żywienie i cotygodniowe wsparcie    │
│       dla osób z nadwagą i otyłością.                          │
│                                                                │
│  [Złóż aplikację]  [Zobacz cennik]                             │
│                                                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Starter     │ │ Standard ★  │ │ Premium     │               │
│  │ 399 zł/mies │ │ 699 zł/mies │ │ 1 199 zł/mies│              │
│  │ [Wybierz]   │ │ [Wybierz]   │ │ [Wybierz]   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Above-Fold Requirements Checklist

- [ ] **Who it is for** — subhead explicitly names nadwaga/otyłość
- [ ] **How much it costs** — all 3 prices visible without scroll
- [ ] **How to start** — primary CTA "Złóż aplikację" + secondary "Zobacz cennik"
- [ ] Navigation with anchor to pricing
- [ ] No carousel, no video autoplay, no popup

### Hero Layout Specs

| Element | Desktop | Mobile |
|---------|---------|--------|
| H1 max-width | 800px | 100% |
| Subhead max-width | 560px | 100% |
| CTA gap | 16px | 12px (stack on <400px) |
| Pricing cards | 3-col grid below CTAs | Horizontal scroll or stack |
| Background | Full-bleed photo + dark overlay 60% | Same, tighter crop |

---

## Full Page Structure (Scroll Order)

| # | Section ID | Purpose | Theme |
|---|------------|---------|-------|
| 1 | `#hero` | Above-fold: headline + pricing | dark |
| 2 | `#transformacje` | Transformation gallery (lifestyle, not B/A) | dark |
| 3 | `#historie` | Real client stories | dark |
| 4 | `#opinie` | Testimonials | raised dark |
| 5 | `#jak-dziala` | How coaching works (4–5 steps) | dark |
| 6 | `#trening` | Training plan approach | dark |
| 7 | `#zywienie` | Nutrition plan approach | dark |
| 8 | `#wsparcie` | Weekly support + accountability | dark |
| 9 | `#postepy` | Progress tracking methodology | dark |
| 10 | `#faq` | Frequently asked questions | light |
| 11 | `#trener` | About the coach | dark |
| 12 | `#cennik` | Pricing (full detail, repeat) | light |
| 13 | `#gwarancja` | Guarantees | dark |
| 14 | `#kontakt` | Contact info | dark |
| 15 | `#aplikacja` | Application form | light |
| 16 | `footer` | Footer | sunken |

---

## Section Content Specifications

### 2. Transformation Gallery (`#transformacje`)

**NOT before/after.** Lifestyle editorial grid.

- 6–8 photographs: walking, cooking, video call with coach, grocery shopping
- Optional caption: first name + months in program + qualitative outcome ("Więcej energii", not kg)
- Layout: Masonry or 2×3 grid, asymmetric gaps
- No kg numbers in this section (stigma risk)

### 3. Client Stories (`#historie`)

3 long-form narratives (300–500 words each):

| Story | Archetype | Key message |
|-------|-----------|-------------|
| Story A | Woman 40+, BMI 35, sedentary job | Habits over restriction |
| Story B | Man 50+, BMI 38, tried diets before | Accountability changed everything |
| Story C | Person 30+, BMI 32, emotional eating | Psychology + structure |

Format: Pull quote + narrative text. Optional small portrait (dignified, not progress).

### 4. Testimonials (`#opinie`)

6–8 short quotes:

```
"Po raz pierwszy ktoś nie mówił mi, żebym jadła mniej. 
Pomogło mi zrozumieć, dlaczego podjadałam."
— Anna, 8 miesięcy współpracy
```

- No star ratings grid (feels mass-market)
- No photos required
- Include duration, not kg loss

### 5. How Coaching Works (`#jak-dziala`)

| Step | Title | Description |
|------|-------|-------------|
| 1 | Aplikacja | Wypełniasz krótki formularz — poznajemy Twój cel i sytuację |
| 2 | Konsultacja | 45-min rozmowa wideo z trenerem — ustalamy plan |
| 3 | Plan | Indywidualny trening + żywienie dopasowane do Ciebie |
| 4 | Cotygodniowe check-iny | Analiza postępów, korekty, wsparcie |
| 5 | Edukacja | Materiały o nawykach, śnie, strese i relacji z jedzeniem |

Layout: Numbered vertical timeline (desktop) or stacked cards (mobile).

### 6–8. Training / Nutrition / Support

Each section: 1 headline + 2 paragraphs + 1 lifestyle photo.

**Training focus:**
- Home or gym — client's choice
- Low-impact start for obese clients
- Progressive overload when ready
- No "beast mode" language

**Nutrition focus:**
- Flexible, not restrictive
- Protein adequacy for muscle preservation
- Simple meals, real food
- No calorie obsession in marketing copy

**Support focus:**
- Weekly video or voice check-in (tier-dependent)
- Async messaging between sessions
- Accountability without guilt

### 9. Progress Tracking (`#postepy`)

- Weight (optional, client-controlled)
- Measurements
- Energy/sleep/mood scales
- Habit completion
- Photo journal (private, never public)

### 10. FAQ (`#faq`)

Minimum 12 questions:

1. Dla kogo jest LekkiStart?
2. Czym różnicie się od diety pudełkowej?
3. Czy muszę chodzić na siłownię?
4. Ile kosztuje coaching?
5. Jak długo trwa współpraca?
6. Czy mogę schudnąć bez liczenia kalorii?
7. Czy pracujecie z osobami z otyłością III stopnia?
8. Jak wygląda pierwsza konsultacja?
9. Czy oferujecie wsparcie przy lekach na otyłość (GLP-1)?
10. Jak często kontaktuję się z trenerem?
11. Czy mogę zrezygnować w każdej chwili?
12. Jakie są realne efekty i w jakim czasie?

Accordion UI, single column, hairline dividers.

### 11. About Coach (`#trener`)

- Professional portrait (warm lighting, not gym)
- Credentials: certifications, education, specializations
- Personal philosophy (2–3 paragraphs)
- Why obesity coaching specifically
- Link to full bio page (future)

### 12. Pricing Repeat (`#cennik`)

Full pricing cards with complete detail (see below).

### 13. Guarantees (`#gwarancja`)

- 14-dniowa gwarancja satysfakcji (first consultation + plan delivery)
- Month-to-month after minimum commitment
- No hidden fees
- Cancel policy clearly stated

---

## Pricing Specification

### Starter — 399 PLN/miesiąc

| Field | Content |
|-------|---------|
| **Dla kogo** | Osoby z nadwagą (BMI 27–32), które chcą zacząć od podstaw |
| **Zawiera** | Plan treningowy (dom/siłownia), wytyczne żywieniowe, 2× check-in/miesiąc (wideo lub wiadomość), dostęp do materiałów edukacyjnych |
| **Zobowiązanie** | Minimum 3 miesiące |
| **CTA** | Wybierz Starter |

### Standard — 699 PLN/miesiąc (Najpopularniejszy)

| Field | Content |
|-------|---------|
| **Dla kogo** | Osoby z otyłością I–II stopnia (BMI 32–40), gotowe na pełne zaangażowanie |
| **Zawiera** | Indywidualny plan treningowy + jadłospis, cotygodniowy check-in wideo (30 min), codzienny kontakt async, korekty planu co 2 tygodnie, moduł nawyków |
| **Zobowiązanie** | Minimum 3 miesiące |
| **CTA** | Wybierz Standard |

### Premium — 1 199 PLN/miesiąc

| Field | Content |
|-------|---------|
| **Dla kogo** | Osoby z otyłością znaczną (BMI 40+), z chorobami współistniejącymi, potrzebujące intensywnego wsparcia |
| **Zawiera** | Wszystko ze Standard + 2× check-in wideo/tydzień, priorytetowa odpowiedź (<4h), rozszerzona edukacja (sen, stres, emocje), kwartalna analiza postępów, max 15 klientów w programie |
| **Zobowiązanie** | Minimum 6 miesięcy |
| **CTA** | Wybierz Premium |

### Pricing Display Rules

- PLN with space thousands separator: `1 199 zł`
- "/miesiąc" always visible
- Minimum commitment stated on card
- No "od" pricing — exact numbers
- Featured badge on Standard only
- Clicking CTA scrolls to `#aplikacja` with tier pre-selected

---

## Application Form (`#aplikacja`)

### Design

- Light section (`data-theme="light"`) for contrast and form clarity
- Single column, max-width 560px, centered
- Progress: none (single page, not multi-step wizard)
- Submit: "Wyślij aplikację" primary button

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Imię | text | yes | |
| Email | email | yes | |
| Telefon | tel | yes | Polish format |
| Wybrany pakiet | select | yes | Starter / Standard / Premium (pre-filled from pricing CTA) |
| Cel | textarea | yes | "Opisz swój główny cel" — 3 rows |
| Aktualna waga (kg) | number | yes | min 40, max 300 |
| Waga docelowa (kg) | number | yes | |
| Wiek | number | yes | min 18, max 80 |
| Doświadczenie treningowe | select | yes | Brak / Początkujący / Średniozaawansowany / Zaawansowany |
| Największa trudność | textarea | yes | "Co najbardziej utrudnia Ci zmianę?" — 3 rows |
| Preferowany kontakt | radio | yes | Email / Telefon / WhatsApp |
| Zgoda RODO | checkbox | yes | Link to polityka prywatności |
| Zgoda marketingowa | checkbox | no | Optional |

**Deliberately excluded** (reduce friction):
- Height/BMI (calculated server-side if needed)
- Photo upload (requested after acceptance)
- Payment (human follow-up first)
- Medical history (consultation phase)

### Post-Submit Flow

1. Inline success message: "Dziękujemy. Odezwiemy się w ciągu 24 godzin."
2. Email confirmation to applicant
3. Notification to coach (email + optional Slack/webhook)
4. No redirect to payment

### Validation

- Client-side: Zod schema
- Server-side: Route handler validation
- Polish error messages, stigma-free

---

## Mobile UX Notes

- Pricing cards: horizontal scroll snap on mobile (3 cards peek)
- Sticky bottom CTA bar on mobile after scroll past hero: "Złóż aplikację"
- Form inputs: 16px font minimum (prevent iOS zoom)
- Touch targets: 44px minimum

---

## Conversion Metrics to Track

| Event | Trigger |
|-------|---------|
| `view_hero` | Page load |
| `click_cta_primary` | "Złóż aplikację" |
| `click_pricing_tier` | Pricing card CTA |
| `scroll_pricing` | #cennik in viewport |
| `form_start` | First field focus |
| `form_submit` | Successful submission |
| `form_error` | Validation failure |

Implement via Vercel Analytics custom events or Plausible.
