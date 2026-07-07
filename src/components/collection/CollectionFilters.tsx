"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SortOption } from "@/lib/cms/data";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popularność" },
  { value: "price-asc", label: "Cena: rosnąco" },
  { value: "price-desc", label: "Cena: malejąco" },
  { value: "newest", label: "Nowości" },
  { value: "limited", label: "Limitowane" },
];

interface CollectionFiltersProps {
  className?: string;
}

export function CollectionFilters({ className }: CollectionFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div className={className}>
      <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
        <div>
          <Label htmlFor="search">Szukaj</Label>
          <Input
            id="search"
            placeholder="Steve, limitowana…"
            defaultValue={searchParams.get("q") ?? ""}
            onChange={(e) => updateParam("q", e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="sort">Sortowanie</Label>
          <select
            id="sort"
            value={searchParams.get("sort") ?? "popular"}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="mt-2 flex h-12 w-full rounded-lg border border-border bg-surface-elevated px-4 text-sm text-foreground"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="text-sm font-medium">Typ edycji</legend>
          <div className="mt-2 space-y-2">
            {[
              { value: "", label: "Wszystkie" },
              { value: "limited", label: "Limitowane" },
              { value: "standard", label: "Standardowe" },
              { value: "custom", label: "Personalizowane" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="edition"
                  checked={(searchParams.get("edition") ?? "") === opt.value}
                  onChange={() => updateParam("edition", opt.value)}
                  className="accent-primary"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Link
          href="?"
          className="block text-center text-sm text-primary hover:underline"
        >
          Wyczyść filtry
        </Link>
      </div>
    </div>
  );
}
