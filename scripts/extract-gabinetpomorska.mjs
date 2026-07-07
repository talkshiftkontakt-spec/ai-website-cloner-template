import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const URL = 'https://www.gabinetpomorska.pl';
const OUT = join(ROOT, 'docs/research/gabinetpomorska.pl');
const REFS = join(ROOT, 'docs/design-references/gabinetpomorska.pl');

mkdirSync(OUT, { recursive: true });
mkdirSync(REFS, { recursive: true });

const EXTRACTION_SCRIPT = `
(() => {
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap','flexWrap',
    'gridTemplateColumns','gridTemplateRows',
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

  const sections = [...document.querySelectorAll('section, header, footer, nav, main > div, [class*="section"], [id*="section"]')];
  const sectionData = sections.slice(0, 30).map((el, i) => ({
    index: i,
    tag: el.tagName.toLowerCase(),
    id: el.id || null,
    classes: el.className?.toString().slice(0, 200) || null,
    textPreview: el.textContent?.trim().slice(0, 300) || null,
    styles: extractStyles(el),
    rect: el.getBoundingClientRect(),
  }));

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

  const buttons = [...document.querySelectorAll('button, a.btn, [class*="button"], [class*="btn"]')].slice(0, 30).map(b => ({
    tag: b.tagName,
    text: b.textContent?.trim().slice(0, 100),
    classes: b.className?.toString().slice(0, 150),
    styles: extractStyles(b),
  }));

  const fonts = [...new Set([...document.querySelectorAll('*')].slice(0, 500).map(el => getComputedStyle(el).fontFamily))];

  const bgImages = [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).slice(0, 50).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + (el.className ? '.' + el.className.toString().split(' ')[0] : ''),
  }));

  const bodyStyles = extractStyles(document.body);
  const htmlStyles = extractStyles(document.documentElement);

  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    lang: document.documentElement.lang,
  };

  const navItems = [...document.querySelectorAll('nav a, header a, [class*="nav"] a')].map(a => ({
    text: a.textContent?.trim(),
    href: a.href,
  }));

  return JSON.stringify({
    meta,
    bodyStyles,
    htmlStyles,
    headings,
    navItems,
    sections: sectionData,
    images,
    links: links.slice(0, 80),
    buttons,
    fonts,
    bgImages,
    svgCount: document.querySelectorAll('svg').length,
    bodyHTML: document.body.innerHTML.slice(0, 50000),
  }, null, 2);
})();
`;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  // Desktop screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(REFS, 'desktop-full.png'), fullPage: true });
  await page.screenshot({ path: join(REFS, 'desktop-viewport.png') });

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(REFS, 'mobile-full.png'), fullPage: true });

  // Back to desktop for extraction
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  const data = await page.evaluate(EXTRACTION_SCRIPT);
  writeFileSync(join(OUT, 'extraction.json'), data);

  const html = await page.content();
  writeFileSync(join(OUT, 'page.html'), html);

  // Get root computed styles for key selectors
  const keySelectors = ['header', 'nav', 'footer', 'main', 'h1', 'h2', 'p', 'a', '.hero', '[class*="hero"]'];
  const selectorStyles = {};
  for (const sel of keySelectors) {
    try {
      const exists = await page.$(sel);
      if (exists) {
        selectorStyles[sel] = await page.evaluate((s) => {
          const el = document.querySelector(s);
          if (!el) return null;
          const cs = getComputedStyle(el);
          return {
            color: cs.color,
            backgroundColor: cs.backgroundColor,
            fontSize: cs.fontSize,
            fontFamily: cs.fontFamily,
            fontWeight: cs.fontWeight,
            lineHeight: cs.lineHeight,
            padding: cs.padding,
            margin: cs.margin,
            maxWidth: cs.maxWidth,
            display: cs.display,
          };
        }, sel);
      }
    } catch { /* skip */ }
  }
  writeFileSync(join(OUT, 'selector-styles.json'), JSON.stringify(selectorStyles, null, 2));

  await browser.close();
  console.log('Extraction complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
