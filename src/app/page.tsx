import { CareWholesaleBand } from "@/components/home/CareWholesaleBand";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { GiftPackagingFeature } from "@/components/home/GiftPackagingFeature";
import { HeroFeatured } from "@/components/home/HeroFeatured";
import { MadeByHand } from "@/components/home/MadeByHand";
import { ReadyToShipGrid } from "@/components/home/ReadyToShipGrid";
import { ShipVsMadeExplainer } from "@/components/home/ShipVsMadeExplainer";

export default function HomePage() {
  return (
    <>
      <HeroFeatured />
      <ReadyToShipGrid />
      <CategoryShowcase />
      <MadeByHand />
      <ShipVsMadeExplainer />
      <GiftPackagingFeature />
      <CareWholesaleBand />
    </>
  );
}
