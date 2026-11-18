import type { CartItem } from "@/domain";
import { formatMoney } from "@/lib/format";
import { getVariantDetails } from "@/lib/selectors";
import { cn } from "@/lib/utils";

export interface SummaryLine {
  label: string;
  value: string;
  strong?: boolean;
}

export function OrderSummary({ id, lines, children, className }: { id: string; lines: SummaryLine[]; children?: React.ReactNode; className?: string }) {
  return (
    <section aria-labelledby={id} className={cn("rounded border border-line bg-oat-deep p-6", className)}>
      <h2 id={id} className="text-xl font-semibold">
        Order summary
      </h2>
      <dl className="mt-4 grid gap-3 text-sm">
        {lines.map((line) => (
          <div key={line.label} className={cn("flex justify-between gap-4", line.strong && "border-t border-line pt-3 text-base font-semibold")}>
            <dt>{line.label}</dt>
            <dd className="text-price">{line.value}</dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  );
}

/** Compact one-line-per-item list used inside summaries and the mini-cart preview. */
export function SummaryItems({ items }: { items: CartItem[] }) {
  return (
    <ul className="grid gap-3 text-sm">
      {items.map((item) => {
        const d = getVariantDetails(item.variantId);
        if (!d) return null;
        return (
          <li key={item.variantId} className="flex justify-between gap-4 border-b border-line pb-3">
            <span>
              {d.product.name}
              <span className="block text-muted-foreground">
                {d.glaze.name} · {d.variant.size} · Qty {item.quantity}
              </span>
            </span>
            <span className="text-price">{formatMoney(d.unitPrice * item.quantity, d.product.currency)}</span>
          </li>
        );
      })}
    </ul>
  );
}
