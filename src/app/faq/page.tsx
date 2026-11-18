import Link from "next/link";
import type { FAQGroup } from "@/domain";
import { NotificationPreview } from "@/components/checkout/NotificationPreview";
import { AccordionGroup } from "@/components/content/AccordionGroup";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { faqItems } from "@/data/faq";
import { notificationTemplates } from "@/data/notifications";

const GROUPS: { id: FAQGroup; title: string }[] = [
  { id: "ordering", title: "Ordering" },
  { id: "made-to-order", title: "Made to order" },
  { id: "gifts", title: "Gifts" },
  { id: "shipping", title: "Shipping" },
  { id: "care", title: "Care" },
  { id: "wholesale", title: "Wholesale" },
];

export default function FaqPage() {
  const backInStock = notificationTemplates.find((t) => t.kind === "back_in_stock");
  return (
    <>
      <SectionBand labelledBy="faq-title" className="lg:py-20">
        <SectionHeading
          id="faq-title"
          level={1}
          eyebrow="FAQ"
          title="Questions we are often asked"
          intro="Short answers about ordering, shipping, gifts and care. Can't find yours? Write to us."
        />
        <DraftNotice label="Draft answers" className="mt-6 max-w-[62ch]">
          These answers are drafts for the studio to review. Timings and policies are sample values.
        </DraftNotice>
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="lg:sticky lg:top-6">
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <a href={`#faq-${g.id}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-12 lg:col-span-8 lg:col-start-5">
            {GROUPS.map((g) => (
              <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`faq-${g.id}-title`} className="scroll-mt-6">
                <h2 id={`faq-${g.id}-title`} className="mb-4 text-2xl font-semibold">{g.title}</h2>
                <AccordionGroup
                  ariaLabel={g.title}
                  items={faqItems.filter((f) => f.group === g.id).map((f) => ({ id: f.id, title: f.question, body: f.answer }))}
                />
              </section>
            ))}
            <p>
              Still have a question?{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-terracotta-deep">
                Contact the studio
              </Link>
              .
            </p>
          </div>
        </div>
      </SectionBand>
      {backInStock ? (
        <InterfacePreviewBand id="faq-previews" title="Back-in-stock email (preview)">
          <NotificationPreview template={backInStock} />
          <DraftNotice label="Email delivery not configured" className="self-start">
            If you ask to be told when a sold-out piece returns, the request is saved on your device in Phase 3. No email
            provider has been selected, so no email is sent.
          </DraftNotice>
        </InterfacePreviewBand>
      ) : null}
    </>
  );
}
