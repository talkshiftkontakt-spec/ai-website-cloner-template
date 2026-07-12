# Linear.app — Design Tokens

Extracted from SSR HTML (`data-theme="dark"` default)

## Colors (dark theme)

| Token | Usage |
|-------|-------|
| Background | Near-black `#08090a` range |
| Foreground | Light gray text |
| Accent | Purple/violet brand gradient |
| Muted | Secondary text |

## Typography

- **Sans:** Inter (via Linear's CSS modules)
- **Display:** Custom stacked hero typography with tight tracking
- **Mono:** For code diffs and issue IDs

## Layout

- Max content width ~1200px
- Full-bleed hero with product UI illustration
- Section pillars: Intake → Plan → Build → Diffs → Monitor

## Assets

- CSS/JS served from `static.linear.app` CDN (68 CSS modules)
- Images from `linear.app/cdn-cgi/imagedelivery` and `webassets.linear.app`
- 261KB inline critical CSS in page
