"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { units, EcosystemUnit } from "./unit-data";

const ecosystemImages: Record<string, string> = {
  "kepler-property": "/images/category-banner-investment.png",
  "kpc-appraisal": "/images/banner-2.jpg",
  "kmc-management": "/images/bg-home.jpg",
  "kac-advisory": "/images/banner-3.jpg",
  "k-homes": "/images/image-111.png",
  "kepler-land": "/images/bg-home.jpg",
  bizoffice: "/images/banner-3.jpg",
};

type EcosystemItem = EcosystemUnit & { image: string; href: string };

const ecosystem: EcosystemItem[] = Object.entries(units)
  .filter(([key]) => key !== "realhub")
  .map(([key, unit]) => ({
    ...unit,
    image: ecosystemImages[key] || "/images/bg-home.jpg",
    href: `/he-sinh-thai/${key}`,
  }));

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/category-banner-investment.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="relative mx-auto flex min-h-[90vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Kepler Ecosystem
              </span>
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Bảy đơn vị.
              <br />
              Một chuỗi giá trị.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
              Từ tư vấn đầu tư đến thiết kế kiến trúc, từ thẩm định giá đến
              công nghệ PropTech — Kepler Group kết nối chuyên môn đa ngành
              để đồng hành cùng khách hàng trong mọi quyết định.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#units"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                Khám phá 7 đơn vị
              </a>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Liên hệ
              </Link>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4"
          >
            {[
              { num: "7", label: "Đơn vị thành viên" },
              { num: "25+", label: "Năm kinh nghiệm" },
              { num: "500+", label: "Khách hàng" },
              { num: "100+", label: "Dự án" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 px-6 py-6 text-center backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">{stat.num}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Units — Bento grid */}
      <section id="units" className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Các đơn vị thành viên
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Mỗi đơn vị là một mảnh ghép chuyên môn, kết nối tạo nên năng lực
            tích hợp cho Kepler.
          </p>
        </motion.div>

        <div className="grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* Featured — first unit (large) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2"
          >
            <Link
              href={ecosystem[0].href}
              className="group relative block h-full overflow-hidden rounded-3xl"
            >
              <Image
                src={ecosystem[0].image}
                alt={ecosystem[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {ecosystem[0].eyebrow}
                </span>
                <div>
                  <h3 className="text-3xl font-bold text-white">{ecosystem[0].name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                    {ecosystem[0].description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ecosystem[0].items.map((item) => (
                      <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                    Xem chi tiết
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Remaining units */}
          {ecosystem.slice(1).map((unit, idx) => (
            <motion.div
              key={unit.href}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx + 1) * 0.08 }}
              className={idx === 2 ? "md:col-span-2" : ""}
            >
              <Link
                href={unit.href}
                className={`group relative block h-full overflow-hidden rounded-3xl ${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-50"}`}
              >
                <Image
                  src={unit.image}
                  alt={unit.name}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${idx % 2 === 0 ? "opacity-60" : "opacity-80"}`}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${idx % 2 === 0 ? "from-black/90 to-transparent" : "from-white/90 via-white/20 to-transparent"}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{unit.eyebrow}</span>
                  <h3 className={`mt-1 text-xl font-bold ${idx % 2 === 0 ? "text-white" : "text-gray-900"}`}>{unit.name}</h3>
                  <p className={`mt-1 text-xs leading-relaxed ${idx % 2 === 0 ? "text-white/60" : "text-gray-600"}`}>{unit.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Connection flow */}
      <section className="bg-gray-900 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-2xl"
          >
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              Cách chúng tôi kết nối
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Một đội ngũ,
              <br />
              nhiều chuyên môn
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Khi bài toán cần nhiều góc nhìn, các đơn vị phối hợp như một đội
              ngũ duy nhất.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Phân tích", desc: "Đọc thị trường, đánh giá tài sản, xác định cơ hội và rủi ro trước khi ra quyết định." },
              { step: "02", title: "Triển khai", desc: "Điều phối chuyên môn từ nhiều đơn vị, thiết kế giải pháp và thực thi dự án." },
              { step: "03", title: "Tăng trưởng", desc: "Vận hành, tối ưu và gia tăng giá trị tài sản dài hạn cho khách hàng." },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:bg-white/10"
              >
                <span className="text-5xl font-bold text-primary/30">{item.step}</span>
                <h3 className="mt-6 text-2xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{item.desc}</p>
                {index < 2 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-white/20 md:block" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white">Bắt đầu một cuộc trao đổi</h3>
              <p className="mt-2 text-sm text-white/50">
                Chia sẻ bài toán của bạn — Kepler sẽ kết nối đúng chuyên gia.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Kết nối với Kepler
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
