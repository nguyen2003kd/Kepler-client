"use client";

import SafeImage from "@/components/common/safe-image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { type EcosystemUnit } from "../unit-data";
import { useEcosystemUnits } from "../use-ecosystem-units";

const defaultImage = "/images/bg-home.jpg";

export default function UnitHero({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const unit: EcosystemUnit = units[unitKey];
  const heroImage = unit.image || defaultImage;
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gray-900">
      {/* Background */}
      <div className="absolute inset-0">
        <SafeImage
          src={heroImage}
          alt={unit.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating blob */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[85vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-6xl lg:text-7xl">
            {unit.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            {unit.description}
          </p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {unit.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#capabilities"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
            >
              Khám phá năng lực
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
            >
              Liên hệ tư vấn
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
