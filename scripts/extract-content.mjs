import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = await readFile("/tmp/lekcjerazem.html", "utf8");

const replacements = [
  ["https://lekcjerazem.pl/moduly/strona/ico/logo/lekcjerazem-logo-animated.svg", "/images/lekcjerazem/logo.svg"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/01.png", "/images/lekcjerazem/pulpit.png"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/40.png", "/images/lekcjerazem/tablica.png"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/14.png", "/images/lekcjerazem/grafik.png"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/09.png", "/images/lekcjerazem/rozliczenia.png"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/uczen/03.png", "/images/lekcjerazem/panel-ucznia.png"],
  ["https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/25.png", "/images/lekcjerazem/baza-wzorow.png"],
  ['href="https://lekcjerazem.pl/"', 'href="/"'],
  ['href="polityka-cookies.php"', 'href="https://lekcjerazem.pl/polityka-cookies"'],
  ['href="polityka-prywatnosci.php"', 'href="https://lekcjerazem.pl/polityka-prywatnosci"'],
];

function extract(start, end) {
  const s = html.indexOf(start);
  const e = html.indexOf(end, s);
  return html.slice(s, e + (end.startsWith("<") ? end.length : 0));
}

let body = "";
body += extract('<nav id="main-nav">', "</nav>");
body += "\n";
body += extract('<div class="nav-mobile"', "</div>\n<main");
body += "\n";
body += extract("<main id=\"tresc-glowna\">", "</main>");
body += "\n";
body += extract('<section class="section s-alt" id="funkcje-platformy-linki">', "</section>");
body += "\n";
body += extract('<footer class="site-footer">', "</footer>");
body += "\n";
body += extract('<div class="cookie-banner"', '</div>\n\t\t\t\t\t\t</div>');

for (const [from, to] of replacements) {
  body = body.split(from).join(to);
}

await writeFile(join(__dirname, "..", "public", "lekcjerazem", "content.html"), body);
console.log("Wrote content.html", body.length, "bytes");
