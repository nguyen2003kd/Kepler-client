import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitCta from "../shared-sections/unit-cta";
export default function KpcAppraisalPage() {
  return (
    <main>
      <UnitHero unitKey="kpc-appraisal" />
      <UnitStory unitKey="kpc-appraisal" />
      <UnitCapabilities unitKey="kpc-appraisal" />
      <UnitIndustries unitKey="kpc-appraisal" />
      <UnitProducts unitKey="kpc-appraisal" />
      <UnitCta unitKey="kpc-appraisal" />
    </main>
  );
}
