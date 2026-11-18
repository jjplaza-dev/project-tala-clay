"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CheckoutDetails } from "@/domain";
import { EmptyCart } from "@/components/cart/CartPreviews";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { buildOrder } from "@/lib/cart/order";
import { localOrderStorage } from "@/lib/cart/storage";
import { formatMoney } from "@/lib/format";
import { getPaymentMethods, getShippingRates, getZoneForCountry } from "@/lib/selectors";
import { validateCheckout, type CheckoutErrors, type CheckoutField, type CheckoutFormValues } from "@/lib/validators";
import { CountrySelect, FormField } from "./CheckoutFormFields";
import { DeliveryOptions, PaymentOptions } from "./ChoiceLists";

const INITIAL: CheckoutFormValues = { name: "", email: "", phone: "", country: "PH", line1: "", line2: "", city: "", region: "", postalCode: "" };

const FIELD_IDS: Record<CheckoutField, string> = {
  name: "co-name",
  email: "co-email",
  phone: "co-phone",
  country: "co-country",
  line1: "co-line1",
  line2: "co-line2",
  city: "co-city",
  region: "co-region",
  postalCode: "co-postal",
  delivery: "co-delivery",
  payment: "co-payment",
};

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-6">
      <h2 id={id} className="mb-5 text-2xl font-semibold">
        <span className="text-spec mr-3 text-muted-foreground">0{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function CheckoutClient() {
  const router = useRouter();
  const { hydrated, summary, clear } = useCart();
  const [values, setValues] = useState<CheckoutFormValues>(INITIAL);
  const [rateId, setRateId] = useState("");
  const [paymentId, setPaymentId] = useState("pay-stripe");
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [invalidSubmits, setInvalidSubmits] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [saveError, setSaveError] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const zone = getZoneForCountry(values.country);
  const rates = zone ? getShippingRates(zone.id) : [];
  const rate = rates.find((r) => r.id === rateId) ?? rates[0];
  const shipping = rate?.amount ?? 0;

  function check(next: CheckoutFormValues, payment: string, selectedRate: string | undefined): CheckoutErrors {
    const nextZone = getZoneForCountry(next.country);
    const payable = getPaymentMethods().some((m) => m.id === payment && m.status !== "unconfigured");
    return validateCheckout(next, { countrySupported: Boolean(nextZone), deliverySelected: Boolean(selectedRate), paymentSelected: payable });
  }

  const setField = (field: keyof CheckoutFormValues) => (value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted) {
      const nextRates = getZoneForCountry(next.country) ? getShippingRates(getZoneForCountry(next.country)!.id) : [];
      setErrors(check(next, paymentId, (nextRates.find((r) => r.id === rateId) ?? nextRates[0])?.id));
    }
  };

  useEffect(() => {
    if (invalidSubmits > 0) errorSummaryRef.current?.focus();
  }, [invalidSubmits]);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setAttempted(true);
    setSaveError("");
    const found = check(values, paymentId, rate?.id);
    setErrors(found);
    if (Object.keys(found).length > 0 || !rate) {
      setInvalidSubmits((n) => n + 1);
      return;
    }
    const checkout: CheckoutDetails = {
      contact: { name: values.name.trim(), email: values.email.trim(), ...(values.phone.trim() ? { phone: values.phone.trim() } : {}) },
      address: {
        line1: values.line1.trim(),
        ...(values.line2.trim() ? { line2: values.line2.trim() } : {}),
        city: values.city.trim(),
        region: values.region.trim(),
        postalCode: values.postalCode.trim(),
        country: values.country,
      },
      deliveryRateId: rate.id,
      paymentMethodId: paymentId,
    };
    setPlacing(true);
    const order = buildOrder(summary, checkout, rate.amount);
    if (!localOrderStorage.saveLast(order)) {
      setPlacing(false);
      setSaveError("Your browser would not save the order draft. Please check its privacy settings and try again.");
      return;
    }
    clear();
    router.push("/checkout/confirmation");
  }

  const errorEntries = (Object.keys(errors) as CheckoutField[]).filter((k) => errors[k]);

  return (
    <SectionBand labelledBy="checkout-title" className="lg:py-20">
      <SectionHeading id="checkout-title" level={1} title="Checkout" />
      {!hydrated ? (
        <p aria-busy="true" role="status" className="mt-10 text-muted-foreground">
          Loading your cart...
        </p>
      ) : summary.lines.length === 0 && !placing ? (
        <div className="mt-10">
          <EmptyCart />
        </div>
      ) : (
        <>
          <DraftNotice label="No payment is taken" className="mt-6 max-w-[62ch]">
            Payments connect in a later phase. For now, placing an order saves a draft on this device that is clearly marked not paid.
          </DraftNotice>
          <form onSubmit={onSubmit} noValidate className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="grid gap-10 lg:col-span-7">
              {errorEntries.length > 0 ? (
                <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="rounded border border-terracotta-deep bg-oat-deep p-5">
                  <h2 className="text-lg font-semibold">
                    Please fix {errorEntries.length} {errorEntries.length === 1 ? "thing" : "things"} before placing your order
                  </h2>
                  <ul className="mt-3 grid list-disc gap-1 pl-5 text-sm">
                    {errorEntries.map((field) => (
                      <li key={field}>
                        <a
                          href={`#${FIELD_IDS[field]}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(FIELD_IDS[field])?.focus();
                          }}
                          className="underline underline-offset-4"
                        >
                          {errors[field]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Step n={1} id="step-contact" title="Contact">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField id="co-name" label="Full name" autoComplete="name" value={values.name} onChange={setField("name")} error={errors.name} />
                  <FormField id="co-email" label="Email" type="email" autoComplete="email" value={values.email} onChange={setField("email")} error={errors.email} />
                  <FormField id="co-phone" label="Phone" type="tel" autoComplete="tel" optional value={values.phone} onChange={setField("phone")} error={errors.phone} />
                </div>
              </Step>

              <Step n={2} id="step-address" title="Shipping address">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <CountrySelect id="co-country" value={values.country} onChange={setField("country")} error={errors.country} />
                  </div>
                  <div className="sm:col-span-2">
                    <FormField id="co-line1" label="Street address" autoComplete="address-line1" value={values.line1} onChange={setField("line1")} error={errors.line1} />
                  </div>
                  <div className="sm:col-span-2">
                    <FormField id="co-line2" label="Apartment, unit or landmark" autoComplete="address-line2" optional value={values.line2} onChange={setField("line2")} error={errors.line2} />
                  </div>
                  <FormField id="co-city" label="City or town" autoComplete="address-level2" value={values.city} onChange={setField("city")} error={errors.city} />
                  <FormField id="co-region" label="Province, state or region" autoComplete="address-level1" value={values.region} onChange={setField("region")} error={errors.region} />
                  <FormField id="co-postal" label="Postal code" autoComplete="postal-code" value={values.postalCode} onChange={setField("postalCode")} error={errors.postalCode} />
                </div>
              </Step>

              <Step n={3} id="step-delivery" title="Delivery">
                <DeliveryOptions rates={rates} value={rate?.id ?? ""} onChange={setRateId} error={errors.delivery} />
              </Step>

              <Step n={4} id="step-gift" title="Gift wrap and message">
                {summary.lines.some((l) => l.item.gift?.wrapSelected) ? (
                  <ul className="grid gap-3 text-sm leading-relaxed">
                    {summary.lines
                      .filter((l) => l.item.gift?.wrapSelected)
                      .map((l) => (
                        <li key={l.details.variant.id} className="rounded border border-line bg-oat-deep p-4">
                          <span className="font-medium">
                            {l.details.product.name} ({l.details.glaze.name}, {l.details.variant.size})
                          </span>
                          <span className="block">{l.item.gift?.cardMessage ? `Card: “${l.item.gift.cardMessage}”` : "Gift wrap, no message card."}</span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed">No gift wrap selected. You can add it to any piece in your cart.</p>
                )}
                <p className="mt-3 text-sm">
                  <Link href="/cart" className="underline underline-offset-4">
                    Change gift options in your cart
                  </Link>
                </p>
              </Step>

              <Step n={5} id="step-payment" title="Payment">
                <PaymentOptions value={paymentId} onChange={setPaymentId} error={errors.payment} />
              </Step>
            </div>

            <div className="lg:col-span-5">
              <OrderSummary
                id="checkout-summary"
                className="lg:sticky lg:top-6"
                lines={[
                  { label: "Subtotal", value: formatMoney(summary.subtotal) },
                  { label: "Gift wrap", value: formatMoney(summary.giftWrap) },
                  { label: rate ? `Shipping (${rate.label})` : "Shipping", value: rate ? formatMoney(shipping) : "Choose a country" },
                  { label: "Total", value: formatMoney(summary.total + shipping), strong: true },
                ]}
              >
                <ul className="mt-6 grid gap-3 text-sm">
                  {summary.lines.map((l) => (
                    <li key={l.details.variant.id} className="flex justify-between gap-4 border-b border-line pb-3">
                      <span>
                        {l.details.product.name}
                        <span className="block text-muted-foreground">
                          {l.details.glaze.name} · {l.details.variant.size} · Qty {l.quantity}
                        </span>
                      </span>
                      <span className="text-price">{formatMoney(l.lineTotal)}</span>
                    </li>
                  ))}
                </ul>
                {saveError ? (
                  <p role="alert" className="mt-4 text-sm text-terracotta-deep">
                    {saveError}
                  </p>
                ) : null}
                <Button type="submit" disabled={placing} className="mt-6 h-11 w-full px-6 text-base">
                  {placing ? "Creating your order draft..." : "Create order draft (no payment)"}
                </Button>
                <p className="mt-3 text-sm text-muted-foreground">Prices, shipping and wrap price are samples. Nothing is paid or sent.</p>
              </OrderSummary>
            </div>
          </form>
        </>
      )}
    </SectionBand>
  );
}
