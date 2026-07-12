export const site = {
  name: "LingoLogy",
  tagline: "Angielski online · 1:1",
  email: "kontakt@lingology.pl",
  appUrl: "https://lingology.app",
} as const;

export const navLinks = [
  { label: "Oferta", href: "#offer" },
  { label: "Aplikacja", href: "#lingology-learn" },
  { label: "Metoda", href: "#how-it-works" },
  { label: "Opinie", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
] as const;

export const hero = {
  tag: "LingoLogy · Angielski online · 1:1",
  title: "Angielski online dla dorosłych.",
  titleAccent: "Korepetycje 1:1 nastawione na mówienie.",
  description:
    "Korepetycje z angielskiego pod mówienie i plan między spotkaniami w LingoLogy App: wiesz, co ćwiczyć dalej, zamiast zaczynać od zera co tydzień.",
  trust: "Konsultacja 0 zł · Lekcje online 1:1 · Od 80 zł / 55 min",
  quotes: [
    { text: "Nie boję się mówić po angielsku, nauka stała się czymś, na co czekam.", author: "Dominika" },
    { text: "Błędy poprawiane tak, że nie czuję skrępowania.", author: "Maria" },
    { text: "Nigdy wcześniej nie robiłem tak szybkich postępów z angielskim.", author: "Tomek" },
  ],
} as const;

export const problem = {
  title: "Rozumiesz angielski, ale rozmowa nadal Cię blokuje?",
  description:
    "Wielu dorosłych uczyło się angielskiego latami, ale nadal ma problem z mówieniem. Rozumieją filmy, maile i teksty, ale kiedy trzeba coś powiedzieć na spotkaniu, w podróży albo podczas rozmowy kwalifikacyjnej: pojawia się blokada.",
  items: [
    "W głowie masz zdanie po polsku, ale po angielsku robi się pusto.",
    "Znasz słowa, ale nie przychodzą wtedy, kiedy ich potrzebujesz.",
    "Uczyłeś się gramatyki, ale nadal trudno Ci mówić swobodnie.",
    "Po lekcji nie wiesz, co właściwie powtarzać ani od czego zacząć.",
    "Brakuje Ci regularności i jasnego planu między lekcjami.",
    "Masz wrażenie, że wcześniejsze lekcje nie układały się w żaden większy system.",
  ],
} as const;

export const speaking = {
  tag: "Priorytet: mówienie",
  title: "Na tych lekcjach angielski ma stać się narzędziem, nie teorią",
  description:
    "Nie chodzi o to, żeby znać więcej zasad. Chodzi o to, żeby umieć szybciej reagować, budować zdania, używać gotowych zwrotów i mówić mimo błędów. Dlatego głównym elementem każdej lekcji jest praktyka mówienia w sytuacjach, które mają sens dla dorosłego ucznia.",
  items: [
    "Spotkania online i rozmowy w pracy",
    "Rozmowy kwalifikacyjne",
    "Small talk z kolegami z zagranicy",
    "Prezentacje i status updates",
    "Podróże i codzienne sytuacje",
    "Wyrażanie opinii po angielsku",
    "Reagowanie bez długiego tłumaczenia w głowie",
  ],
} as const;

export const betweenLessons = {
  title: "Nie kończysz nauki po lekcji",
  description:
    "Po spotkaniu dostajesz konkretny plan działania. Wiesz, co powtórzyć, jakie zwroty przećwiczyć, jakie zadania zrobić i na czym skupić się przed kolejną lekcją.",
  cards: [
    { title: "Plan tygodniowy", body: "Po lekcji otrzymujesz jasne zadania na tydzień. Nie musisz zgadywać, czy masz powtarzać słówka, robić ćwiczenia, mówić na głos czy wracać do poprzedniego materiału." },
    { title: "Zadania domowe", body: "Zadania nie są przypadkowe. Wynikają z tego, co pojawiło się na lekcji: Twoich błędów, brakujących zwrotów, celu i sytuacji, w których chcesz używać angielskiego." },
    { title: "Powtórki w LingoLogy App", body: "Na lingology.app aplikacja sama przypomina, kiedy wrócić do zwrotów z lekcji. Łatwiej przenieść materiał z rozumienia do mówienia." },
    { title: "Praktyka mówienia", body: "Celem nie jest samo rozpoznawanie słów. Celem jest użycie ich w wypowiedzi. Zadania między lekcjami prowadzą do mówienia, nie tylko do biernego klikania odpowiedzi." },
    { title: "Śledzenie postępów", body: "Postęp nie powinien być mglistym poczuciem. System pomaga zauważyć, które obszary idą do przodu, a które nadal wymagają pracy." },
  ],
} as const;

export const offer = {
  tag: "Oferta i cennik",
  title: "Znajdź format, który pasuje do Ciebie",
  subtitle: "Odkryj, co blokuje Twoje mówienie po angielsku.",
  plans: [
    {
      tag: "Zacznij tutaj",
      title: "Bezpłatna konsultacja",
      price: "0 zł",
      note: "/ ok. 20 min · online",
      description: "Rozmowa, podczas której sprawdzamy Twój cel, poziom i to, co blokuje Cię w mówieniu.",
      details: ["Opowiadasz o swoim celu i trudnościach.", "Sprawdzamy orientacyjny poziom angielskiego.", "Omawiamy, co blokuje Cię w mówieniu.", "Dostajesz propozycję kolejnego kroku. Bez presji."],
      audience: "Dla każdego, kto chce sprawdzić, od czego zacząć.",
      featured: false,
    },
    {
      tag: "Główna oferta",
      badge: "Najpopularniejsze",
      title: "Regularne lekcje 1:1",
      price: "80 zł",
      note: "/ 55 min · lub 75 zł przy stałej współpracy 2× w tygodniu",
      description: "Lekcje 1:1 nastawione na mówienie, z zadaniami, powtórkami i planem pracy w LingoLogy App.",
      details: ["Lekcje skupione na mówieniu i realnych sytuacjach.", "Konkretny plan po każdym spotkaniu.", "Spersonalizowane zadania domowe.", "Powtórki słownictwa i zwrotów w LingoLogy App.", "Śledzenie postępów i korekta kierunku nauki."],
      audience: "Dla dorosłych, którzy chcą systemu, nie tylko jednej lekcji tygodniowo.",
      featured: true,
    },
    {
      tag: "Elastyczny wariant",
      title: "Prowadzenie językowe z planem pracy własnej",
      price: "od 260 zł",
      note: "/ mies. · 1-2 spotkania",
      description: "Dla osób, które nie chcą regularnych lekcji co tydzień, ale potrzebują planu, kontroli kierunku i materiałów do samodzielnej pracy.",
      details: ["1-2 lekcje miesięcznie.", "Rozbudowany plan i materiały do pracy własnej.", "Dostęp do LingoLogy App z zadaniami i powtórkami.", "Dobre rozwiązanie dla osób z ograniczonym czasem."],
      audience: "Dla osób z ograniczonym czasem, które chcą uczyć się samodzielnie z dobrym planem.",
      featured: false,
    },
  ],
} as const;

export const appSection = {
  tag: "LingoLogy App",
  title: "Aplikacja, która trzyma naukę między lekcjami",
  description:
    "LingoLogy App to działająca platforma na lingology.app: powtórki w dobrym momencie, biblioteka słów, kursy, czytnik tekstów, ćwiczenia mówione i plan na dziś. Dla uczniów lekcji 1:1 dochodzi panel nauczyciela i materiał wrzucony po spotkaniu.",
  note: "Aplikacja działa w przeglądarce na lingology.app. Wersja mobilna w przygotowaniu.",
  features: [
    { title: "Inteligentne powtórki", desc: "Aplikacja sama przypomina, kiedy wrócić do słowa lub zwrotu." },
    { title: "Biblioteka i kursy A1–B2", desc: "Własne słownictwo, foldery, import zestawów oraz gotowe kursy." },
    { title: "Czytnik tekstów", desc: "Nauka z artykułów i krótkich tekstów po angielsku." },
    { title: "Ćwiczenia mówione", desc: "Scenariusze rozmów i ćwiczenia wymowy z informacją zwrotną." },
    { title: "Plan na dziś", desc: "Widzisz od razu, co dziś powtórzyć, przećwiczyć i ile czasu to zajmie." },
    { title: "Panel nauczyciela", desc: "Materiał po lekcji, praca domowa i postępy w jednym miejscu." },
  ],
} as const;

export const diagnosis = {
  title: "Najpierw sprawdzamy, co naprawdę blokuje Twoje mówienie",
  description:
    "Blokada w mówieniu nie zawsze oznacza ten sam problem. U jednej osoby chodzi o stres i wstyd przed błędami. U innej o brak aktywnego słownictwa, zbyt wolne budowanie zdań, brak gotowych zwrotów, brak praktyki albo chaotyczną naukę.",
  blockers: [
    "Stres przed mówieniem",
    "Wstyd przed błędami",
    "Zbyt wolne układanie zdań",
    "Brak aktywnego słownictwa",
    "Tłumaczenie wszystkiego z polskiego",
    "Brak gotowych fraz i zwrotów",
    "Brak regularnych powtórek",
    "Brak praktyki mówienia",
    "Chaotyczna nauka bez planu",
    "Brak jasnego celu nauki",
  ],
} as const;

export const howItWorks = {
  title: "Jak wygląda współpraca krok po kroku",
  description: "Od pierwszego kontaktu do regularnej nauki. Prosty proces bez zbędnych kroków.",
  steps: [
    { title: "Konsultacja wstępna", body: "Rozmawiamy przez 20 minut. Sprawdzam Twój cel, poziom i to, co najbardziej blokuje Cię w mówieniu." },
    { title: "Diagnoza blokady", body: "Sprawdzamy, co konkretnie zatrzymuje Cię w mówieniu. Test bariery pomaga to sprecyzować." },
    { title: "Indywidualny plan nauki", body: "Na podstawie diagnozy i celu ustalamy plan dopasowany do Twojej sytuacji, poziomu i czasu." },
    { title: "Regularne lekcje 1:1", body: "Lekcje skupione na mówieniu. Ćwiczysz realne sytuacje i budujesz gotowe zwroty." },
    { title: "Praca między lekcjami", body: "Po każdej lekcji dostajesz plan na tydzień: zadania, powtórki i ćwiczenia mówione w LingoLogy App." },
    { title: "Śledzenie postępów", body: "Regularnie sprawdzamy, co poszło do przodu, a co wymaga więcej pracy." },
  ],
} as const;

export const forWhom = {
  title: "Sprawdź, czy LingoLogy jest dla Ciebie",
  yes: [
    "Rozumiesz angielski, ale blokujesz się w mówieniu",
    "Potrzebujesz systemu, a nie kolejnych przypadkowych lekcji",
    "Chcesz widzieć konkretny postęp i wiedzieć, co robić dalej",
    "Chcesz mówić swobodniej, a nie tylko zdać egzamin",
    "Zależy Ci na regularności i jasnym planie nauki",
  ],
  no: [
    "Szukasz tanich korepetycji bez systemu",
    "Chcesz tylko przygotować się do jednego egzaminu",
    "Nie masz czasu na żadną pracę między lekcjami",
    "Oczekujesz natychmiastowych efektów bez regularności",
  ],
} as const;

export const method = {
  title: "Jak układamy plan po diagnozie",
  description: "Cztery filary współpracy — od pierwszej rozmowy po regularną pracę między lekcjami.",
  pillars: [
    { num: "01", title: "Diagnoza", body: "Najpierw sprawdzamy, co konkretnie blokuje Cię w mówieniu. Każda blokada wymaga innego podejścia." },
    { num: "02", title: "Cel i plan", body: "Ustalamy wspólnie, do czego potrzebujesz angielskiego. Na tej podstawie budujemy konkretny plan nauki." },
    { num: "03", title: "Mówienie w praktyce", body: "Na lekcjach ćwiczysz realne sytuacje i budujesz gotowe zwroty, które możesz od razu używać." },
    { num: "04", title: "System między lekcjami", body: "Po każdej lekcji dostajesz plan na tydzień: zadania domowe, powtórki i ćwiczenia mówione w LingoLogy App." },
  ],
} as const;

export const tests = {
  title: "Zacznij od diagnozy mówienia",
  description: "Test bariery językowej pokazuje, co blokuje Cię w rozmowie. Test gramatyczny to uzupełnienie.",
  items: [
    { tag: "Główny test · Polecany", title: "Test bariery językowej", body: "Sprawdź, czy problemem jest stres, brak aktywnego słownictwa, wolne budowanie zdań czy brak regularności.", href: "https://www.lingology.pl/test-bariery-jezykowej", featured: true },
    { tag: "Uzupełnienie", title: "Test językowy (gramatyka)", body: "30 pytań gramatycznych — orientacyjny poziom A1–C1. Pomaga przygotować się do pierwszej konsultacji.", href: "https://www.lingology.pl/test-jezykowy", featured: false },
  ],
} as const;

export const testimonials = {
  title: "Co mówią uczniowie",
  description: "Prawdziwe opinie — z Facebooka i wiadomości od osób, które uczą się na lekcjach 1:1.",
  items: [
    { source: "Opinia na Facebooku", quote: "Nauka angielskiego stała się dla mnie przyjemna, a zajęcia to coś więcej niż zwykłe lekcje: motywacja, konkret i dobra energia.", author: "Dominika" },
    { source: "Opinia na Facebooku", quote: "Lekcje są ciekawe i zróżnicowane, a błędy są poprawiane bez skrępowania, w miłej atmosferze.", author: "Maria" },
    { source: "Wiadomość od ucznia", quote: "Po prawie roku nauki robię najszybsze postępy, jakie miałem. Na zajęciach czuję luz, stres przy mówieniu zniknął.", author: "Tomek" },
    { source: "Wiadomość od ucznia", quote: "Bardzo polecam. Zajęcia są jasne i zrozumiałe, a dzięki nim poprawiłam angielski i czuję większą pewność.", author: "Maja" },
    { source: "Wiadomość od ucznia", quote: "Kuba motywuje, podchodzi indywidualnie i dobrze dopasowuje sposób nauczania. Lekcje są bez stresu.", author: "Ada" },
  ],
} as const;

export const faq = {
  title: "Najczęstsze pytania",
  description: "Jeśli nie znajdziesz odpowiedzi, napisz bezpośrednio.",
  groups: [
    {
      title: "Konsultacja",
      items: [
        { q: "Co dzieje się na bezpłatnej konsultacji w LingoLogy?", a: "Przez około 20 minut rozmawiamy o Twoim celu, historii nauki i tym, co blokuje Cię w mówieniu. Dostajesz konkretną diagnozę i propozycję planu. Bez zobowiązań." },
        { q: "Czy muszę coś przygotować przed pierwszą rozmową?", a: "Nie. Wystarczy, że wiesz, po co chcesz angielski i jak wyglądała Twoja nauka do tej pory." },
      ],
    },
    {
      title: "Metoda",
      items: [
        { q: "Czym LingoLogy różni się od typowego kursu angielskiego?", a: "Skupiamy się na mówieniu 1:1, nie na przerabianiu podręcznika w grupie. Między lekcjami masz plan w LingoLogy App." },
        { q: "Dla kogo jest LingoLogy?", a: "Dla dorosłych, którzy rozumieją angielski, ale nie czują się swobodnie w mówieniu, albo wracają po przerwie." },
      ],
    },
    {
      title: "Format",
      items: [
        { q: "Czy w LingoLogy uczę się wyłącznie przez internet?", a: "Tak. Spotkania odbywają się w wideorozmowie, a materiały i powtórki masz w przeglądarce na lingology.app." },
        { q: "Ile czasu tygodniowo realnie trzeba poświęcić?", a: "Samą lekcję 1:1 planujemy zwykle raz w tygodniu. Do tego 10–20 minut dziennie na powtórki daje najlepszy efekt." },
      ],
    },
  ],
} as const;

export const finalCta = {
  title: "Gotowy, żeby zacząć mówić swobodniej po angielsku?",
  description: "Umów konsultację i sprawdź, od czego najlepiej zacząć. Albo najpierw zrób test bariery językowej.",
  note: "Konsultacja trwa 20 minut. Bezpłatna, bez zobowiązań.",
} as const;

export const contact = {
  title: "Umów konsultację",
  description: "Napisz, czego potrzebujesz, a Kuba odezwie się z propozycją kolejnego kroku.",
  reasons: [
    "Chcę mówić swobodniej",
    "Potrzebuję angielskiego do pracy",
    "Blokuję się w rozmowie",
    "Chcę przygotować się do rozmowy kwalifikacyjnej",
    "Chcę wrócić do nauki po przerwie",
    "Nie wiem, od czego zacząć",
    "Inny powód",
  ],
  hours: ["Rano (8:00-12:00)", "Południe (12:00-16:00)", "Popołudnie (16:00-20:00)"],
  quote: "Konsultacja trwa ok. 20 minut. Nie musisz wiedzieć, jaki masz poziom ani co dokładnie potrzebujesz.",
} as const;
