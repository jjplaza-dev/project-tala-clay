import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  intro?: string;
  level?: 1 | 2 | 3;
  id?: string;
  /** Use on charcoal bands: ochre eyebrow instead of terracotta-deep. */
  onDark?: boolean;
  className?: string;
}

const SIZES = {
  1: "text-display",
  2: "text-3xl leading-[1.15] font-semibold md:text-4xl",
  3: "text-xl leading-snug font-medium md:text-2xl",
} as const;

export function SectionHeading({ title, eyebrow, intro, level = 2, id, onDark, className }: SectionHeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <div className={cn("max-w-[62ch]", className)}>
      {eyebrow ? (
        <p className={cn("text-label mb-3", onDark ? "text-ochre" : "text-terracotta-deep")}>{eyebrow}</p>
      ) : null}
      <Tag id={id} className={SIZES[level]}>
        {title}
      </Tag>
      {intro ? <p className="mt-4 text-[1.0625rem] leading-[1.65] md:text-lg">{intro}</p> : null}
    </div>
  );
}
