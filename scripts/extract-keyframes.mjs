import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.raycast.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(4000);

const data = await page.evaluate(() => {
  const wanted = [
    'fade-in-up', 'fadeIn', 'rotating', 'blink', 'progress', 'loadingSweep',
    'x__', 'hero-marquee', 'Announce', 'FeatureWall', 'AIShow', 'Gallery',
    'nightRider', 'iconSuccess'
  ];
  const keyframes = [];
  const classRules = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = [...sheet.cssRules]; } catch { continue; }
    for (const rule of rules) {
      const text = rule.cssText || '';
      const name = rule.name || '';
      if (rule.type === CSSRule.KEYFRAMES_RULE || text.startsWith('@keyframes')) {
        if (wanted.some(w => name.includes(w) || text.includes(w))) {
          keyframes.push({ name, css: text.slice(0, 1200) });
        } else if (keyframes.length < 80) {
          keyframes.push({ name, css: text.slice(0, 800) });
        }
      }
      // Capture fadeInUp and animation utility classes
      if (rule.selectorText && (
        /fadeInUp|fade-in-up|HeroAnnouncement|Features_item|Features_active|ExtensionHighlight_active|page_fade|RaycastWindow_blink|FeatureWall_progress|AIShowCase_progress|Keyboard_key|CommandYourTime|AnimatedCmd/i.test(rule.selectorText)
      )) {
        classRules.push({ sel: rule.selectorText.slice(0, 200), css: text.slice(0, 500) });
      }
    }
  }

  // Feature dock structure + icons
  const dock = document.querySelector('[class*="Features_dock"]');
  const dockHTML = dock?.innerHTML?.slice(0, 3000);
  const items = [...document.querySelectorAll('[class*="Features_item"]')].map(el => {
    const img = el.querySelector('img');
    const svg = el.querySelector('svg');
    return {
      classes: el.className.toString(),
      aria: el.getAttribute('aria-label'),
      title: el.getAttribute('title'),
      img: img?.src,
      svg: svg?.outerHTML?.slice(0, 400),
      styles: {
        transition: getComputedStyle(el).transition,
        transform: getComputedStyle(el).transform,
        opacity: getComputedStyle(el).opacity,
        width: getComputedStyle(el).width,
        height: getComputedStyle(el).height,
        borderRadius: getComputedStyle(el).borderRadius,
        background: getComputedStyle(el).backgroundColor,
      }
    };
  });

  // Captions for each feature - click through
  // Get sub text element
  const sub = document.querySelector('[class*="Features_sub"]');
  const titleEl = document.querySelector('[class*="Features_"] h[class], [class*="Features_caption"], [class*="Features_title"]');

  // Showcase reel transition
  const reel = document.querySelector('[class*="Features_showcaseReel"], [class*="Features_reel"]');
  const reelStyles = reel ? {
    classes: reel.className.toString().slice(0,100),
    display: getComputedStyle(reel).display,
    overflow: getComputedStyle(reel).overflow,
    scrollSnap: getComputedStyle(reel).scrollSnapType,
    transition: getComputedStyle(reel).transition,
    childCount: reel.children.length,
    childWidths: [...reel.children].slice(0,6).map(c => getComputedStyle(c).width),
  } : null;

  // Keyboard animated keys - look for highlighted command keys
  const kb = document.querySelector('[class*="Keyboard_keyboard"], [class*="AnimatedCmd"]');
  const kbInfo = kb ? {
    classes: kb.className.toString().slice(0,120),
    parent: kb.parentElement?.className?.toString().slice(0,120),
    highlighted: [...kb.querySelectorAll('*')].filter(el => {
      const o = parseFloat(getComputedStyle(el).opacity);
      return o > 0.5 && (el.className||'').toString().includes('key');
    }).slice(0,20).map(el => ({
      text: el.innerText.slice(0,20),
      opacity: getComputedStyle(el).opacity,
      classes: (el.className||'').toString().slice(0,80),
      bg: getComputedStyle(el).backgroundColor,
    })),
  } : null;

  // GetYourTimeBack keyboard - check for animation on scroll
  const gyt = document.querySelector('[class*="GetYourTime"], [class*="CommandYourTime"]');

  // Feature wall progress bars
  const fwProgress = [...document.querySelectorAll('[class*="FeatureWall"] [class*="progress"], [class*="FeatureWall_progress"]')].slice(0,5).map(el => ({
    classes: el.className.toString().slice(0,100),
    animation: getComputedStyle(el).animation,
    width: getComputedStyle(el).width,
  }));

  // AI showcase progress
  const aiProgress = [...document.querySelectorAll('[class*="AIShow"] [class*="progress"], [class*="AIShowCase_progress"]')].slice(0,5).map(el => ({
    classes: el.className.toString().slice(0,100),
    animation: getComputedStyle(el).animation,
  }));

  // Hero canvas - try to understand by sampling pixels over time? save frames
  return { keyframes, classRules: classRules.slice(0, 80), dockHTML, items, reelStyles, kbInfo, fwProgress, aiProgress };
});

fs.writeFileSync('/workspace/docs/research/raycast/keyframes-detail.json', JSON.stringify(data, null, 2));
console.log('keyframes count', data.keyframes.length);
data.keyframes.forEach(k => console.log('\n===', k.name, '===\n', k.css.slice(0, 400)));
console.log('\n--- class rules sample ---');
data.classRules.slice(0, 25).forEach(r => console.log(r.sel, '=>', r.css.slice(0, 200)));
console.log('\n dock items', data.items.length, data.items.map(i => i.aria || i.title || i.classes.slice(0,40)));
console.log('reel', data.reelStyles);
console.log('kb', JSON.stringify(data.kbInfo, null, 2)?.slice(0,800));
console.log('fw', data.fwProgress);
console.log('ai', data.aiProgress);

// Capture 3 canvas frames over time to see motion
for (let i = 0; i < 4; i++) {
  await page.waitForTimeout(400);
  const b64 = await page.evaluate(() => {
    const c = document.querySelector('[class*="page_hero"] canvas');
    if (!c) return null;
    return c.toDataURL('image/jpeg', 0.6);
  });
  if (b64) {
    const buf = Buffer.from(b64.split(',')[1], 'base64');
    fs.writeFileSync(`/workspace/docs/design-references/raycast/canvas-frame-${i}.jpg`, buf);
    console.log('saved frame', i, buf.length);
  }
}

// Update feature captions by clicking
const captions = await page.evaluate(async () => {
  const items = [...document.querySelectorAll('[class*="Features_item"]')];
  const out = [];
  for (let i = 0; i < items.length; i++) {
    items[i].click();
    await new Promise(r => setTimeout(r, 300));
    const sub = document.querySelector('[class*="Features_sub"]');
    const label = document.querySelector('[class*="Features_dock"] [class*="active"]')?.getAttribute('aria-label')
      || document.querySelector('[class*="Features_label"], [class*="Features_tooltip"]')?.innerText
      || items[i].getAttribute('aria-label');
    // try floating label near dock
    const floating = [...document.querySelectorAll('[class*="Features_"]')].find(el => /Clipboard|AI|Emoji|Calculator|Window|File/i.test(el.innerText) && el.innerText.length < 40);
    out.push({
      index: i,
      label: label || floating?.innerText,
      caption: sub?.innerText,
      floatingNear: floating?.innerText,
    });
  }
  return out;
});
fs.writeFileSync('/workspace/docs/research/raycast/feature-captions.json', JSON.stringify(captions, null, 2));
console.log('captions', captions);

await browser.close();
