import type { Product, ProductVariant } from "@/domain";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import { getGlazeById, getVariantPrice, getVariantsForProduct, isLowStock } from "@/lib/selectors";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { BackInStockDialog } from "./BackInStockDialog";
import { GiftPanel } from "./GiftPanel";
import { GlazeSwatches, QuantityStepper, SizeSelect } from "./OptionControls";

export function BuyPanel({ product, variant }: { product: Product; variant: ProductVariant }) {
  const variants = getVariantsForProduct(product.id);
  const glazeIds = [...new Set(variants.map((v) => v.glazeId))];
  const sizes = [...new Set(variants.map((v) => v.size))];
  const glaze = getGlazeById(variant.glazeId);
  const soldOut = variant.stockStatus === "sold_out";

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-4xl leading-[1.1] font-semibold md:text-5xl">{product.name}</h1>
        <p className="text-price mt-3 text-2xl">{formatMoney(getVariantPrice(product, variant), product.currency)}</p>
        <AvailabilityBadge
          status={variant.stockStatus}
          leadTimeDays={variant.leadTimeDays}
          lowStock={isLowStock(variant)}
          className="mt-3"
        />
        <p className="mt-4 leading-relaxed">{product.summary}</p>
      </div>
      <GlazeSwatches glazeIds={glazeIds} selectedId={variant.glazeId} />
      <SizeSelect sizes={sizes} selected={variant.size} />
      <QuantityStepper />
      <div>
        {soldOut ? (
          <BackInStockDialog productName={product.name} variantLabel={`${glaze?.name}, ${variant.size}`} idPrefix="buy" />
        ) : (
          <Button type="button" disabled className="h-11 w-full px-6 text-base sm:w-auto">
            Add to cart (preview)
          </Button>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Preview: choosing options and the cart turn on in Phases 3 and 4. Prices and stock are samples.
        </p>
      </div>
      <GiftPanel idPrefix="pdp-gift" />
    </div>
  );
}
