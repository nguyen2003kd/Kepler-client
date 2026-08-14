"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Award, Briefcase, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { Expert } from "../expert-data";

export default function ExpertProfileContent({ expert }: { expert: Expert }) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={expert.avatar}
            alt={expert.name}
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
              href="/chuyen-gia"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Danh sách chuyên gia
            </Link>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm">
                <span className="text-3xl font-bold text-white">
                  {expert.name.replace(/^(Tiến sỹ|Thạc sỹ|Luật sư|Kỹ sư|KTS|Thẩm định viên)\s+/, "").charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {expert.prefix}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                    {expert.field}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {expert.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {expert.role}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio + Experience */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:items-start">
          {/* Left — sticky info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-3xl border border-gray-200 p-8">
              <h3 className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Thông tin
              </h3>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Chức danh</dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">{expert.prefix}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Lĩnh vực</dt>
                  <dd className="mt-1 text-sm font-bold text-gray-900">{expert.field}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">Vai trò</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-600">{expert.role}</dd>
                </div>
              </dl>
            </div>
          </motion.div>

          {/* Right — bio, experience, current */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Bio */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Kinh nghiệm
              </h2>
              <ul className="mt-8 space-y-4">
                {expert.bio.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-base leading-relaxed text-gray-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            {expert.experience && (
              <div className="rounded-3xl bg-gray-50 p-8">
                <h3 className="text-lg font-bold text-gray-900">Kinh nghiệm chuyên môn</h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  {expert.experience}
                </p>
              </div>
            )}

            {/* Current */}
            {expert.current && (
              <div className="rounded-3xl bg-gray-900 p-8">
                <h3 className="text-lg font-bold text-white">Hiện tại</h3>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  {expert.current}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      {expert.certifications.length > 0 && (
        <section className="bg-gray-900 py-24 lg:py-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 max-w-2xl"
            >
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Bằng cấp &amp; Chứng chỉ
              </h2>
              <p className="mt-4 text-lg text-white/50">
                Các văn bằng, chứng chỉ hành nghề và giấy tờ chuyên môn.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {expert.certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-white">
                    {cert}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects & Articles */}
      {(expert.projects.length > 0 || expert.articles.length > 0) && (
        <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Projects */}
            {expert.projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Dự án liên quan
                  </h2>
                </div>
                <div className="mt-8 space-y-4">
                  {expert.projects.map((project) => (
                    <Link
                      key={project.title}
                      href={project.href}
                      className="group block rounded-3xl border border-gray-200 p-6 transition hover:shadow-lg"
                    >
                      <h3 className="text-lg font-bold text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        {project.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                        Xem chi tiết
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Articles */}
            {expert.articles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Bài viết liên quan
                  </h2>
                </div>
                <div className="mt-8 space-y-4">
                  {expert.articles.map((article) => (
                    <Link
                      key={article.title}
                      href={article.href}
                      className="group block rounded-3xl border border-gray-200 p-6 transition hover:shadow-lg"
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
                        {article.date}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-gray-900">
                        {article.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
                        Đọc bài
                        <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gray-900 py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:p-12"
          >
            <div>
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Kepler Ecosystem
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trao đổi với {expert.name}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/50">
                Chia sẻ bài toán của bạn — Kepler sẽ kết nối đúng chuyên gia.
              </p>
            </div>
            <Link
              href="/lien-he"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Liên hệ ngay
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

