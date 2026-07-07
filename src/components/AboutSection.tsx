import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import { images } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#134340] md:text-4xl">
                Czym się zajmujemy?
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[17px] leading-[1.75] text-[#3d4a47]">
                W Gabinetach Pomorska (wcześniej BrainTechLab) posiadamy ofertę{" "}
                <strong className="font-semibold text-[#134340]">dla dzieci, młodzieży, rodzin i osób dorosłych</strong>
                , dzięki czemu możemy trafnie odpowiadać na potrzeby pacjentów w różnym wieku. Prowadzimy{" "}
                <strong className="font-semibold text-[#134340]">leczenie zaburzeń</strong> oraz kompleksową{" "}
                <strong className="font-semibold text-[#134340]">diagnostykę psychologiczną</strong>, pozwalającą na
                dokładne rozpoznanie trudności i zaplanowanie skutecznej terapii. Pomagamy naszym Pacjentom w oparciu o
                aktualną wiedzę naukową oraz przestrzegamy zasad etyki i tajemnicy zawodowej. Nasz gabine znajduje się w
                samym centrum Krakowa, co gwarantuje wygodny dojazd.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-14 lg:mt-20" delay={0.1}>
          <div className="relative ml-auto max-w-4xl">
            <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl bg-[#879d91]/15 lg:-left-8" aria-hidden />
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_24px_60px_rgba(19,67,64,0.12)]">
              <Image
                src={images.heroInterior}
                alt="Gabinet psychologiczny w centrum Krakowa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
