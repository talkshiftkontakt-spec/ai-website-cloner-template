import Link from "next/link";

import { PaymentBadges } from "@/components/marketing/TrustStrip";
import { siteConfig } from "@/lib/site";

const shopLinks = [
  { label: "Wszystkie główki", href: "/kolekcje/wszystkie" },
  { label: "Ikony Minecraft", href: "/kolekcje/ikony-minecraft" },
  { label: "Limitowane", href: "/kolekcje/limitowane" },
  { label: "Personalizuj", href: "/konfigurator" },
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Inspiracje", href: "/inspiracje" },
  { label: "Blog", href: "/blog" },
];

const legalLinks = [
  { label: "Regulamin", href: "/regulamin" },
  { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
  { label: "Polityka zwrotów", href: "/polityka-zwrotow" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-site section-padding pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-sm font-black text-primary-foreground">
                H
              </span>
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground text-pretty">
              {siteConfig.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.social.hashtag}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Sklep
            </h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Pomoc
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
              Kontakt
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address}</li>
              <li>NIP: {siteConfig.nip}</li>
              <li>KRS: {siteConfig.krs}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <PaymentBadges className="mb-6" />
          <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.</p>
            <p>
              Minecraft jest znakiem towarowym Mojang AB. {siteConfig.name} nie jest powiązany z Mojang AB.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-muted-foreground hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
