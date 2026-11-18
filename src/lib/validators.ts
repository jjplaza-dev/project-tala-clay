// Hand-written validators. No schema or validation library is used in this project.

/** A pragmatic check: one @, no spaces, a dot in the domain, sensible length. Not a deliverability test. */
export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (email.length < 5 || email.length > 254) return false;
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(email);
}

export interface CheckoutFormValues {
  name: string;
  email: string;
  phone: string;
  country: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postalCode: string;
}

export type CheckoutField = keyof CheckoutFormValues | "delivery" | "payment";
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

interface CheckoutContext {
  /** False when the chosen country is not in a shipping zone. */
  countrySupported: boolean;
  deliverySelected: boolean;
  paymentSelected: boolean;
}

export function validateCheckout(v: CheckoutFormValues, ctx: CheckoutContext): CheckoutErrors {
  const e: CheckoutErrors = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Enter your full name.";
  else if (name.length > 100) e.name = "Please use 100 characters or fewer.";
  if (!isValidEmail(v.email)) e.email = "Enter an email address like name@example.com.";
  if (v.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(v.phone.trim())) e.phone = "Use digits, spaces and + only, for example +63 900 000 0000.";
  if (!ctx.countrySupported) e.country = "Choose a country we ship to.";
  const line1 = v.line1.trim();
  if (line1.length < 3) e.line1 = "Enter your street address.";
  else if (line1.length > 120) e.line1 = "Please use 120 characters or fewer.";
  if (v.line2.trim().length > 120) e.line2 = "Please use 120 characters or fewer.";
  if (!v.city.trim()) e.city = "Enter your city or town.";
  if (!v.region.trim()) e.region = "Enter your province, state or region.";
  const postal = v.postalCode.trim();
  if (!postal) e.postalCode = "Enter your postal code.";
  else if (v.country === "PH" ? !/^\d{4}$/.test(postal) : !/^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$/.test(postal))
    e.postalCode = v.country === "PH" ? "Philippine postal codes have 4 digits." : "Enter a valid postal code.";
  if (!ctx.deliverySelected) e.delivery = "Choose a delivery method.";
  if (!ctx.paymentSelected) e.payment = "Choose how you plan to pay.";
  return e;
}
