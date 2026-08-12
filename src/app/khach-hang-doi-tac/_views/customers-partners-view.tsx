"use client";

import {
  Users,
  Handshake,
  ArrowRight,
  Building2,
  Briefcase,
  Scale,
  PencilRuler,
  HardHat,
  Cpu,
  Megaphone,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MAIN_LINKS = [
  {
    href: "/khach-hang",
    title: "Khách hàng tiêu biểu",
    subtitle: "Customers",
    description:
      "Logo khách hàng, Case Study, Testimonials, Video khách hàng và những câu chuyện đồng hành cùng Kepler.",
    icon: Users,
    image: "https://picsum.photos/seed/customers/1200/800",
    tags: ["Logo", "Case Study", "Testimonials", "Video", "Câu chuyện"],
  },
  {
    href: "/doi-tac",
    title: "Đối tác chiến lược",
    subtitle: "Partners",
    description:
      "Mạng lưới đối tác đa lĩnh vực: ngân hàng, quỹ đầu tư, luật, kiến trúc, nhà thầu, công nghệ, marketing và đơn vị tư vấn.",
    icon: Handshake,
    image: "https://picsum.photos/seed/partners/1200/800",
    tags: ["Ngân hàng", "Quỹ đầu tư", "Luật", "Kiến trúc", "+4 nhóm"],
  },
];

const PARTNER_GROUPS = [
  { label: "Ngân hàng", icon: Building2, href: "/doi-tac#Ngan-hang", desc: "Tài trợ & cấp tín dụng" },
  { label: "Quỹ đầu tư", icon: Briefcase, href: "/doi-tac#Quy-dau-tu", desc: "Đồng đầu tư & M&A" },
  { label: "Luật", icon: Scale, href: "/doi-tac#Luat", desc: "Tư vấn pháp lý" },
  { label: "Kiến trúc", icon: PencilRuler, href: "/doi-tac#Kien-truc", desc: "Thiết kế & quy hoạch" },
  { label: "Nhà thầu", icon: HardHat, href: "/doi-tac#Nha-thau", desc: "Thi công xây dựng" },
  { label: "Công nghệ", icon: Cpu, href: "/doi-tac#Cong-nghe", desc: "Chuyển đổi số" },
  { label: "Marketing", icon: Megaphone, href: "/doi-tac#Marketing", desc: "Truyền thông & branding" },
  { label: "Đơn vị tư vấn", icon: Lightbulb, href: "/doi-tac#Don-vi-tu-van", desc: "Chiến lược & tài chính" },
];

export default function CustomersPartnersView() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white">
      {/* === HERO === */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/seo.png"
          alt="Khách hàng & Đối tác"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.18),_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                  <Users className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                  Khách hàng & Đối tác
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Mạng lưới khách hàng & đối tác chiến lược
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                Kepler tự hào đồng hành cùng hàng trăm khách hàng tiêu biểu và
                một mạng lưới đối tác chiến lược đa lĩnh vực, cùng nhau kiến tạo
                những giá trị bền vững trong ngành bất động sản.
              </p>
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/khach-hang"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                >
                  Khám phá khách hàng
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/doi-tac"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Xem đối tác chiến lược
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === 2 NHÓM CHÍNH — interactive list + preview (giống ecosystem) === */}
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
              Khám phá
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Khách hàng & Đối tác
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: List */}
            <div className="lg:col-span-7 space-y-2">
              {MAIN_LINKS.map((item, index) => (
                <motion.div
                  key={item.title}
                  onMouseEnter={() => setActive(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`group cursor-pointer border-l-2 px-6 py-5 transition-all duration-300 ${
                    active === index
                      ? "border-red-500 bg-white shadow-md"
                      : "border-gray-200 hover:border-gray-400 bg-transparent"
                  }`}
                >
                  <Link href={item.href} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <item.icon className={`w-5 h-5 ${active === index ? "text-red-600" : "text-gray-400"}`} />
                        <span className={`text-xs font-semibold tracking-wider uppercase ${active === index ? "text-red-600" : "text-gray-400"}`}>
                          {item.subtitle}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold transition-colors ${active === index ? "text-gray-900" : "text-gray-500"}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-1 transition-all ${active === index ? "text-gray-600 opacity-100 max-h-20" : "text-gray-400 opacity-0 max-h-0 overflow-hidden"}`}>
                        {item.description}
                      </p>
                      {active === index && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${active === index ? "scale-100 opacity-100" : "scale-75 opacity-40"}`}>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right: Visual preview */}
            <div className="lg:col-span-5">
              <motion.div
                className="sticky top-6 rounded-2xl overflow-hidden shadow-xl aspect-[4/5]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MAIN_LINKS[active].image}
                  alt={MAIN_LINKS[active].title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2">
                    0{active + 1} / 02
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-3">
                    {MAIN_LINKS[active].title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed max-w-[40ch]">
                    {MAIN_LINKS[active].description}
                  </p>
                  <Link
                    href={MAIN_LINKS[active].href}
                    className="inline-flex items-center gap-2 mt-6 text-white text-sm font-medium group/link"
                  >
                    Khám phá ngay
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === PHÂN LOẠI THEO NHÓM — bento grid (giống solutions) === */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-50/50 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Phân loại theo nhóm
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              8 nhóm đối tác chiến lược
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            <p className="mt-6 text-gray-600 leading-relaxed max-w-[65ch]">
              Mạng lưới đối tác của Kepler được phân theo 8 nhóm chuyên môn, cùng
              nhau tạo nên một hệ sinh thái dịch vụ khép kín cho khách hàng.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PARTNER_GROUPS.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={group.href}
                  className="group block h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/15 group-hover:scale-105 transition-transform duration-300">
                      <group.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-300 group-hover:text-red-400 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                    {group.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {group.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 group-hover:gap-2 transition-all">
                    Xem chi tiết
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA (giống cta-section trang chủ) === */}
      <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.12),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trở thành khách hàng & đối tác của{" "}
              <span className="text-red-500">Kepler</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Kepler cam kết mang đến giải pháp chuyên nghiệp, hiệu quả và bền
              vững cho từng đối tác và dự án.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Liên hệ hợp tác
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/khach-hang"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                Xem khách hàng tiêu biểu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
