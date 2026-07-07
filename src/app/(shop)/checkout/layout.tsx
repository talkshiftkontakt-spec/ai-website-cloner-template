import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
 title: "Kasa",
 description: "Bezpieczna płatność za kolekcjonerskie główki Minecraft.",
 path: "/checkout",
 noIndex: true,
});

export default function CheckoutLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
