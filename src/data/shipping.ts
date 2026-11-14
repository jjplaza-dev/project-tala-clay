import type { DeliveryEstimate, ShippingRate, ShippingZone } from "@/domain";

// All rates and windows are fictional samples (A3), in centavos (PHP).
export const shippingZones: ShippingZone[] = [
  { id: "zone-ph", name: "Philippines", kind: "domestic", countries: ["PH"] },
  {
    id: "zone-apac",
    name: "Asia-Pacific",
    kind: "international",
    countries: ["SG", "HK", "JP", "KR", "TW", "MY", "TH", "AU", "NZ"],
  },
  {
    id: "zone-west",
    name: "North America and Europe",
    kind: "international",
    countries: ["US", "CA", "GB", "IE", "DE", "FR", "NL", "ES", "IT"],
  },
];

export const shippingRates: ShippingRate[] = [
  { id: "rate-ph-standard", zoneId: "zone-ph", label: "Standard delivery", amount: 15000, isSample: true },
  { id: "rate-apac-standard", zoneId: "zone-apac", label: "International standard", amount: 180000, isSample: true },
  { id: "rate-west-standard", zoneId: "zone-west", label: "International standard", amount: 280000, isSample: true },
];

export const deliveryEstimates: DeliveryEstimate[] = [
  { zoneId: "zone-ph", minDays: 2, maxDays: 5, isSample: true },
  { zoneId: "zone-apac", minDays: 7, maxDays: 14, isSample: true },
  { zoneId: "zone-west", minDays: 10, maxDays: 21, isSample: true },
];
