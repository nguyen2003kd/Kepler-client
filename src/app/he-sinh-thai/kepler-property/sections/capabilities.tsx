"use client";

import { ArrowUpRight, BarChart3, Building2, Handshake, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  [BarChart3, "Tư vấn đầu tư", "Phân tích thị trường, dòng tiền, rủi ro và hiệu quả để ra quyết định có cơ sở."],
  [Handshake, "Môi giới", "Kết nối đúng tài sản, đúng đối tác và đúng thời điểm cho từng giao dịch."],
  [KeyRound, "Leasing", "Tối ưu tỷ lệ lấp đầy, giá thuê và trải nghiệm cho chủ tài sản và khách thuê."],
  [Building2, "Phát triển dự án", "Từ ý tưởng, nghiên cứu khả thi đến chiến lược sản phẩm và triển khai thị trường."],
] as const;

export default function KeplerPropertyCapabilities() {
  return (
    <section id="nang-luc" className="bg-gray-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Một đối tác. Nhiều góc nhìn.
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Kepler Property kết nối dữ liệu, năng lực giao dịch và tư duy phát triển để tạo ra giải pháp phù hợp với vòng đời tài sản.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([Icon, title, description], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl p-8 backdrop-blur-sm transition hover:bg-white/10 ${
                index === 0
                  ? "border border-primary/30 bg-primary/10"
                  : "border border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/20 transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <span className="mt-20 block text-sm font-medium uppercase tracking-[0.25em] text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
