import links from "@/lib/links";
import type { ImageCompressInfo } from "@/types/post";

const prefixUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/api/storage/")) {
    return `${links.storageEndpoint}${path}`;
  }
  return path;
};

export const getResponsiveImage = (
  compressInfo?: ImageCompressInfo
): string => {
  if (!compressInfo) return "";

  if (typeof window === "undefined") {
    return prefixUrl(compressInfo.desktop || "");
  }

  const width = window.innerWidth;
  const selectedPath =
    width < 768
      ? compressInfo.mobile || compressInfo.desktop || ""
      : width < 1024
      ? compressInfo.tablet || compressInfo.desktop || ""
      : compressInfo.desktop || "";

  return prefixUrl(selectedPath);
};

/**
 * Lấy URL ảnh thumbnail, ưu tiên compress_info, fallback sang thumbnail_path.
 * @param compressInfo  - ImageCompressInfo (có thể null/undefined)
 * @param thumbnailPath - đường dẫn thô (string | null | undefined)
 * @param fallback      - URL placeholder nếu cả hai đều rỗng
 */
export const getThumbnailSrc = (
  compressInfo: ImageCompressInfo | null | undefined,
  thumbnailPath?: string | null,
  fallback = "/seo.png"
): string => {
  if (compressInfo) {
    const url = getResponsiveImage(compressInfo);
    if (url) return url;
  }
  if (thumbnailPath) {
    return prefixUrl(thumbnailPath);
  }
  return fallback;
};
