import type { NotificationTemplate } from "@/domain";

// Visual previews only. Email delivery is NOT CONFIGURED.
export const notificationTemplates: NotificationTemplate[] = [
  {
    id: "tpl-order-confirmation",
    kind: "order_confirmation",
    subject: "Thank you for your order from Tala Clay Studio",
    bodyBlocks: [
      { type: "heading", text: "Thank you for your order" },
      { type: "paragraph", text: "We have received your order and will start preparing it soon." },
      { type: "summary" },
      { type: "list", items: ["Ready-to-ship pieces are packed first.", "Made-to-order pieces are made after your order, so they ship later."] },
      { type: "note", text: "Sample email. No email is sent from this site yet." },
    ],
  },
  {
    id: "tpl-back-in-stock",
    kind: "back_in_stock",
    subject: "A piece you wanted is back at Tala Clay Studio",
    bodyBlocks: [
      { type: "heading", text: "Back in stock" },
      { type: "paragraph", text: "The piece you asked about is available again, in limited numbers." },
      { type: "note", text: "Sample email. No email is sent from this site yet." },
    ],
  },
];
