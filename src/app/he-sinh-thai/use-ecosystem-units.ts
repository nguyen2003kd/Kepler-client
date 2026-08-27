"use client";

import { useMemo } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { units as fallbackUnits, EcosystemUnit } from "./unit-data";

interface ApiMember {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  logo: string;
  tags: string[];
  link: string;
  overview?: string;
  industries?: string[];
  products?: string[];
  clients?: string;
}

export function useEcosystemUnits(): Record<string, EcosystemUnit> {
  const { data } = useGetApiV10PageConfig(
    { filters: "key==ECOSYSTEM_MEMBERS" },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  );

  return useMemo(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const viRow = rows.find(
        (r: { language?: string }) => r.language === "vi",
      ) as { value: string | null } | undefined;
      const row = viRow || (rows[0] as { value: string | null });
      if (row?.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.members && Array.isArray(parsed.members)) {
            const apiUnits: Record<string, EcosystemUnit> = {};
            for (const member of parsed.members as ApiMember[]) {
              if (!member.slug) continue;
              apiUnits[member.slug] = {
                name: member.name || fallbackUnits[member.slug]?.name || member.slug,
                eyebrow: member.eyebrow || fallbackUnits[member.slug]?.eyebrow || "",
                description: member.description || fallbackUnits[member.slug]?.description || "",
                items: member.tags || fallbackUnits[member.slug]?.items || [],
                overview: member.overview || fallbackUnits[member.slug]?.overview || "",
                industries: member.industries || fallbackUnits[member.slug]?.industries || [],
                products: member.products || fallbackUnits[member.slug]?.products || [],
                clients: member.clients || fallbackUnits[member.slug]?.clients || "",
                image: member.image || fallbackUnits[member.slug]?.image || "",
              };
            }
            return { ...fallbackUnits, ...apiUnits };
          }
        } catch {
          // fall through to fallback
        }
      }
    }
    return fallbackUnits;
  }, [data]);
}
