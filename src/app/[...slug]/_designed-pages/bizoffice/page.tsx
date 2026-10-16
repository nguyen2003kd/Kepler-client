import UnitHero from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import UnitCta from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-cta";
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
