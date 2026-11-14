import type {
  CareGuideSection,
  CareNote,
  Category,
  DeliveryEstimate,
  GlazeColor,
  Money,
  PaymentMethod,
  Product,
  ProductImage,
  ProductVariant,
  ShippingRate,
  ShippingZone,
  StockStatus,
} from "@/domain";
import { careGuideSections, careNotes } from "@/data/care";
import { categories } from "@/data/categories";
import { glazes } from "@/data/glazes";
import { paymentMethods } from "@/data/payments";
import { productImages, products } from "@/data/products";
import { deliveryEstimates, shippingRates, shippingZones } from "@/data/shipping";
import { variants } from "@/data/variants";

// Pure functions over fixtures. No DOM, storage or env access.

/** Sample threshold for the derived "low stock" note. */
export const LOW_STOCK_THRESHOLD = 2;

export const getCategories = (): Category[] => categories;
export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);

export const getProducts = (): Product[] => products;
export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
export const getProductsByCategory = (categoryId: string): Product[] =>
  products.filter((p) => p.categoryId === categoryId);
export const getFeaturedProducts = (): Product[] => products.filter((p) => p.isFeatured);

export const getVariantsForProduct = (productId: string): ProductVariant[] =>
  variants.filter((v) => v.productId === productId);
export const getVariantById = (id: string): ProductVariant | undefined =>
  variants.find((v) => v.id === id);
export const getImagesForProduct = (productId: string): ProductImage[] =>
  productImages.filter((i) => i.productId === productId);

export const getGlazes = (): GlazeColor[] => glazes;
export const getGlazeById = (id: string): GlazeColor | undefined =>
  glazes.find((g) => g.id === id);

/** Domain rule: unitPrice = Product.basePrice + Variant.priceDelta. */
export const getVariantPrice = (product: Product, variant: ProductVariant): Money =>
  product.basePrice + variant.priceDelta;

export const isLowStock = (variant: ProductVariant): boolean =>
  variant.stockStatus === "ready_to_ship" &&
  (variant.quantityAvailable ?? 0) <= LOW_STOCK_THRESHOLD;

/** Derived from variants, never stored: ready beats made-to-order beats sold out. */
export function getProductAvailability(productId: string): StockStatus {
  const vs = getVariantsForProduct(productId);
  if (vs.some((v) => v.stockStatus === "ready_to_ship")) return "ready_to_ship";
  if (vs.some((v) => v.stockStatus === "made_to_order")) return "made_to_order";
  return "sold_out";
}

export const getReadyToShipProducts = (): Product[] =>
  products.filter((p) => getProductAvailability(p.id) === "ready_to_ship");

export function getPriceRange(productId: string): { min: Money; max: Money } {
  const product = getProductById(productId);
  const vs = getVariantsForProduct(productId);
  if (!product || vs.length === 0) {
    const base = product?.basePrice ?? 0;
    return { min: base, max: base };
  }
  const prices = vs.map((v) => getVariantPrice(product, v));
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Same category first, then featured pieces from elsewhere. Deterministic. */
export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return [];
  const sameCategory = products.filter(
    (p) => p.categoryId === current.categoryId && p.id !== productId,
  );
  const others = products.filter(
    (p) => p.categoryId !== current.categoryId && p.isFeatured,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export const getCareNotesForProduct = (productId: string): CareNote[] => {
  const product = getProductById(productId);
  return product ? careNotes.filter((n) => product.careNoteIds.includes(n.id)) : [];
};
export const getCareGuideSections = (): CareGuideSection[] => careGuideSections;

export const getShippingZones = (): ShippingZone[] => shippingZones;
export const getShippingRates = (zoneId?: string): ShippingRate[] =>
  zoneId ? shippingRates.filter((r) => r.zoneId === zoneId) : shippingRates;
export const getDeliveryEstimate = (zoneId: string): DeliveryEstimate | undefined =>
  deliveryEstimates.find((e) => e.zoneId === zoneId);
export const getPaymentMethods = (): PaymentMethod[] => paymentMethods;
