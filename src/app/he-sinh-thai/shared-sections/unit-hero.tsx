"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { units, type EcosystemUnit } from "../unit-data";

const images: Record<string, string> = { "kepler-property": "/images/banner-1.png", "kpc-appraisal": "/images/banner-2.jpg", "kmc-management": "/images/bg-home.jpg", "kac-advisory": "/images/banner-3.jpg", "k-homes": "/images/image-111.png", realhub: "/images/image-112.png" };

export default function UnitHero({ unitKey }: { unitKey: keyof typeof units }) {
  const unit: EcosystemUnit = units[unitKey];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images[unitKey]}
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
          <Link
            href="/he-sinh-thai"
            className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Hệ sinh thái Kepler
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              {unit.eyebrow}
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {unit.name}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
            {unit.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
