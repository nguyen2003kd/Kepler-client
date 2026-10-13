import { cache } from "react";
import { getApiV10Page } from "@/api/endpoints/page";

export type PageRecord = {
  id?: string;
  name?: string | null;
  description?: string | null;
  type?: string | null;
  path?: string | null;
};

export const normalizePagePath = (path: string) =>
  "/" + path.replace(/^\/+|\/+$/g, "");

// pages.path chi luu segment cuoi (vd /company-overview), nen lookup luon theo segment cuoi.
export const getPageByPath = cache(
  async (path: string): Promise<PageRecord | null> => {
    const normalized = normalizePagePath(path);
    if (!normalized || normalized === "/") return null;
    try {
      const { responseData } = await getApiV10Page({
        pageSize: 1,
        filters: `path==${normalized}`,
      });
      const rows = (responseData?.rows ||
        (responseData as unknown as PageRecord[]) ||
        []) as PageRecord[];
      return rows[0] || null;
    } catch {
      return null;
    }
  },
);
