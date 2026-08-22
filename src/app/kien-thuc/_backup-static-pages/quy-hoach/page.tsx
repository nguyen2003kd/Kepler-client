"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Users,
  Building2,
  Search,
  Ruler,
} from "lucide-react";
import {
  getArticlesByCategory,
  getLatestArticles,
  REGIONS,
  formatDate,
} from "../libs/mock-data";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ============================================================
   DESIGN TOKENS — "Bản đồ quy hoạch" (Cadastral / Survey Print)
   ------------------------------------------------------------
   ink      #0E1B2E  deep blueprint navy — dark sections
   cartograph #1F3A5F  mid survey-blue — lines, secondary ink
   paper    #FFFFFF  clean white — light sections
   line     #D8CFBC  paper hairline / dashed boundary
   gold     #B9862F  surveyor's brass — primary accent
   terracotta #C1602E  stamp red — used only for "hot" tags

   Display: 'Space Grotesk' (technical, drafting-table character)
   Body:    'Inter'
   Data/mono: 'IBM Plex Mono' (coordinates, codes, dates)

   Add this once in your root layout <head> if these fonts
   aren't already loaded:

   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link
     href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap"
     rel="stylesheet"
   />
   ============================================================ */

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" };
const FONT_MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const REGION_STATS = [
  { value: REGIONS.length, suffix: "", label: "Khu vực theo dõi" },
  {
    value: REGIONS.reduce((s, r) => s + r.keyProjects, 0),
    suffix: "",
    label: "Dự án trọng điểm",
  },
  {
    value: getArticlesByCategory("quy-hoach").length,
    suffix: "",
    label: "Bài phân tích",
  },
];

function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* Small architectural "crop mark" — the recurring signature motif.
   Four of these on a card read as survey-plot corner pins. */
function CornerMarks({ tone = "gold" }: { tone?: "gold" | "paper" }) {
  const color = tone === "gold" ? "#B9862F" : "rgba(250,247,240,0.5)";
  const base =
    "absolute w-3 h-3 border-[1.5px] pointer-events-none transition-opacity duration-300";
  return (
    <>
      <span
        className={`${base} top-0 left-0 border-r-0 border-b-0`}
        style={{ borderColor: color }}
      />
      <span
        className={`${base} top-0 right-0 border-l-0 border-b-0`}
        style={{ borderColor: color }}
      />
      <span
        className={`${base} bottom-0 left-0 border-r-0 border-t-0`}
        style={{ borderColor: color }}
      />
      <span
        className={`${base} bottom-0 right-0 border-l-0 border-t-0`}
        style={{ borderColor: color }}
      />
    </>
  );
}

/* ============ PAGE ============ */
export default function QuyHoachPage() {
  const [query, setQuery] = useState("");

  /* ===== Articles ===== */
  const catArticles = getArticlesByCategory("quy-hoach");
  const latest = getLatestArticles(10).filter(
    (a) => a.categorySlug !== "quy-hoach",
  );
  const allArticles = [...catArticles, ...latest].filter(
    (a, i, self) => i === self.findIndex((s) => s.id === a.id),
  );
  const [leadArticle, ...restArticles] = allArticles;
  const listArticles = restArticles.slice(0, 4);
  const sidebarArticles = restArticles.slice(4, 10);

  /* ===== Regions ===== */
  const filteredRegions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return REGIONS;
    return REGIONS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.highlights.some((h) => h.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative h-[64vh] min-h-[440px] max-h-[640px] overflow-hidden bg-[#0E1B2E]">
        <div className="absolute inset-0">
          <img
            src="/seo.png"
            alt="Tin và phân tích quy hoạch"
            className="w-full h-full object-cover opacity-[0.35]"
          />
        </div>
        {/* blueprint grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,210,235,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(184,210,235,0.14) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1B2E] via-[#0E1B2E]/50 to-[#0E1B2E]/30" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1
                className="text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-tight text-white leading-[1.08]"
                style={FONT_DISPLAY}
              >
                Tin và phân tích
                <br />
                quy hoạch
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/65 leading-relaxed max-w-[58ch]">
                Cập nhật tin tức, đánh giá tác động quy hoạch và dữ liệu khu vực
                bất động sản, biên soạn bởi đội ngũ chuyên gia Kepler Group.
              </p>

              <div className="mt-9 md:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#tin-phan-tich"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B9862F] text-[#0E1B2E] text-sm font-semibold rounded-sm hover:bg-[#CA9740] transition-all group"
                  style={FONT_DISPLAY}
                >
                  Đọc tin quy hoạch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#du-lieu-khu-vuc"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white text-sm font-semibold rounded-sm hover:border-[#B9862F]/60 hover:text-[#B9862F] transition-all"
                  style={FONT_DISPLAY}
                >
                  Xem dữ liệu khu vực
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* bottom ruler tick strip */}
        <div className="absolute bottom-0 left-0 right-0 h-6 flex items-end px-6 lg:px-12 z-20">
          <div className="w-full flex justify-between">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="bg-white/15"
                style={{ width: 1, height: i % 4 === 0 ? 14 : 7 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 1 — Tin và phân tích quy hoạch ===== */}
      <section
        id="tin-phan-tich"
        className="bg-white py-16 pt-20 scroll-mt-6"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14 flex items-end justify-between border-b border-[#D8CFBC] pb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span
                className="text-xs font-medium tracking-[0.2em] text-[#B9862F] uppercase"
                style={FONT_MONO}
              >
                01 · Tin & phân tích
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0E1B2E] mt-3"
                style={FONT_DISPLAY}
              >
                Tin và phân tích quy hoạch
              </h2>
            </div>
            <Ruler className="hidden md:block w-6 h-6 text-[#D8CFBC]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            {/* Main content — 1 featured + list ngang */}
            <div className="lg:col-span-7 space-y-4">
              {/* Featured */}
              {leadArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group flex flex-col md:flex-row gap-4 bg-white overflow-hidden border border-[#E5DFD0] hover:border-[#B9862F]/50 transition-colors duration-300"
                >
                  <div className="md:w-1/3 h-40 md:h-auto relative overflow-hidden">
                    <img
                      src={leadArticle.image}
                      alt={leadArticle.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className="absolute top-3 left-3 px-2 py-1 bg-[#0E1B2E]/85 text-[#B9862F] text-[10px] uppercase tracking-wider"
                      style={FONT_MONO}
                    >
                      {leadArticle.category}
                    </span>
                  </div>
                  <div className="md:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <span
                        className="text-[11px] text-[#8A7F68] flex items-center gap-1 mb-2"
                        style={FONT_MONO}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(leadArticle.date)}
                      </span>
                      <h3
                        className="text-base font-semibold text-[#0E1B2E] mb-2 line-clamp-1 group-hover:text-[#1F3A5F] transition-colors leading-snug"
                        style={FONT_DISPLAY}
                      >
                        <Link href={`/kien-thuc/${leadArticle.slug}`}>
                          {leadArticle.title}
                        </Link>
                      </h3>
                      <p className="text-[#4A4437] text-sm line-clamp-2 mb-3 leading-relaxed">
                        {leadArticle.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#D8CFBC]">
                      <span
                        className="text-xs text-[#8A7F68] flex items-center gap-1"
                        style={FONT_MONO}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {leadArticle.readTime}
                      </span>
                      <Link
                        href={`/kien-thuc/${leadArticle.slug}`}
                        className="inline-flex items-center text-[#1F3A5F] hover:text-[#B9862F] text-sm font-medium transition-colors"
                      >
                        Đọc tiếp <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* List bài ngang */}
              {listArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex flex-col md:flex-row gap-4 bg-white overflow-hidden border border-[#E5DFD0] hover:border-[#B9862F]/50 transition-colors duration-300"
                >
                  <div className="md:w-1/3 h-40 md:h-auto relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#B9862F] font-semibold">
                          {article.category}
                        </span>
                        <span
                          className="text-[#8A7F68] text-[11px] flex items-center gap-1"
                          style={FONT_MONO}
                        >
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.date)}
                        </span>
                      </div>
                      <h3
                        className="text-base font-semibold text-[#0E1B2E] mb-2 line-clamp-1 group-hover:text-[#1F3A5F] transition-colors"
                        style={FONT_DISPLAY}
                      >
                        <Link href={`/kien-thuc/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-[#4A4437] text-xs line-clamp-2 mb-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/kien-thuc/${article.slug}`}
                      className="inline-flex items-center text-[#1F3A5F] hover:text-[#B9862F] text-sm font-medium transition-colors"
                    >
                      Đọc tiếp <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sticky top-6 bg-white overflow-hidden h-[500px] flex flex-col border border-[#E5DFD0]">
                <div className="bg-[#0E1B2E] px-4 py-5 flex-shrink-0">
                  <h3
                    className="text-sm font-semibold text-white flex items-center gap-2 uppercase tracking-wide"
                    style={FONT_DISPLAY}
                  >
                    <div className="w-1 h-4 bg-[#B9862F]" />
                    Bài đọc nhiều
                  </h3>
                </div>
                <ScrollArea className="flex-1 bg-white">
                  <div className="p-2">
                    {sidebarArticles.map((item, index) => (
                      <div key={item.id}>
                        <Link
                          href={`/kien-thuc/${item.slug}`}
                          className="flex items-start gap-2.5 py-2 px-2 hover:bg-gray-100 transition-all duration-200 group"
                        >
                          <div className="flex-shrink-0 w-14 h-11 overflow-hidden bg-gray-100 relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#2C2A22] group-hover:text-[#0E1B2E] leading-snug font-medium line-clamp-2 mb-1">
                              {item.title}
                            </p>
                            <p
                              className="text-[11px] text-[#8A7F68] flex items-center gap-1"
                              style={FONT_MONO}
                            >
                              <Calendar className="w-3 h-3" />
                              {formatDate(item.date)}
                            </p>
                          </div>
                          <ArrowRight className="flex-shrink-0 w-3.5 h-3.5 text-[#B9862F] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                        </Link>
                        {index < sidebarArticles.length - 1 && (
                          <hr className="my-2 border-dashed border-[#E5DFD0]" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative bg-[#0E1B2E] py-20 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,210,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,210,235,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B9862F]/40 to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-xs font-medium tracking-[0.2em] text-[#B9862F] uppercase"
              style={FONT_MONO}
            >
              02 · Tổng quan dữ liệu
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold text-white tracking-tight mt-3"
              style={FONT_DISPLAY}
            >
              Dữ liệu quy hoạch trong tầm tay
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-px bg-white/10">
            {REGION_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative bg-[#0E1B2E] p-8 md:p-10 text-center group hover:bg-[#12233B] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div
                  className="text-4xl md:text-5xl font-semibold text-white tracking-tight"
                  style={FONT_DISPLAY}
                >
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p
                  className="mt-3 text-xs md:text-sm text-white/45 uppercase tracking-wider group-hover:text-[#B9862F] transition-colors"
                  style={FONT_MONO}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — Dữ liệu khu vực (signature section) ===== */}
      <section
        id="du-lieu-khu-vuc"
        className="relative bg-white py-20 md:py-28 scroll-mt-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,58,95,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(31,58,95,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="mb-14 flex items-end justify-between border-b border-[#D8CFBC] pb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span
                className="text-xs font-medium tracking-[0.2em] text-[#B9862F] uppercase"
                style={FONT_MONO}
              >
                03 · Dữ liệu khu vực
              </span>
              <h2
                className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0E1B2E] mt-3"
                style={FONT_DISPLAY}
              >
                Thông tin quy hoạch theo vùng
              </h2>
            </div>
            <MapPin className="hidden md:block w-6 h-6 text-[#D8CFBC]" />
          </motion.div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7F68]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm khu vực, mã, từ khóa..."
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#D8CFBC] focus:outline-none focus:ring-1 focus:ring-[#B9862F] focus:border-[#B9862F] transition-all"
              />
            </div>
            <span
              className="text-xs text-[#8A7F68] uppercase tracking-wider"
              style={FONT_MONO}
            >
              {filteredRegions.length} / {REGIONS.length} khu vực
            </span>
          </div>

          {/* Region cards — cadastral plot cards */}
          {filteredRegions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRegions.map((region, i) => {
                return (
                  <motion.div
                    key={region.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group relative bg-white border border-dashed border-[#C9BFA5] hover:border-[#B9862F] transition-colors duration-300 cursor-pointer m-1.5"
                  >
                    <CornerMarks />

                    {/* Header */}
                    <div className="relative p-6 bg-[#0E1B2E] overflow-hidden">
                      <div className="relative flex items-center gap-3">
                        <div className="w-11 h-11 flex items-center justify-center border border-[#B9862F]/40">
                          <MapPin className="w-5 h-5 text-[#B9862F]" />
                        </div>
                        <div>
                          <h3
                            className="text-lg font-semibold text-white leading-tight group-hover:text-[#B9862F] transition-colors"
                            style={FONT_DISPLAY}
                          >
                            {region.name}
                          </h3>
                          <span
                            className="text-[11px] text-white/40 tracking-wider"
                            style={FONT_MONO}
                          >
                            LOT-{region.code}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="border border-[#E5DFD0] px-3 py-3">
                          <div
                            className="text-[10px] font-semibold text-[#8A7F68] uppercase tracking-wider"
                            style={FONT_MONO}
                          >
                            Diện tích
                          </div>
                          <div
                            className="text-base font-semibold text-[#0E1B2E] mt-1"
                            style={FONT_DISPLAY}
                          >
                            {region.area}
                          </div>
                        </div>
                        <div className="border border-[#E5DFD0] px-3 py-3">
                          <div
                            className="flex items-center gap-1.5 text-[10px] font-semibold text-[#8A7F68] uppercase tracking-wider"
                            style={FONT_MONO}
                          >
                            <Users className="w-3 h-3" />
                            Dân số
                          </div>
                          <div
                            className="text-base font-semibold text-[#0E1B2E] mt-1"
                            style={FONT_DISPLAY}
                          >
                            {region.population}
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-5">
                        {region.highlights.map((h, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-[#4A4437] leading-relaxed"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 bg-[#B9862F] rotate-45" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Footer */}
                      <div className="pt-4 border-t border-dashed border-[#D8CFBC] flex items-center justify-between">
                        <span className="text-xs text-[#4A4437] flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#8A7F68]" />
                          {region.keyProjects} dự án trọng điểm
                        </span>
                        <span
                          className="text-xs text-[#8A7F68] flex items-center gap-1"
                          style={FONT_MONO}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(region.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-[#D8CFBC]">
              <Search className="w-10 h-10 text-[#D8CFBC] mx-auto mb-4" />
              <p className="text-[#8A7F68]">Không tìm thấy khu vực phù hợp.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}