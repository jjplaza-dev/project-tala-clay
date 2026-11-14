import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const RATIOS = { square: "aspect-square", portrait: "aspect-[4/5]", landscape: "aspect-[4/3]" } as const;

interface ImageFrameProps {
  ratio?: keyof typeof RATIOS;
  /** Optional user-supplied photo path, e.g. /images/photography/hero-studio.jpg. The SVG child is the fallback. */
  src?: string;
  alt?: string;
  hoverZoom?: boolean;
  className?: string;
  children?: ReactNode;
}

export function ImageFrame({ ratio = "square", src, alt = "", hoverZoom = false, className, children }: ImageFrameProps) {
  return (
    <div className={cn("group relative overflow-hidden rounded border border-line bg-oat-deep", RATIOS[ratio], className)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          hoverZoom && "transition-transform duration-200 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
        )}
      >
        {src ? (
          <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center p-[6%] [&>svg]:size-full">{children}</div>
        )}
      </div>
    </div>
  );
}
