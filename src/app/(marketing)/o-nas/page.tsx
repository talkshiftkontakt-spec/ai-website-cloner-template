import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { createPageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
 title: "O nas",
 description:
 "Poznaj Twój Skinek: personalizowane obrazy ze skinami Minecraft na płótnie.",
 path: "/o-nas",
});

const processSteps = [
 { step: "01", title: "Modelowanie", desc: "Digitalizacja skina w wysokiej rozdzielczości" },
 { step: "02", title: "Druk", desc: "Profesjonalny druk na płótnie premium" },
 { step: "03", title: "Wykończenie", desc: "Naciąganie na podramę i kontrola jakości" },
 { step: "04", title: "Kontrola QC", desc: "Każda główka sprawdzana przed wysyłką" },
 { step: "05", title: "Wysyłka", desc: "Premium pakowanie i szybka dostawa" },
];

export default function AboutPage() {
 return (
 <div className="container-site section-padding">
 <div className="mx-auto max-w-3xl text-center">
 <p className="text-sm font-semibold uppercase tracking-widest text-primary">
 Nasza historia
 </p>
 <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
 Przenosimy Minecraft do rzeczywistości
 </h1>
 <p className="mt-6 text-lg text-muted-foreground text-pretty">
 Twój Skinek powstał z prostej idei: Twój skin to Twoja historia w grze.
 Zasługuje na miejsce na ścianie, nie tylko na ekranie.
 </p>
 </div>

 <section className="mt-20">
 <h2 className="font-display text-2xl font-bold">Misja</h2>
 <p className="mt-4 max-w-3xl text-muted-foreground">
 Tworzymy personalizowane obrazy ze skinami Minecraft: druk na
 płótnie, produkcja w Polsce. Płaski canvas na ścianę, nie 3D figurka.
 </p>
 </section>

 <section className="mt-20">
 <h2 className="font-display text-2xl font-bold">Proces produkcji</h2>
 <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
 {processSteps.map((s) => (
 <div
 key={s.step}
 className="rounded-xl border border-border bg-surface p-6"
 >
 <p className="font-mono text-sm text-primary">{s.step}</p>
 <h3 className="mt-2 font-semibold">{s.title}</h3>
 <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
 </div>
 ))}
 </div>
 </section>

 <section className="mt-20 rounded-xl border border-border bg-surface p-8">
 <h2 className="font-display text-2xl font-bold">Standardy jakości</h2>
 <ul className="mt-4 space-y-2 text-muted-foreground">
 <li>✓ Żywica premium odporna na UV</li>
 <li>✓ Ręczne wykończenie każdego egzemplarza</li>
 <li>✓ Kontrola jakości przed pakowaniem</li>
 <li>✓ Premium pudełko kolekcjonerskie</li>
 <li>✓ Certyfikat autentyczności (edycje limitowane)</li>
 </ul>
 </section>

 <div className="mt-16 text-center">
 <Link
 href="/kolekcje/wszystkie"
 className={cn(buttonVariants({ size: "lg" }), "h-12 px-8")}
 >
 Zobacz kolekcję
 </Link>
 </div>
 </div>
 );
}
