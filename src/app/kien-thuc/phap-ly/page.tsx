"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  getArticlesByCategory,
  formatDate,
  Article,
} from "../libs/mock-data";

const FONT_MONO = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };

const SUB_SECTIONS = [
  {
    id: "chinh-sach",
    tag: "chính sách",
    code: "01",
    title: "Chính sách",
    description:
      "Cập nhật chính sách pháp lý mới nhất tác động đến thị trường bất động sản.",
  },
  {
    id: "quy-dinh",
    tag: "quy định",
    code: "02",
    title: "Quy định",
    description:
      "Quy định, hướng dẫn và thông tư liên quan đến bất động sản.",
  },
  {
    id: "phan-tich",
    tag: "phân tích",
    code: "03",
    title: "Phân tích pháp lý bất động sản",
    description: "Phân tích chuyên sâu về pháp lý bất động sản.",
  },
];

export default function PhapLyPage() {
  const allArticles = getArticlesByCategory("phap-ly");

  const getArticlesByTag = (tag: string) =>
    allArticles.filter((a) =>
      a.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()),
    );

  const chinhSach = getArticlesByTag("chính sách");
  const quyDinh = getArticlesByTag("quy định");
  const phanTich = getArticlesByTag("phân tích");

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
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-xs font-semibold tracking-[0.25em] text-[#C9A24D] uppercase"
                style={FONT_MONO}
              >
                Kepler · Kiến thức pháp lý
              </span>
              <span className="h-px flex-1 bg-[#C9A24D]/30 max-w-[120px]" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[0.95]">
              Pháp lý
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-[52ch] font-light">
              Chính sách · Quy định · Phân tích pháp lý bất động sản — góc nhìn
              chuyên gia từ Kepler Group.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {SUB_SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-2 text-white/80 hover:text-[#C9A24D] transition-colors"
                >
                  <span
                    className="text-[#C9A24D] font-medium"
                    style={FONT_MONO}
                  >
                    {s.code}
                  </span>
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

      {/* ===== 01 — CHÍNH SÁCH: featured image + vertical list ===== */}
      <FeaturedListSection
        code="01"
        id="chinh-sach"
        title="Chính sách"
        description="Cập nhật chính sách pháp lý mới nhất tác động đến thị trường bất động sản."
        articles={chinhSach}
      />

      {/* ===== 02 — QUY ĐỊNH: clean horizontal list ===== */}
      <ListSection
        code="02"
        id="quy-dinh"
        title="Quy định"
        description="Quy định, hướng dẫn và thông tư liên quan đến bất động sản."
        articles={quyDinh}
      />

      {/* ===== 03 — PHÂN TÍCH PHÁP LÝ BĐS: featured analysis ===== */}
      <AnalysisSection
        code="03"
        id="phan-tich"
        title="Phân tích pháp lý bất động sản"
        description="Phân tích chuyên sâu về pháp lý bất động sản."
        articles={phanTich}
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
              Cần tư vấn pháp lý
              <br />
              bất động sản?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Đội ngũ chuyên gia pháp lý Kepler Group sẵn sàng hỗ trợ bạn giải
              đáp các vấn đề về BĐS.
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
   FEATURED LIST SECTION — 01 Chính sách
   Large image left + vertical list right
   ============================================================ */
function FeaturedListSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 md:gap-10 mb-14 md:mb-20"
        >
          <span
            className="text-5xl md:text-7xl font-medium text-[#C9A24D] leading-none shrink-0"
            style={FONT_MONO}
          >
            {code}
          </span>
          <div className="pt-2 md:pt-4 flex-1 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33121B] leading-tight">
                {title}
              </h2>
              <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </motion.div>

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
   LIST SECTION — 02 Quy định
   Clean horizontal rows, no card shadow
   ============================================================ */
function ListSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  return (
    <section id={id} className="py-20 md:py-28 bg-gray-50 scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 md:gap-10 mb-12 md:mb-16"
        >
          <span
            className="text-5xl md:text-7xl font-medium text-[#C9A24D] leading-none shrink-0"
            style={FONT_MONO}
          >
            {code}
          </span>
          <div className="pt-2 md:pt-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33121B] leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {articles.length > 0 ? (
          <div className="divide-y divide-[#E7E1D4] border-y border-[#E7E1D4]">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/kien-thuc/${article.slug}`}
                  className="group grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-center hover:bg-white transition-colors -mx-4 px-4"
                >
                  <div className="col-span-3 md:col-span-2">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div
                    className="hidden md:flex col-span-2 flex-col gap-1 text-xs"
                    style={FONT_MONO}
                  >
                    <span className="text-[#C9A24D] font-medium">
                      {formatDate(article.date)}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="col-span-9 md:col-span-7">
                    <h3 className="text-lg md:text-xl font-bold text-[#33121B] leading-snug group-hover:text-[#7A2331] transition-colors mb-1.5">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">
                      {article.excerpt}
                    </p>
                    <div
                      className="md:hidden mt-2 flex items-center gap-2 text-xs"
                      style={FONT_MONO}
                    >
                      <span className="text-[#C9A24D]">
                        {formatDate(article.date)}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">{article.readTime}</span>
                    </div>
                  </div>

                  <div className="hidden md:flex col-span-1 justify-end">
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#7A2331] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
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

/* ============================================================
   ANALYSIS SECTION — 03 Phân tích pháp lý BĐS
   Featured large analysis + list below
   ============================================================ */
function AnalysisSection({
  code,
  id,
  title,
  description,
  articles,
}: {
  code: string;
  id: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;

  return (
    <section id={id} className="py-20 md:py-28 bg-white scroll-mt-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-6 md:gap-10 mb-14 md:mb-20"
        >
          <span
            className="text-5xl md:text-7xl font-medium text-[#C9A24D] leading-none shrink-0"
            style={FONT_MONO}
          >
            {code}
          </span>
          <div className="pt-2 md:pt-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#33121B] leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {lead ? (
          <>
            {/* Featured analysis — full width */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14 md:mb-20"
            >
              <Link href={`/kien-thuc/${lead.slug}`} className="group block">
                <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden mb-8 bg-gray-100">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs font-semibold tracking-widest text-[#7A2331] uppercase"
                      style={FONT_MONO}
                    >
                      Phân tích nổi bật
                    </span>
                    <span className="h-px w-12 bg-[#E7E1D4]" />
                    <span
                      className="text-xs text-[#C9A24D] font-medium"
                      style={FONT_MONO}
                    >
                      {formatDate(lead.date)}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-[#33121B] leading-tight group-hover:text-[#7A2331] transition-colors mb-5">
                    {lead.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {lead.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7A2331] group-hover:gap-3 transition-all">
                    Đọc tiếp
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* More analyses — clean list */}
            {rest.length > 0 && (
              <div>
                <h3
                  className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-8"
                  style={FONT_MONO}
                >
                  Các phân tích mới
                </h3>
                <div className="divide-y divide-[#E7E1D4] border-t border-[#E7E1D4]">
                  {rest.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link
                        href={`/kien-thuc/${article.slug}`}
                        className="group grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-center hover:bg-gray-50 transition-colors -mx-4 px-4"
                      >
                        <div
                          className="hidden md:flex col-span-2 flex-col gap-1 text-xs"
                          style={FONT_MONO}
                        >
                          <span className="text-[#C9A24D] font-medium">
                            {formatDate(article.date)}
                          </span>
                          <span className="text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        <div className="col-span-12 md:col-span-9">
                          <h3 className="text-lg md:text-xl font-bold text-[#33121B] leading-snug group-hover:text-[#7A2331] transition-colors mb-1.5">
                            {article.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">
                            {article.excerpt}
                          </p>
                          <div
                            className="md:hidden mt-2 flex items-center gap-2 text-xs"
                            style={FONT_MONO}
                          >
                            <span className="text-[#C9A24D]">
                              {formatDate(article.date)}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-400">
                              {article.readTime}
                            </span>
                          </div>
                        </div>

                        <div className="hidden md:flex col-span-1 justify-end">
                          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#7A2331] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </>
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
