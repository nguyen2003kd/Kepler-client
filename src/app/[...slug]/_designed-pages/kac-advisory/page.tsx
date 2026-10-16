import UnitHero from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import UnitCta from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-cta";
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
