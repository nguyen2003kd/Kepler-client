import type { Metadata } from "next";
import { Suspense } from "react";
import { getMockPostsForCategory } from "@/utils/mock-data";
import { getCategoryByLink, getPostsByCategory } from "@/app/_pages/api-helpers";
import GalleryView from "./views/gallery-view";

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
  const category = await getCategoryByLink("kien-thuc", "vi");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Không tìm thấy trang</p>
      </div>
    );
  }

  const apiPosts = await getPostsByCategory(category.id!);
  const posts =
    apiPosts.length > 0
      ? apiPosts
      : getMockPostsForCategory(category.id!, category.name!, category.link!);

  return (
    <Suspense>
      <GalleryView category={category} initialPosts={posts} />
    </Suspense>
  );
}
