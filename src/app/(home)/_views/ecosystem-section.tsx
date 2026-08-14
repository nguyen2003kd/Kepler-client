"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ECOSYSTEM = [
  {
    name: "Kepler Property",
    desc: "Tư vấn đầu tư, môi giới, phát triển dự án và kinh doanh bất động sản.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prj1/1200/800",
  },
  {
    name: "KPC Appraisal",
    desc: "Thẩm định giá bất động sản, doanh nghiệp, máy móc thiết bị và tài sản.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prj2/1200/800",
  },
  {
    name: "KMC Management",
    desc: "Quản lý, vận hành và khai thác bất động sản.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prj3/1200/800",
  },
  {
    name: "KAC Advisory",
    desc: "Tư vấn M&A, tái cấu trúc doanh nghiệp và tư vấn tài chính đầu tư.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prj4/1200/800",
  },
  {
    name: "K-Homes",
    desc: "Thiết kế kiến trúc, nội thất, thi công và cải tạo công trình.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prjint1/1200/800",
  },
  {
    name: "RealHub",
    desc: "Nền tảng công nghệ kết nối dữ liệu, tài sản, nhà đầu tư và hệ sinh thái dịch vụ.",
    color: "from-primary to-primary/80",
    image: "https://picsum.photos/seed/prjint2/1200/800",
  },
];

export default function EcosystemSection() {
  const [active, setActive] = useState(0);

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
            6 thương hiệu thành viên
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: List */}
          <div className="lg:col-span-7 space-y-2">
            {ECOSYSTEM.map((item, index) => (
              <motion.div
                key={item.name}
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
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
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
                src={ECOSYSTEM[active].image}
                alt={ECOSYSTEM[active].name}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2">
                  0{active + 1} / 06
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-3">
                  {ECOSYSTEM[active].name}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed max-w-[40ch]">
                  {ECOSYSTEM[active].desc}
                </p>
                <Link
                  href="/he-sinh-thai"
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
