import { readFileSync, writeFileSync, mkdirSync, createWriteStream } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const extraction = JSON.parse(
  readFileSync(join(ROOT, 'docs/research/gabinetpomorska.pl/extraction.json'), 'utf8')
);

const imagesDir = join(ROOT, 'public/images/gabinetpomorska');
mkdirSync(imagesDir, { recursive: true });

const urls = [...new Set(
  extraction.images
    .map((img) => img.src)
    .filter((src) => src && !src.includes('cookie-law-info') && !src.includes('revisit.svg') && !src.includes('close.svg'))
)];

async function download(url) {
  const name = basename(new URL(url).pathname);
  const dest = join(imagesDir, name);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    return `/images/gabinetpomorska/${name}`;
  } catch (e) {
    console.warn('Failed:', url, e.message);
    return null;
  }
}

const results = {};
for (let i = 0; i < urls.length; i += 4) {
  const batch = urls.slice(i, i + 4);
  const paths = await Promise.all(batch.map(download));
  batch.forEach((url, j) => {
    if (paths[j]) results[url] = paths[j];
  });
}

writeFileSync(join(ROOT, 'docs/research/gabinetpomorska.pl/asset-map.json'), JSON.stringify(results, null, 2));
console.log('Downloaded', Object.keys(results).length, 'assets');
