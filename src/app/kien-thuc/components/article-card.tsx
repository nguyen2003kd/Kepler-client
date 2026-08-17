"use client";

import { Article, formatDate } from "../libs/mock-data";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "horizontal" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/kien-thuc/${article.slug}`}
        className="group block relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
            {article.category}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-red-200 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-200 text-sm line-clamp-2 mb-3">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/kien-thuc/${article.slug}`}
        className="group flex gap-4 bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300"
      >
        <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-wider mb-1.5">
            {article.category}
          </span>
          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
            {article.title}
          </h4>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/kien-thuc/${article.slug}`} className="group block">
        <h4 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          <Calendar className="w-3 h-3" />
          {formatDate(article.date)}
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link
      href={`/kien-thuc/${article.slug}`}
      className="group flex flex-col bg-white rounded-lg border border-gray-100 overflow-hidden shadow-md hover:shadow-xl hover:border-red-200 transition-all duration-300"
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">
          {article.category}
        </span>
        <h3 className="font-bold text-gray-900 text-base mt-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">{article.excerpt}</p>
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(article.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SectionTitle({
  title,
  subtitle,
  href,
  hrefLabel = "Xem tất cả",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
          {title}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
          {subtitle || title}
        </h2>
        <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors group shrink-0"
        >
          {hrefLabel}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </motion.div>
  );
}
