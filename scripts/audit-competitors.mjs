import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'docs/research/gabinetpomorska.pl');
const REFS = join(__dirname, '..', 'docs/design-references/competitors');

const SITES = [
  { name: 'gabinetyrozwoju', url: 'https://www.gabinetyrozwoju.pl/' },
  { name: 'przyladekrownowagi', url: 'https://przyladekrownowagi.pl/' },
  { name: 'psychomedic', url: 'https://psychomedic.pl/' },
  { name: 'mindhealth', url: 'https://mindhealth.pl/' },
];

const AUDIT_SCRIPT = `
(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
    };
  };
  const ctas = [...document.querySelectorAll('a, button')].filter(el => {
    const t = el.textContent?.trim().toLowerCase() || '';
    return t.includes('umów') || t.includes('kontakt') || t.includes('zapis') || t.includes('wizyt');
  }).slice(0, 8).map(el => ({
    text: el.textContent?.trim().slice(0, 80),
    tag: el.tagName,
    href: el.href || null,
  }));
  const h1 = document.querySelector('h1')?.textContent?.trim();
  const h2s = [...document.querySelectorAll('h2')].slice(0, 8).map(h => h.textContent?.trim());
  const sections = [...document.querySelectorAll('section, main > div')].length;
  return JSON.stringify({
    title: document.title,
    h1,
    h2s,
    sectionCount: sections,
    body: pick('body'),
    h1Style: pick('h1'),
    h2Style: pick('h2'),
    navLinkCount: document.querySelectorAll('nav a, header a').length,
    hasPricing: /cennik|zł|koszt/i.test(document.body.innerText),
    hasTeam: /zespół|specjali|psycholog|psychiatr/i.test(document.body.innerText),
    hasOnlineBooking: /online|zapisz|rezerw|termin/i.test(document.body.innerText),
    ctas,
    fonts: [...new Set([...document.querySelectorAll('h1,h2,p,a,button')].slice(0, 40).map(el => getComputedStyle(el).fontFamily))],
  }, null, 2);
})();
`;

async function main() {
  mkdirSync(REFS, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const site of SITES) {
    console.log('Auditing', site.url);
    const page = await browser.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2000);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.screenshot({ path: join(REFS, `${site.name}-desktop.png`), fullPage: true });
      const data = await page.evaluate(AUDIT_SCRIPT);
      results[site.name] = JSON.parse(data);
    } catch (e) {
      results[site.name] = { error: String(e) };
    }
    await page.close();
  }

  await browser.close();
  writeFileSync(join(OUT, 'competitor-audit.json'), JSON.stringify(results, null, 2));
  console.log('Done');
}

main();
