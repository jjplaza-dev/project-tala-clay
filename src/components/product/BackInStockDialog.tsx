"use client";

import { useState } from "react";
import { AlertCircleIcon, BellIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { localBackInStockStore } from "@/lib/backInStock";
import { isValidEmail } from "@/lib/validators";

interface BackInStockDialogProps {
  variantId: string;
  productName: string;
  /** e.g. "Moss, Standard" */
  variantLabel: string;
  /** Unique per instance so ids do not collide. */
  idPrefix: string;
  size?: "default" | "sm";
}

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "success"; alreadySaved: boolean };

export function BackInStockDialog({ variantId, productName, variantLabel, idPrefix, size = "default" }: BackInStockDialogProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) return setStatus({ kind: "error", message: "Enter an email address like name@example.com." });
    if (!consent) return setStatus({ kind: "error", message: "Please tick the box so we know you agree." });
    const result = localBackInStockStore.add(variantId, email);
    if (result.ok) return setStatus({ kind: "success", alreadySaved: result.alreadySaved });
    setStatus({
      kind: "error",
      message: result.reason === "invalid_email" ? "Enter an email address like name@example.com." : "Your browser would not let us save this request. Please check its privacy settings and try again.",
    });
  }

  const errorId = `${idPrefix}-error`;
  return (
    <Dialog onOpenChange={(open) => open && setStatus({ kind: "idle" })}>
      <DialogTrigger
        render={
          <Button variant="outline" size={size === "sm" ? "sm" : "lg"} className={size === "sm" ? "h-11 border-field px-3" : "h-11 border-field px-6 text-base"} />
        }
      >
        <BellIcon aria-hidden strokeWidth={1.5} className="size-4" />
        Tell me when it is back
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Back-in-stock alert</DialogTitle>
          <DialogDescription>
            {productName} ({variantLabel}) is sold out. Leave your email and we will note that you want to hear if it returns.
          </DialogDescription>
        </DialogHeader>
        {status.kind === "success" ? (
          <div role="status" className="grid gap-3 text-sm leading-relaxed">
            <p className="flex items-start gap-2 text-olive-deep">
              <CheckIcon aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
              {status.alreadySaved ? "You had already asked about this piece. Your request is still saved on this device." : "Your request is saved on this device."}
            </p>
            <p className="text-muted-foreground">No email will be sent yet: email delivery is not configured for this site.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="grid gap-4">
            <div>
              <Label htmlFor={`${idPrefix}-email`} className="mb-2 block text-sm font-medium">
                Email address
              </Label>
              <Input
                id={`${idPrefix}-email`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={status.kind === "error" ? true : undefined}
                aria-describedby={status.kind === "error" ? errorId : undefined}
                className="h-11 rounded border-field bg-background px-3"
              />
            </div>
            <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-5 shrink-0" />
              I agree to be contacted once about this piece. Draft wording for the studio to confirm.
            </label>
            {status.kind === "error" ? (
              <p id={errorId} role="alert" className="flex items-start gap-2 text-sm text-terracotta-deep">
                <AlertCircleIcon aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0" />
                {status.message}
              </p>
            ) : null}
            <Button type="submit" className="h-11 px-6 text-base">
              Save my request
            </Button>
            <p className="text-sm text-muted-foreground">
              Your request is kept in this browser only. Email delivery is not configured, so nothing will be sent yet.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
