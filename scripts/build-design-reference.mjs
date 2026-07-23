import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = "docs/design-references/tutoreo.pl";
const SHOTS = path.join(OUT, "screenshots");
fs.mkdirSync(SHOTS, { recursive: true });

const LAYOUT_PROPS = [
  "display",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignContent",
  "gap",
  "rowGap",
  "columnGap",
  "gridTemplateColumns",
  "gridTemplateRows",
  "width",
  "height",
  "maxWidth",
  "minWidth",
  "maxHeight",
  "minHeight",
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
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "overflow",
  "overflowX",
  "overflowY",
  "objectFit",
  "objectPosition",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "borderRadius",
  "boxShadow",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "color",
  "textAlign",
  "whiteSpace",
  "opacity",
  "transform",
  "transition",
];

function pickStyles(cs) {
  const out = {};
  for (const p of LAYOUT_PROPS) {
    const v = cs[p];
    if (
      v &&
      v !== "none" &&
      v !== "normal" &&
      v !== "auto" &&
      v !== "0px" &&
      v !== "rgba(0, 0, 0, 0)" &&
      v !== "matrix(1, 0, 0, 1, 0, 0)"
    ) {
      out[p] = v;
    }
  }
  return out;
}

async function extractViewport(page, label) {
  await page.click("#AcceptAll").catch(() => {});
  await page.waitForTimeout(400);

  return page.evaluate(
    ({ props, label }) => {
      function styles(el) {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const out = {};
        for (const p of props) {
          const v = cs[p];
          if (
            v &&
            v !== "none" &&
            v !== "normal" &&
            v !== "auto" &&
            v !== "0px" &&
            v !== "rgba(0, 0, 0, 0)" &&
            v !== "matrix(1, 0, 0, 1, 0, 0)"
          ) {
            out[p] = v;
          }
        }
        const r = el.getBoundingClientRect();
        out._box = {
          w: Math.round(r.width),
          h: Math.round(r.height),
          top: Math.round(r.top + scrollY),
          left: Math.round(r.left),
        };
        return out;
      }

      function imgInfo(el) {
        if (!el) return null;
        return {
          src: (el.currentSrc || el.src || "").replace("https://tutoreo.pl", ""),
          alt: el.alt || "",
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight,
          styles: styles(el),
        };
      }

      const mediaQuery = window.matchMedia("(max-width: 1000px)").matches
        ? "mobile (<=1000px)"
        : "desktop (>1000px)";

      return {
        label,
        viewport: { w: innerWidth, h: innerHeight },
        mediaQuery,
        breakpointNote: "Site switches navbar/typography at max-width: 1000px",
        cssVars: (() => {
          const cs = getComputedStyle(document.documentElement);
          const keys = [
            "--AccentColor",
            "--AccentColor1",
            "--AccentColor2",
            "--TonedBackground",
            "--RegularBackground",
            "--Dark2",
            "--FontSize1",
            "--FontSize2",
            "--FontSize3",
            "--Spacer_Big",
            "--Spacer_Medium",
            "--Spacer_Small",
            "--BorderRadius1",
            "--BorderRadius2",
            "--BigButton",
            "--NavbarHeight",
            "--PopOffShadow",
            "--ShinyShadow",
            "--InsetShadow",
            "--AccentShadow",
            "--UniversalTransition",
          ];
          const o = {};
          keys.forEach((k) => (o[k] = cs.getPropertyValue(k).trim()));
          return o;
        })(),
        navbar: {
          nav: styles(document.querySelector("#MainNavbar")),
          restrainer: styles(document.querySelector("#NavbarWidthRestrainer")),
          logo: imgInfo(document.querySelector("#MainNavbarLogo")),
          toggle: styles(document.querySelector("#NavbarToggle")),
          cta: styles(document.querySelector("#NavbarCTA")),
          links: [...document.querySelectorAll("#NavbarWidthRestrainer a:not(#NavbarCTA):not(#LogoLink)")].map(
            (a) => ({
              text: a.textContent.trim(),
              styles: styles(a),
            })
          ),
        },
        hero: {
          section: styles(document.querySelector("#CTASection")),
          text: styles(document.querySelector("#CTAText")),
          headings: [...document.querySelectorAll("#CTAText h1")].map((h) => ({
            classes: h.className,
            text: h.innerText.trim(),
            display: getComputedStyle(h).display,
            styles: styles(h),
          })),
          paragraph: [...document.querySelectorAll("#CTAText p")].map((p) => ({
            classes: p.className,
            display: getComputedStyle(p).display,
            styles: styles(p),
          })),
          buttonsWrap: styles(document.querySelector("#CTAButtons")),
          primaryBtn: styles(document.querySelector("#CTAButton")),
          softBtn: styles(document.querySelector("#SoftCTAButton")),
          wave: imgInfo(document.querySelector("#CTASection img.GradientWaveCutout, #CTASection img[src*='Wave']")),
          imageDiv: styles(document.querySelector("#CTAImageDiv")),
          video: (() => {
            const v = document.querySelector("#HeroVideo");
            return v
              ? {
                  src: (v.currentSrc || v.src || "").replace("https://tutoreo.pl", ""),
                  styles: styles(v),
                }
              : null;
          })(),
        },
        howItWorks: {
          section: styles(document.querySelector("#HowItWorks")),
          threeSteps: styles(document.querySelector("#ThreeSteps")),
          steps: [...document.querySelectorAll("#ThreeSteps > .Step, #ThreeSteps > *")].map((s, i) => ({
            index: i,
            styles: styles(s),
            number: styles(s.querySelector("h1")),
            title: styles(s.querySelector("h3")),
            body: styles(s.querySelector("p")),
            arrow: imgInfo(s.querySelector("img.CurvedArrow, img[src*='CurvedArrow']")),
          })),
          testTitle: styles(document.querySelector("#TestTitle")),
          testParagraph: styles(document.querySelector("#TestParagraph")),
          testBtn: styles(document.querySelector("#TestWhiteboardButton")),
          wave: imgInfo(document.querySelector("#HowItWorks img[src*='Wave']")),
        },
        benefits: {
          section: styles(document.querySelector("#BenefitsSection")),
          categories: styles(document.querySelector("#BenefitsCategories")),
          cards: [...document.querySelectorAll("informative-block")].slice(0, 3).map((b) => {
            const host = b;
            const icon = b.querySelector(".Icon");
            const img = icon?.querySelector("img");
            return {
              host: styles(host),
              icon: styles(icon),
              iconBg: icon ? icon.style.backgroundColor || getComputedStyle(icon).backgroundColor : null,
              image: imgInfo(img),
              title: styles(b.querySelector("h2")),
              hr: styles(b.querySelector("hr")),
              body: styles(b.querySelector("p")),
            };
          }),
          grid: styles(document.querySelector(".Benefits.Active, .Benefits")),
        },
        faq: {
          section: styles(document.querySelector("#FAQSection")),
          contactBtn: styles(document.querySelector("#ContactUsButton")),
          questionOpen: styles(document.querySelector("#FAQSection .Question.Active")),
          questionClosed: styles(document.querySelector("#FAQSection .Question:not(.Active)")),
          waveTop: imgInfo(document.querySelector("#FAQSection img[src*='Wave4']")),
          waveBottom: imgInfo(document.querySelector("#FAQSection img[src*='Wave5']")),
        },
        secondaryCta: {
          section: styles(document.querySelector("#SecondaryCTA")),
          headings: [...document.querySelectorAll("#SecondaryCTA h1")].map((h) => styles(h)),
          button: styles(document.querySelector("#SecondaryCTA a.Standard, #SecondaryCTA a")),
        },
        footer: {
          section: styles(document.querySelector("footer")),
          logo: imgInfo(document.querySelector("#FooterLogo img, footer img")),
        },
        pageBg: styles(document.querySelector("#PageBG")),
        cookies: styles(document.querySelector("cookies-banner")),
      };
    },
    { props: LAYOUT_PROPS, label }
  );
}

async function shotSection(page, selector, file) {
  const el = page.locator(selector).first();
  if ((await el.count()) === 0) return false;
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  await el.screenshot({ path: file });
  return true;
}

async function captureSet(browser, viewport, prefix) {
  const page = await browser.newPage({ viewport });
  await page.goto("https://tutoreo.pl", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);

  // full + hero before accepting cookies (cookie overlay visible)
  await page.screenshot({
    path: path.join(SHOTS, `${prefix}-00-hero-with-cookies.png`),
  });

  await page.click("#AcceptAll").catch(() => {});
  await page.waitForTimeout(400);

  await page.screenshot({
    path: path.join(SHOTS, `${prefix}-01-hero.png`),
  });
  await page.screenshot({
    path: path.join(SHOTS, `${prefix}-full.png`),
    fullPage: true,
  });

  const sections = [
    ["#MainNavbar", "02-navbar"],
    ["#CTASection", "03-cta-section"],
    ["#CTAImageDiv", "04-hero-video"],
    ["#HowItWorks", "05-how-it-works"],
    ["#BenefitsSection", "06-benefits"],
    ["#FAQSection", "07-faq"],
    ["#SecondaryCTA", "08-secondary-cta"],
    ["footer", "09-footer"],
  ];

  for (const [sel, name] of sections) {
    await shotSection(page, sel, path.join(SHOTS, `${prefix}-${name}.png`));
  }

  // Scroll navbar state
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
  await page.locator("#MainNavbar").screenshot({
    path: path.join(SHOTS, `${prefix}-navbar-top.png`),
  });
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);
  await page.locator("#MainNavbar").screenshot({
    path: path.join(SHOTS, `${prefix}-navbar-scrolled.png`),
  });

  // Benefits student tab
  await page.locator("#BenefitsSection").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const studentTab = page.locator("#BenefitsCategories >> text=Dla ucznia");
  if ((await studentTab.count()) > 0) {
    await studentTab.click();
    await page.waitForTimeout(400);
    await shotSection(page, "#BenefitsSection", path.join(SHOTS, `${prefix}-06-benefits-student.png`));
  }

  // FAQ open/closed already default; click second
  await page.locator("#FAQSection").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const q2 = page.locator("#FAQSection .Question").nth(1);
  if ((await q2.count()) > 0) {
    await q2.click();
    await page.waitForTimeout(300);
    await shotSection(page, "#FAQSection", path.join(SHOTS, `${prefix}-07-faq-alt.png`));
  }

  if (viewport.width <= 1000) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.click("#NavbarToggle").catch(() => {});
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SHOTS, `${prefix}-mobile-menu-open.png`),
    });
  }

  const data = await extractViewport(page, prefix);
  await page.close();
  return data;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const desktop = await captureSet(browser, { width: 1440, height: 900 }, "desktop");
  const tablet = await captureSet(browser, { width: 768, height: 1024 }, "tablet");
  const mobile = await captureSet(browser, { width: 390, height: 844 }, "mobile");

  // Side-by-side clone comparison at desktop/mobile
  for (const [vp, prefix] of [
    [{ width: 1440, height: 900 }, "clone-desktop"],
    [{ width: 390, height: 844 }, "clone-mobile"],
  ]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1000);
    await page.click("#AcceptAll").catch(() => {});
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SHOTS, `${prefix}-hero.png`) });
    await page.screenshot({ path: path.join(SHOTS, `${prefix}-full.png`), fullPage: true });
    await page.close();
  }

  const layout = { desktop, tablet, mobile, generatedAt: new Date().toISOString() };
  fs.writeFileSync(path.join(OUT, "layout-css.json"), JSON.stringify(layout, null, 2));

  await browser.close();
  console.log("Screenshots + layout CSS extracted");
  console.log("Files in", SHOTS, fs.readdirSync(SHOTS).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
