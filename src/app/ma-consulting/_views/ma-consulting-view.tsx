"use client";

import {
  Handshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

const ROLES = ["Bên mua", "Bên bán", "Chưa xác định"];

export default function MaConsultingView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: ROLES[0],
    enterprise: "",
    project: "",
    description: "",
    attachment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success({
      title: "Gửi yêu cầu thành công",
      content: "Chuyên gia M&A sẽ liên hệ trao đổi chi tiết trong thời gian sớm nhất.",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <Handshake className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Tư vấn M&A</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Đăng ký tư vấn sáp nhập & mua lại
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kepler đồng hành từ phân tích chiến lược, định giá, đàm phán đến
            hoàn tất giao dịch M&A.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Yêu cầu đã được gửi!</h3>
              <p className="text-gray-600 max-w-md mb-8">
                Cảm ơn bạn đã đăng ký tư vấn M&A. Chuyên gia Kepler sẽ liên hệ
                trao đổi chi tiết trong thời gian sớm nhất.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    role: ROLES[0],
                    enterprise: "",
                    project: "",
                    description: "",
                    attachment: "",
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                Gửi yêu cầu khác
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role selector - pill buttons */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">
                  Vai trò của bạn <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-wrap gap-3">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, role: r }))}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        formData.role === r
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
                    Điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    required
                    placeholder="0901 234 567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>
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

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700 font-medium">Doanh nghiệp</Label>
                  <Input
                    name="enterprise"
                    placeholder="Tên doanh nghiệp"
                    value={formData.enterprise}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700 font-medium">Dự án</Label>
                  <Input
                    name="project"
                    placeholder="Tên dự án (nếu có)"
                    value={formData.project}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">Mô tả nhu cầu</Label>
                <Textarea
                  name="description"
                  rows={4}
                  placeholder="Mô tả chi tiết nhu cầu M&A, quy mô, ngành nghề..."
                  value={formData.description}
                  onChange={handleChange}
                  className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">File đính kèm</Label>
                <Input
                  name="attachment"
                  type="file"
                  onChange={handleChange}
                  className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                <p className="text-xs text-gray-500">
                  Hồ sơ, tài liệu liên quan (PDF, DOC, XLS, JPG, PNG — tối đa 10MB)
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                >
                  Gửi yêu cầu
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
