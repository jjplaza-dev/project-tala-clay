"use client";

import Link from "next/link";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { formatMoney } from "@/lib/format";
import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";
import { EmptyCart } from "./CartPreviews";
import { OrderSummary } from "./OrderSummary";

export function CartView() {
  const { hydrated, summary } = useCart();
  const count = summary.itemCount;

  return (
    <SectionBand labelledBy="cart-title" className="lg:py-20">
      <SectionHeading
        id="cart-title"
        level={1}
        title="Your cart"
        intro={hydrated && count > 0 ? `${count} ${count === 1 ? "piece" : "pieces"} in your cart.` : undefined}
      />
      {!hydrated ? (
        <p aria-busy="true" role="status" className="mt-10 text-muted-foreground">
          Loading your cart...
        </p>
      ) : summary.lines.length === 0 ? (
        <div className="mt-10">
          <EmptyCart />
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ul className="border-t border-line lg:col-span-8">
            {summary.lines.map((line) => (
              <CartLineItem key={line.details.variant.id} line={line} />
            ))}
          </ul>
          <div className="lg:col-span-4">
            <OrderSummary
              id="cart-summary"
              lines={[
                { label: "Subtotal", value: formatMoney(summary.subtotal) },
                { label: "Gift wrap", value: formatMoney(summary.giftWrap) },
                { label: "Shipping", value: "Calculated at checkout" },
                { label: "Total before shipping", value: formatMoney(summary.total), strong: true },
              ]}
            >
              <p className="mt-4 text-sm text-muted-foreground">
                Delivery depends on where you live. See the{" "}
                <Link href="/shipping" className="underline underline-offset-4">
                  shipping details
                </Link>
                . Prices, stock and wrap price are samples.
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
      )}
    </SectionBand>
  );
}
