"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useTranslation } from "react-i18next";
import { FadeIn } from "@/components/ui/fade-in";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const FALLBACK_STATS_VI: StatItem[] = [
  { value: 25, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 8, suffix: "", label: "Công ty thành viên" },
  { value: 7, suffix: "", label: "Lĩnh vực dịch vụ" },
  { value: 50, suffix: "+", label: "Chuyên gia & Cố vấn" },
];

const FALLBACK_STATS_EN: StatItem[] = [
  { value: 25, suffix: "+", label: "Years of experience" },
  { value: 8, suffix: "", label: "Member companies" },
  { value: 7, suffix: "", label: "Service areas" },
  { value: 50, suffix: "+", label: "Experts & Advisors" },
];

function CountUp({
  end,
  suffix,
  duration = 2000,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const formatNumber = (n: number) => {
      const rounded = Math.floor(n);
      if (rounded >= 1000) return `${Math.floor(rounded / 1000)}.000`;
      return `${rounded}`;
    };

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = end * easeOutQuart(progress);

            el.textContent = formatNumber(current) + suffix;

            if (progress < 1) {
              rafId = requestAnimationFrame(tick);
            } else {
              el.textContent = formatNumber(end) + suffix;
            }
          };

          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [end, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutStatsSection() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || "vi");

  useEffect(() => {
    const handler = (lng: string) => setCurrentLang(lng);
    i18n.on("languageChanged", handler);
    return () => i18n.off("languageChanged", handler);
  }, [i18n]);

  const isEn = currentLang === "en";
  const configKey = isEn ? "STATS_NUMBERS_EN" : "STATS_NUMBERS";
  const fallback = isEn ? FALLBACK_STATS_EN : FALLBACK_STATS_VI;

  const { data } = useGetApiV10PageConfig(
    { filters: `key==${configKey}` },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  );

  const stats: StatItem[] = useMemo(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value: string | null };
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.stats && Array.isArray(parsed.stats) && parsed.stats.length > 0) {
            return parsed.stats as StatItem[];
          }
        } catch {
          // fall through to fallback
        }
      }
    }
    return fallback;
  }, [data, fallback]);

  return (
    <section className="relative bg-[#DC2626] py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:48px_48px]" />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 0.08}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-red-100 uppercase tracking-wider font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
