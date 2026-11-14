import Link from "next/link";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import { primaryNav } from "@/config/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MainNav } from "./MainNav";
import { MobileNavSheet } from "./MobileNavSheet";
import { PageContainer } from "./PageContainer";

const iconLink = cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-11");

// Search is a link to the /shop search entry and cart is a link to /cart in this static phase.
export function SiteHeader() {
  return (
    <header className="paper border-b border-line">
      <PageContainer className="flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-2">
          <MobileNavSheet items={primaryNav} />
          <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 text-xl font-semibold tracking-tight">
            <svg viewBox="0 0 32 32" aria-hidden className="size-7 text-terracotta">
              <path d="M4 12h24c0 8-5 14-12 14S4 20 4 12Z" fill="currentColor" />
            </svg>
            Tala Clay Studio
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <MainNav items={primaryNav} />
          <Link href="/shop#search" aria-label="Search the shop" className={iconLink}>
            <SearchIcon aria-hidden strokeWidth={1.5} className="size-5" />
          </Link>
          <Link href="/cart" aria-label="Cart" className={iconLink}>
            <ShoppingBagIcon aria-hidden strokeWidth={1.5} className="size-5" />
          </Link>
        </div>
      </PageContainer>
    </header>
  );
}
