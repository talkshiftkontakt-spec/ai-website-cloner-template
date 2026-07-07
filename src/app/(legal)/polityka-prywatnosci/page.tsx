import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
 title: "Polityka prywatności",
 description: "Polityka prywatności Twój Skinek: jak przetwarzamy Twoje dane osobowe.",
 path: "/polityka-prywatnosci",
});

export default function PrivacyPage() {
 return (
 <div className="container-site section-padding">
 <div className="prose prose-invert mx-auto max-w-3xl">
 <h1>Polityka prywatności</h1>
 <p className="text-muted-foreground">Ostatnia aktualizacja: 1 lipca 2026</p>

 <h2>Administrator danych</h2>
 <p>
 {siteConfig.legalName}, {siteConfig.address}, {siteConfig.email}
 </p>

 <h2>Zakres przetwarzania</h2>
 <p>
 Przetwarzamy dane niezbędne do realizacji zamówień: imię, nazwisko,
 adres, email, telefon. Pliki skinów przechowywane są wyłącznie na czas
 realizacji zamówienia.
 </p>

 <h2>Cele przetwarzania</h2>
 <ul>
 <li>Realizacja zamówień i obsługa klienta</li>
 <li>Wysyłka marketingowa (za zgodą)</li>
 <li>Analityka strony (za zgodą)</li>
 </ul>

 <h2>Prawa użytkownika</h2>
 <p>
 Masz prawo dostępu, sprostowania, usunięcia i przenoszenia danych.
 Kontakt: {siteConfig.email}
 </p>

 <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8 inline-flex no-underline")}>
 Wróć do sklepu
 </Link>
 </div>
 </div>
 );
}
