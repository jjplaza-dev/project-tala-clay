import Link from "next/link";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { Reveal } from "@/components/motion/Reveal";
import { formatMoney } from "@/lib/format";
import { getFeaturedProducts, getPriceRange } from "@/lib/selectors";

export function HeroFeatured() {
  const featured = getFeaturedProducts()[0];
  const { min } = getPriceRange(featured.id);
  return (
    <SectionBand labelledBy="hero-title" className="lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-label mb-4 text-terracotta-deep">Small-batch functional pottery</p>
          <h1 id="hero-title" className="text-display max-w-[14ch]">
            Pottery made slowly, for everyday use
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.65] md:text-lg">
            Mugs, bowls, plates, serving ware and planters, shaped, glazed and finished in our studio in small batches.
            Small differences in form and glaze are part of each piece.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className={cta("primary")}>
              Shop all pieces
            </Link>
            <a href="#made-by-hand" className={cta("outline")}>
              How we make them
            </a>
          </div>
        </div>
        <Reveal className="lg:col-span-5 lg:col-start-8 lg:translate-y-10">
          <ImageFrame ratio="portrait">
            <ProductArt productId={featured.id} className="h-full w-full" />
          </ImageFrame>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <p>
              <span className="text-label block text-muted-foreground">Featured piece</span>
              <Link href={`/products/${featured.slug}`} className="text-lg font-medium underline-offset-4 hover:underline">
                {featured.name}
              </Link>
            </p>
            <p className="text-price">{formatMoney(min, featured.currency)}</p>
          </div>
        </Reveal>
      </div>
    </SectionBand>
  );
}
