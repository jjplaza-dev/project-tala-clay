import Link from "next/link";
import { cta } from "@/components/layout/cta";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { getReadyToShipProducts } from "@/lib/selectors";

export function ReadyToShipGrid() {
  const pieces = getReadyToShipProducts().slice(0, 6);
  return (
    <SectionBand labelledBy="ready-title">
      <SectionHeading
        id="ready-title"
        eyebrow="Ready to ship"
        title="Pieces that are made and waiting"
        intro="These are finished and in the studio now, so they can go out soon after you order."
      />
      <Reveal stagger className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-10 lg:[&>*:nth-child(3n+2)]:mt-14">
        {pieces.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Reveal>
      <div className="mt-14">
        <Link href="/shop" className={cta("outline")}>
          See every piece
        </Link>
      </div>
    </SectionBand>
  );
}
