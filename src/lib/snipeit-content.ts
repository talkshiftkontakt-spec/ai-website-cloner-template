export const ASSET = "/images/snipeit" as const;

export const NAV_LINKS = [
  { href: "#hero", label: "Strona główna" },
  { href: "#produkt", label: "Produkt" },
  { href: "#plany", label: "Plany" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const CATEGORIES = [
  { label: "Telefony komórkowe", icon: `${ASSET}/smartphone.svg` },
  { label: "Części samochodowe", icon: `${ASSET}/car-front.svg` },
  { label: "Części RTV", icon: `${ASSET}/laptop-minimal.svg` },
  { label: "Obuwie", icon: `${ASSET}/footprints.svg` },
  { label: "Odzież", icon: `${ASSET}/shirt.svg` },
  { label: "Pojazdy", icon: `${ASSET}/car.svg` },
  { label: "Nieruchomości", icon: `${ASSET}/house.svg` },
  { label: "Zobacz wszystkie", icon: `${ASSET}/arrow-see-all.svg`, seeAll: true },
] as const;

export const NEW_OFFERS = [
  {
    title: "IPhone 13 Pro",
    location: "Ostrowiec Świętokrzyski",
    price: "439,00 zł",
    image: `${ASSET}/iphone13pro.webp`,
  },
  {
    title: "IPhone 17 Pro",
    location: "Warszawa",
    price: "2139,00 zł",
    image: `${ASSET}/iphone17pro.webp`,
  },
  {
    title: "IPhone 14 Pro",
    location: "Bielsko-biała",
    price: "1930,00 zł",
    image: `${ASSET}/iphone14pro.webp`,
  },
  {
    title: "IPhone 14 Pro",
    location: "Bielsko-biała",
    price: "1999,00 zł",
    image: `${ASSET}/iphone14pro.webp`,
  },
  {
    title: "IPhone XS",
    location: "Gdańsk",
    price: "100,00 zł",
    image: `${ASSET}/iphonexs.webp`,
  },
] as const;

export const SOURCE_LOGOS = [
  { src: `${ASSET}/sources/allegro.svg`, alt: "Allegro" },
  { src: `${ASSET}/sources/allegro-lokalnie.svg`, alt: "Allegro Lokalnie" },
  { src: `${ASSET}/sources/olx.svg`, alt: "OLX" },
  { src: `${ASSET}/sources/otomoto.svg`, alt: "OtoMoto" },
  { src: `${ASSET}/sources/otodom.svg`, alt: "Otodom" },
  { src: `${ASSET}/sources/vinted.svg`, alt: "Vinted" },
] as const;

export const CAR_NOTIFICATIONS = [
  {
    title: "Volkswagen T-Roc 1.5 TSI GPF",
    price: "84 800 zł",
    source: "Otomoto",
    sourceIcon: `${ASSET}/sources/otomoto.svg`,
    image: `${ASSET}/car1.webp`,
    offsetX: "-32%",
  },
  {
    title: "Mazda 2 SKYACTIV-G 90 Homura",
    price: "42 999 zł",
    source: "OLX",
    sourceIcon: `${ASSET}/sources/olx.svg`,
    image: `${ASSET}/car2.webp`,
    offsetX: "30%",
  },
  {
    title: "Audi A4 2.0 TDI Quattro S-Line",
    price: "58 500 zł",
    source: "Otomoto",
    sourceIcon: `${ASSET}/sources/otomoto.svg`,
    image: `${ASSET}/car3.webp`,
    offsetX: "-28%",
  },
  {
    title: "BMW 320d Sport Line",
    price: "67 900 zł",
    source: "OLX",
    sourceIcon: `${ASSET}/sources/olx.svg`,
    image: `${ASSET}/car4.webp`,
    offsetX: "26%",
  },
  {
    title: "Toyota Corolla 1.8 Hybrid",
    price: "82 500 zł",
    source: "Otomoto",
    sourceIcon: `${ASSET}/sources/otomoto.svg`,
    image: `${ASSET}/car5.webp`,
    offsetX: "-34%",
  },
  {
    title: "Skoda Octavia RS 2.0 TSI",
    price: "74 300 zł",
    source: "OLX",
    sourceIcon: `${ASSET}/sources/olx.svg`,
    image: `${ASSET}/car6.webp`,
    offsetX: "34%",
  },
] as const;

export const PRICING_PLANS = [
  {
    id: "basic" as const,
    name: "Basic",
    description: "Dla handlowców, miłośników zakupów, fliperów",
    monthlyPrice: "zł 49,99",
    yearlyPrice: "zł 44,99",
    yearlySavings: "Oszczędzasz 60,00 zł / rok",
    cta: "Wybierz plan",
    features: [
      "Do 5 aktywnych monitorów",
      "Śledzenie rzeczy po słowach kluczowych",
      "Inteligentne, zintegrowane przypomnienia",
      "Wykrywanie podejrzanych ogłoszeń",
      "Inteligentne sortowanie",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    description: "Dla wymagających użytkowników",
    monthlyPrice: "zł 99,99",
    yearlyPrice: "zł 89,99",
    yearlySavings: "Oszczędzasz 120,00 zł / rok",
    cta: "Wybierz plan",
    popular: true,
    features: [
      "Do 25 aktywnych monitorów",
      "Śledzenie rzeczy po słowach kluczowych",
      "Inteligentne, zintegrowane przypomnienia",
      "Wykrywanie podejrzanych ogłoszeń",
      "Inteligentne sortowanie",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    description: "Dla przedsiębiorstw oraz większych firm",
    monthlyPrice: null,
    yearlyPrice: null,
    yearlySavings: null,
    cta: "Skontaktuj się",
    features: [
      "Bez limitu monitorów",
      "Webhooki i dostęp do API",
      "Wielu użytkowników, wspólne monitory",
      "Dedykowany opiekun oraz wsparcie",
      "Dostosowane funkcje",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: "Czym jest SnipeIT?",
    answer:
      "SnipeIT to agregator ogłoszeń, w którym w czasie rzeczywistym nasi pracownicy skanują najpopularniejsze portale (OLX, Allegro, Vinted, Otomoto i inne) i zbiera wszystkie oferty w jednym, przejrzystym widoku.",
  },
  {
    question: "Które portale są obsługiwane?",
    answer:
      "Monitorujemy m.in OLX, Allegro, Allegro Lokalnie, Vinted, OtoMoto, OLX i OtoDom. Listę obsługiwanych platform stale rozszerzamy",
  },
  {
    question: "Jak działają powiadomienia o nowych ofertach?",
    answer:
      "Ustawiasz frazy kluczowe i filtry, a SnipeIT na bieżąco sprawdza portale i powiadamia Cię natychmiast, gdy pojawi się pasujące ogłoszenie — dzięki temu jesteś pierwszy przy okazji.",
  },
  {
    question: "Czy mogę śledzić kilka wyszukiwań jednocześnie?",
    answer:
      "Tak. Możesz utworzyć dowolną liczbę zapisanych wyszukiwań z osobnymi filtrami kategorii, ceny i lokalizacji, a każde z nich monitorujemy niezależnie.",
  },
  {
    question: "Jak SnipeIT zdobywa ogłoszenia?",
    answer:
      "Posiadamy tysiące pracowników położonych w Indiach którzy skuteczne i szybko przepisują ogłoszenia do naszego systemu.",
  },
  {
    question: "Czy wykrywacie podejrzane ogłoszenia?",
    answer:
      "Tak. SnipeIT oznacza i pozwala odfiltrować ogłoszenia o cechach typowych dla oszustw, abyś mógł kupować bezpieczniej.",
  },
  {
    question: "Ile kosztuje korzystanie z SnipeIT?",
    answer:
      "Oferujemy plan dla osób prywatnych oraz plan dla firm. Szczegóły i aktualne ceny znajdziesz w sekcji „Elastyczna subskrypcja” powyżej.",
  },
  {
    question: "Czy mogę zrezygnować w dowolnym momencie?",
    answer:
      "Tak, subskrypcję możesz anulować kiedy chcesz — zachowujesz dostęp do końca opłaconego okresu rozliczeniowego.",
  },
];
