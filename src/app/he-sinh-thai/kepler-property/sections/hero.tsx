"use client";

import SafeImage from "@/components/common/safe-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEcosystemUnits } from "../../use-ecosystem-units";

export default function KeplerPropertyHero() {
  const units = useEcosystemUnits();
  const unit = units["kepler-property"];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage
          src={unit.image || "/images/banner-1.png"}
          alt={unit.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>
      <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] flex-col justify-center px-6 py-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {unit.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
            {unit.description}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Trao đổi nhu cầu
            </Link>
            <a
              href="#nang-luc"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Khám phá năng lực
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
