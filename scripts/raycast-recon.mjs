import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUT = '/workspace/docs/research/raycast';
const SHOTS = '/workspace/docs/design-references/raycast';
const URL = 'https://www.raycast.com/?via=esther&gad_source=1';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  console.log('Navigating...');
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(4000);
  // dismiss cookie/consent if any
  try {
    const btn = page.locator('button:has-text("Accept"), button:has-text("Agree"), button:has-text("Got it"), [aria-label*="accept" i]').first();
    if (await btn.isVisible({ timeout: 2000 })) await btn.click();
  } catch {}

  // Desktop full page screenshot
  console.log('Screenshot desktop...');
  await page.screenshot({ path: `${SHOTS}/full-desktop-1440.png`, fullPage: true });
  await page.screenshot({ path: `${SHOTS}/viewport-top-1440.png`, fullPage: false });

  // Global extraction
  const global = await page.evaluate(() => {
    const fonts = [...new Set([...document.querySelectorAll('*')].slice(0, 400).map(el => getComputedStyle(el).fontFamily))];
    const fontLinks = [...document.querySelectorAll('link[href*="font"], link[rel="preconnect"]')].map(l => ({ href: l.href, rel: l.rel }));
    const favicons = [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')].map(l => ({ href: l.href, rel: l.rel, sizes: l.sizes?.toString() }));
    const meta = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      ogImage: document.querySelector('meta[property="og:image"]')?.content,
      themeColor: document.querySelector('meta[name="theme-color"]')?.content,
    };
    const body = getComputedStyle(document.body);
    const html = getComputedStyle(document.documentElement);
    const colors = {
      bodyBg: body.backgroundColor,
      bodyColor: body.color,
      htmlBg: html.backgroundColor,
    };
    // Collect unique colors from key elements
    const colorSet = new Set();
    [...document.querySelectorAll('body, header, nav, main, footer, h1, h2, h3, a, button, p, section')].slice(0, 200).forEach(el => {
      const cs = getComputedStyle(el);
      [cs.color, cs.backgroundColor, cs.borderColor].forEach(c => { if (c && c !== 'rgba(0, 0, 0, 0)') colorSet.add(c); });
    });
    // Sections
    const sections = [...document.querySelectorAll('main > *, body > div > main > *, [class*="section"], section, header, footer, nav')].slice(0, 80).map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        tag: el.tagName.toLowerCase(),
        id: el.id,
        classes: (el.className?.toString() || '').split(/\s+/).slice(0, 8).join(' '),
        text: (el.innerText || '').slice(0, 180).replace(/\s+/g, ' '),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        width: Math.round(r.width),
      };
    }).filter(s => s.height > 40);

    // Top-level structure
    const main = document.querySelector('main') || document.body;
    const children = [...main.children].map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        tag: el.tagName.toLowerCase(),
        id: el.id,
        classes: (el.className?.toString() || '').slice(0, 120),
        textPreview: (el.innerText || '').slice(0, 250).replace(/\s+/g, ' '),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
      };
    });

    // Assets
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: (img.parentElement?.className || '').toString().slice(0, 80),
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex,
    }));
    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted,
    }));
    const bgImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none' && bg.includes('url');
    }).slice(0, 80).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      tag: el.tagName,
      classes: (el.className?.toString() || '').slice(0, 80),
    }));
    const svgCount = document.querySelectorAll('svg').length;
    const lenis = !!document.querySelector('.lenis, [data-lenis], .locomotive-scroll');
    const sticky = [...document.querySelectorAll('*')].filter(el => {
      const p = getComputedStyle(el).position;
      return p === 'sticky' || p === 'fixed';
    }).slice(0, 30).map(el => ({
      tag: el.tagName,
      classes: (el.className?.toString() || '').slice(0, 100),
      position: getComputedStyle(el).position,
      top: getComputedStyle(el).top,
      zIndex: getComputedStyle(el).zIndex,
      text: (el.innerText || '').slice(0, 80).replace(/\s+/g, ' '),
    }));

    return {
      meta, fonts, fontLinks, favicons, colors, colorList: [...colorSet].slice(0, 60),
      sections, children, images, videos, bgImages, svgCount, lenis, sticky,
      bodyClass: document.body.className,
      htmlClass: document.documentElement.className,
      scrollHeight: document.documentElement.scrollHeight,
    };
  });

  fs.writeFileSync(`${OUT}/global-extraction.json`, JSON.stringify(global, null, 2));
  console.log('Sections/children:', global.children.length, 'Images:', global.images.length, 'Videos:', global.videos.length);
  console.log('Fonts sample:', global.fonts.slice(0, 8));
  console.log('Meta:', global.meta);
  console.log('Lenis:', global.lenis, 'SVG count:', global.svgCount);

  // Scroll sweep - capture header at top and scrolled
  const headerTop = await page.evaluate(() => {
    const h = document.querySelector('header, nav, [class*="Header"], [class*="Nav"]');
    if (!h) return null;
    const cs = getComputedStyle(h);
    return {
      bg: cs.backgroundColor, backdrop: cs.backdropFilter, height: cs.height,
      boxShadow: cs.boxShadow, position: cs.position, borderBottom: cs.borderBottom,
      classes: (h.className||'').toString().slice(0,150)
    };
  });

  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(800);
  const headerScrolled = await page.evaluate(() => {
    const h = document.querySelector('header, nav, [class*="Header"], [class*="Nav"]');
    if (!h) return null;
    const cs = getComputedStyle(h);
    return {
      bg: cs.backgroundColor, backdrop: cs.backdropFilter, height: cs.height,
      boxShadow: cs.boxShadow, position: cs.position, borderBottom: cs.borderBottom,
    };
  });
  fs.writeFileSync(`${OUT}/header-states.json`, JSON.stringify({ headerTop, headerScrolled }, null, 2));

  // Scroll through page collecting section screenshots at intervals
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const totalH = global.scrollHeight;
  const step = 900;
  for (let y = 0, n = 0; y < totalH && n < 20; y += step, n++) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${SHOTS}/scroll-${String(n).padStart(2,'0')}-y${y}.png`, fullPage: false });
  }

  // Mobile screenshots
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${SHOTS}/full-mobile-390.png`, fullPage: true });
  await page.screenshot({ path: `${SHOTS}/viewport-top-mobile-390.png`, fullPage: false });

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${SHOTS}/viewport-top-tablet-768.png`, fullPage: false });

  await browser.close();
  console.log('Done recon');
}

main().catch(e => { console.error(e); process.exit(1); });
