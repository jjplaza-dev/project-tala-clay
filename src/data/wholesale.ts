import type { Stockist } from "@/domain";

// Fictional stockists for layout only (A3). Not real businesses.
export const stockists: Stockist[] = [
  { id: "stk-1", name: "Sample Shelf Goods", city: "Cebu City", note: "Fictional example listing.", isSample: true },
  { id: "stk-2", name: "Example Home Studio", city: "Quezon City", note: "Fictional example listing.", isSample: true },
  { id: "stk-3", name: "Placeholder Provisions", city: "Davao City", note: "Fictional example listing.", isSample: true },
];

// Sample wholesale terms, for the studio to confirm.
export const wholesaleBenefits: string[] = [
  "Pieces made in small batches, so your shelf stays distinctive",
  "Choice of glazes and sizes from the current range",
  "Packing prepared for shipping to shops (details to be confirmed)",
];

export const wholesaleSteps: string[] = [
  "Send us a short inquiry about your shop.",
  "We reply with the current range and terms.",
  "We agree an order, lead time and delivery together.",
];

export const contactTopics: string[] = ["Order help", "A piece I am interested in", "Gifts", "Wholesale", "Something else"];
