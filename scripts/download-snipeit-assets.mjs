import { mkdirSync, writeFileSync, createWriteStream, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public/images/snipeit');
const SEO = join(ROOT, 'public/seo');
const FONTS = join(ROOT, 'public/fonts');

mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'sources'), { recursive: true });
mkdirSync(SEO, { recursive: true });
mkdirSync(FONTS, { recursive: true });

const ASSETS = [
  // brand / hero
  'navbar-logo.png',
  'footer-logo.svg',
  'snipelt-logo.webp',
  'sidebar-interactive-logo.png',
  'panel-logo.svg',
  'union-hero.svg',
  'union-hero-right.svg',
  'union-outline.svg',
  'union-cross.svg',
  'hl-glow.svg',
  'glow-green.svg',
  'glow-green2.svg',
  'lines2.svg',
  'lines-pulse.svg',
  'phone-grid.svg',
  'pricing-pattern.svg',
  'icon-send-filled.svg',
  // sidebar icons
  'diamond-percent.svg',
  'search.svg',
  'squares-subtract.svg',
  'octagon-minus.svg',
  'user-round-check.svg',
  'settings.svg',
  'log-out.svg',
  'avatar.svg',
  'panel-user-avatar.svg',
  // categories
  'smartphone.svg',
  'car-front.svg',
  'laptop-minimal.svg',
  'footprints.svg',
  'shirt.svg',
  'car.svg',
  'house.svg',
  'arrow-see-all.svg',
  // product images
  'iphone13pro.webp',
  'iphone14pro.webp',
  'iphone17pro.webp',
  'iphonexs.webp',
  'phone-app.webp',
  'car1.webp',
  'car2.webp',
  'car3.webp',
  'car4.webp',
  'car5.webp',
  'car6.webp',
  // features
  'bento-a-icon.svg',
  'mouse-pointer.svg',
  'badge-check.svg',
  'action-share.svg',
  'action-plus.svg',
  'action-heart.svg',
  'icon-images.svg',
  // filters
  'filter-icon-kategoria.svg',
  'filter-icon-podkategoria.svg',
  'filter-icon-lokalizacja.svg',
  'filter-icon-cena.svg',
  'filter-icon-biala.svg',
  'filter-icon-portale.svg',
  'filter-icon-czarna.svg',
  // social
  'social-instagram.svg',
  'social-facebook.svg',
  // sources
  'sources/allegro.svg',
  'sources/allegro-lokalnie.svg',
  'sources/olx.svg',
  'sources/otomoto.svg',
  'sources/otodom.svg',
  'sources/vinted.svg',
];

const EXTRA = [
  { url: 'https://snipeit.io/fonts/Satoshi-Variable.woff2', dest: join(FONTS, 'Satoshi-Variable.woff2') },
  { url: 'https://snipeit.io/_next/static/media/Inter_Variable-s.p.0_x4g3_ma28r3.woff2', dest: join(FONTS, 'Inter-Variable.woff2') },
  { url: 'https://snipeit.io/_next/static/media/RobotoFlex_Variable-s.p.0d3fex-vxtxd~.woff2', dest: join(FONTS, 'RobotoFlex-Variable.woff2') },
  { url: 'https://snipeit.io/icon.svg?icon.054ueh~gfq00n.svg', dest: join(SEO, 'icon.svg') },
  { url: 'https://snipeit.pl/ogimg2.png', dest: join(SEO, 'ogimg2.png') },
  { url: 'https://snipeit.io/favicon.ico', dest: join(SEO, 'favicon.ico') },
];

async function download(url, dest) {
  if (existsSync(dest)) {
    console.log('skip', dest);
    return true;
  }
  mkdirSync(dirname(dest), { recursive: true });
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SnipeIT-Clone/1.0)' },
  });
  if (!res.ok) {
    console.warn('FAIL', res.status, url);
    return false;
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log('ok', dest);
  return true;
}

async function batch(items, size, fn) {
  const results = [];
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    results.push(...(await Promise.all(chunk.map(fn))));
  }
  return results;
}

async function main() {
  const map = {};
  await batch(ASSETS, 6, async (path) => {
    const url = `https://snipeit.io/assets/${path}`;
    const dest = join(OUT, path);
    const ok = await download(url, dest);
    map[path] = ok ? `/images/snipeit/${path}` : null;
  });

  await batch(EXTRA, 4, async ({ url, dest }) => {
    await download(url, dest);
  });

  writeFileSync(
    join(ROOT, 'docs/research/snipeit.io/asset-map.json'),
    JSON.stringify(map, null, 2)
  );
  console.log('Done. Assets:', Object.values(map).filter(Boolean).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
