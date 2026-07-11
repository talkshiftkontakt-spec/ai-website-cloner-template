import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = await readFile("/tmp/linear.html", "utf8");

let full = source;

// Keep all scripts for hydration + animations. Only fix relative navigation/assets.
full = full.replace(/href="\//g, 'href="https://linear.app/');
full = full.replace(/href='\/'/g, "href='https://linear.app/'");
full = full.replace(/src="\//g, 'src="https://linear.app/');

// Same-page anchors should stay on the clone origin
full = full.replace(/href="https:\/\/linear\.app\/(#)/g, 'href="/$1');

const outDir = join(root, "public/linear");
await mkdir(outDir, { recursive: true });

await writeFile(join(outDir, "full.html"), full);

const cssUrls = [
  ...new Set(
    [...full.matchAll(/href="(https:\/\/static\.linear\.app\/[^"]+\.css)"/g)].map(
      (m) => m[1],
    ),
  ),
];

const scriptCount = (full.match(/<script/gi) ?? []).length;
const imgCount = (full.match(/<img/gi) ?? []).length;

await writeFile(
  join(outDir, "manifest.json"),
  JSON.stringify(
    {
      cssUrls,
      scriptCount,
      imgCount,
      title: "Linear – The system for product development",
      description:
        "Linear is the system for product development. Plan and build your product with the #1 issue tracker for software teams and agents.",
    },
    null,
    2,
  ),
);

console.log(
  `full.html: ${full.length} bytes, scripts: ${scriptCount}, images: ${imgCount}, css: ${cssUrls.length}`,
);
