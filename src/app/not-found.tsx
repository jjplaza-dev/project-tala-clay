import Link from "next/link";
import { CeramicArt } from "@/components/art/CeramicArt";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";

export default function NotFound() {
  return (
    <SectionBand labelledBy="not-found-title" className="lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="not-found-title"
            level={1}
            eyebrow="Page not found"
            title="This shelf is empty"
            intro="We could not find the page you were looking for. It may have moved, or the address may be mistyped."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className={cta("primary")}>
              Browse all pieces
            </Link>
            <Link href="/" className={cta("outline")}>
              Back to the home page
            </Link>
          </div>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <CeramicArt
            artKind="planter"
            glazeHex="#B4694B"
            textureKind="raw"
            scale={0.9}
            label="Illustration of an empty terracotta planter"
            className="w-full"
          />
        </div>
      </div>
    </SectionBand>
  );
}
