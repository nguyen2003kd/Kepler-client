"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Cookie, FileText, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  ScrollText,
  Cookie,
};

export interface LegalSection {
  id: string;
  title: string;
  body: string[];
}

export interface LegalPageData {
  title: string;
  subtitle: string;
  lastUpdated: string;
  icon: string;
  sections: LegalSection[];
  relatedLinks: { label: string; href: string }[];
}

export default function LegalLayout({ data }: { data: LegalPageData }) {
  const { title, subtitle, lastUpdated, icon, sections, relatedLinks } = data;
  const Icon = iconMap[icon] ?? FileText;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero — asymmetric, left-aligned */}
      <section className="relative min-h-[60dvh] overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/category-banner-investment.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/80 to-black/60" />

        <div className="relative mx-auto flex min-h-[60dvh] max-w-[1400px] flex-col justify-center px-6 py-20 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Trang chủ
            </Link>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="h-px w-12 bg-primary" />
              <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
                Kepler Group
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tighter text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              {subtitle}
            </p>
            <p className="mt-4 text-sm text-white/40">
              Cập nhật: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content — sticky TOC + scrollable body */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
          {/* TOC Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Mục lục
                </p>
                <nav className="mt-4 space-y-1">
                  {sections.map((section, index) => (
                    <motion.a
                      key={section.id}
                      href={`#${section.id}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {String(index + 1).padStart(2, "0")}. {section.title}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Related Links */}
              {relatedLinks.length > 0 && (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Liên quan
                  </p>
                  <div className="mt-4 space-y-3">
                    {relatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between text-sm text-gray-600 transition-colors hover:text-primary"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.article
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-extrabold tracking-tighter text-primary/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-6 space-y-4">
                  {section.body.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-base leading-relaxed text-gray-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:p-10"
            >
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    Kepler Group
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900">
                    Bạn có câu hỏi về chính sách này?
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Liên hệ với chúng tôi để được hỗ trợ nhanh chóng.
                  </p>
                </div>
                <Link
                  href="/lien-he"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  Liên hệ ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
