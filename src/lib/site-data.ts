export const images = {
  logo: "/images/gabinetpomorska/cropped-Tlo-usuniete-logo-male.png",
  logoFooter: "/images/gabinetpomorska/cropped-logo-male-2-png.png",
  heroInterior: "/images/gabinetpomorska/20250215-BrainTechLab-wnetrza-web-001.jpg",
  placeholder: "/images/gabinetpomorska/cropped-logo-male-2-png-300x300.png",
  gallery: [
    "/images/gabinetpomorska/20250215-BrainTechLab-wnetrza-web-005.jpg",
    "/images/gabinetpomorska/20250215-BrainTechLab-wnetrza-web-014.jpg",
    "/images/gabinetpomorska/20250215-BrainTechLab-wnetrza-web-007.jpg",
  ],
} as const;

export const navLinks = [
  { label: "strona główna", href: "/" },
  { label: "Specjaliści", href: "https://www.gabinetpomorska.pl/specjalisci/" },
  {
    label: "Oferta",
    href: "https://www.gabinetpomorska.pl/oferta/",
    children: [
      {
        label: "Diagnoza",
        children: [
          { label: "Dzieci i młodzież", href: "https://www.gabinetpomorska.pl/diagnostyka-dzieci-i-mlodziezy/" },
          { label: "Dorośli", href: "https://www.gabinetpomorska.pl/diagnostyka-doroslych/" },
        ],
      },
      {
        label: "Leczenie i wsparcie",
        children: [
          { label: "Dzieci, młodzież i rodziny", href: "https://www.gabinetpomorska.pl/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny/" },
          { label: "Dorośli", href: "https://www.gabinetpomorska.pl/leczenie-i-wsparcie-doroslych/" },
        ],
      },
    ],
  },
  { label: "cennik", href: "https://www.gabinetpomorska.pl/cennik/" },
  { label: "Kontakt", href: "https://gabinetpomorska.pl/index.php/kontakt/" },
] as const;

export const services = [
  { title: "Psychiatria", href: undefined },
  { title: "Psychoterapia par", href: "https://www.gabinetpomorska.pl/terapia-par" },
  { title: "Psychoterapia", href: undefined },
  { title: "Terapia pedagogiczna", href: undefined },
  { title: "Diagnoza", href: undefined },
  { title: "Poradnictwo dietetyczne", href: undefined },
  { title: "Psychoterapia rodzinna", href: undefined },
  { title: "Konsultacje dla rodziców", href: undefined },
] as const;

export interface Specialist {
  name: string;
  role: string;
  image: string;
  href: string;
}

export const specialists: Specialist[] = [
  { name: "Joanna Boroń – Zyss", role: "lekarz psychiatra dzieci i młodzieży", image: "/images/gabinetpomorska/joanna-boron-zys-300x300.jpg", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#joanna-boron-zyss" },
  { name: "Hubert Sotwin", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/Hubert-300x300.jpg", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#hubert-sotwin" },
  { name: "Kacper Grochocki", role: "psycholog, certyfikowany psychoterapeuta", image: "/images/gabinetpomorska/Kacper-300x300.jpg", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#kacper-grochocki" },
  { name: "Marcelina Cieszewska – Sotwin", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/Marcelina-300x300.jpg", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#marcelina-cieszewska-sotwin" },
  { name: "Aleksandra Potysz – Rzyman", role: "psycholog, terapeuta kognitywny w trakcie specjalizacji z psychologii klinicznej", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#aleksandra-potysz-rzyman" },
  { name: "Piotr Nowak", role: "lekarz psychiatra dzieci i młodzieży", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#piotr-nowak" },
  { name: "Maciej Ostrykiewicz", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/maciej_foto-244x300.jpg", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#maciej-ostrykiewicz" },
  { name: "Aleksandra Nachyła-Szewczyk", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/aleksandra-nachyla-2-1374x2048.jpg-e1755779336680-300x300.webp", href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#aleksandra-nachyla-szewczyk" },
  { name: "Zofia Szostak-Kędzierska", role: "psycholog, psychoterapeuta", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#zofia-szostak-kedzierska" },
  { name: "Joanna Nerko", role: "psycholog, seksuolog psychoterapeuta", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#joanna-nerko" },
  { name: "Magdalena Perzanowska", role: "psycholog, psychoterapeuta", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#magdalena-perzanowska" },
  { name: "Agnieszka Balicka", role: "psycholog", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#agnieszka-balicka" },
  { name: "Dorota Janik", role: "dietetyk", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#dorota-janik" },
  { name: "Justyna Wasil", role: "pedagog specjalny, logopeda", image: images.placeholder, href: "https://www.gabinetpomorska.pl/index.php/specjalisci/#justyna-wasil" },
];

export const pricingItems = [
  { title: "Konsultacja wstępna psychiatryczna", price: "350 zł", description: "Konsultacja pierwszorazowa lekarza specjalisty psychiatrii dzieci i młodzieży" },
  { title: "Konsultacja wstępna psychologiczna", price: "250 zł", description: "Konsultacja pierwszorazowa u psychologa diagnosty lub psychoterapeuty" },
  { title: "Sesja psychoterapii", price: "200 zł", description: "Sesja psychoterapii w nurcie psychodynamicznym, psychodynamiczno-systemowym lub poznawczo-behawioralnym (CBT)" },
  { title: "Kompleksowa diagnoza wielospecjalistyczna", price: "1790 zł", description: "Konsultacja psychiatryczna, wywiad i badanie psychologiczna, obserwacja przez zespół psychologiczno-pedagogiczny, konsylium zespołu, wizyta podsumowująca proces diagnostyczny z psychologiem i psychiatrą, wydanie pisemnej opinii" },
  { title: "Diagnoza psychologiczna Skalą Inteligencji", price: "450 zł", description: "Stanford-Binet 5 lub IDS-2" },
  { title: "Wydanie pisemnej opinii psychologicznej", price: "150 zł", description: "Opinia dotycząca oceny stanu psychicznego, w tym ocena możliwości poznawczych" },
] as const;

export const footerLinks = [
  { label: "Regulamin Gabinetów", href: "https://www.gabinetpomorska.pl/regulamin-gabinetow/" },
  { label: "Polityka prywatności", href: "https://gabinetpomorska.pl/index.php/polityka-prywatnosci/" },
  { label: "Polityka plików cookies", href: "https://www.gabinetpomorska.pl/polityka-plikow-cookies/" },
  { label: "RODO", href: "https://gabinetpomorska.pl/index.php/rodo/" },
  { label: "Standardy ochrony małoletnich", href: "https://gabinetpomorska.pl/index.php/standardy-maloletnich/" },
] as const;
