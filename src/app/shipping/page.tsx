import Link from "next/link";
import { AccordionGroup } from "@/components/content/AccordionGroup";
import { DraftNotice } from "@/components/content/DraftNotice";
import { SectionBand } from "@/components/layout/SectionBand";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { formatCountries, formatDeliveryWindow, formatLeadTime, formatMoney } from "@/lib/format";
import {
  getDeliveryEstimate,
  getGlazeById,
  getProductById,
  getProducts,
  getShippingRates,
  getShippingZones,
  getVariantsForProduct,
} from "@/lib/selectors";

const RETURNS = [
  { id: "damaged", title: "If a piece arrives damaged", body: "Please photograph the piece and its packaging and contact us soon after it arrives. The studio will confirm how replacements or refunds work." },
  { id: "change-of-mind", title: "If you change your mind", body: "Tell us as early as you can. Terms for ready-to-ship pieces will be confirmed by the studio." },
  { id: "made-to-order", title: "Made-to-order pieces", body: "Because these are made for you after you order, the studio will confirm what can be changed once making has begun." },
];

export default function ShippingPage() {
  const madeToOrder = getProducts()
    .flatMap((p) => getVariantsForProduct(p.id))
    .filter((v) => v.stockStatus === "made_to_order");

  return (
    <>
      <SectionBand labelledBy="shipping-title" className="lg:py-20">
        <SectionHeading
          id="shipping-title"
          level={1}
          eyebrow="Shipping and delivery"
          title="How your pieces get to you"
          intro="We ship within the Philippines and to a growing list of countries. Windows and rates below are samples for the studio to replace."
        />
      </SectionBand>

      <SectionBand tone="deep" labelledBy="zones-title">
        <SectionHeading id="zones-title" level={2} title="Where we ship" />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Shipping zones with sample delivery windows and rates</caption>
            <thead>
              <tr className="border-b border-line text-muted-foreground">
                <th scope="col" className="py-2 pr-4 font-medium">Zone</th>
                <th scope="col" className="py-2 pr-4 font-medium">Countries</th>
                <th scope="col" className="py-2 pr-4 font-medium">Delivery window</th>
                <th scope="col" className="py-2 font-medium">Shipping</th>
              </tr>
            </thead>
            <tbody>
              {getShippingZones().map((zone) => {
                const estimate = getDeliveryEstimate(zone.id);
                const rate = getShippingRates(zone.id)[0];
                return (
                  <tr key={zone.id} className="border-b border-line align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{zone.name}</th>
                    <td className="max-w-[28ch] py-3 pr-4">{formatCountries(zone.countries)}</td>
                    <td className="text-spec py-3 pr-4">{estimate ? formatDeliveryWindow(estimate.minDays, estimate.maxDays) : "-"}</td>
                    <td className="text-spec py-3">{rate ? formatMoney(rate.amount) : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <DraftNotice label="Sample values" className="mt-6 max-w-[62ch]">
          Windows and rates are placeholders. Customs, duties and taxes for international orders are not covered here.
        </DraftNotice>
      </SectionBand>

      <SectionBand labelledBy="lead-title">
        <SectionHeading
          id="lead-title"
          level={2}
          title="Made-to-order lead times"
          intro="These pieces are made after you order. The lead time is added before they ship, and the delivery window above applies after that."
        />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <caption className="sr-only">Sample lead times for made-to-order pieces</caption>
            <thead>
              <tr className="border-b border-line text-muted-foreground">
                <th scope="col" className="py-2 pr-4 font-medium">Piece</th>
                <th scope="col" className="py-2 pr-4 font-medium">Glaze and size</th>
                <th scope="col" className="py-2 font-medium">Lead time</th>
              </tr>
            </thead>
            <tbody>
              {madeToOrder.map((v) => (
                <tr key={v.id} className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium">{getProductById(v.productId)?.name}</th>
                  <td className="py-3 pr-4">{getGlazeById(v.glazeId)?.name}, {v.size}</td>
                  <td className="text-spec py-3">{v.leadTimeDays ? formatLeadTime(v.leadTimeDays) : "-"} (sample)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBand>

      <SectionBand tone="deep" labelledBy="packaging-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="packaging-title"
              level={2}
              title="Packaging"
              intro="We wrap each piece in paper and pack it with padding so it can travel. Gift wrap and a message card are optional."
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="mb-4 text-2xl font-semibold">Returns and damage</h2>
            <AccordionGroup items={RETURNS} ariaLabel="Returns and damage" />
            <DraftNotice label="Draft" className="mt-4">
              This text is a draft. The studio will confirm its policies before launch.
            </DraftNotice>
            <p className="mt-6">
              Questions? See the{" "}
              <Link href="/faq" className="underline underline-offset-4 hover:text-terracotta-deep">FAQ</Link> or{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-terracotta-deep">contact the studio</Link>.
            </p>
          </div>
        </div>
      </SectionBand>
    </>
  );
}
