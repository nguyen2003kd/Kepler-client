"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const SOLUTIONS = [
  {
    target: "Chủ đầu tư",
    icon: "Building2",
    items: ["Phát triển dự án", "Chiến lược kinh doanh", "Marketing", "Bán hàng"],
  },
  {
    target: "Chủ tài sản",
    icon: "Landmark",
    items: ["Thẩm định", "Quản lý", "Cho thuê", "Tăng giá trị tài sản"],
  },
  {
    target: "Nhà đầu tư",
    icon: "TrendingUp",
    items: ["Phân tích đầu tư", "Due Diligence", "M&A", "Định giá"],
  },
  {
    target: "Doanh nghiệp",
    icon: "Briefcase",
    items: ["Thuê văn phòng", "Quản lý tài sản", "Tư vấn tài chính", "Mở rộng hoạt động"],
  },
  {
    target: "Ngân hàng",
    icon: "Banknote",
    items: ["Thẩm định giá", "Định giá tài sản bảo đảm", "Kiểm soát rủi ro"],
  },
  {
    target: "Đối tác",
    icon: "Handshake",
    items: ["Đồng đầu tư", "Đồng phát triển", "Hợp tác kinh doanh"],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h9v18h-9V3zM13.5 9h6v12h-6V9zM7.5 6.75h2.25M7.5 10.5h2.25M7.5 14.25h2.25" />
    </svg>
  ),
  Landmark: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4.5 21V10.5M9.5 21V10.5M14.5 21V10.5M19.5 21V10.5M2 10.5L12 3l10 7.5" />
    </svg>
  ),
  TrendingUp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  Briefcase: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.25a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 8.25v4.239c0 .621.27 1.18.75 1.661m16.5 0H3.75m16.5 0V11.25" />
    </svg>
  ),
  Banknote: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3M3.75 5.25v13.5h16.5V5.25H3.75z" />
    </svg>
  ),
  Handshake: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l4.5 4.5m0 0l3-3m-3 3l-1.5-1.5M21 7.5l-4.5 4.5M21 7.5l-3-3m3 3l-4.5-4.5M16.5 12l-3 3m0 0l-1.5-1.5m1.5 1.5l-1.5 1.5M9 12.75l1.5 1.5M9 12.75L7.5 14.25" />
    </svg>
  ),
};

export default function SolutionsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-gray-50 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Giải pháp theo đối tượng
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            Giải pháp dành cho từng nhu cầu
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution, index) => {
            const Icon = ICON_MAP[solution.icon];
            const isActive = active === index;
            return (
              <motion.div
                key={solution.target}
                onMouseEnter={() => setActive(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`group relative rounded-xl border p-8 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-red-200 bg-red-50/50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary text-white">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {solution.target}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {solution.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
