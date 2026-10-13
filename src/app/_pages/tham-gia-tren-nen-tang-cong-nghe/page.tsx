import { constructMetadata } from "@/lib/seo";
import Hero from "./components/hero";
import PlatformFeaturesSection from "./components/platform-features-section";
import CtaSection from "./components/cta-section";

export const metadata = constructMetadata({
  title: "Tham gia trên nền tảng công nghệ – Platform Bất động sản",
  description:
    "Đăng ký tham gia Online trên Platform Bất động sản — kết nối mọi lúc, mọi nơi. Tìm kiếm chuyên gia, khám phá dự án, chia sẻ cơ hội đầu tư, kết nối nguồn vốn và tra cứu dữ liệu thị trường 24/7.",
  url: "/tham-gia-tren-nen-tang-cong-nghe",
  keywords: [
    "platform bất động sản",
    "tham gia online",
    "nền tảng công nghệ bất động sản",
    "Real Hub",
    "kết nối chuyên gia",
    "cơ hội đầu tư bất động sản",
    "Kepler Group",
  ],
});

export default function OnlinePlatformPage() {
  return (
    <div className="bg-white">
      <Hero />
      <PlatformFeaturesSection />
      <CtaSection />
    </div>
  );
}
