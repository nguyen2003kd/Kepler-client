"use client";

import { motion } from "framer-motion";
import { units } from "../unit-data";

const stories: Record<string, { label: string; title: string; copy: string }> = {
  "kpc-appraisal": { label: "Accuracy matters", title: "Một quyết định tốt bắt đầu từ một giá trị đúng.", copy: "KPC Appraisal cung cấp góc nhìn độc lập, minh bạch và có cơ sở cho các quyết định tài chính, đầu tư và giao dịch." },
  "kmc-management": { label: "Operate better", title: "Tài sản tốt hơn mỗi ngày.", copy: "KMC Management kết hợp con người, quy trình và dữ liệu để nâng cao chất lượng vận hành và hiệu quả khai thác." },
  "kac-advisory": { label: "Create value", title: "Biến chiến lược thành giá trị có thể đo lường.", copy: "KAC Advisory đồng hành trong các quyết định M&A, tái cấu trúc, tài chính và cấu trúc vốn." },
  "k-homes": { label: "Make it real", title: "Không gian bắt đầu từ một ý tưởng đúng.", copy: "K-Homes kết nối thiết kế, vật liệu và thi công để tạo nên những công trình có tính cách và khả năng vận hành thực tế." },
  realhub: { label: "One connected platform", title: "Dữ liệu giúp thị trường vận hành thông minh hơn.", copy: "RealHub kết nối tài sản, con người, dữ liệu và công cụ số trong một nền tảng PropTech thống nhất." },
  "kepler-property": { label: "Real estate, connected", title: "Một góc nhìn rộng hơn cho mỗi quyết định.", copy: "Kepler Property kết nối phân tích, giao dịch và phát triển để biến cơ hội bất động sản thành giá trị dài hạn." },
};

export default function UnitStory({ unitKey }: { unitKey: keyof typeof units }) {
  const story = stories[unitKey];
  return (
    <section className="bg-gray-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-[.5fr_1.5fr] lg:items-start"
        >
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
            {story.label}
          </span>
          <div>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {story.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50">
              {story.copy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
