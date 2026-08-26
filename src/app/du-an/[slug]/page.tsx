import baseConfig from "@/configs/base";
import type { PostExtended } from "@/types/post";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicPostDetailPage from "@/app/[...slug]/views/post-detail-page";

interface ProjectDetailPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<PostExtended | null> {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post/slug/${slug}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.responseData as PostExtended) || null;
  } catch {
    return null;
  }
}

async function getCategory(language?: "vi" | "en") {
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
    return flat.find((cat) => cat.link === "/du-an") || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Không tìm thấy dự án",
      description: "Dự án không tồn tại hoặc đã bị xóa.",
    };
  }

  const thumbnailUrl =
    post.thumbnail_compress_info?.desktop
      ? `${baseConfig.backendDomain}${post.thumbnail_compress_info.desktop}`
      : post.thumbnail_path
        ? `${baseConfig.backendDomain}${post.thumbnail_path}`
        : undefined;

  const pageUrl = `${baseConfig.frontendDomain}/du-an/${params.slug}`;
  const description = post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "Dự án Kepler";

  return {
    title: `${post.title} | Kepler Property`,
    description,
    openGraph: {
      title: post.title || "Dự án",
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
      title: post.title || "Dự án",
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [post, category] = await Promise.all([
    getPost(params.slug),
    getCategory("vi"),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <DynamicPostDetailPage
      post={post}
      categoryName={category?.name || "Dự án"}
      categorySlug="du-an"
      urlCategoryId={category?.id}
    />
  );
}
