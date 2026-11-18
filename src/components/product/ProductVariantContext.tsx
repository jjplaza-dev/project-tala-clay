"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/domain";
import { getProductById, getVariantsForProduct } from "@/lib/selectors";

interface VariantContextValue {
  product: Product;
  variants: ProductVariant[];
  variant: ProductVariant;
  glazeIds: string[];
  sizes: string[];
  selectGlaze: (glazeId: string) => void;
  selectSize: (size: string) => void;
}

const VariantContext = createContext<VariantContextValue | null>(null);

/** Server-rendered page sections can be passed as children; only the pieces that read the variant are client code. */
export function ProductVariantProvider({ productId, children }: { productId: string; children: ReactNode }) {
  const product = getProductById(productId);
  const variants = useMemo(() => getVariantsForProduct(productId), [productId]);
  const [selectedId, setSelectedId] = useState(variants[0]?.id);

  const value = useMemo<VariantContextValue | null>(() => {
    const variant = variants.find((v) => v.id === selectedId) ?? variants[0];
    if (!product || !variant) return null;
    // Changing one option keeps the other when that combination exists, otherwise moves to the nearest one.
    const selectGlaze = (glazeId: string) => {
      const next = variants.find((v) => v.glazeId === glazeId && v.size === variant.size) ?? variants.find((v) => v.glazeId === glazeId);
      if (next) setSelectedId(next.id);
    };
    const selectSize = (size: string) => {
      const next = variants.find((v) => v.size === size && v.glazeId === variant.glazeId) ?? variants.find((v) => v.size === size);
      if (next) setSelectedId(next.id);
    };
    return {
      product,
      variants,
      variant,
      glazeIds: [...new Set(variants.map((v) => v.glazeId))],
      sizes: [...new Set(variants.map((v) => v.size))],
      selectGlaze,
      selectSize,
    };
  }, [product, variants, selectedId]);

  if (!value) return null;
  return <VariantContext.Provider value={value}>{children}</VariantContext.Provider>;
}

export function useProductVariant(): VariantContextValue {
  const value = useContext(VariantContext);
  if (!value) throw new Error("useProductVariant must be used inside ProductVariantProvider");
  return value;
}
