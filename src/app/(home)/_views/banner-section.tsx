"use client";

import { useGetApiV10Banner } from "@/api/endpoints/banner";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { Banner } from "@/api/models/banner";
import { File } from "@/api/models/file";
import { getThumbnailSrc } from "@/lib/responsive-image";
import Image from "@/components/common/safe-image";
import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BannerWithFile extends Banner {
  file?: File;
}

interface HeroConfigData {
  title: string;
  titleHighlight1: string;
  titleHighlight2: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
  logoImage: string;
}

const defaultHeroConfig: HeroConfigData = {
  title: "Kiến tạo giá trị bền vững cho",
  titleHighlight1: "Bất động sản",
  titleHighlight2: "Doanh nghiệp",
  subtitle:
    "Kepler Group là hệ sinh thái tư vấn và dịch vụ bất động sản chuyên nghiệp, đồng hành cùng doanh nghiệp trong toàn bộ vòng đời tài sản — từ nghiên cứu đầu tư, thẩm định giá, phát triển dự án, quản lý vận hành đến tối ưu khai thác và gia tăng giá trị.",
  cta1Text: "Khám phá dịch vụ",
  cta1Link: "/services",
  cta2Text: "Liên hệ tư vấn",
  cta2Link: "/dat-lich-tu-van",
  logoImage: "/api/storage/uploads/images/file-1787394265327-698518208.png",
};

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const { data } = useGetApiV10Banner({
    filters: "is_active==true",
    sortField: "sort_order",
    sortOrder: "asc",
  });

  const { data: heroConfigData } = useGetApiV10PageConfig({
    filters: "key==HOME_HERO",
  });

  const heroConfig = React.useMemo<HeroConfigData>(() => {
    const rows = heroConfigData?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value?: string | null };
      if (row.value) {
        try {
          return { ...defaultHeroConfig, ...JSON.parse(row.value) };
        } catch {
          return defaultHeroConfig;
        }
      }
    }
    return defaultHeroConfig;
  }, [heroConfigData]);

  const banners = React.useMemo(
    () => (data?.responseData?.rows as BannerWithFile[]) || [],
    [data?.responseData?.rows],
  );

  const autoplayDelay = React.useMemo(() => {
    const delay = banners[0]?.display_time
      ? parseInt(banners[0].display_time, 10)
      : 5000;
    return delay > 0 ? delay : 5000;
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
      className="relative h-screen min-h-[500px] max-h-[900px] overflow-hidden bg-[#0a0a0a]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background slides */}
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
      <div className="absolute inset-0 bg-black/70" />

      {/* Content — split layout: text left, logo right */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="w-full mx-auto px-6 lg:px-12 xl:px-24 flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8 md:gap-0">
          {/* Left — Text */}
          <div className="flex-1 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[4]">
                {heroConfig.title}{" "}
                <span className="text-[#DC2626]">{heroConfig.titleHighlight1}</span>{" "}
                <span className="text-[#DC2626]">{heroConfig.titleHighlight2}</span>
              </h1>
              <p className="mt-10 md:mt-16 text-sm md:text-base lg:text-lg text-white/80 leading-[4.5] max-w-[55ch]">
                {heroConfig.subtitle}
              </p>

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 md:gap-4">
                <Link
                  href={heroConfig.cta1Link}
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#DC2626] text-white text-sm font-semibold rounded-full hover:bg-[#BF2626] transition-colors group"
                >
                  {heroConfig.cta1Text}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href={heroConfig.cta2Link}
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-colors"
                >
                  {heroConfig.cta2Text}
                </Link>
              </div>
            </div>
          </div>


          {/* Right — Logo */}
          <div className="flex-1 relative flex items-center justify-center min-h-[250px] md:min-h-full">
            <div className="relative w-full max-w-[450px] md:max-w-[550px] lg:max-w-[650px] h-[250px] md:h-[400px] lg:h-[500px] hero-logo-float">
              <Image
                src={heroConfig.logoImage}
                alt="Kepler Group"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
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
