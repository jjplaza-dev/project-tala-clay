import type { Product } from "@/domain";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionBand } from "@/components/layout/SectionBand";
import { AvailabilityLegend } from "./AvailabilityLegend";
import { FilterPanel } from "./FilterPanel";
import { FilterSheet } from "./FilterSheet";
import { ProductGrid } from "./ProductGrid";

interface CatalogLayoutProps {
  products: Product[];
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
      <div id="search" className="mb-10 max-w-md scroll-mt-6">
        <Label htmlFor={`${headingId}-search`} className="text-label mb-2 block">
          Search pieces
        </Label>
        <Input
          id={`${headingId}-search`}
          readOnly
          placeholder="Mug, bowl, glaze..."
          aria-describedby={`${headingId}-search-note`}
          className="h-11 rounded border-field bg-background px-3"
        />
        <p id={`${headingId}-search-note`} className="mt-2 text-sm text-muted-foreground">
          Preview: search turns on in the next phase.
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-12">
        <aside aria-label="Search and filters" className="hidden lg:col-span-3 lg:block">
          <FilterPanel activeCategory={activeCategory} idPrefix="filters-desktop" />
        </aside>
        <div className="lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm" aria-live="polite">
              Showing {products.length} pieces
            </p>
            <FilterSheet>
              <FilterPanel activeCategory={activeCategory} idPrefix="filters-mobile" />
            </FilterSheet>
          </div>
          <AvailabilityLegend />
          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
