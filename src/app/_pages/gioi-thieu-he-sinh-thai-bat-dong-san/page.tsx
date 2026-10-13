import { constructMetadata } from "@/lib/seo";
import Hero from "./components/hero";
import IntroSection from "./components/intro-section";
import NetworkSection from "./components/network-section";
import MessageSection from "./components/message-section";
import ValueChainSection from "./components/value-chain-section";
import EcosystemMembersSection from "./components/ecosystem-members-section";
import CtaSection from "./components/cta-section";

export const metadata = constructMetadata({
  title: "Giới thiệu hệ sinh thái bất động sản",
  description:
    "Hệ sinh thái và cộng đồng bất động sản Kepler — nơi kết nối chuyên gia, nhà đầu tư, chủ đầu tư, doanh nghiệp, môi giới, tổ chức tài chính và các đơn vị cung cấp dịch vụ bất động sản. Offline để gặp gỡ, Online để kết nối.",
  url: "/gioi-thieu-he-sinh-thai-bat-dong-san",
  keywords: [
    "hệ sinh thái bất động sản",
    "cộng đồng bất động sản",
    "kết nối nhà đầu tư",
    "chuyên gia bất động sản",
    "cơ hội bất động sản",
    "giải pháp bất động sản",
    "Kepler Group",
  ],
});

export default function EcosystemIntroPage() {
  return (
    <div className="bg-white">
      <Hero />
      <IntroSection />
      <NetworkSection />
      <MessageSection />
      <ValueChainSection />
      <EcosystemMembersSection />
      <CtaSection />
    </div>
  );
}
