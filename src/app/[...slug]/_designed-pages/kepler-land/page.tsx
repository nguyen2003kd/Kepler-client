import UnitHero from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-hero";
import UnitStory from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-story";
import UnitCapabilities from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-capabilities";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import UnitCta from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-cta";
export default function KeplerLandPage() {
  return (
    <main>
      <UnitHero unitKey="kepler-land" />
      <UnitStory unitKey="kepler-land" />
      <UnitCapabilities unitKey="kepler-land" />
      <UnitIndustries unitKey="kepler-land" />
      <UnitProducts unitKey="kepler-land" />
      <UnitCta unitKey="kepler-land" />
    </main>
  );
}
