import type { FAQItem } from "@/domain";

// Draft answers for the studio to confirm. Timings and policies are sample values (A3).
export const faqItems: FAQItem[] = [
  { id: "faq-order-1", group: "ordering", question: "How do I place an order?",
    answer: "Choose a piece, pick a glaze and size, add it to your cart and check out. You will see a summary before you confirm." },
  { id: "faq-order-2", group: "ordering", question: "Will my piece look exactly like the picture?",
    answer: "Close, but not identical. Our product images are illustrations, and each real piece varies slightly in shape, texture and glaze." },
  { id: "faq-mto-1", group: "made-to-order", question: "What does made to order mean?",
    answer: "We make the piece after you order it. The product page shows an estimated lead time before shipping, which is a sample value for now." },
  { id: "faq-mto-2", group: "made-to-order", question: "Can I mix ready-to-ship and made-to-order pieces?",
    answer: "Yes. Your cart will note which pieces are ready and which are being made, so you know what to expect." },
  { id: "faq-gift-1", group: "gifts", question: "Can you wrap my order as a gift?",
    answer: "Yes. Choose gift wrap on the product page or in your cart. The wrap price shown is a sample." },
  { id: "faq-gift-2", group: "gifts", question: "Can I include a message card?",
    answer: "Yes, a short handwritten-style card, up to 160 characters." },
  { id: "faq-ship-1", group: "shipping", question: "Do you ship outside the Philippines?",
    answer: "Yes. International zones and sample delivery windows are on the Shipping page." },
  { id: "faq-ship-2", group: "shipping", question: "What if my piece arrives damaged?",
    answer: "Please photograph it and contact us. Our returns text is a draft for the studio to confirm." },
  { id: "faq-care-1", group: "care", question: "Can I put my pieces in the dishwasher?",
    answer: "We recommend washing by hand. Please confirm suitability for your glaze with the studio. See the Care Guide for general guidance." },
  { id: "faq-care-2", group: "care", question: "How do I clean a planter?",
    answer: "Wipe the outside with a damp cloth and empty any standing water from the saucer." },
  { id: "faq-wholesale-1", group: "wholesale", question: "Do you work with shops and stockists?",
    answer: "We are happy to hear from retailers. Send an inquiry from the Wholesale page." },
  { id: "faq-wholesale-2", group: "wholesale", question: "Is there a minimum order for retailers?",
    answer: "To be confirmed by the studio. Tell us what you have in mind in your inquiry." },
];
