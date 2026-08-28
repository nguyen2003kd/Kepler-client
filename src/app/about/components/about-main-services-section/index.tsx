"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useGetApiV10Category } from "@/api/endpoints/category";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { FadeIn } from "@/components/ui/fade-in";
import {
  BarChart3,
  Building2,
  FileSearch,
  Handshake,
  Landmark,
  LineChart,
  Settings2,
  Briefcase,
} from "lucide-react";

type IconType = typeof FileSearch;

interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  icon_url?: string | null;
  icon: IconType;
}

const ICON_MAP: Record<string, IconType> = {
  "nav-services-dev": Building2,
  "nav-services-appraisal": FileSearch,
  "nav-services-mgmt": Settings2,
  "nav-services-ma": Handshake,
  "nav-services-other": Landmark,
  "nav-services-digital": LineChart,
  "nav-services-advisory": BarChart3,
};

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "nav-services-dev":
    "Khảo sát cơ hội, phân tích tiềm năng, chiến lược phát triển và kế hoạch kinh doanh BĐS.",
  "nav-services-appraisal":
    "Thẩm định giá BĐS, máy móc thiết bị, dự án, doanh nghiệp và tài sản vô hình.",
  "nav-services-mgmt":
    "Đánh giá tình trạng, theo dõi vận hành, doanh thu, chi phí, đề xuất cải thiện giá trị tài sản.",
  "nav-services-ma":
    "Tư vấn tìm kiếm, đánh giá, đàm phán và hoàn tất giao dịch M&A BĐS.",
  "nav-services-other":
    "Tư vấn mua, bán, cho thuê, đầu tư và khai thác BĐS cho cá nhân/doanh nghiệp.",
  "nav-services-digital":
    "Số hóa thông tin tài sản, kiểm soát dữ liệu, kết nối chủ sở hữu-người thuê-khách hàng.",
  "nav-services-advisory":
    "Kết nối doanh nghiệp/chủ đầu tư với hội đồng cố vấn và chuyên gia đa lĩnh vực.",
};

function stripHtml(html?: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

function findCategoryByCode(
  categories: CategoryWithChildren[],
  code: string
): CategoryWithChildren | undefined {
  for (const cat of categories) {
    if (cat.code === code) return cat;
    if (cat.categories) {
      const found = findCategoryByCode(cat.categories, code);
      if (found) return found;
    }
  }
  return undefined;
}

interface AboutMainServicesSectionProps {
  variant?: "section" | "page";
  categoryCode?: string;
}

export default function AboutMainServicesSection({
  variant = "section",
  categoryCode = "nav-services",
}: AboutMainServicesSectionProps) {
  const { data: categoriesData } = useGetApiV10Category(
    { language: "vi" },
    { query: { enabled: !!categoryCode, staleTime: 1000 * 60 * 5 } }
  );

  const services: ServiceItem[] = useMemo(() => {
    const allCats =
      (categoriesData?.responseData as CategoryWithChildren[]) || [];
    const parent = findCategoryByCode(allCats, categoryCode);
    if (!parent?.categories || parent.categories.length === 0) return [];

    return parent.categories
      .filter((c): c is CategoryWithChildren & { id: string } => !!c.id)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((cat) => ({
        id: cat.id,
        title: cat.name || "",
        summary:
          stripHtml(cat.description) ||
          FALLBACK_DESCRIPTIONS[cat.code || ""] ||
          "",
        link: cat.link || `/services/${cat.code}`,
        icon_url: cat.icon_url,
        icon: ICON_MAP[cat.code || ""] || Briefcase,
      }));
  }, [categoriesData, categoryCode]);

  if (variant === "section") {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <FadeIn className="lg:col-span-5" direction="right">
              <div className="lg:sticky lg:top-8">
                <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
                  Dịch vụ cốt lõi
                </span>
                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Lĩnh vực hoạt động chính
                </h2>
                <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
                <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                  Hệ sinh thái tư vấn và dịch vụ bất động sản khép kín, đồng
                  hành xuyên suốt vòng đời tài sản.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-7" delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-5">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <FadeIn key={service.id} delay={0.05 + idx * 0.05}>
                      <Link
                        href={service.link}
                        className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-5">
                          {service.icon_url ? (
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-red-50 flex items-center justify-center shrink-0">
                              <img
                                src={service.icon_url}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shrink-0 group-hover:from-[#DC2626] group-hover:to-red-700 transition-all duration-300">
                              <Icon className="h-7 w-7 text-[#DC2626] group-hover:text-white transition-colors duration-300" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#DC2626] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mt-auto">
                          {service.summary}
                        </p>
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={idx * 0.05}>
                <Link
                  href={service.link}
                  className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {service.icon_url ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 mb-5 shrink-0">
                      <img
                        src={service.icon_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-5 shrink-0 group-hover:from-[#DC2626] group-hover:to-red-700 transition-all duration-300">
                      <Icon className="h-7 w-7 text-[#DC2626] group-hover:text-white transition-colors duration-300" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#DC2626] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mt-auto">
                    {service.summary}
                  </p>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
