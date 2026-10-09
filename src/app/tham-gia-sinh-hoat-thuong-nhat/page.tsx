import { constructMetadata } from "@/lib/seo";
import Hero from "./components/hero";
import ActivitiesSection from "./components/activities-section";
import JourneySection from "./components/journey-section";
import CtaSection from "./components/cta-section";

export const metadata = constructMetadata({
  title: "Tham gia sinh hoạt thường nhật – Hoạt động Offline Real Hub",
  description:
    "Đăng ký tham gia Offline cùng Real Hub: Gặp gỡ – Chia sẻ – Kết nối – Hợp tác – Giải pháp. Networking, Property Talk, Investment Club, Deal Sharing, Expert Talk, Business Matching, Project Visit, Real Hub Forum.",
  url: "/tham-gia-sinh-hoat-thuong-nhat",
  keywords: [
    "networking bất động sản",
    "Real Hub",
    "hoạt động offline",
    "property talk",
    "investment club",
    "business matching",
    "Kepler Group",
  ],
});

export default function OfflineActivitiesPage() {
  return (
    <div className="bg-white">
      <Hero />
      <ActivitiesSection />
      <JourneySection />
      <CtaSection />
    </div>
  );
}
