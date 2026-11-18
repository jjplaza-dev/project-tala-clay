import type { NotificationTemplate, Order } from "@/domain";
import { studio } from "@/data/studio";
import { formatMoney } from "@/lib/format";

/** Visual only. No email is sent: email delivery is NOT CONFIGURED. */
export function NotificationPreview({ template, order }: { template: NotificationTemplate; order?: Order }) {
  return (
    <figure aria-label={`Preview of the email: ${template.subject}`} className="rounded border border-line bg-background p-6">
      <p className="text-label mb-4 text-muted-foreground">Email preview (not sent)</p>
      <p className="text-sm">
        <span className="text-muted-foreground">From: </span>
        {studio.name} (sample)
      </p>
      <p className="mt-1 border-b border-line pb-4 text-sm">
        <span className="text-muted-foreground">Subject: </span>
        {template.subject}
      </p>
      <div className="mt-4 grid gap-3 text-sm leading-relaxed">
        {template.bodyBlocks.map((block, i) => {
          if (block.type === "heading") return <h3 key={i} className="text-xl font-semibold">{block.text}</h3>;
          if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
          if (block.type === "note") return <p key={i} className="text-muted-foreground">{block.text}</p>;
          if (block.type === "list")
            return (
              <ul key={i} className="list-disc pl-5">
                {block.items?.map((item) => <li key={item}>{item}</li>)}
              </ul>
            );
          return order ? (
            <p key={i} className="rounded border border-line bg-oat-deep p-3">
              Order <span className="text-spec">{order.number}</span>: {order.items.length} items, total{" "}
              <span className="text-price">{formatMoney(order.totals.total, order.currency)}</span> (sample)
            </p>
          ) : null;
        })}
      </div>
    </figure>
  );
}
