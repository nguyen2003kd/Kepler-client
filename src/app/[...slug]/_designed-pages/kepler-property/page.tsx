import KeplerPropertyHero from "./sections/hero";
import KeplerPropertyCapabilities from "./sections/capabilities";
import KeplerPropertyProcess from "./sections/process";
import UnitIndustries from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-industries";
import UnitProducts from "@/app/[...slug]/_designed-pages/components/ecosystem/unit-products";
import KeplerPropertyCta from "./sections/cta";

export default function KeplerPropertyPage() {
  return (
    <main>
      <KeplerPropertyHero />
      <KeplerPropertyCapabilities />
      <KeplerPropertyProcess />
      <UnitIndustries unitKey="kepler-property" />
      <UnitProducts unitKey="kepler-property" />
      <KeplerPropertyCta />
    </main>
  );
}
