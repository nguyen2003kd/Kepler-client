import { constructMetadata } from "@/lib/seo";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  FileCheck2,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import AboutHero from "../components/about-hero";
import AboutPageContent from "../components/about-page-content";

export const metadata = constructMetadata({
  title: "Chứng chỉ - Giấy phép",
  description:
    "Chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép công bố.",
  url: "/about/certifications",
});

type DocumentItem = {
  title: string;
  code: string;
  description: string;
  date: string;
};

const certifications: DocumentItem[] = [
  {
    title: "Giấy chứng nhận đăng ký doanh nghiệp",
    code: "GP-2025-001",
    description:
      "Chứng nhận đăng ký kinh doanh do Sở Kế hoạch và Đầu tư cấp.",
    date: "10/01/2025",
  },
  {
    title: "Chứng chỉ ISO 9001:2015",
    code: "ISO-9001-2025",
    description:
      "Chứng nhận hệ thống quản lý chất lượng theo tiêu chuẩn quốc tế.",
    date: "20/03/2025",
  },
  {
    title: "Giấy phép hoạt động môi giới bất động sản",
    code: "GPL-MG-2025",
    description:
      "Giấy phép do Sở Xây dựng cấp, đủ điều kiện hoạt động môi giới BĐS.",
    date: "05/02/2025",
  },
];

const licenses: DocumentItem[] = [
  {
    title: "Giấy phép kinh doanh dịch vụ tư vấn",
    code: "GP-TV-2025",
    description: "Đủ điều kiện cung cấp dịch vụ tư vấn doanh nghiệp.",
    date: "18/04/2025",
  },
  {
    title: "Giấy chứng nhận đủ điều kiện đào tạo",
    code: "GP-ĐT-2025",
    description: "Cơ sở đào tạo đủ điều kiện theo quy định của Bộ GD&ĐT.",
    date: "12/06/2025",
  },
];

function DocumentCard({
  doc,
  Icon,
}: {
  doc: DocumentItem;
  Icon: LucideIcon;
}) {
  return (
    <div className="group relative h-full bg-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Còn hiệu lực
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{doc.description}</p>
      <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Mã số
          </div>
          <div className="inline-block font-mono text-sm text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg">
            {doc.code}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
            Ngày cấp
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900">
            <CalendarDays className="h-4 w-4 text-red-600" />
            {doc.date}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  return (
    <div className="bg-white">
      <AboutHero
        icon={<ShieldCheck className="h-6 w-6 text-red-400" />}
        eyebrow="Minh bạch & Uy tín"
        title="Chứng chỉ - Giấy phép"
        description="Các chứng chỉ, giấy phép và tài liệu pháp lý được Kepler Group phép công bố, khẳng định sự tuân thủ và uy tín trong hoạt động kinh doanh."
        image="/seo.png"
      />

      <AboutPageContent
        pageKeyVi="about-certifications"
        pageKeyEn="about-certifications_en"
        fallback={
          <>
            {/* Quality pledge */}
            <section className="relative overflow-hidden bg-white py-24 md:py-32">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                      Cam kết chất lượng
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
                    Hoạt động trên nền tảng pháp lý vững chắc
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Kepler Group công khai chứng chỉ, giấy phép và tài liệu
                    pháp lý, khẳng định sự tuân thủ và uy tín trong từng giao
                    dịch.
                  </p>
                </FadeIn>
              </div>
            </section>

            {/* Certifications & licenses grid */}
            <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[length:48px_48px]" />
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn className="max-w-2xl mb-16">
                  <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
                    Hồ sơ pháp lý
                  </span>
                  <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                    Chứng chỉ & Giấy phép
                  </h2>
                  <div className="mt-6 h-1 w-20 rounded-full bg-red-500" />
                  <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                    Các văn bản xác nhận tư cách pháp lý và năng lực hoạt động
                    của Kepler Group.
                  </p>
                </FadeIn>

                <div className="space-y-16">
                  <div>
                    <FadeIn className="mb-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 font-semibold">
                        <BadgeCheck className="h-5 w-5" />
                        Chứng chỉ
                      </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-6">
                      {certifications.map((c, idx) => (
                        <FadeIn key={c.code} delay={idx * 0.08}>
                          <DocumentCard doc={c} Icon={FileCheck2} />
                        </FadeIn>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FadeIn className="mb-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 font-semibold">
                        <ScrollText className="h-5 w-5" />
                        Giấy phép
                      </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-2 gap-6">
                      {licenses.map((l, idx) => (
                        <FadeIn key={l.code} delay={idx * 0.08}>
                          <DocumentCard doc={l} Icon={ScrollText} />
                        </FadeIn>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal disclosure CTA */}
            <section className="py-20 md:py-28 bg-white">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                <FadeIn>
                  <div className="relative rounded-3xl bg-gray-900 p-10 md:p-16 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_60%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:40px_40px]" />
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    <div className="relative grid md:grid-cols-2 gap-10 items-center">
                      <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Minh bạch pháp lý
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                          Tài liệu pháp lý được phép công bố
                        </h2>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
                          Kepler Group cam kết minh bạch trong hoạt động kinh
                          doanh. Các tài liệu pháp lý được phép công bố sẽ được
                          cập nhật tại đây để khách hàng và đối tác tham khảo.
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                          <CheckCircle2 className="h-6 w-6 text-red-400 shrink-0" />
                          <div>
                            <h4 className="font-semibold text-white">
                              Công khai & cập nhật
                            </h4>
                            <p className="text-sm text-gray-400">
                              Thông tin được kiểm tra và bổ sung định kỳ.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                          <CheckCircle2 className="h-6 w-6 text-red-400 shrink-0" />
                          <div>
                            <h4 className="font-semibold text-white">
                              Tuân thủ quy định
                            </h4>
                            <p className="text-sm text-gray-400">
                              Đảm bảo đầy đủ điều kiện theo pháp luật hiện
                              hành.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
}
