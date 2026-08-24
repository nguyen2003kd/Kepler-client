import { constructMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const HeroBanner = dynamic(() => import("./_views/banner-section"), { ssr: true });
const IntroSection = dynamic(() => import("./_views/intro-section"), { ssr: true });
const StatsSection = dynamic(() => import("./_views/stats-section"), { ssr: true });
const EcosystemSection = dynamic(() => import("./_views/ecosystem-section"), { ssr: true });
const ServicesSection = dynamic(() => import("./_views/services-section"), { ssr: true });
const SolutionsSection = dynamic(() => import("./_views/solutions-section"), { ssr: true });
const ProcessSection = dynamic(() => import("./_views/process-section"), { ssr: true });
const NewsSection = dynamic(() => import("./_views/news-section"), { ssr: true });
const CaseStudySection = dynamic(() => import("./_views/case-study-section"), { ssr: true });
const CustomersSection = dynamic(() => import("./_views/customers-section"), { ssr: true });
const PartnersSection = dynamic(() => import("./_views/partners-section"), { ssr: true });
const WhyChooseUsSection = dynamic(() => import("./_views/why-choose-us-section"), { ssr: true });
const CtaSection = dynamic(() => import("./_views/cta-section"), { ssr: true });

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
      {/* <SolutionsSection /> */}

      {/* 7. Section Quy trình làm việc */}
      {/* <ProcessSection /> */}

      {/* 8. Section Thị trường / Tin tức */}
      {/* <NewsSection /> */}

      {/* 9. Section Dự án tiêu biểu */}
      {/* <ProjectsSection /> */}
      <ServicesSection />
      {/* 10. Section Case Study */}
      {/* <CaseStudySection /> */}

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
