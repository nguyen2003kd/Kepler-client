"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useTranslation } from "react-i18next";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const FALLBACK_STATS_VI: StatItem[] = [
  { value: 25, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 500, suffix: "+", label: "Khách hàng doanh nghiệp" },
  { value: 2000, suffix: "+", label: "Tài sản đã tư vấn" },
  { value: 100, suffix: "+", label: "Dự án tham gia" },
  { value: 50, suffix: "+", label: "Chuyên gia và cộng tác viên" },
  { value: 100000, suffix: "+", label: "m² diện tích quản lý" },
];

const FALLBACK_STATS_EN: StatItem[] = [
  { value: 25, suffix: "+", label: "Years of experience" },
  { value: 500, suffix: "+", label: "Corporate clients" },
  { value: 2000, suffix: "+", label: "Assets consulted" },
  { value: 100, suffix: "+", label: "Projects involved" },
  { value: 50, suffix: "+", label: "Experts & collaborators" },
  { value: 100000, suffix: "+", label: "m² managed area" },
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

    // easeOutQuart: nhanh đầu, chậm dần về cuối, cảm giác mượt hơn linear
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

export default function StatsSection() {
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
    <section className="relative bg-red-700 py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-14 will-change-transform"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Những con số tạo nên năng lực
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/15 rounded-2xl overflow-hidden">
          {stats.map((stat: StatItem, index: number) => (
            <motion.div
              key={stat.label}
              className="bg-red-700 p-8 md:p-10 text-center group hover:bg-red-600 transition-colors will-change-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm md:text-base text-red-100 group-hover:text-white transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
