import { BanIcon, CheckIcon, ClockIcon } from "lucide-react";
import type { StockStatus } from "@/domain";
import { Badge } from "@/components/ui/badge";
import { formatLeadTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  status: StockStatus;
  /** Shown for made-to-order pieces (sample value). */
  leadTimeDays?: number;
  /** Derived low-stock note (sample threshold). */
  lowStock?: boolean;
  className?: string;
}

// Meaning is carried by icon, text and shape. The colour marker is never the only signal,
// and olive/ochre sit only on a charcoal-outlined marker, never behind text on oat.
const CONFIG = {
  ready_to_ship: { label: "Ready to ship", Icon: CheckIcon, marker: "bg-olive" },
  made_to_order: { label: "Made to order", Icon: ClockIcon, marker: "bg-ochre" },
  sold_out: { label: "Sold out", Icon: BanIcon, marker: "bg-transparent" },
} as const;

export function AvailabilityBadge({ status, leadTimeDays, lowStock, className }: AvailabilityBadgeProps) {
  const { label, Icon, marker } = CONFIG[status];
  return (
    <Badge
      variant="outline"
      data-status={status}
      className={cn(
        "h-auto min-h-6 gap-2 border-line bg-background/70 px-2 py-1 text-label text-foreground",
        className,
      )}
    >
      <span aria-hidden className={cn("size-2.5 shrink-0 rounded-[2px] border border-charcoal", marker)} />
      <Icon aria-hidden strokeWidth={1.5} className="size-3.5" />
      <span>{label}</span>
      {status === "made_to_order" && leadTimeDays ? (
        <span className="font-mono text-xs font-normal tracking-normal normal-case">
          · {formatLeadTime(leadTimeDays)}
        </span>
      ) : null}
      {status === "ready_to_ship" && lowStock ? (
        <span className="text-xs font-normal tracking-normal normal-case">· Low stock (sample)</span>
      ) : null}
    </Badge>
  );
}
