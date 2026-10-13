"use client";

import {
  CalendarClock,
  User,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";
import { mainInstance } from "@/api/mutator/custom-instance";

const CONSULTATION_TOPICS = [
  "Thẩm định giá tài sản",
  "Môi giới & đại lý BĐS",
  "Marketing & phát triển BĐS",
  "Quản lý vận hành tòa nhà",
  "Thiết kế & hoàn thiện nội thất",
  "Tư vấn M&A",
  "Khác",
];

const TIME_SLOTS = [
  "Sáng (8:00 - 12:00)",
  "Chiều (13:00 - 17:30)",
  "Tối (18:00 - 20:00)",
];

const INFO_CARDS = [
  {
    icon: User,
    title: "Thông tin người đăng ký",
    desc: "Họ tên, email, điện thoại, doanh nghiệp",
  },
  {
    icon: MessageSquare,
    title: "Nhu cầu tư vấn",
    desc: "Chọn lĩnh vực bạn cần tư vấn",
  },
  {
    icon: Clock,
    title: "Thời gian mong muốn",
    desc: "Ngày và khung giờ phù hợp",
  },
];

export default function BookingView() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    topic: CONSULTATION_TOPICS[0],
    preferredDate: "",
    preferredSlot: TIME_SLOTS[0],
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const descriptionParts = [
      `Họ tên: ${formData.name}`,
      `Email: ${formData.email}`,
      `Điện thoại: ${formData.phone}`,
      formData.company && `Doanh nghiệp: ${formData.company}`,
      formData.notes && `Ghi chú: ${formData.notes}`,
    ].filter(Boolean).join("\n");

    const slotTimeMap: Record<string, string> = {
      "Sáng (8:00 - 12:00)": "08:00:00",
      "Chiều (13:00 - 17:30)": "13:00:00",
      "Tối (18:00 - 20:00)": "18:00:00",
    };
    const scheduledAt = `${formData.preferredDate}T${slotTimeMap[formData.preferredSlot] || "08:00:00"}`;

    try {
      await mainInstance({
        url: "/api/v1.0/appointment/public",
        method: "POST",
        data: {
          title: formData.topic,
          description: descriptionParts,
          scheduled_at: scheduledAt,
          status: "PENDING",
        },
      });
      setSubmitted(true);
      toast.success({
        title: "Đăng ký thành công",
        content: "Chúng tôi sẽ liên hệ để xác nhận lịch tư vấn trong thời gian sớm nhất.",
      });
    } catch (error) {
      console.error("Booking submission error:", error);
      toast.error({
        title: "Đăng ký thất bại",
        content: "Có lỗi xảy ra, vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <CalendarClock className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">Đặt lịch tư vấn</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Đăng ký lịch tư vấn với Kepler
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cung cấp thông tin để chúng tôi chuẩn bị nội dung tư vấn phù hợp nhất
            với nhu cầu của bạn.
          </p>
        </div>

        {/* Info cards row */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {INFO_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
                <p className="text-gray-500 text-xs">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Đăng ký thành công!</h3>
              <p className="text-gray-600 max-w-md mb-8">
                Cảm ơn bạn đã đặt lịch tư vấn. Đội ngũ Kepler sẽ liên hệ xác nhận
                trong thời gian sớm nhất.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    topic: CONSULTATION_TOPICS[0],
                    preferredDate: "",
                    preferredSlot: TIME_SLOTS[0],
                    notes: "",
                  });
                }}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                Đăng ký lịch khác
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

              <div className="grid md:grid-cols-2 gap-5">
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
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">
                  Nhu cầu tư vấn <span className="text-red-500">*</span>
                </Label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-all"
                >
                  {CONSULTATION_TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700 font-medium">
                    Ngày mong muốn <span className="text-red-500">*</span>
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
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700 font-medium">
                    Khung giờ <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="preferredSlot"
                    value={formData.preferredSlot}
                    onChange={handleChange}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white hover:border-gray-400 transition-all"
                  >
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-gray-700 font-medium">Ghi chú</Label>
                <Textarea
                  name="notes"
                  rows={4}
                  placeholder="Mô tả ngắn gọn nội dung bạn muốn tư vấn..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
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
    </section>
  );
}
