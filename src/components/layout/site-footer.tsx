import Link from "next/link";

import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-canvas-sunken py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-primary"
            >
              LekkiStart
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">
              Premium coaching online dla osób z nadwagą i otyłością.
              Indywidualnie. Uczciwie. Bez presji.
            </p>
          </div>

          <div>
            <p className="text-label text-tertiary">Oferta</p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.oferta.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-tertiary">Wiedza</p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.wiedza.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-tertiary">Firma</p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.firma.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-label mt-8 text-tertiary">Kontakt</p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.kontakt.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-sm text-tertiary">
          © {new Date().getFullYear()} LekkiStart.pl. Wszelkie prawa zastrzeżone.
        </div>
      </Container>
    </footer>
  );
}
