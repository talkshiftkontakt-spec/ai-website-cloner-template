import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  theme?: "dark" | "light" | "raised" | "sunken";
  padding?: "default" | "hero" | "compact";
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  theme = "dark",
  padding = "default",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-theme={theme === "light" ? "light" : undefined}
      className={cn(
        "bg-canvas text-primary",
        theme === "raised" && "bg-canvas-raised",
        theme === "sunken" && "bg-canvas-sunken",
        theme === "light" && "bg-light-canvas text-light-text",
        padding === "hero" && "py-20 lg:py-28",
        padding === "default" && "py-16 lg:py-24",
        padding === "compact" && "py-12 lg:py-16",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
