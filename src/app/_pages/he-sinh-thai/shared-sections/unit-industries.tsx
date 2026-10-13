"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEcosystemUnits } from "../use-ecosystem-units";

export default function UnitIndustries({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const unit = units[unitKey];

  return (
    <section id="industries" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-primary" />
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
            Ngành nghề chính
          </span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Lĩnh vực hoạt động
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Năng lực chuyên môn được kết nối trong toàn bộ hệ sinh thái Kepler.
        </p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {unit.industries.map((industry, index) => (
          <motion.div
            key={industry}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 transition hover:border-primary/30 hover:bg-primary/5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Check className="h-4 w-4 text-primary" />
            </span>
            <span className="text-sm font-medium text-gray-700">{industry}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
