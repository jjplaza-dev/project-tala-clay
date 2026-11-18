import { CheckIcon, MinusIcon, PlusIcon } from "lucide-react";
import { GlazeTile } from "@/components/art/GlazeTile";
import { Button } from "@/components/ui/button";
import { getGlazeById } from "@/lib/selectors";
import { cn } from "@/lib/utils";

// Static in Phase 2: these show selected states but are not controls yet.

export function GlazeSwatches({ glazeIds, selectedId }: { glazeIds: string[]; selectedId: string }) {
  const selected = getGlazeById(selectedId);
  return (
    <div role="group" aria-labelledby="glaze-label">
      <p id="glaze-label" className="text-label mb-3">
        Glaze: <span className="font-normal normal-case tracking-normal">{selected?.name}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {glazeIds.map((id) => {
          const g = getGlazeById(id);
          return g ? <GlazeTile key={id} name={g.name} hex={g.hex} textureKind={g.textureKind} selected={id === selectedId} /> : null;
        })}
      </div>
    </div>
  );
}

export function SizeSelect({ sizes, selected }: { sizes: string[]; selected: string }) {
  return (
    <div role="group" aria-labelledby="size-label">
      <p id="size-label" className="text-label mb-3">
        Size
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <span
            key={size}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded border px-4 text-sm",
              size === selected ? "border-charcoal bg-charcoal text-oat" : "border-field bg-background",
            )}
          >
            {size === selected ? <CheckIcon aria-hidden strokeWidth={2} className="size-3.5" /> : null}
            {size}
          </span>
        ))}
      </div>
    </div>
  );
}

export function QuantityStepper({ value = 1, idPrefix = "qty" }: { value?: number; idPrefix?: string }) {
  return (
    <div role="group" aria-labelledby={`${idPrefix}-label`}>
      <p id={`${idPrefix}-label`} className="text-label mb-3">
        Quantity
      </p>
      <div className="inline-flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" disabled aria-label="Decrease quantity" className="size-11 border-field">
          <MinusIcon aria-hidden strokeWidth={1.5} />
        </Button>
        <span className="text-price w-10 text-center text-lg">{value}</span>
        <Button type="button" variant="outline" size="icon" disabled aria-label="Increase quantity" className="size-11 border-field">
          <PlusIcon aria-hidden strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
