"use client";

import { Category } from "@/api/models/category";
import { PostExtended } from "@/types/post";
import CategoryTab from "../components/category-tab";
import NewsGrid from "../components/news-grid";
import RelatedSidebar from "../components/related-sidebar";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";


interface DynamicCategoryPageProps {
  category: Category & { categories?: Category[] };
  categoryEn?: Category & { categories?: Category[] } | null;
  date?: string;
  initialPosts?: PostExtended[];
  siblingCategories?: Category[];
  parentLink?: string;
}

export default function DynamicCategoryPage({
  category,
  categoryEn,
  date,
  initialPosts,
  siblingCategories,
  parentLink,
}: DynamicCategoryPageProps) {
  const { i18n } = useTranslation("pages/post-detail");
  const isEn = i18n.language?.startsWith("en");
  const searchParams = useSearchParams();
  const subcategoryCode = searchParams.get("category");
  const isPodcastVideo = subcategoryCode === "podcast-video";

  const activeCategory = useMemo(() => {
    const sibs = siblingCategories && siblingCategories.length > 0 ? siblingCategories : (category.categories || []);
    if (!subcategoryCode || sibs.length === 0) return null;
    return sibs.find((cat) => {
      if (!cat.link) return false;
      try {
        const url = new URL(cat.link, "http://placeholder");
        return url.searchParams.get("category") === subcategoryCode;
      } catch {
        return false;
      }
    }) || null;
  }, [subcategoryCode, siblingCategories, category.categories]);

  const displayCategory = activeCategory
    ? (isEn ? activeCategory : activeCategory)
    : (isEn && categoryEn ? categoryEn : category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-24 overflow-hidden"
        style={{ backgroundImage: "url('/images/category-banner-investment.png')" }}
      >
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
            {displayCategory.name}
          </h1>
          {displayCategory.description && (
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              {displayCategory.description}
            </p>
          )}
        </div>
      </section>

      {/* Static Content for Nang Luc */}
   

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Category Tab */}
              <CategoryTab 
                categories={siblingCategories && siblingCategories.length > 0 ? siblingCategories : (category.categories || [])}
                parentLink={parentLink}
              />

              {/* Related Sidebar — hidden for podcast/video */}
              {!isPodcastVideo && (
                <RelatedSidebar
                  categoryId={category.id || ""}
                  categoryCode={category.link?.replace(/^\//, "")}
                  categoryName={displayCategory.name || ""}
                  siblingCategories={siblingCategories && siblingCategories.length > 0 ? siblingCategories : (category.categories || [])}
                />
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <NewsGrid
              categoryId={category.id || ""}
              categoryName={displayCategory.name || ""}
              categoryCode={displayCategory.link?.replace(/^\//, "")}
              date={date}
              initialPosts={initialPosts}
              siblingCategories={siblingCategories && siblingCategories.length > 0 ? siblingCategories : (category.categories || [])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
