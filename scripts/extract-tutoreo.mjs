import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = {
  refs: "docs/design-references/tutoreo.pl",
  research: "docs/research/tutoreo.pl",
  public: "public",
};

for (const d of Object.values(OUT)) {
  fs.mkdirSync(d, { recursive: true });
}

const props = [
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "letterSpacing",
  "color",
  "textTransform",
  "textDecoration",
  "backgroundColor",
  "background",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "width",
  "height",
  "maxWidth",
  "minWidth",
  "maxHeight",
  "minHeight",
  "display",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "gap",
  "gridTemplateColumns",
  "gridTemplateRows",
  "borderRadius",
  "border",
  "borderTop",
  "borderBottom",
  "borderLeft",
  "borderRight",
  "boxShadow",
  "overflow",
  "overflowX",
  "overflowY",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "opacity",
  "transform",
  "transition",
  "cursor",
  "objectFit",
  "objectPosition",
  "mixBlendMode",
  "filter",
  "backdropFilter",
  "whiteSpace",
  "textOverflow",
  "WebkitLineClamp",
];

async function extractTree(page, selector) {
  return page.evaluate(
    ({ selector, props }) => {
      const el = document.querySelector(selector);
      if (!el) return { error: "Element not found: " + selector };

      function extractStyles(element) {
        const cs = getComputedStyle(element);
        const styles = {};
        props.forEach((p) => {
          const v = cs[p];
          if (
            v &&
            v !== "none" &&
            v !== "normal" &&
            v !== "auto" &&
            v !== "0px" &&
            v !== "rgba(0, 0, 0, 0)" &&
            v !== "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
          ) {
            styles[p] = v;
          }
        });
        return styles;
      }

      function walk(element, depth) {
        if (depth > 5) return null;
        const children = [...element.children];
        return {
          tag: element.tagName.toLowerCase(),
          id: element.id || null,
          classes: element.className?.toString().split(" ").slice(0, 8).join(" "),
          text:
            element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
              ? element.textContent.trim().slice(0, 300)
              : null,
          ownText: [...element.childNodes]
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent.trim())
            .filter(Boolean)
            .join(" ")
            .slice(0, 300),
          styles: extractStyles(element),
          images:
            element.tagName === "IMG" || element.tagName === "VIDEO"
              ? {
                  src: element.currentSrc || element.src,
                  alt: element.alt,
                  naturalWidth: element.naturalWidth,
                  naturalHeight: element.naturalHeight,
                }
              : null,
          href: element.tagName === "A" ? element.href : null,
          childCount: children.length,
          children: children.slice(0, 30).map((c) => walk(c, depth + 1)).filter(Boolean),
        };
      }

      return walk(el, 0);
    },
    { selector, props }
  );
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  // --- Desktop recon ---
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto("https://tutoreo.pl", { waitUntil: "networkidle", timeout: 60000 });
  await desktop.waitForTimeout(2000);

  // Cookie / overlay dismiss if any
  const cookieBtn = desktop.locator("button:has-text('Akceptuj'), button:has-text('Accept'), button:has-text('Zgadzam')");
  if ((await cookieBtn.count()) > 0) {
    await cookieBtn.first().click().catch(() => {});
  }

  const pageInfo = await desktop.evaluate(() => {
    const sections = [...document.querySelectorAll("section, [id], app-landing-page > *, main > *")]
      .filter((el) => el.id || el.tagName === "SECTION")
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        id: el.id,
        classes: el.className?.toString().slice(0, 120),
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        height: Math.round(el.getBoundingClientRect().height),
        textPreview: el.textContent?.trim().slice(0, 120),
      }));

    const uniqueSections = [];
    const seen = new Set();
    for (const s of sections) {
      const key = s.id || s.tag + s.top;
      if (seen.has(key)) continue;
      seen.add(key);
      if (s.height > 40) uniqueSections.push(s);
    }

    return {
      title: document.title,
      url: location.href,
      bodyText: document.body.innerText.slice(0, 15000),
      htmlStructure: document.querySelector("app-root")?.innerHTML?.slice(0, 500) || "",
      rootChildren: [...(document.querySelector("app-root")?.children || [])].map((c) => ({
        tag: c.tagName.toLowerCase(),
        id: c.id,
        classes: c.className?.toString().slice(0, 100),
      })),
      allIds: [...document.querySelectorAll("[id]")].map((el) => ({
        id: el.id,
        tag: el.tagName.toLowerCase(),
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        height: Math.round(el.getBoundingClientRect().height),
      })),
      sections: uniqueSections,
      cssVars: (() => {
        const cs = getComputedStyle(document.documentElement);
        const vars = {};
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.selectorText === ":root") {
                for (const prop of rule.style) {
                  if (prop.startsWith("--") && !prop.startsWith("--mat-")) {
                    vars[prop] = rule.style.getPropertyValue(prop).trim();
                  }
                }
              }
            }
          } catch {}
        }
        // Also read known ones
        [
          "--AccentColor",
          "--AccentColor1",
          "--AccentColor2",
          "--RegularBackground",
          "--TonedBackground",
          "--RegularFont",
          "--FontSize1",
          "--FontSize2",
          "--FontSize3",
          "--Spacer_Big",
          "--Spacer_Medium",
          "--Spacer_Small",
          "--BorderRadius1",
          "--BorderRadius2",
          "--NavbarHeight",
        ].forEach((v) => {
          vars[v] = cs.getPropertyValue(v).trim() || vars[v];
        });
        return vars;
      })(),
      fonts: [...new Set([...document.querySelectorAll("*")].slice(0, 300).map((el) => getComputedStyle(el).fontFamily))],
      images: [...document.querySelectorAll("img")].map((img) => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        parentClasses: img.parentElement?.className?.toString().slice(0, 80),
        position: getComputedStyle(img).position,
      })),
      videos: [...document.querySelectorAll("video")].map((v) => ({
        src: v.src || v.querySelector("source")?.src,
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop,
        muted: v.muted,
      })),
      backgroundImages: [...document.querySelectorAll("*")]
        .filter((el) => {
          const bg = getComputedStyle(el).backgroundImage;
          return bg && bg !== "none";
        })
        .slice(0, 80)
        .map((el) => ({
          url: getComputedStyle(el).backgroundImage,
          element: el.tagName + (el.id ? "#" + el.id : "") + "." + (el.className?.toString().split(" ")[0] || ""),
        })),
      svgs: [...document.querySelectorAll("svg")].slice(0, 40).map((svg) => ({
        parent: svg.parentElement?.tagName + (svg.parentElement?.id ? "#" + svg.parentElement.id : ""),
        viewBox: svg.getAttribute("viewBox"),
        width: svg.getAttribute("width") || getComputedStyle(svg).width,
        height: svg.getAttribute("height") || getComputedStyle(svg).height,
        outerHTML: svg.outerHTML.slice(0, 500),
      })),
      links: [...document.querySelectorAll("a")].map((a) => ({
        text: a.textContent.trim().slice(0, 80),
        href: a.href,
      })),
      buttons: [...document.querySelectorAll("button, [role=button], a.Standard, .SoftCTAButton, .HardCTAButton")].map(
        (b) => ({
          text: b.textContent.trim().slice(0, 80),
          classes: b.className?.toString().slice(0, 100),
          id: b.id,
        })
      ),
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({
        href: l.href,
        sizes: l.sizes?.toString(),
      })),
    };
  });

  fs.writeFileSync(path.join(OUT.research, "page-info.json"), JSON.stringify(pageInfo, null, 2));

  // Full page screenshot desktop
  await desktop.screenshot({
    path: path.join(OUT.refs, "desktop-full.png"),
    fullPage: true,
  });
  await desktop.screenshot({
    path: path.join(OUT.refs, "desktop-hero.png"),
    fullPage: false,
  });

  // Scroll sweep - capture at intervals
  const scrollHeight = await desktop.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(scrollHeight / 800);
  const scrollObservations = [];
  for (let i = 0; i <= steps; i++) {
    const y = Math.min(i * 800, scrollHeight);
    await desktop.evaluate((yy) => window.scrollTo(0, yy), y);
    await desktop.waitForTimeout(400);
    const obs = await desktop.evaluate((yy) => {
      const nav = document.querySelector("nav, header, #Navbar, .Navbar, app-navbar");
      return {
        scrollY: yy,
        navClasses: nav?.className?.toString(),
        navBg: nav ? getComputedStyle(nav).backgroundColor : null,
        navHeight: nav ? getComputedStyle(nav).height : null,
        navShadow: nav ? getComputedStyle(nav).boxShadow : null,
        stickyElements: [...document.querySelectorAll("*")]
          .filter((el) => {
            const p = getComputedStyle(el).position;
            return p === "sticky" || p === "fixed";
          })
          .slice(0, 15)
          .map((el) => ({
            tag: el.tagName,
            id: el.id,
            classes: el.className?.toString().slice(0, 80),
            position: getComputedStyle(el).position,
            top: getComputedStyle(el).top,
            zIndex: getComputedStyle(el).zIndex,
          })),
      };
    }, y);
    scrollObservations.push(obs);
    await desktop.screenshot({
      path: path.join(OUT.refs, `desktop-scroll-${String(i).padStart(2, "0")}.png`),
    });
  }
  fs.writeFileSync(
    path.join(OUT.research, "scroll-observations.json"),
    JSON.stringify(scrollObservations, null, 2)
  );

  // Reset scroll
  await desktop.evaluate(() => window.scrollTo(0, 0));
  await desktop.waitForTimeout(500);

  // Extract trees for major containers
  const selectors = await desktop.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map((el) => "#" + CSS.escape(el.id));
    const tags = [
      "app-landing-page",
      "app-navbar",
      "app-footer",
      "header",
      "nav",
      "footer",
      "main",
    ];
    return [...new Set([...tags, ...ids])].filter((s) => document.querySelector(s));
  });

  const trees = {};
  for (const sel of selectors) {
    try {
      trees[sel] = await extractTree(desktop, sel);
    } catch (e) {
      trees[sel] = { error: String(e) };
    }
  }
  fs.writeFileSync(path.join(OUT.research, "dom-trees.json"), JSON.stringify(trees, null, 2));

  // Click FAQ items and capture states
  const faqStates = [];
  const faqButtons = desktop.locator("#FAQSection button, #FAQSection [class*='FAQ'], #FAQSection .Question, #FAQSection h3, #FAQSection [role=button]");
  const faqCount = await faqButtons.count();
  for (let i = 0; i < Math.min(faqCount, 12); i++) {
    const btn = faqButtons.nth(i);
    const label = await btn.textContent().catch(() => "");
    await btn.click().catch(() => {});
    await desktop.waitForTimeout(400);
    const state = await desktop.evaluate(() => {
      const faq = document.querySelector("#FAQSection");
      return faq
        ? {
            text: faq.innerText.slice(0, 3000),
            html: faq.innerHTML.slice(0, 5000),
          }
        : null;
    });
    faqStates.push({ index: i, label: label?.trim().slice(0, 100), state });
  }
  fs.writeFileSync(path.join(OUT.research, "faq-states.json"), JSON.stringify(faqStates, null, 2));

  // Role picker / CTA interactions
  const pickStudent = desktop.locator("#PickStudent, [id*='Student'], img[src*='PickStudent']").first();
  const pickTutor = desktop.locator("#PickTutor, [id*='Tutor'], img[src*='PickTutor']").first();
  if ((await pickStudent.count()) > 0) {
    await pickStudent.hover().catch(() => {});
    await desktop.waitForTimeout(300);
    await desktop.screenshot({ path: path.join(OUT.refs, "hover-pick-student.png") });
  }
  if ((await pickTutor.count()) > 0) {
    await pickTutor.hover().catch(() => {});
    await desktop.waitForTimeout(300);
    await desktop.screenshot({ path: path.join(OUT.refs, "hover-pick-tutor.png") });
  }

  // Collect all network assets from page
  const assetUrls = await desktop.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll("img, video, source, link[rel*='icon']").forEach((el) => {
      const src = el.src || el.href || el.currentSrc;
      if (src) urls.add(src);
    });
    [...document.querySelectorAll("*")].forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      const m = bg?.match(/url\(["']?([^"')]+)["']?\)/g);
      if (m) {
        m.forEach((u) => {
          const cleaned = u.replace(/^url\(["']?/, "").replace(/["']?\)$/, "");
          if (cleaned.startsWith("http") || cleaned.startsWith("/")) urls.add(cleaned);
        });
      }
    });
    return [...urls];
  });
  fs.writeFileSync(path.join(OUT.research, "asset-urls.json"), JSON.stringify(assetUrls, null, 2));

  // Mobile viewport
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("https://tutoreo.pl", { waitUntil: "networkidle", timeout: 60000 });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({
    path: path.join(OUT.refs, "mobile-full.png"),
    fullPage: true,
  });
  await mobile.screenshot({
    path: path.join(OUT.refs, "mobile-hero.png"),
    fullPage: false,
  });

  // Hamburger menu if present
  const menuBtn = mobile.locator("button, [class*='Menu'], [class*='Hamburger'], #MenuButton").first();
  if ((await menuBtn.count()) > 0) {
    await menuBtn.click().catch(() => {});
    await mobile.waitForTimeout(500);
    await mobile.screenshot({ path: path.join(OUT.refs, "mobile-menu-open.png") });
  }

  const mobileInfo = await mobile.evaluate(() => ({
    bodyText: document.body.innerText.slice(0, 8000),
    allIds: [...document.querySelectorAll("[id]")].map((el) => ({
      id: el.id,
      top: Math.round(el.getBoundingClientRect().top + window.scrollY),
      height: Math.round(el.getBoundingClientRect().height),
      width: Math.round(el.getBoundingClientRect().width),
    })),
  }));
  fs.writeFileSync(path.join(OUT.research, "mobile-info.json"), JSON.stringify(mobileInfo, null, 2));

  // Tablet
  const tablet = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tablet.goto("https://tutoreo.pl", { waitUntil: "networkidle", timeout: 60000 });
  await tablet.waitForTimeout(1500);
  await tablet.screenshot({
    path: path.join(OUT.refs, "tablet-full.png"),
    fullPage: true,
  });

  // Full HTML dump of rendered landing
  const renderedHtml = await desktop.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync(path.join(OUT.research, "rendered.html"), renderedHtml);

  await browser.close();
  console.log("Extraction complete");
  console.log("Sections/IDs:", pageInfo.allIds.map((x) => x.id).join(", "));
  console.log("Images:", pageInfo.images.length);
  console.log("Videos:", pageInfo.videos.length);
  console.log("Scroll height approx:", scrollHeight);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
