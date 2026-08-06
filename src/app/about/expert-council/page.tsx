import { constructMetadata } from "@/lib/seo";
import { UserCheck } from "lucide-react";

export const metadata = constructMetadata({
  title: "Hội đồng chuyên gia",
  description:
    "Danh sách chuyên gia của Kepler Group — lĩnh vực chuyên môn và hồ sơ chuyên gia liên quan.",
  url: "/about/expert-council",
});

const experts = [
  {
    name: "TS. Nguyễn Văn X",
    field: "Bất động sản",
    bio: "Chuyên gia định giá và đầu tư bất động sản với hơn 15 năm kinh nghiệm.",
  },
  {
    name: "TS. Trần Thị Y",
    field: "Tài chính - Ngân hàng",
    bio: "Tư vấn tài chính doanh nghiệp và cấu trúc vốn cho các dự án quy mô lớn.",
  },
  {
    name: "LS. Lê Văn Z",
    field: "Pháp lý",
    bio: "Luật sư chuyên ngành đất đai và doanh nghiệp, tư vấn pháp lý cho nhiều dự án.",
  },
  {
    name: "TS. Phạm Thị W",
    field: "Chuyển đổi số",
    bio: "Chuyên gia chuyển đổi số và ứng dụng công nghệ trong vận hành doanh nghiệp.",
  },
  {
    name: "PGS. Hoàng Văn V",
    field: "Giáo dục & Đào tạo",
    bio: "Nghiên cứu và phát triển chương trình đào tạo nghiệp vụ chất lượng cao.",
  },
  {
    name: "TS. Đỗ Thị U",
    field: "Quản trị rủi ro",
    bio: "Tư vấn quản trị rủi ro và tuân thủ cho doanh nghiệp hoạt động đa ngành.",
  },
];

export default function ExpertCouncilPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Chuyên gia tin cậy
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Hội đồng chuyên gia
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Hội đồng chuyên gia của Kepler Group quy tụ những chuyên gia hàng
            đầu trong nhiều lĩnh vực, đóng góp tri thức và kinh nghiệm vào mọi
            giải pháp dành cho khách hàng.
          </p>
        </div>
      </section>

      {/* Danh sách chuyên gia */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((e) => (
              <div
                key={e.name}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-black text-red-600/60">
                      {e.name
                        .split(" ")
                        .pop()
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {e.name}
                    </h3>
                    <span className="inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700">
                      {e.field}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{e.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
