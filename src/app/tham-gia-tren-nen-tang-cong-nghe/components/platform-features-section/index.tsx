"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  UserSearch,
  Building,
  Share2,
  Handshake,
  Landmark,
  Database,
  Home,
  Users,
  CalendarCheck,
  GraduationCap,
} from "lucide-react";

const platformFeatures = [
  {
    icon: UserSearch,
    title: "Tìm kiếm và kết nối chuyên gia",
    description:
      "Tra cứu hồ sơ chuyên gia theo lĩnh vực và kết nối trực tiếp với chuyên môn phù hợp.",
  },
  {
    icon: Building,
    title: "Khám phá bất động sản và dự án",
    description:
      "Duyệt danh mục tài sản, dự án với thông tin chi tiết, hình ảnh và dữ liệu cập nhật.",
  },
  {
    icon: Share2,
    title: "Chia sẻ cơ hội đầu tư",
    description:
      "Đăng tải và tiếp cận các cơ hội đầu tư bất động sản từ thành viên trong mạng lưới.",
  },
  {
    icon: Handshake,
    title: "Tìm kiếm đối tác kinh doanh",
    description:
      "Ghép nối nhu cầu — năng lực giữa các doanh nghiệp và đối tác tiềm năng.",
  },
  {
    icon: Landmark,
    title: "Kết nối nguồn vốn và nhà đầu tư",
    description:
      "Cầu nối giữa dự án cần vốn và nhà đầu tư, tổ chức tài chính đang tìm kiếm cơ hội.",
  },
  {
    icon: Database,
    title: "Tra cứu dữ liệu và thông tin thị trường",
    description:
      "Dữ liệu thị trường, giá, diễn biến và báo cáo phân tích bất động sản minh bạch.",
  },
  {
    icon: Home,
    title: "Đăng tải nhu cầu mua – bán – thuê – cho thuê",
    description:
      "Đăng tin và tìm kiếm nhu cầu giao dịch bất động sản nhanh chóng, hiệu quả.",
  },
  {
    icon: Users,
    title: "Tham gia các nhóm chuyên môn",
    description:
      "Cộng đồng theo từng lĩnh vực: đầu tư, pháp lý, thiết kế, quản lý, công nghệ…",
  },
  {
    icon: CalendarCheck,
    title: "Đăng ký sự kiện Offline",
    description:
      "Cập nhật lịch và đăng ký trực tiếp các sự kiện, hoạt động networking của Real Hub.",
  },
  {
    icon: GraduationCap,
    title: "Tọa đàm, đào tạo và hoạt động cộng đồng Online",
    description:
      "Webinar, khóa học ngắn và các hoạt động cộng đồng trực tuyến thường xuyên.",
  },
];

export default function PlatformFeaturesSection() {
  return (
    <section id="tinh-nang" className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Nền tảng trực tuyến
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Thành viên có thể làm gì trên Platform?
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Trên nền tảng Platform Bất động sản, thành viên có thể:
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {platformFeatures.map((feature, idx) => (
            <FadeIn key={feature.title} delay={idx * 0.05} className="h-full">
              <div className="group relative h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-4 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-auto text-sm text-gray-500 leading-relaxed">
                    {feature.description}
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
