# Behaviors — snipeit.io

## Scroll

- **Nav at top (scrollY ≈ 0):** `bg-transparent`, `backdrop-blur-0`, `border-transparent`, `shadow-none`
- **Nav scrolled:** `bg-[#0e1716]/80`, `backdrop-blur-xl`, border-b white/10, shadow `0 8px 30px rgba(0,0,0,0.25)`
- Transition: `duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]`
- Trigger threshold: ~20–50px scroll
- Page uses native `scroll-behavior: smooth` (no Lenis)

## Hover

- Nav links: opacity / color toward accent teal
- Primary CTA pills: slight brightness / scale
- Pricing cards: subtle lift/shadow
- FAQ row: cursor pointer

## Click

### Pricing toggle
- Default: **Miesięczny** active (dark `#293735`), yearly inactive (muted `#8ca4a2`)
- Yearly prices: Basic **44,99**, Pro **89,99** (+ "Oszczędzasz X zł / rok")
- Monthly: Basic **49,99**, Pro **99,99**
- Enterprise unchanged (custom quote)

### FAQ accordion
- Clicking question expands answer panel
- Questions/answers in `faq-content.json`

### Cookie banner
- "Akceptuj wszystkie" / "Odrzuć wszystkie" / "Dostosuj ustawienia" dismiss/hide banner

### Nav anchors
- `#hero` / home, `#produkt`, `#plany`, `#kontakt`

## Responsive

| Breakpoint | Behavior |
|------------|----------|
| Desktop 1440 | Full nav links, side-by-side feature layouts, 3 pricing cards |
| Tablet 768 | Reduced padding; stacks begin |
| Mobile 390 | Burger menu; stacked CTAs; single-column pricing; hero pt 130px |

## Motion

- `animate-union-pulse` on hero corner SVGs
- Nav transition 700ms
- FAQ expand height/opacity ~200–300ms
- Pricing digit/price swap on toggle
