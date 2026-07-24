"use client";

import { ProjectInfo, KEPLER_CONFIG } from "@/constants/kepler-data";
import { MapPin, Calendar, Building2, CheckCircle2, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PropertyGallery from "@/components/common/property-gallery";

interface Props {
  project: ProjectInfo;
}

export default function ProjectDetail({ project }: Props) {
  const images = project.images && project.images.length > 0
    ? project.images
    : [project.img];

  return (
    <div className="bg-white">
      {/* Gallery */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <PropertyGallery images={images} title={project.title} />
        </div>
      </section>

      {/* Breadcrumb & Title */}
      <section className="py-6">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-primary transition-colors">Dự án</Link>
            <span>/</span>
            <span className="text-gray-700">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-xl">
              {project.status}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl">
              {project.type}
            </span>
          </div>

          <h1 className="text-[clamp(26px,3vw,40px)] font-bold text-gray-900 leading-tight mb-2">
            {project.title}
          </h1>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            <MapPin size={16} />
            {project.location}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-10">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main */}
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Quay lại danh sách
            </Link>

            {/* Quick info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Building2 size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{project.scale}</div>
                <div className="text-gray-500 text-xs">Quy mô</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <MapPin size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{project.location.split(",")[0]}</div>
                <div className="text-gray-500 text-xs">Khu vực</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Calendar size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{project.handover}</div>
                <div className="text-gray-500 text-xs">Bàn giao</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center">
                <Building2 size={24} className="mx-auto text-primary mb-2" />
                <div className="text-gray-900 font-bold text-lg">{project.priceRange}</div>
                <div className="text-gray-500 text-xs">Khoảng giá</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Giới thiệu dự án</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-gray-900 font-semibold text-sm mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-primary" />
                Tiện ích dự án
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-[100px] h-fit">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                Khoảng giá
              </div>
              <div className="text-gray-900 text-2xl font-bold mb-4">
                {project.priceRange}
              </div>

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
