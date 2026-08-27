"use client";

import { motion } from "framer-motion";
import SafeImage from "@/components/common/safe-image";

interface AboutHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}

export default function AboutHero({
  eyebrow,
  title,
  description,
  image,
}: AboutHeroProps) {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <SafeImage
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.15),_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-6">
            <span className="text-sm font-semibold tracking-wider text-red-400 uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="mt-8 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>
      </div>
    </section>
  );
}
