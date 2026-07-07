import Image from "next/image";
import Link from "next/link";
import { specialists } from "@/lib/site-data";

export function TeamSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-[1325px] px-6 lg:px-12">
        <h2 className="gp-section-title text-center">Nasz zespół</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-[17px] text-[#333]">
          Zespół Gabinetów Pomorska tworzą specjaliści z wieloletnim doświadczeniem:
        </p>

        <div className="grid grid-cols-1 gap-7 px-0 sm:grid-cols-2 lg:px-[50px]">
          {specialists.map((spec) => (
            <Link
              key={spec.name}
              href={spec.href}
              className="group flex items-center gap-3.5 rounded-[14px] p-3.5 transition duration-[180ms] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(19,67,64,0.12)]"
            >
              <Image
                src={spec.image}
                alt={spec.name}
                width={88}
                height={88}
                className="h-[88px] w-[88px] shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="mb-2 font-[family-name:var(--font-montserrat)] text-base leading-[1.6] text-[#134340]">
                  {spec.role}
                </p>
                <p className="font-[family-name:var(--font-heading)] text-base font-black capitalize tracking-wide text-[#879d91]">
                  {spec.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="https://www.gabinetpomorska.pl/index.php/specjalisci/"
            className="gp-btn gp-btn-outline"
          >
            Dowiedz się więcej
          </Link>
        </div>
      </div>
    </section>
  );
}
