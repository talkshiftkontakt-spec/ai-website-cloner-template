export type NavLink = {
  label: string;
  href: string;
};

export type ExtensionCard = {
  name: string;
  description: string;
  category: ExtensionCategory;
  gradient: string;
  iconSrc?: string;
  previewSrc?: string;
};

export type ExtensionCategory =
  | "Productivity"
  | "Engineering"
  | "Design"
  | "Writing";

export type Testimonial = {
  name: string;
  handle: string;
  role: string;
  avatarSrc: string;
  favoriteFeature?: string;
  quote?: string;
};

export type FeatureTile = {
  title: string;
  description: string;
  imageSrc: string;
};

export type AutomationCard = {
  title: string;
  description: string;
  imageSrc?: string;
  wide?: boolean;
};

export type YoutubeVideo = {
  title: string;
  thumbSrc: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export type AiFeature = {
  title: string;
  description: string;
};
