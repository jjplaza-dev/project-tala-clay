import { cn } from "@/lib/utils";

export interface SpecItem {
  label: string;
  value: string;
}

/** Mono is used only here: measurements, SKU and lead time. */
export function SpecList({ items, className }: { items: SpecItem[]; className?: string }) {
  return (
    <dl className={cn("text-spec divide-y divide-line border-y border-line", className)}>
      {items.map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-6 py-2.5">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
