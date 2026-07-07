import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import { footerLinks, images } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#f8f6f2] pt-12">
      <div className="mx-auto max-w-[1325px] px-6 lg:px-12">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="hidden lg:block">
            <Link href="/">
              <Image
                src={images.logoFooter}
                alt="Gabinety Pomorska"
                width={180}
                height={180}
                className="h-40 w-40 object-contain"
              />
            </Link>
          </div>

          <div>
            <h5 className="mb-4 font-[family-name:var(--font-heading)] text-base font-bold text-[#134340]">
              Informacje
            </h5>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] text-[#879d91] hover:text-[#134340]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-[family-name:var(--font-heading)] text-base font-bold text-[#134340]">
              Kontakt
            </h5>
            <p className="mb-3">
              <Link href="mailto:gabinetpomorska@gmail.com" className="text-[#879d91] hover:text-[#134340]">
                gabinetpomorska@gmail.com
              </Link>
            </p>
            <ul className="mb-4 flex flex-wrap gap-4">
              <li>
                <Link href="tel:124311630" className="flex items-center gap-2 text-[#879d91] hover:text-[#134340]">
                  <PhoneIcon className="h-4 w-4" />
                  12 431 16 30
                </Link>
              </li>
              <li>
                <Link href="tel:790233171" className="flex items-center gap-2 text-[#879d91] hover:text-[#134340]">
                  <PhoneIcon className="h-4 w-4" />
                  790 233 171
                </Link>
              </li>
            </ul>
            <div className="text-[15px] text-[#555]">
              <p>Godziny rejestracji:</p>
              <p>poniedziałek – piątek</p>
              <p>15:00 – 20:00</p>
            </div>
          </div>

          <div>
            <h5 className="mb-4 font-[family-name:var(--font-heading)] text-base font-bold text-[#134340]">
              Lokalizacja
            </h5>
            <div className="aspect-[4/3] overflow-hidden rounded">
              <iframe
                title="Kraków, ulica pomorska 10/1"
                src="https://maps.google.com/maps?q=Krak%C3%B3w%2C%20ulica%20pomorska%2010%2F1&t=m&z=15&output=embed&iwloc=near"
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#879d91]/20 py-6 text-center text-sm text-[#666]">
          <p>© Pomorska Specjalistyczne Gabinety Lekarsko-Psychologiczne Sotwin Grochocki</p>
        </div>
      </div>
    </footer>
  );
}
