import { constructMetadata } from "@/lib/seo";
import Hero from "./components/hero";
import ParticipantsSection from "./components/participants-section";
import CtaSection from "./components/cta-section";

export const metadata = constructMetadata({
  title: "Ai có thể tham gia hệ sinh thái bất động sản",
  description:
    "Nhà đầu tư, chủ đầu tư, doanh nghiệp, chuyên gia, môi giới, ngân hàng – tài chính – quỹ, đơn vị dịch vụ và cư dân — ai cũng có thể tham gia hệ sinh thái và cộng đồng bất động sản Kepler.",
  url: "/ai-co-the-tham-gia",
  keywords: [
    "ai có thể tham gia",
    "hệ sinh thái bất động sản",
    "cộng đồng bất động sản",
    "nhà đầu tư bất động sản",
    "môi giới bất động sản",
    "chuyên gia bất động sản",
    "Kepler Group",
  ],
});

export default function WhoCanJoinPage() {
  return (
    <div className="bg-white">
      <Hero />
      <ParticipantsSection />
      <CtaSection />
    </div>
  );
}
