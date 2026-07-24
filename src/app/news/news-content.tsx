"use client";

import { NEWS } from "@/constants/kepler-data";
import NewsCard from "@/app/(home)/_views/news-card";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { SelectDropdown } from "@/components/ui/select-dropdown";

export default function NewsContent() {
  const [category, setCategory] = useState<string>("");

  const CATEGORIES = useMemo(
    () => Array.from(new Set(NEWS.map((n) => n.category))).sort(),
    [],
  );

  const filtered = useMemo(
    () => (category ? NEWS.filter((n) => n.category === category) : NEWS),
    [category],
  );

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        className="relative h-[200px] md:h-[320px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('https://picsum.photos/seed/news-hero/1920/1080')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full pb-6 md:pb-10">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3 text-white/70 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-white">Tin tức BĐS</span>
              </div>
              <h1 className="text-[clamp(22px,4vw,42px)] font-bold text-white leading-tight">
                Tin tức bất động sản
              </h1>
              <p className="mt-1 md:mt-2 text-white/80 text-sm md:text-[15px] max-w-[560px] hidden md:block">
                Cập nhật xu hướng thị trường, quy hoạch và tư vấn đầu tư BĐS.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* News grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Section head with category filter */}
          <FadeIn direction="up" duration={0.5}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 md:gap-4 mb-6 md:mb-8 pb-3 md:pb-4 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <span className="w-6 md:w-8 h-[2px] bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Tin tức</span>
                </div>
                <h2 className="text-[clamp(20px,2.5vw,32px)] font-bold text-[#1a1a1a] leading-tight">
                  Cập nhật thị trường BĐS
                </h2>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Chuyên mục</label>
                <SelectDropdown
                  value={category}
                  onChange={setCategory}
                  options={[
                    { value: "", label: "Tất cả" },
                    ...CATEGORIES.map((c) => ({ value: c, label: c })),
                  ]}
                  className="min-h-[36px] md:min-h-[38px] text-sm"
                />
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          {filtered.length > 0 ? (
            <Stagger delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((n) => (
                <StaggerItem key={n.id}>
                  <NewsCard item={n} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <FadeIn direction="up" delay={0.2} duration={0.5}>
              <div className="text-center py-12 md:py-20 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Không có bài viết trong chuyên mục này.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}
