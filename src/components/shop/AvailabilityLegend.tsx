import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";

export function AvailabilityLegend() {
  return (
    <section aria-label="What the availability labels mean" className="rounded border border-line bg-oat-deep p-4">
      <ul className="grid gap-3 text-sm sm:grid-cols-3">
        <li className="grid gap-1.5">
          <AvailabilityBadge status="ready_to_ship" className="w-fit" />
          <span>Finished and in the studio. Ships soon.</span>
        </li>
        <li className="grid gap-1.5">
          <AvailabilityBadge status="made_to_order" className="w-fit" />
          <span>Made after you order. Lead time is shown.</span>
        </li>
        <li className="grid gap-1.5">
          <AvailabilityBadge status="sold_out" className="w-fit" />
          <span>Not available now. Ask to be told when it returns.</span>
        </li>
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">Stock levels and lead times are sample values.</p>
    </section>
  );
}
