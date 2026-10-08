"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Database,
  Award,
  Boxes,
  Lightbulb,
  Handshake,
  ArrowRight,
} from "lucide-react";

const valueChain = [
  {
    icon: Database,
    title: "Dữ liệu",
    description: "Dữ liệu để hiểu thị trường.",
    detail:
      "Dữ liệu minh bạch, cập nhật liên tục giúp thành viên nắm bắt xu hướng và ra quyết định chính xác.",
  },
  {
    icon: Award,
    title: "Chuyên gia",
    description: "Chuyên gia để ra quyết định.",
    detail:
      "Đội ngũ chuyên gia đa lĩnh vực đồng hành trong từng quyết định đầu tư và kinh doanh bất động sản.",
  },
  {
    icon: Boxes,
    title: "Nguồn lực",
    description: "Nguồn lực để tạo cơ hội.",
    detail:
      "Hệ sinh thái nguồn lực tài chính, đối tác và con người biến ý tưởng thành cơ hội kinh doanh thực tế.",
  },
  {
    icon: Lightbulb,
    title: "Giải pháp",
    description: "Giải pháp tối ưu.",
    detail:
      "Giải pháp toàn diện, tối ưu cho từng nhu cầu từ tư vấn, thẩm định, quản lý đến đầu tư bất động sản.",
  },
  {
    icon: Handshake,
    title: "Giao dịch",
    description: "Giao dịch để tạo giá trị.",
    detail:
      "Mỗi giao dịch thành công là một giá trị bền vững được tạo ra cho thành viên và thị trường.",
  },
];

export default function ValueChainSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Chuỗi giá trị
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Từ dữ liệu đến giá trị giao dịch
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {valueChain.map((item, idx) => (
            <FadeIn key={item.title} delay={idx * 0.08} className="h-full">
              <div className="group relative h-full bg-white rounded-2xl p-7 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-black text-gray-200 group-hover:text-red-200 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {item.description}
                </p>
                <p className="mt-auto text-sm text-gray-500 leading-relaxed">
                  {item.detail}
                </p>
                {idx < valueChain.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 h-5 w-5 text-gray-300 z-10" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
