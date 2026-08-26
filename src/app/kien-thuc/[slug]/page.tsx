import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import baseConfig from "@/configs/base";
import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import ArticleDetailPage from "./article-detail";

interface KienThucSlugPageProps {
  params: { slug: string };
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

export async function generateMetadata({ params }: KienThucSlugPageProps): Promise<Metadata> {
  const fullSlug = `kien-thuc/${params.slug}`;
  const category = await getCategory(fullSlug, "vi");
  if (category) {
    return {
      title: `${category.name} | Kepler Property`,
      description: category.description || category.name,
    };
  }
  return { title: "Kiến thức | Kepler Property" };
}

export default async function KienThucSlugPage({ params, searchParams }: KienThucSlugPageProps) {
  const fullSlug = `kien-thuc/${params.slug}`;

  // Try category page first (e.g. /kien-thuc/tai-chinh-khoan-vay)
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
        parentLink="/kien-thuc"
      />
    );
  }

  // Not a category — render article detail (client component with mock data)
  return <ArticleDetailPage />;
}
