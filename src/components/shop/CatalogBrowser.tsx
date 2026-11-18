"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FilterState } from "@/domain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyFilters, countActiveFilters, emptyFilters, parseFilters, toQueryString } from "@/lib/filters";
import { getProducts } from "@/lib/selectors";
import { AvailabilityLegend } from "./AvailabilityLegend";
import { FilterControls } from "./FilterControls";
import { FilterSheet } from "./FilterSheet";
import { ProductGrid } from "./ProductGrid";

interface CatalogBrowserProps {
  /** Category slug when the page is a category page. Filters then never change the category. */
  fixedCategory?: string;
  headingId: string;
}

export function CatalogBrowser({ fixedCategory, headingId }: CatalogBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = useMemo(() => parseFilters(searchParams, fixedCategory), [searchParams, fixedCategory]);
  const [text, setText] = useState(state.q);
  useEffect(() => setText(state.q), [state.q]);

  const inScope = useMemo(
    () => (fixedCategory ? applyFilters(getProducts(), { ...emptyFilters(fixedCategory) }) : getProducts()),
    [fixedCategory],
  );
  const results = useMemo(() => applyFilters(getProducts(), state), [state]);
  const active = countActiveFilters(state, fixedCategory);

  const update = (next: FilterState) => {
    const qs = toQueryString(next, fixedCategory);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };
  const controls = (prefix: string) => (
    <FilterControls state={state} onChange={update} fixedCategory={fixedCategory} idPrefix={prefix} />
  );

  return (
    <>
      <div id="search" className="mb-10 max-w-md scroll-mt-6">
        <Label htmlFor={`${headingId}-search`} className="text-label mb-2 block">
          Search pieces
        </Label>
        <Input
          id={`${headingId}-search`}
          type="search"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            update({ ...state, q: e.target.value });
          }}
          placeholder="Mug, bowl, glaze..."
          autoComplete="off"
          className="h-11 rounded border-field bg-background px-3"
        />
      </div>
      <div className="grid gap-10 lg:grid-cols-12">
        <aside aria-label="Filters" className="hidden lg:col-span-3 lg:block">
          {controls("filters-desktop")}
        </aside>
        <div className="lg:col-span-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm" role="status" aria-live="polite">
              Showing {results.length} of {inScope.length} pieces
              {active > 0 ? ` (${active} ${active === 1 ? "filter" : "filters"} on)` : ""}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {active > 0 ? (
                <Button type="button" variant="ghost" onClick={() => update(emptyFilters(fixedCategory))} className="h-11 px-3 underline underline-offset-4">
                  Clear all
                </Button>
              ) : null}
              <FilterSheet>{controls("filters-mobile")}</FilterSheet>
            </div>
          </div>
          <AvailabilityLegend />
          <div className="mt-10">
            {results.length > 0 ? (
              <ProductGrid products={results} />
            ) : (
              <div className="rounded border border-line bg-oat-deep p-8">
                <h3 className="text-2xl font-semibold">No pieces match</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed">
                  Try removing a filter or searching for something broader, such as a glaze or a kind of piece.
                </p>
                <Button type="button" onClick={() => update(emptyFilters(fixedCategory))} className="mt-5 h-11 px-6 text-base">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
