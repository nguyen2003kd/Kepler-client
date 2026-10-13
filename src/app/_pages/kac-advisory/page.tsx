import UnitHero from "@/app/_pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/_pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/_pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/_pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/_pages/components/ecosystem/unit-products";
import UnitCta from "@/app/_pages/components/ecosystem/unit-cta";
export default function KacAdvisoryPage() {
  return (
    <main>
      <UnitHero unitKey="kac-advisory" />
      <UnitStory unitKey="kac-advisory" />
      <UnitCapabilities unitKey="kac-advisory" />
      <UnitIndustries unitKey="kac-advisory" />
      <UnitProducts unitKey="kac-advisory" />
      <UnitCta unitKey="kac-advisory" />
    </main>
  );
}
