import { chromium } from 'playwright';
import fs from 'fs';

const OUT = '/workspace/docs/research/raycast';
const URL = 'https://www.raycast.com/';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(5000);

const animData = await page.evaluate(() => {
  // Collect stylesheets animation/keyframe names
  const keyframes = [];
  try {
    for (const sheet of document.styleSheets) {
      let rules;
      try { rules = sheet.cssRules; } catch { continue; }
      if (!rules) continue;
      for (const rule of rules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE || rule.name && rule.cssText?.includes('@keyframes')) {
          keyframes.push({ name: rule.name, css: rule.cssText?.slice(0, 500) });
        }
      }
    }
  } catch {}

  // Elements with animation or transition
  const animated = [];
  [...document.querySelectorAll('*')].forEach(el => {
    const cs = getComputedStyle(el);
    const hasAnim = cs.animationName && cs.animationName !== 'none';
    const hasTrans = cs.transition && cs.transition !== 'all 0s ease 0s' && cs.transitionDuration !== '0s';
    const cls = (el.className || '').toString();
    if (hasAnim || (hasTrans && (cls.includes('fade') || cls.includes('anim') || cls.includes('Hero') || cls.includes('Navbar') || cls.includes('Feature') || cls.includes('Command') || cls.includes('Extension') || cls.includes('Announce')))) {
      animated.push({
        tag: el.tagName,
        classes: cls.slice(0, 120),
        animation: hasAnim ? `${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction} ${cs.animationIterationCount} ${cs.animationDelay}` : null,
        transition: hasTrans ? cs.transition.slice(0, 200) : null,
        transform: cs.transform !== 'none' ? cs.transform : null,
        opacity: cs.opacity,
      });
    }
  });

  // Canvas info
  const canvases = [...document.querySelectorAll('canvas')].map(c => {
    const r = c.getBoundingClientRect();
    const parent = c.parentElement;
    return {
      w: c.width, h: c.height,
      cssW: Math.round(r.width), cssH: Math.round(r.height),
      classes: (c.className||'').toString(),
      parentClasses: (parent?.className||'').toString().slice(0,120),
      style: c.getAttribute('style'),
    };
  });

  // Intersection / scroll classes
  const fadeClasses = [...document.querySelectorAll('[class*="fade"], [class*="Fade"], [class*="animate"], [class*="Animate"], [class*="reveal"], [class*="Reveal"], [class*="inView"], [class*="visible"]')].slice(0, 40).map(el => ({
    classes: (el.className||'').toString().slice(0,150),
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
    animation: getComputedStyle(el).animation,
  }));

  // Check for framer-motion / GSAP / lottie
  const libs = {
    framer: !!(window.MotionConfig || document.querySelector('[style*="opacity"][data-framer]') || document.querySelector('[class*="framer"]')),
    gsap: !!window.gsap,
    lottie: !!window.lottie || !!document.querySelector('lottie-player, [class*="lottie"]'),
    anime: !!window.anime,
    lenis: !!document.querySelector('.lenis'),
    scripts: [...document.querySelectorAll('script[src]')].map(s => s.src).filter(s => /framer|gsap|lottie|anime|motion|three|r3f|canvas/i.test(s)).slice(0,20),
  };

  // Features dock interaction
  const dockItems = [...document.querySelectorAll('[class*="Features_item"], [class*="Features_dock"] *')].slice(0, 20).map(el => ({
    classes: (el.className||'').toString().slice(0,100),
    text: (el.innerText||'').slice(0,40),
  }));

  // Hero announcement animation
  const announce = document.querySelector('[class*="HeroAnnouncement"]');
  const announceCS = announce ? {
    classes: announce.className.toString().slice(0,150),
    animation: getComputedStyle(announce).animation,
    transition: getComputedStyle(announce).transition,
    transform: getComputedStyle(announce).transform,
  } : null;

  return {
    keyframes: keyframes.slice(0, 80),
    animated: animated.slice(0, 100),
    canvases,
    fadeClasses,
    libs,
    dockItems,
    announceCS,
    bodyAnimations: getComputedStyle(document.body).animation,
  };
});

fs.writeFileSync(`${OUT}/animations-raw.json`, JSON.stringify(animData, null, 2));
console.log('keyframes', animData.keyframes.length);
console.log('animated els', animData.animated.length);
console.log('canvases', JSON.stringify(animData.canvases, null, 2));
console.log('libs', JSON.stringify(animData.libs, null, 2));
console.log('announce', animData.announceCS);
console.log('sample keyframes:', animData.keyframes.slice(0, 15).map(k => k.name));
console.log('sample animated:', animData.animated.slice(0, 20).map(a => `${a.classes.slice(0,50)} | ${a.animation || a.transition}`));

// Scroll and observe opacity changes on sections
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

const beforeScroll = await page.evaluate(() => {
  return [...document.querySelectorAll('[class*="page_section"], [class*="Features_"], [class*="Extension"], [class*="AIShow"], [class*="Testimonial"], [class*="Automation"], [class*="Community"], [class*="APISection"], [class*="Command"], [class*="GetYour"], [class*="SectionTitle"], [class*="fade"]')].slice(0, 30).map(el => ({
    classes: (el.className||'').toString().slice(0,80),
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
    top: Math.round(el.getBoundingClientRect().top + scrollY),
  }));
});

await page.evaluate(() => window.scrollTo(0, 2000));
await page.waitForTimeout(800);
const midScroll = await page.evaluate(() => {
  return [...document.querySelectorAll('[class*="page_section"], [class*="Features_"], [class*="SectionTitle"], [class*="fade"], [class*="GetYour"]')].slice(0, 30).map(el => ({
    classes: (el.className||'').toString().slice(0,80),
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
  }));
});

fs.writeFileSync(`${OUT}/scroll-opacity.json`, JSON.stringify({ beforeScroll, midScroll }, null, 2));

// Click dock items and capture transitions
const dockClick = await page.evaluate(async () => {
  const items = [...document.querySelectorAll('[class*="Features_item"]')];
  const results = [];
  for (const item of items.slice(0, 5)) {
    item.click();
    await new Promise(r => setTimeout(r, 400));
    const active = document.querySelector('[class*="Features_item"][class*="active"], [class*="Features_active"]');
    const caption = document.querySelector('[class*="Features_sub"]');
    const showcase = document.querySelector('[class*="Features_showcase"], [class*="Features_frameContent"], [class*="Features_reel"]');
    results.push({
      clicked: (item.innerText||item.getAttribute('aria-label')||'').slice(0,40),
      activeClasses: active?.className?.toString().slice(0,100),
      caption: caption?.innerText?.slice(0,120),
      showcaseTransition: showcase ? getComputedStyle(showcase).transition : null,
      showcaseOpacity: showcase ? getComputedStyle(showcase).opacity : null,
    });
  }
  return results;
});
fs.writeFileSync(`${OUT}/dock-interaction.json`, JSON.stringify(dockClick, null, 2));
console.log('dock clicks', dockClick);

// Extension tabs
await page.evaluate(() => window.scrollTo(0, 3400));
await page.waitForTimeout(500);
const extTabs = await page.evaluate(async () => {
  const cats = [...document.querySelectorAll('[class*="ExtensionHighlight_category"]')];
  const out = [];
  for (const cat of cats) {
    cat.click();
    await new Promise(r => setTimeout(r, 350));
    const reel = document.querySelector('[class*="ExtensionHighlight_reel"]');
    out.push({
      tab: cat.innerText.trim(),
      reelTransition: reel ? getComputedStyle(reel).transition : null,
      reelTransform: reel ? getComputedStyle(reel).transform : null,
      cards: [...document.querySelectorAll('[class*="ExtensionCard_card"]')].slice(0,4).map(c => c.innerText.slice(0,60)),
    });
  }
  return out;
});
fs.writeFileSync(`${OUT}/ext-tabs.json`, JSON.stringify(extTabs, null, 2));
console.log('ext tabs', extTabs.map(t => t.tab));

// CommandYourTime / keyboard animation
await page.evaluate(() => window.scrollTo(0, 13200));
await page.waitForTimeout(1000);
const keyboard = await page.evaluate(() => {
  const kb = document.querySelector('[class*="AnimatedCmd"], [class*="CommandYourTime"], [class*="Keyboard"]');
  if (!kb) return null;
  const keys = [...kb.querySelectorAll('[class*="key"], [class*="Key"], button, span')].slice(0, 30).map(el => ({
    classes: (el.className||'').toString().slice(0,80),
    text: (el.innerText||'').slice(0,10),
    animation: getComputedStyle(el).animation,
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
  }));
  return {
    classes: kb.className?.toString().slice(0,120),
    animation: getComputedStyle(kb).animation,
    keys,
    htmlSnippet: kb.innerHTML.slice(0, 1500),
  };
});
fs.writeFileSync(`${OUT}/keyboard-anim.json`, JSON.stringify(keyboard, null, 2));
console.log('keyboard', keyboard?.classes, 'keys sample', keyboard?.keys?.slice(0,5));

// Capture canvas frames as images for reverse engineering
const canvasFrames = await page.evaluate(() => {
  const c = document.querySelector('[class*="page_hero"] canvas, canvas');
  if (!c) return null;
  try {
    return c.toDataURL('image/png').slice(0, 100) + '...len=' + c.toDataURL('image/png').length;
  } catch (e) {
    return 'tainted or error: ' + e.message;
  }
});
console.log('canvas frame', canvasFrames);

// Look at hero canvas drawing - check parent for webgl
const heroTech = await page.evaluate(() => {
  const hero = document.querySelector('[class*="page_hero"]');
  const canvas = hero?.querySelector('canvas');
  let gl = null;
  if (canvas) {
    try {
      gl = !!(canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('experimental-webgl'));
    } catch {}
    // already has context - check attributes
  }
  return {
    canvasAttrs: canvas ? { width: canvas.width, height: canvas.height, className: canvas.className } : null,
    hasWebGL: gl,
    heroHTML: hero?.innerHTML?.slice(0, 2000),
  };
});
fs.writeFileSync(`${OUT}/hero-tech.json`, JSON.stringify(heroTech, null, 2));
console.log('hero tech', heroTech.canvasAttrs, 'webgl probe', heroTech.hasWebGL);

await browser.close();
console.log('done');
