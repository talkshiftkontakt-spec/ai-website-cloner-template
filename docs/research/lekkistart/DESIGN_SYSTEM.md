# LekkiStart.pl — Design System

**Phase 10 deliverable** | Production-ready tokens and component specifications

---

## Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight inline gaps |
| `--space-2` | 8px | Icon gaps |
| `--space-4` | 16px | Card padding mobile |
| `--space-6` | 24px | Stack gaps |
| `--space-8` | 32px | Component gaps |
| `--space-12` | 48px | Section padding mobile |
| `--space-16` | 64px | Section padding tablet |
| `--space-24` | 96px | Section padding desktop |
| `--space-32` | 128px | Hero padding |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Inputs |
| `--radius-md` | 8px | Buttons |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Pricing cards |

No radius > 16px except pills.

## Grid

| Breakpoint | Columns | Gutter | Max width |
|------------|---------|--------|-----------|
| sm 640px | 4 | 16px | — |
| md 768px | 8 | 24px | — |
| lg 1024px | 12 | 24px | 1280px |
| xl 1280px | 12 | 32px | 1280px |

Reading column: 720px max for prose.

## Buttons

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | accent | canvas | none |
| Secondary | transparent | text-primary | 1px border-strong |
| Ghost | transparent | text-secondary | none |

Sizes: lg 52px, md 44px, sm 36px. No pill shape. No gradients.

## Pricing Cards

- Background: canvas-raised
- Border: 1px border (featured: accent border)
- Padding: 32–40px
- Price: mono tabular-nums
- 3-column desktop, stack mobile

## Forms

- Input height: 48px
- Background: canvas-sunken
- Focus: 2px accent ring
- Labels: 12px uppercase, always visible

## Navigation

- Height: 64px mobile / 72px desktop
- Sticky, backdrop-blur
- Primary CTA always visible
- Mobile: full-screen overlay menu

## Footer

- Background: canvas-sunken
- 4-column link grid desktop
- 96px top padding

## Icons

Lucide React, 1.5px stroke, inherit color, wayfinding only.

## Accessibility

- WCAG AA contrast
- Focus rings on all interactives
- Skip link first
- lang="pl"
- prefers-reduced-motion support
- Stigma-free copy in forms and alt text

## Animation Tokens

```css
--ease-out-quart: cubic-bezier(0.22, 1, 0.36, 1);
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 800ms;
```

Full token CSS in IMPLEMENTATION_BLUEPRINT.md.
