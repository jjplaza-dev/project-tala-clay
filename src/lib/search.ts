import type { Product } from "@/domain";
import { getCategories, getGlazeById, getVariantsForProduct } from "./selectors";

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/** Every word in the query must appear in the product name, category name or one of its glaze names. */
export function matchesQuery(product: Product, query: string): boolean {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const category = getCategories().find((c) => c.id === product.categoryId);
  const glazeNames = getVariantsForProduct(product.id).map((v) => getGlazeById(v.glazeId)?.name ?? "");
  const haystack = normalize([product.name, category?.name ?? "", ...glazeNames].join(" "));
  return tokens.every((token) => haystack.includes(token));
}

export function searchProducts(products: Product[], query: string, limit?: number): Product[] {
  const found = products.filter((p) => matchesQuery(p, query));
  return limit ? found.slice(0, limit) : found;
}
