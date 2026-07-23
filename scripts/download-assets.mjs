import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const OUT = "/workspace/public/images/raycast";
const SEO = "/workspace/public/seo";
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(`${OUT}/avatars`, { recursive: true });
fs.mkdirSync(`${OUT}/extensions`, { recursive: true });
fs.mkdirSync(`${OUT}/features`, { recursive: true });
fs.mkdirSync(`${OUT}/youtube`, { recursive: true });
fs.mkdirSync(SEO, { recursive: true });

const assets = JSON.parse(
  fs.readFileSync("/workspace/docs/research/raycast/assets.json", "utf8"),
);

function nameFromUrl(url) {
  try {
    const u = new URL(url);
    if (u.pathname.includes("/_next/image")) {
      const inner = u.searchParams.get("url");
      if (inner) {
        if (inner.startsWith("http")) {
          const iu = new URL(inner);
          return path.basename(iu.pathname);
        }
        const cleaned = decodeURIComponent(inner).replace(
          /^\/_next\/static\/media\//,
          "",
        );
        return cleaned.split("?")[0];
      }
    }
    if (u.hostname.includes("ytimg")) {
      const id = u.pathname.split("/")[2];
      return `yt-${id}.jpg`;
    }
    return path.basename(u.pathname).split("?")[0] || "asset.bin";
  } catch {
    return "asset.bin";
  }
}

const avatarHints = [
  "guillermo",
  "mkbhd",
  "adam",
  "wesbos",
  "steventey",
  "thekitze",
  "koen",
  "zach",
  "mxstbr",
  "pugson",
  "sulco",
  "reece",
  "ridd",
  "florn",
  "gavmn",
  "isabel",
  "iamneubert",
  "justansub",
  "mrncst",
  "upinthe",
  "webjac",
  "avstorm",
  "UltraLinx",
  "AdamWhitcroft",
];

const featureHints = [
  "feature",
  "clipboard",
  "emoji",
  "calculator",
  "file-search",
  "focus",
  "flight",
  "notes",
  "reminders",
  "schedule",
  "script",
  "screenshot",
  "translator",
  "window",
  "snippets",
  "quicklinks",
  "community",
  "isolated",
  "magic",
  "more-extensions",
  "notion",
  "wallpaper",
  "quick-ai",
  "command-",
  "dictionary",
  "calendar-extension",
  "raycast-package",
  "web-google",
  "web-duck",
  "mangos",
];

function destFor(url, name) {
  if (url.includes("ytimg")) return path.join(OUT, "youtube", name);
  if (url.includes("extension-cards") || url.includes("misc-assets")) {
    return path.join(OUT, "extensions", name);
  }
  const lower = name.toLowerCase();
  if (avatarHints.some((h) => lower.includes(h.toLowerCase()))) {
    return path.join(OUT, "avatars", name);
  }
  if (featureHints.some((h) => lower.includes(h))) {
    return path.join(OUT, "features", name);
  }
  return path.join(OUT, name);
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return { dest, skipped: true };
  }
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return { dest, size: buf.length };
}

const urls = [
  ...new Set(
    [
      ...assets.imgs.map((i) => i.src),
      ...assets.favicons,
      assets.og,
      "https://www.raycast.com/favicon-production.png",
      "https://www.raycast.com/_next/static/media/featureBackground.7492bde9.png",
      "https://www.raycast.com/_next/static/media/community-background.31147d7b.png",
      "https://www.raycast.com/_next/static/media/isolatedCube.0cfa31f6.png",
      "https://www.raycast.com/_next/static/media/snippets-blue-glass.3f8eb367.png",
      "https://www.raycast.com/_next/static/media/quicklinks-showcase.4179f21c.png",
    ].filter(Boolean),
  ),
];

const manifest = {};
const queue = [...urls];
let i = 0;
const concurrency = 6;

async function worker() {
  while (i < queue.length) {
    const idx = i++;
    const url = queue[idx];
    const name = nameFromUrl(url);
    let dest;
    if (url.includes("favicon") || url.includes("opengraph")) {
      dest = path.join(
        SEO,
        name.includes("opengraph") || url.includes("opengraph")
          ? "og-image.png"
          : "favicon.png",
      );
    } else {
      dest = destFor(url, name);
    }
    try {
      const r = await download(url, dest);
      manifest[url] = {
        local: dest.replace("/workspace/public", ""),
        ...r,
      };
      process.stdout.write(".");
    } catch (e) {
      manifest[url] = { error: String(e.message || e) };
      process.stdout.write("x");
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
fs.writeFileSync(
  "/workspace/docs/research/raycast/asset-manifest.json",
  JSON.stringify(manifest, null, 2),
);
console.log(
  "\nDownloaded",
  Object.values(manifest).filter((m) => m.local).length,
  "/",
  queue.length,
);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("https://www.raycast.com/", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await page.waitForTimeout(3000);

const svgs = await page.evaluate(() => {
  const nav = document.querySelector('[class*="Navbar"]');
  const logoSvg = nav?.querySelector("svg");
  const allImportant = [];
  if (logoSvg) allImportant.push({ name: "RaycastLogo", html: logoSvg.outerHTML });
  document.querySelectorAll("a, button").forEach((el) => {
    const t = (el.innerText || "").toLowerCase();
    if (t.includes("download") || t.includes("mac") || t.includes("windows")) {
      const svg = el.querySelector("svg");
      if (svg) {
        allImportant.push({
          name: "DownloadRelated_" + t.slice(0, 20).replace(/\s+/g, "_"),
          html: svg.outerHTML.slice(0, 2000),
        });
      }
    }
  });
  return allImportant;
});
fs.writeFileSync(
  "/workspace/docs/research/raycast/svgs.json",
  JSON.stringify(svgs, null, 2),
);

const heroBg = await page.evaluate(() => {
  const hero =
    document.querySelector('[class*="page_hero"]') ||
    document.querySelector("h1")?.closest("div");
  const layers = [];
  function walk(el, depth) {
    if (!el || depth > 6) return;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (
      cs.backgroundImage !== "none" ||
      cs.filter !== "none" ||
      (cs.background && cs.background.includes("gradient"))
    ) {
      layers.push({
        tag: el.tagName,
        classes: (el.className || "").toString().slice(0, 100),
        bg: cs.backgroundImage,
        background: cs.background.slice(0, 300),
        filter: cs.filter,
        opacity: cs.opacity,
        transform: cs.transform,
        position: cs.position,
        size: `${Math.round(r.width)}x${Math.round(r.height)}`,
        mixBlendMode: cs.mixBlendMode,
      });
    }
    [...el.children].slice(0, 10).forEach((c) => walk(c, depth + 1));
  }
  if (hero) walk(hero, 0);
  const media = [
    ...document.querySelectorAll(
      '[class*="page_hero"] canvas, [class*="page_hero"] video, [class*="page_hero"] img',
    ),
  ].map((el) => ({
    tag: el.tagName,
    classes: (el.className || "").toString().slice(0, 100),
    src: el.src || el.currentSrc,
  }));
  const candidates = [
    ...document.querySelectorAll(
      '[class*="hero"] *, [class*="Hero"] *, [class*="page_hero"] *',
    ),
  ]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 400 && r.height > 200;
    })
    .slice(0, 40)
    .map((el) => {
      const cs = getComputedStyle(el);
      return {
        classes: (el.className || "").toString().slice(0, 120),
        bg: cs.background.slice(0, 200),
        bgImage: cs.backgroundImage.slice(0, 200),
        filter: cs.filter,
        opacity: cs.opacity,
        size: `${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`,
        tag: el.tagName,
      };
    });
  return { layers, media, candidates };
});
fs.writeFileSync(
  "/workspace/docs/research/raycast/hero-bg.json",
  JSON.stringify(heroBg, null, 2),
);
console.log("Hero layers", heroBg.layers.length, "media", heroBg.media.length);
console.log("SVG count", svgs.length);
await browser.close();
