import UnitHero from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import UnitCta from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-cta";
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
