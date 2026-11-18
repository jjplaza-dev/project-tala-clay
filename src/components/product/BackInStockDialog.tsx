"use client";

import { AlertCircleIcon, BellIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BackInStockDialogProps {
  productName: string;
  /** e.g. "Moss, Standard" */
  variantLabel: string;
  /** Unique per instance so label ids do not collide. */
  idPrefix: string;
  size?: "default" | "sm";
}

export function BackInStockDialog({ productName, variantLabel, idPrefix, size = "default" }: BackInStockDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size={size === "sm" ? "sm" : "lg"}
            className={size === "sm" ? "h-11 border-field px-3" : "h-11 border-field px-6 text-base"}
          />
        }
      >
        <BellIcon aria-hidden strokeWidth={1.5} className="size-4" />
        Tell me when it is back
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Back-in-stock alert</DialogTitle>
          <DialogDescription>
            {productName} ({variantLabel}) is sold out. Leave your email and we will tell you if it returns.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div>
            <Label htmlFor={`${idPrefix}-email`} className="mb-2 block text-sm font-medium">
              Email address
            </Label>
            <Input id={`${idPrefix}-email`} type="email" disabled placeholder="you@example.com" className="h-11 rounded border-field bg-background px-3" />
          </div>
          <label className="flex items-start gap-3 text-sm leading-relaxed">
            <input type="checkbox" disabled className="mt-1 size-5 shrink-0" />
            I agree to receive one email about this piece. Draft wording for the studio to confirm.
          </label>
          <Button type="button" disabled className="h-11 px-6 text-base">
            Notify me (preview)
          </Button>
          <p className="text-sm text-muted-foreground">
            Preview only. Saving turns on in Phase 3 and is stored on this device. Email delivery is not configured.
          </p>
          <div className="grid gap-2 border-t border-line pt-4 text-sm">
            <p className="text-label">States (preview)</p>
            <p className="flex items-start gap-2 text-olive-deep">
              <CheckIcon aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
              Success: your request is saved on this device. No email is sent yet.
            </p>
            <p className="flex items-start gap-2 text-terracotta-deep">
              <AlertCircleIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
              Error: please enter a valid email address.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
