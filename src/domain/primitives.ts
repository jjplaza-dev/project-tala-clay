// Canonical primitives. Types only: no data, no logic (PROJECT_PLAN §5.1, §7.1).

export type Id = string;
export type CategoryId = Id;
export type ProductId = Id;
export type VariantId = Id;
export type GlazeId = Id;
export type ImageId = Id;
export type CareNoteId = Id;
export type ZoneId = Id;
export type RateId = Id;
export type PaymentMethodId = Id;
export type OrderId = Id;

/** Integer minor units (centavos). Format only with Intl via lib/format.ts. */
export type Money = number;
export type CurrencyCode = "PHP";

export type StockStatus = "ready_to_ship" | "made_to_order" | "sold_out";
export type ArtKind = "mug" | "bowl" | "plate" | "platter" | "planter";
export type ArtView = "primary" | "top" | "side" | "detail";
export type TextureKind = "speckle" | "satin" | "matte" | "reactive" | "raw";
export type ImageKind = "primary" | "angle" | "detail";
export type ZoneKind = "domestic" | "international";
export type PaymentProvider = "stripe" | "paypal" | "ph_local_unconfigured";
export type IntegrationStatus = "preview" | "unconfigured" | "available";
export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "paid"
  | "preparing"
  | "shipped";
export type SubscriptionStatus = "recorded_locally" | "cancelled";
export type NotificationKind = "order_confirmation" | "back_in_stock";
export type SupportChannelKind = "crisp" | "messenger";
