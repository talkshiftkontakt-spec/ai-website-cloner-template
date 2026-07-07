"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { CaretDownIcon } from "@/components/icons";
import { images, navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#1f2b28]/95 shadow-lg backdrop-blur-md"
          : "bg-[#1f2b28]"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={images.logo}
            alt="Gabinety Pomorska"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden font-[family-name:var(--font-heading)] text-sm font-bold tracking-wide text-white sm:block">
            Gabinety Pomorska
          </span>
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Menu główne">
          <ul className="flex items-center">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavItem link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="#formularz-kontaktowy" className="gp-btn gp-btn-primary text-sm">
            Formularz kontaktowy
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded text-white touch-manipulation [-webkit-tap-highlight-color:transparent] [&::-webkit-details-marker]:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6 group-open:hidden"
              viewBox="0 0 1000 1000"
              fill="currentColor"
              aria-hidden
            >
              <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
            </svg>
            <svg
              className="hidden h-6 w-6 group-open:block"
              viewBox="0 0 1000 1000"
              fill="currentColor"
              aria-hidden
            >
              <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z" />
            </svg>
          </summary>

          <nav
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#1f2b28] px-6 py-4"
            aria-label="Menu mobilne"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <MobileNavItem link={link} />
                </li>
              ))}
            </ul>
            <Link href="#formularz-kontaktowy" className="gp-btn gp-btn-primary mt-4 w-full">
              Formularz kontaktowy
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

type NavLink = (typeof navLinks)[number];

function NavItem({ link }: { link: NavLink }) {
  const hasChildren = "children" in link && link.children;

  if (!hasChildren) {
    return (
      <Link
        href={link.href}
        className={cn(
          "whitespace-nowrap px-3 py-2 text-sm capitalize text-white/85 transition hover:text-white",
          link.label === "strona główna" && "text-white"
        )}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={link.href}
        className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm capitalize text-white/85 transition hover:text-white"
      >
        {link.label}
        <CaretDownIcon className="h-3 w-3 opacity-70" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <ul className="rounded-xl border border-[#134340]/10 bg-white py-2 shadow-xl">
          {link.children.map((group) => (
            <li key={group.label}>
              <span className="block px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#134340]/70">
                {group.label}
              </span>
              <ul>
                {group.children.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-sm text-[#333] transition hover:bg-[#f8faf9] hover:text-[#134340]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function closeMobileMenu(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

function MobileNavItem({ link }: { link: NavLink }) {
  const hasChildren = "children" in link && link.children;

  return (
    <div>
      <Link
        href={link.href}
        className="block py-2 capitalize text-white/90"
        onClick={closeMobileMenu}
      >
        {link.label}
      </Link>
      {hasChildren &&
        link.children.map((group) => (
          <div key={group.label} className="ml-3 border-l border-white/15 pl-3">
            <p className="py-1 text-xs uppercase tracking-wide text-white/50">{group.label}</p>
            {group.children.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-1.5 text-sm text-white/80"
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}
