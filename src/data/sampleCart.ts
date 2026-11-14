import type { Cart } from "@/domain";
import { defaultGiftOptions, sampleGiftMessage } from "./gift";

// Subtotal snapshot: 2 x Morning Mug (98,000) + 1 x Hearth Bowl Medium (126,000) = 322,000 centavos.
export const sampleCart: Cart = {
  items: [
    { variantId: "var-mug-mrn-bs-std", quantity: 2 },
    {
      variantId: "var-bwl-hrt-bs-med",
      quantity: 1,
      gift: { ...defaultGiftOptions, isGift: true, wrapSelected: true, cardMessage: sampleGiftMessage },
    },
  ],
  subtotal: 322000,
};

export const emptyCart: Cart = { items: [], subtotal: 0 };
