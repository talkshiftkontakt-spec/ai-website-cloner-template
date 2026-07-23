# BEHAVIORS — tutoreo.pl

## Navbar scroll
- **Trigger:** scrollY > ~0–50px (any scroll past top)
- **State A (top, over purple):** transparent bg, white logo (`Logo_Nav_White.webp`), white nav links, white underline on active, white "Zaloguj" button (dark text)
- **State B (`.LightNavbar`):** white bg + `PopOffShadow`, purple logo (`Logo_Nav.webp`), purple links/underline, purple "Zaloguj" (white text)
- **Transition:** `background-color 0.2s ease-in-out`

## Benefits tabs
- **Model:** click-driven
- Tabs: "Dla korepetytora" | "Dla ucznia"
- Active tab: black text; inactive: `#B3B3B3`
- Two `.Benefits` panels; only `.Active` visible with card shadows

## FAQ accordion
- **Model:** click-driven, single-open
- Active question: taller, answer visible (`max-height` transition 0.2s), arrow rotated 180°, slight translateY(2px), inset shadow
- Closed: answer max-height 0 / opacity 0, arrow default

## Soft / Standard buttons
- Active press: `filter: brightness(0.8); box-shadow: none; transform: translateY(2px);` with 0.2s transition

## Hero video
- `#CTAImageDiv` is `position: sticky; top: 128px` with negative top margin −200px and bottom margin 300px — video sticks while scrolling into HowItWorks

## Cookie banner
- Shown until Accept All / Only Necessary
- Persist choice in localStorage for clone demo

## Mobile menu
- `#NavbarToggle` opens `#MobileNavbar` overlay with links + login
