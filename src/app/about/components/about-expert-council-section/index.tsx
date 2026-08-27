"use client";

import { useEffect, useMemo, useState } from "react";
import { Award } from "lucide-react";
import Link from "next/link";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { FadeIn } from "@/components/ui/fade-in";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { ImageCompressInfo } from "@/types/post";
import baseConfig from "@/configs/base";

const advisorForms = [
  "Cố vấn theo dự án",
  "Cố vấn theo thương vụ đầu tư/M&A",
  "Cố vấn định kỳ cho doanh nghiệp",
  "Hội đồng chuyên gia độc lập cho các quyết định quan trọng",
];

interface PostRow {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  thumbnail_path?: string;
  thumbnail_compress_info?: ImageCompressInfo;
}

export default function AboutExpertCouncilSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: categoriesData } = useGetApiV10Category(
    { language: "vi" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const categoryId = useMemo(() => {
    if (!mounted) return "";
    const allCats = (categoriesData?.responseData as CategoryWithChildren[]) || [];
    const flat: CategoryWithChildren[] = [];
    const flatten = (cats: CategoryWithChildren[]) => {
      for (const c of cats) { flat.push(c); if (c.categories) flatten(c.categories); }
    };
    flatten(allCats);
    const cat = flat.find((c) => c.link === "/about/expert-council");
    return cat?.id || "";
  }, [mounted, categoriesData]);

  const { data: postData } = useGetApiV10Post(
    {
      category_id: categoryId,
      filters: "is_hidden==false",
      pageSize: 20,
      sortField: "created_at",
      sortOrder: "desc",
      filterBy: "CLIENT",
    },
    { query: { enabled: !!categoryId, staleTime: 1000 * 60 * 5 } },
  );

  const experts: PostRow[] = useMemo(() => {
    const rows = (postData?.responseData?.rows as unknown as PostRow[]) || [];
    // Sort: Nguyễn Thái Hiền first, then rest by original order
    const hienn = rows.filter((r) => r.title.includes("Hiền"));
    const others = rows.filter((r) => !r.title.includes("Hiền"));
    return [...hienn, ...others];
  }, [postData]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Outer bordered container */}
        <FadeIn>
          <div className="relative rounded-3xl border-2 border-[#DC2626] overflow-hidden shadow-lg shadow-red-200/50">
            {/* Red intro panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#DC2626] via-red-700 to-red-900 p-10 md:p-14">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:40px_40px]" />

              <div className="relative grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7">
                  <span className="text-sm font-semibold tracking-wider text-red-100 uppercase">
                    Chuyên gia & Cố vấn
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Hội đồng cố vấn
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-white/30" />
                  <p className="mt-8 text-lg text-red-50/80 leading-relaxed max-w-2xl">
                    Hội đồng cố vấn của Kepler gồm các chuyên gia hàng đầu trong
                    lĩnh vực thẩm định giá, luật đầu tư, quản lý vận hành, marketing
                    BĐS và thiết kế thi công.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
                    Các hình thức tham gia
                  </p>
                  <div className="space-y-2.5">
                    {advisorForms.map((form, i) => (
                      <div
                        key={form}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        </div>
                        <span className="text-sm text-red-50 leading-snug">{form}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Expert cards inside the bordered container */}
            <div className="bg-red-50/30 p-6 md:p-8">
              {experts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {experts.map((expert, idx) => {
                    const role = expert.summary?.split(" - ")[0] || "";
                    const imgSrc = getThumbnailSrc(expert.thumbnail_compress_info, expert.thumbnail_path);
                    return (
                      <FadeIn key={expert.id} delay={idx * 0.04}>
                        <Link
                          href={`/about/expert-council/${expert.slug}`}
                          className="group relative flex items-center gap-4 bg-white rounded-xl border border-gray-200 hover:border-[#DC2626] hover:shadow-lg transition-all duration-300 overflow-hidden p-5"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#DC2626] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                          {imgSrc ? (
                            <img
                              src={imgSrc.startsWith("http") ? imgSrc : `${baseConfig.imgEndpointDomain}${imgSrc}`}
                              alt={expert.title}
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-[#DC2626] group-hover:to-red-800 flex items-center justify-center shrink-0 transition-all duration-300">
                              <span className="text-base font-bold text-gray-400 group-hover:text-white transition-colors">
                                {expert.title.replace(/^(KTS\.|LS\.|KS\.)\s*/, "").charAt(0)}
                              </span>
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#DC2626] transition-colors">
                              {expert.title}
                            </h3>
                            {role && (
                              <p className="text-xs text-gray-500 mt-0.5">{role}</p>
                            )}
                          </div>
                        </Link>
                      </FadeIn>
                    );
                  })}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5 text-[#DC2626]" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">
                          Chuyên gia cố vấn
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Thông tin sẽ cập nhật
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
