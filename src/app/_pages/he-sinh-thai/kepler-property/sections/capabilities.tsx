"use client";

import { ArrowUpRight, BarChart3, Building2, Handshake, KeyRound, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEcosystemUnits } from "../../use-ecosystem-units";

const iconMap: Record<string, typeof BarChart3> = {
  "Tư vấn đầu tư": BarChart3,
  "Môi giới": Handshake,
  "Leasing": KeyRound,
  "Phát triển dự án": Building2,
};

const descMap: Record<string, string> = {
  "Tư vấn đầu tư": "Phân tích thị trường, dòng tiền, rủi ro và hiệu quả để ra quyết định có cơ sở.",
  "Môi giới": "Kết nối đúng tài sản, đúng đối tác và đúng thời điểm cho từng giao dịch.",
  "Leasing": "Tối ưu tỷ lệ lấp đầy, giá thuê và trải nghiệm cho chủ tài sản và khách thuê.",
  "Phát triển dự án": "Từ ý tưởng, nghiên cứu khả thi đến chiến lược sản phẩm và triển khai thị trường.",
};

export default function KeplerPropertyCapabilities() {
  const units = useEcosystemUnits();
  const unit = units["kepler-property"];

  return (
    <section id="nang-luc" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Một đối tác. Nhiều góc nhìn.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {unit.name} kết nối dữ liệu, năng lực giao dịch và tư duy phát triển để tạo ra giải pháp phù hợp với vòng đời tài sản.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {unit.items.map((item, index) => {
            const Icon = iconMap[item] || TrendingUp;
            const description = descMap[item] || "Đội ngũ chuyên môn đồng hành từ tư vấn đến triển khai thực tế.";
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl p-8 transition hover:shadow-lg ${
                  index === 0
                    ? "bg-primary text-white"
                    : "border border-gray-200 bg-white hover:border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index === 0 ? "bg-white/20" : "bg-primary/10"
                  }`}>
                    <Icon className={`h-6 w-6 ${index === 0 ? "text-white" : "text-primary"}`} />
                  </div>
                  <ArrowUpRight className={`h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    index === 0 ? "text-white/30" : "text-gray-300 group-hover:text-primary"
                  }`} />
                </div>
                <span className={`mt-20 block text-sm font-medium uppercase tracking-[0.25em] ${
                  index === 0 ? "text-white/80" : "text-primary"
                }`}>
                  0{index + 1}
                </span>
                <h3 className={`mt-3 text-2xl font-bold ${index === 0 ? "text-white" : "text-gray-900"}`}>{item}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${index === 0 ? "text-white/70" : "text-gray-500"}`}>{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
