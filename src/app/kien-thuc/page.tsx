import baseConfig from "@/configs/base";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { Metadata } from "next";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import { getMockPostsForCategory } from "@/utils/mock-data";

async function getCategoryByLink(link: string, language?: "vi" | "en") {
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
    return flat.find((cat) => cat.link === `/${link}`) || null;
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

export async function generateMetadata(): Promise<Metadata> {
  const category = await getCategoryByLink("kien-thuc", "vi");
  if (category) {
    return {
      title: `${category.name} | Kepler Property`,
      description: category.description || category.name,
    };
  }
  return { title: "Kiến thức | Kepler Property" };
}

export default async function KienThucPage() {
  const [category, categoryEn] = await Promise.all([
    getCategoryByLink("kien-thuc", "vi"),
    getCategoryByLink("kien-thuc", "en"),
  ]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy trang</p>
      </div>
    );
  }

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
      siblingCategories={category.categories || []}
      parentLink="/kien-thuc"
    />
  );
}
