import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitCta from "../shared-sections/unit-cta";
export default function KmcManagementPage() {
  return (
    <main>
      <UnitHero unitKey="kmc-management" />
      <UnitStory unitKey="kmc-management" />
      <UnitCapabilities unitKey="kmc-management" />
      <UnitIndustries unitKey="kmc-management" />
      <UnitProducts unitKey="kmc-management" />
      <UnitCta unitKey="kmc-management" />
    </main>
  );
}
