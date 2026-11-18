"use client";

import { AlertCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCountries } from "@/lib/format";
import { getShippingZones } from "@/lib/selectors";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-terracotta-deep">
      <AlertCircleIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}

/** Errors are shown with an icon and text, not colour alone, and are tied to the input with aria-describedby. */
export function FormField({ id, label, value, onChange, error, type = "text", autoComplete, optional }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 rounded border-field bg-background px-3"
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function CountrySelect({ id, value, onChange, error }: { id: string; value: string; onChange: (value: string) => void; error?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        Country
      </Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="country"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 w-full rounded border border-field bg-background px-3 text-base"
      >
        {getShippingZones().map((zone) => (
          <optgroup key={zone.id} label={zone.name}>
            {zone.countries.map((code) => (
              <option key={code} value={code}>
                {formatCountries([code])}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
