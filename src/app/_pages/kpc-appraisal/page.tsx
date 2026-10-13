import UnitHero from "@/app/_pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/_pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/_pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/_pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/_pages/components/ecosystem/unit-products";
import UnitCta from "@/app/_pages/components/ecosystem/unit-cta";
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
