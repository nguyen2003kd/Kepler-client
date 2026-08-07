"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ProjectInfo } from "@/constants/kepler-data";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  projects: ProjectInfo[];
}

export default function ProjectCarousel({ projects }: Props) {
  return (
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
      {projects.map((p) => (
        <SwiperSlide key={p.id}>
          <Link href={`/projects/${p.slug}`} className="group relative overflow-hidden bg-[#1a1a1a] rounded-xl block">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={p.img}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {/* <span className="text-primary text-[10px] font-semibold uppercase tracking-wide">{p.type}</span> */}
              <h3 className="mt-1.5 text-white text-[17px] font-serif font-bold leading-tight">{p.title}</h3>
              {/* <p className="mt-1 text-white/70 text-xs">{p.location}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-semibold text-sm">{p.priceRange}</span>
                <span className="text-white/60 text-xs">{p.scale}</span>
              </div> */}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
