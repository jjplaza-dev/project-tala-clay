import type { StockStatus } from "./primitives";

export type SortKey = "featured" | "price_asc" | "price_desc" | "name";

/** Catalog filter state. The URL search params are the source of truth for it. */
export interface FilterState {
  /** Category slug. */
  category?: string;
  /** Glaze ids. A piece matches if any of its options has one of these glazes. */
  glazes: string[];
  sizes: string[];
  availability: StockStatus[];
  sort: SortKey;
  q: string;
}
