import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const html = await readFile("/tmp/lingology.html", "utf8");

const replacements = [
  ['href="/css/', 'href="/lingology/css/'],
  ['src="/css/', 'src="/lingology/css/'],
  ['href="/js/', 'href="/lingology/js/'],
  ["src='/js/", "src='/lingology/js/"],
  ['src="/js/', 'src="/lingology/js/'],
  ["'/js/", "'/lingology/js/"],
  ['href="/img/', 'href="/lingology/img/'],
  ['src="/img/', 'src="/lingology/img/'],
  ['srcset="/img/', 'srcset="/lingology/img/'],
  ['imagesrcset="/img/', 'imagesrcset="/lingology/img/'],
  ['href="/#', 'href="#'],
  ['href="/kontakt"', 'href="#contact"'],
  ['href="/test-', 'href="https://www.lingology.pl/test-'],
  ['href="/metoda"', 'href="https://www.lingology.pl/metoda"'],
  ['href="/materialy"', 'href="https://www.lingology.pl/materialy"'],
  ['href="/faq"', 'href="#faq"'],
  ['href="/blog"', 'href="https://www.lingology.pl/blog"'],
  ['href="/o-mnie"', 'href="https://www.lingology.pl/o-mnie"'],
  ['href="/lingology-learn"', 'href="#lingology-learn"'],
  ['href="/polityka-prywatnosci"', 'href="https://www.lingology.pl/polityka-prywatnosci"'],
  ['href="/regulamin"', 'href="https://www.lingology.pl/regulamin"'],
  ['action="/api/mail"', 'action="https://www.lingology.pl/api/mail"'],
  ['href="/angielski-', 'href="https://www.lingology.pl/angielski-'],
  ['href="/korepetycje-', 'href="https://www.lingology.pl/korepetycje-'],
  ['href="/konwersacje-', 'href="https://www.lingology.pl/konwersacje-'],
  ['href="/blokada-', 'href="https://www.lingology.pl/blokada-'],
];

function extract(start, end) {
  const s = html.indexOf(start);
  if (s === -1) return "";
  const e = html.indexOf(end, s);
  if (e === -1) return html.slice(s);
  return html.slice(s, e + (end.startsWith("<") ? end.length : 0));
}

let body = "";
body += extract('<nav role="navigation"', "</nav>");
body += "\n";
body += extract('<div class="mobile-sticky-cta"', "</div>\n\n<main");
body += "\n";
body += extract('<main id="main">', "</main>");
body += "\n";
body += extract("<footer>", "</footer>");
body += "\n";
body += extract('<div id="cookieBanner"', "</div>\n\n<script");
body += "\n";
body += extract('<div class="modal-overlay" id="leadModal"', '<script type="module" src="/js/nav.js">');

for (const [from, to] of replacements) {
  body = body.split(from).join(to);
}

// Patch deferred module loader paths
body = body.replace(
  "var modules = ['/lingology/js/accordion.js'",
  "var modules = ['/lingology/js/accordion.js'",
);

const scriptsBlock = `
<script src="/lingology/js/cookie-consent.js"></script>
<script>
  (function () {
    function loadAnimations() {
      var s = document.createElement('script');
      s.type = 'module';
      s.src = '/lingology/js/animations.js';
      document.body.appendChild(s);
    }
    if ('requestIdleCallback' in window) requestIdleCallback(loadAnimations);
    else setTimeout(loadAnimations, 200);
  })();
</script>
<script type="module" src="/lingology/js/nav.js"></script>
<script>
  (function () {
    var modules = ['/lingology/js/accordion.js', '/lingology/js/forms.js', '/lingology/js/modal.js', '/lingology/js/carousel.js', '/lingology/js/popups.js', '/lingology/js/poradnik.js', '/lingology/js/popup-coordinator.js'];
    function loadDeferred() {
      modules.forEach(function (src) {
        var s = document.createElement('script');
        s.type = 'module';
        s.src = src;
        document.body.appendChild(s);
      });
    }
    if ('requestIdleCallback' in window) requestIdleCallback(loadDeferred);
    else setTimeout(loadDeferred, 1);
  })();
</script>
`;

body += scriptsBlock;

await writeFile(join(root, "public", "lingology", "content.html"), body);
console.log("Wrote content.html", body.length, "bytes");
