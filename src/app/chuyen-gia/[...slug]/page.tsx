import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import baseConfig from "@/configs/base";
import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";

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
    const allCategories = (data?.responseData || []) as CategoryWithChildren[];
    const flat = flattenCategories(allCategories);
    return flat.find((cat) => cat.link === `/${fullSlug}`) || null;
  } catch {
    return null;
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

const PREFIX = "chuyen-gia";

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const category = await getCategory(fullSlug, "vi");
  if (!category) return { title: "Không tìm thấy trang" };
  return { title: `${category.name} | Kepler Property` };
}

export default async function SubPage({ params, searchParams }: SubPageProps) {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const [category, categoryEn] = await Promise.all([
    getCategory(fullSlug, "vi"),
    getCategory(fullSlug, "en"),
  ]);

  if (!category) notFound();

  const apiPosts = await getPostsForCategory(category!.id!);
  const posts =
    apiPosts.length > 0
      ? apiPosts
      : getMockPostsForCategory(category!.id!, category!.name!, category!.link!);

  return (
    <DynamicCategoryPage
      category={category!}
      categoryEn={categoryEn}
      initialPosts={posts}
      date={searchParams.date}
    />
  );
}
