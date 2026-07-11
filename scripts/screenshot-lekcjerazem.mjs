import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "docs", "design-references", "lekcjerazem.pl");

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
for (const [name, width, height] of [
  ["desktop-1440", 1440, 900],
  ["mobile-390", 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("https://lekcjerazem.pl/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: join(outDir, `full-page-${name}.png`),
    fullPage: true,
  });
  console.log(`Saved ${name}`);
  await page.close();
}
await browser.close();
