import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const URL = 'https://snipeit.io';
const OUT = join(ROOT, 'docs/research/snipeit.io');
const REFS = join(ROOT, 'docs/design-references/snipeit.io');

mkdirSync(OUT, { recursive: true });
mkdirSync(REFS, { recursive: true });

const CHROME =
  process.env.CHROME_PATH ||
  join(homedir(), '.cache/ms-playwright/chromium-1228/chrome-linux64/chrome') ||
  '/usr/bin/google-chrome';

const EXTRACTION_SCRIPT = `
(() => {
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','backgroundImage','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap','flexWrap','alignSelf',
    'gridTemplateColumns','gridTemplateRows','gridGap',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp','textAlign'
  ];

  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => {
      const v = cs[p];
      if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)')
        styles[p] = v;
    });
    return styles;
  }

  function walk(element, depth) {
    if (depth > 5) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      id: element.id || null,
      classes: element.className?.toString().split(' ').slice(0, 8).join(' ') || null,
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
        ? element.textContent.trim().slice(0, 200) : null,
      textPreview: element.textContent?.trim().slice(0, 150) || null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? {
        src: element.src, alt: element.alt,
        naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight
      } : null,
      childCount: children.length,
      children: children.slice(0, 25).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }

  const sections = [...document.querySelectorAll('section, header, footer, nav, main')];
  // Also try top-level divs in body that look like sections
  const bodyKids = [...document.body.children].filter(el =>
    ['DIV', 'SECTION', 'HEADER', 'FOOTER', 'MAIN', 'NAV'].includes(el.tagName)
  );

  const sectionData = (sections.length ? sections : bodyKids).slice(0, 40).map((el, i) => {
    const rect = el.getBoundingClientRect();
    return {
      index: i,
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: el.className?.toString().slice(0, 200) || null,
      textPreview: el.textContent?.trim().slice(0, 400) || null,
      styles: extractStyles(el),
      rect: { top: rect.top + window.scrollY, left: rect.left, width: rect.width, height: rect.height },
      tree: walk(el, 0),
    };
  });

  const images = [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    parentClasses: img.parentElement?.className?.toString().slice(0, 100),
  }));

  const links = [...document.querySelectorAll('a')].map(a => ({
    href: a.href,
    text: a.textContent?.trim().slice(0, 100),
  }));

  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({
    tag: h.tagName,
    text: h.textContent?.trim(),
    styles: extractStyles(h),
  }));

  const buttons = [...document.querySelectorAll('button, a[class*="btn"], [class*="button"]')].slice(0, 40).map(b => ({
    tag: b.tagName,
    text: b.textContent?.trim().slice(0, 100),
    classes: b.className?.toString().slice(0, 150),
    styles: extractStyles(b),
  }));

  const fonts = [...new Set([...document.querySelectorAll('*')].slice(0, 800).map(el => getComputedStyle(el).fontFamily))];

  const colors = {};
  [...document.querySelectorAll('*')].slice(0, 800).forEach(el => {
    const cs = getComputedStyle(el);
    [cs.color, cs.backgroundColor].forEach(c => {
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') colors[c] = (colors[c] || 0) + 1;
    });
  });
  const topColors = Object.entries(colors).sort((a,b)=>b[1]-a[1]).slice(0, 40);

  const bgImages = [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).slice(0, 80).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
  }));

  const fontLinks = [...document.querySelectorAll('link[href*="font"], link[href*="fonts.google"], style')].map(l => ({
    tag: l.tagName,
    href: l.href || null,
    rel: l.rel || null,
    text: l.tagName === 'STYLE' ? l.textContent?.slice(0, 500) : null,
  }));

  const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({
    href: l.href, sizes: l.sizes?.toString(), type: l.type
  }));

  const svgs = [...document.querySelectorAll('svg')].slice(0, 40).map((svg, i) => ({
    index: i,
    outerHTML: svg.outerHTML.slice(0, 2000),
    parentClasses: svg.parentElement?.className?.toString().slice(0, 80),
    width: svg.getAttribute('width'),
    height: svg.getAttribute('height'),
    viewBox: svg.getAttribute('viewBox'),
  }));

  const videos = [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted,
  }));

  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    lang: document.documentElement.lang,
  };

  const cssVars = {};
  const rootStyles = getComputedStyle(document.documentElement);
  for (let i = 0; i < rootStyles.length; i++) {
    const name = rootStyles[i];
    if (name.startsWith('--')) cssVars[name] = rootStyles.getPropertyValue(name).trim();
  }

  // Check for smooth scroll libs
  const hasLenis = !!document.querySelector('.lenis') || !!window.Lenis;
  const scrollBehavior = getComputedStyle(document.documentElement).scrollBehavior;

  return JSON.stringify({
    meta,
    bodyStyles: extractStyles(document.body),
    htmlStyles: extractStyles(document.documentElement),
    cssVars,
    headings,
    sections: sectionData,
    images,
    links: links.slice(0, 100),
    buttons,
    fonts,
    topColors,
    bgImages,
    fontLinks,
    favicons,
    svgs,
    videos,
    svgCount: document.querySelectorAll('svg').length,
    hasLenis,
    scrollBehavior,
    bodyHTML: document.body.innerHTML.slice(0, 80000),
  }, null, 2);
})();
`;

async function captureSectionScreenshots(page) {
  const sections = await page.evaluate(() => {
    const els = [...document.querySelectorAll('section, header, footer, main > div, body > div > div')];
    return els.slice(0, 20).map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        tag: el.tagName,
        id: el.id,
        classes: el.className?.toString().slice(0, 80),
        top: r.top + window.scrollY,
        height: r.height,
        text: el.textContent?.trim().slice(0, 60),
      };
    }).filter(s => s.height > 80);
  });

  writeFileSync(join(OUT, 'section-rects.json'), JSON.stringify(sections, null, 2));

  for (const s of sections) {
    try {
      await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, s.top - 40));
      await page.waitForTimeout(300);
      const name = (s.id || s.classes || `section-${s.i}`)
        .toString()
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 40);
      await page.screenshot({
        path: join(REFS, `section-${s.i}-${name}.png`),
        clip: {
          x: 0,
          y: Math.max(0, s.top - (await page.evaluate(() => window.scrollY))),
          width: 1440,
          height: Math.min(s.height + 40, 900),
        },
      });
    } catch (e) {
      console.warn('Section screenshot failed', s.i, e.message);
    }
  }
}

async function interactionSweep(page) {
  const behaviors = {
    headerAtTop: null,
    headerAfterScroll: null,
    faqItems: [],
    pricingToggle: null,
    hoverSamples: [],
    clickableTexts: [],
  };

  behaviors.headerAtTop = await page.evaluate(() => {
    const h = document.querySelector('header, nav, [class*="nav"], [class*="header"]');
    if (!h) return null;
    const cs = getComputedStyle(h);
    return {
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      position: cs.position,
      backdropFilter: cs.backdropFilter,
      classes: h.className?.toString().slice(0, 150),
    };
  });

  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(400);
  behaviors.headerAfterScroll = await page.evaluate(() => {
    const h = document.querySelector('header, nav, [class*="nav"], [class*="header"]');
    if (!h) return null;
    const cs = getComputedStyle(h);
    return {
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      position: cs.position,
      backdropFilter: cs.backdropFilter,
    };
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // FAQ accordion clicks
  const faqSelectors = await page.evaluate(() => {
    const candidates = [...document.querySelectorAll('button, [role="button"], summary, [class*="faq"] *, [class*="accordion"] *')]
      .filter(el => {
        const t = el.textContent?.trim() || '';
        return t.length > 10 && t.length < 120 && el.children.length < 5;
      })
      .slice(0, 15)
      .map((el, i) => ({
        i,
        text: el.textContent?.trim().slice(0, 80),
        tag: el.tagName,
      }));
    return candidates;
  });
  behaviors.clickableTexts = faqSelectors;

  // Try monthly/yearly toggle
  const toggleInfo = await page.evaluate(() => {
    const all = [...document.querySelectorAll('button, [role="tab"], label, span, div')];
    const monthly = all.find(el => /miesi[eę]czny|monthly/i.test(el.textContent || '') && (el.textContent || '').length < 40);
    const yearly = all.find(el => /roczny|yearly|annual|-10%/i.test(el.textContent || '') && (el.textContent || '').length < 40);
    return {
      monthly: monthly ? { text: monthly.textContent?.trim(), tag: monthly.tagName, classes: monthly.className?.toString().slice(0, 100) } : null,
      yearly: yearly ? { text: yearly.textContent?.trim(), tag: yearly.tagName, classes: yearly.className?.toString().slice(0, 100) } : null,
    };
  });
  behaviors.pricingToggle = toggleInfo;

  if (toggleInfo.yearly) {
    try {
      await page.getByText(/Roczny/i).first().click({ timeout: 3000 });
      await page.waitForTimeout(500);
      behaviors.pricingAfterYearly = await page.evaluate(() => {
        return [...document.querySelectorAll('h3, h2, [class*="price"], [class*="plan"]')]
          .map(el => el.textContent?.trim().slice(0, 80))
          .filter(Boolean)
          .slice(0, 20);
      });
      await page.getByText(/Miesi[eę]czny/i).first().click({ timeout: 3000 }).catch(() => {});
    } catch (e) {
      behaviors.pricingToggleError = e.message;
    }
  }

  // Open FAQ items
  for (const q of [
    'Czym jest SnipeIT',
    'Które portale',
    'Ile kosztuje',
  ]) {
    try {
      await page.getByText(new RegExp(q, 'i')).first().click({ timeout: 2000 });
      await page.waitForTimeout(400);
      const answer = await page.evaluate((needle) => {
        const el = [...document.querySelectorAll('*')].find(e =>
          e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && (n.textContent || '').includes(needle))
        );
        const container = el?.closest('[class*="faq"], [class*="accordion"], details, li, div');
        return container?.textContent?.trim().slice(0, 500) || null;
      }, q);
      behaviors.faqItems.push({ question: q, answer });
    } catch (e) {
      behaviors.faqItems.push({ question: q, error: e.message });
    }
  }

  writeFileSync(join(OUT, 'behaviors-raw.json'), JSON.stringify(behaviors, null, 2));
  return behaviors;
}

async function main() {
  console.log('Launching Chrome:', CHROME);
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'load', timeout: 90000 });
  await page.waitForTimeout(5000);

  // Desktop screenshots
  await page.screenshot({ path: join(REFS, 'desktop-full.png'), fullPage: true });
  await page.screenshot({ path: join(REFS, 'desktop-viewport.png') });
  console.log('Desktop screenshots done');

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(REFS, 'tablet-full.png'), fullPage: true });

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(REFS, 'mobile-full.png'), fullPage: true });
  await page.screenshot({ path: join(REFS, 'mobile-viewport.png') });
  console.log('Mobile screenshots done');

  // Back to desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  const data = await page.evaluate(EXTRACTION_SCRIPT);
  writeFileSync(join(OUT, 'extraction.json'), data);
  console.log('Extraction JSON written');

  const html = await page.content();
  writeFileSync(join(OUT, 'page.html'), html);

  await captureSectionScreenshots(page);
  console.log('Section screenshots done');

  await interactionSweep(page);
  console.log('Interaction sweep done');

  // Collect network-discovered assets from performance
  const assetUrls = await page.evaluate(() => {
    return performance.getEntriesByType('resource')
      .filter(r => /\.(png|jpe?g|webp|svg|gif|woff2?|mp4|webm)(\?|$)/i.test(r.name) ||
                   /image|font|media/.test(r.initiatorType))
      .map(r => ({ url: r.name, type: r.initiatorType, size: r.transferSize }));
  });
  writeFileSync(join(OUT, 'network-assets.json'), JSON.stringify(assetUrls, null, 2));

  await browser.close();
  console.log('Extraction complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
