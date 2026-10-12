"use client";

import { useGetApiV10Property } from "@/api/endpoints/property";
import type { Property } from "@/api/models/property";
import { propertyPrice } from "@/lib/property-display";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GridCardSkeleton } from "@/components/common/loading";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";

const PAGE_SIZE = 12;

export default function ProjectsPage() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetApiV10Property({
    filters: "transaction_group==INVESTMENT|DISTRIBUTION|MA,status==PUBLISHED",
    page: currentPage,
    pageSize: PAGE_SIZE,
    sortField: "created_at",
    sortOrder: "desc",
  });

  const projects = (data?.responseData?.rows as Property[]) || [];

  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || PAGE_SIZE))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-24 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
            {currentLang === "en" ? "Projects" : "Dự án"}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-16">
        {/* Project Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <GridCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <FadeIn direction="up" duration={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((property) => {
                const imageUrl =
                  property.media?.find((file) => file.mime?.startsWith("image/"))?.path ||
                  "/seo.png";
                return (
                  <Link
                    key={property.id}
                    href={`/san-giao-dich/san-pham/${property.id}`}
                    className="group relative overflow-hidden bg-[#1a1a1a] rounded-xl block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <SafeImage
                        src={imageUrl}
                        alt={property.title || ""}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {property.transaction_group && (
                        <span className="text-primary text-[10px] font-semibold uppercase tracking-wide">
                          {property.transaction_group}
                        </span>
                      )}
                      <h3 className="mt-1.5 text-white text-[17px] font-serif font-bold leading-tight line-clamp-2">
                        {property.title}
                      </h3>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        {propertyPrice(property) ? (
                          <span className="text-primary text-xs font-semibold">
                            {propertyPrice(property)}
                          </span>
                        ) : (
                          <span className="text-white/70 text-xs">
                            {currentLang === "en" ? "Project" : "Dự án"}
                          </span>
                        )}
                        {property.location && (
                          <span className="text-white/70 text-xs truncate">
                            {property.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeIn>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentLang === "en" ? "Previous" : "Trang trước"}
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md ${currentPage === i + 1
                    ? "bg-primary text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentLang === "en" ? "Next" : "Trang sau"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
