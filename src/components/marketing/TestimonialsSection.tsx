import Image from "next/image";
import { Star } from "lucide-react";

import { testimonials, ugcImages } from "@/lib/cms/data";
import { siteConfig } from "@/lib/site";

export function TestimonialsSection() {
 return (
 <section className="section-padding bg-surface">
 <div className="container-site">
 <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
 Co mówią kolekcjonerzy
 </h2>
 <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
 {siteConfig.stats.reviewCount}+ zweryfikowanych opinii od prawdziwych
 klientów
 </p>
 <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 {testimonials.map((t) => (
 <blockquote
 key={t.id}
 className="rounded-xl border border-border bg-background p-6"
 >
 <div className="mb-3 flex gap-0.5">
 {Array.from({ length: t.rating }).map((_, i) => (
 <Star key={i} className="size-4 fill-primary text-primary" />
 ))}
 </div>
 <p className="text-sm text-foreground text-pretty">&ldquo;{t.content}&rdquo;</p>
 <footer className="mt-4 text-sm text-muted-foreground">
 <strong className="text-foreground">{t.author}</strong>
 <span className="mx-2">·</span>
 {t.product}
 </footer>
 </blockquote>
 ))}
 </div>
 </div>
 </section>
 );
}

export function UGCGallery() {
 return (
 <section className="section-padding">
 <div className="container-site">
 <h2 className="font-display text-3xl font-bold md:text-4xl">
 Wasze setupy
 </h2>
 <p className="mt-2 text-muted-foreground">
 Pochwal się swoją kolekcją z hashtagiem {siteConfig.social.hashtag}
 </p>
 <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
 {ugcImages.map((img) => (
 <div
 key={img.id}
 className="relative aspect-square overflow-hidden rounded-xl border border-border"
 >
 <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 50vw, 33vw" className="object-cover" />
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
