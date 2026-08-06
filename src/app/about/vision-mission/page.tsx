import { constructMetadata } from "@/lib/seo";
import { Target, Compass, Gem } from "lucide-react";

export const metadata = constructMetadata({
  title: "Tầm nhìn - Sứ mệnh - Giá trị cốt lõi",
  description:
    "Tầm nhìn, sứ mệnh và các giá trị cốt lõi định hướng mọi hoạt động của Kepler Group.",
  url: "/about/vision-mission",
});

const coreValues = [
  {
    icon: Gem,
    title: "Chất lượng",
    description:
      "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, đáp ứng và vượt kỳ vọng của khách hàng.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Compass,
    title: "Chính trực",
    description:
      "Thượng tôn pháp luật, minh bạch và trách nhiệm trong mọi hoạt động kinh doanh.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Target,
    title: "Đổi mới",
    description:
      "Không ngừng sáng tạo, ứng dụng công nghệ để mang lại giải pháp tối ưu cho khách hàng.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Compass,
    title: "Đồng hành",
    description:
      "Luôn sát cánh cùng khách hàng và đối tác trong mọi giai đoạn phát triển.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function VisionMissionPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-medium uppercase tracking-widest text-red-100">
            Định hướng phát triển
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-black tracking-tight mb-6">
            Tầm nhìn - Sứ mệnh - Giá trị cốt lõi
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Những định hướng và niềm tin dẫn lối cho mọi hoạt động của Kepler
            Group trên hành trình kiến tạo giá trị bền vững.
          </p>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Tầm nhìn</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trở thành một trong những tập đoàn đa ngành hàng đầu Việt Nam,
                sở hữu hệ sinh thái sản phẩm - dịch vụ toàn diện, đồng hành cùng
                doanh nghiệp và cá nhân trên con đường phát triển bền vững.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Sứ mệnh</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Xây dựng một hệ sinh thái hỗ trợ toàn diện cho doanh nghiệp và
                cá nhân, giúp họ phát triển bền vững, cạnh tranh hiệu quả và vươn
                tầm trong nền kinh tế số.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Giá trị cốt lõi
            </h2>
            <p className="text-gray-600">
              Những giá trị định hướng mọi hoạt động của Kepler Group
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-14 h-14 ${value.bg} rounded-2xl flex items-center justify-center mb-5`}
                  >
                    <Icon className={`h-7 w-7 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
