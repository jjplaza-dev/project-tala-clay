import { LegalPage } from "@/components/content/LegalPage";

const SECTIONS = [
  { title: "About these terms", body: "These terms will describe how ordering from Tala Clay Studio works. The wording below is a placeholder for the studio to complete." },
  { title: "Orders", body: "An order is a request to buy. The studio will confirm how and when an order is accepted." },
  { title: "Prices and availability", body: "Prices are shown in Philippine pesos. The prices, stock and lead times shown during this build are samples and will be replaced." },
  { title: "Handmade variation", body: "Each piece is made by hand in small batches. Shape, texture and glaze vary slightly, and images on this site are illustrations." },
  { title: "Made-to-order pieces", body: "Made-to-order pieces are made after you order. Lead times are estimates and are shown before you buy." },
  { title: "Shipping, returns and damage", body: "See the Shipping page for delivery information. Return and damage terms are drafts for the studio to confirm." },
  { title: "Care", body: "Our care guide is general guidance. Please confirm details for your glaze and firing with the studio." },
  { title: "Changes", body: "The studio may update these terms. The date of the latest version will be shown here." },
];

export default function TermsPage() {
  return <LegalPage id="terms-title" title="Terms" intro="The plain-language terms we plan to publish for ordering." sections={SECTIONS} />;
}
