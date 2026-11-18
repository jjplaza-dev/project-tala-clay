import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { CareSnippet } from "@/components/product/CareAndDelivery";
import { DeliveryEstimate } from "@/components/product/DeliveryEstimate";
import { ProductVariantProvider } from "@/components/product/ProductVariantContext";
import { RelatedPieces } from "@/components/product/RelatedPieces";
import { VariantBuyPanel, VariantGallery, VariantSpecs } from "@/components/product/VariantViews";
import { VariantOptionsList } from "@/components/product/VariantOptionsList";
import { getCategories, getProductBySlug, getProducts, getVariantsForProduct } from "@/lib/selectors";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategories().find((c) => c.id === product.categoryId);
  if (!category || getVariantsForProduct(product.id).length === 0) notFound();

  return (
    <ProductVariantProvider productId={product.id}>
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
            <VariantGallery />
          </div>
          <div className="lg:col-span-5">
            <VariantBuyPanel />
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
            <VariantSpecs />
            <DraftNotice label="Sample values" className="mt-4">
              Sizes, stock and lead times are placeholders for the studio to confirm.
            </DraftNotice>
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <DeliveryEstimate />
          </div>
          <div className="lg:col-span-7">
            <VariantOptionsList product={product} />
          </div>
        </div>
      </SectionBand>

      <RelatedPieces productId={product.id} />
    </ProductVariantProvider>
  );
}
