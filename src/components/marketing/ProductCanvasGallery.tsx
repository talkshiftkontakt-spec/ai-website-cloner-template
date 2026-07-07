import Image from "next/image";

/** Galeria produktu 1:1 jak na twojskinek.pl: płaski canvas, nie 3D kostka */
export function ProductCanvasGallery() {
 const shots = [
 {
 src: "/images/products/twojskinek/product-closeup.png",
 alt: "Zbliżenie, płaski kwadratowy obraz z twarzą główki skina",
 },
 {
 src: "/images/products/twojskinek/product-3d-view.png",
 alt: "Widok z boku, cienki canvas na podramie, nie kostka Minecraft",
 },
 {
 src: "/images/products/twojskinek/product-in-living-room.png",
 alt: "Obraz ze skinem powieszony w salonie",
 },
 ];

 return (
 <section className="bg-[#fafafa] py-12 text-neutral-900 md:py-16">
 <div className="container-site">
 <h2 className="text-center font-display text-2xl font-bold md:text-3xl">
 Tak wygląda produkt
 </h2>
 <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-600 md:text-base">
 To <strong>nie jest fizyczna główka-kostka</strong>. Z twarzy główki
 ze skina powstaje płaski, kwadratowy obraz na płótnie, jak na
 twojskinek.pl.
 </p>
 <div className="mt-8 grid gap-4 sm:grid-cols-3">
 {shots.map((shot) => (
 <div
 key={shot.src}
 className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-[1.02]"
 >
 <Image
 src={shot.src}
 alt={shot.alt}
 width={1080}
 height={1080}
 className="h-auto w-full"
 sizes="(max-width: 640px) 100vw, 33vw"
 />
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
