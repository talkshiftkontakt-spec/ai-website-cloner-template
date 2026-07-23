# Design reference — tutoreo.pl

Pakiet materiałów referencyjnych do layoutu (desktop + mobile).

| Plik | Zawartość |
|------|-----------|
| **[DESIGN.md](./DESIGN.md)** | Główny dokument: reguły CSS, ułożenie obrazów, interakcje, galeria screenshotów |
| **[LAYOUT_RULES.css](./LAYOUT_RULES.css)** | Konkretne reguły CSS (desktop + `@media max-width: 1000px`) |
| **[layout-css.json](./layout-css.json)** | Surowy dump `getComputedStyle` (desktop / tablet / mobile) |
| **[screenshots/](./screenshots/)** | 51 screenshotów sekcji (oryginał + clone) |

Odświeżenie:
```bash
node scripts/build-design-reference.mjs
```
