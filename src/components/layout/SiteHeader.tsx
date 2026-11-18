import Link from "next/link";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";
import { primaryNav } from "@/config/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MainNav } from "./MainNav";
import { MobileNavSheet } from "./MobileNavSheet";
import { PageContainer } from "./PageContainer";
import { StudioMark } from "./StudioMark";

const iconLink = cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-11");

// Search is a link to the /shop search entry and cart is a link to /cart in this static phase.
export function SiteHeader() {
  return (
    <header className="paper border-b border-line">
      <PageContainer className="flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-2">
          <MobileNavSheet items={primaryNav} />
          <Link href="/" aria-label="Tala Clay Studio, home" className="inline-flex min-h-11 items-center gap-3">
            <StudioMark className="text-terracotta" />
            <span className="flex flex-col leading-none">
              <span className="text-[1.65rem] font-semibold tracking-tight">Tala</span>
              <span className="mt-1 text-[0.6875rem] font-semibold tracking-[0.2em] uppercase">Clay Studio</span>
            </span>
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
