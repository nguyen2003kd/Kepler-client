"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";

const FALLBACK = {
  eyebrow: "Lợi thế cạnh tranh",
  title: "Tại sao chọn Kepler",
  image: "/logo.png",
  advantages: [
    "Đội ngũ chuyên gia đa ngành",
    "Kinh nghiệm thực tiễn trong nhiều lĩnh vực bất động sản",
    "Giải pháp xuyên suốt từ tư vấn đến triển khai",
    "Phương pháp làm việc dựa trên dữ liệu",
    "Mạng lưới đối tác rộng",
    "Cam kết minh bạch và bảo mật",
    "Đồng hành dài hạn cùng khách hàng",
  ],
};

export default function WhyChooseUsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data } = useGetApiV10PageConfig(
    { filters: "key==WHY_CHOOSE_US" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const config = useMemo(() => {
    if (!mounted) return FALLBACK;

    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const viRow = rows.find((r: { language?: string }) => r.language === "vi") as
        | { value: string | null }
        | undefined;
      const row = viRow || (rows[0] as { value: string | null });
      if (row?.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.advantages && Array.isArray(parsed.advantages)) {
            return {
              eyebrow: parsed.eyebrow || FALLBACK.eyebrow,
              title: parsed.title || FALLBACK.title,
              image: parsed.image || FALLBACK.image,
              advantages: parsed.advantages as string[],
            };
          }
        } catch {
          // ignore
        }
      }
    }
    return FALLBACK;
  }, [mounted, data]);
  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-50/50 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-red-600 shadow-2xl">
              <Image
                src={config.image}
                alt="Kepler"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.12),_transparent_70%)]" />
              <div className="absolute inset-0 p-12 flex flex-col justify-center gap-6">
                {/* <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "25+", label: "Năm kinh nghiệm" },
                    { num: "500+", label: "Khách hàng" },
                    { num: "100+", label: "Dự án" },
                    { num: "50+", label: "Chuyên gia" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border border-red-500/30 rounded-xl p-5 bg-gradient-to-br from-red-600/40 to-black/60 backdrop-blur-sm"
                    >
                      <p className="text-3xl font-extrabold text-white">
                        {item.num}
                      </p>
                      <p className="text-red-200/70 text-xs mt-1">{item.label}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              {config.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3 mb-8">
              {config.title}
            </h2>
            <ul className="space-y-4">
              {config.advantages.map((advantage: string, index: number) => (
                <motion.li
                  key={advantage}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed">
                    {advantage}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
