import Image from "next/image";
import Link from "next/link";
import type { ContentBlock } from "@/lib/pages-data";
import { cn } from "@/lib/utils";

interface ContentBlocksProps {
  blocks: ContentBlock[];
  className?: string;
}

export function ContentBlocks({ blocks, className }: ContentBlocksProps) {
  return (
    <div className={cn("mx-auto max-w-4xl space-y-6 px-6 py-12 lg:px-8 lg:py-16", className)}>
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;
      const Tag = (`h${Math.min(level, 4)}` as "h2" | "h3" | "h4");
      const styles = {
        2: "mt-10 text-2xl font-bold text-[#134340] first:mt-0 md:text-3xl",
        3: "mt-8 text-xl font-bold text-[#134340] md:text-2xl",
        4: "mt-6 text-lg font-semibold text-[#134340]",
      }[Math.min(level, 4) as 2 | 3 | 4];
      return <Tag className={cn("font-[family-name:var(--font-heading)]", styles)}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="text-[17px] leading-relaxed text-[#3d4a47]">{block.text}</p>;
    case "list":
    case "ordered-list":
      return (
        <ul className="list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-[#3d4a47]">
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      if (!block.local) return null;
      return (
        <div className="relative my-8 aspect-[16/10] overflow-hidden rounded-2xl">
          <Image
            src={block.local}
            alt={block.alt || ""}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      );
    default:
      return null;
  }
}

export function CtaBanner() {
  return (
    <section className="border-t border-[#134340]/10 bg-[#134340] px-6 py-12 text-center lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white md:text-3xl">
          Umów wizytę
        </h2>
        <p className="mt-3 text-white/80">
          Jeśli nie wiesz, od czego zacząć – pomożemy dobrać odpowiedni krok.
        </p>
        <Link href="/kontakt#formularz-kontaktowy" className="gp-btn gp-btn-primary mt-6 inline-flex">
          Formularz kontaktowy
        </Link>
      </div>
    </section>
  );
}
