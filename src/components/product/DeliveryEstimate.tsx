"use client";

import Link from "next/link";
import { useState } from "react";
import { formatCountries, formatDeliveryWindow, formatLeadTime, formatMoney } from "@/lib/format";
import { getDeliveryEstimate, getShippingRates, getShippingZones, getZoneForCountry } from "@/lib/selectors";
import { useProductVariant } from "./ProductVariantContext";

/** Estimates respond to the chosen country and the selected option. Windows and rates are samples. */
export function DeliveryEstimate() {
  const { variant } = useProductVariant();
  const [country, setCountry] = useState("PH");
  const zone = getZoneForCountry(country);
  const estimate = zone ? getDeliveryEstimate(zone.id) : undefined;
  const rate = zone ? getShippingRates(zone.id)[0] : undefined;
  const lead = variant.stockStatus === "made_to_order" ? (variant.leadTimeDays ?? 0) : 0;

  return (
    <section aria-labelledby="delivery-title">
      <h2 id="delivery-title" className="text-2xl font-semibold">
        Delivery estimate
      </h2>
      <label htmlFor="delivery-country" className="mt-4 mb-2 block text-sm font-medium">
        Ship to
      </label>
      <select
        id="delivery-country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="h-11 w-full max-w-sm rounded border border-field bg-background px-3 text-base"
      >
        {getShippingZones().map((z) => (
          <optgroup key={z.id} label={z.name}>
            {z.countries.map((code) => (
              <option key={code} value={code}>
                {formatCountries([code])}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <div role="status" aria-live="polite" className="mt-5 grid gap-2 text-sm">
        {estimate ? (
          <>
            <p className="text-spec">
              Delivery after shipping: {formatDeliveryWindow(estimate.minDays, estimate.maxDays)}
            </p>
            {variant.stockStatus === "sold_out" ? (
              <p>This option is sold out, so there is no estimate. You can ask to be told when it returns.</p>
            ) : lead > 0 ? (
              <>
                <p className="text-spec">Made to order: ships in {formatLeadTime(lead)}</p>
                <p className="text-spec font-medium">
                  About {formatDeliveryWindow(lead + estimate.minDays, lead + estimate.maxDays)} from your order
                </p>
              </>
            ) : (
              <p className="text-spec font-medium">Ready to ship: packed and sent soon after your order</p>
            )}
            {rate ? <p className="text-spec">Shipping: {formatMoney(rate.amount)}</p> : null}
          </>
        ) : (
          <p>We could not find an estimate for that country.</p>
        )}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Sample windows and rates for the studio to replace.{" "}
        <Link href="/shipping" className="underline underline-offset-4">
          Shipping details
        </Link>
      </p>
    </section>
  );
}
