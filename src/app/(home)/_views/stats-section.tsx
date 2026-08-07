"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 25, suffix: "+", label: "Năm kinh nghiệm" },
  { value: 500, suffix: "+", label: "Khách hàng doanh nghiệp" },
  { value: 2000, suffix: "+", label: "Tài sản đã tư vấn" },
  { value: 100, suffix: "+", label: "Dự án tham gia" },
  { value: 50, suffix: "+", label: "Chuyên gia và cộng tác viên" },
  { value: 100000, suffix: "+", label: "m² diện tích quản lý" },
];

function CountUp({
  end,
  suffix,
  duration = 2000,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  const formatted =
    count >= 1000 ? `${(count / 1000).toFixed(0)}.000` : `${count}`;

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-gray-900 py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.08),_transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Những con số tạo nên năng lực
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gray-900 p-8 md:p-10 text-center group hover:bg-gray-800 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
