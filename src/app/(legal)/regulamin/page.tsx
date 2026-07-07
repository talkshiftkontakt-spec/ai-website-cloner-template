import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
 title: "Regulamin",
 description: "Regulamin sklepu Twój Skinek: warunki zakupu kolekcjonerskich główek Minecraft.",
 path: "/regulamin",
});

export default function RegulaminPage() {
 return (
 <div className="container-site section-padding">
 <div className="prose prose-invert mx-auto max-w-3xl">
 <h1>Regulamin sklepu {siteConfig.name}</h1>
 <p className="text-muted-foreground">Ostatnia aktualizacja: 1 lipca 2026</p>

 <h2>§1 Postanowienia ogólne</h2>
 <p>
 Sklep internetowy {siteConfig.url} prowadzony jest przez {siteConfig.legalName}
 z siedzibą we Wrocławiu, NIP: {siteConfig.nip}, KRS: {siteConfig.krs}.
 </p>

 <h2>§2 Produkty</h2>
 <p>
 Twój Skinek oferuje personalizowane obrazy na płótnie ze skinami
 Minecraft. Z twarzy główki skina powstaje płaski kwadratowy canvas.
 Produkty personalizowane wytwarzane są na zamówienie na
 podstawie pliku skina dostarczonego przez Klienta.
 </p>

 <h2>§3 Ceny i płatności</h2>
 <p>
 Ceny podane na stronie zawierają VAT 23%. Akceptujemy płatności BLIK,
 kartą i przelewem online (PayU / Przelewy24).
 </p>

 <h2>§4 Realizacja i dostawa</h2>
 <p>
 Czas realizacji: 3 do 5 dni roboczych. Dostawa kurierem lub do paczkomatu
 InPost na terenie Polski.
 </p>

 <h2>§5 Prawo odstąpienia</h2>
 <p>
 Klient ma prawo odstąpić od umowy w ciągu 14 dni. Produkty
 personalizowane wyłączone z prawa odstąpienia po rozpoczęciu produkcji.
 </p>

 <h2>§6 Znaki towarowe</h2>
 <p>
 Minecraft jest znakiem towarowym Mojang AB. {siteConfig.name} nie jest
 powiązany z Mojang AB ani Microsoft.
 </p>

 <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8 inline-flex no-underline")}>
 Wróć do sklepu
 </Link>
 </div>
 </div>
 );
}
