import { SearchIcon } from "lucide-react";
import { getCategories, getProducts } from "@/lib/selectors";

/** Static picture of the search overlay. Not interactive and not a dialog. */
export function SearchDialogPreview() {
  const results = getProducts().slice(0, 3);
  return (
    <figure aria-label="Preview of the search overlay" className="rounded border border-line bg-popover p-5 shadow-lg">
      <p className="text-label mb-3 text-muted-foreground">Search overlay (preview)</p>
      <div className="flex min-h-11 items-center gap-2 rounded border border-field bg-background px-3 text-sm">
        <SearchIcon aria-hidden strokeWidth={1.5} className="size-4" />
        <span className="text-muted-foreground">Search pieces...</span>
      </div>
      <p className="text-label mt-5 mb-2">Suggested</p>
      <ul className="flex flex-wrap gap-2 text-sm">
        {getCategories().map((c) => (
          <li key={c.id} className="rounded border border-field px-3 py-1.5">
            {c.name}
          </li>
        ))}
      </ul>
      <p className="text-label mt-5 mb-2">Sample results</p>
      <ul className="grid gap-1 text-sm">
        {results.map((p) => (
          <li key={p.id} className="border-t border-line py-2">
            {p.name}
          </li>
        ))}
      </ul>
    </figure>
  );
}
