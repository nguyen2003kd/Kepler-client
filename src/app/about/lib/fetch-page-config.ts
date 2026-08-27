import baseConfig from "@/configs/base";

export interface CertDataItem {
  id: string;
  img: string;
  "describe-img": string;
  content: string;
}

export interface CertConfig {
  title: string;
  describe: string;
  data: CertDataItem[];
}

export interface CapabilityConfig {
  title: string;
  description: string;
  fileUrl?: string;
  imageUrl?: string;
}

export async function fetchPageConfig<T>(
  key: string
): Promise<T | null> {
  try {
    const res = await fetch(
      `${baseConfig.backendDomain}/api/v1.0/pageConfig?filters=key==${key}&pageSize=1`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const rows = json?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          return JSON.parse(row.value) as T;
        } catch {
          return null;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  return path.startsWith("http") ? path : `${baseConfig.imgEndpointDomain}${path}`;
}
