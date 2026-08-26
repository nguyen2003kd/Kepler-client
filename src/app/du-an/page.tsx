"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { slugify } from "@/lib/slugify";
import type { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GridCardSkeleton } from "@/components/common/loading";
import SafeImage from "@/components/common/safe-image";
import { FadeIn } from "@/components/ui/fade-in";

export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetApiV10Category({ language: currentLang });

  const { projectSubCategories, projectCategoryId, rootCategoryName } =
    useMemo(() => {
      const allCats = (categoriesData?.responseData as CategoryWithChildren[]) || [];
      // /du-an is a sub-category, search recursively in all root categories
      let found: CategoryWithChildren | undefined;
      for (const root of allCats) {
        if (root.link === "/du-an") {
          found = root;
          break;
        }
        if (root.categories) {
          found = root.categories.find((sub) => sub.link === "/du-an");
          if (found) break;
        }
      }
      const categories = found?.categories || [];
      return {
        projectSubCategories: categories,
        projectCategoryId: found?.id || "",
        rootCategoryName: found?.name || "Dự án",
      };
    }, [categoriesData]);

  useEffect(() => {
    if (!categoriesData?.responseData || !categoryParam) {
      setSelectedCategory("");
      return;
    }

    const matched = projectSubCategories.find(
      (cat) =>
        slugify(cat.name || "") === categoryParam || cat.id === categoryParam,
    );

    setSelectedCategory(matched?.id || "");
  }, [categoryParam, categoriesData, projectSubCategories]);

  const { data, isLoading } = useGetApiV10Post({
    filters: "is_hidden==false",
    page: currentPage,
    pageSize: 12,
    sortField: "created_at",
    sortOrder: "desc",
    filterBy: "CLIENT",
    ...(selectedCategory ? { category_id: selectedCategory } : { category_id: projectCategoryId }),
  });

  const postsFromAPI = (data?.responseData?.rows as PostExtended[]) || [];
  const projects = postsFromAPI.length > 0 ? postsFromAPI : mockPosts.slice(0, 8);

  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 12))
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
            {rootCategoryName}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-16">
        {/* Category Filter */}
        {!isCategoriesLoading && projectSubCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => {
                setSelectedCategory("");
                setCurrentPage(1);
                router.push("/du-an", { scroll: false });
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {currentLang === "en" ? "All" : "Tất cả"}
            </button>
            {projectSubCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id || "");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

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
              {projects.map((project) => {
                const imageUrl = getThumbnailSrc(
                  project.thumbnail_compress_info,
                  project.thumbnail_path,
                  "/seo.png",
                );
                return (
                  <Link
                    key={project.id}
                    href={`/du-an/${project.slug || slugify(project.title || "")}`}
                    className="group relative overflow-hidden bg-[#1a1a1a] rounded-xl block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <SafeImage
                        src={imageUrl}
                        alt={project.title || ""}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      {project.category?.name && (
                        <span className="text-primary text-[10px] font-semibold uppercase tracking-wide">
                          {project.category.name}
                        </span>
                      )}
                      <h3 className="mt-1.5 text-white text-[17px] font-serif font-bold leading-tight line-clamp-2">
                        {project.title}
                      </h3>
                      {project.summary && (
                        <p
                          className="mt-1 text-white/70 text-xs line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: project.summary,
                          }}
                        />
                      )}
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
                className={`px-4 py-2 rounded-md ${
                  currentPage === i + 1
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
