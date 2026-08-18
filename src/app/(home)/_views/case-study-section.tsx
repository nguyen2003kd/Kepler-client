"use client";

import ProjectCarousel from "./components/project-carousel";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { PROJECTS } from "@/constants/kepler-data";

export default function CaseStudySection() {
  return (
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <FadeIn direction="up" duration={0.5}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-10">
              <div>
                <div className="w-10 md:w-16 h-[2px] md:h-1 bg-primary mb-3 md:mb-5" />
                {/* <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Dự án</span> */}
                <h2 className="text-[clamp(22px,3.5vw,42px)] font-serif font-bold text-[#1a1a1a] leading-tight mt-2">
                  CASE STUDY
                </h2>
                <p className="mt-2 md:mt-3 text-gray-500 text-sm md:text-[15px] max-w-[500px]">
                  Giá trị tạo ra cho khách hàng
                </p>
              </div>
              <Link
                href="/du-an?category=dfe9d415-8536-44bd-90b3-945c74f83425"
                className="inline-flex items-center gap-2 md:gap-3 text-primary text-xs md:text-sm font-semibold uppercase tracking-widest hover:gap-3 md:hover:gap-4 transition-all group"
              >
                Xem tất cả
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <ProjectCarousel projects={PROJECTS} />
          </FadeIn>
        </div>
      </section>
  );
}
