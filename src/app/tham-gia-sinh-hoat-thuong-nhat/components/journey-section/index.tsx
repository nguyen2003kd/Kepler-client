"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Users,
  Share2,
  Link2,
  Handshake,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const journeySteps = [
  {
    icon: Users,
    title: "Gặp gỡ",
    description:
      "Offline để gặp gỡ — các sự kiện định kỳ đưa thành viên đến gần nhau hơn.",
  },
  {
    icon: Share2,
    title: "Chia sẻ",
    description:
      "Chia sẻ tri thức, dữ liệu và kinh nghiệm thực tiễn từ chuyên gia và thành viên.",
  },
  {
    icon: Link2,
    title: "Kết nối",
    description:
      "Kết nối đúng người, đúng nhu cầu — mở ra cơ hội hợp tác và kinh doanh.",
  },
  {
    icon: Handshake,
    title: "Hợp tác",
    description:
      "Từ kết nối đến hợp tác thực tế giữa các thành viên, doanh nghiệp và đối tác.",
  },
  {
    icon: Lightbulb,
    title: "Giải pháp",
    description:
      "Giải pháp tối ưu cho từng nhu cầu — tạo ra giao dịch và giá trị bền vững.",
  },
];

export default function JourneySection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Hành trình tham gia
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Gặp gỡ – Chia sẻ – Kết nối – Hợp tác – Giải pháp
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {journeySteps.map((step, idx) => (
            <FadeIn key={step.title} delay={idx * 0.08} className="h-full">
              <div className="group relative h-full bg-white rounded-2xl p-7 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <step.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-black text-gray-200 group-hover:text-red-200 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-auto text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
                {idx < journeySteps.length - 1 && (
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
