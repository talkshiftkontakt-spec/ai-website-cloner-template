import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.svg",
  noIndex = false,
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
