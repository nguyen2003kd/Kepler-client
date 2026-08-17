"use client";

import { useState, useMemo } from "react";
import { HelpCircle, Search } from "lucide-react";
import { FAQS } from "../kien-thuc/libs/mock-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SERVICE_GROUPS = [
  "Thẩm định giá",
  "Môi giới BĐS",
  "Quản lý vận hành",
  "Tư vấn M&A",
  "Marketing BĐS",
  "Nội thất",
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesSearch =
        !search ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesGroup = !activeGroup || faq.group === activeGroup;
      return matchesSearch && matchesGroup;
    });
  }, [search, activeGroup]);

  const groupedFAQs = useMemo(() => {
    const groups: Record<string, typeof FAQS> = {};
    filteredFAQs.forEach((faq) => {
      if (!groups[faq.group]) groups[faq.group] = [];
      groups[faq.group].push(faq);
    });
    return groups;
  }, [filteredFAQs]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">FAQ</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Câu hỏi thường gặp
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Tìm câu trả lời cho các câu hỏi về dịch vụ của Kepler Group,
            được phân nhóm theo từng lĩnh vực.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 pr-4 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Group filter */}
      <section className="py-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveGroup(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeGroup
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
            {SERVICE_GROUPS.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeGroup === group
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(groupedFAQs).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedFAQs).map(([group, faqs]) => (
                <div key={group}>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-red-100 text-red-700 border-0">{group}</Badge>
                    <span className="text-sm text-gray-400">{faqs.length} câu hỏi</span>
                  </div>
                  <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={`item-${faq.id}`}
                        className="border border-gray-200 rounded-xl px-5 data-[state=open]:border-red-200 data-[state=open]:shadow-sm transition-all"
                      >
                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5 text-sm md:text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-sm leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy câu hỏi phù hợp.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveGroup(null);
                }}
                className="mt-4 text-red-600 text-sm font-medium hover:underline"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
