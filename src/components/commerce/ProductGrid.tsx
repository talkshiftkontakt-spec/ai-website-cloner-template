import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-12 text-center">
        <p className="text-lg font-semibold text-foreground">Brak produktów</p>
        <p className="mt-2 text-muted-foreground">
          Spróbuj zmienić filtry lub wyszukiwanie.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
}
