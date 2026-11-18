import type { CartItem, Order } from "@/domain";
import { sanitizeItems } from "./reducer";

export const CART_KEY = "tala-clay:cart:v1";
export const ORDER_KEY = "tala-clay:last-order:v1";

/** The only code that knows where the cart is kept. Browser storage only: there is no orders database. */
export interface CartStorage {
  load(): CartItem[];
  save(items: CartItem[]): void;
}

export const localCartStorage: CartStorage = {
  load() {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      return raw ? sanitizeItems(JSON.parse(raw)) : [];
    } catch {
      return [];
    }
  },
  save(items) {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // Storage may be blocked. The cart still works for this visit.
    }
  },
};

export interface OrderStorage {
  loadLast(): Order | null;
  /** Returns false when the browser would not save it. */
  saveLast(order: Order): boolean;
}

export const localOrderStorage: OrderStorage = {
  loadLast() {
    try {
      const raw = window.localStorage.getItem(ORDER_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<Order>;
      const valid =
        typeof parsed.number === "string" &&
        Array.isArray(parsed.items) &&
        parsed.totals &&
        parsed.checkout?.address &&
        parsed.checkout?.contact;
      return valid ? (parsed as Order) : null;
    } catch {
      return null;
    }
  },
  saveLast(order) {
    try {
      window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      return true;
    } catch {
      return false;
    }
  },
};
