import { chromium } from "playwright";
import { writeFileSync, mkdirSync, createWriteStream, existsSync } from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import https from "https";
import http from "http";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "docs/research/gabinetpomorska.pl/pages");
const IMG_DIR = join(ROOT, "public/images/gabinetpomorska");

const PAGES = [
  { slug: "specjalisci", url: "https://www.gabinetpomorska.pl/specjalisci/" },
  { slug: "oferta", url: "https://www.gabinetpomorska.pl/oferta/" },
  { slug: "cennik", url: "https://www.gabinetpomorska.pl/cennik/" },
  { slug: "kontakt", url: "https://gabinetpomorska.pl/index.php/kontakt/" },
  { slug: "diagnostyka-dzieci-i-mlodziezy", url: "https://www.gabinetpomorska.pl/diagnostyka-dzieci-i-mlodziezy/" },
  { slug: "diagnostyka-doroslych", url: "https://www.gabinetpomorska.pl/diagnostyka-doroslych/" },
  {
    slug: "leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny",
    url: "https://www.gabinetpomorska.pl/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny/",
  },
  { slug: "leczenie-i-wsparcie-doroslych", url: "https://www.gabinetpomorska.pl/leczenie-i-wsparcie-doroslych/" },
  { slug: "terapia-par", url: "https://www.gabinetpomorska.pl/terapia-par" },
];

const EXTRACT = `
(() => {
  function clean(text) {
    return text?.replace(/\\s+/g, " ").trim() || "";
  }

  const root =
    document.querySelector("main .entry-content") ||
    document.querySelector("main article") ||
    document.querySelector(".entry-content") ||
    document.querySelector("main") ||
    document.querySelector("#content") ||
    document.body;

  const blocks = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      const tag = node.tagName;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG"].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (node.closest("header, footer, nav")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const seen = new Set();
  while (walker.nextNode()) {
    const el = walker.currentNode;
    const tag = el.tagName.toLowerCase();
    if (!["h1", "h2", "h3", "h4", "p", "ul", "ol", "figure", "img"].includes(tag)) continue;
    if (el.closest("ul, ol") && tag === "li") continue;
    if (tag === "img" && el.closest("figure")) continue;

    const key = tag + ":" + clean(el.textContent).slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);

    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4") {
      blocks.push({ type: "heading", level: Number(tag[1]), text: clean(el.textContent) });
    } else if (tag === "p") {
      const text = clean(el.textContent);
      if (text.length > 2) blocks.push({ type: "paragraph", text });
    } else if (tag === "ul" || tag === "ol") {
      const items = [...el.querySelectorAll(":scope > li")].map((li) => clean(li.textContent)).filter(Boolean);
      if (items.length) blocks.push({ type: tag === "ol" ? "ordered-list" : "list", items });
    } else if (tag === "img") {
      blocks.push({ type: "image", src: el.src, alt: el.alt || "" });
    } else if (tag === "figure") {
      const img = el.querySelector("img");
      if (img) blocks.push({ type: "image", src: img.src, alt: img.alt || "" });
    }
  }

  const specialists = [...root.querySelectorAll("[id]")].filter((el) => {
    const id = el.id;
    return id && el.querySelector("h3, h2") && (el.querySelector("img") || el.textContent.length > 200);
  }).map((el) => {
    const name = clean(el.querySelector("h2, h3")?.textContent);
    const role = clean(el.querySelector("h4, h5, .role, em, strong")?.textContent);
    const img = el.querySelector("img");
    const paragraphs = [...el.querySelectorAll("p")].map((p) => clean(p.textContent)).filter((t) => t.length > 20);
    const lists = [...el.querySelectorAll("ul")].map((ul) =>
      [...ul.querySelectorAll("li")].map((li) => clean(li.textContent)).filter(Boolean)
    );
    return { id: el.id, name, role, image: img?.src || null, paragraphs, lists };
  });

  const priceTables = [...root.querySelectorAll("table, .elementor-price-table, [class*='price']")].length;

  const pricingRows = [];
  for (const row of root.querySelectorAll("tr, [class*='price-list'] li, .elementor-widget-container li")) {
    const text = clean(row.textContent);
    const priceMatch = text.match(/(\\d+[\\s,.]?\\d*\\s*zł|\\d+[\\s,.]?\\d*\\s*gr)/i);
    if (priceMatch && text.length < 300) {
      pricingRows.push(text);
    }
  }

  const faq = [];
  const faqHeadings = [...root.querySelectorAll("h2, h3, h4")].filter((h) =>
    h.textContent.includes("?") || h.textContent.toLowerCase().includes("pytania")
  );
  for (const h of faqHeadings) {
    let answer = "";
    let sib = h.nextElementSibling;
    while (sib && !["H1", "H2", "H3"].includes(sib.tagName)) {
      answer += clean(sib.textContent) + " ";
      sib = sib.nextElementSibling;
    }
    if (answer.trim()) faq.push({ question: clean(h.textContent), answer: answer.trim() });
  }

  const images = [...root.querySelectorAll("img")].map((img) => ({
    src: img.src,
    alt: img.alt || "",
  }));

  return {
    title: document.title,
    metaDescription: document.querySelector('meta[name="description"]')?.content || "",
    h1: clean(document.querySelector("h1")?.textContent),
    blocks: blocks.slice(0, 120),
    specialists,
    pricingRows: [...new Set(pricingRows)].slice(0, 80),
    faq,
    images,
    hasPriceTables: priceTables > 0,
  };
})()
`;

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) {
      resolve(dest);
      return;
    }
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadFile(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(dest);
        });
      })
      .on("error", reject);
  });
}

function localImageName(url) {
  const ext = extname(new URL(url).pathname) || ".jpg";
  const hash = createHash("md5").update(url).digest("hex").slice(0, 10);
  const base = new URL(url).pathname.split("/").pop()?.replace(ext, "") || "img";
  return `${base.slice(0, 40)}-${hash}${ext.split("?")[0]}`;
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(IMG_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const allPages = {};

  for (const { slug, url } of PAGES) {
    console.log("Scraping", slug);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2000);

    const data = await page.evaluate(EXTRACT);

    for (const img of data.images) {
      if (!img.src || img.src.startsWith("data:")) continue;
      try {
        const filename = localImageName(img.src);
        const localPath = `/images/gabinetpomorska/${filename}`;
        await downloadFile(img.src, join(IMG_DIR, filename));
        img.local = localPath;
      } catch (e) {
        console.warn("  image fail:", img.src, e.message);
      }
    }

    for (const spec of data.specialists) {
      if (!spec.image) continue;
      try {
        const filename = localImageName(spec.image);
        const localPath = `/images/gabinetpomorska/${filename}`;
        await downloadFile(spec.image, join(IMG_DIR, filename));
        spec.localImage = localPath;
      } catch {
        /* keep remote */
      }
    }

    for (const block of data.blocks) {
      if (block.type === "image" && block.src) {
        const found = data.images.find((i) => i.src === block.src);
        if (found?.local) block.local = found.local;
      }
    }

    allPages[slug] = { slug, url, ...data };
    writeFileSync(join(OUT, `${slug}.json`), JSON.stringify(allPages[slug], null, 2));
  }

  writeFileSync(join(OUT, "all-pages.json"), JSON.stringify(allPages, null, 2));
  await browser.close();
  console.log("Done. Pages:", Object.keys(allPages).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
