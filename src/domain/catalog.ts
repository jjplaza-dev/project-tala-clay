import type {
  ArtKind,
  ArtView,
  CareNoteId,
  CategoryId,
  CurrencyCode,
  GlazeId,
  ImageId,
  ImageKind,
  Money,
  ProductId,
  StockStatus,
  TextureKind,
  VariantId,
} from "./primitives";

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  intro: string;
  artKind: ArtKind;
}

export interface GlazeColor {
  id: GlazeId;
  name: string;
  hex: string;
  finishNote: string;
  textureKind: TextureKind;
  isSample: boolean;
}

export interface Dimensions {
  heightMm: number;
  widthMm: number;
  depthMm?: number;
  capacityMl?: number;
  weightG?: number;
}

/**
 * Rules (§7.3): ready_to_ship => quantityAvailable >= 1;
 * made_to_order => leadTimeDays set; sold_out => quantityAvailable 0.
 */
export interface ProductVariant {
  id: VariantId;
  productId: ProductId;
  glazeId: GlazeId;
  size: string;
  dimensions: Dimensions;
  priceDelta: Money;
  sku: string;
  stockStatus: StockStatus;
  quantityAvailable?: number;
  leadTimeDays?: number;
  isSample: boolean;
}

/** `artKind` is the always-valid SVG fallback; `src` is optional user photography. */
export interface ProductImage {
  id: ImageId;
  productId: ProductId;
  kind: ImageKind;
  artKind: ArtKind;
  view: ArtView;
  src?: string;
  alt: string;
  glazeId?: GlazeId;
}

export interface Product {
  id: ProductId;
  slug: string;
  name: string;
  categoryId: CategoryId;
  summary: string;
  description: string;
  basePrice: Money;
  currency: CurrencyCode;
  madeBatchNote: string;
  careNoteIds: CareNoteId[];
  isFeatured: boolean;
  isSample: boolean;
}

export type CareAppliesTo =
  | { kind: "category"; categoryId: CategoryId }
  | { kind: "product"; productId: ProductId };

export interface CareNote {
  id: CareNoteId;
  title: string;
  body: string;
  appliesTo: CareAppliesTo;
  isSample: boolean;
}

export interface CareGuideSection {
  id: string;
  title: string;
  steps: string[];
  dos: string[];
  donts: string[];
  categoryId?: CategoryId;
  isSample: boolean;
}
