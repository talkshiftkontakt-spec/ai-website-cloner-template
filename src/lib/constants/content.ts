export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Aplikacja",
    description:
      "Wypełniasz krótki formularz. Poznajemy Twój cel, sytuację i największe wyzwania.",
  },
  {
    step: "02",
    title: "Konsultacja",
    description:
      "Rozmowa wideo z trenerem trwa 45 minut. Ustalamy plan dopasowany do Twojego życia.",
  },
  {
    step: "03",
    title: "Plan",
    description:
      "Indywidualny trening i żywienie, bez szablonów z internetu i bez drastycznych restrykcji.",
  },
  {
    step: "04",
    title: "Kontrole",
    description:
      "Regularne spotkania, analiza postępów i korekty planu. Jesteśmy z Tobą na co dzień.",
  },
  {
    step: "05",
    title: "Edukacja",
    description:
      "Materiały o nawykach, śnie, stresie i relacji z jedzeniem, żeby zmiana została na lata.",
  },
] as const;

export const CLIENT_STORIES = [
  {
    name: "Anna",
    duration: "8 miesięcy",
    quote:
      "Po raz pierwszy ktoś nie mówił mi, żebym jadła mniej. Pomogło mi zrozumieć, dlaczego podjadałam i co z tym robić.",
    excerpt:
      "Pracowałam na zmiany, siedziałam dużo i próbowałam już wszystkiego. LekkiStart dał mi strukturę bez poczucia, że zawiodłam. Spacery, proste posiłki i cotygodniowe rozmowy. To wystarczyło, żeby ruszyć z miejsca.",
  },
  {
    name: "Tomasz",
    duration: "11 miesięcy",
    quote:
      "Nie musiałem od razu iść na siłownię. Zaczęliśmy od spacerów i ćwiczeń w domu. I to działało.",
    excerpt:
      "Miałem 118 kg i zero motywacji po kolejnych dietach. Coaching dał mi kogoś, kto pilnował postępów bez oceniania. Dziś mam więcej energii i nawyki, które trzymam bez „poniedziałku od nowa”.",
  },
  {
    name: "Magda",
    duration: "6 miesięcy",
    quote:
      "W końcu przestałam myśleć o jedzeniu jak o wrogu. To była największa zmiana.",
    excerpt:
      "Emocjonalne jedzenie było moim tematem od lat. Trener pomógł mi zbudować plan, który nie wykluczał ulubionych potraw, tylko uczył mnie jeść świadomie. Bez wstydu, bez presji.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Wreszcie ktoś traktuje mnie poważnie, nie jak klienta, który „nie ma silnej woli”.",
    author: "Katarzyna",
    duration: "5 miesięcy",
  },
  {
    quote:
      "Cotygodniowe kontrole to dla mnie game changer. Wiedziałem, że ktoś na mnie czeka.",
    author: "Piotr",
    duration: "9 miesięcy",
  },
  {
    quote:
      "Plan treningowy w domu bez sprzętu. I naprawdę widzę postępy w kondycji.",
    author: "Joanna",
    duration: "4 miesiące",
  },
  {
    quote:
      "Przejrzysty cennik i zero nacisku sprzedażowego. To buduje zaufanie.",
    author: "Marcin",
    duration: "7 miesięcy",
  },
] as const;

export const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    alt: "Osoba spacerująca spokojnym tempem w parku",
    caption: "Spacer jako codzienny rytuał",
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    alt: "Przygotowywanie prostego posiłku w domowej kuchni",
    caption: "Jedzenie bez presji",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    alt: "Konsultacja coachingowa przez wideorozmowę",
    caption: "Wsparcie na wyciągnięcie ręki",
  },
  {
    src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    alt: "Świeże warzywa i składniki na blacie kuchennym",
    caption: "Proste, realne posiłki",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    alt: "Osoba wykonująca delikatne ćwiczenia w domu",
    caption: "Ruch dopasowany do Ciebie",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    alt: "Rodzinny posiłek przy stole",
    caption: "Życie, nie tylko dieta",
  },
] as const;

export const REJECTED_STEREOTYPE_IMAGES = [
  {
    src: "/images/rejected/sad-sofa-curled.jpg",
    alt: "Otyła kobieta zwinięta na kanapie, przygnębiona i smutna",
    label: "Wstyd i izolacja",
  },
  {
    src: "/images/rejected/sad-couch-despair.jpg",
    alt: "Otyła kobieta siedząca na kanapie z wyrazem smutku i rozpaczy",
    label: "Poczucie porażki",
  },
  {
    src: "/images/rejected/scale-despair.jpg",
    alt: "Otyła kobieta siedząca przy wadze z głową w dłoniach",
    label: "Obsesja na punkcie wagi",
  },
  {
    src: "/images/rejected/scale-shock.jpg",
    alt: "Otyła kobieta w szoku patrząca na wynik na wadze",
    label: "Bezradność",
  },
  {
    src: "/images/rejected/depressed-headache.jpg",
    alt: "Otyła kobieta trzymająca głowę, zestresowana i przygnębiona",
    label: "Presja i stres",
  },
  {
    src: "/images/rejected/street-weary.jpg",
    alt: "Otyła kobieta idąca ulicą, zmęczona i przygnębiona",
    label: "Codzienne zmęczenie",
  },
] as const;

export const COACH = {
  name: "Trener LekkiStart",
  title: "Coach zdrowia i odchudzania",
  bio: [
    "Od ponad dekady pomagam osobom z nadwagą i otyłością budować trwałe nawyki, bez drastycznych diet i bez kultury siłowni.",
    "Wierzę, że skuteczna zmiana zaczyna się od zrozumienia Twojego życia: pracy, rodziny, snu, stresu i relacji z jedzeniem. Dopiero potem trening i żywienie.",
    "Moje podejście łączy dowody naukowe z empatią. Nie obiecuję cudów. Obiecuję obecność, uczciwość i plan, który da się utrzymać.",
  ],
  credentials: [
    "Certyfikowany trener personalny",
    "Szkolenie z coachingu behawioralnego",
    "Specjalizacja: otyłość i redukcja masy ciała",
  ],
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
} as const;
