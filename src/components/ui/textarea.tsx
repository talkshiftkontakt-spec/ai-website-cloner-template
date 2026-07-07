import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
 return (
 <textarea
 data-slot="textarea"
 className={cn(
 "flex min-h-32 w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
 className,
 )}
 {...props}
 />
 );
}

export { Textarea };
