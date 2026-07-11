import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "linear", "css");

const files = [
  { name: "index.css", url: "https://static.linear.app/web/_next/static/css/index.CcvuW808.css" },
  { name: "utils.css", url: "https://static.linear.app/web/_next/static/css/utils.5l1Pf81z.css" },
  { name: "button.css", url: "https://static.linear.app/web/_next/static/css/Button.dcAi4KbO.css" },
  { name: "header.css", url: "https://static.linear.app/web/_next/static/css/Header.DrX8EJz9.css" },
  { name: "hero.css", url: "https://static.linear.app/web/_next/static/css/Hero.D42gc8OB.css" },
  { name: "page-section.css", url: "https://static.linear.app/web/_next/static/css/PageSection.BVMTzmaW.css" },
  { name: "pillar.css", url: "https://static.linear.app/web/_next/static/css/Pillar.DaIvMtkE.css" },
  { name: "grain.css", url: "https://static.linear.app/web/_next/static/css/Grain.D_EBlr94.css" },
];

await mkdir(outDir, { recursive: true });

for (const file of files) {
  const res = await fetch(file.url);
  if (!res.ok) throw new Error(`Failed ${file.url}: ${res.status}`);
  const css = await res.text();
  await writeFile(join(outDir, file.name), css);
  console.log(`${file.name}: ${css.length} bytes`);
}

await writeFile(
  join(outDir, "manifest.json"),
  JSON.stringify(
    files.map((f) => ({ file: f.name, url: f.url })),
    null,
    2,
  ),
);

console.log("Linear CSS downloaded to public/linear/css/");
