import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicPostDetailPage from "@/app/[...slug]/_templates/post-detail-page";
import DynamicCategoryPage from "@/app/[...slug]/_templates/category-page";
import { getMockPostsForCategory, getMockPostBySlug } from "@/utils/mock-data";
import {
  getCategoryByLink,
  getCategoryWithSiblings,
  getPostBySlug,
  getPostsByCategory,
} from "@/app/[...slug]/_designed-pages/api-helpers";

interface KienThucDetailPageProps {
  params: { slug: string };
  searchParams: { date?: string };
}

async function getPost(slug: string): Promise<PostExtended | null> {
  const post = await getPostBySlug(slug);
  if (post) return post;
  return getMockPostBySlug(slug) ?? null;
}

export async function generateMetadata({
  params,
}: KienThucDetailPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    const category = await getCategoryByLink(`kien-thuc/${params.slug}`, "vi");
    if (category) {
      return {
        title: `${category.name} | Kepler Property`,
        description: category.description || category.name,
      };
    }
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết không tồn tại hoặc đã bị xóa.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/kien-thuc/${params.slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Bài viết mới nhất";

  return {
    title: post.title || "Kiến thức",
    description,
    openGraph: {
      title: post.title || "Kiến thức",
      description,
      url: pageUrl,
      type: "article",
      publishedTime: post.created_at || undefined,
      siteName: "Kepler Property",
      ...(thumbnailUrl && {
        images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: post.title || "" }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Kiến thức",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function KienThucDetailPage({ params, searchParams }: KienThucDetailPageProps) {
  const post = await getPost(params.slug);

  if (post) {
    return (
      <DynamicPostDetailPage
        post={post}
        categoryName="Kiến thức"
        categorySlug={`kien-thuc/${params.slug}`}
        urlCategoryId={undefined}
      />
    );
  }

  // Try category page (e.g. /kien-thuc/tai-chinh-khoan-vay)
  const fullSlug = `kien-thuc/${params.slug}`;
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
        date={searchParams.date}
        siblingCategories={siblings}
        parentLink="/kien-thuc"
      />
    );
  }

  notFound();
}
