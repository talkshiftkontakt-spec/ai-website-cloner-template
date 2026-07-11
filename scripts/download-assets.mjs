import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const assets = [
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/logo/lekcjerazem-logo-animated.svg",
    dest: "public/images/lekcjerazem/logo.svg",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/favicon/favicon-96x96.png",
    dest: "public/seo/favicon-96x96.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/favicon/favicon.svg",
    dest: "public/seo/favicon.svg",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/favicon/favicon.ico",
    dest: "public/seo/favicon.ico",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/favicon/apple-touch-icon.png",
    dest: "public/seo/apple-touch-icon.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/ico/favicon/site.webmanifest",
    dest: "public/seo/site.webmanifest",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/01.png",
    dest: "public/images/lekcjerazem/pulpit.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/40.png",
    dest: "public/images/lekcjerazem/tablica.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/14.png",
    dest: "public/images/lekcjerazem/grafik.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/09.png",
    dest: "public/images/lekcjerazem/rozliczenia.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/uczen/03.png",
    dest: "public/images/lekcjerazem/panel-ucznia.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/instrukcje/img/nauczyciel/25.png",
    dest: "public/images/lekcjerazem/baza-wzorow.png",
  },
  {
    url: "https://lekcjerazem.pl/moduly/strona/style.css",
    dest: "src/styles/lekcjerazem.css",
  },
];

async function downloadOne({ url, dest }) {
  const outPath = join(root, dest);
  await mkdir(dirname(outPath), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buf);
  console.log(`✓ ${dest}`);
}

const batchSize = 4;
for (let i = 0; i < assets.length; i += batchSize) {
  await Promise.all(assets.slice(i, i + batchSize).map(downloadOne));
}

console.log("Done.");
