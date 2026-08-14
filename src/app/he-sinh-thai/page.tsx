"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ecosystem = [
  { name: "Kepler Property", eyebrow: "Đầu tư & Phát triển", description: "Tư vấn đầu tư, môi giới, leasing và phát triển dự án.", items: ["Tư vấn đầu tư", "Môi giới", "Leasing", "Phát triển dự án"], image: "/images/banner-1.png", href: "/he-sinh-thai/kepler-property" },
  { name: "KPC Appraisal", eyebrow: "Thẩm định giá", description: "Thẩm định bất động sản, máy móc - thiết bị, giá trị doanh nghiệp và dự án.", items: ["Bất động sản", "Máy móc - thiết bị", "Giá trị doanh nghiệp", "Dự án"], image: "/images/banner-2.jpg", href: "/he-sinh-thai/kpc-appraisal" },
  { name: "KMC Management", eyebrow: "Quản lý & Vận hành", description: "Quản lý tòa nhà, tài sản, kỹ thuật, tài chính và vận hành.", items: ["Quản lý tòa nhà", "Quản lý tài sản", "Quản lý kỹ thuật", "Quản lý tài chính"], image: "/images/bg-home.jpg", href: "/he-sinh-thai/kmc-management" },
  { name: "KAC Advisory", eyebrow: "Tài chính & M&A", description: "Tư vấn đầu tư, M&A, tái cấu trúc, tài chính và gọi vốn.", items: ["Tư vấn đầu tư", "M&A", "Tái cấu trúc", "Tư vấn tài chính"], image: "/images/banner-3.jpg", href: "/he-sinh-thai/kac-advisory" },
  { name: "K-Homes Design & Build", eyebrow: "Design & Build", description: "Thiết kế kiến trúc, nội thất, thi công và cải tạo công trình.", items: ["Thiết kế kiến trúc", "Thiết kế nội thất", "Thi công", "Cải tạo"], image: "/images/image-111.png", href: "/he-sinh-thai/k-homes" },
  { name: "RealHub Platform", eyebrow: "PropTech Platform", description: "Nền tảng kết nối dữ liệu, tài sản, nhà đầu tư và dịch vụ.", items: ["Giới thiệu nền tảng", "Đối tượng sử dụng", "Các module dự kiến", "Roadmap"], image: "/images/image-112.png", href: "/realhub" },
];

export default function EcosystemPage() {
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
              Sáu đơn vị.
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
                Khám phá 6 đơn vị
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
              { num: "6", label: "Đơn vị thành viên" },
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
          {/* Featured — Kepler Property (large) */}
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

          {/* KPC Appraisal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href={ecosystem[1].href}
              className="group relative block h-full overflow-hidden rounded-3xl bg-gray-900"
            >
              <Image
                src={ecosystem[1].image}
                alt={ecosystem[1].name}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{ecosystem[1].eyebrow}</span>
                <h3 className="mt-1 text-xl font-bold text-white">{ecosystem[1].name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{ecosystem[1].description}</p>
              </div>
            </Link>
          </motion.div>

          {/* KMC Management */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              href={ecosystem[2].href}
              className="group relative block h-full overflow-hidden rounded-3xl bg-gray-50"
            >
              <Image
                src={ecosystem[2].image}
                alt={ecosystem[2].name}
                fill
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{ecosystem[2].eyebrow}</span>
                <h3 className="mt-1 text-xl font-bold text-gray-900">{ecosystem[2].name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">{ecosystem[2].description}</p>
              </div>
            </Link>
          </motion.div>

          {/* KAC Advisory — wide */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Link
              href={ecosystem[3].href}
              className="group relative block h-full overflow-hidden rounded-3xl"
            >
              <Image
                src={ecosystem[3].image}
                alt={ecosystem[3].name}
                fill
                className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-8">
                <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {ecosystem[3].eyebrow}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white">{ecosystem[3].name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">{ecosystem[3].description}</p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  Xem chi tiết
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* K-Homes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Link
              href={ecosystem[4].href}
              className="group relative block h-full overflow-hidden rounded-3xl bg-gray-900"
            >
              <Image
                src={ecosystem[4].image}
                alt={ecosystem[4].name}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{ecosystem[4].eyebrow}</span>
                <h3 className="mt-1 text-xl font-bold text-white">{ecosystem[4].name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/60">{ecosystem[4].description}</p>
              </div>
            </Link>
          </motion.div>

          {/* RealHub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={ecosystem[5].href}
              className="group relative block h-full overflow-hidden rounded-3xl bg-primary"
            >
              <Image
                src={ecosystem[5].image}
                alt={ecosystem[5].name}
                fill
                className="object-cover opacity-30 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">{ecosystem[5].eyebrow}</span>
                <h3 className="mt-1 text-xl font-bold text-white">{ecosystem[5].name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{ecosystem[5].description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-white">
                  Khám phá
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>
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
