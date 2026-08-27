"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Store,
  Users,
  LayoutDashboard,
  Network,
  Bot,
  Landmark,
  Calculator,
  TrendingUp,
  Home,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";
import UnitHero from "../he-sinh-thai/shared-sections/unit-hero";
import UnitStory from "../he-sinh-thai/shared-sections/unit-story";
import UnitCapabilities from "../he-sinh-thai/shared-sections/unit-capabilities";
import UnitIndustries from "../he-sinh-thai/shared-sections/unit-industries";
import UnitProducts from "../he-sinh-thai/shared-sections/unit-products";
import UnitClients from "../he-sinh-thai/shared-sections/unit-clients";
import UnitCta from "../he-sinh-thai/shared-sections/unit-cta";

/* ── Data (RealHub-specific custom sections) ────────── */

const PROBLEMS = [
  { title: "Thông tin phân tán", desc: "Dữ liệu BĐS nằm rải rác trên nhiều nền tảng, thiếu chuẩn hóa và khó đối chiếu." },
  { title: "Thiếu minh bạch", desc: "Giá, pháp lý và lịch sử giao dịch không rõ ràng, tăng rủi ro cho nhà đầu tư." },
  { title: "Quy trình thủ công", desc: "Môi giới, quản lý và vận hành còn dựa trên Excel và giấy tờ, chậm và dễ sai." },
  { title: "Khó tiếp cận chuyên gia", desc: "Khách hàng mất nhiều thời gian để tìm đúng chuyên gia thẩm định, pháp lý, tài chính." },
];

const SOLUTIONS = [
  { title: "Nền tảng dữ liệu tập trung", desc: "Tổng hợp thông tin tài sản, giao dịch và thị trường ở một nơi duy nhất." },
  { title: "Chuẩn hóa quy trình", desc: "Tự động hóa môi giới, quản lý và vận hành bằng module chuyên biệt." },
  { title: "Kết nối chuyên gia", desc: "Truy cập mạng lưới chuyên gia Kepler trong vài cú click." },
  { title: "Công cụ phân tích", desc: "Định giá, tính ROI và dòng tiền trực tiếp trên nền tảng." },
];

const AUDIENCES = [
  { icon: Target, title: "Chủ đầu tư", items: ["Phân tích thị trường", "Quản lý dự án", "Kênh phân phối"] },
  { icon: Home, title: "Chủ tài sản", items: ["Định giá tài sản", "Quản lý cho thuê", "Tối ưu giá trị"] },
  { icon: TrendingUp, title: "Nhà đầu tư", items: ["Tìm cơ hội", "Tính ROI", "Due diligence"] },
  { icon: Users, title: "Môi giới", items: ["Quản lý khách hàng", "Listing", "Matching"] },
  { icon: Landmark, title: "Ngân hàng", items: ["Định giá bảo đảm", "Kiểm soát rủi ro", "Báo cáo"] },
  { icon: Network, title: "Đối tác", items: ["Đồng đầu tư", "Hợp tác phát triển", "Kênh dịch vụ"] },
];

const MODULES = [
  { icon: Store, name: "Marketplace", desc: "Sàn giao dịch BĐS — listing, tìm kiếm, matching và giao dịch minh bạch." },
  { icon: Users, name: "CRM", desc: "Quản lý quan hệ khách hàng — pipeline, lịch hẹn, chăm sóc và chuyển đổi." },
  { icon: LayoutDashboard, name: "Dashboard", desc: "Tổng quan dữ liệu — KPI, báo cáo, biểu đồ và cảnh báo theo thời gian thực." },
  { icon: Network, name: "Broker Network", desc: "Mạng lưới môi giới — chia sẻ listing, cộng tác giao dịch và chia hoa hồng." },
  { icon: Bot, name: "AI Assistant", desc: "Trợ lý AI — trả lời câu hỏi, gợi ý tài sản và hỗ trợ ra quyết định." },
  { icon: Landmark, name: "Valuation", desc: "Định giá tự động — kết hợp dữ liệu thị trường và mô hình định giá." },
];

const CALCULATORS = [
  {
    icon: Calculator,
    name: "Investment Calculator",
    desc: "Phân tích hiệu quả đầu tư — giá mua, chi phí, dòng tiền và giá trị thoái vốn.",
    inputs: ["Giá mua", "Chi phí cải tạo", "Thời gian nắm giữ", "Giá bán dự kiến"],
  },
  {
    icon: TrendingUp,
    name: "ROI Calculator",
    desc: "Tính tỷ suất hoàn vốn — so sánh ROI theo nhiều kịch bản và thời gian.",
    inputs: ["Vốn tự có", "Vốn vay", "Lãi suất", "Thời gian"],
  },
  {
    icon: Home,
    name: "Rental Calculator",
    desc: "Tính dòng tiền cho thuê — giá thuê, tỷ lệ lấp đầy, chi phí vận hành và NPV.",
    inputs: ["Giá thuê / m²", "Diện tích", "Tỷ lệ trống", "Chi phí vận hành"],
  },
];

const ROADMAP = [
  { phase: "Q1 2025", title: "Marketplace & CRM", status: "done", items: ["Sàn giao dịch BĐS", "Quản lý khách hàng", "Listing & matching"] },
  { phase: "Q2 2025", title: "Dashboard & Broker Network", status: "active", items: ["Báo cáo thời gian thực", "Mạng lưới môi giới", "Chia sẻ hoa hồng"] },
  { phase: "Q3 2025", title: "AI Assistant & Valuation", status: "planned", items: ["Trợ lý AI", "Định giá tự động", "Gợi ý tài sản"] },
  { phase: "Q4 2025", title: "Investment & ROI Tools", status: "planned", items: ["Investment Calculator", "ROI Calculator", "Rental Calculator"] },
];

/* ── Page ────────────────────────────────────────────── */

export default function RealHubPage() {
  return (
    <main>
      <UnitHero unitKey="realhub" />
      <ProblemSection />
      <SolutionSection />
      <UnitStory unitKey="realhub" />
      <AudienceSection />
      <ModulesSection />
      <UnitCapabilities unitKey="realhub" />
      <CalculatorsSection />
      <RoadmapSection />
      <UnitIndustries unitKey="realhub" />
      <UnitProducts unitKey="realhub" />
      <UnitClients unitKey="realhub" />
      <RegisterSection />
      <UnitCta unitKey="realhub" />
    </main>
  );
}

/* ── 2. Vấn đề thị trường ────────────────────────────── */

function ProblemSection() {
  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Vấn đề thị trường
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
            Những thách thức của thị trường BĐS
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 hover:bg-white/10 transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-red-600/20 border border-red-500/30">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Giải pháp nền tảng ───────────────────────────── */

function SolutionSection() {
  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">
              Giải pháp nền tảng
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mt-3 mb-6">
              Một nền tảng cho <span className="text-primary">mọi bài toán</span> BĐS
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed max-w-[65ch]">
              <p>
                RealHub giải quyết vấn đề phân tán dữ liệu và quy trình thủ công bằng một nền tảng tích hợp —
                nơi mọi thành viên của hệ sinh thái Kepler có thể truy cập, phân tích và giao dịch.
              </p>
              <p>
                Từ marketplace, CRM, dashboard đến công cụ định giá và AI assistant — RealHub kết nối
                công nghệ với chuyên môn con người.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.title}
                className={`rounded-2xl border p-6 ${
                  i === 0
                    ? "bg-gray-900 text-white border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  i === 0 ? "bg-white/10" : "bg-primary/10"
                }`}>
                  <Lightbulb className={`w-5 h-5 ${i === 0 ? "text-primary" : "text-primary"}`} />
                </div>
                <h3 className={`text-base font-bold ${i === 0 ? "text-white" : "text-gray-900"}`}>{s.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? "text-gray-400" : "text-gray-500"}`}>{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Đối tượng sử dụng ────────────────────────────── */

function AudienceSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative bg-gray-50 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Đối tượng sử dụng
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            Dành cho mọi thành viên hệ sinh thái
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon;
            const isActive = active === i;
            return (
              <motion.div
                key={a.title}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group relative rounded-xl border p-8 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-primary/30 bg-white shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{a.title}</h3>
                </div>
                <ul className="space-y-2">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 5. Modules (Marketplace → Valuation) ────────────── */

function ModulesSection() {
  return (
    <section id="modules" className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Module nền tảng
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            Sáu module cốt lõi
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`group relative rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
                  i === 0
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                  i === 0 ? "bg-white/10" : "bg-primary/10"
                }`}>
                  <Icon className={`w-6 h-6 ${i === 0 ? "text-primary" : "text-primary"}`} />
                </div>
                <h3 className={`text-xl font-bold ${i === 0 ? "text-gray-900" : "text-gray-900"}`}>{m.name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-gray-400" : "text-gray-500"}`}>{m.desc}</p>
                {/* <div className={`mt-6 flex items-center gap-2 text-sm font-semibold ${
                  i === 0 ? "text-primary" : "text-primary"
                }`}>
                  Tìm hiểu
                  <ArrowUpRight className="w-4 h-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div> */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 6. Calculators (Investment, ROI, Rental) ────────── */

function CalculatorsSection() {
  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Công cụ tính toán
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
            Tính toán đầu tư trực tiếp
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
          <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
            Ba công cụ phân tích số — giúp nhà đầu tư ra quyết định có cơ sở, không cần Excel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CALCULATORS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{c.name}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{c.desc}</p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Thông số đầu vào</p>
                  <ul className="space-y-2">
                    {c.inputs.map((input) => (
                      <li key={input} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" strokeWidth={2.5} />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 7. Roadmap ──────────────────────────────────────── */

function RoadmapSection() {
  const statusConfig: Record<string, { label: string; badge: string; bar: string; glow: string }> = {
    done: {
      label: "Hoàn thành",
      badge: "text-green-300 bg-green-500/15 border-green-500/30",
      bar: "bg-green-500",
      glow: "",
    },
    active: {
      label: "Đang phát triển",
      badge: "text-primary bg-primary/15 border-primary/30",
      bar: "bg-primary",
      glow: "shadow-[0_0_40px_rgba(239,68,68,0.15)]",
    },
    planned: {
      label: "Sắp tới",
      badge: "text-gray-400 bg-white/5 border-white/10",
      bar: "bg-gray-600",
      glow: "",
    },
  };

  return (
    <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.06),_transparent_60%)]" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Lộ trình phát triển
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-3">
            Roadmap 2025
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        {/* Progress track */}
        <div className="relative mb-4">
          {/* Track background */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10 rounded-full" />
          {/* Track fill */}
          <div className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-green-500 via-primary to-primary/30 rounded-full w-1/2" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {ROADMAP.map((r, i) => {
              const cfg = statusConfig[r.status];
              return (
                <motion.div
                  key={r.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Node */}
                  <div className={`relative w-10 h-10 rounded-full flex items-center justify-center border-2 mb-6 ${
                    r.status === "done"
                      ? "bg-green-500 border-green-400"
                      : r.status === "active"
                      ? "bg-primary border-primary"
                      : "bg-gray-800 border-gray-600"
                  }`}>
                    {r.status === "done" && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
                    {r.status === "active" && (
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    )}
                    {r.status === "planned" && (
                      <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                    )}
                  </div>

                  {/* Card */}
                  <div className={`w-full rounded-2xl border p-5 md:p-6 transition-all ${
                    r.status === "active"
                      ? `border-primary/30 bg-primary/5 ${cfg.glow}`
                      : "border-white/10 bg-white/5 hover:bg-white/[0.07]"
                  }`}>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-3 ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    <p className="text-sm font-bold text-white mb-1">{r.phase}</p>
                    <h3 className="text-base font-bold text-white mb-4 leading-snug">{r.title}</h3>
                    <ul className="space-y-1.5 text-left">
                      {r.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed">
                          <span className="mt-1 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Đăng ký quan tâm ─────────────────────────────── */

function RegisterSection() {
  return (
    <section id="register" className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.12),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">
              Đăng ký quan tâm
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mt-3">
              Trở thành người dùng <span className="text-primary">đầu tiên</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
            <p className="mt-6 text-gray-400 text-base leading-relaxed max-w-[60ch]">
              Để lại thông tin để nhận cập nhật về RealHub, quyền truy cập sớm và
              tư vấn từ đội ngũ Kepler.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Truy cập sớm các module mới",
                "Tư vấn triển khai miễn phí",
                "Cập nhật tính năng và roadmap",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Họ tên</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0901 234 567"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="email@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Bạn là</label>
                <select className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none transition-colors">
                  <option className="bg-gray-900">Chủ đầu tư</option>
                  <option className="bg-gray-900">Chủ tài sản</option>
                  <option className="bg-gray-900">Nhà đầu tư</option>
                  <option className="bg-gray-900">Môi giới</option>
                  <option className="bg-gray-900">Ngân hàng</option>
                  <option className="bg-gray-900">Đối tác</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nội dung</label>
                <textarea
                  rows={3}
                  placeholder="Tôi quan tâm đến module..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
              >
                Gửi đăng ký
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
