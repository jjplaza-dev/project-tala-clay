import Link from "next/link";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedProducts } from "@/lib/selectors";

/** The only place with staggered offsets; the main grid below stays orderly for scanning. */
export function ShopHeroStrip() {
  const pieces = getFeaturedProducts().slice(0, 4);
  return (
    <Reveal stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 md:[&>*:nth-child(even)]:mt-10">
      {pieces.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`} className="group/strip block rounded">
          <ImageFrame ratio="square" hoverZoom>
            <ProductArt productId={product.id} className="h-full w-full" />
          </ImageFrame>
          <span className="mt-3 block text-sm font-medium underline-offset-4 group-hover/strip:underline">{product.name}</span>
        </Link>
      ))}
    </Reveal>
  );
}
