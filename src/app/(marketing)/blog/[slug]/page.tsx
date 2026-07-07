import Link from "next/link";
import { notFound } from "next/navigation";

import { blogPosts } from "@/lib/cms/data";
import { formatDate } from "@/lib/format";
import { createPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface PageProps {
 params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
 return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
 const { slug } = await params;
 const post = blogPosts.find((p) => p.slug === slug);
 if (!post) return {};
 return createPageMetadata({
 title: post.title,
 description: post.excerpt,
 path: `/blog/${slug}`,
 image: post.image,
 });
}

export default async function BlogPostPage({ params }: PageProps) {
 const { slug } = await params;
 const post = blogPosts.find((p) => p.slug === slug);
 if (!post) notFound();

 return (
 <>
 <JsonLd
 data={{
 "@context": "https://schema.org",
 "@type": "Article",
 headline: post.title,
 description: post.excerpt,
 datePublished: post.date,
 author: { "@type": "Organization", name: siteConfig.name },
 publisher: { "@type": "Organization", name: siteConfig.name },
 }}
 />

 <article className="container-site section-padding">
 <div className="mx-auto max-w-3xl">
 <p className="text-sm font-medium text-primary">{post.category}</p>
 <h1 className="mt-4 font-display text-4xl font-bold">{post.title}</h1>
 <p className="mt-4 text-muted-foreground">
 {formatDate(post.date)} · {post.readingTime} min czytania
 </p>
 <div className="prose prose-invert mt-10 max-w-none">
 <p className="text-lg text-muted-foreground">{post.excerpt}</p>
 <p className="mt-6 text-muted-foreground">
 W Twój Skinek wierzymy, że kolekcjonowanie to więcej niż hobby: to
 sposób na celebrowanie pasji do Minecraft. W tym artykule
 dzielimy się wiedzą i inspiracjami, które pomogą Ci zbudować
 kolekcję, z której będziesz dumny.
 </p>
 <p className="mt-4 text-muted-foreground">
 Chcesz zacząć? Przejrzyj naszą kolekcję główek lub stwórz
 personalizowaną główkę ze swojego skina w konfiguratorze.
 </p>
 </div>
 <Link
 href="/kolekcje/wszystkie"
 className={cn(buttonVariants(), "mt-10 inline-flex")}
 >
 Przeglądaj kolekcję
 </Link>
 </div>
 </article>
 </>
 );
}
