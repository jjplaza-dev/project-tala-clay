"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import type { CartItem, GiftOptions } from "@/domain";
import { priceCart, type CartSummary } from "@/lib/cart/pricing";
import { cartReducer } from "@/lib/cart/reducer";
import { CART_KEY, localCartStorage, type CartStorage } from "@/lib/cart/storage";

export type AddResult = { ok: true; added: number; limited: boolean } | { ok: false };

interface CartContextValue {
  /** False until the saved cart has been read. Render neutral content until then so server and browser markup match. */
  hydrated: boolean;
  items: CartItem[];
  summary: CartSummary;
  add: (variantId: string, quantity: number, gift?: GiftOptions) => AddResult;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  setGift: (variantId: string, gift: GiftOptions | undefined) => void;
  clear: () => void;
  miniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children, storage = localCartStorage }: { children: ReactNode; storage?: CartStorage }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", items: storage.load() });
    setHydrated(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) dispatch({ type: "hydrate", items: storage.load() });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storage]);

  useEffect(() => {
    if (hydrated) storage.save(items);
  }, [items, hydrated, storage]);

  const value = useMemo<CartContextValue>(() => {
    const quantityOf = (list: CartItem[], id: string) => list.find((i) => i.variantId === id)?.quantity ?? 0;
    return {
      hydrated,
      items,
      summary: priceCart(items),
      add(variantId, quantity, gift) {
        const action = { type: "add", variantId, quantity, gift } as const;
        const before = quantityOf(items, variantId);
        const after = quantityOf(cartReducer(items, action), variantId);
        if (after <= before) return { ok: false };
        dispatch(action);
        return { ok: true, added: after - before, limited: after - before < quantity };
      },
      setQuantity: (variantId, quantity) => dispatch({ type: "setQuantity", variantId, quantity }),
      remove: (variantId) => dispatch({ type: "remove", variantId }),
      setGift: (variantId, gift) => dispatch({ type: "setGift", variantId, gift }),
      clear: () => dispatch({ type: "clear" }),
      miniCartOpen,
      setMiniCartOpen,
    };
  }, [hydrated, items, miniCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
