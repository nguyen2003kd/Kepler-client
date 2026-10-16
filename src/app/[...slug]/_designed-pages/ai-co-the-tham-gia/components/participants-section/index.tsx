"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  TrendingUp,
  Building2,
  Briefcase,
  Award,
  Handshake,
  Landmark,
  Wrench,
  Home,
  ArrowRight,
} from "lucide-react";

const participantGroups = [
  {
    icon: TrendingUp,
    title: "Nhà đầu tư",
    description: "Tìm kiếm cơ hội, chuyên gia và đối tác.",
    detail:
      "Tiếp cận các cơ hội đầu tư bất động sản được sàng lọc, kết nối với chuyên gia và đối tác tiềm năng.",
  },
  {
    icon: Building2,
    title: "Chủ đầu tư / Chủ tài sản",
    description: "Tìm nguồn vốn, khách hàng, đối tác và dịch vụ.",
    detail:
      "Đáp ứng nhu cầu vốn, kênh khách hàng, đối tác chiến lược và dịch vụ chuyên nghiệp cho tài sản của bạn.",
  },
  {
    icon: Briefcase,
    title: "Doanh nghiệp",
    description: "Tìm kiếm cơ hội hợp tác và phát triển kinh doanh.",
    detail:
      "Mở rộng mạng lưới đối tác, khám phá cơ hội hợp tác và cùng nhau phát triển kinh doanh bền vững.",
  },
  {
    icon: Award,
    title: "Chuyên gia",
    description: "Chia sẻ tri thức, tham gia tư vấn và kết nối dự án.",
    detail:
      "Đóng góp chuyên môn, tham gia tư vấn các dự án thực tế và xây dựng thương hiệu cá nhân trong cộng đồng.",
  },
  {
    icon: Handshake,
    title: "Môi giới / Sales",
    description: "Tiếp cận nguồn sản phẩm và mạng lưới giao dịch.",
    detail:
      "Truy cập nguồn sản phẩm phong phú, chính sách minh bạch và mạng lưới giao dịch rộng khắp.",
  },
  {
    icon: Landmark,
    title: "Ngân hàng / Tài chính / Quỹ",
    description: "Tiếp cận dự án, doanh nghiệp và cơ hội đầu tư.",
    detail:
      "Kết nối trực tiếp với các dự án, doanh nghiệp có nhu cầu vốn và các cơ hội đầu tư tiềm năng.",
  },
  {
    icon: Wrench,
    title: "Đơn vị dịch vụ",
    description:
      "Luật, thẩm định giá, thiết kế, xây dựng, marketing, công nghệ, quản lý tài sản.",
    detail:
      "Cung cấp dịch vụ chuyên môn cho hệ sinh thái và tiếp cận khách hàng tiềm năng trong mạng lưới.",
  },
  {
    icon: Home,
    title: "Cư dân và người dùng",
    description: "Tìm nhà, tìm không gian sống và dịch vụ bất động sản.",
    detail:
      "Tiếp cận thông tin minh bạch, sản phẩm phù hợp nhu cầu và dịch vụ hỗ trợ xuyên suốt quá trình mua, thuê.",
  },
];

export default function ParticipantsSection() {
  return (
    <section id="doi-tuong" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Đối tượng tham gia
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            8 nhóm thành viên trong hệ sinh thái
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Mỗi nhóm thành viên đều tìm thấy giá trị riêng khi tham gia cộng
            đồng — từ cơ hội kinh doanh, nguồn lực đến tri thức và đối tác.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {participantGroups.map((group, idx) => (
            <FadeIn key={group.title} delay={idx * 0.05} className="h-full">
              <div className="group relative h-full bg-white rounded-2xl p-7 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                      <group.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-sm font-black text-gray-200 group-hover:text-red-200 transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {group.description}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {group.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Benefit strip */}
        <FadeIn delay={0.2} className="mt-16">
          <div className="relative rounded-3xl bg-gray-900 text-white p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
            <div className="relative grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Gặp đúng người",
                  description:
                    "Kết nối trực tiếp với các thành viên phù hợp trong mạng lưới.",
                },
                {
                  title: "Chia sẻ đúng thông tin",
                  description:
                    "Dữ liệu, tri thức và thông tin thị trường minh bạch, chính xác.",
                },
                {
                  title: "Kết nối đúng cơ hội",
                  description:
                    "Cơ hội kinh doanh và đầu tư được sàng lọc, tạo ra giao dịch thực.",
                },
              ].map((benefit, idx) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/20">
                    <span className="text-sm font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
