"use client";

import SafeImage from "@/components/common/safe-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function KeplerPropertyProjects() {
  return (
    <section className="bg-gray-900 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Những bài toán đang được kiến tạo.
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Dự án, nội dung thị trường và câu chuyện khách hàng.
            </p>
          </div>
          <Link
            href="/du-an?category=dfe9d415-8536-44bd-90b3-945c74f83425"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Xem Case Study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/news"
              className="group relative block min-h-[420px] overflow-hidden rounded-3xl"
            >
              <SafeImage
                src="/images/banner-1.png"
                alt="Dự án Kepler Property"
                fill
                className="object-cover opacity-70 transition duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                  Featured Case Study
                </span>
                <h3 className="mt-3 text-3xl font-bold text-white">
                  Từ phân tích đến chiến lược tài sản
                </h3>
              </div>
            </Link>
          </motion.div>
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl bg-primary p-8"
            >
              <p className="text-5xl font-bold text-white">360°</p>
              <p className="mt-5 max-w-xs text-lg font-bold text-white">
                Góc nhìn xuyên suốt vòng đời bất động sản.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <p className="text-sm leading-relaxed text-white/50">
                Các dự án, nội dung thị trường và câu chuyện khách hàng được cập nhật liên tục.
              </p>
              <Link
                href="/news"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
              >
                Khám phá thêm <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
