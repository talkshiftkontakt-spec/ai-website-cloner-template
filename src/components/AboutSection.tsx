import Image from "next/image";
import { images } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto grid max-w-[1325px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <div>
          <h2 className="gp-section-title">Czym się zajmujemy?</h2>
          <p className="text-[17px] leading-[1.7] text-[#333]">
            W Gabinetach Pomorska (wcześniej BrainTechLab) posiadamy ofertę{" "}
            <strong>dla dzieci, młodzieży, rodzin i osób dorosłych</strong>, dzięki czemu możemy
            trafnie odpowiadać na potrzeby pacjentów w różnym wieku. Prowadzimy{" "}
            <strong>leczenie zaburzeń</strong> oraz kompleksową{" "}
            <strong>diagnostykę psychologiczną</strong>, pozwalającą na dokładne rozpoznanie
            trudności i zaplanowanie skutecznej terapii. Pomagamy naszym Pacjentom w oparciu o
            aktualną wiedzę naukową oraz przestrzegamy zasad etyki i tajemnicy zawodowej. Nasz
            gabine znajduje się w samym centrum Krakowa, co gwarantuje wygodny dojazd.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={images.heroInterior}
            alt="Gabinet psychologiczny"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
