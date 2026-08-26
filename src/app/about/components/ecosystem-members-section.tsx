"use client";

import { useMemo } from "react";
import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetApiV10Category } from "@/api/endpoints/category";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";

interface EcosystemMember {
  id?: string;
  name: string;
  description?: string | null;
  link?: string | null;
  icon: typeof Building2;
}

const FALLBACK_MEMBERS: EcosystemMember[] = [
  { name: "Kepler Property – KPC Group", description: "Tư vấn đầu tư, môi giới, phát triển dự án và kinh doanh bất động sản.", link: "/he-sinh-thai/kepler-property", icon: Building2 },
  { name: "Kepler Appraisal – KAC", description: "Thẩm định giá bất động sản, doanh nghiệp, máy móc thiết bị và tài sản.", link: "/he-sinh-thai/kpc-appraisal", icon: Building2 },
  { name: "Kepler Management – KMC", description: "Quản lý, vận hành và khai thác bất động sản.", link: "/he-sinh-thai/kmc-management", icon: Building2 },
  { name: "Kepler M&A – KMAC", description: "Tư vấn M&A, tái cấu trúc doanh nghiệp và tư vấn tài chính đầu tư.", link: "/he-sinh-thai/kac-advisory", icon: Building2 },
  { name: "Kepler Construction – KCC", description: "Thiết kế kiến trúc, nội thất, thi công xây dựng mới và cải tạo công trình.", link: "/he-sinh-thai/k-homes", icon: Building2 },
  { name: "Kepler Land – Sàn giao dịch BĐS", description: "Môi giới và phân phối bất động sản cá nhân hoặc dự án bất động sản.", link: "/he-sinh-thai/kepler-land", icon: Building2 },
  { name: "Real Hub Platform", description: "Giải pháp số bất động sản. Nền tảng công nghệ kết nối dữ liệu, tài sản, nhà đầu tư và hệ sinh thái dịch vụ.", link: "/he-sinh-thai/realhub", icon: Building2 },
  { name: "BizOffice", description: "Hệ thống quản lý và khai thác mặt bằng, bất động sản thương mại.", link: "/he-sinh-thai/bizoffice", icon: Building2 },
];

export default function EcosystemMembersSection() {
  const { data: categoriesData } = useGetApiV10Category(
    { language: "vi" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const members: EcosystemMember[] = useMemo(() => {
    const allCats = (categoriesData?.responseData as CategoryWithChildren[]) || [];
    let ecoCat: CategoryWithChildren | undefined;
    for (const root of allCats) {
      if (root.link === "/he-sinh-thai") { ecoCat = root; break; }
      if (root.categories) {
        ecoCat = root.categories.find((sub) => sub.link === "/he-sinh-thai");
        if (ecoCat) break;
      }
    }

    if (ecoCat && ecoCat.categories && ecoCat.categories.length > 0) {
      return ecoCat.categories.map((child) => ({
        id: child.id,
        name: child.name || "",
        description: child.description,
        link: child.link || undefined,
        icon: Building2,
      }));
    }

    return FALLBACK_MEMBERS;
  }, [categoriesData]);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <FadeIn className="max-w-2xl mb-14">
          <span className="text-sm font-semibold tracking-wider text-[#DC2626] uppercase">
            Hệ sinh thái Kepler
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Hệ thống thành viên và lĩnh vực hoạt động
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-[#DC2626]" />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((member, idx) => {
            const Icon = member.icon;
            return (
              <FadeIn key={member.id || member.name} delay={idx * 0.05}>
                <Link href={member.link || "#"}>
                  <div className="group relative h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#DC2626] hover:shadow-lg transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-[#DC2626]" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.description || ""}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-8 text-right">
          <Link
            href="/he-sinh-thai"
            className="inline-flex items-center gap-2 text-[#DC2626] font-semibold hover:gap-3 transition-all"
          >
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
