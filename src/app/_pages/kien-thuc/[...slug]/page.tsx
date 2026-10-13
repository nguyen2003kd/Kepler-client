import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import DynamicPostDetailPage from "@/app/[...slug]/views/post-detail-page";
import {
  getCategoryByExactLink,
  getCategoryWithSiblings,
  getPostBySlug,
  getPostsByCategory,
} from "@/app/_pages/api-helpers";

interface SubPageProps {
  params: { slug: string[] };
  searchParams: { date?: string };
}

const PREFIX = "kien-thuc";

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const category = await getCategoryByExactLink(`/`+fullSlug, "vi");
  if (category) {
    return { title: `${category.name} | Kepler Property`, description: category.description || category.name };
  }
  const lastSlug = params.slug.at(-1)!;
  const post = await getPostBySlug(lastSlug);
  if (post) {
    return { title: `${post.title} | Kepler Property`, description: post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "" };
  }
  return { title: "KhÃ´ng tÃ¬m tháº¥y trang" };
}

export default async function SubPage({ params, searchParams }: SubPageProps) {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const lastSlug = params.slug.at(-1)!;
  const parentSlug = params.slug.slice(0, -1).join("/");
  const parentFullSlug = `${PREFIX}/${parentSlug}`;

  // 1. Try post by last slug segment
  const post = await getPostBySlug(lastSlug);
  if (post) {
    const parentCategory = await getCategoryByExactLink(`/`+parentFullSlug, "vi");
    return (
      <DynamicPostDetailPage
        post={post}
        categoryName={parentCategory?.name || "Kiáº¿n thá»©c"}
        categorySlug={parentFullSlug}
        urlCategoryId={parentCategory?.id}
      />
    );
  }

  // 2. Try category page
  const [{ category, siblings }, categoryEn] = await Promise.all([
    getCategoryWithSiblings(fullSlug, "vi"),
    getCategoryByExactLink(`/${fullSlug}`, "en"),
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
        parentLink={`/${PREFIX}`}
      />
    );
  }

  notFound();
}
