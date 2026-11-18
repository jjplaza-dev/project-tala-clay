import { formatDeliveryWindow, formatMoney } from "@/lib/format";
import { getDeliveryEstimate, getPaymentMethods, getShippingRates, getShippingZones } from "@/lib/selectors";
import { cn } from "@/lib/utils";

// Static in Phase 2: radios are disabled and only show the selected state.
function Row({ name, id, checked, children, dim }: { name: string; id: string; checked: boolean; children: React.ReactNode; dim?: boolean }) {
  return (
    <label htmlFor={id} className={cn("flex min-h-11 items-start gap-3 rounded border p-4", checked ? "border-charcoal bg-background" : "border-field", dim && "opacity-80")}>
      <input id={id} type="radio" name={name} disabled defaultChecked={checked} className="mt-1 size-5 shrink-0" />
      <span className="grid gap-1 text-sm">{children}</span>
    </label>
  );
}

export function DeliveryMethod({ selectedRateId }: { selectedRateId: string }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="sr-only">Delivery method</legend>
      {getShippingZones().flatMap((zone) =>
        getShippingRates(zone.id).map((rate) => {
          const estimate = getDeliveryEstimate(zone.id);
          return (
            <Row key={rate.id} id={`rate-${rate.id}`} name="delivery" checked={rate.id === selectedRateId}>
              <span className="font-medium">
                {zone.name}: {rate.label}
              </span>
              <span className="text-spec">
                {estimate ? formatDeliveryWindow(estimate.minDays, estimate.maxDays) : ""} · {formatMoney(rate.amount)} (sample)
              </span>
            </Row>
          );
        }),
      )}
    </fieldset>
  );
}

export function PaymentSelector({ selectedId }: { selectedId: string }) {
  return (
    <fieldset className="grid gap-3">
      <legend className="sr-only">Payment method</legend>
      {getPaymentMethods().map((m) => (
        <Row key={m.id} id={`pay-${m.id}`} name="payment" checked={m.id === selectedId} dim={m.status === "unconfigured"}>
          <span className="font-medium">{m.label}</span>
          <span className="text-muted-foreground">
            {m.status === "unconfigured" ? "NOT CONFIGURED: no domestic payment method has been set up." : "Preview: connects in Phase 5 (test mode only)."}
          </span>
        </Row>
      ))}
    </fieldset>
  );
}
