"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Network,
  TrendingUp,
  BadgeCheck,
  Lightbulb,
  Briefcase,
} from "lucide-react";

const motivations = [
  {
    stt: "01",
    icon: Network,
    keyword: "NETWORK",
    title: "Kết nối",
    description:
      "Kết nối với chủ đầu tư, nhà đầu tư, doanh nghiệp, chuyên gia và hệ sinh thái bất động sản.",
  },
  {
    stt: "02",
    icon: TrendingUp,
    keyword: "OPPORTUNITY",
    title: "Cơ hội",
    description:
      "Tiếp cận dự án, khách hàng, deal, referral và cơ hội đầu tư – kinh doanh thực tế.",
  },
  {
    stt: "03",
    icon: BadgeCheck,
    keyword: "PERSONAL BRAND",
    title: "Thương hiệu cá nhân",
    description:
      "Xây dựng và nâng tầm thương hiệu cá nhân thông qua hồ sơ chuyên gia, sự kiện, truyền thông và nội dung chuyên môn.",
  },
  {
    stt: "04",
    icon: Lightbulb,
    keyword: "KNOWLEDGE & COLLABORATION",
    title: "Tri thức & Hợp tác",
    description:
      "Giao lưu tri thức, hợp tác liên ngành và cùng tham gia giải quyết các bài toán bất động sản lớn.",
  },
  {
    stt: "05",
    icon: Briefcase,
    keyword: "BUSINESS & REWARD",
    title: "Kinh doanh & Phần thưởng",
    description:
      "Chuyển năng lực chuyên môn và network thành doanh thu, dự án, khách hàng và các quyền lợi kinh tế tương xứng.",
  },
];

export default function MotivationsSection() {
  return (
    <section id="dong-luc" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            5 động lực
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Giá trị dành cho chuyên gia
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Năm trụ cột giá trị giúp chuyên gia phát triển sự nghiệp, mở rộng
            mạng lưới và tạo ra nguồn thu nhập bền vững trong hệ sinh thái.
          </p>
        </FadeIn>

        <div className="space-y-5">
          {motivations.map((item, idx) => (
            <FadeIn key={item.keyword} delay={idx * 0.08}>
              <div className="group relative bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-7 md:p-9">
                  {/* STT + icon */}
                  <div className="md:col-span-2 flex items-center gap-5">
                    <span className="text-4xl md:text-5xl font-black text-gray-100 group-hover:text-red-100 transition-colors select-none">
                      {item.stt}
                    </span>
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                      <item.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Keyword */}
                  <div className="md:col-span-3">
                    <span className="inline-block text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 border border-red-100 rounded-full px-4 py-1.5">
                      {item.keyword}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-7">
                    <p className="text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
