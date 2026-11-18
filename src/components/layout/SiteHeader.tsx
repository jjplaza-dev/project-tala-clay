import Link from "next/link";
import { primaryNav } from "@/config/nav";
import { MiniCart } from "@/components/cart/MiniCart";
import { SearchDialog } from "@/components/shop/SearchDialog";
import { MainNav } from "./MainNav";
import { MobileNavSheet } from "./MobileNavSheet";
import { PageContainer } from "./PageContainer";
import { StudioMark } from "./StudioMark";

// Search and the cart open live dialogs: search (Phase 3) and the mini-cart (Phase 4).
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
          <SearchDialog />
          <MiniCart />
        </div>
      </PageContainer>
    </header>
  );
}
