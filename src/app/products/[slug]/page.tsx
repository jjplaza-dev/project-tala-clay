import { notFound } from "next/navigation";
import type { ProductVariant } from "@/domain";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { BuyPanel } from "@/components/product/BuyPanel";
import { CareSnippet, DeliveryEstimateBlock } from "@/components/product/CareAndDelivery";
import { ProductGallery } from "@/components/product/ProductGallery";
import { RelatedPieces } from "@/components/product/RelatedPieces";
import { SpecList, type SpecItem } from "@/components/product/SpecList";
import { VariantOptionsList } from "@/components/product/VariantOptionsList";
import { formatLeadTime } from "@/lib/format";
import { getCategories, getProductBySlug, getProducts, getVariantsForProduct } from "@/lib/selectors";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

function specItems(v: ProductVariant): SpecItem[] {
  const d = v.dimensions;
  const items: SpecItem[] = [
    { label: "Size", value: v.size },
    { label: "Height", value: `${d.heightMm} mm` },
    { label: "Width", value: `${d.widthMm} mm` },
  ];
  if (d.depthMm) items.push({ label: "Depth", value: `${d.depthMm} mm` });
  if (d.capacityMl) items.push({ label: "Capacity", value: `${d.capacityMl} ml` });
  if (d.weightG) items.push({ label: "Weight", value: `${d.weightG} g` });
  items.push({ label: "SKU", value: v.sku });
  items.push({
    label: "Availability",
    value:
      v.stockStatus === "made_to_order" && v.leadTimeDays
        ? `Made to order, ${formatLeadTime(v.leadTimeDays)}`
        : v.stockStatus === "ready_to_ship"
          ? "Ready to ship"
          : "Sold out",
  });
  return items;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const variant = getVariantsForProduct(product.id)[0];
  const category = getCategories().find((c) => c.id === product.categoryId);
  if (!variant || !category) notFound();

  return (
    <>
      <SectionBand className="lg:py-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.name, href: `/shop/${category.slug}` },
            { label: product.name },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductGallery product={product} glazeId={variant.glazeId} />
          </div>
          <div className="lg:col-span-5">
            <BuyPanel product={product} variant={variant} />
          </div>
        </div>
      </SectionBand>

      <SectionBand tone="deep" labelledBy="details-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="details-title" className="text-2xl font-semibold">
              About this piece
            </h2>
            <p className="mt-4 max-w-[62ch] leading-[1.65]">{product.description}</p>
            <p className="mt-4 max-w-[62ch] border-l-2 border-terracotta pl-4 leading-[1.65]">{product.madeBatchNote}</p>
            <div className="mt-10 max-w-[62ch]">
              <CareSnippet product={product} categorySlug={category.slug} />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="mb-4 text-2xl font-semibold">Specifications</h2>
            <SpecList items={specItems(variant)} />
            <DraftNotice label="Sample values" className="mt-4">
              Sizes, stock and lead times are placeholders for the studio to confirm.
            </DraftNotice>
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <DeliveryEstimateBlock variant={variant} />
          </div>
          <div className="lg:col-span-7">
            <VariantOptionsList product={product} />
          </div>
        </div>
      </SectionBand>

      <RelatedPieces productId={product.id} />
    </>
  );
}
