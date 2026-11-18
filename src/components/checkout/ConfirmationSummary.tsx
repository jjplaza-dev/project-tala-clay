import type { Order } from "@/domain";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { formatCountries, formatDeliveryWindow, formatLeadTime, formatMoney } from "@/lib/format";
import { getDeliveryEstimate, getVariantById, getZoneForCountry } from "@/lib/selectors";

export function ConfirmationSummary({ order }: { order: Order }) {
  const { contact, address } = order.checkout;
  const zone = getZoneForCountry(address.country);
  const estimate = zone ? getDeliveryEstimate(zone.id) : undefined;
  const madeToOrderDays = order.items
    .map((i) => getVariantById(i.variantId))
    .filter((v) => v?.stockStatus === "made_to_order")
    .map((v) => v?.leadTimeDays ?? 0);
  const longestLead = madeToOrderDays.length ? Math.max(...madeToOrderDays) : 0;
  const t = order.totals;

  return (
    <div className="grid gap-8">
      <section aria-labelledby="order-items-title">
        <h2 id="order-items-title" className="text-2xl font-semibold">
          Your pieces
        </h2>
        <ul className="mt-4 border-t border-line">
          {order.items.map((item) => (
            <li key={item.variantId} className="flex justify-between gap-4 border-b border-line py-4">
              <span>
                <span className="font-medium">{item.productName}</span>
                <span className="block text-sm text-muted-foreground">
                  {item.glazeName} · {item.size} · Qty {item.quantity}
                </span>
                {item.gift?.wrapSelected ? <span className="block text-sm">Gift wrap with message: “{item.gift.cardMessage}”</span> : null}
              </span>
              <span className="text-price">{formatMoney(item.unitPrice * item.quantity, order.currency)}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="grid gap-8 md:grid-cols-2">
        <section aria-labelledby="ship-to-title">
          <h2 id="ship-to-title" className="text-xl font-semibold">
            Shipping to
          </h2>
          <address className="mt-3 text-sm leading-relaxed not-italic">
            {contact.name}
            <br />
            {address.line1}
            <br />
            {address.line2 ? (
              <>
                {address.line2}
                <br />
              </>
            ) : null}
            {address.city}, {address.region} {address.postalCode}
            <br />
            {formatCountries([address.country])}
          </address>
        </section>
        <section aria-labelledby="delivery-expect-title">
          <h2 id="delivery-expect-title" className="text-xl font-semibold">
            What to expect
          </h2>
          <p className="text-spec mt-3">
            Delivery: {estimate ? formatDeliveryWindow(estimate.minDays, estimate.maxDays) : "to be confirmed"} after shipping (sample)
          </p>
          {longestLead ? <p className="text-spec mt-1">Made-to-order pieces: add {formatLeadTime(longestLead)} (sample)</p> : null}
        </section>
      </div>
      <OrderSummary
        id="confirmation-summary"
        lines={[
          { label: "Subtotal", value: formatMoney(t.subtotal, order.currency) },
          { label: "Shipping", value: formatMoney(t.shipping, order.currency) },
          { label: "Gift wrap", value: formatMoney(t.giftWrap, order.currency) },
          { label: "Total (not paid)", value: formatMoney(t.total, order.currency), strong: true },
        ]}
      />
    </div>
  );
}
