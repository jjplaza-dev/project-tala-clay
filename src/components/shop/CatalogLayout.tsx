import { Suspense } from "react";
import type { Product } from "@/domain";
import { SectionBand } from "@/components/layout/SectionBand";
import { CatalogBrowser } from "./CatalogBrowser";
import { ProductGrid } from "./ProductGrid";

interface CatalogLayoutProps {
  /** Products shown while filters load (the unfiltered list for this page). */
  products: Product[];
  /** Category slug on category pages. */
  activeCategory?: string;
  /** Unique id of a visually hidden heading that names the list region. */
  headingId: string;
}

export function CatalogLayout({ products, activeCategory, headingId }: CatalogLayoutProps) {
  return (
    <SectionBand labelledBy={headingId} className="lg:py-20">
      <h2 id={headingId} className="sr-only">
        Pieces
      </h2>
      {/* Reading search params needs a Suspense boundary; the full grid is the loading state. */}
      <Suspense fallback={<div aria-busy="true"><ProductGrid products={products} /></div>}>
        <CatalogBrowser fixedCategory={activeCategory} headingId={headingId} />
      </Suspense>
    </SectionBand>
  );
}
