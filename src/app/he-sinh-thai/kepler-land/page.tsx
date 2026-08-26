import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitClients from "../shared-sections/unit-clients";
import UnitCta from "../shared-sections/unit-cta";
export default function KeplerLandPage() {
  return (
    <main>
      <UnitHero unitKey="kepler-land" />
      <UnitStory unitKey="kepler-land" />
      <UnitCapabilities unitKey="kepler-land" />
      <UnitIndustries unitKey="kepler-land" />
      <UnitProducts unitKey="kepler-land" />
      <UnitClients unitKey="kepler-land" />
      <UnitCta unitKey="kepler-land" />
    </main>
  );
}
