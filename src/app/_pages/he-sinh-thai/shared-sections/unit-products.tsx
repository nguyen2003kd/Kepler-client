"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEcosystemUnits } from "../use-ecosystem-units";

export default function UnitProducts({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const unit = units[unitKey];

  return (
    <section id="products" className="relative overflow-hidden bg-gray-50 scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
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
              Sản phẩm tiêu biểu
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Giải pháp & dịch vụ
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Các sản phẩm và dịch vụ cốt lõi mà {unit.name} cung cấp cho khách hàng.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {unit.products.map((product, index) => (
            <motion.div
              key={product}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                  0{index + 1}
                </span>
                <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-8 text-lg font-bold text-gray-900">{product}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
