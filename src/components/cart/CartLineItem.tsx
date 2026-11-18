import Link from "next/link";
import type { CartItem } from "@/domain";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { QuantityStepper } from "@/components/product/OptionControls";
import { Button } from "@/components/ui/button";
import { formatLeadTime, formatMoney } from "@/lib/format";
import { getVariantDetails, isLowStock } from "@/lib/selectors";

/** Static in Phase 2: quantity and remove are shown but disabled. */
export function CartLineItem({ item }: { item: CartItem }) {
  const details = getVariantDetails(item.variantId);
  if (!details) return null;
  const { variant, product, glaze, unitPrice } = details;
  const label = `${product.name} in ${glaze.name}, ${variant.size}`;

  return (
    <li className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-6 sm:grid-cols-[8rem_1fr_auto] sm:gap-6">
      <ImageFrame ratio="square">
        <ProductArt productId={product.id} glazeId={glaze.id} label={`Illustration of the ${label}`} className="h-full w-full" />
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
          <p className="text-sm">This piece is made after you order, so it ships in {formatLeadTime(variant.leadTimeDays)} (sample).</p>
        ) : null}
        {item.gift?.wrapSelected ? (
          <p className="text-sm">
            <span className="font-medium">Gift wrap and message card:</span> “{item.gift.cardMessage}”
          </p>
        ) : null}
      </div>
      <div className="col-span-2 grid gap-3 sm:col-span-1 sm:justify-items-end">
        <p className="text-price text-lg">{formatMoney(unitPrice * item.quantity, product.currency)}</p>
        <p className="text-spec text-muted-foreground">{formatMoney(unitPrice)} each</p>
        <QuantityStepper value={item.quantity} idPrefix={`qty-${variant.id}`} />
        <Button type="button" variant="ghost" disabled className="h-11 px-3">
          Remove (preview)
        </Button>
      </div>
    </li>
  );
}
