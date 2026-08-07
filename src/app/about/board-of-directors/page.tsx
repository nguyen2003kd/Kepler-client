import { constructMetadata } from "@/lib/seo";
import { Users } from "lucide-react";

export const metadata = constructMetadata({
  title: "Ban điều hành",
  description:
    "Danh sách thành viên Ban điều hành Kepler Group — ảnh, chức danh và thông tin tóm tắt.",
  url: "/about/board-of-directors",
});

const members = [
  {
    name: "Ông Nguyễn Văn A",
    position: "Chủ tịch HĐQT",
    bio: "Hơn 20 năm kinh nghiệm trong lĩnh vực bất động sản và đầu tư doanh nghiệp.",
  },
  {
    name: "Ông Trần Văn B",
    position: "Tổng Giám đốc",
    bio: "Chuyên gia quản trị chiến lược, dẫn dắt Kepler Group trong giai đoạn mở rộng hệ sinh thái.",
  },
  {
    name: "Bà Lê Thị C",
    position: "Phó TGĐ — Tài chính",
    bio: "Có chuyên môn sâu về tài chính doanh nghiệp và quản trị rủi ro.",
  },
  {
    name: "Ông Phạm Văn D",
    position: "Phó TGĐ — Kinh doanh",
    bio: "Dày dặn kinh nghiệm phát triển thị trường và xây dựng mạng lưới đối tác.",
  },
];

export default function BoardOfDirectorsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-10 w-10" />
            <span className="text-sm font-medium uppercase tracking-widest text-red-100">
              Đội ngũ lãnh đạo
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ban điều hành
          </h1>
          <p className="text-lg md:text-xl text-red-50 max-w-3xl leading-relaxed">
            Đội ngũ lãnh đạo dày dặn kinh nghiệm, dẫn dắt Kepler Group trên con
            đường phát triển bền vững.
          </p>
        </div>
      </section>

      {/* Danh sách thành viên */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((m) => (
              <div
                key={m.name}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Avatar placeholder */}
                <div className="aspect-[3/4] bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                  <span className="text-5xl font-black text-red-600/40">
                    {m.name
                      .split(" ")
                      .pop()
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {m.name}
                  </h3>
                  <p className="text-sm font-medium text-red-600 mb-3">
                    {m.position}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
