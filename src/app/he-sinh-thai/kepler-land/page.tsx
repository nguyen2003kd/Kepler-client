import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitCta from "../shared-sections/unit-cta";
export default function KeplerLandPage() {
  return (
    <main>
      <UnitHero unitKey="kepler-land" />
      <UnitStory unitKey="kepler-land" />
      <UnitCapabilities unitKey="kepler-land" />
      <UnitCta unitKey="kepler-land" />
    </main>
  );
}
