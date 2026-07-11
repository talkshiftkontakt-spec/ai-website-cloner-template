import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const source = await readFile("/tmp/linear.html", "utf8");

const headMatch = source.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!headMatch || !bodyMatch) throw new Error("Could not parse HTML");

const head = headMatch[1];
let body = bodyMatch[1];

const cssUrls = [
  ...new Set(
    [...head.matchAll(/href="(https:\/\/static\.linear\.app\/[^"]+\.css)"/g)].map(
      (m) => m[1],
    ),
  ),
];

const inlineStyleMatch = head.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
const inlineStyle = inlineStyleMatch?.[1] ?? "";

// Collect external module scripts before stripping inline scripts
const scriptUrls = [
  ...new Set(
    [...body.matchAll(/<script[^>]+src="(https:\/\/static\.linear\.app[^"]+)"[^>]*>/g)].map(
      (m) => m[1],
    ),
  ),
];

// Remove inline scripts (hydration payloads); external src scripts removed separately for React injection
body = body.replace(
  /<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi,
  "",
);
body = body.replace(
  /<script[^>]+src="https:\/\/static\.linear\.app[^"]+"[^>]*><\/script>/gi,
  "",
);

body = body.replace(/href="\//g, 'href="https://linear.app/');
body = body.replace(/href='\/'/g, "href='https://linear.app/'");
body = body.replace(/src="\//g, 'src="https://linear.app/');

const outDir = join(root, "public/linear");
await mkdir(outDir, { recursive: true });

await writeFile(join(outDir, "content.html"), body);
await writeFile(join(outDir, "styles.css"), inlineStyle);
await writeFile(
  join(outDir, "manifest.json"),
  JSON.stringify(
    {
      cssUrls,
      scripts: scriptUrls,
      title: "Linear – The system for product development",
      description:
        "Linear is the system for product development. Plan and build your product with the #1 issue tracker for software teams and agents.",
    },
    null,
    2,
  ),
);

console.log(
  `CSS: ${cssUrls.length}, body: ${body.length} bytes, inline CSS: ${inlineStyle.length} bytes`,
);
