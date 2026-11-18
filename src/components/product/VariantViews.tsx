"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon, ShoppingBagIcon } from "lucide-react";
import type { GiftOptions } from "@/domain";
import { GlazeTile } from "@/components/art/GlazeTile";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { defaultGiftOptions } from "@/data/gift";
import { maxQuantityFor } from "@/lib/cart/pricing";
import { formatLeadTime, formatMoney } from "@/lib/format";
import { getGlazeById, getVariantPrice, isLowStock } from "@/lib/selectors";
import { cn } from "@/lib/utils";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { BackInStockDialog } from "./BackInStockDialog";
import { GiftPanel } from "./GiftPanel";
import { QuantityStepper } from "./OptionControls";
import { ProductGallery } from "./ProductGallery";
import { useProductVariant } from "./ProductVariantContext";
import { SpecList, type SpecItem } from "./SpecList";

export function VariantGallery() {
  const { product, variant } = useProductVariant();
  return <ProductGallery product={product} glazeId={variant.glazeId} />;
}

export function VariantBuyPanel() {
  const { product, variant, glazeIds, sizes, selectGlaze, selectSize } = useProductVariant();
  const { add, setMiniCartOpen } = useCart();
  const glaze = getGlazeById(variant.glazeId);
  const soldOut = variant.stockStatus === "sold_out";
  const max = maxQuantityFor(variant);

  const [wanted, setWanted] = useState(1);
  const [gift, setGift] = useState<GiftOptions>(defaultGiftOptions);
  const [added, setAdded] = useState(false);
  const [message, setMessage] = useState("");
  const quantity = Math.min(Math.max(wanted, 1), Math.max(max, 1));

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 2500);
    return () => window.clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    const result = add(variant.id, quantity, gift.wrapSelected ? gift : undefined);
    if (!result.ok) {
      setAdded(false);
      setMessage(`You already have the most we can offer of this piece in your cart (${max}, sample).`);
      return;
    }
    setAdded(true);
    setMessage(
      result.limited
        ? `Added ${result.added}. That is the most we can offer of this piece (${max}, sample).`
        : `Added ${result.added} to your cart.`,
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-4xl leading-[1.1] font-semibold md:text-5xl">{product.name}</h1>
        <p className="text-price mt-3 text-2xl">{formatMoney(getVariantPrice(product, variant), product.currency)}</p>
        <AvailabilityBadge status={variant.stockStatus} leadTimeDays={variant.leadTimeDays} lowStock={isLowStock(variant)} className="mt-3" />
        {variant.stockStatus === "made_to_order" && variant.leadTimeDays ? (
          <p className="mt-2 text-sm">Made after you order: ships in {formatLeadTime(variant.leadTimeDays)} (sample).</p>
        ) : null}
        <p className="mt-4 leading-relaxed">{product.summary}</p>
      </div>

      <div role="group" aria-labelledby="glaze-label">
        <p id="glaze-label" className="text-label mb-3">
          Glaze: <span className="font-normal tracking-normal normal-case">{glaze?.name}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {glazeIds.map((id) => {
            const g = getGlazeById(id);
            if (!g) return null;
            return (
              <button key={id} type="button" aria-pressed={id === variant.glazeId} onClick={() => selectGlaze(id)} className="rounded p-1 hover:bg-muted">
                <GlazeTile name={g.name} hex={g.hex} textureKind={g.textureKind} selected={id === variant.glazeId} />
              </button>
            );
          })}
        </div>
      </div>

      <div role="group" aria-labelledby="size-label">
        <p id="size-label" className="text-label mb-3">
          Size
        </p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={size === variant.size}
              onClick={() => selectSize(size)}
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 rounded border px-4 text-sm transition-colors",
                size === variant.size ? "border-charcoal bg-charcoal text-oat" : "border-field bg-background hover:bg-muted",
              )}
            >
              {size === variant.size ? <CheckIcon aria-hidden strokeWidth={2} className="size-3.5" /> : null}
              {size}
            </button>
          ))}
        </div>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        Selected: {glaze?.name}, {variant.size}
      </p>

      {soldOut ? (
        <div className="grid gap-3">
          <Button type="button" disabled className="h-11 w-full px-6 text-base sm:w-auto">
            Sold out
          </Button>
          <BackInStockDialog variantId={variant.id} productName={product.name} variantLabel={`${glaze?.name}, ${variant.size}`} idPrefix="buy" />
        </div>
      ) : (
        <>
          <QuantityStepper idPrefix="pdp-qty" label={product.name} value={quantity} max={max} onChange={setWanted} />
          {quantity >= max ? (
            <p className="-mt-3 text-sm text-muted-foreground">
              {variant.stockStatus === "ready_to_ship" ? `That is all we have in stock (${max}, sample).` : `${max} is the most we can make per order (sample).`}
            </p>
          ) : null}
          <GiftPanel idPrefix="pdp-gift" value={gift} onChange={setGift} />
          <div className="grid gap-3">
            <Button type="button" onClick={handleAdd} className="h-11 w-full px-6 text-base sm:w-auto">
              {added ? <CheckIcon aria-hidden strokeWidth={2} className="size-4" /> : <ShoppingBagIcon aria-hidden strokeWidth={1.5} className="size-4" />}
              {added ? "Added to cart" : "Add to cart"}
            </Button>
            <p role="status" aria-live="polite" className="min-h-5 text-sm">
              {message}{" "}
              {message ? (
                <button type="button" onClick={() => setMiniCartOpen(true)} className="underline underline-offset-4">
                  View cart
                </button>
              ) : null}
            </p>
            <p className="text-sm text-muted-foreground">
              Prices and stock are samples. No payment is taken until checkout is connected.{" "}
              <Link href="/shipping" className="underline underline-offset-4">
                Shipping details
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export function VariantSpecs() {
  const { variant } = useProductVariant();
  const d = variant.dimensions;
  const items: SpecItem[] = [
    { label: "Size", value: variant.size },
    { label: "Height", value: `${d.heightMm} mm` },
    { label: "Width", value: `${d.widthMm} mm` },
  ];
  if (d.depthMm) items.push({ label: "Depth", value: `${d.depthMm} mm` });
  if (d.capacityMl) items.push({ label: "Capacity", value: `${d.capacityMl} ml` });
  if (d.weightG) items.push({ label: "Weight", value: `${d.weightG} g` });
  items.push({ label: "SKU", value: variant.sku });
  items.push({
    label: "Availability",
    value:
      variant.stockStatus === "made_to_order" && variant.leadTimeDays
        ? `Made to order, ${formatLeadTime(variant.leadTimeDays)}`
        : variant.stockStatus === "ready_to_ship"
          ? `Ready to ship${isLowStock(variant) ? ", low stock" : ""}`
          : "Sold out",
  });
  return <SpecList items={items} />;
}
