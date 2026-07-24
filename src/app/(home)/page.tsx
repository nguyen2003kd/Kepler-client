import { constructMetadata } from "@/lib/seo";
import HeroSection from "./_views/hero-section";
import HomeContent from "./_views/home-content";

export const metadata = constructMetadata({
  title: "Kepler Property - Nền tảng BĐS chuyên nghiệp hàng đầu Việt Nam",
  description:
    "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",
  url: "/",
});

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <HomeContent />
    </div>
  );
}
