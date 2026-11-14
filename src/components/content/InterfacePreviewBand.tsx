import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/PageContainer";

interface InterfacePreviewBandProps {
  /** Unique per page, used for the landmark name. */
  id: string;
  title?: string;
  children: ReactNode;
}

/** Inline band for static previews. Nothing inside saves, sends or connects. */
export function InterfacePreviewBand({ id, title = "Interface previews", children }: InterfacePreviewBandProps) {
  return (
    <section aria-labelledby={id} className="paper-deep border-y border-line py-12 md:py-16">
      <PageContainer>
        <p className="text-label text-terracotta-deep">Preview only</p>
        <h2 id={id} className="mt-2 text-2xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          These are static pictures of parts of the site that become interactive in later phases. Nothing here saves,
          sends or connects.
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">{children}</div>
      </PageContainer>
    </section>
  );
}
