import UnitHero from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import UnitCta from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-cta";
export default function KHomesPage() {
  return (
    <main>
      <UnitHero unitKey="k-homes" />
      <UnitStory unitKey="k-homes" />
      <UnitCapabilities unitKey="k-homes" />
      <UnitIndustries unitKey="k-homes" />
      <UnitProducts unitKey="k-homes" />
      <UnitCta unitKey="k-homes" />
    </main>
  );
}
