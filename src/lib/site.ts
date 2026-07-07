export const siteConfig = {
  name: "HeadCraft",
  legalName: "HeadCraft Polska",
  tagline: "Twoja historia. Na półce.",
  description:
    "Personalizowane i kolekcjonerskie fizyczne główki Minecraft. Wgraj swój skin — odbierz główkę na półkę. Produkcja w Polsce.",
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
  },
} as const;
