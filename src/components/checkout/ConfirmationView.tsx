"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/domain";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { notificationTemplates } from "@/data/notifications";
import { localOrderStorage } from "@/lib/cart/storage";
import { getPaymentMethods } from "@/lib/selectors";
import { ConfirmationSummary } from "./ConfirmationSummary";
import { NotificationPreview } from "./NotificationPreview";
import { PrintButton } from "./PrintButton";

type State = { loaded: false } | { loaded: true; order: Order | null };

export function ConfirmationView() {
  const [state, setState] = useState<State>({ loaded: false });
  useEffect(() => setState({ loaded: true, order: localOrderStorage.loadLast() }), []);

  if (!state.loaded) {
    return (
      <SectionBand labelledBy="confirmation-title" className="lg:py-20">
        <SectionHeading id="confirmation-title" level={1} title="Your order" />
        <p aria-busy="true" role="status" className="mt-10 text-muted-foreground">
          Loading your order...
        </p>
      </SectionBand>
    );
  }

  const order = state.order;
  if (!order) {
    return (
      <SectionBand labelledBy="confirmation-title" className="lg:py-20">
        <SectionHeading
          id="confirmation-title"
          level={1}
          title="No recent order found"
          intro="We could not find an order draft saved on this device. It may have been made on another device or browser."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/shop" className={cta("primary")}>
            Browse all pieces
          </Link>
          <Link href="/cart" className={cta("outline")}>
            Go to your cart
          </Link>
        </div>
      </SectionBand>
    );
  }

  const template = notificationTemplates.find((t) => t.kind === "order_confirmation");
  const payment = getPaymentMethods().find((m) => m.id === order.checkout.paymentMethodId);

  return (
    <>
      <SectionBand labelledBy="confirmation-title" className="lg:py-20">
        <SectionHeading
          id="confirmation-title"
          level={1}
          eyebrow="Order draft"
          title="Your order draft is saved"
          intro="Here is a summary of what you chose. Nothing has been paid yet."
        />
        <p className="text-spec mt-4">Order number: {order.number}</p>
        <DraftNotice label="Not paid" className="mt-6 max-w-[62ch]">
          This is a draft saved on this device only. No payment was taken, no email was sent, and the studio has not
          received it. Payments connect in Phase 5.
          {payment ? ` You noted ${payment.label} as how you plan to pay.` : ""}
        </DraftNotice>
        <div className="mt-10 max-w-3xl">
          <ConfirmationSummary order={order} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/shop" className={cta("primary")}>
            Continue shopping
          </Link>
          <PrintButton />
        </div>
      </SectionBand>
      {template ? (
        <InterfacePreviewBand id="confirmation-previews" title="Order notification (preview)">
          <NotificationPreview template={template} order={order} />
          <DraftNotice label="Email delivery not configured" className="self-start">
            No email provider has been selected for this project, so no email is sent. The wording is a template for the
            studio to review.
          </DraftNotice>
        </InterfacePreviewBand>
      ) : null}
    </>
  );
}
