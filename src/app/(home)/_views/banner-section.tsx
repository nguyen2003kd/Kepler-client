"use client";

import { useGetApiV10Banner } from "@/api/endpoints/banner";
import { Banner } from "@/api/models/banner";
import { File } from "@/api/models/file";
import { getThumbnailSrc } from "@/lib/responsive-image";
// import { ArrowRight } from "lucide-react";
import Image from "@/components/common/safe-image";
// import Link from "next/link";
import * as React from "react";

interface BannerWithFile extends Banner {
  file?: File;
}

// const HERO_CONTENT = [
//   {
//     heading: "Kepler Property",
//     subheading: "Nền tảng BĐS hàng đầu Việt Nam",
//     description:
//       "Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",
//     link: "/apartments-for-sale",
//     linkText: "Xem tin đăng",
//   },
//   {
//     heading: "Dự án nổi bật",
//     subheading: "Vinhomes Grand Park & hơn thế nữa",
//     description:
//       "Khám phá các dự án BĐS chất lượng cao với tiện ích đầy đủ, vị trí đắc địa.",
//     link: "/projects",
//     linkText: "Xem dự án",
//   },
//   {
//     heading: "Tin tức BĐS",
//     subheading: "Cập nhật thị trường mỗi ngày",
//     description:
//       "Theo dõi xu hướng thị trường, quy hoạch và tư vấn đầu tư BĐS mới nhất.",
//     link: "/news",
//     linkText: "Đọc tin tức",
//   },
// ];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const { data } = useGetApiV10Banner({
    filters: "is_active==true",
    sortField: "sort_order",
    sortOrder: "asc",
  });

  const banners = React.useMemo(
    () => (data?.responseData?.rows as BannerWithFile[]) || [],
    [data?.responseData?.rows],
  );

  const autoplayDelay = React.useMemo(() => {
    const delay = banners[0]?.display_time
      ? parseInt(banners[0].display_time, 10)
      : 5000;
    return delay > 0 ? delay : 1000;
  }, [banners]);

  const bannerSlides = React.useMemo(() => {
    if (banners.length === 0) {
      return [{ id: "default", image: "/seo.png", alt: "Banner" }];
    }

    return banners.map((banner) => ({
      id: banner.id || "",
      image: getThumbnailSrc(
        banner.file?.compress_info,
        banner.file?.path,
        "/seo.png",
      ),
      alt: banner.name || "Banner",
    }));
  }, [banners]);

  const totalSlides = bannerSlides.length;

  // Auto-play
  React.useEffect(() => {
    if (!isHovering && totalSlides > 1) {
      timerRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, autoplayDelay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentSlide, isHovering, autoplayDelay, totalSlides]);

  return (
    <section
      className="relative h-[70vh] min-h-[400px] max-h-[500px] overflow-hidden bg-[#1a1a1a] md:h-[90vh] md:min-h-[500px] md:max-h-[800px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      {bannerSlides.map((slide, index) => (
        <div
          key={`${slide.id}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className={
              slide.image === "/seo.png"
                ? "object-contain"
                : "object-cover"
            }
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />



      {/* Slide indicators */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-10 md:gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "h-[2px] w-8 bg-primary md:h-[3px] md:w-12"
                  : "h-[2px] w-2 bg-white/40 hover:bg-white/60 md:h-[3px] md:w-3"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
