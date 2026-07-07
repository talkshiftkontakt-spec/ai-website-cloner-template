import Image from "next/image";

import { ugcImages } from "@/lib/cms/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Inspiracje: ekspozycja główek",
 description:
 "Zobacz jak kolekcjonerzy Twój Skinek eksponują główki Minecraft na półkach, biurkach i w setupach streamingowych.",
 path: "/inspiracje",
});

export default function InspiracjePage() {
 return (
 <div className="container-site section-padding">
 <h1 className="font-display text-4xl font-bold">Inspiracje</h1>
 <p className="mt-4 max-w-2xl text-muted-foreground">
 Zobacz jak kolekcjonerzy Twój Skinek prezentują swoje główki: od
 minimalistycznych półek po pełne setupy streamingowe z podświetleniem
 LED.
 </p>

 <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
 {ugcImages.map((img) => (
 <div
 key={img.id}
 className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border"
 >
 <div className="relative aspect-square">
 <Image
 src={img.src}
 alt={img.alt}
 fill
 sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
 className="object-cover"
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}
