import type { GiftOptions } from "@/domain";

// Sample wrap price (A3), in centavos.
export const defaultGiftOptions: GiftOptions = {
  isGift: false,
  wrapSelected: false,
  cardMessage: "",
  maxLength: 160,
  priceAdd: 15000,
  isSample: true,
};

export const sampleGiftMessage = "Happy housewarming! We hope these see a lot of use.";
