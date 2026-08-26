import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import baseConfig from "@/configs/base";
import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import DynamicPostDetailPage from "@/app/[...slug]/views/post-detail-page";
import type { PostExtended } from "@/types/post";

interface SubPageProps {
  params: { slug: string[] };
  searchParams: { date?: string };
}

function flattenCategories(cats: CategoryWithChildren[], result: CategoryWithChildren[] = []): CategoryWithChildren[] {
  for (const c of cats) {
    result.push(c);
    if (c.categories) flattenCategories(c.categories, result);
  }
  return result;
}

async function getCategory(fullSlug: string, language?: "vi" | "en") {
  try {
    const url = new URL(`${baseConfig.backendDomain}/api/v1.0/category`);
    if (language) url.searchParams.set("language", language);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const all = (data?.responseData || []) as CategoryWithChildren[];
    const flat = flattenCategories(all);
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
    const flat = flattenCategories(all);
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

const PREFIX = "kien-thuc";

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const category = await getCategory(fullSlug, "vi");
  if (category) {
    return { title: `${category.name} | Kepler Property`, description: category.description || category.name };
  }
  const lastSlug = params.slug.at(-1)!;
  const post = await getPost(lastSlug);
  if (post) {
    return { title: `${post.title} | Kepler Property`, description: post.summary?.replace(/<[^>]*>/g, "").slice(0, 160) || "" };
  }
  return { title: "Không tìm thấy trang" };
}

export default async function SubPage({ params, searchParams }: SubPageProps) {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const lastSlug = params.slug.at(-1)!;
  const parentSlug = params.slug.slice(0, -1).join("/");
  const parentFullSlug = `${PREFIX}/${parentSlug}`;

  // 1. Try post by last slug segment
  const post = await getPost(lastSlug);
  if (post) {
    const parentCategory = await getCategory(parentFullSlug);
    return (
      <DynamicPostDetailPage
        post={post}
        categoryName={parentCategory?.name || "Kiến thức"}
        categorySlug={parentFullSlug}
        urlCategoryId={parentCategory?.id}
      />
    );
  }

  // 2. Try category page
  const [{ category, siblings }, categoryEn] = await Promise.all([
    getCategoryWithSiblings(fullSlug, "vi"),
    getCategory(fullSlug, "en"),
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
        date={searchParams.date}
        siblingCategories={siblings}
        parentLink={`/${PREFIX}`}
      />
    );
  }

  notFound();
}
