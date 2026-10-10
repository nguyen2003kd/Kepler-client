"use client";

import ProfileLayout from "@/app/about/components/profile-layout";
import Link from "next/link";
import { ArrowUpRight, Briefcase, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { Expert } from "../expert-data";

export default function ExpertProfileContent({ expert }: { expert: Expert }) {
  return (
    <div className="min-h-screen bg-white">
      <ProfileLayout
        name={expert.name}
        groupName="Chuyên gia"
        backHref="/chuyen-gia"
        imageSrc={expert.avatar}
        imageAlt="Ảnh minh họa hiện có trong dự án"
        imageCaption="Ảnh minh họa hiện có"
        subtitle={<><p className="font-medium text-gray-900">{expert.prefix} · {expert.field}</p><p className="mt-1">{expert.role}</p></>}
        panels={{
          introduction: <div className="space-y-4">
            {expert.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {expert.current && <div className="rounded-lg bg-gray-50 p-4"><h3 className="mb-2 font-semibold text-gray-900">Hiện tại</h3><p>{expert.current}</p></div>}
          </div>,
          experience: expert.experience ? <p>{expert.experience}</p> : undefined,
          achievements: expert.certifications.length ? <div>
            <h3 className="mb-3 font-semibold text-gray-900">Bằng cấp &amp; Chứng chỉ</h3>
            <ul className="list-disc space-y-3 pl-5 marker:text-primary">{expert.certifications.map((cert) => <li key={cert}>{cert}</li>)}</ul>
          </div> : undefined,
        }}
      />

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
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              Liên hệ ngay
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

