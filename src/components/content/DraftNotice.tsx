import type { ReactNode } from "react";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Marks copy or values that are drafts or samples for the studio to confirm. */
export function DraftNotice({ children, label = "Draft", className }: { children: ReactNode; label?: string; className?: string }) {
  return (
    <aside role="note" className={cn("flex gap-3 rounded border border-line bg-oat-deep p-4 text-sm leading-relaxed", className)}>
      <InfoIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
      <p>
        <strong className="font-semibold">{label}: </strong>
        {children}
      </p>
    </aside>
  );
}
