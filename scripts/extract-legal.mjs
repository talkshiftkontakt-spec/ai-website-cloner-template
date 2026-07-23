import { chromium } from 'playwright-core';
import { homedir } from 'os';
import { join } from 'path';
import { writeFileSync, mkdirSync } from 'fs';
const chrome = join(homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome');
const paths = [
  '/legal/polityka-prywatnosci',
  '/legal/regulamin',
  '/legal/pliki-cookies',
];
const browser = await chromium.launch({executablePath: chrome, args:['--no-sandbox','--disable-dev-shm-usage']});
const page = await browser.newPage({viewport:{width:1440,height:900}});
for (const p of paths) {
  const url = 'https://snipeit.io' + p;
  console.log('fetch', url);
  await page.goto(url, {waitUntil:'networkidle', timeout:90000});
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const h1 = document.querySelector('h1')?.textContent?.trim() || '';
    const title = document.title;
    // grab article-like content
    const article = document.querySelector('article') || document.querySelector('main') || document.body;
    const text = article.innerText;
    const html = article.innerHTML;
    const sections = [...document.querySelectorAll('main h1, main h2, main h3')].map(h => h.textContent.trim());
    return { title, h1, text, html: html.slice(0, 200000), sections, bodyClass: document.body.className };
  });
  const slug = p.split('/').pop();
  writeFileSync(`docs/research/snipeit.io/legal/${slug}.json`, JSON.stringify({path:p, ...data, text: data.text}, null, 2));
  writeFileSync(`docs/research/snipeit.io/legal/${slug}.html`, data.html);
  console.log(slug, 'h1=', data.h1, 'textLen=', data.text.length, 'sections', data.sections.slice(0,10));
  await page.screenshot({path:`docs/design-references/snipeit.io/legal-${slug}.png`, fullPage:true});
}
await browser.close();
