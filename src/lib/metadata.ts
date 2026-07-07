import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekkistart.pl";

export function createMetadata({
  title,
  description,
  path = "",
  image = "/seo/og-default.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "pl_PL",
      type: "website",
      siteName: "LekkiStart",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export const siteMetadata = createMetadata({
  title: "LekkiStart — Premium Coaching Odchudzania dla Osób z Nadwagą i Otyłością",
  description:
    "Indywidualny trening, żywienie i cotygodniowe wsparcie. Od 399 zł/mies. Złóż aplikację i zacznij realną zmianę.",
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lekkistart.pl",
);
