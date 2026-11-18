import { CheckIcon } from "lucide-react";
import { ProcessSteps, StockistList } from "@/components/content/BusinessBlocks";
import { DraftNotice } from "@/components/content/DraftNotice";
import { FormStatePreviews, InquiryForm } from "@/components/content/Forms";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { stockists, wholesaleBenefits, wholesaleSteps } from "@/data/wholesale";

export default function WholesalePage() {
  return (
    <>
      <SectionBand labelledBy="wholesale-title" className="lg:py-20">
        <SectionHeading
          id="wholesale-title"
          level={1}
          eyebrow="Wholesale and stockists"
          title="Stocking Tala Clay in your shop"
          intro="We work with a small number of shops. Tell us about yours and we will send the current range and terms."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold">What retailers can expect</h2>
            <ul className="mt-4 grid gap-3 leading-relaxed">
              {wholesaleBenefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <CheckIcon aria-hidden strokeWidth={2} className="mt-1 size-4 shrink-0 text-olive-deep" />
                  {b}
                </li>
              ))}
            </ul>
            <DraftNotice label="Sample terms" className="mt-6">
              Benefits, minimums and pricing are placeholders for the studio to confirm.
            </DraftNotice>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="mb-4 text-2xl font-semibold">How it works</h2>
            <ProcessSteps items={wholesaleSteps.map((title) => ({ title }))} />
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="deep" labelledBy="inquiry-title">
        <div className="max-w-3xl">
          <InquiryForm />
        </div>
      </SectionBand>

      <SectionBand labelledBy="stockists-title">
        <SectionHeading id="stockists-title" level={2} title="Where to find us" intro="Stockists will be listed here." />
        <div className="mt-8">
          <StockistList stockists={stockists} />
        </div>
        <DraftNotice label="Fictional listings" className="mt-6 max-w-[62ch]">
          These shops are made-up examples that show how the list will look. They are not real stockists.
        </DraftNotice>
      </SectionBand>

      <InterfacePreviewBand id="wholesale-previews" title="Form states (preview)">
        <FormStatePreviews />
      </InterfacePreviewBand>
    </>
  );
}
