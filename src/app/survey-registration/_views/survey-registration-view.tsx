"use client";

import {
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

export default function SurveyRegistrationView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    assetInfo: "",
    address: "",
    preferredDate: "",
    contactName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success({
      title: "Đăng ký thành công",
      content: "Đội ngũ khảo sát sẽ liên hệ xác nhận lịch trong thời gian sớm nhất.",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - full width */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <Search className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Đăng ký khảo sát</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Đăng ký khảo sát tài sản
          </h1>
          <p className="text-gray-600">
            Đăng ký lịch khảo sát trực tiếp. Đội ngũ Kepler sẽ đến hiện trường
            để đánh giá và thu thập thông tin chi tiết.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
                  <p className="text-gray-600 max-w-md mb-8">
                    Cảm ơn bạn đã đăng ký khảo sát. Đội ngũ Kepler sẽ liên hệ xác
                    nhận lịch khảo sát trong thời gian sớm nhất.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        assetInfo: "",
                        address: "",
                        preferredDate: "",
                        contactName: "",
                        phone: "",
                        email: "",
                        notes: "",
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
                      Thông tin tài sản <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="assetInfo"
                      required
                      placeholder="Loại tài sản, quy mô, tình trạng..."
                      value={formData.assetInfo}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">
                      Địa chỉ khảo sát <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="address"
                      required
                      placeholder="Địa chỉ chi tiết tài sản cần khảo sát"
                      value={formData.address}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">
                      Thời gian đề xuất <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      name="preferredDate"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-700 font-medium">
                        Người liên hệ <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        name="contactName"
                        required
                        placeholder="Họ và tên người liên hệ"
                        value={formData.contactName}
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
                    <Label className="text-sm text-gray-700 font-medium">Email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700 font-medium">Ghi chú</Label>
                    <Textarea
                      name="notes"
                      rows={4}
                      placeholder="Yêu cầu đặc biệt, hướng dẫn tiếp cận hiện trường..."
                      value={formData.notes}
                      onChange={handleChange}
                      className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                    >
                      Gửi đăng ký
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Sidebar (1 col) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Steps */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-600" />
                  Quy trình khảo sát
                </h3>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Tiếp nhận đăng ký", desc: "Kepler nhận thông tin khảo sát" },
                    { step: "2", title: "Xác nhận lịch", desc: "Liên hệ chốt thời gian" },
                    { step: "3", title: "Khảo sát hiện trường", desc: "Đội ngũ đến địa điểm" },
                    { step: "4", title: "Báo cáo kết quả", desc: "Phản hồi thông tin chi tiết" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-red-600 text-sm font-bold">
                        {s.step}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900 text-sm font-medium">{s.title}</div>
                        <div className="text-gray-500 text-xs">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 p-6">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Lưu ý</h4>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Đội ngũ khảo sát Kepler sẽ đến hiện trường để đánh giá và thu
                  thập thông tin chi tiết về tài sản. Vui lòng đảm bảo người liên
                  hệ có mặt tại thời gian đã chốt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
