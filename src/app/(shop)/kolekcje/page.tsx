import Link from "next/link";

import { collections } from "@/lib/cms/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Kolekcje",
 description:
 "Przeglądaj kolekcje kolekcjonerskich główek Minecraft, ikony, twórcy, limitowane edycje i personalizacja.",
 path: "/kolekcje",
});

export default function CollectionsIndexPage() {
 return (
 <div className="container-site section-padding">
 <h1 className="font-display text-4xl font-bold">Kolekcje</h1>
 <p className="mt-4 max-w-2xl text-muted-foreground">
 Wybierz kolekcję dopasowaną do Twojego stylu: od klasycznych ikon po
 limitowane edycje numerowane.
 </p>
 <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {collections.map((col) => (
 <Link
 key={col.slug}
 href={`/kolekcje/${col.slug}`}
 className="group rounded-xl border border-border bg-surface p-6 transition-colors hover:border-primary/50"
 >
 <h2 className="font-display text-xl font-semibold group-hover:text-primary">
 {col.name}
 </h2>
 <p className="mt-2 text-sm text-muted-foreground">{col.description}</p>
 </Link>
 ))}
 </div>
 </div>
 );
}
