import Image from "next/image";

const pillars = [
 {
 image: "/images/products/twojskinek/product-closeup.png",
 title: "Druk premium",
 description:
 "Profesjonalny druk na płótnie z żywymi kolorami, każdy piksel twarzy główki wyraźny.",
 },
 {
 image: "/images/products/twojskinek/product-3d-view.png",
 title: "Płaski canvas",
 description:
 "Cienki kwadratowy panel na podramie, widok z boku pokazuje, że to obraz, nie kostka 3D.",
 },
 {
 image: "/images/products/twojskinek/product-in-living-room.png",
 title: "Na ścianę",
 description:
 "Gotowy do powieszenia w pokoju: nad biurkiem, łóżkiem lub w salonie gamingowym.",
 },
];

export function WhyCollectSection() {
 return (
 <section className="section-padding relative overflow-hidden bg-surface">
 <div className="container-site relative">
 <div className="mx-auto max-w-2xl text-center">
 <p className="pixel-label text-grass">Dlaczego warto?</p>
 <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl">
 Z główki skina → obraz na ścianie
 </h2>
 <p className="mt-4 text-muted-foreground">
 Bierzemy <strong>twarz główki</strong> z Twojego pliku PNG i
 drukujemy ją na płaskim kwadratowym płótnie. Tak powstaje produkt.
 jak na twojskinek.pl.
 </p>
 </div>
 <div className="mt-12 grid gap-6 md:grid-cols-3">
 {pillars.map((pillar) => (
 <div
 key={pillar.title}
 className="overflow-hidden rounded-xl border-2 border-border bg-white shadow-lg"
 >
 <div className="relative aspect-square">
 <Image
 src={pillar.image}
 alt=""
 fill
 sizes="(max-width: 768px) 100vw, 33vw"
 className="object-cover"
 />
 </div>
 <div className="p-5">
 <h3 className="font-display text-lg font-bold text-neutral-900">
 {pillar.title}
 </h3>
 <p className="mt-2 text-sm leading-relaxed text-neutral-600 text-pretty">
 {pillar.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
