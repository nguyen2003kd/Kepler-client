import { cache } from "react";
import {
  getApiV10Category,
} from "@/api/endpoints/category";
import {
  getApiV10Post,
  getApiV10PostSlugSlug,
} from "@/api/endpoints/post";
import type { GetApiV10CategoryParams } from "@/api/models/getApiV10CategoryParams";
import type { GetApiV10PostParams } from "@/api/models/getApiV10PostParams";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { PostExtended } from "@/types/post";

function flattenCategories(
  cats: CategoryWithChildren[],
  result: CategoryWithChildren[] = [],
): CategoryWithChildren[] {
  for (const c of cats) {
    result.push(c);
    if (c.categories) flattenCategories(c.categories, result);
  }
  return result;
}

/** Lay toan bo category tree (server side) qua orval client. */
export const fetchCategoryTree = cache(
  async (
    params?: GetApiV10CategoryParams,
  ): Promise<CategoryWithChildren[]> => {
    try {
      const { responseData } = await getApiV10Category(params);
      return responseData || [];
    } catch {
      return [];
    }
  },
);

export async function getCategoryByLink(
  link: string,
  language?: "vi" | "en",
): Promise<CategoryWithChildren | null> {
  const all = await fetchCategoryTree(language ? { language } : undefined);
  const flat = flattenCategories(all);
  return (
    flat.find((cat) => cat.link === `/${link}`) ||
    flat.find((cat) => cat.link === link) ||
    null
  );
}

export async function getCategoryByExactLink(
  link: string,
  language?: "vi" | "en",
): Promise<CategoryWithChildren | null> {
  const all = await fetchCategoryTree(language ? { language } : undefined);
  const flat = flattenCategories(all);
  return flat.find((cat) => cat.link === link) || null;
}

export async function getCategoryWithSiblings(
  slug: string,
  language?: "vi" | "en",
): Promise<{
  category: CategoryWithChildren | null;
  siblings: CategoryWithChildren[];
}> {
  const all = await fetchCategoryTree(language ? { language } : undefined);
  const flat = flattenCategories(all);
  const category =
    flat.find((cat) => cat.link === `/${slug}`) ||
    flat.find((cat) => cat.link === slug) ||
    null;
  let siblings: CategoryWithChildren[] = [];
  if (category?.parent_category_id) {
    const parent = flat.find((cat) => cat.id === category.parent_category_id);
    siblings = parent?.categories || [];
  }
  return { category, siblings };
}

export async function getPostsByCategory(
  categoryId: string,
  extraParams?: Omit<GetApiV10PostParams, "category_id">,
): Promise<PostExtended[]> {
  try {
    const { responseData } = await getApiV10Post({
      category_id: categoryId,
      filters: "is_hidden==false",
      sortField: "created_at",
      sortOrder: "desc",
      pageSize: 999,
      ...extraParams,
    });
    return (responseData?.rows || []) as PostExtended[];
  } catch {
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
): Promise<PostExtended | null> {
  try {
    const { responseData } = await getApiV10PostSlugSlug(slug);
    return (responseData as PostExtended) || null;
  } catch {
    return null;
  }
}
