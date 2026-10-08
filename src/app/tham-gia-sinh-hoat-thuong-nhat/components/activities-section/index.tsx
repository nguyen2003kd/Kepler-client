"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Handshake,
  Award,
  Briefcase,
  Map,
  Presentation,
} from "lucide-react";

const activities = [
  {
    icon: Users,
    name: "Real Estate Networking",
    description: "Gặp gỡ và kết nối thành viên.",
    detail:
      "Buổi networking định kỳ giúp các thành viên mở rộng quan hệ, tìm kiếm đối tác và xây dựng mạng lưới kinh doanh.",
    frequency: "Hàng tuần",
  },
  {
    icon: MessageSquare,
    name: "Property Talk",
    description: "Chia sẻ kiến thức và xu hướng thị trường.",
    detail:
      "Chuyên đề cập nhật kiến thức, phân tích xu hướng và diễn biến thị trường bất động sản trong và ngoài nước.",
    frequency: "Hàng tháng",
  },
  {
    icon: TrendingUp,
    name: "Investment Club",
    description: "Phân tích cơ hội đầu tư.",
    detail:
      "Câu lạc bộ đầu tư phân tích sâu các cơ hội bất động sản, đánh giá rủi ro và tiềm năng sinh lời.",
    frequency: "Hàng tháng",
  },
  {
    icon: Handshake,
    name: "Deal Sharing",
    description: "Giới thiệu dự án, tài sản và cơ hội giao dịch.",
    detail:
      "Sàn giao dịch thông tin — nơi các thành viên giới thiệu và tiếp cận dự án, tài sản và cơ hội giao dịch thực tế.",
    frequency: "Hàng tuần",
  },
  {
    icon: Award,
    name: "Expert Talk",
    description: "Chuyên gia tư vấn các vấn đề chuyên môn.",
    detail:
      "Gặp gỡ trực tiếp chuyên gia đầu tư, pháp lý, thẩm định giá, thiết kế… để giải đáp các vấn đề chuyên môn cụ thể.",
    frequency: "Hàng tháng",
  },
  {
    icon: Briefcase,
    name: "Business Matching",
    description: "Kết nối doanh nghiệp và đối tác.",
    detail:
      "Phiên kết nối kinh doanh theo lịch hẹn, ghép đôi nhu cầu — năng lực giữa các doanh nghiệp trong hệ sinh thái.",
    frequency: "Hàng tháng",
  },
  {
    icon: Map,
    name: "Project Visit",
    description: "Tham quan và khảo sát thực tế dự án.",
    detail:
      "Chuyến tham quan thực địa tại các dự án bất động sản, đánh giá trực tiếp vị trí, tiến độ và tiềm năng.",
    frequency: "Hàng tháng",
  },
  {
    icon: Presentation,
    name: "Real Hub Forum",
    description: "Sự kiện chuyên đề quy mô lớn theo tháng/quý.",
    detail:
      "Diễn đàn chuyên đề quy mô lớn hội tụ chuyên gia, nhà đầu tư và doanh nghiệp đầu ngành trong lĩnh vực bất động sản.",
    frequency: "Tháng / Quý",
  },
];

export default function ActivitiesSection() {
  return (
    <section id="hoat-dong" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Hoạt động định kỳ
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Các hoạt động Offline của Real Hub
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Các hoạt động được thiết kế theo từng chủ đề và nhóm thành viên —
            từ networking, chia sẻ kiến thức đến kết nối giao dịch và khảo
            sát thực tế.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((activity, idx) => (
            <FadeIn key={activity.name} delay={idx * 0.05} className="h-full">
              <div className="group relative h-full bg-white rounded-2xl p-7 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                      <activity.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-500 group-hover:border-red-100 group-hover:text-red-600 transition-colors">
                      {activity.frequency}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
                    {activity.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {activity.description}
                  </p>
                  <p className="mt-auto text-sm text-gray-500 leading-relaxed">
                    {activity.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
