import Link from "next/link";
import type { Category } from "@/domain";
import { CeramicArt } from "@/components/art/CeramicArt";
import { ImageFrame } from "@/components/art/ImageFrame";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { formatDimensions } from "@/lib/format";
import { getGlazeById, getProductsByCategory, getVariantsForProduct } from "@/lib/selectors";

export function CategoryIntro({ category }: { category: Category }) {
  const variants = getProductsByCategory(category.id).flatMap((p) => getVariantsForProduct(p.id));
  const sizes = [...new Set(variants.map((v) => v.size))];
  const example = variants[0];
  const glaze = getGlazeById(example?.glazeId ?? "glaze-bone-speckle");
  return (
    <SectionBand labelledBy="category-title" className="lg:py-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]} />
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading id="category-title" level={1} title={category.name} intro={category.intro} />
          <dl className="mt-8 grid gap-3 border-t border-line pt-4 text-sm">
            <div>
              <dt className="text-label text-muted-foreground">Sizes</dt>
              <dd className="mt-1">{sizes.join(", ")}</dd>
            </div>
            {example ? (
              <div>
                <dt className="text-label text-muted-foreground">Example size</dt>
                <dd className="text-spec mt-1">
                  {example.size}: {formatDimensions(example.dimensions)}
                </dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-6">
            <Link href={`/care#guide-${category.slug}`} className="underline underline-offset-4 hover:text-terracotta-deep">
              Care for {category.name.toLowerCase()}
            </Link>
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <ImageFrame ratio="landscape">
            <CeramicArt
              artKind={category.artKind}
              glazeHex={glaze?.hex ?? "#E6DDCB"}
              textureKind={glaze?.textureKind}
              label={`Illustration of a ${category.name.toLowerCase()} piece`}
              className="h-full w-full"
            />
          </ImageFrame>
        </div>
      </div>
    </SectionBand>
  );
}
