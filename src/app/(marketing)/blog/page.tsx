import Link from "next/link";
import Image from "next/image";

import { blogPosts } from "@/lib/cms/data";
import { formatDate } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Poradniki, inspiracje i artykuły o kolekcjonowaniu główek Minecraft od HeadCraft.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="container-site section-padding">
      <h1 className="font-display text-4xl font-bold">Blog</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Poradniki kolekcjonerskie, inspiracje setupów i wszystko o świecie
        fizycznych główek Minecraft.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-xl border border-border bg-surface"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative aspect-video">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-medium text-primary">{post.category}</p>
                <h2 className="mt-2 font-display text-lg font-semibold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {formatDate(post.date)} · {post.readingTime} min czytania
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
