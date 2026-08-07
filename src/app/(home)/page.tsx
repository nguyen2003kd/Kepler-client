import { constructMetadata } from "@/lib/seo";
import HeroBanner from "./_views/banner-section";
import IntroSection from "./_views/intro-section";
import StatsSection from "./_views/stats-section";
import EcosystemSection from "./_views/ecosystem-section";
import ServicesSection from "./_views/services-section";
import SolutionsSection from "./_views/solutions-section";
import ProcessSection from "./_views/process-section";
import NewsSection from "./_views/news-section";
import ProjectsSection from "./_views/projects-section";
import CaseStudySection from "./_views/case-study-section";
import CustomersSection from "./_views/customers-section";
import PartnersSection from "./_views/partners-section";
import MarketSection from "./_views/market-section";
import WhyChooseUsSection from "./_views/why-choose-us-section";
import CtaSection from "./_views/cta-section";

export const metadata = constructMetadata({
  title: "Kepler Group | Tư vấn đầu tư, Thẩm định giá, Phát triển dự án & Quản lý tài sản",
  description:
    "Kepler Group cung cấp giải pháp toàn diện về tư vấn đầu tư, thẩm định giá, phát triển dự án, quản lý và khai thác tài sản, M&A, thiết kế xây dựng và chuyển đổi số trong lĩnh vực bất động sản.",
  url: "/",
});

export default function Home() {
  return (
    <div className="bg-white">
      {/* 1. Banner / Hero */}
      <HeroBanner />

      {/* 2. Section Giới thiệu */}
      <IntroSection />

      {/* 3. Section Con số nổi bật */}
      <StatsSection />

      {/* 4. Section Hệ sinh thái */}
      <EcosystemSection />

      {/* 5. Section Dịch vụ */}
      {/* <ServicesSection /> */}

      {/* 6. Section Giải pháp theo đối tượng */}
      <SolutionsSection />

      {/* 7. Section Quy trình làm việc */}
      <ProcessSection />

      {/* 8. Section Thị trường / Tin tức */}
      {/* <NewsSection /> */}

      {/* 9. Section Dự án tiêu biểu */}
      {/* <ProjectsSection /> */}
      <ServicesSection />
      {/* 10. Section Case Study */}
      <CaseStudySection />

      {/* 11. Section Khách hàng */}
      <CustomersSection />

      {/* 12. Section Đối tác */}
      <PartnersSection />

      {/* 13. Section Thị trường */}
      {/* <MarketSection /> */}
     <NewsSection />
      {/* 14. Section Tại sao chọn Kepler */}
      <WhyChooseUsSection />

      {/* 10. Section CTA */}
      <CtaSection />
    </div>
  );
}
