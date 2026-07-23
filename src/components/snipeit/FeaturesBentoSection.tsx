import { ArrowRight, Info, Search, Check } from "lucide-react";
import Image from "next/image";
import { ASSET } from "@/lib/snipeit-content";

const SEARCH_GRAD =
  "linear-gradient(98deg, rgb(117,147,144) 1.25%, rgb(41,55,53) 120%)";
const ROW_TEXT_GRAD =
  "linear-gradient(92deg, rgb(28,38,37) 54%, rgb(62,81,78) 101%)";
const ICON_GRAD =
  "linear-gradient(180deg, #4f6563 23.89%, #9fcbc7 307.42%)";

const PRICE_ROWS = [
  { label: "Najniższa cena", opacity: 1, arrowLeft: "68%", deg: 100 },
  { label: "Bardzo dobra cena", opacity: 0.4, arrowLeft: "63%", deg: 102 },
  { label: "Dobra cena", opacity: 0.15, arrowLeft: "58%", deg: 104 },
] as const;

const SORT_OPTIONS = [
  { label: "Podkreślaj cenę poniżej średniej", opacity: 1 },
  { label: "Wyszukuj także skróty & błędy", opacity: 0.8 },
  { label: "Wyszukuj przybliżone", opacity: 0.6 },
  { label: "Omijaj podejrzane ogłoszenia", opacity: 0.3 },
] as const;

function SearchMockup() {
  return (
    <div className="relative mx-[18px] mt-[18px] flex-1 overflow-hidden rounded-[19px] bg-gradient-to-b from-[#3d514e] to-[#253130]">
      <div className="absolute top-7 right-0 left-0">
        <div
          className="relative ml-[21%] h-[65px] w-[200%] rounded-l-[32px]"
          style={{
            backgroundImage: SEARCH_GRAD,
            boxShadow: "-30px 4px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="absolute top-1/2 left-4 flex h-[36px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              border: "0.5px solid rgba(0,0,0,0.3)",
              backgroundImage: ICON_GRAD,
            }}
          >
            <Search className="h-5 w-5 text-[#1c2625]" aria-hidden />
          </div>
          <span
            className="font-satoshi absolute top-1/2 left-[66px] -translate-y-1/2 bg-clip-text text-[22px] font-medium text-transparent"
            style={{ backgroundImage: ROW_TEXT_GRAD }}
          >
            Nazwa przedmiotu...
          </span>
        </div>
      </div>

      <div className="absolute top-[120px] left-[50%] right-0 flex flex-col gap-3">
        {PRICE_ROWS.map((row) => (
          <div
            key={row.label}
            className="relative h-[36px] w-[200%] rounded-l-[32px]"
            style={{
              backgroundImage: `linear-gradient(${row.deg}deg, rgb(117,147,144) 1.25%, rgb(41,55,53) 120%)`,
              opacity: row.opacity,
            }}
          >
            <div className="absolute top-1/2 left-3 z-10 h-[18px] w-[18px] -translate-y-1/2 overflow-hidden rounded-sm">
              <Image
                src={`${ASSET}/bento-a-icon.svg`}
                alt=""
                width={18}
                height={18}
                className="h-full w-full"
              />
            </div>
            <span className="font-satoshi absolute top-1/2 left-10 z-10 -translate-y-1/2 text-[16px] text-[#1c2625]">
              {row.label}
            </span>
            <ArrowRight
              className="absolute top-1/2 z-10 h-[23px] w-[23px] -translate-y-1/2 text-[#1c2625]"
              style={{ left: row.arrowLeft }}
              aria-hidden
            />
          </div>
        ))}
      </div>

      <Image
        src={`${ASSET}/mouse-pointer.svg`}
        alt=""
        width={31}
        height={31}
        className="pointer-events-none absolute z-20 h-[31px] w-[31px]"
        style={{ filter: "brightness(1.8)", top: "70%", left: "55%" }}
      />
    </div>
  );
}

function LatestOffersMockup() {
  return (
    <div className="relative mx-[18px] mt-[18px] flex-1 overflow-hidden rounded-[19px] bg-gradient-to-b from-[#3d514e] to-[#253130]">
      <div className="absolute top-[74px] left-[13px] h-[190px] w-[7px] rounded-[30px] bg-white/10" />
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="relative z-10 mt-4 mb-4 ml-[40%] h-[42px] w-[200%] rounded-l-[25px]"
          style={{
            backgroundImage:
              "linear-gradient(100deg, rgb(117,147,144) 1.25%, rgb(41,55,53) 120%)",
            boxShadow: "-23px 3px 31px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="absolute top-1/2 left-3"
            style={{ transform: "translateY(-50%) scale(1.1532)" }}
          >
            <Info className="h-[23px] w-[23px] text-[#1c2625]" aria-hidden />
          </div>
          <span
            className="font-satoshi absolute top-1/2 left-10 -translate-y-1/2 bg-clip-text text-[14px] font-medium text-transparent"
            style={{ backgroundImage: ROW_TEXT_GRAD }}
          >
            Dodano nowe przedmioty
          </span>
        </div>
        <div className="relative overflow-hidden" style={{ height: "calc(100% - 74px)" }}>
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-8 bg-gradient-to-b from-[#253130] to-transparent" />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-12 bg-gradient-to-t from-[#253130] to-transparent" />
        </div>
      </div>
    </div>
  );
}

function SortingMockup() {
  return (
    <div className="relative mx-[18px] mt-[18px] flex-1 overflow-hidden rounded-[19px] bg-gradient-to-b from-[#3d514e] to-[#253130]">
      <div className="absolute top-5 left-[20%] flex items-center md:left-[28%]">
        <div
          className="relative flex h-[42px] w-[500px] items-center gap-2 overflow-hidden rounded-l-[25px] pl-4"
          style={{
            backgroundImage:
              "linear-gradient(100deg, rgb(117,147,144) 1.25%, rgb(41,55,53) 120%)",
            boxShadow: "-23px 3px 31px rgba(0,0,0,0.2)",
          }}
        >
          <Check className="relative z-10 h-[23px] w-[23px] text-[#1c2625]" aria-hidden />
          <span
            className="font-satoshi relative z-10 bg-clip-text text-[14px] font-medium text-transparent"
            style={{ backgroundImage: ROW_TEXT_GRAD }}
          >
            Zatwierdź ustawienia
          </span>
        </div>
      </div>

      <div className="absolute top-[38%] left-[14%] flex flex-col gap-[6px] md:left-[22%] md:gap-[9px]">
        <div
          className="absolute -top-3 -bottom-3 -left-4 w-[500px] rounded-l-[25px] md:-top-4 md:-bottom-4 md:-left-6"
          style={{
            backgroundImage:
              "linear-gradient(93deg, rgba(117,147,144,0.2) 1.25%, rgba(41,55,53,0.2) 120%)",
            boxShadow: "-23px 3px 31px rgba(0,0,0,0.05)",
          }}
        />
        {SORT_OPTIONS.map((opt) => (
          <div
            key={opt.label}
            className="flex items-center gap-2 md:gap-3"
            style={{ opacity: opt.opacity }}
          >
            <div className="relative h-[17px] w-[18px] shrink-0 rounded-[4px] bg-[#759390] md:h-[22px] md:w-[23px] md:rounded-[5px]" />
            <span className="font-satoshi text-[11px] font-medium text-[#759390] md:text-[14px]">
              {opt.label}
            </span>
          </div>
        ))}
      </div>

      <Image
        src={`${ASSET}/mouse-pointer.svg`}
        alt=""
        width={31}
        height={31}
        className="pointer-events-none absolute z-20 h-[31px] w-[31px]"
        style={{ filter: "brightness(1.8)", top: "75%", left: "55%" }}
      />
    </div>
  );
}

const CARDS = [
  {
    title: "Intuicyjne wyszukiwanie",
    body: "Inteligetne wyszukiwanie przystosowane do twoich potrzeb",
    mockup: <SearchMockup />,
  },
  {
    title: "Najnowsze oferty",
    body: "Wyświetlaj najnowsze oferty tego czego szukasz, z wszystkich portali",
    mockup: <LatestOffersMockup />,
  },
  {
    title: "Zaawansowane sortowanie",
    body: "Sortuj wszystkie oferty z zaawansowanym konfiguratorem filtrów",
    mockup: <SortingMockup />,
  },
] as const;

export function FeaturesBentoSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1480px]">
        <div
          className="scroll-mt-24 mx-auto mb-10 text-center md:mb-14"
          style={{ maxWidth: 620 }}
        >
          <p className="font-sf-expanded-medium mb-2 text-[15px] leading-[1.4] tracking-[0.14em] text-[#49768d] uppercase md:mb-3 md:text-[24px]">
            ŁATWA KONFIGURACJA
          </p>
          <h2 className="text-gradient-section text-[28px] leading-[36px] tracking-tight md:text-[48px] md:leading-[50px]">
            <span className="font-sf-expanded-regular">Idealne narzędzie dla </span>
            <span className="font-sf-expanded-bold">handlarzy i kupców</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="min-h-[472px] overflow-hidden rounded-[37px] bg-[#1c2625]"
            >
              <div className="flex h-full flex-col">
                {card.mockup}
                <div className="px-[31px] pt-5 pb-10">
                  <h3 className="font-satoshi mb-2 text-[28px] leading-tight font-bold text-[#c4e6e4]">
                    {card.title}
                  </h3>
                  <p className="font-satoshi text-[18px] leading-[20px] text-[#9ebdbb]">
                    {card.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
