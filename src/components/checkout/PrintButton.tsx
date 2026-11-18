"use client";

import { PrinterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label = "Print this page" }: { label?: string }) {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()} className="h-11 border-field px-6 text-base">
      <PrinterIcon aria-hidden strokeWidth={1.5} className="size-4" />
      {label}
    </Button>
  );
}
