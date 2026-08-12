"use client";

import {
  Users,
  PlayCircle,
  Quote,
  FileText,
  ArrowRight,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// 1. Logo khách hàng
const CUSTOMER_LOGOS = [
  { name: "Ngân hàng A", image: "/images/client-1.png", sector: "Ngân hàng" },
  { name: "Doanh nghiệp B", image: "/images/client-2.png", sector: "Doanh nghiệp" },
  { name: "Chủ đầu tư C", image: "/images/client-3.png", sector: "Chủ đầu tư" },
  { name: "Quỹ đầu tư D", image: "/images/logo-case.png", sector: "Quỹ đầu tư" },
  { name: "Đơn vị sản xuất E", image: "/images/logo-smeq.jpg", sector: "Sản xuất" },
  { name: "Đơn vị thương mại F", image: "/images/logo-no-bg.png", sector: "Thương mại" },
];

// 2. Case Study
const CASE_STUDIES = [
  {
    title: "Thẩm định giá dự án căn hộ cao cấp",
    client: "Chủ đầu tư C",
    sector: "BĐS cư dân",
    summary:
      "Thẩm định giá toàn bộ khối đế và tháp của dự án căn hộ cao cấp với tổng diện tích sàn 45.000 m².",
    image: "https://picsum.photos/seed/case1/1200/800",
  },
  {
    title: "Tư vấn M&A khu đô thị thương mại",
    client: "Quỹ đầu tư D",
    sector: "M&A",
    summary:
      "Tư vấn cấu trúc giao dịch M&A cho khu đô thị thương mại với giá trị giao dịch hơn 1.500 tỷ đồng.",
    image: "https://picsum.photos/seed/case2/1200/800",
  },
  {
    title: "Quản lý vận hành tòa nhà văn phòng",
    client: "Doanh nghiệp B",
    sector: "Quản lý vận hành",
    summary:
      "Quản lý vận hành và bảo dưỡng toàn diện cho tòa nhà văn phòng hạng A tại trung tâm TP.HCM.",
    image: "https://picsum.photos/seed/case3/1200/800",
  },
];

// 3. Testimonials
const TESTIMONIALS = [
  {
    name: "Ông Nguyễn Văn A",
    role: "Giám đốc điều hành",
    company: "Chủ đầu tư C",
    quote:
      "Kepler đã hỗ trợ chúng tôi toàn diện từ thẩm định giá đến tư vấn phát triển dự án. Đội ngũ chuyên môn cao, làm việc chuyên nghiệp và hiệu quả.",
  },
  {
    name: "Bà Trần Thị B",
    role: "Giám đốc đầu tư",
    company: "Quỹ đầu tư D",
    quote:
      "Các báo cáo phân tích của Kepler rất chi tiết và đáng tin cậy, giúp quỹ đưa ra quyết định đầu tư chính xác trong thời gian ngắn.",
  },
  {
    name: "Ông Lê Văn C",
    role: "Trưởng ban quản lý tài sản",
    company: "Doanh nghiệp B",
    quote:
      "Dịch vụ quản lý vận hành của Kepler giúp tòa nhà hoạt động trơn tru, tối ưu chi phí và nâng cao trải nghiệm cho khách thuê.",
  },
];

// 4. Video khách hàng
const VIDEOS = [
  { title: "Câu chuyện khách hàng - Chủ đầu tư C", duration: "03:45", thumbnail: "https://picsum.photos/seed/video1/1200/800" },
  { title: "Phỏng vấn Giám đốc đầu tư - Quỹ D", duration: "05:20", thumbnail: "https://picsum.photos/seed/video2/1200/800" },
  { title: "Hành trình đồng hành cùng Doanh nghiệp B", duration: "04:10", thumbnail: "https://picsum.photos/seed/video3/1200/800" },
];

// 5. Câu chuyện khách hàng
const STORIES = [
  {
    title: "Hành trình từ thẩm định giá đến phát triển dự án",
    excerpt:
      "Cách Kepler đồng hành cùng chủ đầu tư C trong suốt 5 năm, từ khâu thẩm định, tư vấn pháp lý đến phát triển và phân phối sản phẩm.",
    date: "Tháng 01/2026",
    tag: "Phát triển dự án",
  },
  {
    title: "Tối ưu vận hành tòa nhà văn phòng hạng A",
    excerpt:
      "Giải pháp quản lý vận hành toàn diện giúp doanh nghiệp B giảm 18% chi phí vận hành và tăng tỷ lệ lấp đầy lên 96%.",
    date: "Tháng 02/2026",
    tag: "Quản lý vận hành",
  },
  {
    title: "Giao dịch M&A thành công khu đô thị thương mại",
    excerpt:
      "Quy trình tư vấn cấu trúc giao dịch M&A cho quỹ đầu tư D, từ khảo sát đến ký kết trong 6 tháng.",
    date: "Tháng 03/2026",
    tag: "M&A",
  },
];

export default function KhachHangView() {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <div className="bg-white">
      {/* === HERO === */}
      <section className="relative h-[55vh] min-h-[380px] max-h-[550px] overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/seo.png"
          alt="Khách hàng tiêu biểu"
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
                  Khách hàng
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Khách hàng tiêu biểu
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                Những khách hàng đã tin tưởng và đồng hành cùng Kepler Group trên
                hành trình kiến tạo giá trị bất động sản bền vững.
              </p>
              <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* === 1. LOGO KHÁCH HÀNG === */}
      <section id="logo" className="py-20 md:py-28 scroll-mt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Logo khách hàng
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Mạng lưới khách hàng
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {CUSTOMER_LOGOS.map((c, idx) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-red-200 transition-all duration-300 min-h-[160px] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-16 h-16 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-900 leading-tight">{c.name}</h3>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-red-600">
                  {c.sector}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === 2. CASE STUDY === */}
      <section id="case-study" className="py-20 md:py-28 bg-gray-50 scroll-mt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Case Study
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
                Dự án tiêu biểu
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </div>
            <Link
              href="/case-study"
              className="inline-flex items-center gap-2 text-red-600 text-sm font-semibold uppercase tracking-widest hover:gap-3 transition-all group"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, idx) => (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href="/case-study"
                  className="group block h-full bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-red-600 backdrop-blur">
                        {cs.sector}
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{cs.summary}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500">{cs.client}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 group-hover:gap-2 transition-all">
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. TESTIMONIALS — dark === */}
      <section id="testimonials" className="relative bg-gray-900 py-20 md:py-28 overflow-hidden scroll-mt-[100px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-2xl mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3">
              Khách hàng nói gì
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600" />
                <Quote className="h-10 w-10 text-red-500/60 mb-5" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {t.role} · {t.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === 4. VIDEO KHÁCH HÀNG — interactive (giống ecosystem) === */}
      <section id="video" className="relative bg-gray-50 py-20 md:py-28 scroll-mt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Video khách hàng
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Video đồng hành
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Video list */}
            <div className="lg:col-span-7 space-y-2">
              {VIDEOS.map((v, index) => (
                <motion.div
                  key={v.title}
                  onMouseEnter={() => setActiveVideo(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`group cursor-pointer border-l-2 px-6 py-5 transition-all duration-300 ${
                    activeVideo === index
                      ? "border-red-500 bg-white shadow-md"
                      : "border-gray-200 hover:border-gray-400 bg-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <PlayCircle className={`w-5 h-5 ${activeVideo === index ? "text-red-600" : "text-gray-400"}`} />
                        <span className={`text-xs font-semibold tracking-wider uppercase ${activeVideo === index ? "text-red-600" : "text-gray-400"}`}>
                          {v.duration}
                        </span>
                      </div>
                      <h3 className={`text-lg font-bold transition-colors ${activeVideo === index ? "text-gray-900" : "text-gray-500"}`}>
                        {v.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeVideo === index ? "scale-100 opacity-100" : "scale-75 opacity-40"}`}>
                      <PlayCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Video preview */}
            <div className="lg:col-span-5">
              <motion.div
                className="sticky top-6 rounded-2xl overflow-hidden shadow-xl aspect-video"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={VIDEOS[activeVideo].thumbnail}
                  alt={VIDEOS[activeVideo].title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-18 h-18 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl cursor-pointer">
                    <PlayCircle className="h-12 w-12 text-red-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2">
                    {VIDEOS[activeVideo].duration}
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {VIDEOS[activeVideo].title}
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === 5. CÂU CHUYỆN KHÁCH HÀNG — horizontal cards (giống news) === */}
      <section id="cau-chuyen" className="py-20 md:py-28 scroll-mt-[100px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Câu chuyện khách hàng
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Hành trình đồng hành
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {STORIES.map((s) => (
              <motion.div
                key={s.title}
                className="group flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="md:w-1/4 h-32 md:h-auto relative overflow-hidden bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-white/80" />
                </div>
                <div className="md:w-3/4 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-2.5 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                        {s.tag}
                      </span>
                      <span className="text-gray-500 text-xs">{s.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{s.excerpt}</p>
                  </div>
                  <span className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors mt-3">
                    Đọc câu chuyện →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA === */}
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
              Trở thành khách hàng tiếp theo của{" "}
              <span className="text-red-500">Kepler</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Hàng trăm doanh nghiệp đã tin tưởng và đồng hành cùng Kepler. Đội ngũ
              chúng tôi sẵn sàng hỗ trợ bạn trong hành trình kiến tạo giá trị bền vững.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-full hover:bg-red-500 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Liên hệ tư vấn
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/doi-tac"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                Xem đối tác chiến lược
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
