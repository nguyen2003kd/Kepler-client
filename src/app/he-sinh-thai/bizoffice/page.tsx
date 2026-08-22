import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitCta from "../shared-sections/unit-cta";
export default function BizOfficePage() {
  return (
    <main>
      <UnitHero unitKey="bizoffice" />
      <UnitStory unitKey="bizoffice" />
      <UnitCapabilities unitKey="bizoffice" />
      <UnitCta unitKey="bizoffice" />
    </main>
  );
}
