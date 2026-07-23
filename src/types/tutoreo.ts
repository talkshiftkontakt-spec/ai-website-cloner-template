export type BenefitCard = {
  iconUrl: string;
  backgroundColor: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
  showArrow?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type FooterColumn = {
  title?: string;
  links: { label: string; href: string }[];
};
