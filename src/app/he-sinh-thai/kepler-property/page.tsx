import KeplerPropertyHero from "./sections/hero";
import KeplerPropertyCapabilities from "./sections/capabilities";
import KeplerPropertyProcess from "./sections/process";
import KeplerPropertyProjects from "./sections/projects";
import KeplerPropertyCta from "./sections/cta";

export default function KeplerPropertyPage() {
  return <main><KeplerPropertyHero /><KeplerPropertyCapabilities /><KeplerPropertyProcess /><KeplerPropertyProjects /><KeplerPropertyCta /></main>;
}
