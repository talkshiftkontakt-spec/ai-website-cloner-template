import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/api/", "/koszyk", "/dziekujemy"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
