export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: "laptop" | "calendar" | "user" | "chat";
}

export interface OfferCard {
  title: string;
  image: string;
  items: string[];
}

export interface AboutHighlight {
  title: string;
  description: string;
  icon: "award" | "book" | "umbrella";
}

export interface PricingPlan {
  title: string;
  price: number;
  unit: string;
  note: string;
  icon: "book" | "calculator" | "graduation";
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Oferta", href: "#oferta" },
  { label: "O mnie", href: "#omnie" },
  { label: "Jak wyglądają zajęcia?", href: "#zajecia" },
  { label: "Cennik", href: "#cennik" },
  { label: "Opinie", href: "#opinie" },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Lekcje 100% online",
    description:
      "Uczysz się w swoim miejscu, bez dojazdów i instalowania zbędnych programów.",
    icon: "laptop",
  },
  {
    title: "Elastyczne terminy",
    description:
      "Dostosowuję grafik do ucznia - oferuję stałe terminy lub godziny ruchome.",
    icon: "calendar",
  },
  {
    title: "Indywidualne podejście",
    description:
      "Każdy uczeń jest inny, dlatego plan nauki dopasowuję do potrzeb i tempa pracy.",
    icon: "user",
  },
  {
    title: "Swobodna atmosfera",
    description:
      "Tłumaczę w prosty sposób i zachęcam do zadawania pytań. U mnie nie ma stresu!",
    icon: "chat",
  },
];

export const OFFERS: OfferCard[] = [
  {
    title: "Szkoła podstawowa",
    image: "/images/1-8-KLASA-1.png",
    items: [
      "Nadrabianie zaległości",
      "Przygotowanie do klasówek",
      "Pomoc w bieżących zadaniach",
      "Przygotowanie do egzaminu 8-klasisty",
    ],
  },
  {
    title: "Liceum",
    image: "/images/LICEUM.png",
    items: [
      "Pomoc w bieżącym materiale",
      "Przygotowanie do matury",
      "Przygotowanie do sprawdzianów",
      "Nauka od podstaw lub rozszerzenie materiału",
    ],
  },
];

export const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    title: "Doświadczenie",
    description:
      "Pracowałam w firmie Tutore - tłumaczę prosto cierpliwie i bez zbędnego stresu.",
    icon: "award",
  },
  {
    title: "Egzaminy",
    description:
      'Intensywne przygotowania, praca na arkuszach CKE i omawianie "pewniaków"',
    icon: "book",
  },
  {
    title: "Bieżąca pomoc",
    description:
      "Nadrabianie zaległości, pomoc w zadaniach i przygotowanie do klasówek.",
    icon: "umbrella",
  },
];

export const PRICING: PricingPlan[] = [
  {
    title: "Klasy 4 – 6",
    price: 70,
    unit: "/60 min",
    note: "Lekcja online",
    icon: "book",
  },
  {
    title: "Klasy 7 – 8",
    price: 80,
    unit: "/60 min",
    note: "Lekcja online",
    icon: "calculator",
  },
  {
    title: "Klasy liceum",
    price: 100,
    unit: "/60 min",
    note: "Lekcja online",
    icon: "graduation",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marysia",
    role: "Uczennica klasy 8",
    image: "/images/4.png",
    rating: 5,
    quote:
      "Pani Julia prowadzi zajęcia spokojnie i bez stresu. W końcu zaczęłam rozumieć zadania, które wcześniej wydawały mi się bardzo trudne. Dzięki lekcjom poprawiłam wyniki z próbnych egzaminów.",
  },
  {
    name: "Anna",
    role: "Mama ucznia klasy 5",
    image: "/images/5.png",
    rating: 5,
    quote:
      "Bardzo dobre podejście do ucznia i dużo cierpliwości. Syn chętniej siada do matematyki i nie boi się już pytać, gdy czegoś nie rozumie. Najbardziej doceniam jasne tłumaczenie i dopasowanie tempa zajęć.",
  },
  {
    name: "Michał",
    role: "Uczeń liceum",
    image: "/images/1.png",
    rating: 5,
    quote:
      "Na lekcjach wszystko jest tłumaczone krok po kroku. Nawet trudniejsze tematy stają się prostsze, gdy są dobrze rozpisane i pokazane na przykładach. Po kilku spotkaniach o wiele łatwiej rozwiązuję zadania.",
  },
  {
    name: "Katarzyna",
    role: "Mama uczennicy klasy 8",
    image: "/images/6-1.png",
    rating: 5,
    quote:
      "Córka bardzo dobrze ocenia zajęcia i czuje się na nich swobodnie. Termin jednego spotkania trzeba było przełożyć, ale kontakt był szybki i bezproblemowy. Poza tym jesteśmy bardzo zadowolone ze współpracy.",
  },
  {
    name: "Zuzia",
    role: "uczennica klasy 7",
    image: "/images/7.png",
    rating: 5,
    quote:
      "Bardzo miła atmosfera i żadnego stresu przy popełnianiu błędów. Każde zadanie jest dokładnie omawiane, aż wszystko stanie się jasne. Dzięki tym zajęciom dostałam pierwszą piątkę z matematyki w tym roku.",
  },
  {
    name: "Tomasz",
    role: "Tata ucznia klasy 5",
    image: "/images/2.png",
    rating: 5,
    quote:
      "Profesjonalne i jednocześnie bardzo przyjazne podejście. Syn szybko nadrobił zaległości i zaczął samodzielnie odrabiać zadania domowe. Dużym plusem jest również możliwość zajęć online.",
  },
  {
    name: "Natalia",
    role: "uczennica liceum",
    image: "/images/8.png",
    rating: 5,
    quote:
      "Zajęcia są konkretne i dobrze przygotowane. Czasami tempo było dla mnie trochę szybkie, ale wystarczyło powiedzieć i wszystko zostało ponownie wyjaśnione. Ogólnie widzę dużą poprawę i zdecydowanie polecam.",
  },
  {
    name: "Monika",
    role: "Mama uczennicy klasy 4",
    image: "/images/9.png",
    rating: 5,
    quote:
      "Córka bardzo szybko polubiła te zajęcia. Lekcje są prowadzone w prosty i zrozumiały sposób, bez niepotrzebnego stresu. Po kilku tygodniach zauważyłam większą pewność siebie i lepsze oceny.",
  },
  {
    name: "Kacper",
    role: "Uczeń klasy 8",
    image: "/images/3.png",
    rating: 5,
    quote:
      "Dzięki zajęciom lepiej zrozumiałem zadania egzaminacyjne i nauczyłem się szybciej je rozwiązywać. Dużo pracowaliśmy na arkuszach CKE, co bardzo pomogło mi w przygotowaniach. Atmosfera jest luźna, ale na lekcji naprawdę dużo się robi.",
  },
  {
    name: "Paulina",
    role: "Uczennica liceum",
    image: "/images/10.png",
    rating: 5,
    quote:
      "Bardzo dobrze tłumaczone zadania i dużo cierpliwości. Czasami lekcja kończyła się dokładnie w momencie, gdy chciałam zadać jeszcze jedno pytanie, ale zawsze mogłam wrócić do niego na kolejnym spotkaniu. Poza tym zajęcia są naprawdę pomocne i przyjemne.",
  },
];

export const HERO_BULLETS = [
  { label: "Lekcje 100%\nOnline", icon: "laptop" as const },
  { label: "Indywdualne\npodejście", icon: "user" as const },
  { label: "Skutecznie\ni na luzie", icon: "umbrella" as const },
];

export const CONTACT = {
  phone: "+48 797 103 924",
  phoneHref: "tel:+48797103924",
  email: "korepetycjepro@outlook.com",
  emailHref: "mailto:korepetycjepro@outlook.com",
};
