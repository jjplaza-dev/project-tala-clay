import type { Product } from "@/domain";
import { ImageFrame } from "@/components/art/ImageFrame";
import { ProductArt } from "@/components/art/ProductArt";
import { getGlazeById } from "@/lib/selectors";

export function ProductGallery({ product, glazeId }: { product: Product; glazeId: string }) {
  const glaze = getGlazeById(glazeId)?.name ?? "";
  const label = (detail: string) => `Illustration of the ${product.name} in ${glaze}: ${detail}`;
  return (
    <div className="grid gap-4">
      <ImageFrame ratio="square">
        <ProductArt productId={product.id} glazeId={glazeId} label={label("front view")} className="h-full w-full" />
      </ImageFrame>
      <div className="grid grid-cols-2 gap-4">
        <figure>
          <ImageFrame ratio="square">
            <ProductArt productId={product.id} view="top" glazeId={glazeId} label={label("seen from above")} className="h-full w-full" />
          </ImageFrame>
          <figcaption className="mt-2 text-sm text-muted-foreground">From above</figcaption>
        </figure>
        <figure>
          <ImageFrame ratio="square">
            <ProductArt productId={product.id} view="detail" glazeId={glazeId} label={label("close-up of the glaze and texture")} className="h-full w-full" />
          </ImageFrame>
          <figcaption className="mt-2 text-sm text-muted-foreground">Glaze close-up</figcaption>
        </figure>
      </div>
      <p className="text-sm text-muted-foreground">Illustrations, not photographs. Real pieces vary slightly.</p>
    </div>
  );
}
