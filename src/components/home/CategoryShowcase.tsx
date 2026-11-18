import Link from "next/link";
import { CeramicArt } from "@/components/art/CeramicArt";
import { ImageFrame } from "@/components/art/ImageFrame";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getCategories, getGlazeById } from "@/lib/selectors";

// Column spans give the asymmetry; art glaze cycles through the sample glazes.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
const GLAZES = ["glaze-bone-speckle", "glaze-moss", "glaze-honey", "glaze-ash-grey", "glaze-raw-terracotta"];

export function CategoryShowcase() {
  return (
    <SectionBand tone="deep" labelledBy="categories-title">
      <SectionHeading id="categories-title" eyebrow="Shop by category" title="Five kinds of everyday pieces" />
      <Reveal stagger className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-12">
        {getCategories().map((category, i) => {
          const glaze = getGlazeById(GLAZES[i]);
          return (
            <article key={category.id} className={SPANS[i]}>
              <Link href={`/shop/${category.slug}`} className="group/cat block rounded">
                <ImageFrame ratio="landscape" hoverZoom>
                  <CeramicArt
                    artKind={category.artKind}
                    glazeHex={glaze?.hex ?? "#E6DDCB"}
                    textureKind={glaze?.textureKind}
                    label={`Illustration of a ${category.name.toLowerCase()} piece`}
                    className="h-full w-full"
                  />
                </ImageFrame>
                <h3 className="mt-4 text-2xl font-semibold underline-offset-4 group-hover/cat:underline">{category.name}</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed">{category.intro}</p>
              </Link>
            </article>
          );
        })}
      </Reveal>
    </SectionBand>
  );
}
