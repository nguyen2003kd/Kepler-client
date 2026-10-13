import { constructMetadata } from "@/lib/seo";
import AboutHeroDynamic from "../components/about-hero-dynamic";
import AboutMainServicesSection from "../components/about-main-services-section";

export const metadata = constructMetadata({
  title: "Lĩnh vực hoạt động chính",
  description:
    "Các lĩnh vực dịch vụ cốt lõi mà Kepler Group cung cấp — từ định giá, phát triển dự án đến M&A và giải pháp số.",
  url: "/about/main-services",
});

export default function MainServicesPage() {
  return (
    <div className="bg-white">
      <AboutHeroDynamic
        configKeyVi="about-main-services-hero"
        configKeyEn="about-main-services-hero_en"
        fallbackEyebrow="Dịch vụ cốt lõi"
        fallbackTitle="Lĩnh vực hoạt động chính"
        fallbackDescription="Hệ sinh thái tư vấn và dịch vụ bất động sản chuyên nghiệp, đồng hành xuyên suốt vòng đời tài sản."
        fallbackImage="/seo.png"
      />

      <AboutMainServicesSection variant="page" categoryCode="nav-services" />

      {/* Contact CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative rounded-3xl bg-[#DC2626] text-white p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:48px_48px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-sm font-semibold tracking-wider text-red-100 uppercase">
                  Đồng hành cùng Kepler
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                  Kết nối với chúng tôi
                </h2>
                <p className="mt-4 text-red-100 text-lg leading-relaxed">
                  Kepler luôn sẵn sàng đồng hành cùng doanh nghiệp trong mọi
                  giai đoạn phát triển dự án và tối ưu giá trị tài sản.
                </p>
              </div>
              <div className="flex md:justify-end">
                <a
                  href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#DC2626] font-semibold rounded-full hover:bg-gray-100 transition-colors group"
                >
                  Liên hệ tư vấn
                  <svg
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.75L21 12m0 0l-3.75 3.25M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
