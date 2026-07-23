import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/workspace/docs/research/raycast';
const URL = 'https://www.raycast.com/?via=esther&gad_source=1';

const props = [
  'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
  'textTransform','textDecoration','backgroundColor','background',
  'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
  'margin','marginTop','marginRight','marginBottom','marginLeft',
  'width','height','maxWidth','minWidth','maxHeight','minHeight',
  'display','flexDirection','justifyContent','alignItems','gap',
  'gridTemplateColumns','gridTemplateRows',
  'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
  'boxShadow','overflow','overflowX','overflowY',
  'position','top','right','bottom','left','zIndex',
  'opacity','transform','transition','cursor',
  'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
  'whiteSpace','textOverflow','WebkitLineClamp'
];

function extractStyles(cs) {
  const styles = {};
  for (const p of props) {
    const v = cs[p];
    if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v;
  }
  return styles;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(60000);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 120000 }).catch(() => page.goto(URL, { waitUntil: 'domcontentloaded' }));
  await page.waitForTimeout(5000);

  const topology = await page.evaluate(() => {
    const root = document.querySelector('#root') || document.body;
    // Find meaningful section containers
    const candidates = [...root.querySelectorAll('[class*="_container"], [class*="section"], [class*="Section"], section, header, footer, nav')];
    const seen = new Set();
    const sections = [];
    for (const el of candidates) {
      const cls = (el.className?.toString() || '');
      // Prefer top-level feature sections
      const key = cls.split(' ')[0];
      if (seen.has(key)) continue;
      const r = el.getBoundingClientRect();
      if (r.height < 60 || r.width < 200) continue;
      // Only near-page-width sections or nav
      if (r.width < 700 && !cls.includes('Navbar') && !cls.includes('nav')) continue;
      seen.add(key);
      sections.push({
        key,
        classes: cls.slice(0, 160),
        tag: el.tagName.toLowerCase(),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        width: Math.round(r.width),
        text: (el.innerText || '').slice(0, 400).replace(/\s+/g, ' '),
        childClassNames: [...el.children].slice(0, 12).map(c => (c.className?.toString() || c.tagName).slice(0, 80)),
        imgCount: el.querySelectorAll('img').length,
        videoCount: el.querySelectorAll('video').length,
        svgCount: el.querySelectorAll('svg').length,
        buttonTexts: [...el.querySelectorAll('a, button')].slice(0, 20).map(a => (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 60)).filter(Boolean),
      });
    }
    sections.sort((a,b) => a.top - b.top);

    // Also get direct page structure from known class patterns
    const pageSections = [...document.querySelectorAll('[class*="page_section"], [class*="Hero"], [class*="Navbar"], [class*="Footer"], [class*="Features"], [class*="AIShow"], [class*="Testimonial"], [class*="Automation"], [class*="Community"], [class*="Command"], [class*="Store"], [class*="Extension"], [class*="Download"]')];
    const named = pageSections.map(el => {
      const r = el.getBoundingClientRect();
      return {
        classes: (el.className?.toString() || '').slice(0, 120),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        text: (el.innerText || '').slice(0, 200).replace(/\s+/g, ' '),
      };
    }).filter(s => s.height > 40).sort((a,b)=>a.top-b.top);

    return { sections: sections.slice(0, 40), named: named.slice(0, 60), pageText: (root.innerText || '').slice(0, 8000) };
  });

  fs.writeFileSync(`${OUT}/topology-raw.json`, JSON.stringify(topology, null, 2));
  console.log('Named sections:');
  for (const s of topology.named) console.log(`  y=${s.top} h=${s.height} ${s.classes.slice(0,70)} | ${s.text.slice(0,80)}`);
  console.log('\nTop sections:');
  for (const s of topology.sections.slice(0, 25)) console.log(`  y=${s.top} h=${s.height} ${s.key} imgs=${s.imgCount} | ${s.text.slice(0,90)}`);

  // Extract detailed styles for key sections by class prefix
  const selectors = [
    '[class*="Navbar_container"]',
    '[class*="Hero"]',
    '[class*="Features_"]',
    '[class*="AIShowCase"]',
    '[class*="Testimonials"]',
    '[class*="Automation"]',
    '[class*="CommunitySection"]',
    '[class*="CommandYourTime"]',
    '[class*="Footer"]',
    'footer',
  ];

  const detailed = {};
  for (const sel of selectors) {
    const data = await page.evaluate(({ sel, props }) => {
      const el = document.querySelector(sel);
      if (!el) return { error: 'not found: ' + sel };
      function extractStyles(element) {
        const cs = getComputedStyle(element);
        const styles = {};
        props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
        return styles;
      }
      function walk(element, depth) {
        if (depth > 3) return null;
        const children = [...element.children];
        return {
          tag: element.tagName.toLowerCase(),
          classes: (element.className?.toString() || '').split(' ').slice(0, 5).join(' '),
          text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
          textContent: depth < 2 ? (element.innerText || '').slice(0, 300).replace(/\s+/g,' ') : null,
          styles: extractStyles(element),
          images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
          childCount: children.length,
          children: children.slice(0, 15).map(c => walk(c, depth + 1)).filter(Boolean)
        };
      }
      const r = el.getBoundingClientRect();
      return { bounds: { top: Math.round(r.top+window.scrollY), height: Math.round(r.height), width: Math.round(r.width) }, tree: walk(el, 0) };
    }, { sel, props });
    detailed[sel] = data;
    console.log('Extracted', sel, data.error || `h=${data.bounds?.height}`);
  }
  fs.writeFileSync(`${OUT}/section-styles.json`, JSON.stringify(detailed, null, 2));

  // Get all image URLs unique
  const assets = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')].map(img => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      w: img.naturalWidth,
      h: img.naturalHeight,
    })).filter(i => i.src && !i.src.startsWith('data:'));
    const sources = [...document.querySelectorAll('source')].map(s => s.srcset || s.src).filter(Boolean);
    const bgUrls = [];
    [...document.querySelectorAll('*')].forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      const m = bg && bg.match(/url\(["']?([^"')]+)["']?\)/g);
      if (m) m.forEach(u => bgUrls.push(u.replace(/url\(["']?/, '').replace(/["']?\)$/, '')));
    });
    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map(l => l.href);
    const og = document.querySelector('meta[property="og:image"]')?.content;
    return { imgs, sources, bgUrls: [...new Set(bgUrls)].slice(0, 100), favicons, og };
  });
  fs.writeFileSync(`${OUT}/assets.json`, JSON.stringify(assets, null, 2));
  console.log('Unique images:', new Set(assets.imgs.map(i=>i.src)).size, 'bg:', assets.bgUrls.length);

  // Navbar detailed + CTAs
  const nav = await page.evaluate(() => {
    const nav = document.querySelector('[class*="Navbar_container"]');
    if (!nav) return null;
    const links = [...nav.querySelectorAll('a')].map(a => ({
      text: (a.innerText||'').trim(),
      href: a.getAttribute('href'),
      styles: (() => {
        const cs = getComputedStyle(a);
        return { fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, padding: cs.padding, borderRadius: cs.borderRadius, background: cs.backgroundColor };
      })()
    }));
    const logo = nav.querySelector('svg, img');
    return {
      links,
      logoTag: logo?.tagName,
      logoOuterHTML: logo?.outerHTML?.slice(0, 2000),
      navHTML: nav.innerHTML.slice(0, 5000),
      styles: (() => {
        const cs = getComputedStyle(nav);
        return { height: cs.height, padding: cs.padding, display: cs.display, justifyContent: cs.justifyContent, alignItems: cs.alignItems, width: cs.width, maxWidth: cs.maxWidth, background: cs.backgroundColor, position: cs.position, zIndex: cs.zIndex };
      })(),
      inner: (() => {
        const inner = nav.firstElementChild;
        if (!inner) return null;
        const cs = getComputedStyle(inner);
        const r = inner.getBoundingClientRect();
        return { classes: inner.className?.toString().slice(0,100), width: cs.width, maxWidth: cs.maxWidth, display: cs.display, padding: cs.padding, height: Math.round(r.height) };
      })()
    };
  });
  fs.writeFileSync(`${OUT}/navbar.json`, JSON.stringify(nav, null, 2));

  // Hero detailed
  const hero = await page.evaluate(() => {
    // Find hero by looking for h1
    const h1 = document.querySelector('h1');
    if (!h1) return { error: 'no h1' };
    let hero = h1.closest('[class*="Hero"]') || h1.closest('section') || h1.parentElement?.parentElement;
    // Walk up to a large container
    let el = h1;
    for (let i=0;i<8;i++) {
      if (!el.parentElement) break;
      el = el.parentElement;
      const r = el.getBoundingClientRect();
      if (r.height > 500 && r.width > 1000) { hero = el; break; }
    }
    const cs = (e) => {
      const s = getComputedStyle(e);
      return { fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, color: s.color, fontFamily: s.fontFamily, margin: s.margin, padding: s.padding, textAlign: s.textAlign, maxWidth: s.maxWidth, width: s.width, display: s.display, gap: s.gap, flexDirection: s.flexDirection, alignItems: s.alignItems, justifyContent: s.justifyContent, background: s.backgroundColor, borderRadius: s.borderRadius, border: s.border, height: s.height };
    };
    const btns = [...(hero?.querySelectorAll('a,button') || [])].filter(a => (a.innerText||'').match(/Download|Mac|Windows/i)).map(a => ({
      text: a.innerText.trim(), href: a.getAttribute('href'), styles: cs(a), classes: a.className?.toString().slice(0,80)
    }));
    const imgs = [...(hero?.querySelectorAll('img') || [])].map(img => ({ src: img.currentSrc||img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight, styles: { width: getComputedStyle(img).width, height: getComputedStyle(img).height, objectFit: getComputedStyle(img).objectFit, position: getComputedStyle(img).position } }));
    const paras = [...(hero?.querySelectorAll('p, h1, h2') || [])].map(e => ({ tag: e.tagName, text: e.innerText.trim(), styles: cs(e) }));
    return {
      classes: hero?.className?.toString().slice(0,150),
      bounds: hero ? (() => { const r = hero.getBoundingClientRect(); return { h: Math.round(r.height), w: Math.round(r.width), top: Math.round(r.top+scrollY)}; })() : null,
      containerStyles: hero ? cs(hero) : null,
      paras, btns, imgs,
      fullText: hero?.innerText?.slice(0, 800),
    };
  });
  fs.writeFileSync(`${OUT}/hero.json`, JSON.stringify(hero, null, 2));
  console.log('Hero:', hero.paras?.map(p=>p.text).join(' | '), 'btns:', hero.btns?.length, 'imgs:', hero.imgs?.length);

  // Footer
  const footer = await page.evaluate(() => {
    const f = document.querySelector('footer') || document.querySelector('[class*="Footer"]');
    if (!f) return null;
    return {
      text: f.innerText.slice(0, 2000),
      classes: f.className?.toString().slice(0,120),
      links: [...f.querySelectorAll('a')].map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') })),
      styles: (() => { const s = getComputedStyle(f); return { padding: s.padding, background: s.backgroundColor, color: s.color, display: s.display, gap: s.gap }; })()
    };
  });
  fs.writeFileSync(`${OUT}/footer.json`, JSON.stringify(footer, null, 2));

  // Interactive: click feature tabs if any
  const interactions = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('[role="tab"], [class*="tab"], [class*="Tab"], [class*="Pill"], [class*="chip"]')].slice(0, 30).map(el => ({
      text: (el.innerText||'').trim().slice(0,40),
      role: el.getAttribute('role'),
      classes: (el.className||'').toString().slice(0,80),
      tag: el.tagName,
    }));
    return { tabs };
  });
  fs.writeFileSync(`${OUT}/interactions.json`, JSON.stringify(interactions, null, 2));

  await browser.close();
  console.log('Deep extract done');
  console.log('PAGE TEXT START:\n', topology.pageText.slice(0, 2500));
}

main().catch(e => { console.error(e); process.exit(1); });
