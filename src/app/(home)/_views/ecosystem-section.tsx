"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";

interface EcosystemMember {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  logo: string;
  tags: string[];
  link: string;
}

const FALLBACK_MEMBERS: EcosystemMember[] = [
  {
    slug: "kepler-property",
    name: "Kepler Property",
    eyebrow: "Đầu tư & Phát triển",
    description: "Tư vấn đầu tư, môi giới, phát triển dự án và kinh doanh bất động sản.",
    image: "https://picsum.photos/seed/prj1/1200/800",
    logo: "",
    tags: ["Tư vấn đầu tư", "Môi giới", "Leasing", "Phát triển dự án"],
    link: "/he-sinh-thai/kepler-property",
  },
  {
    slug: "kpc-appraisal",
    name: "KPC Appraisal",
    eyebrow: "Thẩm định giá",
    description: "Thẩm định giá bất động sản, doanh nghiệp, máy móc thiết bị và tài sản.",
    image: "https://picsum.photos/seed/prj2/1200/800",
    logo: "",
    tags: ["Bất động sản", "Máy móc - thiết bị", "Giá trị doanh nghiệp", "Dự án"],
    link: "/he-sinh-thai/kpc-appraisal",
  },
  {
    slug: "kmc-management",
    name: "KMC Management",
    eyebrow: "Quản lý & Vận hành",
    description: "Quản lý, vận hành và khai thác bất động sản.",
    image: "https://picsum.photos/seed/prj3/1200/800",
    logo: "",
    tags: ["Quản lý tòa nhà", "Quản lý tài sản", "Quản lý kỹ thuật", "Quản lý tài chính"],
    link: "/he-sinh-thai/kmc-management",
  },
  {
    slug: "kac-advisory",
    name: "KAC Advisory",
    eyebrow: "Tài chính & M&A",
    description: "Tư vấn M&A, tái cấu trúc doanh nghiệp và tư vấn tài chính đầu tư.",
    image: "https://picsum.photos/seed/prj4/1200/800",
    logo: "",
    tags: ["Tư vấn đầu tư", "M&A", "Tái cấu trúc", "Tư vấn tài chính"],
    link: "/he-sinh-thai/kac-advisory",
  },
  {
    slug: "k-homes",
    name: "K-Homes",
    eyebrow: "Design & Build",
    description: "Thiết kế kiến trúc, nội thất, thi công và cải tạo công trình.",
    image: "https://picsum.photos/seed/prjint1/1200/800",
    logo: "",
    tags: ["Thiết kế kiến trúc", "Thiết kế nội thất", "Thi công", "Cải tạo"],
    link: "/he-sinh-thai/k-homes",
  },
  {
    slug: "realhub",
    name: "RealHub",
    eyebrow: "PropTech Platform",
    description: "Nền tảng công nghệ kết nối dữ liệu, tài sản, nhà đầu tư và hệ sinh thái dịch vụ.",
    image: "https://picsum.photos/seed/prjint2/1200/800",
    logo: "",
    tags: ["Giới thiệu nền tảng", "Đối tượng sử dụng", "Các module dự kiến", "Roadmap"],
    link: "/he-sinh-thai",
  },
];

export default function EcosystemSection() {
  const [active, setActive] = useState(0);

  const { data } = useGetApiV10PageConfig(
    { filters: "key==ECOSYSTEM_MEMBERS" },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  );

  const members: EcosystemMember[] = useMemo(() => {
    const rows = data?.responseData?.rows;
    if (rows && rows.length > 0) {
      const viRow = rows.find((r: { language?: string }) => r.language === "vi") as
        | { value: string | null }
        | undefined;
      const row = viRow || (rows[0] as { value: string | null });
      if (row.value) {
        try {
          const parsed = JSON.parse(row.value);
          if (parsed.members && Array.isArray(parsed.members) && parsed.members.length > 0) {
            return parsed.members as EcosystemMember[];
          }
        } catch {
          // fall through to fallback
        }
      }
    }
    return FALLBACK_MEMBERS;
  }, [data]);

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
              <motion.div
                key={item.slug || index}
                onMouseEnter={() => setActive(index)}
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
