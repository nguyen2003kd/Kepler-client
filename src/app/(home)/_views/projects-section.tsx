"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FadeIn } from "@/components/ui/fade-in";

import "swiper/css";
import "swiper/css/pagination";

const PROJECTS = [
  {
    title: "Phú Mỹ Hưng",
    type: "Khu đô thị",
    location: "Quận 7, TP.HCM",
    service: "Tư vấn đầu tư",
    image: "/images/service-1.png",
  },
  {
    title: "Vinhomes Central Park",
    type: "Căn hộ cao cấp",
    location: "Bình Thạnh, TP.HCM",
    service: "Thẩm định giá",
    image: "/images/service-2.png",
  },
  {
    title: "Sunshine City",
    type: "Phức hợp thương mại",
    location: "Quận 7, TP.HCM",
    service: "Quản lý tài sản",
    image: "/images/service-3.png",
  },
  {
    title: "Masteri An Phú",
    type: "Căn hộ",
    location: "Thảo Điền, TP.HCM",
    service: "Định giá",
    image: "/images/service-1.png",
  },
  {
    title: "Estella Heights",
    type: "Căn hộ hạng sang",
    location: "Quận 2, TP.HCM",
    service: "Tư vấn M&A",
    image: "/images/service-2.png",
  },
  {
    title: "Empire City",
    type: "Khu đô thị ven sông",
    location: "Thủ Thiêm, TP.HCM",
    service: "Phát triển dự án",
    image: "/images/service-3.png",
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Header */}
        <FadeIn direction="up" duration={0.5}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
            <div>
              <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Dự án</span>
              <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                Dự án nổi bật
              </h2>
              <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                Khám phá các dự án BĐS chất lượng cao.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 md:gap-3 text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:gap-3 md:hover:gap-4 transition-all group"
            >
              Xem tất cả
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* Carousel */}
        <FadeIn direction="up" delay={0.2} duration={0.5}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            loop
            className="!pb-12"
          >
            {PROJECTS.map((project) => (
              <SwiperSlide key={project.title}>
                <Link
                  href="#"
                  className="group relative overflow-hidden bg-[#1a1a1a] rounded-xl block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="text-primary text-[10px] font-semibold uppercase tracking-wide">
                      {project.type}
                    </span>
                    <h3 className="mt-1.5 text-white text-[17px] font-bold leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-white/70 text-xs">{project.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-semibold text-sm">
                        {project.service}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
