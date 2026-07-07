import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Koszyk",
 description: "Twój koszyk Twój Skinek: kolekcjonerskie główki Minecraft.",
 path: "/koszyk",
 noIndex: true,
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
 return children;
}
