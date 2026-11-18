import { Loader2Icon } from "lucide-react";
import { OrderSummary, SummaryItems } from "@/components/cart/OrderSummary";
import { AddressFields, ContactFields, Field } from "@/components/checkout/CheckoutFields";
import { DeliveryMethod, PaymentSelector } from "@/components/checkout/ChoiceLists";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { GiftPanel } from "@/components/product/GiftPanel";
import { Button } from "@/components/ui/button";
import { sampleCart } from "@/data/sampleCart";
import { sampleCheckout } from "@/data/sampleCheckout";
import { sampleOrder } from "@/data/sampleOrder";
import { formatMoney } from "@/lib/format";

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

export default function CheckoutPage() {
  const t = sampleOrder.totals;
  return (
    <>
      <SectionBand labelledBy="checkout-title" className="lg:py-20">
        <SectionHeading id="checkout-title" level={1} title="Checkout" />
        <DraftNotice label="Preview" className="mt-6 max-w-[62ch]">
          This page shows a fictional customer and sample prices. Nothing is submitted and no payment is taken. Forms and
          payments turn on in Phases 4 and 5.
        </DraftNotice>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="grid gap-10 lg:col-span-7">
            <Step n={1} id="step-contact" title="Contact">
              <ContactFields contact={sampleCheckout.contact} />
            </Step>
            <Step n={2} id="step-address" title="Shipping address">
              <AddressFields address={sampleCheckout.address} />
            </Step>
            <Step n={3} id="step-delivery" title="Delivery">
              <DeliveryMethod selectedRateId={sampleCheckout.deliveryRateId} />
            </Step>
            <Step n={4} id="step-gift" title="Gift message">
              <GiftPanel idPrefix="checkout-gift" />
            </Step>
            <Step n={5} id="step-payment" title="Payment">
              <PaymentSelector selectedId={sampleCheckout.paymentMethodId} />
            </Step>
          </div>
          <div className="lg:col-span-5">
            <OrderSummary
              id="checkout-summary"
              className="lg:sticky lg:top-6"
              lines={[
                { label: "Subtotal", value: formatMoney(t.subtotal) },
                { label: "Shipping (Philippines, standard)", value: formatMoney(t.shipping) },
                { label: "Gift wrap", value: formatMoney(t.giftWrap) },
                { label: "Total", value: formatMoney(t.total), strong: true },
              ]}
            >
              <div className="mt-6">
                <SummaryItems items={sampleCart.items} />
              </div>
              <Button type="button" disabled className="mt-6 h-11 w-full px-6 text-base">
                Place order (preview)
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">Prices, shipping and gift wrap are sample values.</p>
            </OrderSummary>
          </div>
        </div>
      </SectionBand>
      <InterfacePreviewBand id="checkout-previews" title="Form states (preview)">
        <div className="rounded border border-line bg-background p-6">
          <p className="text-label mb-4 text-muted-foreground">Field error</p>
          <Field id="preview-email" label="Email" value="customer@" type="email" error="Enter an email address like name@example.com." />
        </div>
        <div className="rounded border border-line bg-background p-6">
          <p className="text-label mb-4 text-muted-foreground">Disabled while processing</p>
          <Button type="button" disabled className="h-11 px-6 text-base">
            <Loader2Icon aria-hidden strokeWidth={1.5} className="size-4" />
            Placing order...
          </Button>
        </div>
      </InterfacePreviewBand>
    </>
  );
}
