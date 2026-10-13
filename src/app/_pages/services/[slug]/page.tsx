import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "./views/service-detail-view";
import StaticServiceDetail, { staticServices } from "./views/static-service-detail";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import { resolveActivityPage } from "@/app/_pages/linh-vuc-hoat-dong/activity-page";
import {
  getCategoryByLink,
  getCategoryWithSiblings,
  getPostBySlug,
  getPostsByCategory,
} from "@/app/_pages/api-helpers";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<PostExtended | null> {
  return getPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    const category = await getCategoryByLink(`services/${slug}`, "vi");
    if (category) {
      return {
        title: `${category.name} | Kepler Property`,
        description: category.description || category.name,
      };
    }
    return {
      title: "Không tìm thấy dịch vụ",
      description: "Dịch vụ không tồn tại hoặc đã bị xóa.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/services/${slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Dịch vụ Kepler Group";

  return {
    title: post.title || "Dịch vụ",
    description,
    openGraph: {
      title: post.title || "Dịch vụ",
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
      title: post.title || "Dịch vụ",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const activityPage = await resolveActivityPage(`services/${slug}`);
  if (activityPage) return activityPage;
  if (staticServices[slug]) {
    return <StaticServiceDetail slug={slug} basePath="/services" />;
  }

  const post = await getPost(slug);

  if (post) {
    return <ServiceDetailView slug={slug} initialPost={post} />;
  }

  const fullSlug = `services/${slug}`;
  const [{ category, siblings }, categoryEn] = await Promise.all([
    getCategoryWithSiblings(fullSlug, "vi"),
    getCategoryByLink(fullSlug, "en"),
  ]);

  if (category) {
    const posts = await getPostsByCategory(category.id!);
    return (
      <DynamicCategoryPage
        category={category}
        categoryEn={categoryEn}
        initialPosts={posts}
        siblingCategories={siblings}
        parentLink="/services"
      />
    );
  }

  notFound();
}
