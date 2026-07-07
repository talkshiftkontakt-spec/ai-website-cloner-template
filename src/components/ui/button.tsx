"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand text-canvas hover:bg-brand-hover",
        outline:
          "border border-border bg-transparent text-primary hover:border-primary/40",
        secondary: "bg-canvas-raised text-primary hover:bg-canvas-sunken",
        ghost: "text-secondary hover:text-primary",
        link: "text-brand underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-[15px] rounded-md",
        sm: "h-9 px-4 text-sm rounded-sm",
        lg: "h-[52px] px-8 text-base rounded-md",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
