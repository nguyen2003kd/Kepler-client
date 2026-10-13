import { getMockPostsForCategory } from "@/utils/mock-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import {
  getCategoryByExactLink,
  getPostsByCategory,
} from "@/app/_pages/api-helpers";

interface SubPageProps {
  params: { slug: string[] };
  searchParams: { date?: string };
}

const PREFIX = "chuyen-gia";

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const category = await getCategoryByExactLink(`/${fullSlug}`, "vi");
  if (!category) return { title: "Không tìm thấy trang" };
  return { title: `${category.name} | Kepler Property` };
}

export default async function SubPage({ params, searchParams }: SubPageProps) {
  const fullSlug = `${PREFIX}/${params.slug.join("/")}`;
  const [category, categoryEn] = await Promise.all([
    getCategoryByExactLink(`/${fullSlug}`, "vi"),
    getCategoryByExactLink(`/${fullSlug}`, "en"),
  ]);

  if (!category) notFound();

  const apiPosts = await getPostsByCategory(category!.id!);
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
