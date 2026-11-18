import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { GlazeTile } from "@/components/art/GlazeTile";
import { getCategories, getGlazes, getSizes } from "@/lib/selectors";
import { cn } from "@/lib/utils";

// Static in Phase 2: chips are not controls. Selection plus a check mark shows each state.
function Chip({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <span
      data-selected={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 rounded border px-3 text-sm",
        selected ? "border-charcoal bg-charcoal text-oat" : "border-field bg-background",
      )}
    >
      {selected ? <CheckIcon aria-hidden strokeWidth={2} className="size-3.5" /> : null}
      {label}
    </span>
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

export function FilterPanel({ activeCategory, idPrefix = "filters" }: { activeCategory?: string; idPrefix?: string }) {
  return (
    <div className="grid gap-5">
      <Group id={`${idPrefix}-category`} title="Category">
        <Chip label="All pieces" selected={!activeCategory} />
        {getCategories().map((c) => (
          <Chip key={c.id} label={c.name} selected={c.slug === activeCategory} />
        ))}
      </Group>
      <Group id={`${idPrefix}-glaze`} title="Glaze">
        {getGlazes().map((g) => (
          <GlazeTile key={g.id} name={g.name} hex={g.hex} textureKind={g.textureKind} selected={g.id === "glaze-bone-speckle"} />
        ))}
      </Group>
      <Group id={`${idPrefix}-size`} title="Size">
        {getSizes().map((s) => (
          <Chip key={s} label={s} />
        ))}
      </Group>
      <Group id={`${idPrefix}-availability`} title="Availability">
        <Chip label="Ready to ship" selected />
        <Chip label="Made to order" />
        <Chip label="Sold out" />
      </Group>
      <div className="border-t border-line pt-4">
        <p className="text-label mb-3">Sort by</p>
        <div className="flex min-h-11 items-center justify-between rounded border border-field bg-background px-3 text-sm">
          Featured
          <ChevronDownIcon aria-hidden strokeWidth={1.5} className="size-4 text-muted-foreground" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Preview: selected states are shown for layout. Filtering and sorting turn on in the next phase, and the grid shows
        every piece until then.
      </p>
    </div>
  );
}
