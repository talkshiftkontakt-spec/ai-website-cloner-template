import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(__dirname, "../docs/research/gabinetpomorska.pl/pages");
const OUT = join(__dirname, "../src/lib/pages-data.ts");

function parsePriceItem(raw) {
  const match = raw.match(/^(.+?)\s+(\d+[\s,.]?\d*\s*(?:zł|gr)(?:\/strona)?)\s*(.*)$/i);
  if (match) {
    return { title: match[1].trim(), price: match[2].trim(), note: match[3]?.trim() || undefined };
  }
  return { title: raw, price: "", note: undefined };
}

function parseSpecialists(blocks, images) {
  const profiles = [];
  let current = null;
  let imageIndex = 0;

  for (const block of blocks) {
    if (block.type === "image" && block.local) {
      if (current?.name) profiles.push(current);
      current = {
        name: "",
        role: "",
        image: block.local,
        paragraphs: [],
        services: [],
      };
      imageIndex++;
      continue;
    }
    if (!current) continue;
    if (block.type === "heading" && block.level === 3 && !current.name) {
      current.name = block.text;
      continue;
    }
    if (block.type === "paragraph") {
      if (!current.role && block.text.length < 120 && !block.text.startsWith("Jestem") && !block.text.startsWith("Ukończy")) {
        current.role = block.text;
      } else if (block.text !== "W Gabinetach Pomorska prowadzi:") {
        current.paragraphs.push(block.text);
      }
      continue;
    }
    if (block.type === "list") {
      current.services = block.items;
    }
    if (block.type === "heading" && block.level === 3 && current.name) {
      profiles.push(current);
      current = {
        name: block.text,
        role: "",
        image: images[imageIndex]?.local || "/images/gabinetpomorska/cropped-logo-male-2-png-300x300.png",
        paragraphs: [],
        services: [],
      };
      imageIndex++;
    }
  }
  if (current?.name) profiles.push(current);

  return profiles.map((p) => ({
    ...p,
    id: p.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }));
}

function parsePricingSections(blocks) {
  const sections = [];
  let current = null;
  const skipParagraphs = new Set();

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      if (current) sections.push(current);
      current = { title: block.text, items: [], note: undefined };
      continue;
    }
    if (!current) continue;
    if (block.type === "list") {
      for (const item of block.items) {
        current.items.push(parsePriceItem(item));
      }
    }
    if (block.type === "paragraph" && block.text.length > 40 && !block.text.includes("?")) {
      if (!current.note) current.note = block.text;
    }
    if (block.type === "paragraph" && block.text.includes("?")) {
      skipParagraphs.add(block.text);
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => s.items.length > 0 && s.title !== "Pytania i odpowiedzi" && s.title !== "Umów wizytę");
}

function parseFaq(blocks) {
  const faq = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "paragraph" && block.text.includes("?")) {
      const q = block.text.split("?")[0] + "?";
      const inline = block.text.split("?")[1]?.trim();
      let answer = inline || "";
      for (let j = i + 1; j < blocks.length; j++) {
        const next = blocks[j];
        if (next.type === "paragraph" && next.text.includes("?")) break;
        if (next.type === "paragraph") answer += (answer ? " " : "") + next.text;
        if (next.type === "list") answer += " " + next.items.join(" ");
        if (next.type === "heading") break;
      }
      if (answer.trim()) faq.push({ question: q.trim(), answer: answer.trim() });
    }
  }
  return faq;
}

function cleanBlocks(blocks) {
  const result = [];
  const seen = new Set();
  for (const block of blocks) {
    if (block.type === "heading" && block.level === 1) continue;
    const key = JSON.stringify(block);
    if (seen.has(key)) continue;
    seen.add(key);
    if (block.type === "paragraph") {
      if (block.text.length < 3) continue;
      if (/^\(czas trwania/.test(block.text)) continue;
      if (/^Ważność pakietu/.test(block.text)) continue;
      if (/^Powyżej jednej kopii/.test(block.text)) continue;
      if (/^Jeden terapeuta/.test(block.text)) continue;
      if (/^W tym konsultacje/.test(block.text)) continue;
      if (/^z prowadzącym/.test(block.text)) continue;
      if (/^Wstępna konsultacja/.test(block.text)) continue;
      if (/^Badanie intelektu/.test(block.text)) continue;
      if (/^Podsumowanie procesu/.test(block.text)) continue;
      if (/^Konsultacja psychiatryczna, wywiad/.test(block.text)) continue;
    }
    result.push(block);
  }
  return result;
}

const all = JSON.parse(readFileSync(join(PAGES_DIR, "all-pages.json"), "utf8"));

const pages = {};
for (const [slug, data] of Object.entries(all)) {
  pages[slug] = {
    slug,
    title: data.title,
    metaDescription: data.metaDescription,
    h1: data.h1,
    blocks: cleanBlocks(data.blocks),
  };
}

const specialistProfiles = parseSpecialists(all.specjalisci.blocks, all.specjalisci.images);
const pricingSections = parsePricingSections(all.cennik.blocks);
const pricingFaq = parseFaq(all.cennik.blocks);

const offerCards = [
  {
    title: "Diagnoza dzieci i młodzieży",
    href: "/diagnostyka-dzieci-i-mlodziezy",
    description: "Proces diagnostyczny z uwzględnieniem rozwoju i kontekstu rodzinnego.",
  },
  {
    title: "Diagnoza dorosłych",
    href: "/diagnostyka-doroslych",
    description: "Uporządkowanie obrazu trudności i określenie dalszych kroków klinicznych.",
  },
  {
    title: "Leczenie dzieci, młodzieży i rodzin",
    href: "/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny",
    description: "Wsparcie psychologiczne, konsultacje rodzicielskie i psychoterapia.",
  },
  {
    title: "Leczenie dorosłych",
    href: "/leczenie-i-wsparcie-doroslych",
    description: "Psychoterapia indywidualna i współpraca z psychiatrą.",
  },
  {
    title: "Terapia par",
    href: "/terapia-par",
    description: "Praca nad komunikacją i kryzysami w związku.",
  },
];

const ts = `// Generated by scripts/generate-pages-data.mjs — do not edit manually
export interface ContentBlock {
  type: "heading" | "paragraph" | "list" | "ordered-list" | "image";
  level?: number;
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
  local?: string;
}

export interface SpecialistProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  paragraphs: string[];
  services: string[];
}

export interface PricingItem {
  title: string;
  price: string;
  note?: string;
}

export interface PricingSection {
  title: string;
  items: PricingItem[];
  note?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  blocks: ContentBlock[];
}

export interface OfferCard {
  title: string;
  href: string;
  description: string;
}

export const specialistProfiles: SpecialistProfile[] = ${JSON.stringify(specialistProfiles, null, 2)};

export const pricingSections: PricingSection[] = ${JSON.stringify(pricingSections, null, 2)};

export const pricingFaq: FaqItem[] = ${JSON.stringify(pricingFaq, null, 2)};

export const offerCards: OfferCard[] = ${JSON.stringify(offerCards, null, 2)};

export const pages: Record<string, PageContent> = ${JSON.stringify(pages, null, 2)};

export function getPage(slug: string): PageContent | undefined {
  return pages[slug];
}

export const pageSlugs = ${JSON.stringify(Object.keys(pages))} as const;
`;

writeFileSync(OUT, ts);
console.log("Generated", OUT);
console.log("Specialists:", specialistProfiles.length);
console.log("Pricing sections:", pricingSections.length);
console.log("Pages:", Object.keys(pages).length);
