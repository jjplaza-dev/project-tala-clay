import type { CurrencyCode, Dimensions, Money } from "@/domain";

/** Money is integer minor units (centavos). Formatting only; never used for arithmetic. */
export function formatMoney(minor: Money, currency: CurrencyCode = "PHP"): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    minimumFractionDigits: minor % 100 === 0 ? 0 : 2,
  }).format(minor / 100);
}

export function formatDimensions(d: Dimensions): string {
  const parts = [`${d.heightMm} mm high`, `${d.widthMm} mm wide`];
  if (d.depthMm) parts.push(`${d.depthMm} mm deep`);
  if (d.capacityMl) parts.push(`${d.capacityMl} ml`);
  if (d.weightG) parts.push(`${d.weightG} g`);
  return parts.join(" · ");
}

export function formatLeadTime(days: number): string {
  if (days % 7 === 0) {
    const weeks = days / 7;
    return `about ${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  }
  return `about ${days} days`;
}

export function formatDeliveryWindow(minDays: number, maxDays: number): string {
  return minDays === maxDays ? `${minDays} days` : `${minDays}–${maxDays} days`;
}

/** ISO 3166-1 alpha-2 codes to readable country names, via Intl. */
export function formatCountries(codes: string[], locale = "en"): string {
  const names = new Intl.DisplayNames([locale], { type: "region" });
  return codes.map((code) => names.of(code) ?? code).join(", ");
}
