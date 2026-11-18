import type { FilterState, Product, SortKey, StockStatus } from "@/domain";
import { matchesQuery } from "./search";
import { getCategories, getGlazes, getPriceRange, getSizes, getVariantsForProduct } from "./selectors";

export const DEFAULT_SORT: SortKey = "featured";
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "name", label: "Name, A to Z" },
];

const AVAILABILITY_PARAM: Record<StockStatus, string> = {
  ready_to_ship: "ready",
  made_to_order: "made",
  sold_out: "sold",
};
const AVAILABILITY_FROM_PARAM = Object.fromEntries(
  Object.entries(AVAILABILITY_PARAM).map(([status, param]) => [param, status as StockStatus]),
);

/** Anything with a `get`, such as URLSearchParams or Next's ReadonlyURLSearchParams. */
type ParamReader = { get(name: string): string | null };

const list = (value: string | null): string[] =>
  value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];

export const emptyFilters = (category?: string): FilterState => ({
  category,
  glazes: [],
  sizes: [],
  availability: [],
  sort: DEFAULT_SORT,
  q: "",
});

/** Reads filter state from URL params, ignoring any value that is not a known option. */
export function parseFilters(params: ParamReader, fixedCategory?: string): FilterState {
  const glazeIds = new Set(getGlazes().map((g) => g.id));
  const sizes = new Set(getSizes());
  const categorySlugs = new Set(getCategories().map((c) => c.slug));
  const sortRaw = params.get("sort");
  const categoryRaw = params.get("category");

  return {
    category: fixedCategory ?? (categoryRaw && categorySlugs.has(categoryRaw) ? categoryRaw : undefined),
    glazes: list(params.get("glaze")).map((s) => `glaze-${s}`).filter((id) => glazeIds.has(id)),
    sizes: list(params.get("size")).filter((s) => sizes.has(s)),
    availability: list(params.get("availability"))
      .map((s) => AVAILABILITY_FROM_PARAM[s])
      .filter((s): s is StockStatus => Boolean(s)),
    sort: SORT_OPTIONS.some((o) => o.value === sortRaw) ? (sortRaw as SortKey) : DEFAULT_SORT,
    q: (params.get("q") ?? "").slice(0, 80),
  };
}

export function toQueryString(state: FilterState, fixedCategory?: string): string {
  const p = new URLSearchParams();
  if (!fixedCategory && state.category) p.set("category", state.category);
  if (state.glazes.length) p.set("glaze", state.glazes.map((id) => id.replace("glaze-", "")).join(","));
  if (state.sizes.length) p.set("size", state.sizes.join(","));
  if (state.availability.length) p.set("availability", state.availability.map((s) => AVAILABILITY_PARAM[s]).join(","));
  if (state.sort !== DEFAULT_SORT) p.set("sort", state.sort);
  if (state.q.trim()) p.set("q", state.q.trim());
  return p.toString().replace(/%2C/g, ",");
}

export function countActiveFilters(state: FilterState, fixedCategory?: string): number {
  return (
    (!fixedCategory && state.category ? 1 : 0) +
    state.glazes.length +
    state.sizes.length +
    state.availability.length +
    (state.q.trim() ? 1 : 0)
  );
}

/** Variant-level filters must all be satisfied by the same option of a piece. */
function matchesVariantFilters(product: Product, state: FilterState): boolean {
  if (!state.glazes.length && !state.sizes.length && !state.availability.length) return true;
  return getVariantsForProduct(product.id).some(
    (v) =>
      (!state.glazes.length || state.glazes.includes(v.glazeId)) &&
      (!state.sizes.length || state.sizes.includes(v.size)) &&
      (!state.availability.length || state.availability.includes(v.stockStatus)),
  );
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const indexed = products.map((product, index) => ({ product, index }));
  const price = (p: Product) => getPriceRange(p.id).min;
  indexed.sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return price(a.product) - price(b.product) || a.index - b.index;
      case "price_desc":
        return price(b.product) - price(a.product) || a.index - b.index;
      case "name":
        return a.product.name.localeCompare(b.product.name) || a.index - b.index;
      default:
        return Number(b.product.isFeatured) - Number(a.product.isFeatured) || a.index - b.index;
    }
  });
  return indexed.map((i) => i.product);
}

export function applyFilters(products: Product[], state: FilterState): Product[] {
  const category = state.category ? getCategories().find((c) => c.slug === state.category) : undefined;
  const filtered = products.filter(
    (p) =>
      (!state.category || p.categoryId === category?.id) &&
      matchesQuery(p, state.q) &&
      matchesVariantFilters(p, state),
  );
  return sortProducts(filtered, state.sort);
}
