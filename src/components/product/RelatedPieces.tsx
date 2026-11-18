import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { getRelatedProducts } from "@/lib/selectors";

export function RelatedPieces({ productId }: { productId: string }) {
  const related = getRelatedProducts(productId, 4);
  if (related.length === 0) return null;
  return (
    <SectionBand tone="deep" labelledBy="related-title">
      <SectionHeading id="related-title" title="You might also like" />
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {related.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </SectionBand>
  );
}
