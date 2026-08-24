"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { PostExtended } from "@/types/post";
import { useMemo } from "react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const FALLBACK_CUSTOMERS = [
  { id: "c1", name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", image: "/images/client-1.png", sector: "Ngân hàng", slug: "" },
  { id: "c2", name: "Tập đoàn Vingroup", image: "/images/client-2.png", sector: "Doanh nghiệp", slug: "" },
  { id: "c3", name: "Tập đoàn Sun Group", image: "/images/client-3.png", sector: "Chủ đầu tư", slug: "" },
  { id: "c4", name: "Quỹ đầu tư Dragon Capital", image: "/images/logo-case.png", sector: "Quỹ đầu tư", slug: "" },
  { id: "c5", name: "Tập đoàn Hòa Phát", image: "/images/logo-kepler.jpg", sector: "Sản xuất", slug: "" },
  { id: "c6", name: "Tập đoàn Masan", image: "/images/logo-no-bg.png", sector: "Thương mại", slug: "" },
];

export default function CustomersSection() {
  const { data: categoriesData } = useGetApiV10Category({ language: "vi" });

  const customerCategoryIds = useMemo(() => {
    const root = (categoriesData?.responseData as CategoryWithChildren[])?.find(
      (cat) => cat.link === "/khach-hang"
    );
    if (!root?.categories) return [];
    return root.categories
      .map((sub) => sub.id)
      .filter(Boolean);
  }, [categoriesData]);

  const { data } = useGetApiV10Post({
    filters: "is_hidden==false",
    pageSize: 20,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
    ...(customerCategoryIds.length > 0 && {
      category_id: customerCategoryIds.join(","),
    }),
  });

  const customers = useMemo(() => {
    const posts = (data?.responseData?.rows as PostExtended[]) || [];
    if (posts.length === 0) return FALLBACK_CUSTOMERS;
    return posts.map((post) => ({
      id: post.id || "",
      name: post.title || "",
      image: getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path, "/seo.png"),
      sector: post.category?.name || "",
      slug: post.slug || "",
    }));
  }, [data]);

  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.5}>
          <div className="mb-6 md:mb-10">
            <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Khách hàng</span>
            <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
              Khách hàng đã đồng hành
            </h2>
            <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
              Những khách hàng tin tưởng và đồng hành cùng Kepler.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            loop
            speed={4000}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            allowTouchMove
            className="!pb-12"
          >
            {customers.map((c) => (
              <SwiperSlide key={c.id} className="!w-[300px]">
                <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[180px]">
                  <div className="relative w-16 h-16 mb-4">
                    <SafeImage
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="64px"
                    />
                  </div>
                  <h3 className="text-[#1a1a1a] text-sm font-serif font-bold leading-tight">
                    {c.name}
                  </h3>
                  <span className="mt-1.5 text-primary text-[10px] font-semibold uppercase tracking-wider">
                    {c.sector}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
