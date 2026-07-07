"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CaretDownIcon } from "@/components/icons";
import { images, navLinks } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#2a3532] text-white shadow-md">
      <div className="mx-auto flex max-w-[1325px] items-center justify-between px-6 py-3 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src={images.logo}
            alt="Gabinety Pomorska"
            width={56}
            height={56}
            className="h-12 w-12 object-contain md:h-14 md:w-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Menu główne">
          {navLinks.map((link) => (
            <NavItem key={link.label} link={link} />
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded lg:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-6 w-6" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden>
            {mobileOpen ? (
              <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z" />
            ) : (
              <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-[#2a3532] px-6 py-4 lg:hidden" aria-label="Menu mobilne">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <MobileNavItem link={link} onNavigate={() => setMobileOpen(false)} />
              </li>
            ))}
          </ul>
        </nav>
      )}
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
          "px-4 py-2 text-[15px] capitalize text-white/90 transition hover:text-white",
          link.label === "strona główna" && "text-white underline underline-offset-4"
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
        className="flex items-center gap-1 px-4 py-2 text-[15px] capitalize text-white/90 transition hover:text-white"
      >
        {link.label}
        <CaretDownIcon className="h-3 w-3 opacity-70" />
      </Link>
      <div className="invisible absolute left-0 top-full min-w-[220px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <ul className="rounded bg-white py-2 text-[#333] shadow-lg">
          {link.children.map((group) => (
            <li key={group.label}>
              <span className="block px-4 py-2 text-sm font-medium text-[#134340]">{group.label}</span>
              <ul>
                {group.children.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="block px-6 py-1.5 text-sm text-[#333] hover:text-[#879d91]">
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

function MobileNavItem({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const hasChildren = "children" in link && link.children;

  return (
    <div>
      <Link
        href={link.href}
        className="block py-2 capitalize text-white/90 hover:text-white"
        onClick={onNavigate}
      >
        {link.label}
      </Link>
      {hasChildren &&
        link.children.map((group) => (
          <div key={group.label} className="ml-4 border-l border-white/20 pl-3">
            <p className="py-1 text-sm text-white/60">{group.label}</p>
            {group.children.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-1 text-sm text-white/80 hover:text-white"
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
}
