import type { ImageCompressInfo } from "@/types/post";
import { getApiV10Post } from "@/api/endpoints/post";
import { PAGE_IDS } from "@/constants/page-ids";

export interface BoardPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  thumbnail_path?: string;
  thumbnail_compress_info?: ImageCompressInfo;
}

export async function fetchPostsByPageId(
  pageId: string,
  pageSize = 50,
): Promise<BoardPost[]> {
  try {
    const { responseData } = await getApiV10Post({
      page_id: pageId,
      filters: "is_hidden==false",
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      pageSize,
    });
    return ((responseData?.rows || []) as unknown) as BoardPost[];
  } catch {
    return [];
  }
}

export async function fetchBoardMembers(pageSize = 50): Promise<BoardPost[]> {
  return fetchPostsByPageId(PAGE_IDS.BOARD_OF_DIRECTORS, pageSize);
}

export async function fetchExpertCouncil(
  pageSize = 50,
): Promise<BoardPost[]> {
  return fetchPostsByPageId(PAGE_IDS.EXPERT_COUNCIL, pageSize);
}
