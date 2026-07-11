import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = await readFile("/tmp/lekcjerazem.html", "utf8");

// Extract nav through footer
const navMatch = html.match(/<nav id="main-nav">[\s\S]*?<\/nav>/);
const mobileMatch = html.match(/<div class="nav-mobile"[\s\S]*?<\/div>\s*<main/);
const mainMatch = html.match(/<main id="tresc-glowna">([\s\S]*?)<\/main>/);
const featuresMatch = html.match(/<section class="section s-alt" id="funkcje-platformy-linki">[\s\S]*?<\/section>/);
const footerMatch = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
const cookieMatch = html.match(/<div class="cookie-banner"[\s\S]*?<\/div>\s*<\/div>/);

function toJsx(fragment) {
  if (!fragment) return "";
  return fragment
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sclass=/g, " className=")
    .replace(/\sfor=/g, " htmlFor=")
    .replace(/<img([^>]*?)\s\/>/g, "<img$1 />")
    .replace(/<br>/g, "<br />")
    .replace(/<hr>/g, "<hr />")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/clip-rule=/g, "clipRule=")
    .replace(/viewBox=/g, "viewBox=")
    .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
    .replace(/fetchpriority=/g, "fetchPriority=")
    .replace(/decoding=/g, "decoding=")
    .replace(/loading=/g, "loading=")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/ico\/logo\/lekcjerazem-logo-animated\.svg/g, "/images/lekcjerazem/logo.svg")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/nauczyciel\/01\.png/g, "/images/lekcjerazem/pulpit.png")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/nauczyciel\/40\.png/g, "/images/lekcjerazem/tablica.png")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/nauczyciel\/14\.png/g, "/images/lekcjerazem/grafik.png")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/nauczyciel\/09\.png/g, "/images/lekcjerazem/rozliczenia.png")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/uczen\/03\.png/g, "/images/lekcjerazem/panel-ucznia.png")
    .replace(/https:\/\/lekcjerazem\.pl\/moduly\/strona\/instrukcje\/img\/nauczyciel\/25\.png/g, "/images/lekcjerazem/baza-wzorow.png")
    .replace(/onclick="([^"]*)"/g, 'onClick={(e) => { const fn = ($1); if (typeof fn === "function") fn(e); else eval(fn); }}')
    .replace(/style="([^"]*)"/g, (_, s) => {
      const obj = s.split(";").filter(Boolean).map((p) => {
        const [k, v] = p.split(":").map((x) => x.trim());
        const camel = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        return `${camel}: "${v}"`;
      });
      return `style={{ ${obj.join(", ")} }}`;
    });
}

const mkhStyles = html.match(/<style>[\s\S]*?\.mkh-grid[\s\S]*?<\/style>/);
const mkhCss = mkhStyles ? mkhStyles[0].replace(/<\/?style>/g, "") : "";

const output = `"use client";

import Script from "next/script";

export function LekcjeRazemPage() {
  return (
    <>
      ${toJsx(navMatch?.[0] ?? "")}
      ${toJsx(mobileMatch?.[0]?.replace(/<main$/, "") ?? "")}
      <main id="tresc-glowna">
        ${toJsx(mainMatch?.[1] ?? "")}
      </main>
      ${toJsx(featuresMatch?.[0] ?? "")}
      ${toJsx(footerMatch?.[0] ?? "")}
      ${toJsx(cookieMatch?.[0] ?? "")}
      <style jsx global>{\`${mkhCss.replace(/`/g, "\\`")}\`}</style>
      <Script src="/lekcjerazem/scripts.js" strategy="afterInteractive" />
    </>
  );
}
`;

await writeFile(join(__dirname, "..", "src", "components", "lekcjerazem", "LekcjeRazemPage.tsx"), output);
console.log("Generated LekcjeRazemPage.tsx", output.length, "chars");
