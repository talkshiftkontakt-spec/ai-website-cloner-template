import type { CollectionCategory, Product, ProductReview } from "@/types/product";

const defaultReviews: ProductReview[] = [
  {
    id: "r1",
    author: "Kacper M.",
    rating: 5,
    date: "2026-05-12",
    content:
      "Jakość wykonania przerosła moje oczekiwania. Główka Steve'a wygląda jak z muzeum na mojej półce z figurkami.",
    verified: true,
  },
  {
    id: "r2",
    author: "Natalia W.",
    rating: 5,
    date: "2026-04-28",
    content:
      "Kupiłam limitowaną edycję na prezent — pakowanie premium, dostawa w 4 dni. Syn był zachwycony.",
    verified: true,
  },
  {
    id: "r3",
    author: "Michał K.",
    rating: 5,
    date: "2026-06-01",
    content:
      "Wgrałem własny skin przez konfigurator — podgląd 3D pomógł, a finalny produkt jest identyczny.",
    verified: true,
  },
];

function makeVariants(
  basePrice: number,
  compareAt?: number,
): Product["variants"] {
  return [
    {
      id: "v-s-matte",
      sku: "HC-S-M",
      name: "Standard 12 cm — Mat",
      price: basePrice,
      compareAtPrice: compareAt,
      stock: 24,
      attributes: { size: "S", finish: "matte", base: "none" },
    },
    {
      id: "v-m-matte",
      sku: "HC-M-M",
      name: "Kolekcjonerska 15 cm — Mat",
      price: basePrice + 5000,
      compareAtPrice: compareAt ? compareAt + 5000 : undefined,
      stock: 18,
      attributes: { size: "M", finish: "matte", base: "none" },
    },
    {
      id: "v-m-oak",
      sku: "HC-M-O",
      name: "Kolekcjonerska 15 cm + Podstawa dębowa",
      price: basePrice + 12000,
      compareAtPrice: compareAt ? compareAt + 12000 : undefined,
      stock: 12,
      attributes: { size: "M", finish: "matte", base: "oak" },
    },
    {
      id: "v-l-gloss",
      sku: "HC-L-G",
      name: "Premium 18 cm — Połysk",
      price: basePrice + 18000,
      compareAtPrice: compareAt ? compareAt + 18000 : undefined,
      stock: 8,
      attributes: { size: "L", finish: "gloss", base: "none" },
    },
  ];
}

const defaultMaterials = [
  { name: "Materiał", value: "Żywica premium + pigmenty UV" },
  { name: "Wykończenie", value: "Ręczna obróbka i lakier ochronny" },
  { name: "Podstawa", value: "Opcjonalna — lite drewno dębowe" },
  { name: "Trwałość", value: "Odporność na blaknięcie i wilgoć" },
];

const defaultDimensions = {
  heightMm: 150,
  widthMm: 150,
  depthMm: 150,
  weightG: 280,
  boxSize: "18 × 18 × 20 cm",
};

export const collections: CollectionCategory[] = [
  {
    slug: "wszystkie",
    name: "Wszystkie główki",
    description: "Pełna kolekcja kolekcjonerskich główek Minecraft.",
    seoDescription:
      "Przeglądaj pełną kolekcję fizycznych główek Minecraft od HeadCraft. Ikony, limitowane edycje i personalizowane skiny.",
    image: "/images/collections/all.svg", // wszystkie
  },
  {
    slug: "ikony-minecraft",
    name: "Ikony Minecraft",
    description: "Steve, Creeper, Enderman i inne klasyki.",
    seoDescription:
      "Kolekcjonerskie główki ikonicznych postaci Minecraft. Idealne na półkę gamingową lub jako prezent.",
    image: "/images/collections/icons.svg",
  },
  {
    slug: "tworcy",
    name: "Twórcy",
    description: "Kolekcje stworzone we współpracy z polskimi YouTuberami.",
    seoDescription:
      "Oficjalne kolekcje główek Minecraft we współpracy z polskimi twórcami.",
    image: "/images/collections/creators.svg",
  },
  {
    slug: "limitowane",
    name: "Limitowane",
    description: "Edycje numerowane — gdy znikną, nie wrócą.",
    seoDescription:
      "Limitowane edycje kolekcjonerskich główek Minecraft. Numerowane egzemplarze w małych nakładach.",
    image: "/images/collections/limited.svg",
  },
  {
    slug: "personalizowane",
    name: "Personalizowane",
    description: "Twoja główka ze własnego skina.",
    seoDescription:
      "Zamów fizyczną główkę ze swojego skina Minecraft. Wgraj PNG lub wpisz nick.",
    image: "/images/collections/custom.svg",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "steve-klasyk",
    name: "Steve — Klasyk",
    shortDescription: "Ikoniczna główka Steve'a. Fundament każdej kolekcji.",
    description:
      "Steve to początek każdej przygody w Minecraft. Ta kolekcjonerska główka oddaje każdy piksel oryginalnej tekstury — od niebieskiej koszuli po charakterystyczne fioletowe spodnie. Wykonana z żywicy premium, ręcznie wykańczana w naszej pracowni we Wrocławiu.",
    categorySlug: "ikony-minecraft",
    categoryName: "Ikony Minecraft",
    tags: ["steve", "klasyk", "ikona"],
    images: [
      { url: "/images/products/steve-front.svg", alt: "Steve — widok z przodu", type: "front" },
      { url: "/images/products/steve-angle.svg", alt: "Steve — widok z boku", type: "angle" },
      { url: "/images/products/steve-lifestyle.svg", alt: "Steve na półce gamingowej", type: "lifestyle" },
    ],
    badge: "bestseller",
    priceFrom: 14900,
    compareAtPrice: 17900,
    variants: makeVariants(14900, 17900),
    materials: defaultMaterials,
    dimensions: defaultDimensions,
    editionType: "standard",
    isPersonalizable: false,
    relatedProductSlugs: ["creeper-zielony", "enderman-mroczny"],
    crossSellSlugs: ["podstawa-debowa", "zestaw-2-glowek"],
    reviews: defaultReviews,
    stock: 62,
    lore: "Pierwszy bohater. Pierwsza główka w kolekcji.",
  },
  {
    id: "p2",
    slug: "creeper-zielony",
    name: "Creeper — Zielony",
    shortDescription: "Sssss... Kultowa główka Creepera na Twoją półkę.",
    description:
      "Creeper to najbardziej rozpoznawalny mob w Minecraft. Zielona, pikselowa faktura i charakterystyczna mina — ta główka to must-have dla każdego fana. Idealna na półkę obok konsoli lub monitora.",
    categorySlug: "ikony-minecraft",
    categoryName: "Ikony Minecraft",
    tags: ["creeper", "mob", "ikona"],
    images: [
      { url: "/images/products/creeper-front.svg", alt: "Creeper — widok z przodu", type: "front" },
      { url: "/images/products/creeper-angle.svg", alt: "Creeper — widok z boku", type: "angle" },
      { url: "/images/products/creeper-lifestyle.svg", alt: "Creeper na biurku", type: "lifestyle" },
    ],
    badge: "bestseller",
    priceFrom: 14900,
    variants: makeVariants(14900),
    materials: defaultMaterials,
    dimensions: defaultDimensions,
    editionType: "standard",
    isPersonalizable: false,
    relatedProductSlugs: ["steve-klasyk", "enderman-mroczny"],
    crossSellSlugs: ["podstawa-debowa"],
    reviews: defaultReviews,
    stock: 45,
  },
  {
    id: "p3",
    slug: "enderman-mroczny",
    name: "Enderman — Mroczny",
    shortDescription: "Wysoka, mroczna sylwetka Endermana w premium wydaniu.",
    description:
      "Enderman z fioletowymi oczami i gładką czarną teksturą — jedna z najbardziej pożądanych główek w naszej kolekcji. Większy format 18 cm dostępny w wersji połyskowej.",
    categorySlug: "ikony-minecraft",
    categoryName: "Ikony Minecraft",
    tags: ["enderman", "end", "ikona"],
    images: [
      { url: "/images/products/enderman-front.svg", alt: "Enderman — widok z przodu", type: "front" },
      { url: "/images/products/enderman-angle.svg", alt: "Enderman — widok z boku", type: "angle" },
      { url: "/images/products/enderman-lifestyle.svg", alt: "Enderman w setupie", type: "lifestyle" },
    ],
    badge: "nowosc",
    priceFrom: 16900,
    variants: makeVariants(16900),
    materials: defaultMaterials,
    dimensions: { ...defaultDimensions, heightMm: 180 },
    editionType: "standard",
    isPersonalizable: false,
    relatedProductSlugs: ["steve-klasyk", "creeper-zielony"],
    crossSellSlugs: ["podstawa-debowa", "zestaw-2-glowek"],
    reviews: defaultReviews,
    stock: 28,
  },
  {
    id: "p4",
    slug: "netherite-heros",
    name: "Netherite Hero — Limitowana",
    shortDescription: "Edycja numerowana. Tylko 200 egzemplarzy na świecie.",
    description:
      "Limitowana główka w metalicznym wykończeniu nawiązującym do netherite. Każdy egzemplarz jest numerowany i dostarczany w premium pudełku kolekcjonerskim z certyfikatem autentyczności.",
    categorySlug: "limitowane",
    categoryName: "Limitowane",
    tags: ["limitowana", "netherite", "premium"],
    images: [
      { url: "/images/products/netherite-front.svg", alt: "Netherite Hero — widok z przodu", type: "front" },
      { url: "/images/products/netherite-box.svg", alt: "Netherite Hero — pudełko kolekcjonerskie", type: "box" },
      { url: "/images/products/netherite-lifestyle.svg", alt: "Netherite Hero na półce", type: "lifestyle" },
    ],
    badge: "limitowana",
    priceFrom: 39900,
    compareAtPrice: 44900,
    variants: makeVariants(39900, 44900),
    materials: [
      ...defaultMaterials,
      { name: "Edycja", value: "Numerowana / certyfikat" },
    ],
    dimensions: { ...defaultDimensions, heightMm: 180, weightG: 340 },
    editionType: "limited",
    editionNumber: 47,
    editionTotal: 200,
    editionEndsAt: "2026-08-31T23:59:59+02:00",
    isPersonalizable: false,
    relatedProductSlugs: ["steve-klasyk", "enderman-mroczny"],
    crossSellSlugs: ["podstawa-debowa"],
    reviews: defaultReviews,
    stock: 153,
  },
  {
    id: "p5",
    slug: "tworca-friz",
    name: "Friz — Kolekcja Twórców",
    shortDescription: "Oficjalna główka we współpracy z Frizem.",
    description:
      "Limitowana kolaboracja z jednym z największych polskich twórców Minecraft. Główka wiernie odwzorowuje charakterystyczny skin, z dodatkowym certyfikatem kolaboracji.",
    categorySlug: "tworcy",
    categoryName: "Twórcy",
    tags: ["tworca", "youtuber", "kolaboracja"],
    images: [
      { url: "/images/products/creator-front.svg", alt: "Friz — główka kolekcjonerska", type: "front" },
      { url: "/images/products/creator-box.svg", alt: "Friz — pudełko premium", type: "box" },
      { url: "/images/products/creator-lifestyle.svg", alt: "Friz na półce streamera", type: "lifestyle" },
    ],
    badge: "limitowana",
    priceFrom: 24900,
    variants: makeVariants(24900),
    materials: defaultMaterials,
    dimensions: defaultDimensions,
    editionType: "limited",
    editionTotal: 500,
    editionNumber: 312,
    isPersonalizable: false,
    creator: "Friz",
    relatedProductSlugs: ["steve-klasyk"],
    crossSellSlugs: ["zestaw-2-glowek"],
    reviews: defaultReviews,
    stock: 188,
  },
  {
    id: "p6",
    slug: "twoj-skin",
    name: "Twoja Główka — Personalizowana",
    shortDescription: "Wgraj skin lub wpisz nick — stworzymy Twoją unikalną główkę.",
    description:
      "Twój skin, Twoja historia. Wgraj plik PNG (64×64 lub 128×128) lub wpisz nick Minecraft, aby zobaczyć podgląd 3D. Każda główka jest drukowana i wykańczana indywidualnie w naszej pracowni.",
    categorySlug: "personalizowane",
    categoryName: "Personalizowane",
    tags: ["personalizacja", "skin", "custom"],
    images: [
      { url: "/images/products/custom-front.svg", alt: "Personalizowana główka Minecraft", type: "front" },
      { url: "/images/products/custom-preview.svg", alt: "Podgląd 3D skina", type: "angle" },
      { url: "/images/products/custom-lifestyle.svg", alt: "Personalizowana główka na biurku", type: "lifestyle" },
    ],
    badge: "nowosc",
    priceFrom: 19900,
    variants: makeVariants(19900),
    materials: defaultMaterials,
    dimensions: defaultDimensions,
    editionType: "custom",
    isPersonalizable: true,
    relatedProductSlugs: ["steve-klasyk", "podstawa-debowa"],
    crossSellSlugs: ["podstawa-debowa", "zestaw-2-glowek"],
    reviews: defaultReviews,
    stock: 999,
  },
  {
    id: "p7",
    slug: "podstawa-debowa",
    name: "Podstawa Dębowa — Premium",
    shortDescription: "Polerowane drewno dębowe. Podkreśla każdą główkę.",
    description:
      "Ręcznie wykonana podstawa z litego drewna dębowego. Magnetyczne mocowanie, antypoślizgowa podkładka. Pasuje do wszystkich główek HeadCraft w formacie Standard i Kolekcjonerskim.",
    categorySlug: "wszystkie",
    categoryName: "Akcesoria",
    tags: ["akcesoria", "podstawa", "dąb"],
    images: [
      { url: "/images/products/base-front.svg", alt: "Podstawa dębowa HeadCraft", type: "front" },
      { url: "/images/products/base-lifestyle.svg", alt: "Podstawa z główką na biurku", type: "lifestyle" },
    ],
    priceFrom: 7900,
    variants: [
      {
        id: "v-base",
        sku: "HC-BASE",
        name: "Podstawa dębowa",
        price: 7900,
        stock: 50,
        attributes: { size: "M", finish: "matte", base: "oak" },
      },
    ],
    materials: [
      { name: "Materiał", value: "Lite drewno dębowe" },
      { name: "Wykończenie", value: "Olejowane i polerowane ręcznie" },
    ],
    dimensions: {
      heightMm: 25,
      widthMm: 120,
      depthMm: 120,
      weightG: 180,
      boxSize: "15 × 15 × 5 cm",
    },
    editionType: "standard",
    isPersonalizable: false,
    relatedProductSlugs: ["steve-klasyk"],
    crossSellSlugs: [],
    reviews: defaultReviews.slice(0, 2),
    stock: 50,
  },
  {
    id: "p8",
    slug: "zestaw-2-glowek",
    name: "Zestaw 2 Główek — Duo Pack",
    shortDescription: "Dwie główki w cenie niższej. Idealny prezent.",
    description:
      "Wybierz dowolne dwie główki ze standardowej kolekcji i zaoszczędź 15%. Pakowane w zestawowe pudełko prezentowe.",
    categorySlug: "wszystkie",
    categoryName: "Zestawy",
    tags: ["zestaw", "prezent", "bundle"],
    images: [
      { url: "/images/products/duo-front.svg", alt: "Zestaw dwóch główek HeadCraft", type: "front" },
      { url: "/images/products/duo-box.svg", alt: "Pudełko prezentowe Duo Pack", type: "box" },
    ],
    badge: "wysylka-24h",
    priceFrom: 24900,
    compareAtPrice: 29800,
    variants: [
      {
        id: "v-duo",
        sku: "HC-DUO",
        name: "Zestaw 2 główek",
        price: 24900,
        compareAtPrice: 29800,
        stock: 30,
        attributes: { size: "M", finish: "matte", base: "none" },
      },
    ],
    materials: defaultMaterials,
    dimensions: { ...defaultDimensions, boxSize: "25 × 18 × 20 cm" },
    editionType: "standard",
    isPersonalizable: false,
    relatedProductSlugs: ["steve-klasyk", "creeper-zielony"],
    crossSellSlugs: ["podstawa-debowa"],
    reviews: defaultReviews.slice(0, 1),
    stock: 30,
  },
];

export const testimonials = [
  {
    id: "t1",
    author: "Jakub, 24",
    rating: 5,
    content: "Setup wygląda jak z katalogu. Główka Steve'a to centralny punkt całej półki.",
    product: "Steve — Klasyk",
  },
  {
    id: "t2",
    author: "Anna, mama gracza",
    rating: 5,
    content: "Najlepszy prezent urodzinowy. Jakość znacznie lepsza niż tanie figurki z marketplace.",
    product: "Netherite Hero",
  },
  {
    id: "t3",
    author: "Patryk, streamer",
    rating: 5,
    content: "Limitowana edycja Friz idealnie pasuje do tła streamu. Widzowie pytają skąd.",
    product: "Friz — Kolekcja Twórców",
  },
  {
    id: "t4",
    author: "Ola, 16",
    rating: 5,
    content: "Wgrałam swój skin i dostałam dokładnie to co na podglądzie 3D. Magia!",
    product: "Twoja Główka",
  },
  {
    id: "t5",
    author: "Tomek, kolekcjoner",
    rating: 5,
    content: "Mam już cztery główki. Każda w innym wykończeniu — wyglądają spójnie na półce.",
    product: "Creeper + Enderman",
  },
  {
    id: "t6",
    author: "Marta, 31",
    rating: 4,
    content: "Dostawa w 4 dni, piękne pakowanie. Jedyny minus — chcę więcej limitowanych edycji!",
    product: "Podstawa Dębowa",
  },
];

export const faqItems = [
  {
    question: "Z czego wykonane są główki HeadCraft?",
    answer:
      "Każda główka jest wytwarzana z żywicy premium, ręcznie wykańczana i lakierowana. Opcjonalna podstawa wykonana jest z litego drewna dębowego.",
  },
  {
    question: "Jak zamówić główkę ze swojego skina?",
    answer:
      "Przejdź do Konfiguratora, wgraj plik PNG (64×64 lub 128×128 px) lub wpisz swój nick Minecraft. Zobaczysz podgląd 3D przed złożeniem zamówienia.",
  },
  {
    question: "Ile trwa realizacja i wysyłka?",
    answer:
      "Standardowa realizacja trwa 3–5 dni roboczych. Wysyłka kurierem lub do paczkomatu InPost zajmuje 1–2 dni robocze.",
  },
  {
    question: "Czy mogę zwrócić produkt?",
    answer:
      "Tak — 14 dni na zwrot bez podania przyczyny (produkty personalizowane wyłączone z prawa odstąpienia po rozpoczęciu produkcji).",
  },
  {
    question: "Czy HeadCraft jest powiązany z Mojang?",
    answer:
      "Nie. HeadCraft nie jest powiązany ani afiliowany z Mojang AB ani Microsoft. Minecraft jest znakiem towarowym Mojang AB.",
  },
];

export const blogPosts = [
  {
    slug: "jak-zaczac-kolekcje-glowek-minecraft",
    title: "Jak zacząć kolekcję główek Minecraft",
    excerpt:
      "Przewodnik dla początkujących kolekcjonerów — od pierwszej główki po kompletny display.",
    date: "2026-06-15",
    readingTime: 6,
    category: "Kolekcjonowanie",
    image: "/images/blog/collecting.svg",
  },
  {
    slug: "10-sposobow-ekspozycji-glowek",
    title: "10 sposobów na ekspozycję główek na biurku gamingowym",
    excerpt:
      "Od półek LED po gablotki — inspiracje dla Twojego setupu.",
    date: "2026-05-28",
    readingTime: 8,
    category: "Display",
    image: "/images/blog/display.svg",
  },
  {
    slug: "jak-pobrac-skin-i-zamowic-glowke",
    title: "Jak pobrać skin i zamówić personalizowaną główkę",
    excerpt:
      "Krok po kroku: NameMC, plik PNG i konfigurator HeadCraft.",
    date: "2026-05-10",
    readingTime: 5,
    category: "Poradnik",
    image: "/images/blog/skin-guide.svg",
  },
  {
    slug: "prezent-dla-gracza-minecraft-2026",
    title: "Prezent dla gracza Minecraft — przewodnik 2026",
    excerpt:
      "Najlepsze pomysły na prezent, który zostanie na półce na lata.",
    date: "2026-04-20",
    readingTime: 7,
    category: "Prezenty",
    image: "/images/blog/gift-guide.svg",
  },
  {
    slug: "limitowane-edycje-co-warto-wiedziec",
    title: "Limitowane edycje — co warto wiedzieć",
    excerpt:
      "Numeracja, certyfikaty i dlaczego limitowane główki rosną na wartości.",
    date: "2026-03-30",
    readingTime: 4,
    category: "Kolekcjonowanie",
    image: "/images/blog/limited.svg",
  },
];

export const ugcImages = [
  { id: "u1", src: "/images/ugc/setup-1.svg", alt: "Setup gamingowy z główkami HeadCraft" },
  { id: "u2", src: "/images/ugc/setup-2.svg", alt: "Półka kolekcjonerska z główkami" },
  { id: "u3", src: "/images/ugc/setup-3.svg", alt: "Biurko streamera z główką Steve" },
  { id: "u4", src: "/images/ugc/setup-4.svg", alt: "Gablotka z limitowaną edycją" },
  { id: "u5", src: "/images/ugc/setup-5.svg", alt: "Pokój gracza z główkami na półce" },
  { id: "u6", src: "/images/ugc/setup-6.svg", alt: "Prezent urodzinowy HeadCraft" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === "wszystkie") return products;
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCollectionBySlug(slug: string): CollectionCategory | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.categoryName.toLowerCase().includes(q),
  );
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "newest" | "limited";

export function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceFrom - b.priceFrom);
    case "price-desc":
      return sorted.sort((a, b) => b.priceFrom - a.priceFrom);
    case "newest":
      return sorted.sort((a) => (a.badge === "nowosc" ? -1 : 1));
    case "limited":
      return sorted.sort((a, b) =>
        a.editionType === "limited" ? -1 : b.editionType === "limited" ? 1 : 0,
      );
    case "popular":
    default:
      return sorted.sort((a, b) =>
        a.badge === "bestseller" ? -1 : b.badge === "bestseller" ? 1 : 0,
      );
  }
}
