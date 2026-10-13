import { useGetApiV10BaseConfig } from "@/api/endpoints/base-config";
import { BaseConfig } from "@/api/models";

/**
 * Custom hook to fetch page config by key prefix
 * @param keyPrefix - The key prefix to filter (e.g., "CONTACT", "BANNER")
 * @returns Query result with helper function to get value by key
 */
export function useBaseConfigByKey(keyPrefix: string) {
  const query = useGetApiV10BaseConfig(
    {
      filters: `key==${keyPrefix}`,
    },
    {
      query: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    }
  );

  const getConfigValue = (key: string): string => {
    if (!query.data?.responseData?.rows) return "";
    const rows = query.data.responseData.rows as BaseConfig[];
    const config = rows.find((item) => item.key === key);
    return config?.value ?? "";
  };

  const getAllConfigs = (): BaseConfig[] => {
    return (query.data?.responseData?.rows as BaseConfig[]) || [];
  };

  return {
    ...query,
    getConfigValue,
    getAllConfigs,
  };
}

/**
 * Parse JSON value from config, with fallback to empty array
 */
export function parseConfigJSON<T>(value: string, fallback: T[] = []): T[] {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}
