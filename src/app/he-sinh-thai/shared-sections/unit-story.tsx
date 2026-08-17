"use client";

import { motion } from "framer-motion";
import { units } from "../unit-data";

const stories: Record<string, { label: string; title: string; copy: string; stat: string; statLabel: string }> = {
  "kpc-appraisal": { label: "Accuracy matters", title: "Một quyết định tốt bắt đầu từ một giá trị đúng.", copy: "KPC Appraisal cung cấp góc nhìn độc lập, minh bạch và có cơ sở cho các quyết định tài chính, đầu tư và giao dịch.", stat: "100%", statLabel: "Độc lập & khách quan" },
  "kmc-management": { label: "Operate better", title: "Tài sản tốt hơn mỗi ngày.", copy: "KMC Management kết hợp con người, quy trình và dữ liệu để nâng cao chất lượng vận hành và hiệu quả khai thác.", stat: "24/7", statLabel: "Giám sát liên tục" },
  "kac-advisory": { label: "Create value", title: "Biến chiến lược thành giá trị có thể đo lường.", copy: "KAC Advisory đồng hành trong các quyết định M&A, tái cấu trúc, tài chính và cấu trúc vốn.", stat: "500+", statLabel: "Giao dịch tư vấn" },
  "k-homes": { label: "Make it real", title: "Không gian bắt đầu từ một ý tưởng đúng.", copy: "K-Homes kết nối thiết kế, vật liệu và thi công để tạo nên những công trình có tính cách và khả năng vận hành thực tế.", stat: "100+", statLabel: "Công trình hoàn thiện" },
  realhub: { label: "One connected platform", title: "Dữ liệu giúp thị trường vận hành thông minh hơn.", copy: "RealHub kết nối tài sản, con người, dữ liệu và công cụ số trong một nền tảng PropTech thống nhất.", stat: "1", statLabel: "Nền tảng duy nhất" },
  "kepler-property": { label: "Real estate, connected", title: "Một góc nhìn rộng hơn cho mỗi quyết định.", copy: "Kepler Property kết nối phân tích, giao dịch và phát triển để biến cơ hội bất động sản thành giá trị dài hạn.", stat: "25+", statLabel: "Năm kinh nghiệm" },
};

export default function UnitStory({ unitKey }: { unitKey: keyof typeof units }) {
  const story = stories[unitKey];
  return (
    <section className="relative overflow-hidden bg-gray-900 py-24 lg:py-32">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blob */}
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:items-start"
        >
          {/* Left — label + stat */}
          <div className="space-y-8">
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              {story.label}
            </span>
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{story.stat}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{story.statLabel}</p>
              </div>
            </div>
          </div>

          {/* Right — title + copy */}
          <div>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {story.title}
            </h2>
            <div className="mt-6 h-px w-16 bg-primary" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50">
              {story.copy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
