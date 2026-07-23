export type PricingInterval = "monthly" | "yearly";

export interface PricingPlan {
  id: "basic" | "pro" | "enterprise";
  name: string;
  description: string;
  monthlyPrice: string | null;
  yearlyPrice: string | null;
  yearlySavings: string | null;
  cta: string;
  features: string[];
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OfferCard {
  title: string;
  location: string;
  price: string;
  image: string;
}

export interface CategoryCard {
  label: string;
  icon: string;
  seeAll?: boolean;
}

export interface CarNotification {
  title: string;
  price: string;
  source: string;
  sourceIcon: string;
  image: string;
  offsetX: string;
}
