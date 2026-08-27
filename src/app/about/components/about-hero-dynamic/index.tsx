"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useTranslation } from "react-i18next";
import AboutHero from "../about-hero";

interface HeroConfig {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}

interface AboutHeroDynamicProps {
  configKeyVi: string;
  configKeyEn: string;
  fallbackEyebrow: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackImage?: string;
}

export default function AboutHeroDynamic({
  configKeyVi,
  configKeyEn,
  fallbackEyebrow,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}: AboutHeroDynamicProps) {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "vi");

  useEffect(() => {
    const handler = (lng: string) => setCurrentLang(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, [i18n]);

  const isEn = currentLang === "en";
  const configKey = isEn ? configKeyEn : configKeyVi;

  const { data } = useGetApiV10PageConfig(
    { filters: `key==${configKey}`, pageSize: 1 },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    }
  );

  const config = useMemo<HeroConfig>(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed && typeof parsed === "object") {
            return {
              eyebrow: parsed.eyebrow || fallbackEyebrow,
              title: parsed.title || fallbackTitle,
              description: parsed.description || fallbackDescription,
              image: parsed.image || fallbackImage,
            };
          }
        } catch {
          // fall through
        }
      }
    }
    return {
      eyebrow: fallbackEyebrow,
      title: fallbackTitle,
      description: fallbackDescription,
      image: fallbackImage,
    };
  }, [data, fallbackEyebrow, fallbackTitle, fallbackDescription, fallbackImage]);

  return (
    <AboutHero
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      image={config.image}
    />
  );
}
