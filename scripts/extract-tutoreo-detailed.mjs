import { chromium } from "playwright";
import fs from "fs";

const props = [
  "fontSize","fontWeight","fontFamily","lineHeight","letterSpacing","color",
  "textTransform","textDecoration","backgroundColor","backgroundImage","background",
  "padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
  "margin","marginTop","marginRight","marginBottom","marginLeft",
  "width","height","maxWidth","minWidth","maxHeight","minHeight",
  "display","flexDirection","justifyContent","alignItems","alignSelf","gap","rowGap","columnGap",
  "gridTemplateColumns","gridTemplateRows","flexWrap","flex","flexGrow","flexShrink",
  "borderRadius","border","borderTop","borderBottom","borderLeft","borderRight",
  "boxShadow","overflow","overflowX","overflowY",
  "position","top","right","bottom","left","zIndex",
  "opacity","transform","transition","cursor","textAlign","whiteSpace",
  "objectFit","objectPosition","backdropFilter","clipPath","maskImage",
];

async function main() {
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("https://tutoreo.pl", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  // Accept cookies to clear banner
  await page.click("#AcceptAll").catch(() => {});
  await page.waitForTimeout(500);

  const detailed = await page.evaluate((props) => {
    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)" && v !== "matrix(1, 0, 0, 1, 0, 0)") {
          out[p] = v;
        }
      }
      const rect = el.getBoundingClientRect();
      out._rect = { w: Math.round(rect.width), h: Math.round(rect.height), t: Math.round(rect.top + scrollY), l: Math.round(rect.left) };
      return out;
    }

    function textNodes(el) {
      return el?.innerText?.trim() || "";
    }

    // Benefits tabs - capture both states
    const benefitButtons = [...document.querySelectorAll("#BenefitsCategories button, #BenefitsCategories > *")];
    
    const result = {
      navbar: {
        nav: styles(document.querySelector("#MainNavbar")),
        restrainer: styles(document.querySelector("#NavbarWidthRestrainer")),
        logo: styles(document.querySelector("#MainNavbarLogo")),
        links: [...document.querySelectorAll("#NavbarWidthRestrainer a:not(#NavbarCTA):not(#LogoLink)")].map((a) => ({
          text: a.textContent.trim(),
          href: a.getAttribute("href"),
          styles: styles(a),
        })),
        cta: { text: textNodes(document.querySelector("#NavbarCTA")), styles: styles(document.querySelector("#NavbarCTA")) },
      },
      hero: {
        section: styles(document.querySelector("#CTASection")),
        text: styles(document.querySelector("#CTAText")),
        heading: (() => {
          const h = document.querySelector("#CTAText h1, #CTAText .Title, #CTASection h1");
          return { text: textNodes(h), html: h?.innerHTML, styles: styles(h) };
        })(),
        paragraph: (() => {
          // Collect all text children of CTAText
          const texts = [...document.querySelectorAll("#CTAText > *")].map((el) => ({
            tag: el.tagName,
            id: el.id,
            classes: el.className?.toString(),
            text: el.innerText?.trim().slice(0, 200),
            html: el.innerHTML?.slice(0, 500),
            styles: styles(el),
          }));
          return texts;
        })(),
        buttons: styles(document.querySelector("#CTAButtons")),
        primaryBtn: { text: textNodes(document.querySelector("#CTAButton")), styles: styles(document.querySelector("#CTAButton")) },
        softBtn: { text: textNodes(document.querySelector("#SoftCTAButton")), styles: styles(document.querySelector("#SoftCTAButton")) },
        imageDiv: styles(document.querySelector("#CTAImageDiv")),
        video: styles(document.querySelector("#HeroVideo")),
        wave: styles(document.querySelector("#CTASection .GradientWaveCutout, #CTASection img[src*='Wave']")),
      },
      howItWorks: {
        section: styles(document.querySelector("#HowItWorks")),
        html: document.querySelector("#HowItWorks")?.innerHTML?.slice(0, 8000),
        children: [...(document.querySelector("#HowItWorks")?.children || [])].map((el) => ({
          tag: el.tagName,
          id: el.id,
          classes: el.className?.toString(),
          text: el.innerText?.trim().slice(0, 300),
          styles: styles(el),
          childStyles: [...el.children].slice(0, 10).map((c) => ({
            tag: c.tagName,
            classes: c.className?.toString(),
            text: c.innerText?.trim().slice(0, 200),
            styles: styles(c),
          })),
        })),
        steps: [...document.querySelectorAll("#ThreeSteps .Step, #ThreeSteps > *")].map((el) => ({
          classes: el.className?.toString(),
          text: el.innerText?.trim(),
          html: el.innerHTML?.slice(0, 1000),
          styles: styles(el),
          children: [...el.children].map((c) => ({
            tag: c.tagName,
            classes: c.className?.toString(),
            text: c.innerText?.trim().slice(0, 200),
            styles: styles(c),
          })),
        })),
        testTitle: { text: textNodes(document.querySelector("#TestTitle")), styles: styles(document.querySelector("#TestTitle")) },
        testParagraph: { text: textNodes(document.querySelector("#TestParagraph")), styles: styles(document.querySelector("#TestParagraph")) },
        testBtn: { text: textNodes(document.querySelector("#TestWhiteboardButton")), styles: styles(document.querySelector("#TestWhiteboardButton")) },
      },
      benefits: {
        section: styles(document.querySelector("#BenefitsSection")),
        categories: styles(document.querySelector("#BenefitsCategories")),
        categoryButtons: benefitButtons.map((b) => ({
          text: b.textContent.trim(),
          classes: b.className?.toString(),
          styles: styles(b),
        })),
        html: document.querySelector("#BenefitsSection")?.innerHTML?.slice(0, 10000),
      },
      faq: {
        section: styles(document.querySelector("#FAQSection")),
        html: document.querySelector("#FAQSection")?.innerHTML?.slice(0, 12000),
        questions: [...document.querySelectorAll("#FAQSection .Question")].map((q) => ({
          classes: q.className?.toString(),
          text: q.innerText?.trim(),
          styles: styles(q),
          children: [...q.children].map((c) => ({
            tag: c.tagName,
            classes: c.className?.toString(),
            text: c.innerText?.trim().slice(0, 300),
            styles: styles(c),
          })),
        })),
        contactBtn: { text: textNodes(document.querySelector("#ContactUsButton")), styles: styles(document.querySelector("#ContactUsButton")) },
      },
      secondaryCta: {
        section: styles(document.querySelector("#SecondaryCTA")),
        html: document.querySelector("#SecondaryCTA")?.innerHTML?.slice(0, 3000),
        children: [...(document.querySelector("#SecondaryCTA")?.children || [])].map((el) => ({
          tag: el.tagName,
          classes: el.className?.toString(),
          text: el.innerText?.trim(),
          styles: styles(el),
        })),
      },
      footer: {
        el: styles(document.querySelector("footer, app-footer, .Footer")),
        html: (document.querySelector("footer") || document.querySelector("app-footer"))?.innerHTML?.slice(0, 5000),
        children: [...(document.querySelector("footer")?.children || document.querySelector("app-footer")?.children || [])].map((el) => ({
          tag: el.tagName,
          classes: el.className?.toString(),
          text: el.innerText?.trim().slice(0, 400),
          styles: styles(el),
        })),
      },
      pageBg: styles(document.querySelector("#PageBG")),
      cookies: {
        banner: styles(document.querySelector("cookies-banner")),
        html: document.querySelector("cookies-banner")?.innerHTML?.slice(0, 2000),
      },
      standardButtonSample: (() => {
        const btns = [...document.querySelectorAll(".Standard, a.Standard, button.Standard")];
        return btns.slice(0, 5).map((b) => ({
          id: b.id,
          text: b.textContent.trim().slice(0, 40),
          styles: styles(b),
        }));
      })(),
      softButtonSample: styles(document.querySelector("#SoftCTAButton")),
      gradientWrappers: [...document.querySelectorAll(".GradientWrapper")].map((el) => ({
        id: el.id,
        styles: styles(el),
        waveImg: el.querySelector("img")?.src,
      })),
    };

    // Click student benefits tab
    const studentBtn = benefitButtons.find((b) => b.textContent.includes("ucznia"));
    if (studentBtn) studentBtn.click();
    return result;
  }, props);

  await page.waitForTimeout(500);
  const studentBenefits = await page.evaluate(() => {
    return {
      html: document.querySelector("#BenefitsSection")?.innerHTML?.slice(0, 10000),
      cards: [...document.querySelectorAll("#BenefitsSection .Benefit, #BenefitsSection .Card, #BenefitsSection [class*='Benefit']")].map((c) => ({
        classes: c.className?.toString(),
        text: c.innerText?.trim(),
        html: c.innerHTML?.slice(0, 800),
      })),
      // broader: all direct content after categories
      afterCategories: (() => {
        const section = document.querySelector("#BenefitsSection");
        if (!section) return null;
        return [...section.querySelectorAll("h1, h2, h3, p, img")].map((el) => ({
          tag: el.tagName,
          text: el.innerText?.trim().slice(0, 200) || el.alt,
          src: el.src,
          parent: el.parentElement?.className?.toString().slice(0, 60),
        }));
      })(),
    };
  });

  // Get hero heading HTML with yellow highlight
  const heroHtml = await page.evaluate(() => {
    const section = document.querySelector("#CTASection");
    return section?.outerHTML?.slice(0, 15000);
  });

  // Get CSS rules for key classes
  const cssRules = await page.evaluate(() => {
    const wanted = [
      "Standard", "Soft", "GradientWrapper", "GradientWaveCutout", "Step", "Question",
      "Active", "Benefit", "Benefits", "Icon", "Hidden", "CTASection", "CTAText",
      "CTAButtons", "CTAButton", "SoftCTAButton", "HowItWorks", "ThreeSteps",
      "BenefitsSection", "BenefitsCategories", "FAQSection", "SecondaryCTA",
      "MainNavbar", "NavbarWidthRestrainer",
    ];
    const found = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (!rule.selectorText) continue;
          for (const w of wanted) {
            if (rule.selectorText.includes(w) || rule.selectorText.includes("#" + w)) {
              if (!found[rule.selectorText]) found[rule.selectorText] = rule.cssText.slice(0, 800);
            }
          }
        }
      } catch {}
    }
    return found;
  });

  // Scroll navbar state
  await page.evaluate(() => window.scrollTo(0, 0));
  const navTop = await page.evaluate(() => {
    const nav = document.querySelector("#MainNavbar");
    const cs = getComputedStyle(nav);
    return { bg: cs.backgroundColor, position: cs.position, shadow: cs.boxShadow, height: cs.height, backdropFilter: cs.backdropFilter };
  });
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(300);
  const navScrolled = await page.evaluate(() => {
    const nav = document.querySelector("#MainNavbar");
    const cs = getComputedStyle(nav);
    return { bg: cs.backgroundColor, position: cs.position, shadow: cs.boxShadow, height: cs.height, backdropFilter: cs.backdropFilter, classes: nav.className };
  });

  // Mobile layout details
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(800);
  const mobileLayout = await page.evaluate((props) => {
    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)") out[p] = v;
      }
      const rect = el.getBoundingClientRect();
      out._rect = { w: Math.round(rect.width), h: Math.round(rect.height) };
      return out;
    }
    return {
      navbar: styles(document.querySelector("#MainNavbar")),
      mobileNavbar: styles(document.querySelector("#MobileNavbar")),
      toggle: styles(document.querySelector("#NavbarToggle")),
      hero: styles(document.querySelector("#CTASection")),
      ctaText: styles(document.querySelector("#CTAText")),
      ctaButtons: styles(document.querySelector("#CTAButtons")),
      benefits: styles(document.querySelector("#BenefitsSection")),
      threeSteps: styles(document.querySelector("#ThreeSteps")),
      video: styles(document.querySelector("#HeroVideo")),
    };
  }, props);

  // Open mobile menu
  await page.click("#NavbarToggle").catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: "docs/design-references/tutoreo.pl/mobile-menu-open.png" });
  const mobileMenu = await page.evaluate(() => ({
    mobileNavbar: document.querySelector("#MobileNavbar")?.outerHTML?.slice(0, 3000),
    classes: document.querySelector("#MobileNavbar")?.className,
    display: document.querySelector("#MobileNavbar") ? getComputedStyle(document.querySelector("#MobileNavbar")).display : null,
    height: document.querySelector("#MobileNavbar") ? getComputedStyle(document.querySelector("#MobileNavbar")).height : null,
  }));

  fs.writeFileSync(
    "docs/research/tutoreo.pl/detailed-styles.json",
    JSON.stringify({ detailed, studentBenefits, heroHtml, cssRules, navTop, navScrolled, mobileLayout, mobileMenu }, null, 2)
  );

  await browser.close();
  console.log("Detailed extraction done");
  console.log("CSS rules found:", Object.keys(cssRules).length);
  console.log("Nav top:", navTop);
  console.log("Nav scrolled:", navScrolled);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
