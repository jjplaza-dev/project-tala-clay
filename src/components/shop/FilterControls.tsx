"use client";

import { CheckIcon } from "lucide-react";
import type { FilterState, StockStatus } from "@/domain";
import { GlazeTile } from "@/components/art/GlazeTile";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS, countActiveFilters, emptyFilters } from "@/lib/filters";
import { getCategories, getGlazes, getSizes } from "@/lib/selectors";
import { cn } from "@/lib/utils";

const AVAILABILITY: { value: StockStatus; label: string }[] = [
  { value: "ready_to_ship", label: "Ready to ship" },
  { value: "made_to_order", label: "Made to order" },
  { value: "sold_out", label: "Sold out" },
];

const toggle = <T,>(list: T[], item: T): T[] => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

function Chip({ label, pressed, onClick }: { label: string; pressed: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded border px-3 text-sm transition-colors",
        pressed ? "border-charcoal bg-charcoal text-oat" : "border-field bg-background hover:bg-muted",
      )}
    >
      {pressed ? <CheckIcon aria-hidden strokeWidth={2} className="size-3.5" /> : null}
      {label}
    </button>
  );
}

function Group({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-labelledby={id} className="border-t border-line pt-4">
      <p id={id} className="text-label mb-3">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

interface FilterControlsProps {
  state: FilterState;
  onChange: (next: FilterState) => void;
  fixedCategory?: string;
  idPrefix: string;
}

export function FilterControls({ state, onChange, fixedCategory, idPrefix }: FilterControlsProps) {
  const active = countActiveFilters(state, fixedCategory);
  return (
    <div className="grid gap-5">
      {fixedCategory ? null : (
        <Group id={`${idPrefix}-category`} title="Category">
          <Chip label="All pieces" pressed={!state.category} onClick={() => onChange({ ...state, category: undefined })} />
          {getCategories().map((c) => (
            <Chip key={c.id} label={c.name} pressed={state.category === c.slug} onClick={() => onChange({ ...state, category: c.slug })} />
          ))}
        </Group>
      )}
      <Group id={`${idPrefix}-glaze`} title="Glaze">
        {getGlazes().map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={state.glazes.includes(g.id)}
            onClick={() => onChange({ ...state, glazes: toggle(state.glazes, g.id) })}
            className="rounded p-1 hover:bg-muted"
          >
            <GlazeTile name={g.name} hex={g.hex} textureKind={g.textureKind} selected={state.glazes.includes(g.id)} />
          </button>
        ))}
      </Group>
      <Group id={`${idPrefix}-size`} title="Size">
        {getSizes().map((s) => (
          <Chip key={s} label={s} pressed={state.sizes.includes(s)} onClick={() => onChange({ ...state, sizes: toggle(state.sizes, s) })} />
        ))}
      </Group>
      <Group id={`${idPrefix}-availability`} title="Availability">
        {AVAILABILITY.map((a) => (
          <Chip
            key={a.value}
            label={a.label}
            pressed={state.availability.includes(a.value)}
            onClick={() => onChange({ ...state, availability: toggle(state.availability, a.value) })}
          />
        ))}
      </Group>
      <div className="border-t border-line pt-4">
        <label htmlFor={`${idPrefix}-sort`} className="text-label mb-3 block">
          Sort by
        </label>
        <select
          id={`${idPrefix}-sort`}
          value={state.sort}
          onChange={(e) => onChange({ ...state, sort: e.target.value as FilterState["sort"] })}
          className="h-11 w-full rounded border border-field bg-background px-3 text-base"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={active === 0}
        onClick={() => onChange(emptyFilters(fixedCategory))}
        className="h-11 border-field px-4 text-base"
      >
        Clear all filters
      </Button>
    </div>
  );
}
