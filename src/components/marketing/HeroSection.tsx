import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { TrustStrip } from "@/components/marketing/TrustStrip";
import { buttonVariants } from "@/components/ui/button-variants";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden spotlight-gradient">
      <div className="container-site section-padding">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Kolekcja Główek · Premium
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Fizyczne główki Minecraft.{" "}
              <span className="text-primary">Stworzone do kolekcji.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              {siteConfig.description} Każda główka wykonana ręcznie w Polsce z
              żywicy premium — gotowa na Twoją półkę gamingową.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kolekcje/wszystkie"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
              >
                Przeglądaj kolekcję
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/konfigurator"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8 text-base",
                )}
              >
                Wgraj własny skin
              </Link>
            </div>
            <TrustStrip compact />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl lg:aspect-square">
            <Image
              src="/images/products/netherite-lifestyle.svg"
              alt="Kolekcjonerska główka Minecraft na półce gamingowej"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
