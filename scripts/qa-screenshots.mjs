import { chromium } from "playwright";
import fs from "fs";

const OUT = "docs/design-references/tutoreo.pl";
fs.mkdirSync(OUT, { recursive: true });

async function shot(url, prefix) {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await desktop.waitForTimeout(1500);
  // dismiss cookies if present
  await desktop.click("#AcceptAll").catch(() => {});
  await desktop.waitForTimeout(400);
  await desktop.screenshot({ path: `${OUT}/${prefix}-desktop-hero.png` });
  await desktop.screenshot({ path: `${OUT}/${prefix}-desktop-full.png`, fullPage: true });

  // scroll sections
  for (const id of ["HowItWorks", "BenefitsSection", "FAQSection", "SecondaryCTA"]) {
    await desktop.locator(`#${id}`).scrollIntoViewIfNeeded().catch(() => {});
    await desktop.waitForTimeout(400);
    await desktop.screenshot({ path: `${OUT}/${prefix}-${id}.png` });
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await mobile.waitForTimeout(1500);
  await mobile.click("#AcceptAll").catch(() => {});
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: `${OUT}/${prefix}-mobile-hero.png` });
  await mobile.screenshot({ path: `${OUT}/${prefix}-mobile-full.png`, fullPage: true });

  await browser.close();
}

await shot("http://localhost:3000", "clone");
console.log("Clone screenshots saved");
