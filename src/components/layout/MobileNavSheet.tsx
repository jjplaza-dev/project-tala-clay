"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import type { NavItem } from "@/domain";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const rowClass = "flex min-h-11 items-center rounded px-2 text-base font-medium hover:bg-muted";

export function MobileNavSheet({ items }: { items: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label="Open menu" />}
      >
        <MenuIcon aria-hidden strokeWidth={1.5} className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-lg">Menu</SheetTitle>
          <SheetDescription className="sr-only">Browse the shop and studio pages.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-8">
          <ul className="flex flex-col gap-1">
            {items.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <p className="text-label px-2 pt-4 pb-1 text-muted-foreground">{item.label}</p>
                  <ul>
                    <li>
                      <SheetClose render={<Link href="/shop" />} className={rowClass}>
                        All pieces
                      </SheetClose>
                    </li>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <SheetClose render={<Link href={child.href} />} className={rowClass}>
                          {child.label}
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <SheetClose render={<Link href={item.href} />} className={rowClass}>
                    {item.label}
                  </SheetClose>
                </li>
              ),
            )}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
