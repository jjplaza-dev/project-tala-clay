import Link from "next/link";
import type { Product, ProductVariant } from "@/domain";
import { formatDeliveryWindow, formatLeadTime, formatMoney } from "@/lib/format";
import { getCareNotesForProduct, getDeliveryEstimate, getShippingRates, getShippingZones } from "@/lib/selectors";

export function CareSnippet({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const notes = getCareNotesForProduct(product.id);
  return (
    <section aria-labelledby="care-snippet-title">
      <h2 id="care-snippet-title" className="text-2xl font-semibold">
        Care
      </h2>
      {notes.map((note) => (
        <p key={note.id} className="mt-3 leading-relaxed">
          {note.body}
        </p>
      ))}
      <p className="mt-3">
        <Link href={`/care#guide-${categorySlug}`} className="underline underline-offset-4 hover:text-terracotta-deep">
          Read the full care guide
        </Link>
      </p>
    </section>
  );
}

/** Static zone picker preview: every zone is listed with its sample window and rate. */
export function DeliveryEstimateBlock({ variant }: { variant: ProductVariant }) {
  return (
    <section aria-labelledby="delivery-title">
      <h2 id="delivery-title" className="text-2xl font-semibold">
        Delivery estimate
      </h2>
      {variant.stockStatus === "made_to_order" && variant.leadTimeDays ? (
        <p className="text-spec mt-3">Made to order: add {formatLeadTime(variant.leadTimeDays)} before it ships (sample).</p>
      ) : null}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <caption className="sr-only">Sample delivery windows and shipping by region</caption>
          <thead>
            <tr className="border-b border-line text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">
                Ship to
              </th>
              <th scope="col" className="py-2 pr-4 font-medium">
                Delivery window
              </th>
              <th scope="col" className="py-2 font-medium">
                Shipping
              </th>
            </tr>
          </thead>
          <tbody>
            {getShippingZones().map((zone) => {
              const estimate = getDeliveryEstimate(zone.id);
              const rate = getShippingRates(zone.id)[0];
              return (
                <tr key={zone.id} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {zone.name}
                  </th>
                  <td className="text-spec py-3 pr-4">{estimate ? formatDeliveryWindow(estimate.minDays, estimate.maxDays) : "-"}</td>
                  <td className="text-spec py-3">{rate ? formatMoney(rate.amount) : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Sample windows and rates. Choosing your country turns on in Phase 3.{" "}
        <Link href="/shipping" className="underline underline-offset-4">
          Shipping details
        </Link>
      </p>
    </section>
  );
}
