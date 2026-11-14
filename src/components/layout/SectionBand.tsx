import type { ReactNode } from "react";
import { PageContainer } from "./PageContainer";
import { cn } from "@/lib/utils";

const TONES = { paper: "paper", deep: "paper-deep", dark: "surface-dark" } as const;

interface SectionBandProps {
  children: ReactNode;
  tone?: keyof typeof TONES;
  /** Id of the section's heading, for the landmark name. */
  labelledBy?: string;
  className?: string;
  /** Set false for a full-bleed layout that manages its own container. */
  contained?: boolean;
}

export function SectionBand({ children, tone = "paper", labelledBy, className, contained = true }: SectionBandProps) {
  return (
    <section aria-labelledby={labelledBy} className={cn(TONES[tone], "py-16 md:py-24 lg:py-36", className)}>
      {contained ? <PageContainer>{children}</PageContainer> : children}
    </section>
  );
}
