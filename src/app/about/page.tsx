import Link from "next/link";
import { CeramicArt } from "@/components/art/CeramicArt";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProcessSteps } from "@/components/content/BusinessBlocks";
import { DraftNotice } from "@/components/content/DraftNotice";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { studio } from "@/data/studio";
import { getGlazeById } from "@/lib/selectors";

const PROCESS = [
  { title: "Shape", body: "We throw or build each piece by hand, then trim it while the clay is still soft." },
  { title: "Glaze", body: "We apply glaze ourselves, so pooling and thinning differ from piece to piece." },
  { title: "Finish", body: "After firing we check and finish each piece before it is packed." },
];

const VALUES = [
  { title: "Made to be used", body: "Our pieces are meant for daily tables and kitchens, not for a shelf." },
  { title: "Honest about variation", body: "Handmade means small differences. We show them rather than hide them." },
  { title: "Small batches", body: "We make a limited number at a time, which is why some pieces are made to order." },
  { title: "Plain words", body: "We try to tell you exactly what a piece is, what it measures and when it will arrive." },
];

export default function AboutPage() {
  const glaze = getGlazeById("glaze-ember-brown");
  return (
    <>
      <SectionBand labelledBy="about-title" className="lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="about-title"
              level={1}
              eyebrow="About the studio"
              title="A small studio making things for everyday use"
              intro={studio.blurb}
            />
            <DraftNotice label="Placeholder story" className="mt-6">
              This page is placeholder copy. The studio can add its own story, names and photographs.
            </DraftNotice>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ImageFrame ratio="portrait">
              <CeramicArt
                artKind="bowl"
                glazeHex={glaze?.hex ?? "#7A4B36"}
                textureKind={glaze?.textureKind}
                label="Illustration of a brown glazed bowl"
                className="h-full w-full"
              />
            </ImageFrame>
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="deep" labelledBy="process-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="process-title" level={2} title="How a piece is made" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ProcessSteps items={PROCESS} />
          </div>
        </div>
      </SectionBand>

      <SectionBand labelledBy="values-title">
        <SectionHeading id="values-title" level={2} title="What we care about" />
        <ul className="mt-10 grid gap-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.title} className="border-t border-line pt-4">
              <h3 className="text-xl font-medium">{v.title}</h3>
              <p className="mt-2 leading-relaxed">{v.body}</p>
            </li>
          ))}
        </ul>
      </SectionBand>

      <SectionBand tone="dark" labelledBy="about-cta-title">
        <SectionHeading id="about-cta-title" onDark level={2} title="See what is on the shelf" intro="Some pieces are ready to ship and some are made to order." />
        <div className="mt-8">
          <Link href="/shop" className={cta("light")}>
            Shop all pieces
          </Link>
        </div>
      </SectionBand>
    </>
  );
}
