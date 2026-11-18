import type { BackInStockSubscription } from "@/domain";
import { isValidEmail } from "./validators";

export type AddResult =
  | { ok: true; subscription: BackInStockSubscription; alreadySaved: boolean }
  | { ok: false; reason: "invalid_email" | "storage_unavailable" };

/** The only place that knows where requests are kept, so a real provider could replace it later. */
export interface BackInStockStore {
  add(variantId: string, email: string): AddResult;
  list(): BackInStockSubscription[];
}

export const BACK_IN_STOCK_KEY = "tala-clay:back-in-stock:v1";

function read(): BackInStockSubscription[] {
  const raw = window.localStorage.getItem(BACK_IN_STOCK_KEY);
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as BackInStockSubscription[]) : [];
}

/** Saves requests in this browser only. Nothing is sent: email delivery is NOT CONFIGURED. */
export const localBackInStockStore: BackInStockStore = {
  list() {
    try {
      return read();
    } catch {
      return [];
    }
  },
  add(variantId, email) {
    if (!isValidEmail(email)) return { ok: false, reason: "invalid_email" };
    const clean = email.trim().toLowerCase();
    try {
      const all = read();
      const existing = all.find((s) => s.variantId === variantId && s.email === clean && s.status === "recorded_locally");
      if (existing) return { ok: true, subscription: existing, alreadySaved: true };
      const subscription: BackInStockSubscription = {
        id: `sub-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        variantId,
        email: clean,
        createdAt: new Date().toISOString(),
        status: "recorded_locally",
      };
      window.localStorage.setItem(BACK_IN_STOCK_KEY, JSON.stringify([...all, subscription]));
      return { ok: true, subscription, alreadySaved: false };
    } catch {
      return { ok: false, reason: "storage_unavailable" };
    }
  },
};
