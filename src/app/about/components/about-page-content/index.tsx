"use client";

import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

interface AboutPageContentProps {
  pageKeyVi: string;
  pageKeyEn: string;
  fallback: ReactNode;
}

export default function AboutPageContent({
  pageKeyVi,
  pageKeyEn,
  fallback,
}: AboutPageContentProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "vi";
  const configKey = lang === "en" ? pageKeyEn : pageKeyVi;

  const { data, isLoading } = useGetApiV10PageConfig(
    { filters: `key==${configKey}`, pageSize: 1 },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    }
  );

  if (isLoading) return <>{fallback}</>;

  const rows = (data?.responseData?.rows as PageConfig[]) ?? [];
  const row = rows.find((r) => r.key === configKey);

  if (!row?.value) return <>{fallback}</>;

  try {
    const parsed = JSON.parse(row.value);
    // If the value is an array of blocks or an object with content, render as HTML
    if (typeof parsed === "string") {
      return <div className="prose max-w-none">{parse(parsed)}</div>;
    }
    if (parsed && typeof parsed === "object" && parsed.content) {
      return (
        <div className="prose max-w-none">
          {parse(
            typeof parsed.content === "string"
              ? parsed.content
              : JSON.stringify(parsed.content)
          )}
        </div>
      );
    }
    // If it's HTML content directly
    return <div className="prose max-w-none">{parse(row.value)}</div>;
  } catch {
    // If JSON parse fails, treat as raw HTML
    return <div className="prose max-w-none">{parse(row.value)}</div>;
  }
}
