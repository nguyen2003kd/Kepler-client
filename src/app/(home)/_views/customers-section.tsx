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
          <div className="mb-6 md:mb-10">
            <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Khách hàng</span>
            <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
              Khách hàng đã đồng hành
            </h2>
            <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
              Những đối tác tin tưởng và đồng hành cùng Kepler.
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
            {CUSTOMERS.map((c) => (
              <SwiperSlide key={c.name} className="!w-[300px]">
                <div className="group bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-h-[180px]">
                  <div className="relative w-16 h-16 mb-4">
                    <Image
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
