import baseConfig from "@/configs/base";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import type { ImageCompressInfo } from "@/types/post";

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
    const catRes = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/category`,
      { cache: "no-store" }
    );
    if (!catRes.ok) return [];
    const catData = await catRes.json();
    const all = (catData?.responseData || []) as CategoryWithChildren[];
    const flat: CategoryWithChildren[] = [];
    const flatten = (cats: CategoryWithChildren[]) => {
      for (const c of cats) {
        flat.push(c);
        if (c.categories) flatten(c.categories);
      }
    };
    flatten(all);
    const cat = flat.find((c) => c.link === categoryLink);
    if (!cat) return [];

    const postRes = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/post?category_id=${cat.id}&filters=is_hidden==false&position=true&sortOrderPosition=ASC&pageSize=${pageSize}&filterBy=CLIENT`,
      { cache: "no-store" }
    );
    if (!postRes.ok) return [];
    const postData = await postRes.json();
    return postData?.responseData?.rows || [];
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
