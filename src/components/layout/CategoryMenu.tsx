"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { NavItem } from "@/domain";
import { cn } from "@/lib/utils";

const linkClass =
  "flex min-h-11 items-center rounded px-3 text-[0.9375rem] hover:bg-muted hover:underline underline-offset-4";

/** Desktop "Collections" disclosure. Opens on click; Escape or leaving focus closes it. */
export function CategoryMenu({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const panelId = useId();

  return (
    <li
      ref={ref}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          ref.current?.querySelector("button")?.focus();
        }
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-1 rounded px-3 text-[0.9375rem] font-medium underline-offset-4 hover:underline"
      >
        {label}
        <ChevronDownIcon aria-hidden strokeWidth={1.5} className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <ul id={panelId} className="absolute top-full left-0 z-40 mt-2 w-64 rounded border border-line bg-popover p-2 shadow-lg">
          <li>
            <Link href="/shop" className={linkClass} onClick={() => setOpen(false)}>
              All pieces
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
