import { defaultGiftOptions, sampleGiftMessage } from "@/data/gift";
import { formatMoney } from "@/lib/format";
import { Textarea } from "@/components/ui/textarea";

/** Static in Phase 2. Controls are disabled and nothing is saved. */
export function GiftPanel({ idPrefix = "gift" }: { idPrefix?: string }) {
  const { priceAdd, maxLength } = defaultGiftOptions;
  return (
    <section aria-labelledby={`${idPrefix}-title`} className="rounded border border-line bg-oat-deep p-5">
      <h2 id={`${idPrefix}-title`} className="text-lg font-semibold">
        Gift-ready
      </h2>
      <label className="mt-3 flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" disabled className="mt-1 size-5 shrink-0" />
        <span>
          Add gift wrap and a message card <span className="text-spec">+{formatMoney(priceAdd)}</span> (sample price)
        </span>
      </label>
      <div className="mt-4">
        <label htmlFor={`${idPrefix}-message`} className="mb-2 block text-sm font-medium">
          Message card
        </label>
        <Textarea
          id={`${idPrefix}-message`}
          disabled
          rows={3}
          maxLength={maxLength}
          placeholder="Write a short note"
          className="rounded border-field bg-background"
        />
        <p className="text-spec mt-1 text-right text-muted-foreground">0 / {maxLength}</p>
      </div>
      <figure aria-label="Sample message card" className="mt-3 rounded border border-line bg-background p-4">
        <div className="h-2 w-16 border border-charcoal bg-ochre" aria-hidden />
        <blockquote className="mt-3 text-sm leading-snug">{sampleGiftMessage}</blockquote>
        <figcaption className="text-label mt-2 text-muted-foreground">Sample card</figcaption>
      </figure>
      <p className="mt-3 text-sm text-muted-foreground">Preview: gift options turn on in Phase 4.</p>
    </section>
  );
}
