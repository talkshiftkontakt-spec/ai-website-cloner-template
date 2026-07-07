import { navLinks } from "@/lib/nav-links";

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

export { navLinks };

export const services = [
  { title: "Psychiatria", href: "/oferta" },
  { title: "Psychoterapia par", href: "/terapia-par" },
  { title: "Psychoterapia", href: "/leczenie-i-wsparcie-doroslych" },
  { title: "Terapia pedagogiczna", href: "/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny" },
  { title: "Diagnoza", href: "/diagnostyka-dzieci-i-mlodziezy" },
  { title: "Poradnictwo dietetyczne", href: "/oferta" },
  { title: "Psychoterapia rodzinna", href: "/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny" },
  { title: "Konsultacje dla rodziców", href: "/leczenie-i-wsparcie-dzieci-mlodziez-i-rodziny" },
] as const;

export interface Specialist {
  name: string;
  role: string;
  image: string;
  href: string;
}

export const specialists: Specialist[] = [
  { name: "Joanna Boroń – Zyss", role: "lekarz psychiatra dzieci i młodzieży", image: "/images/gabinetpomorska/joanna-boron-zys-300x300.jpg", href: "/specjalisci#joanna-boron-zyss" },
  { name: "Hubert Sotwin", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/Hubert-300x300.jpg", href: "/specjalisci#hubert-sotwin" },
  { name: "Kacper Grochocki", role: "psycholog, certyfikowany psychoterapeuta", image: "/images/gabinetpomorska/Kacper-300x300.jpg", href: "/specjalisci#kacper-grochocki" },
  { name: "Marcelina Cieszewska – Sotwin", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/Marcelina-300x300.jpg", href: "/specjalisci#marcelina-cieszewska-sotwin" },
  { name: "Aleksandra Potysz – Rzyman", role: "psycholog, terapeuta kognitywny w trakcie specjalizacji z psychologii klinicznej", image: images.placeholder, href: "/specjalisci#aleksandra-potysz-rzyman" },
  { name: "Piotr Nowak", role: "lekarz psychiatra dzieci i młodzieży", image: images.placeholder, href: "/specjalisci#piotr-nowak" },
  { name: "Maciej Ostrykiewicz", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/maciej_foto-244x300.jpg", href: "/specjalisci#maciej-ostrykiewicz" },
  { name: "Aleksandra Nachyła-Szewczyk", role: "psycholog, psychoterapeuta", image: "/images/gabinetpomorska/aleksandra-nachyla-2-1374x2048.jpg-e1755779336680-300x300.webp", href: "/specjalisci#aleksandra-nachyla-szewczyk" },
  { name: "Zofia Szostak-Kędzierska", role: "psycholog, psychoterapeuta", image: images.placeholder, href: "/specjalisci#zofia-szostak-kedzierska" },
  { name: "Joanna Nerko", role: "psycholog, seksuolog psychoterapeuta", image: images.placeholder, href: "/specjalisci#joanna-nerko" },
  { name: "Magdalena Perzanowska", role: "psycholog, psychoterapeuta", image: images.placeholder, href: "/specjalisci#magdalena-perzanowska" },
  { name: "Agnieszka Balicka", role: "psycholog", image: images.placeholder, href: "/specjalisci#agnieszka-balicka" },
  { name: "Dorota Janik", role: "dietetyk", image: images.placeholder, href: "/specjalisci#dorota-janik" },
  { name: "Justyna Wasil", role: "pedagog specjalny, logopeda", image: images.placeholder, href: "/specjalisci#justyna-wasil" },
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
