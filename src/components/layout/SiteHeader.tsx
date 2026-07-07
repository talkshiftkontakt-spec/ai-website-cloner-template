"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, Upload, X } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/lib/commerce/cart-store";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Kolekcje",
    href: "/kolekcje",
    children: [
      { label: "Wszystkie", href: "/kolekcje/wszystkie" },
      { label: "Ikony Minecraft", href: "/kolekcje/ikony-minecraft" },
      { label: "Twórcy", href: "/kolekcje/tworcy" },
      { label: "Limitowane", href: "/kolekcje/limitowane" },
      { label: "Personalizowane", href: "/kolekcje/personalizowane" },
    ],
  },
  { label: "Personalizuj", href: "/konfigurator" },
  { label: "Inspiracje", href: "/inspiracje" },
  { label: "O nas", href: "/o-nas" },
  { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-border bg-background/90 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.25rem]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-foreground"
        >
          <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-grass-dark bg-white">
            <Image
              src="/images/products/twojskinek/product-closeup.png"
              alt=""
              width={32}
              height={32}
              className="object-cover"
              aria-hidden
            />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Główne menu">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <button
                  type="button"
                  className={cn(
                    "rounded-sm px-3 py-2 font-display text-sm font-semibold transition-colors hover:bg-surface hover:text-foreground",
                    pathname.startsWith("/kolekcje")
                      ? "text-grass"
                      : "text-muted-foreground",
                  )}
                  aria-expanded={collectionsOpen}
                >
                  {link.label}
                </button>
                {collectionsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 mc-panel p-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm px-3 py-2 font-display text-sm font-semibold transition-colors hover:bg-surface hover:text-foreground",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "text-grass"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/koszyk"
            aria-label={`Koszyk, ${itemCount} produktów`}
            className="relative flex size-10 items-center justify-center rounded-sm border-2 border-border bg-surface text-muted-foreground transition-colors hover:border-grass hover:text-foreground lg:hidden"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-sm bg-grass font-pixel text-[9px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-sm lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Otwórz menu"
          >
            <Menu />
          </Button>

          <Link href="/konfigurator" className="mc-button hidden !py-2 !px-4 !text-sm sm:inline-flex">
            <Upload className="size-4" aria-hidden />
            Zamów obrazek
          </Link>

          <Link
            href="/koszyk"
            aria-label={`Koszyk, ${itemCount} produktów`}
            className="relative hidden size-10 items-center justify-center rounded-sm border-2 border-border bg-surface text-muted-foreground transition-colors hover:border-grass hover:text-foreground lg:flex"
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-sm bg-grass font-pixel text-[9px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 flex h-full w-full max-w-sm flex-col border-l-[3px] border-border bg-background">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="font-display text-lg font-bold">{siteConfig.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-sm"
                onClick={() => setMobileOpen(false)}
                aria-label="Zamknij menu"
              >
                <X />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label="Menu mobilne">
              <Link
                href="/konfigurator"
                onClick={() => setMobileOpen(false)}
                className="mc-button mb-3 justify-center"
              >
                <Upload className="size-4" aria-hidden />
                Stwórz swój obrazek
              </Link>
              {navLinks.flatMap((link) =>
                link.children
                  ? link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-sm px-4 py-3 font-display font-semibold text-foreground hover:bg-surface"
                      >
                        {child.label}
                      </Link>
                    ))
                  : [
                      <Link
                        key={link.href}
                        href={link.href!}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-sm px-4 py-3 font-display font-semibold text-foreground hover:bg-surface"
                      >
                        {link.label}
                      </Link>,
                    ],
              )}
              <Link
                href="/koszyk"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-sm border-2 border-grass bg-grass/10 px-4 py-3 text-center font-display font-bold text-grass"
              >
                Koszyk ({itemCount})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
