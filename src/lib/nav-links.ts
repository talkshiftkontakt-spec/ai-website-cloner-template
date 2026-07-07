export const navLinks = [
  { label: "strona główna", href: "/" },
  { label: "Specjaliści", href: "/specjalisci" },
  {
    label: "Oferta",
    href: "/oferta",
    children: [
      {
        label: "Diagnoza",
        children: [
          { label: "Dzieci i młodzież", href: "/diagnostyka-dzieci-i-mlodziezy" },
          { label: "Dorośli", href: "/diagnostyka-doroslych" },
        ],
      },
      {
        label: "Leczenie i wsparcie",
        children: [
          { label: "Dzieci, młodzież i rodziny", href: "/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny" },
          { label: "Dorośli", href: "/leczenie-i-wsparcie-doroslych" },
        ],
      },
    ],
  },
  { label: "cennik", href: "/cennik" },
  { label: "Kontakt", href: "/kontakt" },
] as const;
