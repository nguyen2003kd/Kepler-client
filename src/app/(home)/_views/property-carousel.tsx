"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SaleProperty } from "@/constants/kepler-data";
import PropertyCard from "./property-card";
import "swiper/css";
import "swiper/css/pagination";

interface Props {
  properties: SaleProperty[];
  listingLabel: string;
}

export default function PropertyCarousel({ properties, listingLabel }: Props) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: true }}
      loop
      className="!pb-12"
    >
      {properties.map((p) => (
        <SwiperSlide key={p.id}>
          <PropertyCard property={p} listingLabel={listingLabel} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
