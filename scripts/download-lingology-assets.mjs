import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const base = "https://www.lingology.pl";

const cssFiles = [
  "css/tokens.css",
  "css/base.css",
  "css/critical-home.css",
  "css/layout.css",
  "css/animations.css",
  "css/fonts.css",
];

const jsFiles = [
  "js/theme.js",
  "js/cookie-consent.js",
  "js/nav.js",
  "js/accordion.js",
  "js/forms.js",
  "js/modal.js",
  "js/carousel.js",
  "js/popups.js",
  "js/poradnik.js",
  "js/popup-coordinator.js",
  "js/animations.js",
];

const imageFiles = [
  "img/lingology-icon.png",
  "img/photo-hero.jpg",
  "img/photo-hero-480.webp",
  "img/photo-hero-560.webp",
  "img/photo-hero-840.webp",
  "img/marketing/travel-airport.png",
  "img/marketing/travel-airport.webp",
  "img/marketing/travel-directions-map.png",
  "img/marketing/travel-directions-map.webp",
  "img/app/dzisiejsze-powtorki.png",
  "img/app/dzisiejsze-powtorki.webp",
  "img/podrecznik.png",
  "img/poradnik-lingology-cover.png",
  "favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon-48x48.png",
  "favicon-192x192.png",
  "apple-touch-icon.png",
  "site.webmanifest",
];

async function download(path) {
  const url = `${base}/${path}`;
  const dest = join(root, "public/lingology", path);
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`✓ ${path}`);
}

async function downloadFontsFromCss() {
  const fontsCss = await fetch(`${base}/css/fonts.css`).then((r) => r.text());
  const fontPaths = [...fontsCss.matchAll(/url\((\/fonts\/[^)]+)\)/g)].map((m) => m[1].slice(1));
  const unique = [...new Set(fontPaths)];
  for (const p of unique) await download(p);
  let patched = fontsCss.replace(/url\(\/fonts\//g, "url(/lingology/fonts/");
  await writeFile(join(root, "public/lingology/css/fonts.css"), patched);
  console.log("✓ css/fonts.css (patched paths)");
}

const batchSize = 4;
for (const f of cssFiles.filter((f) => f !== "css/fonts.css")) {
  await download(f);
}
await downloadFontsFromCss();

for (let i = 0; i < jsFiles.length; i += batchSize) {
  await Promise.all(jsFiles.slice(i, i + batchSize).map(download));
}
for (let i = 0; i < imageFiles.length; i += batchSize) {
  await Promise.all(imageFiles.slice(i, i + batchSize).map(download));
}

console.log("Done.");
