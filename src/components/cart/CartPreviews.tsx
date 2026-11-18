import Link from "next/link";
import type { Cart } from "@/domain";
import { CeramicArt } from "@/components/art/CeramicArt";
import { cta } from "@/components/layout/cta";
import { formatMoney } from "@/lib/format";
import { SummaryItems } from "./OrderSummary";

export function EmptyCart() {
  return (
    <div className="grid justify-items-start gap-4">
      <CeramicArt artKind="bowl" glazeHex="#E6DDCB" textureKind="speckle" label="Illustration of an empty bowl" className="size-24" />
      <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      <p className="max-w-[48ch] leading-relaxed">When you add a piece, it will wait here. Ready-to-ship pieces go out soon and made-to-order pieces are made after you order.</p>
      <Link href="/shop" className={cta("primary")}>
        Browse all pieces
      </Link>
    </div>
  );
}

/** Static picture of the mini-cart drawer. Not a dialog and not interactive. */
export function MiniCartDrawerPreview({ cart }: { cart: Cart }) {
  const count = cart.items.reduce((n, i) => n + i.quantity, 0);
  return (
    <aside aria-label="Preview of the mini-cart drawer" className="max-w-sm rounded border border-line bg-popover p-5 shadow-lg">
      <p className="text-label mb-3 text-muted-foreground">Mini-cart (preview)</p>
      <h3 className="text-lg font-semibold">Your cart ({count})</h3>
      <div className="mt-4">
        <SummaryItems items={cart.items} />
      </div>
      <p className="mt-4 flex justify-between text-sm font-semibold">
        <span>Subtotal</span>
        <span className="text-price">{formatMoney(cart.subtotal)}</span>
      </p>
      <div className="mt-4 grid gap-2">
        <Link href="/cart" className={cta("outline", "w-full")}>
          View cart
        </Link>
        <Link href="/checkout" className={cta("primary", "w-full")}>
          Checkout
        </Link>
      </div>
    </aside>
  );
}
