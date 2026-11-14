import type { PaymentMethod } from "@/domain";

// Preview only in Phase 2. No domestic method was selected (A2): NOT CONFIGURED.
export const paymentMethods: PaymentMethod[] = [
  { id: "pay-stripe", provider: "stripe", label: "Card (via Stripe)", status: "preview" },
  { id: "pay-paypal", provider: "paypal", label: "PayPal", status: "preview" },
  {
    id: "pay-ph-local",
    provider: "ph_local_unconfigured",
    label: "Philippines payment method (not configured)",
    status: "unconfigured",
  },
];
