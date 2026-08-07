"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CUSTOMERS = [
  { name: "Ngân hàng A", image: "/images/client-1.png", sector: "Ngân hàng" },
  { name: "Doanh nghiệp B", image: "/images/client-2.png", sector: "Doanh nghiệp" },
  { name: "Chủ đầu tư C", image: "/images/client-3.png", sector: "Chủ đầu tư" },
  { name: "Quỹ đầu tư D", image: "/images/logo-case.png", sector: "Quỹ đầu tư" },
  { name: "Đơn vị sản xuất E", image: "/images/logo-smeq.jpg", sector: "Sản xuất" },
  { name: "Đơn vị thương mại F", image: "/images/logo-no-bg.png", sector: "Thương mại" },
];

export default function CustomersSection() {
  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Khách hàng</span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Khách hàng đã đồng hành
              </h2>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                Những đối tác tin tưởng và đồng hành cùng Kepler.
              </p>
            </div>
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
            {CUSTOMERS.map((c) => (
              <SwiperSlide key={c.name} className="!w-[280px]">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center p-6">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain"
                      sizes="280px"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <span className="bg-primary text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-xl">
                      {c.sector}
                    </span>
                    <h3 className="mt-3 text-[#1a1a1a] text-[17px] font-serif font-bold leading-tight">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Ngân hàng", "Doanh nghiệp", "Chủ đầu tư", "Quỹ đầu tư", "Đơn vị sản xuất", "Đơn vị thương mại"].map(
            (tag) => (
              <span key={tag} className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-gray-600 text-sm font-medium">
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
