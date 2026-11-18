"use client";

import { AlertCircleIcon } from "lucide-react";
import type { ShippingRate } from "@/domain";
import { formatDeliveryWindow, formatMoney } from "@/lib/format";
import { getDeliveryEstimate, getPaymentMethods } from "@/lib/selectors";
import { cn } from "@/lib/utils";

function Row({ id, name, checked, disabled, onChange, children }: { id: string; name: string; checked: boolean; disabled?: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      className={cn("flex min-h-11 items-start gap-3 rounded border p-4", checked ? "border-charcoal bg-background" : "border-field", disabled && "opacity-80")}
    >
      <input id={id} type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} className="mt-1 size-5 shrink-0" />
      <span className="grid gap-1 text-sm">{children}</span>
    </label>
  );
}

function GroupError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-terracotta-deep">
      <AlertCircleIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  ) : null;
}

export function DeliveryOptions({ rates, value, onChange, error }: { rates: ShippingRate[]; value: string; onChange: (id: string) => void; error?: string }) {
  return (
    <fieldset id="co-delivery" tabIndex={-1} aria-describedby={error ? "co-delivery-error" : undefined} className="grid gap-3">
      <legend className="sr-only">Delivery method</legend>
      {rates.length === 0 ? (
        <p className="text-sm">Choose a country we ship to and your delivery options will appear here.</p>
      ) : (
        rates.map((rate) => {
          const estimate = getDeliveryEstimate(rate.zoneId);
          return (
            <Row key={rate.id} id={`rate-${rate.id}`} name="delivery" checked={rate.id === value} onChange={() => onChange(rate.id)}>
              <span className="font-medium">{rate.label}</span>
              <span className="text-spec">
                {estimate ? `${formatDeliveryWindow(estimate.minDays, estimate.maxDays)} after shipping · ` : ""}
                {formatMoney(rate.amount)} (sample)
              </span>
            </Row>
          );
        })
      )}
      <GroupError id="co-delivery-error" message={error} />
    </fieldset>
  );
}

export function PaymentOptions({ value, onChange, error }: { value: string; onChange: (id: string) => void; error?: string }) {
  return (
    <fieldset id="co-payment" tabIndex={-1} aria-describedby={error ? "co-payment-error" : undefined} className="grid gap-3">
      <legend className="sr-only">Payment method</legend>
      {getPaymentMethods().map((m) => {
        const unavailable = m.status === "unconfigured";
        return (
          <Row key={m.id} id={`pay-${m.id}`} name="payment" checked={m.id === value} disabled={unavailable} onChange={() => onChange(m.id)}>
            <span className="font-medium">{m.label}</span>
            <span className="text-muted-foreground">
              {unavailable ? "NOT CONFIGURED: no domestic payment method has been set up." : "Available in the next phase. Your choice is noted on the order draft."}
            </span>
          </Row>
        );
      })}
      <p className="text-sm text-muted-foreground">No payment is taken in this phase. The order is saved as a draft that is not paid.</p>
      <GroupError id="co-payment-error" message={error} />
    </fieldset>
  );
}
