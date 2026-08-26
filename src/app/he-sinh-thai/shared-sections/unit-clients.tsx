"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useEcosystemUnits } from "../use-ecosystem-units";

export default function UnitClients({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const unit = units[unitKey];

  return (
    <section id="clients" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center"
      >
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              Đối tác & Khách hàng
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ai chúng tôi phục vụ
          </h2>
          <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Users className="h-10 w-10 text-primary" />
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 lg:p-12">
          <p className="text-lg leading-relaxed text-gray-700">
            {unit.clients}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
