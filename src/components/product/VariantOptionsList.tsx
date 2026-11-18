import type { Product } from "@/domain";
import { formatMoney } from "@/lib/format";
import { getGlazeById, getVariantPrice, getVariantsForProduct, isLowStock } from "@/lib/selectors";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { BackInStockDialog } from "./BackInStockDialog";

/** Shows every option's own availability, so ready, made-to-order and sold-out states are all visible. */
export function VariantOptionsList({ product }: { product: Product }) {
  const variants = getVariantsForProduct(product.id);
  return (
    <section aria-labelledby="options-title">
      <h2 id="options-title" className="text-2xl font-semibold">
        All options
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="sr-only">Every glaze and size of the {product.name}, with price and availability</caption>
          <thead>
            <tr className="border-b border-line text-muted-foreground">
              <th scope="col" className="py-2 pr-4 font-medium">Glaze</th>
              <th scope="col" className="py-2 pr-4 font-medium">Size</th>
              <th scope="col" className="py-2 pr-4 font-medium">Price</th>
              <th scope="col" className="py-2 pr-4 font-medium">SKU</th>
              <th scope="col" className="py-2 font-medium">Availability</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => {
              const glaze = getGlazeById(v.glazeId);
              return (
                <tr key={v.id} className="border-b border-line align-top">
                  <th scope="row" className="py-3 pr-4 font-medium">{glaze?.name}</th>
                  <td className="py-3 pr-4">{v.size}</td>
                  <td className="text-price py-3 pr-4">{formatMoney(getVariantPrice(product, v), product.currency)}</td>
                  <td className="text-spec py-3 pr-4">{v.sku}</td>
                  <td className="py-3">
                    <div className="grid justify-items-start gap-2">
                      <AvailabilityBadge status={v.stockStatus} leadTimeDays={v.leadTimeDays} lowStock={isLowStock(v)} />
                      {v.stockStatus === "sold_out" ? (
                        <BackInStockDialog
                          size="sm"
                          idPrefix={`opt-${v.id}`}
                          productName={product.name}
                          variantLabel={`${glaze?.name}, ${v.size}`}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Prices, stock and lead times are samples for the studio to replace.</p>
    </section>
  );
}
