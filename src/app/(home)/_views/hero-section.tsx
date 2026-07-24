"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    img: "https://picsum.photos/seed/hero1/1920/1080",
    heading: "Kepler Property",
    subheading: "Nền tảng BĐS hàng đầu Việt Nam",
    description:
      "Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất.",
    link: "/apartments-for-sale",
    linkText: "Xem tin đăng",
  },
  {
    img: "https://picsum.photos/seed/hero2/1920/1080",
    heading: "Dự án nổi bật",
    subheading: "Vinhomes Grand Park & hơn thế nữa",
    description:
      "Khám phá các dự án BĐS chất lượng cao với tiện ích đầy đủ, vị trí đắc địa.",
    link: "/projects",
    linkText: "Xem dự án",
  },
  {
    img: "https://picsum.photos/seed/hero3/1920/1080",
    heading: "Tin tức BĐS",
    subheading: "Cập nhật thị trường mỗi ngày",
    description:
      "Theo dõi xu hướng thị trường, quy hoạch và tư vấn đầu tư BĐS mới nhất.",
    link: "/news",
    linkText: "Đọc tin tức",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[90vh] min-h-[400px] md:min-h-[500px] max-h-[500px] md:max-h-[800px] overflow-hidden bg-[#1a1a1a]">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${slide.img}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 w-full">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 absolute top-0 left-0 right-0 -translate-y-8"
              }`}
            >
              {i === current && (
                <FadeIn key={i} direction="up" duration={0.8}>
                  <div className="max-w-[700px]">
                    {/* Decorative line */}
                    <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-4 md:mb-6" />
                    <h2 className="text-[clamp(24px,5vw,56px)] font-serif font-bold leading-[1.15] text-white">
                      {slide.heading}
                    </h2>
                    <p className="mt-3 md:mt-5 text-sm md:text-xl text-white/80 font-normal">
                      {slide.subheading}
                    </p>
                    <p className="mt-2 md:mt-4 text-xs md:text-base text-white/65 max-w-[400px] md:max-w-[560px] leading-relaxed line-clamp-2 md:line-clamp-none">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.link}
                      className="inline-flex items-center text-white justify-center gap-2 md:gap-3 min-h-[42px] md:min-h-[50px] px-5 md:px-8 bg-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all hover:scale-105 mt-5 md:mt-8 rounded-lg md:rounded-xl"
                    >
                      {slide.linkText}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </FadeIn>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute z-20 bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 ${
              i === current
                ? "w-8 md:w-12 h-[2px] md:h-[3px] bg-primary"
                : "w-2 md:w-3 h-[2px] md:h-[3px] bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
