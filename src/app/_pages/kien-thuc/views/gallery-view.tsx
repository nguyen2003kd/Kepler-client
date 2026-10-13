"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Calendar, Search, X } from "lucide-react";
import parse from "html-react-parser";

import { useGetApiV10Post } from "@/api/endpoints/post";
import type { Category } from "@/api/models/category";
import Image from "@/components/common/safe-image";
import { GridCardSkeleton } from "@/components/common/loading";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import VideoGrid from "@/app/[...slug]/components/video-grid";

const PAGE_SIZE_STEP = 12;

interface GalleryViewProps {
  category: Category & { categories?: Category[] };
  initialPosts: PostExtended[];
}

function stripHtml(html?: string | null) {
  return parse(html || "");
}

export default function GalleryView({ category, initialPosts }: GalleryViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subcategoryCode = searchParams.get("category");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE_STEP);

  const siblings = useMemo(() => category.categories || [], [category.categories]);

  const activeSubcategory = useMemo(() => {
    if (!subcategoryCode) return null;
    return (
      siblings.find((cat) => {
        if (!cat.link) return false;
        try {
          return new URL(cat.link, "http://placeholder").searchParams.get("category") === subcategoryCode;
        } catch {
          return false;
        }
      }) || null
    );
  }, [subcategoryCode, siblings]);

  const activeCategoryId = activeSubcategory?.id || category.id || "";

  const { data, isLoading } = useGetApiV10Post(
    {
      category_id: activeCategoryId,
      filters: "is_hidden==false",
      filterBy: "CLIENT",
      position: "true",
      sortOrderPosition: "ASC",
      pageSize: visible,
    },
    { query: { enabled: !!activeCategoryId, staleTime: 1000 * 60 * 5 } },
  );

  const apiRows = (data?.responseData?.rows as PostExtended[]) || [];
  const source = apiRows.length > 0 ? apiRows : initialPosts;

  const posts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return source;
    return source.filter((post) => {
      const haystack = `${post.title || ""} ${post.summary || ""}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }, [source, search]);

  const total = data?.responseData?.count ?? source.length;
  const canLoadMore = source.length < total;

  if (subcategoryCode === "podcast-video") {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <VideoGrid
              categoryName={activeSubcategory?.name || category.name}
              categoryCode="kien-thuc"
            />
          </div>
        </section>
      </div>
    );
  }

  const clearCategoryFilter = () => {
    router.push("/kien-thuc", { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Library hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#DC2626] via-red-700 to-red-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-14 md:pt-20 md:pb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            <BookOpen className="w-4 h-4" />
            Thư viện Kepler
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {category.name || "Kiến thức"}
          </h1>
          <p className="mt-4 text-red-50/90 text-base md:text-lg max-w-3xl leading-relaxed">
            {category.description ||
              "Kho bài viết, nghiên cứu và tài liệu mở cho cộng đồng — cập nhật liên tục."}
          </p>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-xl shadow-red-950/20">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm bài viết, chủ đề bạn quan tâm…"
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-base"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Xoá tìm kiếm"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={clearCategoryFilter}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                !subcategoryCode
                  ? "bg-[#DC2626] text-white border-[#DC2626] shadow-md shadow-red-200"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#DC2626] hover:text-[#DC2626]"
              }`}
            >
              Tất cả
            </button>
            {siblings.map((cat) => {
              const code = (() => {
                try {
                  return cat.link
                    ? new URL(cat.link, "http://placeholder").searchParams.get("category")
                    : null;
                } catch {
                  return null;
                }
              })();
              if (!code) return null;
              const isActive = code === subcategoryCode;
              return (
                <button
                  key={cat.id}
                  onClick={() => router.push(`/kien-thuc?category=${code}`, { scroll: false })}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? "bg-[#DC2626] text-white border-[#DC2626] shadow-md shadow-red-200"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#DC2626] hover:text-[#DC2626]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                {activeSubcategory?.name || category.name}
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-[#DC2626]" />
            </div>
            <p className="text-sm text-gray-500">
              {search ? `${posts.length} kết quả` : `${total} bài viết`}
            </p>
          </div>

          {isLoading && source.length === 0 ? (
            <GridCardSkeleton count={9} />
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-semibold">Chưa tìm thấy bài viết phù hợp</p>
              <p className="text-gray-400 text-sm mt-2">Thử một từ khóa khác hoặc chọn chủ đề khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/kien-thuc/${post.slug || ""}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DC2626] hover:shadow-2xl hover:shadow-red-100"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Cover */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path)}
                      alt={post.title || ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/10 to-transparent" />

                    {activeSubcategory && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-[#DC2626] text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm">
                        {activeSubcategory.name}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white/90 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.created_at || "").toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-grow p-5">
                    {/* Book spine accent */}
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gray-200 group-hover:bg-[#DC2626] transition-colors" />
                      <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#DC2626] transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {stripHtml(post.summary)}
                    </div>

                    <div className="mt-auto pt-5 flex items-center gap-2 text-[#DC2626] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Đọc bài viết
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!search && canLoadMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE_STEP)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border-2 border-[#DC2626] text-[#DC2626] font-bold hover:bg-[#DC2626] hover:text-white transition-all duration-300"
              >
                Tải thêm bài viết
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
