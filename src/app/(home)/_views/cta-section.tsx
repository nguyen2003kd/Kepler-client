"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useMemo } from "react";

interface CtaConfig {
  title: string;
  titleHighlight: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
}

const defaultConfig: CtaConfig = {
  title: "Cùng Kepler kiến tạo giá trị cho",
  titleHighlight: "dự án của bạn",
  subtitle:
    "Nếu Quý khách đang tìm kiếm một đơn vị tư vấn chuyên nghiệp trong lĩnh vực đầu tư, thẩm định giá, phát triển dự án, quản lý tài sản hoặc M&A, đội ngũ Kepler luôn sẵn sàng đồng hành để đưa ra giải pháp phù hợp với mục tiêu phát triển của doanh nghiệp.",
  cta1Text: "Đặt lịch tư vấn",
  cta1Link: "/contact/lien-he-kepler",
  cta2Text: "Gửi yêu cầu",
  cta2Link: "/lien-he",
};

export default function CtaSection() {
  const { data } = useGetApiV10PageConfig(
    { filters: "key==HOME_CTA" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const config = useMemo<CtaConfig>(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const row = rows[0] as { value?: string | null };
      if (row.value) {
        try {
          return { ...defaultConfig, ...JSON.parse(row.value) };
        } catch {
          return defaultConfig;
        }
      }
    }
    return defaultConfig;
  }, [data]);

  return (
    <section className="relative bg-red-700 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {config.title}{" "}
            <span className="text-red-100">{config.titleHighlight}</span>
          </h2>
          <p className="mt-6 text-red-100 text-base leading-relaxed max-w-[60ch]">
            {config.subtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href={config.cta1Link}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-red-700 text-sm font-semibold rounded-full hover:bg-red-50 transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group"
            >
              {config.cta1Text}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={config.cta2Link}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-all"
            >
              <Mail className="w-4 h-4" />
              {config.cta2Text}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
