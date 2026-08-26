"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { PostExtended } from "@/types/post";
import { useMemo } from "react";

import "swiper/css";

const FALLBACK_PARTNERS = [
  { id: "p1", name: "Ngân hàng Vietcombank", logo: "/images/client-1.png", sector: "Ngân hàng", slug: "" },
  { id: "p2", name: "Ngân hàng BIDV", logo: "/images/client-2.png", sector: "Ngân hàng", slug: "" },
  { id: "p3", name: "Ngân hàng Techcombank", logo: "/images/client-3.png", sector: "Ngân hàng", slug: "" },
  { id: "p4", name: "Quỹ đầu tư VinaCapital", logo: "/images/logo-case.png", sector: "Quỹ đầu tư", slug: "" },
  { id: "p5", name: "Công nghệ PropTech Vietnam", logo: "/images/logo-kepler.jpg", sector: "PropTech", slug: "" },
  { id: "p6", name: "Mạng lưới phân phối Savills", logo: "/images/logo-no-bg.png", sector: "Phân phối", slug: "" },
];

export default function PartnersSection() {
  const { data: categoriesData } = useGetApiV10Category({ language: "vi" });

  const partnerCategoryIds = useMemo(() => {
    const root = (categoriesData?.responseData as CategoryWithChildren[])?.find(
      (cat) => cat.link === "/doi-tac-khach-hang"
    );
    if (!root?.categories) return [];
    return root.categories
      .filter((sub) => !sub.link?.includes("khach-hang"))
      .map((sub) => sub.id)
      .filter(Boolean);
  }, [categoriesData]);

  const { data } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      pageSize: 20,
      sortField: "created_at",
      sortOrder: "desc",
      filterBy: "CLIENT",
      ...(partnerCategoryIds.length > 0 && {
        category_id: partnerCategoryIds.join(","),
      }),
    },
    { query: { enabled: partnerCategoryIds.length > 0 } },
  );

  const partners = useMemo(() => {
    const posts = (data?.responseData?.rows as PostExtended[]) || [];
    if (posts.length === 0) return FALLBACK_PARTNERS;
    return posts.map((post) => ({
      id: post.id || "",
      name: post.title || "",
      logo: getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path, "/seo.png"),
      sector: post.category?.name || "",
      slug: post.slug || "",
    }));
  }, [data]);

  const LOOP_PARTNERS = [...partners, ...partners, ...partners];

  if (partners.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Đối tác</span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Đối tác của Kepler
              </h2>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                Mạng lưới đối tác chiến lược đồng hành cùng phát triển.
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView={"auto"}
            loop
            freeMode
            speed={3000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove
            className="!overflow-hidden"
          >
            {LOOP_PARTNERS.map((partner, idx) => (
              <SwiperSlide key={`${partner.id}-${idx}`} className="!w-[200px] !mr-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-32 h-32">
                    <SafeImage
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{partner.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
