"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Target,
  Users,
  Share2,
  Link2,
  Handshake,
  Globe,
  Wifi,
  CheckCircle2,
} from "lucide-react";

const goalSteps = [
  { icon: Users, label: "Gặp đúng người" },
  { icon: Share2, label: "Chia sẻ đúng thông tin" },
  { icon: Link2, label: "Kết nối đúng cơ hội" },
  { icon: Handshake, label: "Tạo ra giao dịch thực" },
];

export default function MessageSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Thông điệp chính
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Mục tiêu của hệ sinh thái
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
        </FadeIn>

        {/* Goal chain */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {goalSteps.map((step, idx) => (
            <FadeIn key={step.label} delay={idx * 0.08}>
              <div className="group relative h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 text-center">
                <div className="absolute top-6 right-6 text-5xl font-black text-gray-100 select-none group-hover:text-red-50 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-5 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <step.icon className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {step.label}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Offline / Online */}
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          <FadeIn delay={0.1}>
            <div className="relative h-full rounded-3xl bg-gray-900 text-white p-10 md:p-12 overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(239,68,68,0.2),_transparent_60%)]" />
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-red-600/10 blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/20 mb-6">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                  Offline để gặp gỡ
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Các sự kiện, hội thảo, diễn đàn và buổi giao lưu định kỳ —
                  nơi các thành viên gặp mặt trực tiếp, xây dựng quan hệ tin
                  cậy và mở rộng hợp tác.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative h-full rounded-3xl bg-white p-10 md:p-12 border border-gray-200 overflow-hidden group hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-red-50 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-6 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                  <Wifi className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-3">
                  Online để kết nối
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nền tảng số và cộng đồng trực tuyến — nơi kết nối liên tục,
                  chia sẻ dữ liệu, thông tin và cơ hội bất động sản mọi lúc,
                  mọi nơi.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Summary line */}
        <FadeIn delay={0.15} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl bg-gray-50 border border-gray-100 px-8 py-6">
            {[
              "Gặp đúng người",
              "Chia sẻ đúng thông tin",
              "Kết nối đúng cơ hội",
              "Tạo ra giao dịch thực",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <CheckCircle2 className="h-5 w-5 text-red-600" />
                {item}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
