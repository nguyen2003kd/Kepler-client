"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/common/safe-image";
import Link from "next/link";

const POSTS = [
  {
    title: "Phân tích thị trường BĐS quý 2/2025",
    category: "Phân tích",
    image: "/images/image-111.png",
  },
  {
    title: "Nghiên cứu xu hướng dòng vốn ngoại",
    category: "Nghiên cứu",
    image: "/images/image-112.png",
  },
  {
    title: "Báo cáo diễn biến giá thuê văn phòng",
    category: "Báo cáo",
    image: "/images/image-111.png",
  },
  {
    title: "Quy hoạch Thủ Thiêm và cơ hội đầu tư",
    category: "Quy hoạch",
    image: "/images/image-112.png",
  },
  {
    title: "Pháp lý mới về sở hữu nhà ở của người nước ngoài",
    category: "Pháp lý",
    image: "/images/image-111.png",
  },
  {
    title: "Đầu tư BĐS khu công nghiệp: rủi ro & lợi nhuận",
    category: "Đầu tư",
    image: "/images/image-112.png",
  },
];

export default function MarketSection() {
  return (
    <section className="relative bg-gray-50 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Thị trường
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            Góc nhìn thị trường
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href="#"
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <SafeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2 leading-snug">
                    {post.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 mt-4 text-red-600 text-sm font-semibold group-hover:gap-3 transition-all">
                    Chi tiết
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
