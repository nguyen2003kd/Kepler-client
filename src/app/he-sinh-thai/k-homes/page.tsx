import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitClients from "../shared-sections/unit-clients";
import UnitCta from "../shared-sections/unit-cta";
export default function KHomesPage() {
  return (
    <main>
      <UnitHero unitKey="k-homes" />
      <UnitStory unitKey="k-homes" />
      <UnitCapabilities unitKey="k-homes" />
      <UnitIndustries unitKey="k-homes" />
      <UnitProducts unitKey="k-homes" />
      <UnitClients unitKey="k-homes" />
      <UnitCta unitKey="k-homes" />
    </main>
  );
}
