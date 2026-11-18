"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { cta } from "@/components/layout/cta";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { formatMoney } from "@/lib/format";
import { useCart } from "./CartProvider";

export function MiniCart() {
  const { hydrated, summary, miniCartOpen, setMiniCartOpen, remove } = useCart();
  const count = hydrated ? summary.itemCount : 0;

  return (
    <Sheet open={miniCartOpen} onOpenChange={setMiniCartOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative size-11"
            aria-label={hydrated ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"}
          />
        }
      >
        <ShoppingBagIcon aria-hidden strokeWidth={1.5} className="size-5" />
        {count > 0 ? (
          <span aria-hidden className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded bg-charcoal px-1 text-xs font-semibold text-oat">
            {count}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent side="right" className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-lg">Your cart ({count})</SheetTitle>
          <SheetDescription className="sr-only">A quick look at what is in your cart.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6">
          {!hydrated ? (
            <p aria-busy="true" className="text-sm text-muted-foreground">Loading your cart...</p>
          ) : summary.lines.length === 0 ? (
            <div className="grid gap-4 text-sm leading-relaxed">
              <p>Your cart is empty.</p>
              <SheetClose render={<Link href="/shop" />} className={cta("outline")}>
                Browse all pieces
              </SheetClose>
            </div>
          ) : (
            <ul className="grid gap-4">
              {summary.lines.map((l) => (
                <li key={l.details.variant.id} className="grid gap-1 border-b border-line pb-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <SheetClose render={<Link href={`/products/${l.details.product.slug}`} />} className="font-medium underline-offset-4 hover:underline">
                      {l.details.product.name}
                    </SheetClose>
                    <span className="text-price">{formatMoney(l.lineTotal)}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {l.details.glaze.name} · {l.details.variant.size} · Qty {l.quantity}
                  </p>
                  {l.item.gift?.wrapSelected ? <p>Gift wrap included</p> : null}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(l.details.variant.id)}
                    aria-label={`Remove ${l.details.product.name}, ${l.details.glaze.name}, ${l.details.variant.size}`}
                    className="h-11 w-fit px-2 underline underline-offset-4"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {hydrated && summary.lines.length > 0 ? (
          <div className="grid gap-3 border-t border-line p-6">
            <p className="flex justify-between text-sm font-semibold">
              <span>Subtotal</span>
              <span className="text-price">{formatMoney(summary.subtotal)}</span>
            </p>
            <p className="text-xs text-muted-foreground">Gift wrap and shipping are added at checkout. Prices are samples.</p>
            <SheetClose render={<Link href="/cart" />} className={cta("outline", "w-full")}>
              View cart
            </SheetClose>
            <SheetClose render={<Link href="/checkout" />} className={cta("primary", "w-full")}>
              Checkout
            </SheetClose>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
