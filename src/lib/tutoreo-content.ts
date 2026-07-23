import type {
  BenefitCard,
  FaqItem,
  FooterColumn,
  HowItWorksStep,
  NavLink,
} from "@/types/tutoreo";

export const navLinks: NavLink[] = [
  { label: "Strona głowna", href: "/", active: true },
  { label: "O nas", href: "/about" },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "1",
    title: "Rejestrujesz się",
    description:
      "Tworzysz konto, i jeżeli jesteś korepetytorem, weryfikujesz swoje dane",
    showArrow: true,
  },
  {
    number: "2",
    title: "Umawiasz się",
    description:
      "Jako korepetytor tworzysz ogłoszenie, a uczniowie je znajdują i rezerwują termin",
    showArrow: true,
  },
  {
    number: "3",
    title: "Uczestniczysz",
    description:
      "Gdy przyjdzie czas, dołączasz do połączenia online i uczysz się lub nauczasz z pomocą wygodnej tablicy",
  },
];

export const tutorBenefits: BenefitCard[] = [
  {
    iconUrl: "/images/icons/LandingPage/Money.svg",
    backgroundColor: "#80FF8A",
    title: "Zarabiaj lepiej niż inni",
    description:
      "Korepetytorzy i nauczyciele zasługują na szacunek i godne wynagrodzenie za ich ciężką pracę. Z tego powodu nasza prowizja wynosi jedyne 3% + koszty bramki płatności, podczas gdy podobne serwisy potrafią zabierać aż do 30%!",
  },
  {
    iconUrl: "/images/icons/LandingPage/Clock.svg",
    backgroundColor: "#FF5353",
    title: "Nie trać dziesiątek godzin",
    description:
      "Zamiast spędzać godziny na reklamowaniu się po grupach w internecie i dogadywaniu się z uczniami, my zajmiemy się sprawami organizacyjnymi, żebyś ty mógł skupić się na uczeniu i zarabianiu a nie marketingu.",
  },
  {
    iconUrl: "/images/icons/LandingPage/Robot.svg",
    backgroundColor: "#80F3FF",
    title: "Korzystny algorytm",
    description:
      "Nasz algorytm wyszukiwarki bierze pod uwagę opinie, dopasowanie filtrów oraz dostępność w terminarzu. W ten sposób unikniemy głęboko zakopanych martwych kont, a nowi korepetytorzy będą mieli równe szanse na pozyskanie uczniów.",
  },
];

export const studentBenefits: BenefitCard[] = [
  {
    iconUrl: "/images/icons/LandingPage/Apps.svg",
    backgroundColor: "#FF5996",
    title: "Każda lekcja w jednym miejscu",
    description:
      "Matematyka, Angielski czy Chemia? Nieważne bo na tutoreo każdy przedmiot znajdziesz w jednym miejscu i wygodnie nauczysz się materiału bez wychodzenia z domu dzięki połączeniu online z korepetytorem",
  },
  {
    iconUrl: "/images/icons/LandingPage/Search.svg",
    backgroundColor: "#53B1FF",
    title: "Szukasz i masz",
    description:
      "Od znalezienia idealnego korepetytora dzielą cię 2 kroki: Rejestracja i wypełnienie filtrów wyszukiwania. Nasz system dopasuje sam najlepsze oferty u korepetytorów z najlepszą dostępnością.",
  },
  {
    iconUrl: "/images/icons/LandingPage/Wallet.svg",
    backgroundColor: "#A080FF",
    title: "Darmowe zwroty",
    description:
      "Nasz system nie pobiera od razu opłaty, a jedynie rezerwuje płatność. To umożliwia kompletnie darmowe zwroty aż do odbycia lekcji. Więc jeżeli coś ci wypadnie, możesz otrzymać pełny zwrot pieniędzy",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Czy rejestracja jest darmowa?",
    answer:
      "Rejestracja jest w pełni darmowa. Uczeń nie ponosi bezpośrednio żadnych kosztów, a my pobieramy tylko drobną prowizję od korepetytora.",
  },
  {
    question: "Czy muszę posiadać jakiś certyfikat?",
    answer:
      "Nie, korepetytorem na tutoreo może zostać ktokolwiek kto czuje że sprawdziłby się w tej roli. Niemniej bycie zawodowcem może ułatwić zbudowanie zaufania uczniów.",
  },
  {
    question: "Czy muszę coś weryfikować?",
    answer:
      "Uczeń może korzystać z platformy zaraz po założeniu konta. Korepetytorzy natomiast, muszą zweryfikować swoją tożsamość aby legalnie móc zostać sprzedawcą na platformie.",
  },
  {
    question: "Jakie narzędzia udostępnia tutoreo?",
    answer:
      "Na tutoreo znajdziesz przede wszystkim system ogłoszeń, który pozwala komukolwiek umówić się w dostępnym terminie oraz wbudowany system rozmowy wraz z czatem oraz tablicą na żywo.",
  },
  {
    question: "Czy mogę oferować zniżkę na pierwszą lekcję?",
    answer:
      "Wiemy że to powszechna praktyka w branży korepetytorskiej, więc umożliwiamy ustawienie własnej żniżki wyrażonej w procentach dla uczniów którzy pierwszy raz uczestniczą w twoich lekcjach.",
  },
  {
    question: "Czy mogę odwołać lekcję jeśli coś mi wypadnie?",
    answer:
      "Jeżeli zajdzie taka potrzeba, możesz bez problemu anulować lekcję bez żadnych opłat, a pieniądze w całości trafią z powrotem do ciebie.",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    links: [
      { label: "Aplikacja", href: "/app" },
      { label: "Kontakt", href: "/contact" },
      { label: "O nas", href: "/about" },
    ],
  },
  {
    links: [
      { label: "Blog tutoreo", href: "/blog" },
      { label: "Zasady użytkowania", href: "/tos" },
      { label: "Polityka prywatności", href: "/privacypolicy" },
      { label: "Ustawienia cookies", href: "#cookies" },
    ],
  },
];
