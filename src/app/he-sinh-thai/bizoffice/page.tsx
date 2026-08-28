import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitCta from "../shared-sections/unit-cta";
export default function BizOfficePage() {
  return (
    <main>
      <UnitHero unitKey="bizoffice" />
      <UnitStory unitKey="bizoffice" />
      <UnitCapabilities unitKey="bizoffice" />
      <UnitIndustries unitKey="bizoffice" />
      <UnitProducts unitKey="bizoffice" />
      <UnitCta unitKey="bizoffice" />
    </main>
  );
}
