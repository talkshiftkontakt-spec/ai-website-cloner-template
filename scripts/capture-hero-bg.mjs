import { chromium } from 'playwright';
await (async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 940 } });
  await page.goto('https://www.raycast.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(4000);
  // Hide text/nav so we capture glow
  await page.evaluate(() => {
    document.querySelectorAll('[class*="Navbar"], [class*="heroText"], [class*="HeroDownload"], [class*="HeroAnnouncement"], [class*="FlashMessage"]').forEach(el => el.style.visibility = 'hidden');
  });
  await page.screenshot({ path: '/workspace/public/images/raycast/features/hero-glow.png', clip: { x: 120, y: 0, width: 1200, height: 940 } });
  // Also full hero with content for reference
  await page.evaluate(() => {
    document.querySelectorAll('[class*="Navbar"], [class*="heroText"], [class*="HeroDownload"], [class*="HeroAnnouncement"]').forEach(el => el.style.visibility = '');
  });
  const hero = await page.locator('[class*="page_hero"]').first();
  await hero.screenshot({ path: '/workspace/docs/design-references/raycast/hero-section.png' });
  const nav = await page.locator('[class*="Navbar_container"]').first();
  await nav.screenshot({ path: '/workspace/docs/design-references/raycast/navbar.png' });
  await browser.close();
  console.log('captured');
})();
