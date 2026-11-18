import Link from "next/link";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { getCareGuideSections } from "@/lib/selectors";

export function CareWholesaleBand() {
  const tips = getCareGuideSections()[0].steps;
  return (
    <SectionBand tone="dark" labelledBy="care-title">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="care-title"
            onDark
            eyebrow="Care guide"
            title="Looking after your pieces"
            intro="Simple habits help handmade ceramics last. Our guide covers each kind of piece."
          />
          <ul className="mt-6 grid gap-2 leading-relaxed">
            {tips.map((tip) => (
              <li key={tip} className="border-t border-oat/20 pt-2">
                {tip}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm opacity-80">Mug tips shown. General guidance only: please confirm details for your glaze with the studio.</p>
          <div className="mt-8">
            <Link href="/care" className={cta("light")}>
              Read the care guide
            </Link>
          </div>
        </div>
        <div>
          <SectionHeading
            onDark
            eyebrow="Wholesale"
            title="Stocking our pieces in your shop"
            intro="We work with a small number of shops. Tell us about yours and we will send the current range and terms."
          />
          <div className="mt-8">
            <Link href="/wholesale" className={cta("light")}>
              Wholesale inquiries
            </Link>
          </div>
        </div>
      </div>
    </SectionBand>
  );
}
