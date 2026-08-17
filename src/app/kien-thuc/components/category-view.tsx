"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  FileBarChart,
  Map,
  Scale,
  Briefcase,
  Calculator,
  Settings,
  Building2,
  Users,
} from "lucide-react";
import { getCategoryBySlug, getArticlesByCategory, getLatestArticles } from "../libs/mock-data";
import { ArticleCard } from "../components/article-card";
import { CategoryHeader } from "../components/category-header";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  FileBarChart,
  Map,
  Scale,
  Briefcase,
  Calculator,
  Settings,
  Building2,
  Users,
};

interface CategoryViewProps {
  slug: string;
  subSections?: { title: string; description: string }[];
}

export function CategoryView({ slug, subSections }: CategoryViewProps) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const Icon = ICON_MAP[category.icon] || TrendingUp;
  const articles = getArticlesByCategory(slug);
  const allArticles = [...articles, ...getLatestArticles(6)];
  const uniqueArticles = allArticles.filter(
    (a, i, self) => i === self.findIndex((s) => s.id === a.id)
  );
  const displayArticles = uniqueArticles.slice(0, 9);

  return (
    <div className="bg-white">
      <CategoryHeader
        title={category.name}
        description={category.description}
        breadcrumb={category.name}
        icon={<Icon className="w-7 h-7 text-red-400" />}
      />

      {/* Sub-sections */}
      {subSections && subSections.length > 0 && (
        <section className="py-12 md:py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {subSections.map((sub, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className="group bg-white rounded-lg border border-gray-100 p-6 shadow-md hover:shadow-xl hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <span className="text-red-600 font-bold text-sm group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base group-hover:text-red-600 transition-colors">
                    {sub.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{sub.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                Bài viết
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                {category.name}
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
            </div>
            <p className="text-sm text-gray-500">
              {displayArticles.length} bài viết
            </p>
          </motion.div>

          {displayArticles.length > 0 ? (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {displayArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-gray-500">Chưa có bài viết trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
