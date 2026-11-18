import Link from "next/link";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { EmptyCart, MiniCartDrawerPreview } from "@/components/cart/CartPreviews";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { sampleCart } from "@/data/sampleCart";
import { formatMoney } from "@/lib/format";

export default function CartPage() {
  const itemCount = sampleCart.items.reduce((n, i) => n + i.quantity, 0);
  // Display only: one gift wrap price per wrapped line (sample).
  const giftWrap = sampleCart.items.reduce((sum, i) => sum + (i.gift?.wrapSelected ? i.gift.priceAdd : 0), 0);

  return (
    <>
      <SectionBand labelledBy="cart-title" className="lg:py-20">
        <SectionHeading id="cart-title" level={1} title="Your cart" intro={`${itemCount} pieces in this sample cart.`} />
        <DraftNotice label="Preview" className="mt-6 max-w-[62ch]">
          This cart shows sample items. Adding, changing and removing pieces turns on in Phase 4.
        </DraftNotice>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ul className="border-t border-line lg:col-span-8">
            {sampleCart.items.map((item) => (
              <CartLineItem key={item.variantId} item={item} />
            ))}
          </ul>
          <div className="lg:col-span-4">
            <OrderSummary
              id="cart-summary"
              lines={[
                { label: "Subtotal", value: formatMoney(sampleCart.subtotal) },
                { label: "Gift wrap", value: formatMoney(giftWrap) },
                { label: "Shipping", value: "Calculated at checkout" },
              ]}
            >
              <p className="mt-4 text-sm text-muted-foreground">
                Delivery depends on where you live. See the{" "}
                <Link href="/shipping" className="underline underline-offset-4">
                  shipping details
                </Link>
                .
              </p>
              <div className="mt-6 grid gap-2">
                <Link href="/checkout" className={cta("primary", "w-full")}>
                  Go to checkout
                </Link>
                <Link href="/shop" className={cta("outline", "w-full")}>
                  Continue shopping
                </Link>
              </div>
            </OrderSummary>
          </div>
        </div>
      </SectionBand>
      <InterfacePreviewBand id="cart-previews">
        <MiniCartDrawerPreview cart={sampleCart} />
        <div className="rounded border border-line bg-background p-6">
          <p className="text-label mb-4 text-muted-foreground">Empty cart (preview)</p>
          <EmptyCart />
        </div>
      </InterfacePreviewBand>
    </>
  );
}
