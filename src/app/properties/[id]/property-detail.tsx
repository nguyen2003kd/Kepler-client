"use client";

import { SaleProperty, KEPLER_CONFIG } from "@/constants/kepler-data";
import { Bed, Bath, Maximize, Compass, FileCheck, MapPin, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PropertyGallery from "@/components/common/property-gallery";

interface Props {
  property: SaleProperty;
}

export default function PropertyDetail({ property }: Props) {
  const isRent = property.price.includes("/tháng");
  const images = property.images && property.images.length > 0
    ? property.images
    : [property.img];

  return (
    <div className="bg-white">
      {/* Gallery */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <PropertyGallery images={images} title={property.title} />
        </div>
      </section>

      {/* Breadcrumb & Title */}
      <section className="py-6">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href={isRent ? "/apartments-for-rent" : "/apartments-for-sale"} className="hover:text-primary transition-colors">
              {isRent ? "Cho thuê" : "Mua bán"}
            </Link>
            <span>/</span>
            <span className="text-gray-700">{property.type}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-xl">
              {isRent ? "Cho thuê" : "Bán"}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl">
              {property.type}
            </span>
          </div>

          <h1 className="text-[clamp(24px,3vw,36px)] font-bold text-gray-900 leading-tight mb-2">
            {property.title}
          </h1>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            <MapPin size={16} />
            {property.location}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-10">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main */}
          <div>
            <Link
              href={isRent ? "/apartments-for-rent" : "/apartments-for-sale"}
              className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Quay lại danh sách
            </Link>

            {/* Key specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {property.beds > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Bed size={24} className="mx-auto text-primary mb-2" />
                  <div className="text-gray-900 font-bold text-lg">{property.beds}</div>
                  <div className="text-gray-500 text-xs">Phòng ngủ</div>
                </div>
              )}
              {property.baths > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Bath size={24} className="mx-auto text-primary mb-2" />
                  <div className="text-gray-900 font-bold text-lg">{property.baths}</div>
                  <div className="text-gray-500 text-xs">Phòng tắm</div>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Maximize size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{property.area}</div>
                <div className="text-gray-500 text-xs">Diện tích</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Compass size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{property.direction}</div>
                <div className="text-gray-500 text-xs">Hướng</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Mô tả chi tiết</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {property.description}
              </p>
              <p className="text-gray-600 text-[15px] leading-relaxed mt-3">
                Vị trí: {property.location}. Pháp lý: {property.legal}. Đây là cơ hội đầu tư
                hấp dẫn với vị trí đắc địa, hạ tầng hoàn thiện, phù hợp cho cả nhu cầu ở thực
                và đầu tư dài hạn. Liên hệ ngay với Kepler Property để được tư vấn chi tiết và
                xem thực tế.
              </p>
            </div>

            {/* Legal info */}
            <div className="bg-gray-50 p-5 rounded-xl mb-8">
              <h3 className="text-gray-900 font-semibold text-sm mb-3 flex items-center gap-2">
                <FileCheck size={18} className="text-primary" />
                Thông tin pháp lý
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Pháp lý:</span>
                  <span className="ml-2 text-gray-900 font-medium">{property.legal}</span>
                </div>
                <div>
                  <span className="text-gray-500">Loại BĐS:</span>
                  <span className="ml-2 text-gray-900 font-medium">{property.type}</span>
                </div>
                <div>
                  <span className="text-gray-500">Khu vực:</span>
                  <span className="ml-2 text-gray-900 font-medium">{property.district}</span>
                </div>
                <div>
                  <span className="text-gray-500">Hướng:</span>
                  <span className="ml-2 text-gray-900 font-medium">{property.direction}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[100px] h-fit">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                {isRent ? "Giá cho thuê" : "Giá bán"}
              </div>
              <div className="text-gray-900 text-2xl font-bold mb-1">
                {property.price}
              </div>
              {property.beds > 0 && (
                <div className="text-gray-400 text-sm mb-4">
                  {property.beds} PN · {property.baths} PT · {property.area}
                </div>
              )}

              <a
                href={`tel:${KEPLER_CONFIG.hotlineTel}`}
                className="flex items-center justify-center gap-2 w-full min-h-[48px] bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors rounded-xl mb-3"
              >
                <Phone size={18} />
                {KEPLER_CONFIG.hotlineDisplay}
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full min-h-[48px] border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-colors rounded-xl"
              >
                Đăng ký tư vấn
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">Văn phòng</div>
                <p className="text-gray-600 text-sm">{KEPLER_CONFIG.address}</p>
                <p className="text-gray-500 text-sm mt-1">Email: {KEPLER_CONFIG.contactEmail}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
