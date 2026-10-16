"use client";

import { FadeIn } from "@/components/ui/fade-in";
import {
  Users,
  Building2,
  TrendingUp,
  Handshake,
  Landmark,
  Home,
  Briefcase,
  Globe,
} from "lucide-react";

const stakeholderGroups = [
  {
    icon: Users,
    title: "Chuyên gia",
    description:
      "Chuyên gia đầu tư, pháp lý, thẩm định giá, quy hoạch và quản lý bất động sản.",
  },
  {
    icon: TrendingUp,
    title: "Nhà đầu tư",
    description:
      "Nhà đầu tư cá nhân và tổ chức đang tìm kiếm cơ hội đầu tư bất động sản.",
  },
  {
    icon: Building2,
    title: "Chủ đầu tư",
    description:
      "Chủ đầu tư dự án cần nguồn lực, đối tác và kênh phân phối hiệu quả.",
  },
  {
    icon: Briefcase,
    title: "Doanh nghiệp",
    description:
      "Doanh nghiệp hoạt động trong lĩnh vực bất động sản và các ngành liên quan.",
  },
  {
    icon: Handshake,
    title: "Môi giới",
    description:
      "Môi giới chuyên nghiệp và các đơn vị phân phối bất động sản.",
  },
  {
    icon: Landmark,
    title: "Tổ chức tài chính",
    description:
      "Ngân hàng, quỹ đầu tư và các tổ chức tài chính hỗ trợ vốn cho thị trường.",
  },
  {
    icon: Globe,
    title: "Đơn vị dịch vụ BĐS",
    description:
      "Các đơn vị cung cấp dịch vụ bất động sản: tư vấn, thiết kế, xây dựng, pháp lý…",
  },
  {
    icon: Home,
    title: "Cư dân",
    description:
      "Cư dân và khách hàng cuối cùng trong chuỗi giá trị bất động sản.",
  },
];

export default function EcosystemIntroSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <FadeIn className="lg:col-span-5" direction="right">
            <div className="lg:sticky lg:top-8">
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Giới thiệu
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Hệ sinh thái và cộng đồng bất động sản
              </h2>
              <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                Hệ sinh thái và cộng đồng bất động sản là nơi kết nối chuyên
                gia, nhà đầu tư, chủ đầu tư, doanh nghiệp, môi giới, tổ chức
                tài chính, các đơn vị cung cấp dịch vụ bất động sản và cư dân
                — thông qua cả hoạt động Offline và Online.
              </p>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Nơi đây không chỉ là một cộng đồng giao lưu, mà hướng tới trở
                thành mạng lưới kết nối tri thức, nguồn lực, dữ liệu và cơ
                hội kinh doanh bất động sản.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="lg:col-span-7" delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-5">
              {stakeholderGroups.map((group, idx) => (
                <FadeIn key={group.title} delay={0.1 + idx * 0.05}>
                  <div className="group h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-4 group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                      <group.icon className="h-6 w-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
