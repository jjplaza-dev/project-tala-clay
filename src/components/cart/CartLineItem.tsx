"use client";

import Link from "next/link";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { GiftPanel } from "@/components/product/GiftPanel";
import { QuantityStepper } from "@/components/product/OptionControls";
import { Button } from "@/components/ui/button";
import { defaultGiftOptions } from "@/data/gift";
import { formatLeadTime, formatMoney } from "@/lib/format";
import type { PricedLine } from "@/lib/cart/pricing";
import { isLowStock } from "@/lib/selectors";
import { useCart } from "./CartProvider";

export function CartLineItem({ line }: { line: PricedLine }) {
  const { setQuantity, remove, setGift } = useCart();
  const { variant, product, glaze, unitPrice } = line.details;
  const name = `${product.name}, ${glaze.name}, ${variant.size}`;
  const atMax = line.quantity >= line.max;

  return (
    <li className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[8rem_1fr_auto] sm:gap-6">
      <ImageFrame ratio="square">
        <ProductArt productId={product.id} glazeId={glaze.id} label={`Illustration of the ${product.name} in ${glaze.name}`} className="h-full w-full" />
      </ImageFrame>
      <div className="grid content-start gap-2">
        <h3 className="text-lg font-medium">
          <Link href={`/products/${product.slug}`} className="underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm">
          {glaze.name} · {variant.size}
        </p>
        <AvailabilityBadge status={variant.stockStatus} leadTimeDays={variant.leadTimeDays} lowStock={isLowStock(variant)} className="w-fit" />
        {variant.stockStatus === "made_to_order" && variant.leadTimeDays ? (
          <p className="text-sm">Made after you order, so this piece ships in {formatLeadTime(variant.leadTimeDays)} (sample).</p>
        ) : null}
        {atMax ? (
          <p role="status" className="text-sm">
            {variant.stockStatus === "ready_to_ship"
              ? `That is all we have in stock (${line.max}, sample).`
              : `${line.max} is the most we can make per order (sample limit).`}
          </p>
        ) : null}
        <details className="mt-2 text-sm">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">
            {line.item.gift?.wrapSelected ? "Gift wrap and card: edit" : "Add gift wrap and a card"}
          </summary>
          <div className="mt-2">
            <GiftPanel
              compact
              idPrefix={`gift-${variant.id}`}
              value={line.item.gift ?? defaultGiftOptions}
              onChange={(g) => setGift(variant.id, g)}
            />
          </div>
        </details>
      </div>
      <div className="col-span-2 grid gap-3 sm:col-span-1 sm:justify-items-end">
        <p className="text-price text-lg">{formatMoney(line.lineTotal, product.currency)}</p>
        <p className="text-spec text-muted-foreground">{formatMoney(unitPrice)} each</p>
        {line.giftWrap > 0 ? <p className="text-spec">+ {formatMoney(line.giftWrap)} gift wrap</p> : null}
        <QuantityStepper
          idPrefix={`qty-${variant.id}`}
          label={name}
          value={line.quantity}
          max={line.max}
          onChange={(q) => setQuantity(variant.id, q)}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => remove(variant.id)}
          aria-label={`Remove ${name} from your cart`}
          className="h-11 px-3 underline underline-offset-4"
        >
          Remove
        </Button>
      </div>
    </li>
  );
}
