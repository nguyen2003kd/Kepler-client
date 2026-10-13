import { constructMetadata } from "@/lib/seo";
import Hero from "./components/hero";
import MotivationsSection from "./components/motivations-section";
import CtaSection from "./components/cta-section";

export const metadata = constructMetadata({
  title: "Tham gia đội ngũ chuyên gia – Hệ sinh thái bất động sản",
  description:
    "Tham gia đội ngũ chuyên gia hệ sinh thái bất động sản Kepler: Network, Opportunity, Personal Brand, Knowledge & Collaboration, Business & Reward — 5 động lực, 5 giá trị dành cho chuyên gia.",
  url: "/tham-gia-doi-ngu-chuyen-gia",
  keywords: [
    "đội ngũ chuyên gia",
    "tham gia chuyên gia",
    "chuyên gia bất động sản",
    "hồ sơ chuyên gia",
    "hệ sinh thái bất động sản",
    "Kepler Group",
  ],
});

export default function ExpertJoinPage() {
  return (
    <div className="bg-white">
      <Hero />
      <MotivationsSection />
      <CtaSection />
    </div>
  );
}
