import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

/** The last crumb is the current page and is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-terracotta-deep">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium">
                {item.label}
              </span>
            )}
            {i < items.length - 1 ? <ChevronRightIcon aria-hidden strokeWidth={1.5} className="size-4 text-muted-foreground" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
