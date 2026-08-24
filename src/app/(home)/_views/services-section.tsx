"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import ServiceCard from "@/components/common/components/service-card";
import { PAGE_IDS } from "@/constants/page-ids";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { slugify } from "@/lib/slugify";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function ServicesSection() {
  const paginationStyle = `
    .services-swiper .swiper-wrapper {
      align-items: stretch !important;
    }
    .services-swiper .swiper-slide {
      height: auto !important;
      display: flex !important;
    }
    .services-swiper .swiper-slide > div {
      width: 100%;
    }
    .services-swiper .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: rgba(0, 0, 0, 0.25);
      opacity: 1;
      transition: all 0.3s ease;
      border-radius: 9999px;
    }
    .services-swiper .swiper-pagination-bullet:hover {
      background: rgba(0, 0, 0, 0.4);
      width: 16px;
    }
    .services-swiper .swiper-pagination-bullet-active {
      width: 32px;
      background: #DC2626;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .services-swiper .swiper-pagination {
      text-align: center;
    }
  `;

  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const servicesPageId = currentLang === "en" ? PAGE_IDS.SERVICE_POSITION : PAGE_IDS.HOME_PROJECTS;

  const { data, isLoading } = useGetApiV10Post({
    page_id: servicesPageId,
    filters: "is_hidden==false",
    pageSize: 8,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const services = React.useMemo(() => {
    const posts = (data?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    const dataToUse = posts.length > 0 ? posts : mockPosts.slice(0, 8);

    return dataToUse.map((post) => {
      const imageUrl = getThumbnailSrc(
        post.thumbnail_compress_info,
        post.thumbnail_path,
        "/seo.png",
      );

      return {
        id: post.id || "",
        image: imageUrl,
        title: post.title || "",
        description: post.summary || "",
        link: `/du-an/${post.slug || slugify(post.title || "")}`,
        date: post.created_at
          ? new Date(post.created_at).toLocaleDateString("vi-VN")
          : undefined,
      };
    });
  }, [data?.responseData?.rows]);

  return (
    <section className="relative bg-white py-20 md:py-28">
      <style jsx global>
        {paginationStyle}
      </style>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Dự án tiêu biểu
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Dự án
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all group"
            >
              {t("viewAllServices")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden h-[320px] animate-pulse"
              >
                <div className="w-full h-48 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <motion.div
              className="relative -mx-2 px-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="w-full services-swiper !py-2 !pb-20"
              >
                {services.map((service) => (
                  <SwiperSlide key={service.id} className="h-auto">
                    <div className="h-full w-full p-0">
                      <ServiceCard
                        image={service.image}
                        title={service.title}
                        description={service.description}
                        link={service.link}
                        date={service.date}
                        className="h-full"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center sm:hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Link
                href="/du-an"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all group"
              >
                {t("viewAllServices")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
