"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import { Category } from "@/api/models/category";
import { PAGE_IDS } from "@/constants/page-ids";
import { buildPostFilters } from "@/lib/filters";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import NewsHeader from "../news-header";
import NewsList from "./components/news-list";
import VideoGrid from "../video-grid";

interface NewsGridProps {
  categoryId?: string;
  categoryName?: string;
  categoryCode?: string;
  date?: string;
  initialPosts?: PostExtended[];
  siblingCategories?: Category[];
}

export default function NewsGrid({
  categoryId,
  categoryName = "Bài viết",
  categoryCode,
  date: initialDate,
  initialPosts,
  siblingCategories,
}: NewsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subcategoryCode = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filters = useMemo(() => {
    return buildPostFilters(date, "is_hidden==false");
  }, [date]);

  // Map subcategory code (from URL ?category=xxx) to UUID via sibling categories
  const subcategoryId = useMemo(() => {
    if (!subcategoryCode || !siblingCategories || siblingCategories.length === 0) return null;
    // Match by extracting code from link (e.g. /kien-thuc?category=da-u-bds → da-u-bds)
    const matched = siblingCategories.find((cat) => {
      if (!cat.link) return false;
      try {
        const url = new URL(cat.link, "http://placeholder");
        return url.searchParams.get("category") === subcategoryCode;
      } catch {
        return false;
      }
    });
    return matched?.id || null;
  }, [subcategoryCode, siblingCategories]);

  const activeCategoryId = subcategoryId || categoryId;

  const { data, isLoading, error } = useGetApiV10Post({
    filters,
    page: currentPage,
    pageSize: 10,
    filterBy: "CLIENT",
    category_id: activeCategoryId,
    position: "true",
    sortOrderPosition: "ASC",
    page_id: PAGE_IDS.LATEST_POSTS,
  });

  const apiPosts = (data?.responseData?.rows as PostExtended[]) || [];

  const posts = apiPosts.length > 0 ? apiPosts : (initialPosts && initialPosts.length > 0 ? initialPosts : mockPosts.slice(0, 10));

  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 10))
    : 1;

  // If subcategory is podcast-video, render VideoGrid (uses /api/v1.0/file instead of /post)
  if (subcategoryCode === "podcast-video") {
    return (
      <VideoGrid
        categoryName={categoryName}
        categoryCode={categoryCode}
      />
    );
  }

  return (
    <div className="space-y-6">
      <NewsHeader
        categoryName={categoryName}
        date={date}
        onDateChange={(newDate) => {
          setDate(newDate);
          setCurrentPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isLoading={isLoading}
      />

      <NewsList
        posts={posts}
        isLoading={isLoading}
        error={error}
        viewMode={viewMode}
        categoryCode={categoryCode}
        categoryName={categoryName}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasDateFilter={!!date}
        hasCategoryFilter={!!subcategoryId}
        onClearDateFilter={() => {
          setDate(undefined);
          setCurrentPage(1);
        }}
        onClearCategoryFilter={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("category");
          router.push(`?${params.toString()}`, { scroll: false });
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
