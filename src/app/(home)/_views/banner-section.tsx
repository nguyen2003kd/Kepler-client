"use client";

import { useGetApiV10Banner } from "@/api/endpoints/banner";
import { Banner } from "@/api/models/banner";
import { File } from "@/api/models/file";
import { getThumbnailSrc } from "@/lib/responsive-image";
import Image from "next/image";
import * as React from "react";

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
      className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] max-h-[900px] min-h-[500px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full overflow-hidden rounded-none">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
