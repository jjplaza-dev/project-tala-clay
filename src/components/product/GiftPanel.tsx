"use client";

import type { GiftOptions } from "@/domain";
import { Textarea } from "@/components/ui/textarea";
import { defaultGiftOptions, sampleGiftMessage } from "@/data/gift";
import { formatMoney } from "@/lib/format";

interface GiftPanelProps {
  /** Unique per instance so ids do not collide. */
  idPrefix: string;
  value: GiftOptions;
  onChange: (next: GiftOptions) => void;
  /** Hides the heading when the panel sits inside a labelled region such as a cart line. */
  compact?: boolean;
}

export function GiftPanel({ idPrefix, value, onChange, compact = false }: GiftPanelProps) {
  const { priceAdd, maxLength } = defaultGiftOptions;
  const counterId = `${idPrefix}-counter`;
  const set = (patch: Partial<GiftOptions>) => {
    const next = { ...value, ...patch };
    onChange({ ...next, isGift: next.wrapSelected });
  };

  return (
    <section aria-labelledby={`${idPrefix}-title`} className="rounded border border-line bg-oat-deep p-5">
      {compact ? (
        <h4 id={`${idPrefix}-title`} className="sr-only">
          Gift options
        </h4>
      ) : (
        <h2 id={`${idPrefix}-title`} className="text-lg font-semibold">
          Gift-ready
        </h2>
      )}
      <label className="mt-1 flex min-h-11 items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          checked={value.wrapSelected}
          onChange={(e) => set({ wrapSelected: e.target.checked })}
          className="mt-1 size-5 shrink-0"
        />
        <span>
          Add gift wrap and a message card <span className="text-spec">+{formatMoney(priceAdd)}</span> per piece (sample price)
        </span>
      </label>
      {value.wrapSelected ? (
        <>
          <div className="mt-3">
            <label htmlFor={`${idPrefix}-message`} className="mb-2 block text-sm font-medium">
              Message card (optional)
            </label>
            <Textarea
              id={`${idPrefix}-message`}
              rows={3}
              maxLength={maxLength}
              value={value.cardMessage}
              onChange={(e) => set({ cardMessage: e.target.value })}
              aria-describedby={counterId}
              className="rounded border-field bg-background"
            />
            <p id={counterId} className="text-spec mt-1 text-right text-muted-foreground">
              {value.cardMessage.length} / {maxLength}
            </p>
          </div>
          <figure aria-label="Message card preview" className="mt-3 rounded border border-line bg-background p-4">
            <div className="h-2 w-16 border border-charcoal bg-ochre" aria-hidden />
            <blockquote className="mt-3 text-sm leading-snug">{value.cardMessage.trim() || sampleGiftMessage}</blockquote>
            <figcaption className="text-label mt-2 text-muted-foreground">
              {value.cardMessage.trim() ? "Your card" : "Sample card"}
            </figcaption>
          </figure>
        </>
      ) : null}
    </section>
  );
}
