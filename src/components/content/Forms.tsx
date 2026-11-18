import { CheckIcon } from "lucide-react";
import { Field } from "@/components/checkout/CheckoutFields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactTopics } from "@/data/wholesale";
import { getCategories } from "@/lib/selectors";

// Static in Phase 2: every control is disabled. Nothing is validated, sent or stored.

function TextField({ id, label, type = "text", autoComplete }: { id: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</Label>
      <Input id={id} type={type} disabled autoComplete={autoComplete} className="h-11 rounded border-field bg-background px-3" />
    </div>
  );
}

function MessageField({ id, label }: { id: string; label: string }) {
  return (
    <div className="sm:col-span-2">
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</Label>
      <Textarea id={id} disabled rows={5} className="rounded border-field bg-background" />
    </div>
  );
}

const note = "Preview: this form turns on in Phase 6. Sending is not configured, so you will be offered a message to copy.";

export function InquiryForm() {
  return (
    <form aria-labelledby="inquiry-title" className="grid gap-4 sm:grid-cols-2" onSubmit={undefined}>
      <h2 id="inquiry-title" className="text-2xl font-semibold sm:col-span-2">Wholesale inquiry</h2>
      <TextField id="inq-name" label="Your name" autoComplete="name" />
      <TextField id="inq-business" label="Business name" autoComplete="organization" />
      <TextField id="inq-location" label="Location" autoComplete="address-level2" />
      <TextField id="inq-email" label="Email" type="email" autoComplete="email" />
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">What interests you?</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {getCategories().map((c) => (
            <label key={c.id} className="flex min-h-11 items-center gap-2 text-sm">
              <input type="checkbox" disabled className="size-5" />
              {c.name}
            </label>
          ))}
        </div>
      </fieldset>
      <MessageField id="inq-message" label="Tell us about your shop" />
      <div className="sm:col-span-2">
        <Button type="button" disabled className="h-11 px-6 text-base">Send inquiry (preview)</Button>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <form aria-labelledby="contact-form-title" className="grid gap-4 sm:grid-cols-2">
      <h2 id="contact-form-title" className="text-2xl font-semibold sm:col-span-2">Send us a message</h2>
      <TextField id="msg-name" label="Your name" autoComplete="name" />
      <TextField id="msg-email" label="Email" type="email" autoComplete="email" />
      <div className="sm:col-span-2">
        <Label htmlFor="msg-topic" className="mb-2 block text-sm font-medium">Topic</Label>
        <select id="msg-topic" disabled className="h-11 w-full rounded border border-field bg-background px-3 text-base">
          {contactTopics.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <MessageField id="msg-message" label="Message" />
      <div className="sm:col-span-2">
        <Button type="button" disabled className="h-11 px-6 text-base">Send message (preview)</Button>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      </div>
    </form>
  );
}

/** Static pictures of the error and success states. Nothing here was sent. */
export function FormStatePreviews() {
  return (
    <>
      <div className="rounded border border-line bg-background p-6">
        <p className="text-label mb-4 text-muted-foreground">Error state (preview)</p>
        <Field id="state-email" label="Email" value="shop@" type="email" error="Enter an email address like name@example.com." />
      </div>
      <div className="rounded border border-line bg-background p-6">
        <p className="text-label mb-4 text-muted-foreground">Prepared message (preview)</p>
        <p className="flex items-start gap-2 text-sm text-olive-deep">
          <CheckIcon aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
          Your message is ready, but it was not sent because delivery is not configured. Copy it and email it to the studio.
        </p>
        <Button type="button" variant="outline" disabled className="mt-4 h-11 border-field px-4">Copy message (preview)</Button>
      </div>
    </>
  );
}
