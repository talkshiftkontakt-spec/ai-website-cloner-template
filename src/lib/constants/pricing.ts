export type PricingTierId = "starter" | "standard" | "premium";

export type PricingTier = {
  id: PricingTierId;
  name: string;
  price: number;
  featured?: boolean;
  audience: string;
  includes: string[];
  commitment: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 399,
    audience: "Osoby z nadwagą (BMI 27–32), które chcą zacząć od podstaw",
    includes: [
      "Plan treningowy dopasowany do domu lub siłowni",
      "Wytyczne żywieniowe bez restrykcyjnych diet",
      "2× check-in miesięcznie (wideo lub wiadomość)",
      "Dostęp do materiałów edukacyjnych",
    ],
    commitment: "Minimum 3 miesiące",
  },
  {
    id: "standard",
    name: "Standard",
    price: 699,
    featured: true,
    audience: "Osoby z otyłością I–II stopnia (BMI 32–40), gotowe na pełne zaangażowanie",
    includes: [
      "Indywidualny plan treningowy i jadłospis",
      "Cotygodniowy check-in wideo (30 min)",
      "Codzienny kontakt asynchroniczny",
      "Korekty planu co 2 tygodnie",
      "Moduł budowania nawyków",
    ],
    commitment: "Minimum 3 miesiące",
  },
  {
    id: "premium",
    name: "Premium",
    price: 1199,
    audience:
      "Osoby z otyłością znaczną (BMI 40+), potrzebujące intensywnego wsparcia",
    includes: [
      "Wszystko ze Standard",
      "2× check-in wideo tygodniowo",
      "Priorytetowa odpowiedź (poniżej 4 godzin)",
      "Rozszerzona edukacja: sen, stres, emocje",
      "Kwartalna analiza postępów",
      "Maksymalnie 15 klientów w programie",
    ],
    commitment: "Minimum 6 miesięcy",
  },
];

export function formatPrice(price: number): string {
  return `${price.toLocaleString("pl-PL")} zł`;
}
