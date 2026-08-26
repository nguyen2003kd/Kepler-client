import { notFound } from "next/navigation";
import { experts, getExpertBySlug } from "../expert-data";
import ExpertProfileContent from "./expert-profile-content";
import { getCategoryByLink, getPostsForCategory } from "./category-helpers";
import DynamicCategoryPage from "@/app/[...slug]/views/category-page";
import { getMockPostsForCategory } from "@/utils/mock-data";

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export default async function ExpertProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const expert = getExpertBySlug(params.slug);

  if (expert) {
    return <ExpertProfileContent expert={expert} />;
  }

  // Try category page (e.g. /chuyen-gia/gioi-thieu)
  const fullSlug = `chuyen-gia/${params.slug}`;
  const category = await getCategoryByLink(fullSlug, "vi");
  const categoryEn = await getCategoryByLink(fullSlug, "en");

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
      />
    );
  }

  notFound();
}

