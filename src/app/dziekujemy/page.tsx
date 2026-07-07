import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orderNumber = params.order ?? null;

  return (
    <div className="container-site section-padding text-center">
      <div className="mx-auto max-w-lg">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="font-display text-4xl font-bold">Dziękujemy za zamówienie!</h1>
        {orderNumber ? (
          <p className="mt-4 text-muted-foreground">
            Numer zamówienia:{" "}
            <strong className="font-mono text-foreground">{orderNumber}</strong>
          </p>
        ) : null}
        <p className="mt-4 text-muted-foreground">
          Potwierdzenie wysłaliśmy na Twój email. Realizacja rozpocznie się po
          zaksięgowaniu płatności (3–5 dni roboczych).
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/kolekcje/wszystkie"
            className={cn(buttonVariants({ size: "lg" }), "h-12")}
          >
            Kontynuuj zakupy
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12")}
          >
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}
