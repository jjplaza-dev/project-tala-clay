import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: buttonVariants({ variant: "default", size: "lg" }),
  outline: cn(buttonVariants({ variant: "outline", size: "lg" }), "border-field"),
  light: cn(buttonVariants({ variant: "default", size: "lg" }), "bg-oat text-charcoal hover:bg-oat/90"),
} as const;

/** Class string for a <Link> that should look like a button, with a 44px touch target. */
export const cta = (variant: keyof typeof VARIANTS = "primary", className?: string) =>
  cn(VARIANTS[variant], "h-11 px-6 text-base", className);
