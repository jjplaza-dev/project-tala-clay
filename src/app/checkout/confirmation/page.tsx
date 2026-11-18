import Link from "next/link";
import { ConfirmationSummary } from "@/components/checkout/ConfirmationSummary";
import { NotificationPreview } from "@/components/checkout/NotificationPreview";
import { PrintButton } from "@/components/checkout/PrintButton";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { notificationTemplates } from "@/data/notifications";
import { sampleOrder } from "@/data/sampleOrder";

export default function ConfirmationPage() {
  const template = notificationTemplates.find((t) => t.kind === "order_confirmation");
  return (
    <>
      <SectionBand labelledBy="confirmation-title" className="lg:py-20">
        <SectionHeading
          id="confirmation-title"
          level={1}
          eyebrow="Order confirmation"
          title="Thank you for your order"
          intro="We would send you the details below once your order is placed."
        />
        <p className="text-spec mt-4">Order number: {sampleOrder.number}</p>
        <DraftNotice label="Sample order" className="mt-6 max-w-[62ch]">
          This is a preview with fictional details. Status: not paid. No payment was taken and no email was sent.
        </DraftNotice>
        <div className="mt-10 max-w-3xl">
          <ConfirmationSummary order={sampleOrder} />
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
          <NotificationPreview template={template} order={sampleOrder} />
          <DraftNotice label="Email delivery not configured" className="self-start">
            No email provider has been selected for this project, so no email is sent. The wording is a template for the
            studio to review.
          </DraftNotice>
        </InterfacePreviewBand>
      ) : null}
    </>
  );
}
