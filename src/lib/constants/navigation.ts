export const NAV_LINKS = [
  { label: "Oferta", href: "#cennik" },
  { label: "Jak działa", href: "#jak-dziala" },
  { label: "Cennik", href: "#cennik" },
  { label: "FAQ", href: "#faq" },
] as const;

export const FOOTER_LINKS = {
  oferta: [
    { label: "Starter", href: "#cennik" },
    { label: "Standard", href: "#cennik" },
    { label: "Premium", href: "#cennik" },
  ],
  wiedza: [
    { label: "Odchudzanie", href: "#" },
    { label: "Otyłość", href: "#" },
    { label: "Odżywianie", href: "#" },
    { label: "Trening", href: "#" },
  ],
  firma: [
    { label: "O nas", href: "#trener" },
    { label: "Regulamin", href: "#" },
    { label: "Prywatność", href: "#" },
  ],
  kontakt: [
    { label: "kontakt@lekkistart.pl", href: "mailto:kontakt@lekkistart.pl" },
    { label: "+48 000 000 000", href: "tel:+48000000000" },
  ],
} as const;
