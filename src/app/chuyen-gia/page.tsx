"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { categories, experts } from "./expert-data";

function getLastInitial(name: string) {
  const stripped = name.replace(
    /^(Tiến sỹ|Thạc sỹ|Luật sư|Kỹ sư|KTS|Thẩm định viên)\s+/,
    "",
  );
  const last = stripped.split(" ").pop();
  return last ? last.charAt(0).toUpperCase() : "";
}

export default function ExpertsPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered =
    activeCategory === "Tất cả"
      ? experts
      : experts.filter((e) => e.category === activeCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/bg-home.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Trang chủ
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Kepler Experts
              </span>
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Chuyên gia.
              <br />
              Tầm nhìn đa ngành.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Từ luật, thẩm định giá, kiến trúc đến tài chính — đội ngũ chuyên
              gia Kepler kết nối chuyên môn sâu rộng để đồng hành cùng khách hàng
              trong mọi quyết định.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4"
          >
            {[
              { num: String(experts.length), label: "Chuyên gia" },
              { num: "8", label: "Lĩnh vực" },
              { num: "25+", label: "Năm kinh nghiệm" },
              { num: "500+", label: "Dự án" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 px-6 py-6 text-center backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-white">{stat.num}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category filter + Expert grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Danh sách chuyên gia
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Phân loại theo lĩnh vực: Luật, Thẩm định giá, Kiến trúc, Tài chính,
            Xây dựng, Kế toán, Bất động sản, Quản lý vận hành.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expert grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((expert, index) => (
            <motion.div
              key={expert.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={`/chuyen-gia/${expert.slug}`}
                className="group relative block overflow-hidden rounded-3xl bg-gray-900 transition hover:shadow-lg"
              >
                {/* Avatar / gradient header */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={expert.avatar}
                    alt={expert.name}
                    fill
                    className="object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                    <span className="text-2xl font-bold text-white">
                      {getLastInitial(expert.name)}
                    </span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    {expert.prefix}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                    {expert.field}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {expert.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {expert.role}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                    Xem hồ sơ
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:p-12"
          >
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Kepler Ecosystem
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Kết nối với chuyên gia phù hợp
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
                Chia sẻ bài toán của bạn — Kepler sẽ kết nối đúng chuyên gia.
              </p>
            </div>
            <Link
              href="/lien-he"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Liên hệ ngay
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
