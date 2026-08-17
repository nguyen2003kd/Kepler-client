"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getArticlesByCategory,
  formatDate,
  Article,
} from "../libs/mock-data";

const FONT_MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const SUB_SECTIONS = [
  {
    id: "tham-dinh-gia",
    tag: "kiến thức thẩm định giá",
    title: "Thẩm định giá",
    description:
      "Phương pháp, tiêu chuẩn và góc nhìn chuyên môn về xác định giá trị tài sản.",
  },
  {
    id: "tai-chinh-dinh-gia",
    tag: "tài chính và định giá",
    title: "Tài chính và định giá",
    description:
      "Phân tích dòng tiền, cấu trúc vốn và các mô hình tài chính phục vụ định giá.",
  },
];

export default function ThamDinhGiaPage() {
  const allArticles = getArticlesByCategory("tham-dinh-gia-tai-chinh");

  const getArticlesByTag = (tag: string) =>
    allArticles.filter((a) =>
      a.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );

  const thamDinh = getArticlesByTag("kiến thức thẩm định giá");
  const taiChinh = getArticlesByTag("tài chính và định giá");

  return (
    <div className="bg-white">
      {/* ===== HERO — short, type-led, no photo ===== */}
      <section className="relative bg-[#33121B] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #C9A24D 0, transparent 40%), radial-gradient(circle at 80% 70%, #7A2331 0, transparent 45%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.95]">
              Thẩm định giá
              <br />
              <span className="text-[#C9A24D]">&amp; Tài chính</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-[52ch] font-light">
              Thẩm định giá · Tài chính và định giá — góc nhìn chuyên gia từ
              Kepler Group.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {SUB_SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-2 text-white/80 hover:text-[#C9A24D] transition-colors"
                >
                  <span className="border-b border-transparent group-hover:border-[#C9A24D] transition-colors">
                    {s.title}
                  </span>
                  {i < SUB_SECTIONS.length - 1 && (
                    <span className="text-white/20 ml-2">/</span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 01 — THẨM ĐỊNH GIÁ: editorial split ===== */}
      <EditorialSplit
        id="tham-dinh-gia"
        title="Thẩm định giá"
        description="Phương pháp, tiêu chuẩn và góc nhìn chuyên môn về xác định giá trị tài sản."
        articles={thamDinh}
      />

      {/* ===== 02 — TÀI CHÍNH VÀ ĐỊNH GIÁ: magazine grid ===== */}
      <MagazineGrid
        id="tai-chinh-dinh-gia"
        title="Tài chính và định giá"
        description="Phân tích dòng tiền, cấu trúc vốn và các mô hình tài chính phục vụ định giá."
        articles={taiChinh}
      />

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28 bg-[#33121B]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-semibold tracking-[0.25em] text-[#C9A24D] uppercase mb-6"
              style={FONT_MONO}
            >
              Kepler Group
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Cần thẩm định giá
              <br />
              bất động sản?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Đội ngũ thẩm định viên Kepler Group hỗ trợ định giá tài chính và
              xác định giá trị BĐS theo tiêu chuẩn quốc tế.
            </p>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C9A24D] text-[#33121B] font-semibold hover:bg-white transition-colors"
            >
              Liên hệ tư vấn
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   SECTION HEADER — big mono number + title + description
   ============================================================ */
function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mb-14 md:mb-20"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33121B] leading-tight">
        {title}
      </h2>
      <p className="text-gray-500 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* ============================================================
   EDITORIAL SPLIT — 01 Thẩm định giá
   Large image left + vertical list right
   ============================================================ */
function EditorialSplit({
  id,
  title,
  description,
  articles,
}: {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;
  const smalls = rest.slice(0, 4);

  return (
    <section id={id} className="py-20 md:py-28 bg-white scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader title={title} description={description} />

        {lead ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
            {/* Lead — large image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <Link href={`/kien-thuc/${lead.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="text-xs text-[#C9A24D] font-medium"
                    style={FONT_MONO}
                  >
                    {formatDate(lead.date)}
                  </span>
                  <span className="h-px w-8 bg-[#E7E1D4]" />
                  <span className="text-xs text-gray-400" style={FONT_MONO}>
                    {lead.readTime}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#33121B] leading-tight group-hover:text-[#7A2331] transition-colors mb-4">
                  {lead.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2331] group-hover:gap-3 transition-all">
                  Đọc tiếp
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Smalls — vertical stack, no image */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-[#E7E1D4]">
              {smalls.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={i === 0 ? "pb-8" : "pt-8"}
                >
                  <Link
                    href={`/kien-thuc/${article.slug}`}
                    className="group block"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs text-[#C9A24D] font-medium"
                        style={FONT_MONO}
                      >
                        {formatDate(article.date)}
                      </span>
                      <span className="h-px w-6 bg-[#E7E1D4]" />
                      <span
                        className="text-xs text-gray-400"
                        style={FONT_MONO}
                      >
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#33121B] leading-snug group-hover:text-[#7A2331] transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}

              {rest.length > smalls.length && (
                <Link
                  href={`#${id}`}
                  className="group pt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2331]"
                >
                  Xem tất cả bài thẩm định giá
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

/* ============================================================
   MAGAZINE GRID — 02 Tài chính và định giá
   3-column editorial cards, no shadow, cream hairlines
   ============================================================ */
function MagazineGrid({
  id,
  title,
  description,
  articles,
}: {
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  return (
    <section id={id} className="py-20 md:py-28 bg-gray-50 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader title={title} description={description} />

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={`/kien-thuc/${article.slug}`}
                  className="group flex flex-col h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-5 bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs text-[#C9A24D] font-medium"
                      style={FONT_MONO}
                    >
                      {formatDate(article.date)}
                    </span>
                    <span className="h-px w-6 bg-[#E7E1D4]" />
                    <span
                      className="text-xs text-gray-400 flex items-center gap-1"
                      style={FONT_MONO}
                    >
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#33121B] leading-snug group-hover:text-[#7A2331] transition-colors mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2331] group-hover:gap-3 transition-all">
                    Đọc tiếp
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="py-16 text-center border border-dashed border-[#E7E1D4]"
    >
      <p className="text-gray-500 text-sm">Chưa có bài viết cho mục này.</p>
    </motion.div>
  );
}
