import { chromium } from 'playwright-core';
import { homedir } from 'os';
import { join } from 'path';
const chrome = join(homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome');
const browser = await chromium.launch({executablePath: chrome, args:['--no-sandbox','--disable-dev-shm-usage']});
const page = await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('http://127.0.0.1:3000/', {waitUntil:'networkidle', timeout:60000});
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const footer = document.querySelector('footer');
  const faq = [...document.querySelectorAll('section')].find(s => s.textContent?.includes('Najczęściej zadawane'));
  return {
    scrollHeight: document.documentElement.scrollHeight,
    footerHTML: footer ? footer.outerHTML.slice(0,500) : null,
    footerHeight: footer?.getBoundingClientRect().height,
    footerTop: footer ? footer.getBoundingClientRect().top + window.scrollY : null,
    faqBottom: faq ? faq.getBoundingClientRect().bottom + window.scrollY : null,
    hasFooterLogo: !!document.querySelector('footer img[alt="Snipelt"]'),
    bodyTail: document.body.innerText.slice(-600),
  };
});
console.log(JSON.stringify(info,null,2));
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);
const opac = await page.evaluate(() => {
  const footer = document.querySelector('footer');
  if (!footer) return null;
  return [...footer.children].map(c => ({
    cls: c.className?.toString?.().slice(0,60),
    opacity: getComputedStyle(c).opacity,
    kids: [...c.querySelectorAll(':scope > * , :scope *')].slice(0,6).map(n => ({
      t:(n.textContent||'').trim().slice(0,30),
      o:getComputedStyle(n).opacity
    }))
  }));
});
console.log('after scroll opac', JSON.stringify(opac,null,2));
await page.screenshot({path:'/workspace/docs/design-references/snipeit.io/qa/clone-bottom-now.png'});
await browser.close();
