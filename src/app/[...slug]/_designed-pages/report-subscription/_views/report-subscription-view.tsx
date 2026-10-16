"use client";

import {
  Mail,
  FileBarChart,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Briefcase,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";

const REPORT_GROUPS = [
  "Báo cáo thị trường BĐS",
  "Báo cáo phân tích ngành",
  "Báo cáo thẩm định giá",
  "Báo cáo M&A",
  "Báo cáo đầu tư",
  "Báo cáo nội bộ Kepler",
];

const REPORT_CARDS = [
  {
    icon: TrendingUp,
    title: "Thị trường BĐS",
    desc: "Phân tích xu hướng, giá cả, cung cầu",
  },
  {
    icon: BarChart3,
    title: "Phân tích ngành",
    desc: "Nghiên cứu chuyên sâu theo ngành nghề",
  },
  {
    icon: PieChart,
    title: "Thẩm định giá",
    desc: "Báo cáo định giá tài sản chi tiết",
  },
  {
    icon: Briefcase,
    title: "Đầu tư & M&A",
    desc: "Cơ hội đầu tư, giao dịch sáp nhập",
  },
];

export default function ReportSubscriptionView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    groups: [REPORT_GROUPS[0]] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleGroup = (group: string) => {
    setFormData((prev) => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter((g) => g !== group)
        : [...prev.groups, group],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success({
      title: "Đăng ký thành công",
      content: "Bạn sẽ nhận được báo cáo theo nhóm đã chọn qua email.",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <FileBarChart className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Đăng ký nhận báo cáo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nhận báo cáo phân tích từ Kepler
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đăng ký để nhận các báo cáo phân tích, nghiên cứu thị trường và tài
            liệu chuyên sâu từ Kepler Group.
          </p>
        </div>

        {/* Report category cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {REPORT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-red-200 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
                <p className="text-gray-500 text-xs leading-snug">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Form + side info */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
                  <p className="text-gray-600 max-w-md mb-8">
                    Cảm ơn bạn đã đăng ký. Báo cáo sẽ được gửi đến email của bạn
                    khi có bản phát hành mới.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        groups: [REPORT_GROUPS[0]],
                      });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
                  >
                    Đăng ký khác
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">
                      Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="name"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">Doanh nghiệp</Label>
                    <Input
                      name="company"
                      placeholder="Tên công ty (nếu có)"
                      value={formData.company}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  {/* Report groups - toggle chips */}
                  <div className="space-y-3">
                    <Label className="text-sm text-gray-700 font-medium">
                      Nhóm báo cáo quan tâm <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {REPORT_GROUPS.map((group) => {
                        const active = formData.groups.includes(group);
                        return (
                          <button
                            key={group}
                            type="button"
                            onClick={() => toggleGroup(group)}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                              active
                                ? "bg-red-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {active && <CheckCircle2 className="w-4 h-4" />}
                            {group}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={formData.groups.length === 0}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 group"
                    >
                      Đăng ký nhận báo cáo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Side info (2 cols) */}
          {!submitted && (
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#DC2626] to-[#7F1D1D] rounded-2xl p-8 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-400/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1">Lợi ích đăng ký</h3>
                  <p className="text-gray-300 text-sm mb-6">
                    Những quyền lợi khi nhận báo cáo từ Kepler
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Mail, title: "Gửi qua email", desc: "Nhận trực tiếp hộp thư của bạn" },
                      { icon: FileBarChart, title: "Cập nhật định kỳ", desc: "Khi có báo cáo mới nhất" },
                      { icon: TrendingUp, title: "Phân tích chuyên sâu", desc: "Nghiên cứu thị trường & ngành" },
                      { icon: CheckCircle2, title: "Hoàn toàn miễn phí", desc: "Không chi phí đăng ký" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-red-400" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{item.title}</div>
                            <div className="text-gray-300 text-xs">{item.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
