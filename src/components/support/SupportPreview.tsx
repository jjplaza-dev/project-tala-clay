import { MessageCircleIcon, MessagesSquareIcon } from "lucide-react";
import { supportChannels } from "@/data/support";

const ICONS = { crisp: MessageCircleIcon, messenger: MessagesSquareIcon } as const;
const NOTES = {
  crisp: "Opens live chat in Phase 6, once a Crisp Website ID is set.",
  messenger: "Opens a Messenger conversation in Phase 6, once a link is set.",
} as const;

/** Static pictures of the chat launcher and panel. Nothing is connected. */
export function SupportPreview() {
  return (
    <div className="grid gap-6">
      <figure aria-label="Preview of the chat launcher" className="grid gap-3">
        <p className="text-label text-muted-foreground">Launcher (preview)</p>
        <span className="inline-flex min-h-11 w-fit items-center gap-2 rounded border border-charcoal bg-charcoal px-4 text-sm font-medium text-oat">
          <MessageCircleIcon aria-hidden strokeWidth={1.5} className="size-4" />
          Chat with us
        </span>
      </figure>
      <aside aria-label="Preview of the support panel" className="max-w-sm rounded border border-line bg-popover p-5 shadow-lg">
        <p className="text-label mb-3 text-muted-foreground">Support panel (preview)</p>
        <h3 className="text-lg font-semibold">Talk to the studio</h3>
        <p className="mt-1 text-sm">Choose how you would like to reach us.</p>
        <ul className="mt-4 grid gap-3">
          {supportChannels.map((c) => {
            const Icon = ICONS[c.kind];
            return (
              <li key={c.kind} className="flex gap-3 rounded border border-field bg-background p-3 text-sm">
                <Icon aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0" />
                <span>
                  <span className="block font-medium">{c.label}</span>
                  <span className="text-muted-foreground">{NOTES[c.kind]}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
