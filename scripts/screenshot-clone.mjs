import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "docs", "design-references", "lekcjerazem.pl");

await mkdir(outDir, { recursive: true });

const server = spawn("npm", ["run", "dev", "--", "-p", "3456"], {
  cwd: join(__dirname, ".."),
  stdio: "pipe",
  shell: true,
});

await new Promise((r) => setTimeout(r, 8000));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3456/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);
await page.screenshot({
  path: join(outDir, "clone-desktop-1440.png"),
  fullPage: true,
});
console.log("Clone screenshot saved");
await browser.close();
server.kill("SIGTERM");
