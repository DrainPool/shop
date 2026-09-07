import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-800 text-white shadow hover:bg-emerald-800/85",
        warning: "border-transparent bg-gold text-ink shadow hover:bg-gold/85",
        info: "border-transparent bg-stone-600 text-white shadow hover:bg-stone-600/85",
        mono: "border-transparent bg-ink text-ink-foreground shadow hover:bg-ink/90",
      },
      appearance: {
        solid: "",
        stroke: "bg-transparent shadow-none border-current/40 hover:bg-transparent",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        appearance: "solid",
        class: "border-border",
      },
    ],
    defaultVariants: {
      variant: "default",
      appearance: "solid",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, appearance, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, appearance }), className)} {...props} />;
}

export { Badge, badgeVariants };
