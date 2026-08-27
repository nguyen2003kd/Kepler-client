"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useTranslation } from "react-i18next";
import { FadeIn } from "@/components/ui/fade-in";

interface CoreValueItem {
  num: string;
  title: string;
  description: string;
  variant: "red" | "white";
  span: string;
}

interface CoreValuesConfig {
  values: CoreValueItem[];
}

const FALLBACK_VALUES: CoreValueItem[] = [
  {
    num: "01",
    title: "Chất lượng",
    description:
      "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt kỳ vọng của khách hàng.",
    variant: "red",
    span: "lg:col-span-7",
  },
  {
    num: "02",
    title: "Chính trực",
    description:
      "Thượng tôn pháp luật, minh bạch và trách nhiệm trong mọi hoạt động kinh doanh.",
    variant: "white",
    span: "lg:col-span-5",
  },
  {
    num: "03",
    title: "Đổi mới",
    description:
      "Không ngừng sáng tạo, ứng dụng công nghệ để mang lại giải pháp tối ưu cho khách hàng.",
    variant: "white",
    span: "lg:col-span-5",
  },
  {
    num: "04",
    title: "Đồng hành",
    description:
      "Luôn sát cánh cùng khách hàng và đối tác trong mọi giai đoạn phát triển.",
    variant: "red",
    span: "lg:col-span-7",
  },
];

export default function CoreValuesSection() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "vi");

  useEffect(() => {
    const handler = (lng: string) => setCurrentLang(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, [i18n]);

  const isEn = currentLang === "en";
  const configKey = isEn ? "about-core-values_en" : "about-core-values";

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

  const values = useMemo<CoreValueItem[]>(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value) as CoreValuesConfig;
          if (parsed.values && Array.isArray(parsed.values) && parsed.values.length > 0) {
            return parsed.values;
          }
        } catch {
          // fall through
        }
      }
    }
    return FALLBACK_VALUES;
  }, [data]);

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            {isEn ? "Core Values" : "Giá trị cốt lõi"}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {isEn ? "Kepler Cultural Foundation" : "Nền tảng văn hóa Kepler"}
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-5">
          {values.map((value, idx) => {
            return (
              <FadeIn
                key={value.title}
                className={value.span}
                delay={idx * 0.08}
              >
                <div
                  className={`relative h-full rounded-2xl p-8 md:p-10 overflow-hidden group transition-all duration-300 hover:shadow-xl ${
                    value.variant === "red"
                      ? "bg-red-600 text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {value.variant === "white" && (
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-700" />
                  )}

                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className={`text-5xl font-black ${
                          value.variant === "red"
                            ? "text-white/20"
                            : "text-red-600/15"
                        }`}
                      >
                        {value.num}
                      </span>
                    </div>
                    <h3
                      className={`text-2xl font-extrabold tracking-tight mb-3 ${
                        value.variant === "red"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {value.title}
                    </h3>
                    <p
                      className={`leading-relaxed ${
                        value.variant === "red"
                          ? "text-white/90"
                          : "text-gray-600"
                      }`}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
