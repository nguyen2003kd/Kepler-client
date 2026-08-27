"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { useGetApiV10Category } from "@/api/endpoints/category";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { GetApiV10PostFilterBy } from "@/api/models/getApiV10PostFilterBy";
import { GetApiV10PostPosition } from "@/api/models/getApiV10PostPosition";
import { GetApiV10PostSortOrderPosition } from "@/api/models/getApiV10PostSortOrderPosition";
import { FadeIn } from "@/components/ui/fade-in";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import {
  BarChart3,
  Building2,
  FileSearch,
  Handshake,
  Landmark,
  LineChart,
  Settings2,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  slug: string;
  thumbnail?: string;
  icon: typeof FileSearch;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    id: "s1",
    title: "Tư vấn định giá và thẩm định giá",
    summary:
      "Thẩm định giá bất động sản, máy móc, thiết bị, doanh nghiệp và tài sản vô hình.",
    slug: "tu-van-dinh-gia-va-tham-dinh-gia",
    icon: FileSearch,
  },
  {
    id: "s2",
    title: "Phát triển dự án bất động sản",
    summary:
      "Từ nghiên cứu thị trường, Master Planning đến Product Strategy, Marketing và Sales.",
    slug: "phat-trien-du-an-bat-dong-san",
    icon: Building2,
  },
  {
    id: "s3",
    title: "Quản lý và khai thác tài sản",
    summary:
      "Quản lý tòa nhà, tài sản, kỹ thuật, cộng đồng, bảo trì và vận hành.",
    slug: "quan-ly-va-khai-thac-tai-san",
    icon: Settings2,
  },
  {
    id: "s4",
    title: "Tư vấn và thực hiện M&A",
    summary:
      "Tư vấn bên mua, bên bán xuyên suốt từ Valuation, Due Diligence đến Closing và hậu M&A.",
    slug: "tu-van-va-thuc-hien-ma",
    icon: Handshake,
  },
  {
    id: "s5",
    title: "Tư vấn các dịch vụ bất động sản",
    summary:
      "Tư vấn môi giới, cho thuê, đầu tư và các dịch vụ bất động sản khác.",
    slug: "tu-van-cac-dich-vu-bat-dong-san",
    icon: Landmark,
  },
  {
    id: "s6",
    title: "Giải pháp số bất động sản",
    summary:
      "Giới thiệu giải pháp PropTech và kết nối sang RealHub Platform.",
    slug: "giai-phap-so-bat-dong-san",
    icon: LineChart,
  },
  {
    id: "s7",
    title: "Cho thuê hội đồng cố vấn",
    summary:
      "Cung cấp chuyên gia cố vấn cho các dự án và doanh nghiệp trong lĩnh vực bất động sản.",
    slug: "cho-thue-hoi-dong-co-van",
    icon: BarChart3,
  },
];

const ICON_MAP: Record<string, typeof FileSearch> = {
  "tu-van-dinh-gia-va-tham-dinh-gia": FileSearch,
  "phat-trien-du-an-bat-dong-san": Building2,
  "quan-ly-va-khai-thac-tai-san": Settings2,
  "tu-van-va-thuc-hien-ma": Handshake,
  "tu-van-cac-dich-vu-bat-dong-san": Landmark,
  "giai-phap-so-bat-dong-san": LineChart,
  "cho-thue-hoi-dong-co-van": BarChart3,
};

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

function findCategoryByLink(
  categories: CategoryWithChildren[],
  link: string
): CategoryWithChildren | undefined {
  for (const cat of categories) {
    if (cat.link === link) return cat;
    if (cat.categories) {
      const found = findCategoryByLink(cat.categories, link);
      if (found) return found;
    }
  }
  return undefined;
}

interface AboutMainServicesSectionProps {
  variant?: "section" | "page";
  useFallback?: boolean;
  categoryLink?: string;
}

export default function AboutMainServicesSection({
  variant = "section",
  useFallback = false,
  categoryLink,
}: AboutMainServicesSectionProps) {
  const { data: categoriesData } = useGetApiV10Category(
    { language: "vi" },
    { query: { enabled: !!categoryLink, staleTime: 1000 * 60 * 5 } }
  );

  const categoryIds = useMemo(() => {
    if (!categoryLink) return [];
    const allCats =
      (categoriesData?.responseData as CategoryWithChildren[]) || [];
    const cat = findCategoryByLink(allCats, categoryLink);
    if (!cat) return [];
    if (cat.categories && cat.categories.length > 0) {
      return cat.categories.map((c) => c.id).filter(Boolean);
    }
    return [cat.id].filter(Boolean);
  }, [categoriesData, categoryLink]);

  const postEnabled = useMemo(() => {
    if (useFallback) return false;
    if (categoryLink) return categoryIds.length > 0;
    return true;
  }, [useFallback, categoryLink, categoryIds]);

  const postParams = useMemo(() => {
    if (categoryLink) {
      return {
        category_id: categoryIds.join(","),
        filters: "is_hidden==false",
        pageSize: 20,
        position: GetApiV10PostPosition.true,
        sortOrderPosition: GetApiV10PostSortOrderPosition.ASC,
        filterBy: GetApiV10PostFilterBy.CLIENT,
      };
    }
    return {
      filters: "is_hidden==false , is_service==true",
      pageSize: 20,
      position: GetApiV10PostPosition.true,
      sortOrderPosition: GetApiV10PostSortOrderPosition.ASC,
      filterBy: GetApiV10PostFilterBy.CLIENT,
    };
  }, [categoryLink, categoryIds]);

  const { data: postData } = useGetApiV10Post(postParams, {
    query: {
      enabled: postEnabled,
      staleTime: 1000 * 60 * 5,
    },
  });

  const services: ServiceItem[] = useMemo(() => {
    if (useFallback) return FALLBACK_SERVICES;

    const posts = (postData?.responseData?.rows as PostExtended[]) || [];
    if (posts.length === 0) return FALLBACK_SERVICES;

    return posts.map((post, idx) => ({
      id: post.id || post.slug || post.title || `service-${idx}`,
      title: post.title || "",
      summary: stripHtml(post.summary ?? undefined),
      slug: post.slug || "",
      thumbnail: getThumbnailSrc(
        post.thumbnail_compress_info,
        post.thumbnail_path ?? undefined,
        ""
      ),
      icon: ICON_MAP[post.slug || ""] || LineChart,
    }));
  }, [postData, useFallback]);

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
                        href={`/services/${service.slug}`}
                        className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shrink-0 group-hover:from-[#DC2626] group-hover:to-red-700 transition-all duration-300">
                            <Icon className="h-7 w-7 text-[#DC2626] group-hover:text-white transition-colors duration-300" />
                          </div>
                          {service.thumbnail ? (
                            <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                              <img
                                src={service.thumbnail}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : null}
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
            return (
              <FadeIn key={service.id} delay={idx * 0.05}>
                <Link
                  href={`/about/main-services/${service.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {service.thumbnail ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 mb-5 shrink-0">
                      <img
                        src={service.thumbnail}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}
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
