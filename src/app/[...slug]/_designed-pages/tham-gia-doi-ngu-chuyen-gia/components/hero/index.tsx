"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Network, TrendingUp, BadgeCheck, Lightbulb, Briefcase } from "lucide-react";

const motivations = [
  { icon: Network, label: "Network" },
  { icon: TrendingUp, label: "Opportunity" },
  { icon: BadgeCheck, label: "Personal Brand" },
  { icon: Lightbulb, label: "Knowledge & Collaboration" },
  { icon: Briefcase, label: "Business & Reward" },
];

export default function ExpertJoinHero() {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
              Cộng đồng chuyên gia
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Tham gia đội ngũ chuyên gia
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            5 động lực — 5 giá trị dành cho chuyên gia khi gia nhập hệ sinh
            thái và cộng đồng bất động sản: từ kết nối, cơ hội kinh doanh đến
            thương hiệu cá nhân và quyền lợi kinh tế tương xứng.
          </p>
          <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#dong-luc"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]"
            >
              <Award className="h-4 w-4" />
              Xem 5 động lực
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Đăng ký làm chuyên gia
            </Link>
          </div>
        </motion.div>

        {/* Motivation chips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex flex-wrap gap-3"
        >
          {motivations.map((item) => (
            <div
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-200 backdrop-blur-sm"
            >
              <item.icon className="h-4 w-4 text-red-400" />
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
