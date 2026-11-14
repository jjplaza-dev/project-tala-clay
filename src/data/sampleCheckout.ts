import type { CheckoutDetails } from "@/domain";

// Fictional person and address, for layout only.
export const sampleCheckout: CheckoutDetails = {
  contact: { name: "Sample Customer", email: "customer@example.com", phone: "+63 900 000 0000" },
  address: {
    line1: "123 Sample Street",
    city: "Quezon City",
    region: "Metro Manila",
    postalCode: "1100",
    country: "PH",
  },
  deliveryRateId: "rate-ph-standard",
  paymentMethodId: "pay-stripe",
};
