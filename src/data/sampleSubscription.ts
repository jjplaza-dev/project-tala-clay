import type { BackInStockSubscription } from "@/domain";

// Preview record only. Nothing is stored and no email is sent.
export const sampleSubscription: BackInStockSubscription = {
  id: "sub-sample-0001",
  variantId: "var-mug-mrn-mo-std",
  email: "customer@example.com",
  createdAt: "2026-01-01T00:00:00.000Z",
  status: "recorded_locally",
};
