import { constructMetadata } from "@/lib/seo";
import { Award, TrendingUp, MapPin, Users } from "lucide-react";

export const metadata = constructMetadata({
  title: "Năng lực và thành tựu",
  description:
    "Số liệu năng lực, thành tựu, phạm vi hoạt động và nhóm khách hàng - dự án tiêu biểu của Kepler Group.",
  url: "/about/capabilities",
});

const stats = [
  { value: "1.000+", label: "Khách hàng doanh nghiệp" },
  { value: "500+", label: "Dự án hoàn thành" },
  { value: "50+", label: "Chuyên gia" },
  { value: "10+", label: "Năm kinh nghiệm" },
];

const achievements = [
  "Top thương hiệu uy tín trong lĩnh vực bất động sản và tư vấn doanh nghiệp.",
  "Đối tác chiến lược của nhiều tập đoàn và tổng công ty lớn.",
  "Hệ sinh thái dịch vụ toàn diện, đáp ứng đa dạng nhu cầu của khách hàng.",
  "Đội ngũ chuyên gia giàu kinh nghiệm, được thị trường công nhận.",
];

const clientGroups = [
  "Doanh nghiệp vừa và nhỏ (SME)",
  "Tập đoàn, tổng công ty",
  "Khách hàng cá nhân & nhà đầu tư",
  "Đối tác chiến lược & ngân hàng",
];

const scopes = [
  "Miền Bắc: Hà Nội, Hải Phòng, Quảng Ninh",
  "Miền Trung: Đà Nẵng, Nghệ An",
  "Miền Nam: TP.HCM, Bình Dương, Đồng Nai",
];

export default function CapabilitiesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Năng lực & Thành tựu
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Năng lực và thành tựu
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Những con số và dấu ấn khẳng định vị thế của Kepler Group trên thị
            trường.
          </p>
        </div>
      </section>

      {/* Số liệu năng lực */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-8"
              >
                <div className="text-4xl md:text-5xl font-black text-red-600 mb-2">
                  {s.value}
                </div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thành tựu */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Thành tựu</h2>
              </div>
              <ul className="space-y-4">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-2 w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Phạm vi hoạt động
                </h2>
              </div>
              <ul className="space-y-4">
                {scopes.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-gray-700">
                    <MapPin className="mt-1 h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nhóm khách hàng & dự án */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Nhóm khách hàng và dự án
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientGroups.map((c) => (
              <div
                key={c}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm"
              >
                <p className="text-gray-700 font-medium">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
