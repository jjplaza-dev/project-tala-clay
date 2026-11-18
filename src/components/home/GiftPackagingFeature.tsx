import Link from "next/link";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { defaultGiftOptions, sampleGiftMessage } from "@/data/gift";
import { formatMoney } from "@/lib/format";

export function GiftPackagingFeature() {
  return (
    <SectionBand labelledBy="gift-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="gift-title"
            eyebrow="Gift-ready"
            title="Wrapped, with a note in your words"
            intro="Choose gift wrap on any piece and add a short message card, up to 160 characters. We tuck it in before the box is closed."
          />
          <p className="text-spec mt-6">Gift wrap: {formatMoney(defaultGiftOptions.priceAdd)} per piece (sample price)</p>
          <div className="mt-8">
            <Link href="/shop" className={cta("primary")}>
              Find a gift
            </Link>
          </div>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <figure aria-label="Illustration of a gift message card" className="relative rounded border border-line bg-oat-deep p-8 md:p-10">
            <div className="h-3 w-24 border border-charcoal bg-ochre" aria-hidden />
            <blockquote className="mt-6 text-xl leading-snug">{sampleGiftMessage}</blockquote>
            <figcaption className="text-label mt-6 text-muted-foreground">Sample message card</figcaption>
          </figure>
        </Reveal>
      </div>
    </SectionBand>
  );
}
