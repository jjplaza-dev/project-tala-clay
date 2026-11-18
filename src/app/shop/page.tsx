import { DraftNotice } from "@/components/content/DraftNotice";
import { InterfacePreviewBand } from "@/components/content/InterfacePreviewBand";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CatalogLayout } from "@/components/shop/CatalogLayout";
import { SearchDialogPreview } from "@/components/shop/SearchDialogPreview";
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
      <InterfacePreviewBand id="shop-previews">
        <SearchDialogPreview />
        <DraftNotice label="Coming next" className="self-start">
          Search, filters and sorting become interactive in Phase 3. Everything on this page already reads from the same
          product data.
        </DraftNotice>
      </InterfacePreviewBand>
    </>
  );
}
