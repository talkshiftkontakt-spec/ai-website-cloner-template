import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
 title: "Polityka zwrotów",
 description: "Polityka zwrotów Twój Skinek: 14 dni na zwrot, warunki dla produktów personalizowanych.",
 path: "/polityka-zwrotow",
});

export default function ReturnsPage() {
 return (
 <div className="container-site section-padding">
 <div className="prose prose-invert mx-auto max-w-3xl">
 <h1>Polityka zwrotów</h1>

 <h2>Standardowe produkty</h2>
 <p>
 Masz 14 dni na zwrot bez podania przyczyny. Produkt musi być w stanie
 nienaruszonym, w oryginalnym opakowaniu.
 </p>

 <h2>Produkty personalizowane</h2>
 <p>
 Produkty wytworzone na podstawie Twojego skina wyłączone są z prawa
 odstąpienia po rozpoczęciu produkcji (art. 38 pkt 3 ustawy o prawach
 konsumenta).
 </p>

 <h2>Uszkodzenia w transporcie</h2>
 <p>
 Jeśli produkt dotarł uszkodzony, skontaktuj się z nami w ciągu 48h. 
 wymienimy go bezpłatnie. Zdjęcia uszkodzenia są wymagane.
 </p>

 <h2>Kontakt</h2>
 <p>{siteConfig.email}</p>

 <Link href="/kontakt" className={cn(buttonVariants(), "mt-8 inline-flex no-underline")}>
 Skontaktuj się z nami
 </Link>
 </div>
 </div>
 );
}
