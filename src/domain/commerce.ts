import type {
  CurrencyCode,
  IntegrationStatus,
  Money,
  OrderId,
  OrderStatus,
  PaymentMethodId,
  PaymentProvider,
  RateId,
  StockStatus,
  SubscriptionStatus,
  VariantId,
  ZoneId,
  ZoneKind,
} from "./primitives";

export interface ShippingZone {
  id: ZoneId;
  name: string;
  kind: ZoneKind;
  /** ISO 3166-1 alpha-2 codes, or ["PH"] for domestic. */
  countries: string[];
}

export interface ShippingRate {
  id: RateId;
  zoneId: ZoneId;
  label: string;
  amount: Money;
  isSample: boolean;
}

export interface DeliveryEstimate {
  zoneId: ZoneId;
  minDays: number;
  maxDays: number;
  isSample: boolean;
}

export interface GiftOptions {
  isGift: boolean;
  wrapSelected: boolean;
  cardMessage: string;
  maxLength: number;
  priceAdd: Money;
  isSample: boolean;
}

export interface CartItem {
  variantId: VariantId;
  quantity: number;
  gift?: GiftOptions;
}

/** Totals are always recomputed from fixtures (§7.3); `subtotal` is a snapshot. */
export interface Cart {
  items: CartItem[];
  subtotal: Money;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2. */
  country: string;
}

export interface PaymentMethod {
  id: PaymentMethodId;
  provider: PaymentProvider;
  label: string;
  status: IntegrationStatus;
}

export interface CheckoutDetails {
  contact: ContactDetails;
  address: Address;
  deliveryRateId: RateId;
  paymentMethodId: PaymentMethodId;
}

export interface OrderItem {
  variantId: VariantId;
  productName: string;
  glazeName: string;
  size: string;
  sku: string;
  quantity: number;
  unitPrice: Money;
  stockStatus: StockStatus;
  gift?: GiftOptions;
}

export interface OrderTotals {
  subtotal: Money;
  shipping: Money;
  giftWrap: Money;
  total: Money;
}

export interface Order {
  id: OrderId;
  number: string;
  items: OrderItem[];
  totals: OrderTotals;
  currency: CurrencyCode;
  status: OrderStatus;
  checkout: CheckoutDetails;
  /** ISO 8601. */
  createdAt: string;
}

export interface BackInStockSubscription {
  id: string;
  variantId: VariantId;
  email: string;
  /** ISO 8601. */
  createdAt: string;
  status: SubscriptionStatus;
}
