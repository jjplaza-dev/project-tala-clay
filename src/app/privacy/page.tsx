import { LegalPage } from "@/components/content/LegalPage";

const SECTIONS = [
  { title: "What this page is", body: "This page will explain how Tala Clay Studio handles your information. The wording below is a placeholder for the studio to complete." },
  { title: "Information we may collect", body: "Details you give us when you order or write to us, such as your name, email address, delivery address and message." },
  { title: "How we may use it", body: "To prepare and deliver orders, to answer your questions and, if you ask, to tell you when a sold-out piece is back in stock." },
  { title: "Payments", body: "Card and PayPal payments are planned to be handled by Stripe and PayPal. We do not plan to store card numbers on this site." },
  { title: "Chat and messages", body: "We may offer chat through Crisp and Facebook Messenger. Their own privacy terms apply when you use them." },
  { title: "Storage on your device", body: "This site may keep your cart and back-in-stock requests on your own device using browser storage." },
  { title: "Your choices", body: "Contact the studio if you would like to ask about, correct or remove information you have given us." },
];

export default function PrivacyPage() {
  return <LegalPage id="privacy-title" title="Privacy" intro="How we plan to treat the information you share with us." sections={SECTIONS} />;
}
