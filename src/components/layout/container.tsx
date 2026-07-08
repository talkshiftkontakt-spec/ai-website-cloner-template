import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12",
        narrow && "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
