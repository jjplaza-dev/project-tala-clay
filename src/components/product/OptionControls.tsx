"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max: number;
  /** Unique per instance, used for the group label. */
  idPrefix: string;
  /** Names the piece for screen readers, e.g. "Morning Mug". */
  label?: string;
}

export function QuantityStepper({ value, onChange, min = 1, max, idPrefix, label }: QuantityStepperProps) {
  const name = label ? ` of ${label}` : "";
  return (
    <div role="group" aria-labelledby={`${idPrefix}-label`}>
      <p id={`${idPrefix}-label`} className="text-label mb-3">
        Quantity
      </p>
      <div className="inline-flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease quantity${name}`}
          className="size-11 border-field"
        >
          <MinusIcon aria-hidden strokeWidth={1.5} />
        </Button>
        <output aria-live="polite" className="text-price w-10 text-center text-lg">
          {value}
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase quantity${name}`}
          className="size-11 border-field"
        >
          <PlusIcon aria-hidden strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
}
