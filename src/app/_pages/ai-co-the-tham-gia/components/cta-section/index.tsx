"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, UserPlus, Network } from "lucide-react";

export default function WhoCanJoinCtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-gray-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
            Tham gia ngay
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Bạn thuộc nhóm nào trong hệ sinh thái?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            Dù bạn là nhà đầu tư, chủ đầu tư, doanh nghiệp, chuyên gia, môi
            giới, tổ chức tài chính, đơn vị dịch vụ hay cư dân — hệ sinh thái
            và cộng đồng bất động sản luôn chào đón bạn.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]"
            >
              <UserPlus className="h-4 w-4" />
              Đăng ký tham gia
            </Link>
            <Link
              href="/gioi-thieu-he-sinh-thai-bat-dong-san"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              <Network className="h-4 w-4" />
              Tìm hiểu hệ sinh thái
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
