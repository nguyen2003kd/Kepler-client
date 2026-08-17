"use client";

import {
  Handshake,
  Building2,
  Briefcase,
  Scale,
  PencilRuler,
  HardHat,
  Cpu,
  Megaphone,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Users,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface Partner {
  name: string;
  website?: string;
}

interface PartnerGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  longDescription: string;
  partners: Partner[];
}

const PARTNER_GROUPS: PartnerGroup[] = [
  {
    id: "Ngan-hang",
    label: "Ngân hàng",
    icon: Building2,
    description: "Tài trợ, cấp tín dụng và giải pháp tài chính.",
    longDescription:
      "Các ngân hàng thương mại đồng hành cùng Kepler trong tài trợ, cấp tín dụng và giải pháp tài chính cho khách hàng — từ định giá tài sản bảo đảm đến cấu trúc khoản vay tối ưu.",
    partners: [
      { name: "Ngân hàng TMCP A", website: "#" },
      { name: "Ngân hàng TMCP B", website: "#" },
      { name: "Ngân hàng TMCP C", website: "#" },
      { name: "Ngân hàng TMCP D", website: "#" },
    ],
  },
  {
    id: "Quy-dau-tu",
    label: "Quỹ đầu tư",
    icon: Briefcase,
    description: "Đồng đầu tư, cấu trúc giao dịch và private equity.",
    longDescription:
      "Các quỹ đầu tư bất động sản và quỹ private equity hợp tác đầu tư, đồng đầu tư và cấu trúc giao dịch M&A cùng Kepler trên nhiều phân khúc tài sản.",
    partners: [
      { name: "Quỹ đầu tư BĐS E", website: "#" },
      { name: "Quỹ Private Equity F", website: "#" },
      { name: "Quỹ cơ hội G", website: "#" },
    ],
  },
  {
    id: "Luat",
    label: "Luật",
    icon: Scale,
    description: "Tư vấn pháp lý, soạn thảo hợp đồng và tranh chấp.",
    longDescription:
      "Các hãng luật tư vấn pháp lý, soạn thảo hợp đồng và hỗ trợ giải quyết tranh chấp trong giao dịch bất động sản — đảm bảo tính minh bạch và an toàn pháp lý cho khách hàng.",
    partners: [
      { name: "Hãng luật H", website: "#" },
      { name: "Hãng luật I", website: "#" },
      { name: "Văn phòng luật sư J", website: "#" },
    ],
  },
  {
    id: "Kien-truc",
    label: "Kiến trúc",
    icon: PencilRuler,
    description: "Thiết kế, lập dự án và tối ưu không gian.",
    longDescription:
      "Các đơn vị kiến trúc và quy hoạch đồng hành thiết kế, lập dự án và tối ưu không gian cho dự án bất động sản — từ concept đến bản vẽ thi công chi tiết.",
    partners: [
      { name: "Công ty kiến trúc K", website: "#" },
      { name: "Studio kiến trúc L", website: "#" },
      { name: "Công ty quy hoạch M", website: "#" },
    ],
  },
  {
    id: "Nha-thau",
    label: "Nhà thầu",
    icon: HardHat,
    description: "Thi công xây dựng, đảm bảo tiến độ và chất lượng.",
    longDescription:
      "Các nhà thầu xây dựng và thi công với năng lực triển khai dự án từ quy mô nhỏ đến lớn, đảm bảo tiến độ, chất lượng và tuân thủ các tiêu chuẩn kỹ thuật cao nhất.",
    partners: [
      { name: "Nhà thầu xây dựng N", website: "#" },
      { name: "Nhà thầu MEPC O", website: "#" },
      { name: "Nhà thầu hoàn thiện P", website: "#" },
    ],
  },
  {
    id: "Cong-nghe",
    label: "Công nghệ",
    icon: Cpu,
    description: "Nền tảng, phần mềm và chuyển đổi số.",
    longDescription:
      "Các đối tác công nghệ cung cấp nền tảng, phần mềm và giải pháp chuyển đổi số cho hoạt động bất động sản — từ quản lý dữ liệu tài sản đến trải nghiệm khách hàng số.",
    partners: [
      { name: "Nền tảng BĐS Q", website: "#" },
      { name: "Giải pháp PropTech R", website: "#" },
      { name: "Đơn vị tích hợp ERP S", website: "#" },
    ],
  },
  {
    id: "Marketing",
    label: "Marketing",
    icon: Megaphone,
    description: "Truyền thông, branding và phân phối sản phẩm.",
    longDescription:
      "Các agency marketing, truyền thông và branding đồng hành trong việc xây dựng hình ảnh và phân phối sản phẩm — từ chiến lược truyền thông đến triển khai chiến dịch đa kênh.",
    partners: [
      { name: "Agency Digital T", website: "#" },
      { name: "Agency Branding U", website: "#" },
      { name: "Agency Media V", website: "#" },
    ],
  },
  {
    id: "Don-vi-tu-van",
    label: "Đơn vị tư vấn",
    icon: Lightbulb,
    description: "Tư vấn chiến lược, tài chính và quản lý dự án.",
    longDescription:
      "Các đơn vị tư vấn chiến lược, tài chính và quản lý dự án hỗ trợ Kepler tối ưu hóa quyết định và vận hành — mang lại cái nhìn đa chiều và giải pháp thực thi hiệu quả.",
    partners: [
      { name: "Tư vấn chiến lược W", website: "#" },
      { name: "Tư vấn tài chính X", website: "#" },
      { name: "Tư vấn quản lý dự án Y", website: "#" },
    ],
  },
];

const STATS = [
  { value: "08", label: "Nhóm chuyên môn", icon: Lightbulb },
  { value: "25+", label: "Đối tác chiến lược", icon: Handshake },
  { value: "06", label: "Lĩnh vực phủ sóng", icon: Globe },
  { value: "100+", label: "Dự án hợp tác", icon: Building2 },
];

const statGradients = [
  "from-red-500 to-rose-500",
  "from-rose-500 to-red-600",
  "from-red-600 to-red-700",
  "from-red-700 to-rose-700",
];

export default function DoiTacView() {
  const [active, setActive] = useState(0);
  const currentGroup = PARTNER_GROUPS[active];

  // All partners flattened for marquee
  const allPartners = PARTNER_GROUPS.flatMap((g) =>
    g.partners.map((p) => ({ ...p, group: g.label }))
  );
  const marqueeLoop = [...allPartners, ...allPartners];

  return (
    <div className="bg-white">
      {/* === HERO === */}
      <section className="relative h-[60vh] min-h-[420px] max-h-[600px] overflow-hidden bg-[#1a1a1a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/seo.png"
          alt="Đối tác chiến lược"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
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
                  <Handshake className="h-6 w-6 text-red-400" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
                  Đối tác
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Đối tác chiến lược
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-[60ch]">
                Mạng lưới đối tác đa lĩnh vực đồng hành cùng Kepler Group — từ
                ngân hàng, quỹ đầu tư đến luật, kiến trúc, nhà thầu, công nghệ,
                marketing và tư vấn chuyên sâu.
              </p>
              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#partner-tabs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-all group"
                >
                  Khám phá 8 nhóm
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/customers"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 text-white text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all"
                >
                  Xem khách hàng tiêu biểu
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === STATS STRIP (dark) === */}
      <section className="relative bg-gray-900 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statGradients[idx]}`}
                />
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <s.icon className="h-6 w-6 text-red-400" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-gray-400 uppercase tracking-wider font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === SIDEBAR + PANEL === */}
      <section
        id="partner-tabs"
        className="relative bg-gray-50 py-20 md:py-28 scroll-mt-[80px]"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Nhóm đối tác
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              8 nhóm đối tác chiến lược
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            <p className="mt-6 text-gray-600 leading-relaxed">
              Chọn một nhóm bên trái để xem chi tiết và danh sách đối tác đồng
              hành cùng Kepler trong lĩnh vực đó.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* === SIDEBAR (left) === */}
            <motion.aside
              className="lg:col-span-4 xl:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="lg:sticky lg:top-6 bg-white rounded-3xl border border-gray-200 p-3 shadow-sm">
                <ul className="space-y-1">
                  {PARTNER_GROUPS.map((group, index) => {
                    const isActive = active === index;
                    return (
                      <li key={group.id} id={group.id} className="scroll-mt-[100px]">
                        <button
                          onClick={() => setActive(index)}
                          className={`group w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl text-left transition-all duration-300 border ${
                            isActive
                              ? "bg-red-50 border-red-200"
                              : "bg-white border-transparent hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-br from-red-500 to-red-700 shadow-md shadow-red-600/20"
                                : "bg-gray-100 group-hover:bg-gray-200"
                            }`}
                          >
                            <group.icon
                              className={`h-5 w-5 transition-colors ${
                                isActive ? "text-white" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-bold truncate transition-colors ${
                                isActive ? "text-red-700" : "text-gray-700"
                              }`}
                            >
                              {group.label}
                            </div>
                            <div className="text-[11px] text-gray-400 truncate">
                              {group.partners.length} đối tác
                            </div>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>

            {/* === PANEL (right) === */}
            <div className="lg:col-span-8 xl:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Info card */}
                  <div className="relative rounded-3xl bg-white border border-gray-200 shadow-sm p-8 md:p-10 overflow-hidden mb-6">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-600" />
                    <div className="absolute top-0 right-0 w-72 h-72 bg-red-50/60 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-xl shadow-red-600/20 shrink-0">
                        <currentGroup.icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">
                          {currentGroup.label}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {currentGroup.longDescription}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-black text-gray-900">
                          {currentGroup.partners.length}
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                          Đối tác
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setActive((prev) =>
                              prev === 0 ? PARTNER_GROUPS.length - 1 : prev - 1
                            )
                          }
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-red-200 transition-colors"
                          aria-label="Nhóm trước"
                        >
                          <ArrowRight className="h-4 w-4 rotate-180 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            setActive((prev) =>
                              prev === PARTNER_GROUPS.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-red-200 transition-colors"
                          aria-label="Nhóm tiếp theo"
                        >
                          <ArrowRight className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Partner cards grid — card cuối giãn full nếu lẻ */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {currentGroup.partners.map((p, i) => {
                      const isLast =
                        i === currentGroup.partners.length - 1 &&
                        currentGroup.partners.length % 2 !== 0;
                      return (
                        <motion.a
                          key={p.name}
                          href={p.website || "#"}
                          target={
                            p.website && p.website !== "#" ? "_blank" : "_self"
                          }
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          className={`group flex items-center gap-4 h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                            isLast ? "sm:col-span-2" : ""
                          }`}
                        >
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center shrink-0 group-hover:from-red-50 group-hover:to-red-100/50 group-hover:border-red-200 transition-all">
                            <currentGroup.icon className="h-6 w-6 text-gray-400 group-hover:text-red-600 transition-colors" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors truncate">
                              {p.name}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {currentGroup.label} · Đối tác chiến lược
                            </span>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* === MARQUEE — TẤT CẢ ĐỐI TÁC CHẠY NGANG 2 HÀNG NGƯỢC CHIỀU === */}
      <section className="relative bg-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
              Mạng lưới
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
              Tất cả đối tác đồng hành
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
          </motion.div>
        </div>

        {/* Marquee row 1 — left to right */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeLoop.map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-gray-200 bg-white hover:border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-50 to-rose-100 border border-red-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {p.group}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee row 2 — right to left, slower */}
        <div className="relative overflow-hidden mt-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeLoop.map((p, idx) => (
              <div
                key={`${p.name}-r2-${idx}`}
                className="shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-red-200 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                  <Handshake className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">
                    {p.group}
                  </div>
                </div>
              </div>
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
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trở thành đối tác chiến lược của{" "}
              <span className="text-red-500">Kepler</span>
            </h2>
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Kepler luôn tìm kiếm những đối tác cùng tầm nhìn, cam kết chất lượng
              và hướng tới sự phát triển bền vững. Hợp tác cùng chúng tôi để mở rộng
              mạng lưới và kiến tạo giá trị chung.
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
                href="/customers"
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
