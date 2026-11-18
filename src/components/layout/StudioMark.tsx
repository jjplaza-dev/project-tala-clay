import { cn } from "@/lib/utils";

/** "Tala" means star. A vessel with a four-point star cut through its belly, so the page shows through. */
export function StudioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-9", className)}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M14 5h12v4.2C31 11.5 34 16 34 22c0 8.5-6 14-14 14S6 30.5 6 22c0-6 3-10.5 8-12.8V5ZM20 15.5l2.2 5.3 5.3 2.2-5.3 2.2-2.2 5.3-2.2-5.3-5.3-2.2 5.3-2.2 2.2-5.3Z"
      />
    </svg>
  );
}
