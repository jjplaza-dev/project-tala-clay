import Link from "next/link";
import type { Product } from "@/domain";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { AvailabilityBadge } from "@/components/product/AvailabilityBadge";
import { formatMoney } from "@/lib/format";
import { getPriceRange, getProductAvailability } from "@/lib/selectors";

export function ProductCard({ product }: { product: Product }) {
  const { min, max } = getPriceRange(product.id);
  return (
    <article className="group/card">
      <Link href={`/products/${product.slug}`} className="block rounded">
        <ImageFrame ratio="portrait" hoverZoom>
          <ProductArt productId={product.id} className="h-full w-full" />
        </ImageFrame>
        <h3 className="mt-4 text-lg leading-snug font-medium underline-offset-4 group-hover/card:underline">
          {product.name}
        </h3>
        <p className="text-price mt-1">
          {min !== max ? "From " : ""}
          {formatMoney(min, product.currency)}
        </p>
      </Link>
      <AvailabilityBadge status={getProductAvailability(product.id)} className="mt-2" />
    </article>
  );
}
