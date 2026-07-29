import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "docs/research/korepetycje-pro");
const SHOTS = path.join(ROOT, "docs/design-references/korepetycje-pro");
const ASSETS = path.join(ROOT, "public/images");
const SEO = path.join(ROOT, "public/seo");

for (const d of [OUT, SHOTS, ASSETS, SEO]) fs.mkdirSync(d, { recursive: true });

const URL = "https://korepetycje-pro.pl/";

async function download(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    return true;
  } catch (e) {
    console.warn("download fail", url, e.message);
    return false;
  }
}

function slugFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const base = path.basename(p) || "asset";
    return base.replace(/[^a-zA-Z0-9._-]/g, "_");
  } catch {
    return "asset";
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

console.log("Navigating...");
await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(2000);

// Dismiss cookie banners if any
try {
  const cookie = page.locator('button:has-text("Akceptuj"), button:has-text("Accept"), .cookie-accept, #cookie-accept').first();
  if (await cookie.isVisible({ timeout: 1500 })) await cookie.click();
} catch {}

// Full page desktop screenshot
console.log("Desktop full screenshot...");
await page.screenshot({
  path: path.join(SHOTS, "desktop-full.png"),
  fullPage: true,
});

// Global extraction
const globalData = await page.evaluate(() => {
  const props = [
    "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "color",
    "textTransform", "backgroundColor", "background", "padding", "margin",
    "width", "height", "maxWidth", "display", "flexDirection", "justifyContent",
    "alignItems", "gap", "gridTemplateColumns", "borderRadius", "border",
    "boxShadow", "position", "top", "opacity", "transform", "transition",
    "objectFit", "backdropFilter", "overflow",
  ];

  function extractStyles(el) {
    const cs = getComputedStyle(el);
    const styles = {};
    props.forEach((p) => {
      const v = cs[p];
      if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)")
        styles[p] = v;
    });
    return styles;
  }

  // Sections: Elementor sections
  const sections = [...document.querySelectorAll(".elementor-section, section, [data-element_type='section']")]
    .filter((el) => el.offsetHeight > 50)
    .map((el, i) => {
      const id = el.id || el.getAttribute("data-id") || `section-${i}`;
      const rect = el.getBoundingClientRect();
      const heading = el.querySelector("h1,h2,h3")?.textContent?.trim()?.slice(0, 80) || "";
      return {
        index: i,
        id,
        classes: el.className?.toString().slice(0, 200),
        heading,
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        background: getComputedStyle(el).background,
        backgroundColor: getComputedStyle(el).backgroundColor,
        backgroundImage: getComputedStyle(el).backgroundImage,
        text: el.innerText?.slice(0, 500),
      };
    });

  // Nav
  const nav = document.querySelector("header, .elementor-location-header, nav");
  const navLinks = [...document.querySelectorAll("a")].filter((a) => {
    const href = a.getAttribute("href") || "";
    return href.startsWith("#") || href.includes("korepetycje-pro");
  }).map((a) => ({
    text: a.textContent.trim(),
    href: a.getAttribute("href"),
    styles: extractStyles(a),
  }));

  // Fonts
  const fonts = [...new Set(
    [...document.querySelectorAll("*")].slice(0, 400).map((el) => getComputedStyle(el).fontFamily)
  )];

  // Font links
  const fontLinks = [...document.querySelectorAll('link[href*="font"], link[href*="googleapis"]')].map(
    (l) => l.href
  );

  // Colors from CSS vars and key elements
  const rootStyles = getComputedStyle(document.documentElement);
  const cssVars = {};
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ":root" || rule.selectorText === "body") {
          for (const prop of rule.style) {
            if (prop.startsWith("--")) cssVars[prop] = rule.style.getPropertyValue(prop).trim();
          }
        }
      }
    } catch {}
  }

  // Images
  const images = [...document.querySelectorAll("img")].map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    classes: img.className?.toString().slice(0, 100),
  }));

  // Background images
  const bgImages = [...document.querySelectorAll("*")]
    .filter((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== "none" && bg.includes("url");
    })
    .slice(0, 50)
    .map((el) => ({
      url: getComputedStyle(el).backgroundImage,
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 80),
    }));

  // Videos
  const videos = [...document.querySelectorAll("video")].map((v) => ({
    src: v.src || v.querySelector("source")?.src,
    poster: v.poster,
  }));

  // Animations / Elementor animation classes
  const animated = [...document.querySelectorAll("[class*='animated'], [class*='animation'], [data-settings*='animation'], .elementor-invisible, [class*='fade'], [class*='slide'], [class*='zoom']")]
    .slice(0, 100)
    .map((el) => ({
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 200),
      dataSettings: el.getAttribute("data-settings"),
      animation: getComputedStyle(el).animation,
      transition: getComputedStyle(el).transition,
      transform: getComputedStyle(el).transform,
      opacity: getComputedStyle(el).opacity,
    }));

  // Keyframes from stylesheets
  const keyframes = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.type === CSSRule.KEYFRAMES_RULE || rule.name) {
          if (rule.cssText && rule.cssText.includes("@keyframes")) {
            keyframes.push(rule.cssText.slice(0, 500));
          }
        }
      }
    } catch {}
  }

  // Favicons
  const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({
    href: l.href,
    sizes: l.sizes?.toString(),
    rel: l.rel,
  }));

  // Meta
  const meta = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
  };

  // Header styles
  const header = document.querySelector("header, .elementor-location-header, .ehf-header");
  const headerStyles = header ? extractStyles(header) : null;
  const headerHTML = header?.outerHTML?.slice(0, 5000);

  // Body / html
  const bodyStyles = extractStyles(document.body);
  const htmlStyles = extractStyles(document.documentElement);

  // Pricing elements
  const prices = [...document.querySelectorAll("*")]
    .filter((el) => /zł|PLN|cennik|cena/i.test(el.textContent || "") && el.children.length < 5)
    .slice(0, 30)
    .map((el) => ({
      text: el.textContent.trim().slice(0, 100),
      tag: el.tagName,
      classes: el.className?.toString().slice(0, 100),
      html: el.innerHTML.slice(0, 200),
    }));

  // Form fields
  const forms = [...document.querySelectorAll("form")].map((f) => ({
    id: f.id,
    action: f.action,
    method: f.method,
    fields: [...f.querySelectorAll("input, textarea, select, button")].map((inp) => ({
      type: inp.type,
      name: inp.name,
      placeholder: inp.placeholder,
      label: inp.labels?.[0]?.textContent || inp.getAttribute("aria-label"),
      required: inp.required,
    })),
  }));

  // SVG count and sample
  const svgs = [...document.querySelectorAll("svg")].slice(0, 30).map((svg, i) => ({
    index: i,
    viewBox: svg.getAttribute("viewBox"),
    width: svg.getAttribute("width") || getComputedStyle(svg).width,
    height: svg.getAttribute("height") || getComputedStyle(svg).height,
    outer: svg.outerHTML.slice(0, 800),
    parentClasses: svg.parentElement?.className?.toString().slice(0, 80),
  }));

  // Smooth scroll / lenis
  const hasLenis = !!document.querySelector(".lenis");
  const scrollBehavior = getComputedStyle(document.documentElement).scrollBehavior;

  // Elementor motion effects data
  const motionWidgets = [...document.querySelectorAll("[data-settings]")]
    .map((el) => {
      try {
        const s = JSON.parse(el.getAttribute("data-settings") || "{}");
        if (s._animation || s.animation || s.motion_fx_motion_fx_scrolling || s.sticky)
          return { classes: el.className?.toString().slice(0, 100), settings: s };
      } catch {}
      return null;
    })
    .filter(Boolean)
    .slice(0, 80);

  return {
    sections,
    navLinks: navLinks.slice(0, 40),
    fonts,
    fontLinks,
    cssVars,
    images,
    bgImages,
    videos,
    animated,
    keyframes: keyframes.slice(0, 40),
    favicons,
    meta,
    headerStyles,
    headerHTML,
    bodyStyles,
    htmlStyles,
    prices,
    forms,
    svgs,
    hasLenis,
    scrollBehavior,
    motionWidgets,
    sectionCount: sections.length,
  };
});

fs.writeFileSync(path.join(OUT, "global-extract.json"), JSON.stringify(globalData, null, 2));
console.log("Sections:", globalData.sectionCount);
console.log("Images:", globalData.images.length);
console.log("Fonts:", globalData.fonts);
console.log("Meta:", globalData.meta);

// Section screenshots at desktop
console.log("Section screenshots...");
for (const sec of globalData.sections) {
  await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 80)), sec.top);
  await page.waitForTimeout(400);
  const name = `section-${String(sec.index).padStart(2, "0")}-${(sec.heading || sec.id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .slice(0, 40)}.png`;
  await page.screenshot({
    path: path.join(SHOTS, name),
    fullPage: false,
  });
}

// Extract detailed styles per major section by scrolling
const sectionDetails = [];
for (const sec of globalData.sections.filter((s) => s.height > 100).slice(0, 20)) {
  await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 40)), sec.top);
  await page.waitForTimeout(600); // let animations fire
  const detail = await page.evaluate((idx) => {
    const sections = [...document.querySelectorAll(".elementor-section, section, [data-element_type='section']")]
      .filter((el) => el.offsetHeight > 50);
    const el = sections[idx];
    if (!el) return null;

    const props = [
      "fontSize", "fontWeight", "fontFamily", "lineHeight", "letterSpacing", "color",
      "textTransform", "backgroundColor", "background", "padding", "paddingTop",
      "paddingBottom", "paddingLeft", "paddingRight", "margin", "width", "height",
      "maxWidth", "display", "flexDirection", "justifyContent", "alignItems", "gap",
      "gridTemplateColumns", "borderRadius", "border", "boxShadow", "position",
      "opacity", "transform", "transition", "objectFit", "overflow", "textAlign",
    ];

    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach((p) => {
        const v = cs[p];
        if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)")
          styles[p] = v;
      });
      return styles;
    }

    function walk(element, depth) {
      if (depth > 3) return null;
      const children = [...element.children];
      return {
        tag: element.tagName.toLowerCase(),
        classes: element.className?.toString().split(" ").slice(0, 6).join(" "),
        text:
          element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
            ? element.textContent.trim().slice(0, 200)
            : null,
        styles: extractStyles(element),
        images:
          element.tagName === "IMG"
            ? { src: element.src, alt: element.alt, w: element.naturalWidth, h: element.naturalHeight }
            : null,
        childCount: children.length,
        children: children.slice(0, 15).map((c) => walk(c, depth + 1)).filter(Boolean),
      };
    }

    return {
      index: idx,
      id: el.id,
      fullText: el.innerText?.slice(0, 2000),
      tree: walk(el, 0),
    };
  }, sec.index);
  if (detail) sectionDetails.push(detail);
}
fs.writeFileSync(path.join(OUT, "section-details.json"), JSON.stringify(sectionDetails, null, 2));

// Scroll behavior: capture header at 0 and after scroll
const headerAt0 = await page.evaluate(() => {
  window.scrollTo(0, 0);
  const h = document.querySelector("header, .elementor-location-header, .ehf-header, .elementor-sticky");
  if (!h) return null;
  const cs = getComputedStyle(h);
  return {
    backgroundColor: cs.backgroundColor,
    boxShadow: cs.boxShadow,
    height: cs.height,
    position: cs.position,
    opacity: cs.opacity,
    classes: h.className?.toString().slice(0, 200),
  };
});
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(500);
const headerAt400 = await page.evaluate(() => {
  const h = document.querySelector("header, .elementor-location-header, .ehf-header, .elementor-sticky, .elementor-sticky--effects");
  if (!h) return null;
  const cs = getComputedStyle(h);
  return {
    backgroundColor: cs.backgroundColor,
    boxShadow: cs.boxShadow,
    height: cs.height,
    position: cs.position,
    opacity: cs.opacity,
    classes: h.className?.toString().slice(0, 200),
  };
});
fs.writeFileSync(
  path.join(OUT, "header-scroll.json"),
  JSON.stringify({ headerAt0, headerAt400 }, null, 2)
);

// Hover states on CTAs
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
const ctaInfo = await page.evaluate(async () => {
  const btns = [...document.querySelectorAll("a.elementor-button, .elementor-button, a[href='#kontakt'], a[href='#oferta']")];
  const results = [];
  for (const btn of btns.slice(0, 6)) {
    const before = {
      color: getComputedStyle(btn).color,
      backgroundColor: getComputedStyle(btn).backgroundColor,
      border: getComputedStyle(btn).border,
      transform: getComputedStyle(btn).transform,
      boxShadow: getComputedStyle(btn).boxShadow,
      transition: getComputedStyle(btn).transition,
      text: btn.textContent.trim().slice(0, 60),
      classes: btn.className?.toString().slice(0, 120),
    };
    results.push({ before });
  }
  return results;
});
fs.writeFileSync(path.join(OUT, "cta-styles.json"), JSON.stringify(ctaInfo, null, 2));

// Mobile screenshots
console.log("Mobile screenshots...");
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(1500);
await page.screenshot({
  path: path.join(SHOTS, "mobile-full.png"),
  fullPage: true,
});
await page.screenshot({
  path: path.join(SHOTS, "mobile-hero.png"),
  fullPage: false,
});

// Tablet
await page.setViewportSize({ width: 768, height: 1024 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(1000);
await page.screenshot({
  path: path.join(SHOTS, "tablet-full.png"),
  fullPage: true,
});

// Download all images
console.log("Downloading assets...");
const allUrls = new Set();
for (const img of globalData.images) {
  if (img.src && img.src.startsWith("http")) allUrls.add(img.src);
}
for (const bg of globalData.bgImages) {
  const m = bg.url.match(/url\(["']?(https?:[^"')]+)/g);
  if (m) {
    for (const u of m) {
      const url = u.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
      if (url.startsWith("http")) allUrls.add(url);
    }
  }
}
for (const fav of globalData.favicons) {
  if (fav.href) allUrls.add(fav.href);
}
if (globalData.meta.ogImage) allUrls.add(globalData.meta.ogImage);

// Also known assets from sitemap
const known = [
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/1-8-KLASA-1.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/LICEUM.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/4.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/5.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/1.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/6-1.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/7.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/2.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/8.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/9.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/3.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/10.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/tlo-2.png",
  "http://korepetycje-pro.pl/wp-content/uploads/2026/07/logo-2.2.png",
];
known.forEach((u) => allUrls.add(u.replace("http://", "https://")));

const assetMap = {};
let i = 0;
for (const url of allUrls) {
  i++;
  const name = slugFromUrl(url);
  const isSeo =
    url.includes("cropped-") ||
    url.includes("favicon") ||
    url.includes("apple-touch") ||
    url.includes("og") ||
    (globalData.meta.ogImage && url === globalData.meta.ogImage);
  const dest = path.join(isSeo ? SEO : ASSETS, name);
  const ok = await download(url, dest);
  if (ok) assetMap[url] = isSeo ? `/seo/${name}` : `/images/${name}`;
  if (i % 5 === 0) console.log(`  downloaded ${i}/${allUrls.size}`);
}
fs.writeFileSync(path.join(OUT, "asset-map.json"), JSON.stringify(assetMap, null, 2));

// Get CSS from main stylesheets (colors, fonts)
const stylesheetUrls = await page.evaluate(() =>
  [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href)
);
fs.writeFileSync(path.join(OUT, "stylesheets.json"), JSON.stringify(stylesheetUrls, null, 2));

// Fetch Elementor CSS for custom colors
for (const sheetUrl of stylesheetUrls.filter(
  (u) => u.includes("elementor") || u.includes("post-") || u.includes("theme")
).slice(0, 8)) {
  try {
    const res = await fetch(sheetUrl);
    const text = await res.text();
    const name = slugFromUrl(sheetUrl).replace(/\?.*/, "") + ".css";
    fs.writeFileSync(path.join(OUT, "css-" + name), text.slice(0, 200000));
  } catch (e) {
    console.warn("css fetch fail", sheetUrl);
  }
}

// Pricing deep dive - look for data attributes / obfuscated prices
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
await page.evaluate(() => {
  const el = document.querySelector("#cennik, [id*='cennik']");
  if (el) el.scrollIntoView();
});
await page.waitForTimeout(1000);
await page.screenshot({ path: path.join(SHOTS, "pricing-section.png"), fullPage: false });

const pricingHTML = await page.evaluate(() => {
  const el =
    document.querySelector("#cennik") ||
    [...document.querySelectorAll(".elementor-section")].find((s) =>
      /cennik|ceny|zł/i.test(s.innerText)
    );
  return el ? el.innerHTML.slice(0, 15000) : null;
});
fs.writeFileSync(path.join(OUT, "pricing-html.html"), pricingHTML || "");

// About section photo
const aboutHTML = await page.evaluate(() => {
  const el =
    document.querySelector("#omnie") ||
    [...document.querySelectorAll(".elementor-section")].find((s) =>
      /Jestem studentką|O MNIE/i.test(s.innerText)
    );
  return {
    html: el?.innerHTML?.slice(0, 10000),
    text: el?.innerText?.slice(0, 2000),
    images: el
      ? [...el.querySelectorAll("img")].map((i) => ({ src: i.src, alt: i.alt }))
      : [],
  };
});
fs.writeFileSync(path.join(OUT, "about.json"), JSON.stringify(aboutHTML, null, 2));

// Full page HTML structure outline
const outline = await page.evaluate(() => {
  function outlineEl(el, depth) {
    if (depth > 2) return null;
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || undefined,
      classes: el.className?.toString?.().split(" ").filter((c) =>
        /elementor|section|container|header|footer|widget|heading|button/.test(c)
      ).slice(0, 8),
      children: [...el.children].slice(0, 20).map((c) => outlineEl(c, depth + 1)).filter(Boolean),
    };
  }
  return outlineEl(document.body, 0);
});
fs.writeFileSync(path.join(OUT, "dom-outline.json"), JSON.stringify(outline, null, 2));

// Desktop hero close-up
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);
await page.screenshot({ path: path.join(SHOTS, "desktop-hero.png"), fullPage: false });

await browser.close();
console.log("Done. Assets:", Object.keys(assetMap).length);
