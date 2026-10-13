import KeplerPropertyHero from "./sections/hero";
import KeplerPropertyCapabilities from "./sections/capabilities";
import KeplerPropertyProcess from "./sections/process";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
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
