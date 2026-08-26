"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, BarChart3, Building2, FileSearch, Handshake, Landmark, LineChart, Settings2 } from "lucide-react";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import type { PostExtended } from "@/types/post";
import type { Category } from "@/api/models/category";
import { getThumbnailSrc } from "@/lib/responsive-image";

interface CategoryWithChildren extends Category {
  categories?: CategoryWithChildren[];
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: string;
  categoryId?: string;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  { id: "s1", title: "Tư vấn định giá và thẩm định giá", description: "Thẩm định giá bất động sản, máy móc, thiết bị, doanh nghiệp và tài sản vô hình.", slug: "tu-van-dinh-gia-va-tham-dinh-gia" },
  { id: "s2", title: "Phát triển dự án bất động sản", description: "Từ nghiên cứu thị trường, Master Planning đến Product Strategy, Marketing và Sales.", slug: "phat-trien-du-an-bat-dong-san" },
  { id: "s3", title: "Quản lý và khai thác tài sản", description: "Quản lý tòa nhà, tài sản, kỹ thuật, cộng đồng, bảo trì và vận hành.", slug: "quan-ly-va-khai-thac-tai-san" },
  { id: "s4", title: "Tư vấn và thực hiện M&A", description: "Tư vấn bên mua, bên bán xuyên suốt từ Valuation, Due Diligence đến Closing và hậu M&A.", slug: "tu-van-va-thuc-hien-ma" },
  { id: "s5", title: "Tư vấn các dịch vụ bất động sản", description: "Tư vấn môi giới, cho thuê, đầu tư và các dịch vụ bất động sản khác.", slug: "tu-van-cac-dich-vu-bat-dong-san" },
  { id: "s6", title: "Giải pháp số bất động sản", description: "Giới thiệu giải pháp PropTech và kết nối sang RealHub Platform.", slug: "giai-phap-so-bat-dong-san" },
  { id: "s7", title: "Cho thuê hội đồng cố vấn", description: "Cung cấp chuyên gia cố vấn cho các dự án và doanh nghiệp trong lĩnh vực bất động sản.", slug: "cho-thue-hoi-dong-co-van" },
];

const SERVICE_ICONS: Record<string, typeof LineChart> = {
  "tu-van-dinh-gia-va-tham-dinh-gia": FileSearch,
  "phat-trien-du-an-bat-dong-san": Building2,
  "quan-ly-va-khai-thac-tai-san": Settings2,
  "tu-van-va-thuc-hien-ma": Handshake,
  "tu-van-cac-dich-vu-bat-dong-san": Landmark,
  "giai-phap-so-bat-dong-san": LineChart,
  "cho-thue-hoi-dong-co-van": BarChart3,
};

function getServiceIcon(slug: string) {
  return SERVICE_ICONS[slug] || LineChart;
}

export default function ServicesPageView({ basePath }: { basePath: string }) {
  const { data: categoriesData } = useGetApiV10Category({ language: "vi" });

  const serviceCategoryIds = useMemo(() => {
    const root = (categoriesData?.responseData as CategoryWithChildren[])?.find(
      (cat) => cat.link === "/services"
    );
    if (!root?.categories) return [];
    return root.categories.map((sub) => sub.id).filter(Boolean);
  }, [categoriesData]);

  const { data: postData } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      pageSize: 20,
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      ...(serviceCategoryIds.length > 0 && {
        category_id: serviceCategoryIds.join(","),
      }),
    },
    {
      query: {
        enabled: serviceCategoryIds.length > 0,
        staleTime: 1000 * 60 * 5,
      },
    }
  );

  const services: ServiceItem[] = useMemo(() => {
    const posts = (postData?.responseData?.rows as PostExtended[]) || [];
    if (posts.length === 0) return FALLBACK_SERVICES;
    return posts.map((post) => ({
      id: post.id || "",
      title: post.title || "",
      description: post.summary?.replace(/<[^>]*>/g, "") || "",
      slug: post.slug || "",
      thumbnail: getThumbnailSrc(
        post.thumbnail_compress_info,
        post.thumbnail_path
      ),
      categoryId: post.category?.id,
    }));
  }, [postData]);

  const featuredServices = services.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[url('/images/category-banner-investment.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-red-300">Kepler Group</p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-6xl">Dịch vụ chuyên môn</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Giải pháp toàn diện cho bất động sản và doanh nghiệp, từ nghiên cứu đầu tư, thẩm định giá đến phát triển, vận hành và gia tăng giá trị tài sản.</p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary/90">Liên hệ chuyên gia <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Dịch vụ nổi bật</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Năng lực xuyên suốt vòng đời tài sản</h2>
          <p className="mt-4 leading-7 text-slate-600">Kết hợp chuyên gia đa ngành, dữ liệu thị trường và kinh nghiệm triển khai thực tế.</p>
        </div>
        <div className="mb-12 grid gap-5 md:grid-cols-3">
          {featuredServices.map((svc) => {
            const Icon = getServiceIcon(svc.slug);
            return (
              <Link key={svc.id} href={`${basePath}/${svc.slug}`} className="group rounded-2xl bg-gray-900 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-red-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/50 group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{svc.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{svc.description}</p>
              </Link>
            );
          })}
        </div>

        {/* All services */}
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-primary">Danh mục dịch vụ</p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((svc) => {
            const Icon = getServiceIcon(svc.slug);
            return (
              <Link key={svc.id} href={`${basePath}/${svc.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b4232f]/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{svc.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">{svc.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Case study link */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Dự án & Case Study</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Kinh nghiệm triển khai thực tế</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">Khám phá các dự án, nội dung chuyên môn và góc nhìn thị trường liên quan đến từng nhóm dịch vụ.</p>
          </div>
          <Link href="/du-an" className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white">Xem dự án và Case Study <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-700 px-6 py-16 text-center text-white lg:px-10">
        <h2 className="text-3xl font-bold sm:text-4xl">Cùng Kepler kiến tạo giá trị</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-red-100">Chia sẻ nhu cầu để đội ngũ Kepler đề xuất hướng tiếp cận phù hợp.</p>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-red-700 hover:bg-red-50">Liên hệ ngay <ArrowRight className="h-4 w-4" /></Link>
      </section>
    </main>
  );
}
