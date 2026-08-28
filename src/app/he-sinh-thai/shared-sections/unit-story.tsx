"use client";

import { motion } from "framer-motion";
import { useEcosystemUnits } from "../use-ecosystem-units";

const stories: Record<string, { label: string; title: string; copy: string; stat: string; statLabel: string }> = {
  "kpc-appraisal": {
    label: "Thẩm định giá & Tư vấn giá trị",
    title: "Một quyết định tốt bắt đầu từ một giá trị đúng.",
    copy: "KAC tập trung xây dựng năng lực chuyên sâu về thẩm định giá, phân tích thị trường và tư vấn giá trị, phục vụ cả mục đích pháp lý, tài chính và đầu tư. KAC kết hợp phương pháp thẩm định chuyên nghiệp với dữ liệu thị trường và phân tích đầu tư để hỗ trợ khách hàng ra quyết định tài chính, đầu tư và giao dịch.",
    stat: "100%",
    statLabel: "Độc lập & khách quan",
  },
  "kmc-management": {
    label: "Quản lý BĐS & Tài sản",
    title: "Tài sản tốt hơn mỗi ngày.",
    copy: "KMC cung cấp giải pháp quản lý bất động sản theo vòng đời tài sản, hướng tới chuyển tài sản từ trạng thái 'đang sở hữu' thành 'đang tạo ra giá trị'. KMC kết hợp quản lý vận hành, kỹ thuật, tài chính, khách thuê, cho thuê và quản trị tài sản nhằm nâng cao hiệu suất vận hành, dòng tiền và giá trị tài sản.",
    stat: "24/7",
    statLabel: "Giám sát liên tục",
  },
  "kac-advisory": {
    label: "M&A & Tư vấn BĐS doanh nghiệp",
    title: "Biến chiến lược thành giá trị có thể đo lường.",
    copy: "KMAC là đơn vị chuyên trách các giao dịch bất động sản có cấu trúc phức tạp, tập trung vào việc tạo lập và thực hiện các thương vụ có giá trị. KMAC hỗ trợ toàn bộ quá trình từ tìm kiếm cơ hội, định giá, phân tích thương vụ, thẩm định chi tiết, đàm phán đến hoàn tất giao dịch.",
    stat: "500+",
    statLabel: "Giao dịch tư vấn",
  },
  "k-homes": {
    label: "Thiết kế – Xây dựng – Quản lý thi công",
    title: "Không gian bắt đầu từ một ý tưởng đúng.",
    copy: "KCC hướng tới kiểm soát đồng bộ chất lượng – chi phí – tiến độ – công năng – hiệu quả khai thác. KCC kết nối giữa ý tưởng đầu tư, thiết kế và công trình thực tế, đảm bảo giải pháp thiết kế thực tế, đồng bộ và hiệu quả.",
    stat: "100+",
    statLabel: "Công trình hoàn thiện",
  },
  realhub: {
    label: "Nền tảng dữ liệu & công nghệ BĐS",
    title: "Dữ liệu giúp thị trường vận hành thông minh hơn.",
    copy: "RealHub là nền tảng hỗ trợ Kepler phát triển mô hình công nghệ bất động sản (PropTech), từng bước số hóa quy trình tư vấn, quản lý tài sản, giao dịch và khai thác dữ liệu. RealHub kết nối dữ liệu – tài sản – chuyên gia – dịch vụ – nhà đầu tư – giao dịch bất động sản trên một hệ thống số.",
    stat: "1",
    statLabel: "Nền tảng duy nhất",
  },
  "kepler-property": {
    label: "Tư vấn & Phát triển BĐS",
    title: "Một góc nhìn rộng hơn cho mỗi quyết định.",
    copy: "Kepler Property – KPC Group định hướng trở thành nền tảng tư vấn và phát triển bất động sản chuyên nghiệp, lấy dữ liệu – chuyên môn – mạng lưới – công nghệ làm nền tảng. KPC tập trung giải quyết các bài toán xuyên suốt vòng đời bất động sản: từ ý tưởng đầu tư, đánh giá cơ hội, phát triển dự án đến đưa tài sản vào vận hành, khai thác và tối ưu giá trị.",
    stat: "25+",
    statLabel: "Năm kinh nghiệm",
  },
  "kepler-land": {
    label: "Sàn giao dịch & Tư vấn BĐS",
    title: "Sàn giao dịch minh bạch cho thị trường bất động sản.",
    copy: "Kepler Land kết hợp dữ liệu thị trường, tư vấn giá trị và năng lực marketing – bán hàng để nâng cao hiệu quả giao dịch. Kepler Land kết nối chủ sở hữu, chủ đầu tư, nhà đầu tư và khách hàng có nhu cầu mua – bán – thuê bất động sản.",
    stat: "500+",
    statLabel: "Giao dịch thành công",
  },
  bizoffice: {
    label: "Văn phòng linh hoạt & Hệ sinh thái doanh nghiệp",
    title: "Không gian làm việc linh hoạt cho doanh nghiệp hiện đại.",
    copy: "Biz Space hướng tới xây dựng môi trường làm việc – kết nối – giao thương – phát triển doanh nghiệp trong hệ sinh thái Kepler. Biz Space cung cấp giải pháp không gian làm việc linh hoạt và hệ sinh thái dịch vụ doanh nghiệp.",
    stat: "24/7",
    statLabel: "Sẵn sàng phục vụ",
  },
};

export default function UnitStory({ unitKey }: { unitKey: string }) {
  const units = useEcosystemUnits();
  const story = stories[unitKey] || {
    label: units[unitKey]?.eyebrow || "",
    title: units[unitKey]?.name || "",
    copy: units[unitKey]?.overview || units[unitKey]?.description || "",
    stat: "",
    statLabel: "",
  };
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #DC2626 1px, transparent 1px), linear-gradient(to bottom, #DC2626 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Blob */}
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:items-start"
        >
          {/* Left — label + stat */}
          <div className="space-y-8">
            <span className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
              {story.label}
            </span>
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm shadow-sm">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{story.stat}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">{story.statLabel}</p>
              </div>
            </div>
          </div>

          {/* Right — title + copy */}
          <div>
            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              {story.title}
            </h2>
            <div className="mt-6 h-px w-16 bg-primary" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {story.copy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
