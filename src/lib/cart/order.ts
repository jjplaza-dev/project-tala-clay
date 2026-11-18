import type { CheckoutDetails, Money, Order } from "@/domain";
import type { CartSummary } from "./pricing";

function orderNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const noise = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `TCS-${stamp}${noise}`;
}

/**
 * Snapshots the cart into an order draft. Every amount comes from the priced cart (fixtures), never from the form.
 * The status is "draft": nothing is paid, because payment connects in a later phase.
 * Call this from an event handler: it reads the clock and random numbers.
 */
export function buildOrder(summary: CartSummary, checkout: CheckoutDetails, shipping: Money): Order {
  const number = orderNumber();
  return {
    id: `order-${number.toLowerCase()}`,
    number,
    items: summary.lines.map((l) => ({
      variantId: l.details.variant.id,
      productName: l.details.product.name,
      glazeName: l.details.glaze.name,
      size: l.details.variant.size,
      sku: l.details.variant.sku,
      quantity: l.quantity,
      unitPrice: l.unitPrice,
      stockStatus: l.details.variant.stockStatus,
      ...(l.item.gift?.wrapSelected ? { gift: l.item.gift } : {}),
    })),
    totals: {
      subtotal: summary.subtotal,
      shipping,
      giftWrap: summary.giftWrap,
      total: summary.subtotal + summary.giftWrap + shipping,
    },
    currency: "PHP",
    status: "draft",
    checkout,
    createdAt: new Date().toISOString(),
  };
}
