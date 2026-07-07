import Image from "next/image";
import Link from "next/link";
import { CircleCheck, Ruler, ShoppingCart, Upload } from "lucide-react";

const steps = [
  {
    num: "1",
    icon: Upload,
    title: "Wgraj swojego skina",
    link: { href: "/konfigurator", label: "(INSTRUKCJA)" },
    text: "Przeciągnij plik PNG ze swoim skinem Minecraft (64×64 lub 128×128)",
  },
  {
    num: "2",
    icon: Ruler,
    title: "Wybierz format",
    text: "Zdecyduj, jaki rozmiar obrazka najlepiej pasuje do Twojego pokoju",
  },
  {
    num: "3",
    icon: ShoppingCart,
    title: "Złóż zamówienie",
    text: "Wypełnij dane do wysyłki i dokonaj bezpiecznej płatności",
  },
  {
    num: "4",
    icon: CircleCheck,
    title: "Gotowe!",
    text: "Odbierz paczkę i powieś obraz na ścianie",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <p className="pixel-label text-grass text-center">Proces</p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold text-white md:text-4xl">
          Jak to działa?
        </h2>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border-2 border-border shadow-2xl">
          <Image
            src="/images/products/twojskinek/product-concept.png"
            alt="Od skina Minecraft do obrazu na płótnie — koncepcja produktu"
            width={1200}
            height={800}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="relative mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-grass font-display text-2xl font-bold text-primary-foreground">
                {step.num}
                <span className="absolute -bottom-1 -right-1 flex size-10 items-center justify-center rounded-full bg-surface-elevated border-2 border-border">
                  <step.icon className="size-5 text-grass" />
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {step.title}{" "}
                {step.link && (
                  <Link
                    href={step.link.href}
                    className="text-sm font-semibold text-sky underline-offset-2 hover:underline"
                  >
                    {step.link.label}
                  </Link>
                )}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
