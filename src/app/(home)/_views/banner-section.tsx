"use client";

import { useGetApiV10Banner } from "@/api/endpoints/banner";
import { Banner } from "@/api/models/banner";
import { File } from "@/api/models/file";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { ArrowRight } from "lucide-react";
import Image from "@/components/common/safe-image";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

interface BannerWithFile extends Banner {
  file?: File;
}

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
      : 1000;
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
        banner.file?.path ?? banner.img_url,
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

      {/* Hero content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Kiến tạo giá trị bền vững cho Bất động sản và Doanh nghiệp
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
              Kepler Group là hệ sinh thái tư vấn và dịch vụ bất động sản chuyên
              nghiệp, đồng hành cùng doanh nghiệp trong toàn bộ vòng đời tài sản - từ
              nghiên cứu đầu tư, thẩm định giá, phát triển dự án, quản lý vận hành đến
              tối ưu khai thác và gia tăng giá trị.
            </p>

            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/dich-vu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
              >
                Khám phá dịch vụ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dat-lich-tu-van"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

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
