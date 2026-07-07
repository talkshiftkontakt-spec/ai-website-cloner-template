import type { MetadataRoute } from "next";

import { blogPosts, collections, products } from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
 const base = siteConfig.url;

 const staticPages = [
 "",
 "/kolekcje",
 "/konfigurator",
 "/inspiracje",
 "/o-nas",
 "/blog",
 "/faq",
 "/kontakt",
 "/regulamin",
 "/polityka-prywatnosci",
 "/polityka-zwrotow",
 ].map((path) => ({
 url: `${base}${path}`,
 lastModified: new Date(),
 changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
 priority: path === "" ? 1 : 0.8,
 }));

 const collectionPages = collections.map((col) => ({
 url: `${base}/kolekcje/${col.slug}`,
 lastModified: new Date(),
 changeFrequency: "weekly" as const,
 priority: 0.9,
 }));

 const productPages = products.map((p) => ({
 url: `${base}/produkt/${p.slug}`,
 lastModified: new Date(),
 changeFrequency: "weekly" as const,
 priority: 0.85,
 }));

 const blogPages = blogPosts.map((p) => ({
 url: `${base}/blog/${p.slug}`,
 lastModified: new Date(p.date),
 changeFrequency: "monthly" as const,
 priority: 0.7,
 }));

 return [...staticPages, ...collectionPages, ...productPages, ...blogPages];
}
