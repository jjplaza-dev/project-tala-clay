import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { formatDeliveryWindow } from "@/lib/format";
import { getDeliveryEstimate, getVariantById } from "@/lib/selectors";

export function ShipVsMadeExplainer() {
  const estimate = getDeliveryEstimate("zone-ph");
  const leadDays = getVariantById("var-mug-mrn-eb-lrg")?.leadTimeDays;
  return (
    <SectionBand tone="deep" labelledBy="explainer-title">
      <SectionHeading
        id="explainer-title"
        eyebrow="Before you order"
        title="Ready to ship, or made to order"
        intro="Every piece page tells you which one you are getting, so there are no surprises on delivery."
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded border border-line bg-background p-6 md:p-8">
          <AvailabilityBadge status="ready_to_ship" />
          <h3 className="mt-5 text-2xl font-semibold">Ready to ship</h3>
          <p className="mt-3 leading-relaxed">
            Finished and in stock. We pack it and send it, usually within a few days of your order.
          </p>
          {estimate ? (
            <p className="text-spec mt-5 border-t border-line pt-4">
              Philippines delivery: {formatDeliveryWindow(estimate.minDays, estimate.maxDays)} (sample)
            </p>
          ) : null}
        </div>
        <div className="rounded border border-line bg-background p-6 md:p-8">
          <AvailabilityBadge status="made_to_order" leadTimeDays={leadDays} />
          <h3 className="mt-5 text-2xl font-semibold">Made to order</h3>
          <p className="mt-3 leading-relaxed">
            We make it after you order, in the glaze and size you choose. It takes longer, and the lead time is shown
            before you buy.
          </p>
          <p className="text-spec mt-5 border-t border-line pt-4">Lead time is added to delivery time (sample)</p>
        </div>
      </div>
      <DraftNotice label="Sample timing" className="mt-8 max-w-[62ch]">
        Delivery windows and lead times shown here are sample values for the studio to replace.
      </DraftNotice>
    </SectionBand>
  );
}
