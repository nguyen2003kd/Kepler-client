"use client";

import { usePostApiV10Contact } from "@/api/endpoints/contact";
import { Contact } from "@/api/models/contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";
import { usePageConfigByKey } from "@/lib/page-config-helpers";
import {
  Calendar,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddressItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  hotline?: string;
}

export interface ContactFormConfig {
  type: string;
  title: string;
  subtitle: string;
  showSubject?: boolean;
  showPreferredDate?: boolean;
  showPropertyInfo?: boolean;
  showOrganization?: boolean;
  contentLabel: string;
  contentPlaceholder: string;
}

const FORM_CONFIGS: Record<string, ContactFormConfig> = {
  "lien-he-kepler": {
    type: "lien-he-kepler",
    title: "Liên hệ Kepler",
    subtitle: "Gửi tin nhắn cho chúng tôi, chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
    contentLabel: "Nội dung",
    contentPlaceholder: "Nhập nội dung tin nhắn của bạn...",
  },
  "lien-he-hop-tac": {
    type: "lien-he-hop-tac",
    title: "Liên hệ hợp tác",
    subtitle: "Hợp tác kinh doanh, phân phối, chiến lược cùng Kepler Group.",
    showOrganization: true,
    contentLabel: "Nội dung hợp tác",
    contentPlaceholder: "Mô tả ngắn gọn về cơ hội hợp tác...",
  },
  "yeu-cau-ban-cho-thue": {
    type: "yeu-cau-ban-cho-thue",
    title: "Yêu cầu bán/cho thuê BĐS",
    subtitle: "Để lại thông tin BĐS, chuyên viên Kepler sẽ liên hệ tư vấn.",
    showPropertyInfo: true,
    contentLabel: "Thông tin BĐS",
    contentPlaceholder: "Địa chỉ, loại BĐS, diện tích, giá mong muốn...",
  },
  "yeu-cau-tham-dinh-gia": {
    type: "yeu-cau-tham-dinh-gia",
    title: "Yêu cầu thẩm định giá",
    subtitle: "Yêu cầu dịch vụ thẩm định giá BĐS, máy móc, doanh nghiệp.",
    showOrganization: true,
    contentLabel: "Mô tả tài sản cần thẩm định",
    contentPlaceholder: "Loại tài sản, mục đích thẩm định, thời gian mong muốn...",
  },
  "yeu-cau-dich-vu": {
    type: "yeu-cau-dich-vu",
    title: "Yêu cầu dịch vụ BĐS",
    subtitle: "Tư vấn mua, bán, cho thuê, đầu tư, khai thác BĐS.",
    showSubject: true,
    contentLabel: "Chi tiết yêu cầu",
    contentPlaceholder: "Mô tả chi tiết dịch vụ bạn cần...",
  },
  "tu-van-thuong-vu-ma": {
    type: "tu-van-thuong-vu-ma",
    title: "Tư vấn thương vụ M&A",
    subtitle: "Tư vấn M&A, tái cấu trúc, tìm đối tác đầu tư.",
    showOrganization: true,
    contentLabel: "Mô tả thương vụ",
    contentPlaceholder: "Loại giao dịch, quy mô, ngành nghề, thời gian...",
  },
  "dat-lich-hen-chuyen-gia": {
    type: "dat-lich-hen-chuyen-gia",
    title: "Đặt lịch hẹn chuyên gia",
    subtitle: "Đặt lịch tư vấn trực tiếp với chuyên gia Kepler.",
    showPreferredDate: true,
    contentLabel: "Nội dung cần tư vấn",
    contentPlaceholder: "Chủ đề bạn muốn tư vấn...",
  },
};

interface DynamicContactFormProps {
  formType: string;
}

export default function DynamicContactForm({ formType }: DynamicContactFormProps) {
  const { t, ready, i18n } = useTranslation("pages/contact");
  const [mounted, setMounted] = useState(false);

  const contactKey = i18n.language?.startsWith("en") ? "CONTACT_EN" : "CONTACT";
  const { data: pageConfigData } = usePageConfigByKey(contactKey);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = FORM_CONFIGS[formType] || FORM_CONFIGS["lien-he-kepler"];

  const fallbackAddresses: AddressItem[] = [
    {
      id: 1,
      name: "Trụ sở chính — TP.HCM",
      address: "Tòa nhà Kepler, Quận 1, TP. Hồ Chí Minh",
      phone: "028 0000 000",
      hotline: "1900 0000",
      email: "contact@keplergroup.vn",
    },
    {
      id: 2,
      name: "Văn phòng Hà Nội",
      address: "Kepler Hanoi, Quận Cầu Giấy, TP. Hà Nội",
      phone: "024 0000 000",
      email: "hanoi@keplergroup.vn",
    },
    {
      id: 3,
      name: "Văn phòng Đà Nẵng",
      address: "Kepler Da Nang, Quận Hải Châu, TP. Đà Nẵng",
      phone: "0236 0000 000",
    },
    {
      id: 4,
      name: "Văn phòng Cần Thơ",
      address: "Kepler Can Tho, Quận Ninh Kiều, TP. Cần Thơ",
      phone: "0292 0000 000",
    },
  ];

  const configValue = pageConfigData?.responseData?.rows?.[0]?.value;
  let addresses: AddressItem[] = fallbackAddresses;
  if (configValue && typeof configValue === "string") {
    try {
      const parsed = JSON.parse(configValue);
      if (parsed && parsed.locations && Array.isArray(parsed.locations)) {
        addresses = parsed.locations;
      } else if (Array.isArray(parsed)) {
        addresses = parsed;
      }
    } catch {
      addresses = fallbackAddresses;
    }
  }

  const { mutate: submitContact, isPending } = usePostApiV10Contact({
    mutation: {
      onSuccess: () => {
        toast.success({ title: t("success"), content: t("successMessage") });
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          content: "",
          subject: "",
          preferred_date: "",
          property_info: "",
          organization_name: "",
        });
      },
      onError: (error) => {
        toast.error({ title: t("error"), content: t("errorMessage") });
        console.error("Contact submission error:", error);
      },
    },
  });

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone_number: string;
    content: string;
    subject: string;
    preferred_date: string;
    property_info: string;
    organization_name: string;
  }>({
    name: "",
    email: "",
    phone_number: "",
    content: "",
    subject: "",
    preferred_date: "",
    property_info: "",
    organization_name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullContent = [
      formData.subject && `Chủ đề: ${formData.subject}`,
      formData.property_info && `Thông tin BĐS: ${formData.property_info}`,
      formData.preferred_date && `Ngày hẹn mong muốn: ${formData.preferred_date}`,
      formData.organization_name && `Tổ chức: ${formData.organization_name}`,
      formData.content,
    ].filter(Boolean).join("\n");

    const payload: Omit<Contact, "id" | "created_at"> = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phone_number,
      content: fullContent,
      type: config.type,
    };
    submitContact({ data: payload });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone_number") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!mounted || !ready) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl overflow-hidden border-0 rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Form Side */}
            <div className="p-8 lg:p-12 bg-white">
              <div className="mb-8 border-b border-red-100 pb-6">
                <div className="flex gap-3 mb-2">
                  <div className="px-3.5 py-2.5 bg-red-100 rounded-lg flex items-center">
                    <Mail className="w-7 h-7 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-red-600 mb-1">
                      {config.title}
                    </h2>
                    <p className="text-sm text-gray-600">{config.subtitle}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    {t("name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    {t("phone")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone_number"
                    type="tel"
                    required
                    placeholder={t("phonePlaceholder")}
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                {/* Organization (conditional) */}
                {config.showOrganization && (
                  <div className="space-y-2">
                    <Label htmlFor="organization_name" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600" />
                      Tổ chức / Công ty
                    </Label>
                    <Input
                      id="organization_name"
                      name="organization_name"
                      type="text"
                      placeholder="Tên công ty hoặc tổ chức..."
                      value={formData.organization_name}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                )}

                {/* Subject (conditional) */}
                {config.showSubject && (
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                      Chủ đề
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Chủ đề yêu cầu..."
                      value={formData.subject}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                )}

                {/* Property Info (conditional) */}
                {config.showPropertyInfo && (
                  <div className="space-y-2">
                    <Label htmlFor="property_info" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      Thông tin BĐS
                    </Label>
                    <Input
                      id="property_info"
                      name="property_info"
                      type="text"
                      placeholder="Địa chỉ, loại BĐS, diện tích..."
                      value={formData.property_info}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                )}

                {/* Preferred Date (conditional) */}
                {config.showPreferredDate && (
                  <div className="space-y-2">
                    <Label htmlFor="preferred_date" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      Ngày hẹn mong muốn
                    </Label>
                    <Input
                      id="preferred_date"
                      name="preferred_date"
                      type="date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    {config.contentLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    required
                    placeholder={config.contentPlaceholder}
                    value={formData.content}
                    onChange={handleChange}
                    rows={4}
                    className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-lg h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isPending ? t("sending") : t("submit")}
                  </Button>
                </div>
              </form>
            </div>

            {/* Address List Side */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#DC2626] to-[#991B1B] p-8 lg:p-10">
              <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-red-300/10 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium">
                      {t("branchesOffices")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {t("contactInfo")}
                  </h3>
                  <div className="mt-3 h-px bg-gradient-to-r from-white/50 via-white/15 to-transparent" />
                </div>

                {/* Address cards */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1 -mr-1">
                  {/* HQ - Featured card */}
                  {addresses[0] && (
                    <div className="group rounded-xl bg-white/95 hover:bg-white transition-all duration-300 p-5 shadow-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 ring-1 ring-red-100">
                          <MapPin className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-[15px] tracking-tight">
                          {addresses[0].name}
                        </h4>
                        <span className="ml-auto text-[9px] uppercase tracking-wider text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">
                          HQ
                        </span>
                      </div>
                      <div className="space-y-2 pl-10">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600 text-[13px] leading-relaxed">{addresses[0].address}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <a href={`tel:${addresses[0].phone.replace(/[^\d]/g, "")}`} className="text-gray-700 hover:text-red-600 transition-colors text-[13px]">
                            {addresses[0].phone}
                          </a>
                        </div>
                        {addresses[0].hotline && (
                          <div className="flex items-center gap-2.5">
                            <Headphones className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-400 text-[13px]">{t("hotline")}</span>
                            <a href={`tel:${addresses[0].hotline.replace(/[^\d]/g, "")}`} className="text-red-600 hover:text-red-700 transition-colors font-semibold text-[13px]">
                              {addresses[0].hotline}
                            </a>
                          </div>
                        )}
                        {addresses[0].email && (
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <a href={`mailto:${addresses[0].email}`} className="text-gray-700 hover:text-red-600 transition-colors text-[13px]">
                              {addresses[0].email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Branch offices grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.slice(1, 5).map((addr) => (
                      <div
                        key={addr.id}
                        className="group rounded-xl bg-white/90 hover:bg-white transition-all duration-300 p-4 h-full shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 ring-1 ring-red-100">
                            <MapPin className="w-3 h-3 text-red-500" />
                          </div>
                          <h4 className="font-medium text-gray-800 text-[13px] tracking-tight">
                            {addr.name}
                          </h4>
                        </div>
                        <div className="space-y-1.5 pl-8">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-500 text-[11px] leading-relaxed">{addr.address}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-gray-300 flex-shrink-0" />
                            <a href={`tel:${addr.phone.replace(/[^\d]/g, "")}`} className="text-gray-600 hover:text-red-600 transition-colors text-[11px]">
                              {addr.phone}
                            </a>
                          </div>
                          {addr.hotline && (
                            <div className="flex items-center gap-2">
                              <Headphones className="w-3 h-3 text-gray-300 flex-shrink-0" />
                              <a href={`tel:${addr.hotline.replace(/[^\d]/g, "")}`} className="text-red-600 hover:text-red-700 transition-colors font-medium text-[11px]">
                                {addr.hotline}
                              </a>
                            </div>
                          )}
                          {addr.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-300 flex-shrink-0" />
                              <a href={`mailto:${addr.email}`} className="text-gray-600 hover:text-red-600 transition-colors text-[11px]">
                                {addr.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Extra address (5th index+) */}
                  {addresses[5] && (
                    <div className="group rounded-xl bg-white/90 hover:bg-white transition-all duration-300 p-4 shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-50 ring-1 ring-red-100">
                          <MapPin className="w-3 h-3 text-red-500" />
                        </div>
                        <h4 className="font-medium text-gray-800 text-[13px] tracking-tight">
                          {addresses[5].name}
                        </h4>
                      </div>
                      <div className="space-y-1.5 pl-8">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-500 text-[11px] leading-relaxed">{addresses[5].address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-gray-300 flex-shrink-0" />
                          <a href={`tel:${addresses[5].phone.replace(/[^\d]/g, "")}`} className="text-gray-600 hover:text-red-600 transition-colors text-[11px]">
                            {addresses[5].phone}
                          </a>
                        </div>
                        {addresses[5].hotline && (
                          <div className="flex items-center gap-2">
                            <Headphones className="w-3 h-3 text-gray-300 flex-shrink-0" />
                            <a href={`tel:${addresses[5].hotline.replace(/[^\d]/g, "")}`} className="text-red-600 hover:text-red-700 transition-colors font-medium text-[11px]">
                              {addresses[5].hotline}
                            </a>
                          </div>
                        )}
                        {addresses[5].email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-gray-300 flex-shrink-0" />
                            <a href={`mailto:${addresses[5].email}`} className="text-gray-600 hover:text-red-600 transition-colors text-[11px]">
                              {addresses[5].email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom hotline CTA */}
                {addresses[0]?.hotline && (
                  <div className="mt-5 pt-4 border-t border-white/15">
                    <a
                      href={`tel:${addresses[0].hotline.replace(/[^\d]/g, "")}`}
                      className="group flex items-center justify-between rounded-xl bg-white hover:bg-gray-50 px-5 py-3.5 shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 ring-1 ring-red-100 group-hover:scale-105 transition-transform duration-300">
                          <Headphones className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium">
                            {t("hotline")}
                          </p>
                          <p className="text-red-600 font-bold text-[15px] tracking-tight">
                            {addresses[0].hotline}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-50 group-hover:translate-x-0.5 transition-all duration-300">
                        <Phone className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
