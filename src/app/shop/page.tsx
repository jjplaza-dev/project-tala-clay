import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CatalogLayout } from "@/components/shop/CatalogLayout";
import { ShopHeroStrip } from "@/components/shop/ShopHeroStrip";
import { getProducts } from "@/lib/selectors";

export default function ShopPage() {
  return (
    <>
      <SectionBand labelledBy="shop-title" className="pb-8 lg:pb-12">
        <SectionHeading
          id="shop-title"
          level={1}
          eyebrow="The collection"
          title="All pieces"
          intro="Everything we make, in small batches. Some pieces are ready to ship now and some are made to order."
        />
        <ShopHeroStrip />
      </SectionBand>
      <CatalogLayout products={getProducts()} headingId="shop-pieces" />
    </>
  );
}
