import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailView from "./views/news-detail-view";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import { getMockPostsForCategory, getMockPostBySlug } from "@/utils/mock-data";
import {
  getCategoryByLink,
  getCategoryWithSiblings,
  getPostBySlug,
  getPostsByCategory,
} from "@/app/_pages/api-helpers";

interface NewsDetailPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<PostExtended | null> {
  const post = await getPostBySlug(slug);
  if (post) return post;
  return getMockPostBySlug(slug) ?? null;
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
      siteName: "KEPLER",
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
    const apiPosts = await getPostsByCategory(category.id!);
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
