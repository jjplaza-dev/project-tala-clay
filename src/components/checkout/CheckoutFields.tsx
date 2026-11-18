import { AlertCircleIcon } from "lucide-react";
import type { Address, ContactDetails } from "@/domain";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}

/** Read-only in Phase 2. An `error` shows the invalid state with an icon and text, not colour alone. */
export function Field({ id, label, value, type = "text", autoComplete, error }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        readOnly
        defaultValue={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 rounded border-field bg-background px-3"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm text-terracotta-deep">
          <AlertCircleIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactFields({ contact }: { contact: ContactDetails }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field id="contact-name" label="Full name" value={contact.name} autoComplete="name" />
      <Field id="contact-email" label="Email" value={contact.email} type="email" autoComplete="email" />
      <Field id="contact-phone" label="Phone (optional)" value={contact.phone ?? ""} type="tel" autoComplete="tel" />
    </div>
  );
}

export function AddressFields({ address }: { address: Address }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field id="address-country" label="Country" value="Philippines" autoComplete="country-name" />
      <Field id="address-line1" label="Address" value={address.line1} autoComplete="address-line1" />
      <Field id="address-city" label="City" value={address.city} autoComplete="address-level2" />
      <Field id="address-region" label="Region" value={address.region} autoComplete="address-level1" />
      <Field id="address-postal" label="Postal code" value={address.postalCode} autoComplete="postal-code" />
    </div>
  );
}
