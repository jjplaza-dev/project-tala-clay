import Link from "next/link";
import { ContactForm } from "@/components/content/Forms";
import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SupportPreview } from "@/components/support/SupportPreview";
import { studio } from "@/data/studio";

export default function ContactPage() {
  return (
    <>
      <SectionBand labelledBy="contact-title" className="lg:py-20">
        <SectionHeading
          id="contact-title"
          level={1}
          eyebrow="Contact"
          title="Write to the studio"
          intro="Questions about a piece, an order or a gift? We are happy to help."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold">Other ways to reach us</h2>
            <ul className="mt-4 grid gap-4 leading-relaxed">
              <li>
                <span className="text-label block text-muted-foreground">Email</span>
                {studio.contactEmail} <span className="text-sm text-muted-foreground">(placeholder address)</span>
              </li>
              <li>
                <span className="text-label block text-muted-foreground">Chat</span>
                Chat and Messenger will be offered from the corner of the site in a later phase.
              </li>
              <li>
                <span className="text-label block text-muted-foreground">Shops</span>
                <Link href="/wholesale" className="underline underline-offset-4 hover:text-terracotta-deep">
                  Wholesale inquiries
                </Link>
              </li>
              <li>
                <span className="text-label block text-muted-foreground">Quick answers</span>
                <Link href="/faq" className="underline underline-offset-4 hover:text-terracotta-deep">
                  Read the FAQ
                </Link>
              </li>
            </ul>
            <DraftNotice label="Sample timing" className="mt-6">
              {studio.responseTimeNote}
            </DraftNotice>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </SectionBand>
      <InterfacePreviewBand id="contact-previews" title="Chat support (preview)">
        <SupportPreview />
        <DraftNotice label="Not connected" className="self-start">
          Crisp and Facebook Messenger are connected in Phase 6, and only when their settings are provided. Until then
          nothing here opens a chat.
        </DraftNotice>
      </InterfacePreviewBand>
    </>
  );
}
