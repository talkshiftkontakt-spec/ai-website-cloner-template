export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalDocument = {
  slug: string;
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  "polityka-prywatnosci": {
    slug: "polityka-prywatnosci",
    title: "Polityka prywatności",
    updatedAt: "18 lipca 2026",
    intro:
      "Niniejsza Polityka prywatności wyjaśnia, w jaki sposób SnipeIT przetwarza dane osobowe użytkowników serwisu, zgodnie z Rozporządzeniem (UE) 2016/679 (RODO) oraz ustawą o świadczeniu usług drogą elektroniczną.",
    sections: [
      {
        heading: "1. Administrator danych",
        body: "Administratorem Twoich danych osobowych jest SnipeIT. W sprawach dotyczących ochrony danych możesz skontaktować się z nami pod adresem e-mail: hello@snipeit.pl.",
      },
      {
        heading: "2. Jakie dane przetwarzamy",
        body: "Przetwarzamy: dane konta (adres e-mail, nazwa użytkownika), dane subskrypcji i płatności (obsługiwane przez zewnętrznego operatora płatności), Twoje ustawienia i monitory, a także dane techniczne (adres IP, typ przeglądarki, logi, identyfikatory cookies) niezbędne do działania i bezpieczeństwa serwisu.",
      },
      {
        heading: "3. Cele i podstawy prawne",
        body: "Dane przetwarzamy w celu: świadczenia usługi i realizacji umowy (art. 6 ust. 1 lit. b RODO); wypełnienia obowiązków prawnych, np. rozliczeń (art. 6 ust. 1 lit. c RODO); w naszym prawnie uzasadnionym interesie, np. bezpieczeństwo i rozwój usługi (art. 6 ust. 1 lit. f RODO); oraz na podstawie Twojej zgody — dla cookies analitycznych, marketingowych i funkcjonalnych (art. 6 ust. 1 lit. a RODO).",
      },
      {
        heading: "4. Pliki cookies",
        body: "Serwis wykorzystuje pliki cookies. Cookies inne niż niezbędne uruchamiamy wyłącznie po uzyskaniu Twojej zgody. Szczegóły opisuje Polityka Cookies; zgodę możesz zmienić lub wycofać w każdej chwili poprzez „Ustawienia cookies”.",
      },
      {
        heading: "5. Odbiorcy danych",
        body: "Dane mogą być powierzane zaufanym podmiotom przetwarzającym w naszym imieniu, np. dostawcom hostingu i infrastruktury, operatorowi płatności oraz — po wyrażeniu zgody — dostawcom narzędzi analitycznych i marketingowych. Podmioty te działają na podstawie umów powierzenia.",
      },
      {
        heading: "6. Przekazywanie poza EOG",
        body: "Jeżeli dane są przekazywane poza Europejski Obszar Gospodarczy, następuje to wyłącznie w oparciu o odpowiednie zabezpieczenia, np. standardowe klauzule umowne zatwierdzone przez Komisję Europejską.",
      },
      {
        heading: "7. Okres przechowywania",
        body: "Dane konta przechowujemy przez czas trwania konta oraz przez okres wymagany przepisami (np. podatkowymi). Zgody cookies przechowujemy do 6 miesięcy, a następnie prosimy o nie ponownie. Po tych okresach dane są usuwane lub anonimizowane.",
      },
      {
        heading: "8. Twoje prawa",
        body: "Masz prawo do: dostępu do danych, sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania oraz wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed wycofaniem). Przysługuje Ci także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).",
      },
      {
        heading: "9. Zautomatyzowane decyzje",
        body: "Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.",
      },
      {
        heading: "10. Zmiany polityki",
        body: "Politykę możemy aktualizować; o istotnych zmianach poinformujemy w serwisie. Data ostatniej aktualizacji jest wskazana powyżej.",
      },
    ],
  },
  regulamin: {
    slug: "regulamin",
    title: "Regulamin",
    updatedAt: "18 lipca 2026",
    intro:
      "Regulamin określa zasady korzystania z serwisu SnipeIT oraz świadczenia usług drogą elektroniczną.",
    sections: [
      {
        heading: "1. Postanowienia ogólne",
        body: "Korzystanie z serwisu SnipeIT oznacza akceptację niniejszego Regulaminu. Serwis jest agregatorem publicznie dostępnych ogłoszeń i nie jest powiązany z żadnym z monitorowanych portali.",
      },
      {
        heading: "2. Zakres usługi",
        body: "SnipeIT umożliwia monitorowanie oraz agregację ogłoszeń z zewnętrznych portali w jednym widoku, wraz z powiadomieniami o nowych ofertach zgodnych z ustawionymi kryteriami.",
      },
      {
        heading: "3. Konto i rejestracja",
        body: "Do korzystania z części funkcji wymagane jest założenie konta. Użytkownik zobowiązuje się do podania prawdziwych danych oraz zachowania poufności danych logowania.",
      },
      {
        heading: "4. Subskrypcja i płatności",
        body: "Dostęp do funkcji premium wymaga aktywnej subskrypcji. Subskrypcję można anulować w dowolnym momencie, zachowując dostęp do końca opłaconego okresu rozliczeniowego.",
      },
      {
        heading: "5. Odpowiedzialność",
        body: "SnipeIT dokłada starań, aby dane były aktualne, jednak nie ponosi odpowiedzialności za treść, dostępność ani rzetelność ogłoszeń pochodzących z portali zewnętrznych.",
      },
      {
        heading: "6. Reklamacje i kontakt",
        body: "Reklamacje można zgłaszać na adres hello@snipeit.pl. Odpowiadamy w rozsądnym terminie, nie dłuższym niż wymagany przepisami prawa.",
      },
    ],
  },
  "pliki-cookies": {
    slug: "pliki-cookies",
    title: "Polityka Cookies",
    updatedAt: "18 lipca 2026",
    intro:
      "Niniejsza Polityka Cookies opisuje, jakie pliki cookies i podobne technologie stosuje SnipeIT, w jakim celu oraz jak możesz zarządzać swoją zgodą. Cookies inne niż niezbędne uruchamiamy dopiero po wyrażeniu przez Ciebie zgody.",
    sections: [
      {
        heading: "Czym są pliki cookies",
        body: "Pliki cookies to niewielkie pliki tekstowe zapisywane na Twoim urządzeniu podczas korzystania z serwisu. Umożliwiają m.in. zapamiętanie sesji, preferencji oraz analizę ruchu.",
      },
      {
        heading: "Podstawa prawna",
        body: "Cookies niezbędne stosujemy na podstawie naszego prawnie uzasadnionego interesu (poprawne działanie serwisu). Pozostałe kategorie (analityczne, marketingowe, funkcjonalne) uruchamiamy wyłącznie na podstawie Twojej dobrowolnej zgody, którą możesz w każdej chwili zmienić lub wycofać.",
      },
      {
        heading: "1. Niezbędne (zawsze aktywne)",
        body: "Pliki niezbędne do działania strony, logowania, bezpieczeństwa i zapamiętywania podstawowych ustawień. Nie można ich wyłączyć, ponieważ bez nich serwis nie działałby poprawnie.",
      },
      {
        heading: "2. Analityczne (domyślnie wyłączone)",
        body: "Pozwalają analizować sposób korzystania ze strony, np. Google Analytics, Matomo. Pomagają nam ulepszać serwis. Uruchamiane wyłącznie po wyrażeniu zgody.",
      },
      {
        heading: "3. Marketingowe (domyślnie wyłączone)",
        body: "Służą do personalizacji reklam i śledzenia aktywności użytkownika, np. Meta Pixel, Google Ads. Uruchamiane wyłącznie po wyrażeniu zgody.",
      },
      {
        heading: "4. Funkcjonalne (domyślnie wyłączone)",
        body: "Zapamiętywanie preferencji użytkownika, języka, ustawień interfejsu itp. Uruchamiane wyłącznie po wyrażeniu zgody.",
      },
      {
        heading: "Zarządzanie zgodą",
        body: "Swoją zgodę możesz w każdej chwili zmienić lub wycofać, klikając „Ustawienia cookies” w stopce strony. Możesz też zarządzać cookies w ustawieniach przeglądarki (usuwanie, blokowanie). Ograniczenie cookies może wpłynąć na działanie serwisu.",
      },
      {
        heading: "Okres ważności zgody",
        body: "Twoja decyzja jest zapamiętywana przez okres do 6 miesięcy. Po jego upływie ponownie poprosimy o wyrażenie zgody. Zapisujemy datę zgody oraz wybrane kategorie.",
      },
    ],
  },
};
