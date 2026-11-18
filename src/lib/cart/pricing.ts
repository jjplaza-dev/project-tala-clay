import type { CartItem, Money, ProductVariant } from "@/domain";
import { defaultGiftOptions } from "@/data/gift";
import { getVariantDetails } from "@/lib/selectors";

/** Sample limit per line for made-to-order pieces. */
export const MAX_MADE_TO_ORDER_QTY = 6;

/** Ready pieces are limited by stock, made-to-order by the sample limit, sold-out pieces cannot be bought. */
export function maxQuantityFor(variant: ProductVariant): number {
  if (variant.stockStatus === "ready_to_ship") return Math.max(variant.quantityAvailable ?? 0, 0);
  if (variant.stockStatus === "made_to_order") return MAX_MADE_TO_ORDER_QTY;
  return 0;
}

export function clampQuantity(variant: ProductVariant, quantity: number): number {
  const whole = Number.isFinite(quantity) ? Math.floor(quantity) : 0;
  return Math.min(Math.max(whole, 0), maxQuantityFor(variant));
}

type Details = NonNullable<ReturnType<typeof getVariantDetails>>;

export interface PricedLine {
  item: CartItem;
  details: Details;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
  giftWrap: Money;
  max: number;
}

export interface CartSummary {
  lines: PricedLine[];
  itemCount: number;
  subtotal: Money;
  giftWrap: Money;
  /** Subtotal plus gift wrap, before shipping. */
  total: Money;
}

/** Prices every line from the fixtures. Stored prices are never trusted, and unavailable lines are skipped. */
export function priceCart(items: CartItem[]): CartSummary {
  const lines: PricedLine[] = [];
  for (const item of items) {
    const details = getVariantDetails(item.variantId);
    if (!details) continue;
    const max = maxQuantityFor(details.variant);
    const quantity = Math.min(Math.max(Math.floor(item.quantity) || 0, 0), max);
    if (quantity < 1) continue;
    const giftWrap = item.gift?.wrapSelected ? defaultGiftOptions.priceAdd * quantity : 0;
    lines.push({ item, details, quantity, unitPrice: details.unitPrice, lineTotal: details.unitPrice * quantity, giftWrap, max });
  }
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const giftWrap = lines.reduce((sum, l) => sum + l.giftWrap, 0);
  return {
    lines,
    itemCount: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal,
    giftWrap,
    total: subtotal + giftWrap,
  };
}
