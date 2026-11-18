import type { Stockist } from "@/domain";

export interface ProcessStep {
  title: string;
  body?: string;
}

export function ProcessSteps({ items }: { items: ProcessStep[] }) {
  return (
    <ol className="grid gap-6">
      {items.map((step, i) => (
        <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line pt-4">
          <span className="text-spec text-muted-foreground">0{i + 1}</span>
          <div>
            <h3 className="text-xl font-medium">{step.title}</h3>
            {step.body ? <p className="mt-1 leading-relaxed">{step.body}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Fictional placeholder stockists, labelled as samples. */
export function StockistList({ stockists }: { stockists: Stockist[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {stockists.map((s) => (
        <li key={s.id} className="rounded border border-line bg-background p-4">
          <p className="font-medium">{s.name}</p>
          <p className="text-sm">{s.city}</p>
          <p className="text-label mt-3 text-muted-foreground">Sample listing</p>
        </li>
      ))}
    </ul>
  );
}
