"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import type { CategoryWithChildren } from "@/api/models/categoryWithChildren";

interface EcosystemMember {
  slug: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const FALLBACK_IMAGE = "/images/category-banner-investment.png";

const FALLBACK_MEMBERS: EcosystemMember[] = [
  { slug: "kepler-property", name: "Kepler Property – KPC Group", description: "Tư vấn đầu tư, môi giới, phát triển dự án và kinh doanh bất động sản.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/kepler-property" },
  { slug: "kpc-appraisal", name: "Kepler Appraisal – KAC", description: "Thẩm định giá bất động sản, doanh nghiệp, máy móc thiết bị và tài sản.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/kpc-appraisal" },
  { slug: "kmc-management", name: "Kepler Management – KMC", description: "Quản lý, vận hành và khai thác bất động sản.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/kmc-management" },
  { slug: "kac-advisory", name: "Kepler M&A – KMAC", description: "Tư vấn đầu tư, M&A, tái cấu trúc, tài chính và gọi vốn.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/kac-advisory" },
  { slug: "k-homes", name: "Kepler Construction – KCC", description: "Thiết kế kiến trúc, nội thất, thi công và cải tạo công trình.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/k-homes" },
  { slug: "kepler-land", name: "Kepler Land – Sàn giao dịch BĐS", description: "Sàn giao dịch bất động sản.", image: FALLBACK_IMAGE, link: "/he-sinh-thai/kepler-land" },
];

export default function EcosystemSection() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { data: categoriesData } = useGetApiV10Category(
    { language: "vi" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const { data: imgConfigData } = useGetApiV10PageConfig(
    { filters: "key==ECOSYSTEM_IMAGES" },
    { query: { staleTime: 1000 * 60 * 5, refetchOnMount: false, refetchOnWindowFocus: false } },
  );

  const members: EcosystemMember[] = useMemo(() => {
    if (!mounted) return FALLBACK_MEMBERS;

    // 1. Fetch categories from API, find /he-sinh-thai parent
    const allCats = (categoriesData?.responseData as CategoryWithChildren[]) || [];
    let ecoCat: CategoryWithChildren | undefined;
    for (const root of allCats) {
      if (root.link === "/he-sinh-thai") { ecoCat = root; break; }
      if (root.categories) {
        ecoCat = root.categories.find((sub) => sub.link === "/he-sinh-thai");
        if (ecoCat) break;
      }
    }

    // 2. Parse image config from base-config
    const imageMap: Record<string, string> = {};
    const imgRows = imgConfigData?.responseData?.rows;
    if (imgRows && imgRows.length > 0) {
      const viRow = imgRows.find((r: { language?: string }) => r.language === "vi") as
        | { value: string | null }
        | undefined;
      const row = viRow || (imgRows[0] as { value: string | null });
      if (row?.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.images && typeof parsed.images === "object") {
            Object.assign(imageMap, parsed.images);
          }
        } catch {
          // ignore parse error
        }
      }
    }

    // 3. Build members from category children
    if (ecoCat && ecoCat.categories && ecoCat.categories.length > 0) {
      return ecoCat.categories.map((child) => {
        const slug = (child.link || "").replace("/he-sinh-thai/", "");
        return {
          slug,
          name: child.name || "",
          description: child.description || "",
          image: imageMap[slug] || FALLBACK_IMAGE,
          link: child.link || `/he-sinh-thai/${slug}`,
        };
      });
    }

    // 4. Fallback to hardcoded members
    return FALLBACK_MEMBERS.map((m) => ({
      ...m,
      image: imageMap[m.slug] || m.image,
    }));
  }, [mounted, categoriesData, imgConfigData]);

  return (
    <section className="relative bg-gray-50 py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Hệ sinh thái Kepler
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            {members.length} thương hiệu thành viên
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: List */}
          <div className="lg:col-span-7 space-y-2">
            {members.map((item, index) => (
              <Link
                key={item.slug || index}
                href={item.link}
                onMouseEnter={() => setActive(index)}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className={`group cursor-pointer border-l-2 px-6 py-5 transition-all duration-300 ${
                    active === index
                      ? "border-primary bg-white shadow-md"
                      : "border-gray-200 hover:border-gray-400 bg-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-bold transition-colors ${
                          active === index ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p
                        className={`text-sm mt-1 transition-all ${
                          active === index
                            ? "text-gray-600 opacity-100 max-h-20"
                            : "text-gray-400 opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        active === index ? "scale-100 opacity-100" : "scale-75 opacity-40"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right: Visual preview */}
          <div className="lg:col-span-5">
            <motion.div
              className="sticky top-6 rounded-2xl overflow-hidden shadow-xl aspect-[4/5]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={members[active]?.image || FALLBACK_MEMBERS[0].image}
                alt={members[active]?.name || ""}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2">
                  0{active + 1} / {String(members.length).padStart(2, "0")}
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-3">
                  {members[active]?.name}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-[40ch]">
                  {members[active]?.description}
                </p>
                <Link
                  href={members[active]?.link || "/he-sinh-thai"}
                  className="inline-flex items-center gap-2 mt-6 text-white text-sm font-medium group/link"
                >
                  Khám phá hệ sinh thái
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
