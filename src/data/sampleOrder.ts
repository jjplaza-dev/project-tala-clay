import type { Order } from "@/domain";
import { defaultGiftOptions, sampleGiftMessage } from "./gift";
import { sampleCheckout } from "./sampleCheckout";

// Totals: subtotal 322,000 + shipping 15,000 + gift wrap 15,000 = 352,000 centavos. Sample only, not paid.
export const sampleOrder: Order = {
  id: "order-sample-0001",
  number: "TCS-SAMPLE-0001",
  items: [
    { variantId: "var-mug-mrn-bs-std", productName: "Morning Mug", glazeName: "Bone Speckle", size: "Standard",
      sku: "MUG-MRN-BS-STD", quantity: 2, unitPrice: 98000, stockStatus: "ready_to_ship" },
    { variantId: "var-bwl-hrt-bs-med", productName: "Hearth Bowl", glazeName: "Bone Speckle", size: "Medium",
      sku: "BWL-HRT-BS-MED", quantity: 1, unitPrice: 126000, stockStatus: "ready_to_ship",
      gift: { ...defaultGiftOptions, isGift: true, wrapSelected: true, cardMessage: sampleGiftMessage } },
  ],
  totals: { subtotal: 322000, shipping: 15000, giftWrap: 15000, total: 352000 },
  currency: "PHP",
  status: "draft",
  checkout: sampleCheckout,
  createdAt: "2026-01-01T00:00:00.000Z",
};
