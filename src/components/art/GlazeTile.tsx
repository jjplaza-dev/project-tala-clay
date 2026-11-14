import { CheckIcon } from "lucide-react";
import type { TextureKind } from "@/domain";
import { cn } from "@/lib/utils";

interface GlazeTileProps {
  name: string;
  hex: string;
  textureKind?: TextureKind;
  selected?: boolean;
  className?: string;
}

const SPECKS: [number, number][] = [[10, 12], [22, 30], [34, 14], [14, 36], [38, 38], [28, 22]];

/** Small glaze sample. The name is always shown, so colour is never the only signal. */
export function GlazeTile({ name, hex, textureKind = "matte", selected = false, className }: GlazeTileProps) {
  const speckled = textureKind === "speckle" || textureKind === "raw";
  return (
    <span className={cn("inline-flex w-14 flex-col items-start gap-1.5", className)}>
      <span
        className={cn(
          "relative block size-11 overflow-hidden rounded border border-charcoal/40",
          selected && "outline-2 outline-offset-2 outline-terracotta",
        )}
      >
        <svg viewBox="0 0 44 44" aria-hidden className="size-full">
          <rect width={44} height={44} fill={hex} />
          {speckled
            ? SPECKS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.2} fill="#292A26" opacity={0.4} />)
            : null}
          {textureKind === "satin" ? <rect width={14} height={44} fill="#F4EFE6" opacity={0.16} /> : null}
        </svg>
        {selected ? (
          <span className="absolute right-0.5 bottom-0.5 flex size-4 items-center justify-center rounded-[2px] bg-charcoal text-oat">
            <CheckIcon aria-hidden strokeWidth={2} className="size-3" />
          </span>
        ) : null}
      </span>
      <span className="text-xs leading-tight">{name}</span>
    </span>
  );
}
