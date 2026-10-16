"use client";

import { motion } from "framer-motion";

const steps = [
  ["01", "Hiểu bài toán", "Làm rõ mục tiêu, khẩu vị rủi ro, nguồn lực và kỳ vọng của khách hàng."],
  ["02", "Đọc thị trường", "Kết hợp dữ liệu, khảo sát thực địa và góc nhìn chuyên gia để xác định cơ hội."],
  ["03", "Xây giải pháp", "Thiết kế chiến lược tài sản, giao dịch hoặc phát triển phù hợp."],
  ["04", "Triển khai & tối ưu", "Đồng hành trong thực thi, đo lường kết quả và điều chỉnh theo thị trường."],
] as const;

export default function KeplerPropertyProcess() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Rõ ràng từ bước đầu tiên.
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Một quy trình minh bạch, có thể đo lường và luôn điều chỉnh theo thực tế.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(([number, title, description], index) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition hover:shadow-lg"
          >
            <span className="text-5xl font-bold text-primary/20 transition group-hover:text-primary/40">
              {number}
            </span>
            <h3 className="mt-8 text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{description}</p>
            {index < 3 && (
              <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-primary/20 lg:block" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
