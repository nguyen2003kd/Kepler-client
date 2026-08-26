import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailView from "./views/news-detail-view";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import { getMockPostsForCategory, getMockPostBySlug } from "@/utils/mock-data";

interface NewsDetailPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<PostExtended | null> {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post/slug/${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) {
      const mockPost = getMockPostBySlug(slug);
      if (mockPost) return mockPost;
      return null;
    }
    const data = await res.json();
    if (!data?.responseData) {
      const mockPost = getMockPostBySlug(slug);
      if (mockPost) return mockPost;
      return null;
    }
    return (data?.responseData as PostExtended) || null;
  } catch {
    return null;
  }
}

async function getCategoryByLink(fullSlug: string, language?: "vi" | "en") {
  try {
    const url = new URL(`${baseConfig.backendDomain}/api/v1.0/category`);
    if (language) url.searchParams.set("language", language);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const all = (data?.responseData || []) as CategoryWithChildren[];
    const flat: CategoryWithChildren[] = [];
    const flatten = (cats: CategoryWithChildren[]) => {
      for (const c of cats) { flat.push(c); if (c.categories) flatten(c.categories); }
    };
    flatten(all);
    return flat.find((cat) => cat.link === `/${fullSlug}`) || null;
  } catch {
    return null;
  }
}

async function getCategoryWithSiblings(fullSlug: string, language?: "vi" | "en") {
  try {
    const url = new URL(`${baseConfig.backendDomain}/api/v1.0/category`);
    if (language) url.searchParams.set("language", language);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return { category: null, siblings: [] as CategoryWithChildren[] };
    const data = await res.json();
    const all = (data?.responseData || []) as CategoryWithChildren[];
    const flat: CategoryWithChildren[] = [];
    const flatten = (cats: CategoryWithChildren[]) => {
      for (const c of cats) { flat.push(c); if (c.categories) flatten(c.categories); }
    };
    flatten(all);
    const category = flat.find((cat) => cat.link === `/${fullSlug}`) || null;
    let siblings: CategoryWithChildren[] = [];
    if (category?.parent_category_id) {
      const parent = flat.find((cat) => cat.id === category.parent_category_id);
      siblings = parent?.categories || [];
    }
    return { category, siblings };
  } catch {
    return { category: null, siblings: [] as CategoryWithChildren[] };
  }
}

async function getPostsForCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post?category_id=${categoryId}&filters=is_hidden==false&sortField=created_at&sortOrder=desc&pageSize=999`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.responseData?.rows || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    const category = await getCategoryByLink(`news/${params.slug}`, "vi");
    if (category) {
      return {
        title: `${category.name} | Kepler Property`,
        description: category.description || category.name,
      };
    }
    return {
      title: "Không tìm thấy tin tức",
      description: "Bài viết không tồn tại hoặc đã bị xóa.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/news/${params.slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Tin tức mới nhất";

  return {
    title: post.title || "Tin tức",
    description,
    openGraph: {
      title: post.title || "Tin tức",
      description,
      url: pageUrl,
      type: "article",
      publishedTime: post.created_at || undefined,
      siteName: "CASE-SMQ",
      ...(thumbnailUrl && {
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: post.title || "" }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Tin tức",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const post = await getPost(params.slug);

  if (post) {
    return <NewsDetailView slug={params.slug} initialPost={post} />;
  }

  // Try category page (e.g. /news/van-ban-luat)
  const fullSlug = `news/${params.slug}`;
  const [{ category, siblings }, categoryEn] = await Promise.all([
    getCategoryWithSiblings(fullSlug, "vi"),
    getCategoryByLink(fullSlug, "en"),
  ]);

  if (category) {
    const apiPosts = await getPostsForCategory(category.id!);
    const posts =
      apiPosts.length > 0
        ? apiPosts
        : getMockPostsForCategory(category.id!, category.name!, category.link!);

    return (
      <DynamicCategoryPage
        category={category}
        categoryEn={categoryEn}
        initialPosts={posts}
        siblingCategories={siblings}
        parentLink="/news"
      />
    );
  }

  notFound();
}
