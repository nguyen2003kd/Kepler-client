"use client";

import { Category } from "@/api/models/category";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CategoryTabProps {
  categories: Category[];
  parentLink?: string;
}

export default function CategoryTab({ 
  categories,
  parentLink,
}: CategoryTabProps) {
  const { t } = useTranslation("pages/post-detail");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const basePathname = pathname === "/certification" ? "/nang-luc" : pathname;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync selected category with current pathname + query param ?category
  useEffect(() => {
    const currentSubcategory = searchParams.get("category");
    const matched = categories.find((cat) => {
      if (!cat.link) return false;
      if (cat.link === pathname) return true;
      try {
        const catUrl = new URL(cat.link, "http://placeholder");
        const isSamePath = catUrl.pathname === pathname || catUrl.pathname === basePathname;
        const hasMatchingCategory = currentSubcategory
          ? catUrl.searchParams.get("category") === currentSubcategory
          : false;
        return isSamePath && hasMatchingCategory;
      } catch {
        return false;
      }
    });
    setSelectedCategory(matched?.id || null);
  }, [pathname, basePathname, searchParams, categories]);

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category?.id || null);

    if (category?.link) {
      router.push(category.link, { scroll: false });
    } else if (parentLink) {
      router.push(parentLink, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams);
      params.delete("category");
      router.push(`${basePathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Card className="relative z-10 shadow-lg border-gray-200">
      <CardContent className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-800">{t("categoryLabel")}</h2>
        </div>

        <div className="space-y-2">
          {/* All Categories Button */}
          <button
            onClick={() => handleCategoryChange(null)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              !selectedCategory
                ? "bg-primary/10 text-primary font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="flex-1 text-left text-sm">{t("allCategories")}</span>
            {!selectedCategory && <Check className="w-5 h-5 text-primary" />}
          </button>

          {/* Subcategories */}
          {categories.map((cat) => {
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="flex-1 text-left text-sm">{cat.name}</span>
                {selectedCategory === cat.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            );
          })}

          {/*
          /* TẠM THỜI ẨN CERTIFICATION - TODO: Uncomment khi cần hiển thị
          showCertification && (
            <button
              onClick={() => router.push("/certification")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeCertification
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5  rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className={`w-5 h-5 ${activeCertification ? "text-primary" : "text-gray-700"}`} />
              </div>
              <span className="flex-1 text-left text-sm">Chứng nhận, công nhận, chỉ định</span>
              {activeCertification && <Check className="w-5 h-5 text-primary" />}
            </button>
          )
          */}
        </div>
      </CardContent>
    </Card>
  );
}
