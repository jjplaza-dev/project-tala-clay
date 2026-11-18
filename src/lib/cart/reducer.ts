import type { CartItem, GiftOptions } from "@/domain";
import { defaultGiftOptions } from "@/data/gift";
import { getVariantById } from "@/lib/selectors";
import { clampQuantity } from "./pricing";

export type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; variantId: string; quantity: number; gift?: GiftOptions }
  | { type: "setQuantity"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "setGift"; variantId: string; gift: GiftOptions | undefined }
  | { type: "clear" };

/** Keeps the message within its limit and recomputes the derived gift flags. */
export function normalizeGift(gift: GiftOptions | undefined): GiftOptions | undefined {
  if (!gift || !gift.wrapSelected) return undefined;
  return {
    ...defaultGiftOptions,
    isGift: true,
    wrapSelected: true,
    cardMessage: gift.cardMessage.slice(0, defaultGiftOptions.maxLength),
  };
}

/** One line per option. Adding it again increases the quantity, up to the limit. */
export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "clear":
      return [];
    case "add": {
      const variant = getVariantById(action.variantId);
      if (!variant) return items;
      const existing = items.find((i) => i.variantId === action.variantId);
      const quantity = clampQuantity(variant, (existing?.quantity ?? 0) + action.quantity);
      if (quantity < 1) return items;
      const gift = normalizeGift(action.gift) ?? existing?.gift;
      const next: CartItem = { variantId: action.variantId, quantity, ...(gift ? { gift } : {}) };
      return existing ? items.map((i) => (i.variantId === action.variantId ? next : i)) : [...items, next];
    }
    case "setQuantity": {
      const variant = getVariantById(action.variantId);
      if (!variant) return items;
      const quantity = clampQuantity(variant, action.quantity);
      if (quantity < 1) return items.filter((i) => i.variantId !== action.variantId);
      return items.map((i) => (i.variantId === action.variantId ? { ...i, quantity } : i));
    }
    case "remove":
      return items.filter((i) => i.variantId !== action.variantId);
    case "setGift":
      return items.map((i) => {
        if (i.variantId !== action.variantId) return i;
        const gift = normalizeGift(action.gift);
        return gift ? { variantId: i.variantId, quantity: i.quantity, gift } : { variantId: i.variantId, quantity: i.quantity };
      });
  }
}

/** Rebuilds a cart from untrusted stored data: unknown or sold-out options are dropped, quantities clamped. */
export function sanitizeItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  let items: CartItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { variantId, quantity, gift } = entry as Record<string, unknown>;
    if (typeof variantId !== "string" || typeof quantity !== "number") continue;
    const g = gift && typeof gift === "object" ? (gift as Partial<GiftOptions>) : undefined;
    items = cartReducer(items, {
      type: "add",
      variantId,
      quantity,
      gift: g?.wrapSelected ? { ...defaultGiftOptions, wrapSelected: true, isGift: true, cardMessage: typeof g.cardMessage === "string" ? g.cardMessage : "" } : undefined,
    });
  }
  return items;
}
