"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DestinationCard } from "@/components/ui/card-21";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useMemo } from "react";

interface IntroConfig {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  cardLocation: string;
  cardStats: string;
  cardHref: string;
}

const defaultConfig: IntroConfig = {
  eyebrow: "Hệ sinh thái giải pháp toàn diện",
  title: "Giải pháp toàn diện cho",
  titleHighlight: "bất động sản",
  paragraphs: [
    "Kepler Group là doanh nghiệp hoạt động trong lĩnh vực tư vấn đầu tư, thẩm định giá, phát triển dự án, quản lý và khai thác tài sản, M&A, thiết kế – xây dựng và giải pháp số cho bất động sản.",
    "Chúng tôi kết hợp kinh nghiệm thực tiễn, đội ngũ chuyên gia đa ngành và phương pháp tiếp cận dựa trên dữ liệu nhằm mang đến giải pháp phù hợp cho từng giai đoạn phát triển của dự án và doanh nghiệp.",
    "Kepler không chỉ tư vấn mà còn đồng hành trong quá trình triển khai, vận hành và tối ưu hiệu quả đầu tư.",
  ],
  ctaText: "Xem hồ sơ năng lực",
  ctaLink: "/about",
  imageUrl: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1887",
  cardLocation: "Kepler Group",
  cardStats: "25+ năm · 500+ khách hàng",
  cardHref: "/about",
};

export default function IntroSection() {
  const { data } = useGetApiV10PageConfig(
    { filters: "key==HOME_INTRO" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const config = useMemo<IntroConfig>(() => {
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
    <section className="relative bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block text-sm font-semibold tracking-wider text-red-600 uppercase mb-4">
              {config.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
              {config.title}{" "}
              <span className="text-red-600">{config.titleHighlight}</span> và doanh nghiệp
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed max-w-[65ch]">
              {config.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link
              href={config.ctaLink}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary/90 transition-all hover:shadow-lg group"
            >
              {config.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            className="relative aspect-[4/5]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <DestinationCard
              imageUrl={config.imageUrl}
              location={config.cardLocation}
              flag=""
              stats={config.cardStats}
              href={config.cardHref}
              themeColor="350 70% 45%"
              className="w-full h-full"
            />
            {/* Floating accent */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-50 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
