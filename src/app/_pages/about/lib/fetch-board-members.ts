import type { ImageCompressInfo } from "@/types/post";
import { getCategoryByExactLink, getPostsByCategory } from "@/app/_pages/api-helpers";

export interface BoardPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  thumbnail_path?: string;
  thumbnail_compress_info?: ImageCompressInfo;
}

export async function fetchPostsByCategoryLink(
  categoryLink: string,
  pageSize = 50
): Promise<BoardPost[]> {
  try {
    const cat = await getCategoryByExactLink(categoryLink);
    if (!cat) return [];

    return (await getPostsByCategory(cat.id!, {
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      pageSize,
    })) as BoardPost[];
  } catch {
    return [];
  }
}

export async function fetchBoardMembers(
  pageSize = 50
): Promise<BoardPost[]> {
  return fetchPostsByCategoryLink("/about/board-of-directors", pageSize);
}

export async function fetchExpertCouncil(
  pageSize = 50
): Promise<BoardPost[]> {
  return fetchPostsByCategoryLink("/about/expert-council", pageSize);
}
