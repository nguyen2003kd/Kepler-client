"use client";

import {
  ClipboardCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

const ASSET_TYPES = [
  "Bất động sản",
  "Máy móc & thiết bị",
  "Phương tiện vận tải",
  "Hàng tồn kho",
  "Tài sản vô hình",
  "Tài sản khác",
];

const PURPOSES = [
  "Bán / thanh lý",
  "Mua / sáp nhập",
  "Vay vốn ngân hàng",
  "Báo cáo tài chính",
  "Giải quyết tranh chấp",
  "Khác",
];

export default function AppraisalRequestView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assetType: ASSET_TYPES[0],
    purpose: PURPOSES[0],
    location: "",
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
      content: "Chuyên gia thẩm định sẽ liên hệ trong thời gian sớm nhất.",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <ClipboardCheck className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Yêu cầu thẩm định</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Gửi yêu cầu thẩm định tài sản
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cung cấp thông tin chi tiết về tài sản cần thẩm định. Đội ngũ chuyên
            gia Kepler sẽ tiếp nhận và phản hồi nhanh chóng.
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
                Cảm ơn bạn đã gửi yêu cầu thẩm định. Chuyên gia Kepler sẽ liên hệ
                để xác nhận và hướng dẫn các bước tiếp theo.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    assetType: ASSET_TYPES[0],
                    purpose: PURPOSES[0],
                    location: "",
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
                  <Label className="text-sm text-gray-700 font-medium">
                    Loại tài sản <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="assetType"
                    value={formData.assetType}
                    onChange={handleChange}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-all"
                  >
                    {ASSET_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700 font-medium">
                    Mục đích thẩm định <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-all"
                  >
                    {PURPOSES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">
                  Địa điểm tài sản <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="location"
                  required
                  placeholder="Địa chỉ tài sản cần thẩm định"
                  value={formData.location}
                  onChange={handleChange}
                  className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">Mô tả chi tiết</Label>
                <Textarea
                  name="description"
                  rows={4}
                  placeholder="Mô tả chi tiết tài sản, tình trạng, đặc điểm nổi bật..."
                  value={formData.description}
                  onChange={handleChange}
                  className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">Hồ sơ đính kèm</Label>
                <Input
                  name="attachment"
                  type="file"
                  onChange={handleChange}
                  className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
                <p className="text-xs text-gray-500">
                  Hồ sơ đính kèm: PDF, DOC, XLS, JPG, PNG (tối đa 10MB)
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
