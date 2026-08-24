import KeplerPropertyHero from "./sections/hero";
import KeplerPropertyCapabilities from "./sections/capabilities";
import KeplerPropertyProcess from "./sections/process";
import KeplerPropertyProjects from "./sections/projects";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitClients from "../shared-sections/unit-clients";
import KeplerPropertyCta from "./sections/cta";

export default function KeplerPropertyPage() {
  return (
    <main>
      <KeplerPropertyHero />
      <KeplerPropertyCapabilities />
      <KeplerPropertyProcess />
      <KeplerPropertyProjects />
      <UnitIndustries unitKey="kepler-property" />
      <UnitProducts unitKey="kepler-property" />
      <UnitClients unitKey="kepler-property" />
      <KeplerPropertyCta />
    </main>
  );
}
