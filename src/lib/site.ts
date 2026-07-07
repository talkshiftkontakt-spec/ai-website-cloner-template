export const siteConfig = {
  name: "HeadCraft",
  legalName: "HeadCraft Polska",
  tagline: "Twój skin. Na ścianie.",
  description:
    "Personalizowane obrazy ze skinami Minecraft. Druk główki Twojego skina na płótnie premium — płaski canvas do powieszenia na ścianie.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://headcraft.pl",
  email: "kontakt@headcraft.pl",
  phone: "+48 123 456 789",
  address: "Wrocław, Polska",
  nip: "0000000000",
  krs: "0000000000",
  social: {
    instagram: "https://instagram.com/headcraftpl",
    tiktok: "https://tiktok.com/@headcraftpl",
    hashtag: "#HeadCraftPL",
  },
  stats: {
    rating: 4.9,
    reviewCount: 127,
    collectors: 500,
    shippingDays: "3–5 dni roboczych",
    shippingCost: 1500,
  },
  promo: {
    label: "TRWA PROMOCJA –25% NA WSZYSTKIE FORMATY!",
    active: true,
  },
} as const;
