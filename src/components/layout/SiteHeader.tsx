"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/lib/commerce/cart-store";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-black text-primary-foreground">
            H
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główne menu">
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
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface hover:text-foreground",
                    pathname.startsWith("/kolekcje")
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                  aria-expanded={collectionsOpen}
                >
                  {link.label}
                </button>
                {collectionsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border bg-surface-elevated p-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface hover:text-foreground",
                  pathname === link.href || pathname.startsWith(`${link.href}/`)
                    ? "text-primary"
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
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative lg:hidden",
            )}
          >
            <ShoppingBag />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Otwórz menu">
            <Menu />
          </Button>

          <Link
            href="/konfigurator"
            className={cn(buttonVariants({ variant: "outline" }), "hidden sm:inline-flex")}
          >
            Stwórz swoją główkę
          </Link>

          <Link
            href="/koszyk"
            aria-label={`Koszyk, ${itemCount} produktów`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative hidden lg:inline-flex",
            )}
          >
            <ShoppingBag />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 flex h-full w-full max-w-sm flex-col bg-background border-l border-border">
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-display font-bold">{siteConfig.name}</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Zamknij menu">
                <X />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 p-4" aria-label="Menu mobilne">
              {navLinks.flatMap((link) =>
                link.children
                  ? link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-surface"
                      >
                        {child.label}
                      </Link>
                    ))
                  : [
                      <Link
                        key={link.href}
                        href={link.href!}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-surface"
                      >
                        {link.label}
                      </Link>,
                    ],
              )}
              <Link
                href="/koszyk"
                onClick={() => setMobileOpen(false)}
                className="mt-4 rounded-lg bg-primary px-4 py-3 text-center font-semibold text-primary-foreground"
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
