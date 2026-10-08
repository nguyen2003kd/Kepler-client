"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Building2,
  Award,
  Wrench,
  TrendingUp,
  Layers,
  Store,
  Cpu,
  Network,
  ArrowRight,
} from "lucide-react";

const ecosystemMembers = [
  {
    slug: "kepler-property",
    name: "Kepler Property – KPC Group",
    description: "Tư vấn đầu tư, môi giới, phát triển dự án và kinh doanh bất động sản.",
    link: "/he-sinh-thai/kepler-property",
    icon: Building2,
  },
  {
    slug: "kpc-appraisal",
    name: "Kepler Appraisal – KAC",
    description: "Thẩm định giá bất động sản, doanh nghiệp, máy móc thiết bị và tài sản.",
    link: "/he-sinh-thai/kpc-appraisal",
    icon: Award,
  },
  {
    slug: "kmc-management",
    name: "Kepler Management – KMC",
    description: "Quản lý, vận hành và khai thác bất động sản.",
    link: "/he-sinh-thai/kmc-management",
    icon: Wrench,
  },
  {
    slug: "kac-advisory",
    name: "Kepler M&A – KMAC",
    description: "Tư vấn M&A, tái cấu trúc doanh nghiệp và tư vấn tài chính đầu tư.",
    link: "/he-sinh-thai/kac-advisory",
    icon: TrendingUp,
  },
  {
    slug: "k-homes",
    name: "Kepler Construction – KCC",
    description: "Thiết kế kiến trúc, nội thất, thi công xây dựng mới và cải tạo công trình.",
    link: "/he-sinh-thai/k-homes",
    icon: Layers,
  },
  {
    slug: "kepler-land",
    name: "Kepler Land – Sàn giao dịch BĐS",
    description: "Môi giới và phân phối bất động sản cá nhân hoặc dự án bất động sản.",
    link: "/he-sinh-thai/kepler-land",
    icon: Store,
  },
  {
    slug: "real-hub",
    name: "Real Hub Platform",
    description: "Giải pháp số bất động sản. Nền tảng công nghệ kết nối dữ liệu, tài sản, nhà đầu tư và hệ sinh thái dịch vụ.",
    link: "/he-sinh-thai/real-hub",
    icon: Cpu,
  },
  {
    slug: "bizoffice",
    name: "BizOffice",
    description: "Hệ thống quản lý và khai thác mặt bằng, bất động sản thương mại.",
    link: "/he-sinh-thai/bizoffice",
    icon: Network,
  },
];

export default function EcosystemMembersSection() {
  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Hệ sinh thái Kepler
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Các đơn vị thành viên trong hệ sinh thái
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-red-500 mx-auto" />
          <p className="mt-8 text-lg text-gray-600 leading-relaxed">
            Mỗi đơn vị là một mảnh ghép chuyên môn, cùng nhau tạo nên mạng
            lưới kết nối toàn diện cho cộng đồng bất động sản.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemMembers.map((member, idx) => (
            <FadeIn key={member.slug} delay={idx * 0.05}>
              <Link
                href={member.link}
                className="group relative h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 block overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300">
                      <member.icon className="h-7 w-7 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {member.description}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
