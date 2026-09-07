"use client";

import { useGetApiV10Footer } from "@/api/endpoints/footer";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import { Footer as FooterType } from "@/api/models/footer";
import type { FooterLinksItem } from "@/api/models/footerLinksItem";
import { Logo } from "@/api/models/logo";
import { getResponsiveImage } from "@/lib/responsive-image";
import links from "@/lib/links";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "@/components/common/safe-image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface LogoWithFile extends Logo {
  file?: {
    path?: string;
    compress_info?: Record<string, string>;
    name?: string;
  };
}

const Footer = () => {
  const { i18n } = useTranslation();
  const { data } = useGetApiV10Footer({
    filters: "is_active==true",
  });

  const { data: logoData, isError: isLogoError } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  const currentLang = i18n.language?.split("-")[0] || "vi";
  const allRows = (data?.responseData?.rows || []) as FooterType[];
  const langMatch = allRows.find((r) => r.language === currentLang);
  const hasLinks = (r?: FooterType | null) => !!(r?.links && (r.links as FooterLinksItem[]).length > 0);
  const footerData = (hasLinks(langMatch) ? langMatch : allRows.find(hasLinks) || allRows[0] || null) as FooterType | null;
  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = isLogoError
    ? "/seo.png"
    : logoInfo?.file?.compress_info
      ? getResponsiveImage(logoInfo.file.compress_info)
      : logoInfo?.file?.path
        ? `${links.storageEndpoint}${logoInfo.file.path}`
        : "/seo.png";

  const addresses =
    footerData?.address && footerData.address.length > 0
      ? footerData.address
      : [
          {
            title: "Trụ sở chính",
            location:
              "Số 2 Nguyễn Văn Thủ, Phường Tân Định, Thành phố Hồ Chí Minh",
          },
        ];

  const socialLinks =
    (footerData?.social_links as Record<string, string> | null | undefined) ||
    {};

  return (
    <footer className="w-full bg-white text-foreground font-serif relative overflow-hidden border-t border-border">
      {/* Subtle  */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 lg:py-10 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-10">
          {/* Cột 1 - Logo + mô tả + liên hệ + mạng xã hội */}
          <div className="lg:col-span-3 space-y-4">
            <div className="w-[150px] h-[60px] relative">
              <Image
                src={logoUrl}
                alt={logoInfo?.name || "Kepler Property Logo"}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
            <div>
              <h6 className="text-sm font-bold mb-2 leading-relaxed text-foreground">
                {footerData?.description ||
                  "Kepler Property - Cập nhật tin đăng mua bán, cho thuê nhà đất, căn hộ, biệt thự, đất nền nhanh chóng và chính xác nhất"}
              </h6>
              {footerData?.sub_description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {footerData.sub_description}
                </p>
              )}

              {/* Slogan */}
              <p className="text-sm font-semibold text-primary mt-2 italic">
                Our Solutions – Your Success
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${footerData?.phone || "18001105"}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Điện thoại</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {footerData?.phone || "1800 1105"}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${footerData?.email || "keplerland@gmail.com"}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm font-medium break-all group-hover:text-primary transition-colors">
                    {footerData?.email || "casehcm@case.vn"}
                  </p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            {Object.keys(socialLinks).length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                  Kết nối với chúng tôi
                </p>
                <div className="grid grid-cols-4 gap-2.5 max-w-[210px]">
                  {socialLinks?.facebook && (
                    <Link
                      href={socialLinks.facebook as string}
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Facebook className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.instagram && (
                    <Link
                      href={socialLinks.instagram as string}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Instagram className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.twitter && (
                    <Link
                      href={socialLinks.twitter as string}
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-sky-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Twitter className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.linkedin && (
                    <Link
                      href={socialLinks.linkedin as string}
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-red-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.youtube && (
                    <Link
                      href={socialLinks.youtube as string}
                      aria-label="Youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-red-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Youtube className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.whatsapp && (
                    <Link
                      href={socialLinks.whatsapp as string}
                      aria-label="WhatsApp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-green-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Phone className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.zalo && (
                    <Link
                      href={socialLinks.zalo as string}
                      aria-label="Zalo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-primary/10 text-primary hover:bg-sky-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cột 2 - Về Kepler Property (menu nội bộ + địa chỉ) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              <h4 className="text-base font-bold">Về Kepler Property</h4>
            </div>

            {/* Menu nội bộ */}
            {(footerData?.internal_links ?? []).length > 0 && (
              <nav className="grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm mb-6">
                {(footerData?.internal_links ?? []).map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.link || "#"}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    {link.title}
                  </Link>
                ))}
              </nav>
            )}

            {/* Địa chỉ */}
            <div className="border-t border-border pt-4">
              <div className="flex flex-col gap-1.5">
                {addresses.map((addr, index) => (
                  <div key={index} className="text-sm group">
                    <p className="font-semibold mb-1.5 text-foreground group-hover:text-primary transition-colors">
                      {addr.title}
                    </p>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {addr.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột 3 - Thương hiệu thành viên */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              <h4 className="text-base font-bold">Thương hiệu thành viên</h4>
            </div>
            <nav className="grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm">
              {(footerData?.member_brands ?? []).map((brand, idx) => {
                const content = (
                  <>
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name || ""}
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    ) : (
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    )}
                    <span>{brand.name}</span>
                  </>
                );
                return brand.link ? (
                  <a
                    key={idx}
                    href={brand.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    {content}
                  </a>
                ) : (
                  <span
                    key={idx}
                    className="flex items-center gap-2 text-muted-foreground group"
                  >
                    {content}
                  </span>
                );
              })}
            </nav>
          </div>

          {/* Cột 4 - Liên kết web */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              <h4 className="text-base font-bold">Liên kết web</h4>
            </div>
            <nav className="grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm mb-6 max-w-xs">
              {(footerData?.links as FooterLinksItem[] | null | undefined)?.map(
                (link, idx) => (
                  <a
                    key={idx}
                    href={(link.link as string) || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    {link.title as string}
                  </a>
                )
              )}
              {(!footerData?.links || (footerData.links as FooterLinksItem[]).length === 0) && (
                <>
                  {/* TODO: Cập nhật liên kết web thực tế khi có dữ liệu */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    Trung tâm nghiên cứu xxx
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    Viện đào tạo xxx bất động sản
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    Cục quản lý giá – Bộ Tài Chính
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                    Liên đoàn lao động TPHCM
                  </a>
                </>
              )}
            </nav>

            {/**
            // Statistics block hidden per request (2026-09-04)
            // NOTE: when un-commenting, re-enable the useGetApiV10AnalyticsActiveUsers
            // import, the analyticsData hook, and the formatViews helper above.
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 space-y-3">
              <div className="text-center pb-2.5 border-b border-primary/10">
                <div className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Đang truy cập
                </div>
                <div className="text-3xl font-bold text-primary">
                  {analyticsData?.responseData?.activeUsers ?? footerData?.online_visitors ?? 888}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1.5 uppercase tracking-wider">
                  Tổng lượt xem
                </div>
                <div className="text-3xl font-bold text-primary">
                  {formatViews(analyticsData?.responseData?.totalPageViews ?? footerData?.total_views ?? "8888888")}
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>

      {/* Legal Links Bar */}
      <div className="bg-primary relative z-10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white">
          <Link href="/chinh-sach-bao-mat" className="hover:text-white/80 transition-colors">
            Chính sách bảo mật
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/dieu-khoan-su-dung" className="hover:text-white/80 transition-colors">
            Điều khoản sử dụng
          </Link>
          <span className="text-white/40">|</span>
          <Link href="/chinh-sach-cookie" className="hover:text-white/80 transition-colors">
            Chính sách Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
