import UnitHero from "../shared-sections/unit-hero";
import UnitStory from "../shared-sections/unit-story";
import UnitCapabilities from "../shared-sections/unit-capabilities";
import UnitIndustries from "../shared-sections/unit-industries";
import UnitProducts from "../shared-sections/unit-products";
import UnitClients from "../shared-sections/unit-clients";
import UnitCta from "../shared-sections/unit-cta";
export default function KacAdvisoryPage() {
  return (
    <main>
      <UnitHero unitKey="kac-advisory" />
      <UnitStory unitKey="kac-advisory" />
      <UnitCapabilities unitKey="kac-advisory" />
      <UnitIndustries unitKey="kac-advisory" />
      <UnitProducts unitKey="kac-advisory" />
      <UnitClients unitKey="kac-advisory" />
      <UnitCta unitKey="kac-advisory" />
    </main>
  );
}
