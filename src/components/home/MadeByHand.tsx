import { CeramicArt } from "@/components/art/CeramicArt";
import { ImageFrame } from "@/components/art/ImageFrame";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getGlazeById } from "@/lib/selectors";

const STEPS = [
  { title: "Shape", body: "Each piece is thrown or built by hand from clay, then trimmed and finished while it is still soft." },
  { title: "Glaze", body: "We dip, pour or brush on glaze ourselves. Where it pools or thins is different every time." },
  { title: "Finish", body: "After firing we check, sand and finish each piece, so it is ready for daily use." },
];

export function MadeByHand() {
  const glaze = getGlazeById("glaze-bone-speckle");
  return (
    <SectionBand labelledBy="made-by-hand-title" className="scroll-mt-4">
      <div id="made-by-hand" className="grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <ImageFrame ratio="square">
            <CeramicArt
              artKind="bowl"
              glazeHex={glaze?.hex ?? "#E6DDCB"}
              textureKind="speckle"
              view="detail"
              label="Illustrated close-up of a speckled glaze edge, drawn to show texture, not a photograph"
              className="h-full w-full"
            />
          </ImageFrame>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading id="made-by-hand-title" eyebrow="Made by hand" title="Shaped, glazed and finished in our studio" />
          <ol className="mt-8 grid gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line pt-4">
                <span className="text-spec text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="mt-1 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-terracotta pl-4 leading-relaxed">
            Because we work in small batches, shape, texture and glaze vary slightly from piece to piece. We think that is
            part of what makes each one yours.
          </p>
        </div>
      </div>
    </SectionBand>
  );
}
