import Link from "next/link";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { products } from "@/lib/cms/data";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const featured = products.slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <div className="container-site section-padding text-center">
          <p className="font-mono text-6xl font-bold text-primary">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">
            Strona nie istnieje
          </h1>
          <p className="mt-4 text-muted-foreground">
            Ta strona zniknęła jak diamentowy kilof w lawie.
          </p>
          <Link
            href="/"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-12")}
          >
            Wróć na stronę główną
          </Link>
        </div>
        <div className="container-site pb-24">
          <h2 className="mb-6 font-display text-xl font-semibold">
            Może Cię zainteresuje
          </h2>
          <ProductGrid products={featured} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
