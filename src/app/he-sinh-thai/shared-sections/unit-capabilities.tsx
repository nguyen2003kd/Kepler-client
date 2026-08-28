"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEcosystemUnits } from "../use-ecosystem-units";

export default function UnitCapabilities({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const unit = units[unitKey];

  if (unitKey === "kpc-appraisal")
    return (
      <section id="capabilities" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
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
              Năng lực cốt lõi
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Một báo cáo. Nhiều quyết định.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Quy trình thẩm định độc lập, minh bạch và có thể kiểm chứng.
          </p>
        </motion.div>
        <div className="overflow-hidden rounded-3xl border border-gray-200">
          {unit.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group flex items-center justify-between px-8 py-6 transition hover:bg-gray-50 ${
                index !== unit.items.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-primary/30 transition group-hover:text-primary">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item}</h3>
                  <p className="mt-1 text-sm text-gray-500">Dữ liệu · Phương pháp · Kết quả</p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.div>
          ))}
        </div>
      </section>
    );

  if (unitKey === "kmc-management")
    return (
      <section id="capabilities" className="relative overflow-hidden bg-gray-50 py-24 scroll-mt-20 lg:py-32">
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
                Năng lực cốt lõi
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Vận hành không ngắt quãng.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Giám sát, quản lý và tối ưu tài sản 24/7.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {unit.items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-2xl border p-8 transition hover:shadow-lg ${
                  index === 0
                    ? "border-primary/30 bg-primary/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-5xl font-bold text-primary/30">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );

  if (unitKey === "kac-advisory")
    return (
      <section id="capabilities" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
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
              Năng lực cốt lõi
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Tư vấn theo từng bước tiến.
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Từ phân tích chiến lược đến thực thi giao dịch.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
          {unit.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl p-8 transition hover:shadow-lg ${
                index % 2 === 0 ? "bg-primary text-white" : "bg-gray-50 text-gray-900"
              }`}
            >
              <span className={`absolute -right-4 -top-8 text-[8rem] font-bold opacity-10 ${index % 2 === 0 ? "text-white" : "text-gray-900"}`}>
                0{index + 1}
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Giai đoạn {index + 1}
              </span>
              <h3 className="relative mt-24 text-2xl font-bold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    );

  if (unitKey === "k-homes")
    return (
      <section id="capabilities" className="relative overflow-hidden bg-gray-50 py-24 scroll-mt-20 lg:py-32">
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
                Năng lực cốt lõi
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Tạo hình. Kiến tạo.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Một quy trình liền mạch từ bản vẽ đầu tiên đến không gian hoàn thiện.
            </p>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-2">
            {unit.items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative min-h-64 overflow-hidden rounded-3xl p-8 transition hover:shadow-lg ${
                  index % 2 === 0
                    ? "border border-gray-200 bg-white"
                    : "bg-primary"
                }`}
              >
                <span className={`absolute -right-4 -top-8 text-[8rem] font-bold opacity-20 ${index % 2 === 0 ? "text-primary" : "text-white"}`}>
                  0{index + 1}
                </span>
                <span className={`text-sm font-medium uppercase tracking-[0.25em] ${index % 2 === 0 ? "text-primary" : "text-white/80"}`}>
                  K-Homes / 0{index + 1}
                </span>
                <h3 className={`relative mt-24 text-2xl font-bold ${index % 2 === 0 ? "text-gray-900" : "text-white"}`}>{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );

  if (unitKey === "realhub")
    return (
      <section id="capabilities" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Năng lực cốt lõi
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Một nền tảng. Nhiều kết nối.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Kết nối dữ liệu, tài sản và người dùng trong một trải nghiệm thống nhất.
            </p>
          </div>
          <span className="w-fit rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">REALHUB / BETA</span>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unit.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-3xl border border-gray-200 bg-white p-8 transition hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                  Module 0{index + 1}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <h3 className="mt-8 text-xl font-bold text-gray-900">{item}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Kết nối dữ liệu, tài sản và người dùng trong một trải nghiệm thống nhất.
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    );

  return (
    <section id="capabilities" className="mx-auto max-w-[1400px] scroll-mt-20 px-6 py-24 lg:px-12 lg:py-32">
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
            Năng lực cốt lõi
          </span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Giải pháp theo từng chuyên môn
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Mỗi năng lực là một điểm chạm chuyên sâu, được kết nối với toàn bộ hệ sinh thái Kepler.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {unit.items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                0{index + 1}
              </span>
              <ArrowUpRight className="h-5 w-5 text-gray-300 transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-10 text-xl font-bold text-gray-900">{item}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Đội ngũ chuyên môn đồng hành từ tư vấn đến triển khai thực tế.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
