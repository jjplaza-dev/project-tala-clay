import type { ArtView } from "@/domain";
import { getGlazeById, getImagesForProduct } from "@/lib/selectors";
import { CeramicArt } from "./CeramicArt";

interface ProductArtProps {
  productId: string;
  view?: ArtView;
  /** Overrides the image's default glaze (used when a variant is selected). */
  glazeId?: string;
  label?: string;
  scale?: number;
  className?: string;
}

export function ProductArt({ productId, view = "primary", glazeId, label, scale, className }: ProductArtProps) {
  const images = getImagesForProduct(productId);
  const image = images.find((i) => i.view === view) ?? images[0];
  const glaze = getGlazeById(glazeId ?? image?.glazeId ?? "");
  if (!image || !glaze) return null;
  return (
    <CeramicArt
      artKind={image.artKind}
      glazeHex={glaze.hex}
      textureKind={glaze.textureKind}
      view={image.view}
      scale={scale}
      label={label ?? image.alt}
      className={className}
    />
  );
}
