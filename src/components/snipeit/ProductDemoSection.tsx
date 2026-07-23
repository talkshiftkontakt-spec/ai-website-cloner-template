import Image from "next/image";
import { ASSET, CATEGORIES, NEW_OFFERS } from "@/lib/snipeit-content";

const SIDEBAR_ICONS = [
  { src: `${ASSET}/diamond-percent.svg`, alt: "" },
  { src: `${ASSET}/search.svg`, alt: "" },
  { src: `${ASSET}/squares-subtract.svg`, alt: "" },
  { src: `${ASSET}/octagon-minus.svg`, alt: "" },
  { src: `${ASSET}/user-round-check.svg`, alt: "" },
  { src: `${ASSET}/settings.svg`, alt: "" },
] as const;

const OFFER_CARD_BG =
  "linear-gradient(107.642deg, rgb(28, 38, 37) 65.894%, rgb(103, 140, 136) 134.68%)";

export function ProductDemoSection() {
  return (
    <section id="produkt" className="py-8 px-6 scroll-mt-[94px]">
      <div className="max-w-[1480px] mx-auto" style={{ perspective: "1600px" }}>
        <div
          className="flex flex-col lg:flex-row gap-6"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
            transform: "translateY(20px) scale(0.98) rotateX(8deg)",
          }}
        >
          {/* Left: dashboard */}
          <div className="hidden lg:block flex-1 bg-[#1c2625] rounded-[37px] overflow-hidden min-h-[500px] lg:min-h-[660px]">
            <div className="flex h-full">
              <div
                className="hidden sm:flex w-[85px] flex-col items-center pt-[26px] pb-6 gap-[18px] shrink-0 rounded-l-[37px]"
                style={{
                  background:
                    "linear-gradient(to bottom, #2d3b39 40%, #1e2121 133%)",
                }}
              >
                <div className="mb-[31px] px-2">
                  <Image
                    src={`${ASSET}/sidebar-interactive-logo.png`}
                    alt="Logo"
                    width={22}
                    height={35}
                    className="w-[22px] h-[35px] object-contain"
                  />
                </div>
                {SIDEBAR_ICONS.map((icon) => (
                  <button
                    key={icon.src}
                    type="button"
                    className="w-[39px] h-[39px] rounded-[5px] bg-[#242d2d] flex items-center justify-center shrink-0"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                ))}
                <div className="mt-auto flex flex-col items-center gap-[21px]">
                  <button
                    type="button"
                    className="w-[39px] h-[39px] rounded-[5px] flex items-center justify-center"
                  >
                    <Image
                      src={`${ASSET}/log-out.svg`}
                      alt="Log out"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                  <Image
                    src={`${ASSET}/avatar.svg`}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </div>

              <div className="flex-1 p-4 sm:p-8 overflow-hidden">
                <h3 className="text-[#aeccc9] text-[18px] sm:text-[24px] font-sf-expanded-regular tracking-[-1.2px] mb-1">
                  Witaj <span className="font-sf-expanded-bold">Krystian,</span>{" "}
                  na co dziś polujemy?
                </h3>

                <div className="mt-8 mb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <p className="text-[#aecbc9] text-[15px] font-sf-expanded-medium tracking-[-0.75px]">
                      Proponowane
                    </p>
                    <div className="flex-1 h-px bg-[#394746]" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CATEGORIES.map((category) => {
                      const isSeeAll = "seeAll" in category && category.seeAll;
                      return (
                        <div
                          key={category.label}
                          className={`flex flex-col items-center justify-center rounded-[10px] aspect-[4/3] border border-[#bae3df] ${
                            isSeeAll
                              ? "bg-[rgba(0,0,0,0.2)]"
                              : "bg-[#2e3b3a]"
                          }`}
                        >
                          <Image
                            src={category.icon}
                            alt={category.label}
                            width={isSeeAll ? 20 : 76}
                            height={isSeeAll ? 20 : 76}
                            className={
                              isSeeAll
                                ? "w-5 h-5 mb-2"
                                : "w-[76px] h-[76px] mb-2"
                            }
                          />
                          <span className="text-[14px] text-[#9ebdbb] font-satoshi font-medium text-center">
                            {category.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-[#aecbc9] text-[15px] font-sf-expanded-medium tracking-[-0.75px]">
                      Twoje ostatnie zakupy
                    </p>
                    <div className="flex-1 h-px bg-[#394746]" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-[44px] bg-[#253130] " />
                    <div className="h-[44px] bg-[#253130] " />
                    <div className="h-[44px] bg-[#253130] " />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                    <div className="h-[44px] bg-[#253130] opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: new offers */}
          <div
            className="w-full lg:w-[490px] rounded-[37px] overflow-hidden min-h-[420px] lg:min-h-[660px] shrink-0"
            style={{
              background:
                "linear-gradient(rgb(28, 38, 37) 61.364%, rgb(44, 55, 54) 100%)",
            }}
          >
            <div className="p-6 pt-8">
              <h3 className="text-[#bae3df] text-[20px] font-sf-expanded-bold text-center mb-6">
                Nowe oferty
              </h3>
              <div className="space-y-[22px]">
                {NEW_OFFERS.map((offer) => (
                  <div
                    key={`${offer.title}-${offer.location}-${offer.price}`}
                    className="flex items-center gap-4 p-4 rounded-[17px] border-[0.847px] border-[#394746] backdrop-blur-[8.5px]"
                    style={{ background: OFFER_CARD_BG }}
                  >
                    <div className="w-[50px] h-[50px] rounded-[8px] shrink-0 overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[18px] text-white font-satoshi font-medium tracking-[-0.9px] truncate">
                        {offer.title}
                      </p>
                      <p className="text-[11px] text-[#9a9a9a] font-satoshi font-medium tracking-[-0.5px]">
                        {offer.location}
                      </p>
                    </div>
                    <p className="text-[18px] text-[#bae3df] font-satoshi font-medium tracking-[-0.9px] whitespace-nowrap">
                      {offer.price}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-[11px] sm:text-[15px] font-sf-regular gap-2">
                <span className="text-[#bae3df]">
                  <span className="font-sf-bold">Śledzenie kategorii</span>:
                  IPhone
                </span>
                <span className="text-[#bae3df] text-right">
                  <span className="font-sf-bold">Cena</span>: od najniższej
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
