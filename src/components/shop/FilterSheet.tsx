"use client";

import type { ReactNode } from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function FilterSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" className="h-11 border-field px-4 text-base lg:hidden" />}>
        <SlidersHorizontalIcon aria-hidden strokeWidth={1.5} className="size-4" />
        Filters and sort
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh]">
        <SheetHeader>
          <SheetTitle className="text-lg">Filters and sort</SheetTitle>
          <SheetDescription>Preview of the filter controls.</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-6 pb-8">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
