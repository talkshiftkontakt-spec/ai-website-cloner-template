import Link from "next/link";
import { ServiceIcon } from "@/components/icons";
import { services } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <section className="bg-[#f8f6f2] py-12 lg:py-16">
      <div className="mx-auto max-w-[1325px] px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {services.map((service) => {
            const content = (
              <>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-[#879d91]/30 text-[#879d91]">
                  <ServiceIcon className="h-10 w-10" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-medium text-[#134340]">
                  {service.title}
                </h3>
              </>
            );

            if (service.href) {
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="flex flex-col items-center text-center transition hover:opacity-80"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={service.title} className="flex flex-col items-center text-center">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
