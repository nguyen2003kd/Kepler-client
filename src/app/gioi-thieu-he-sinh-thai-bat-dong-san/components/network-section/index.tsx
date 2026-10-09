"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { BookOpen, Database, Boxes, Target, Network } from "lucide-react";

const networkPillars = [
  {
    icon: BookOpen,
    title: "Tri thức",
    description:
      "Chia sẻ kiến thức, kinh nghiệm thực tiễn và cập nhật xu hướng thị trường bất động sản.",
  },
  {
    icon: Boxes,
    title: "Nguồn lực",
    description:
      "Kết nối nguồn lực tài chính, nhân sự và đối tác để hiện thực hóa các dự án.",
  },
  {
    icon: Database,
    title: "Dữ liệu",
    description:
      "Cung cấp dữ liệu thị trường minh bạch, chính xác để hiểu và đánh giá bất động sản.",
  },
  {
    icon: Target,
    title: "Cơ hội kinh doanh",
    description:
      "Mở ra các cơ hội giao dịch, hợp tác và đầu tư bất động sản cho thành viên.",
  },
];

export default function NetworkSection() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Mạng lưới kết nối
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Không chỉ là cộng đồng giao lưu
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Hệ sinh thái hướng tới trở thành mạng lưới kết nối bốn trụ cột
            cốt lõi — nơi mỗi thành viên đều có thể tiếp cận và đóng góp giá
            trị.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {networkPillars.map((pillar, idx) => (
            <FadeIn key={pillar.title} delay={idx * 0.08}>
              <div className="group relative h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-5 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <pillar.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Statement */}
        <FadeIn delay={0.2} className="mt-16">
          <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/20">
                <Network className="h-8 w-8 text-white" />
              </div>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed text-gray-100">
                Hướng tới trở thành mạng lưới kết nối{" "}
                <span className="text-red-400">tri thức</span>,{" "}
                <span className="text-red-400">nguồn lực</span>,{" "}
                <span className="text-red-400">dữ liệu</span> và{" "}
                <span className="text-red-400">cơ hội kinh doanh</span> bất
                động sản.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
