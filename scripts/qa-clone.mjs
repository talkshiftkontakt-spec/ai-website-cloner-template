import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/workspace/docs/design-references/raycast';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/clone-viewport-top-1440.png`, fullPage: false });
await page.screenshot({ path: `${OUT}/clone-full-desktop-1440.png`, fullPage: true });

const sections = [
  { name: 'navbar', y: 0 },
  { name: 'features', y: 900 },
  { name: 'extensions', y: 2800 },
  { name: 'ai', y: 4200 },
  { name: 'testimonials', y: 5200 },
  { name: 'automation', y: 6200 },
  { name: 'community', y: 8200 },
  { name: 'footer', y: 11000 },
];
for (const s of sections) {
  await page.evaluate(y => window.scrollTo(0, y), s.y);
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/clone-scroll-${s.name}.png`, fullPage: false });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/clone-mobile-390.png`, fullPage: false });

await browser.close();
console.log('QA screenshots done');
console.log('page height', fs.statSync(`${OUT}/clone-full-desktop-1440.png`).size);
