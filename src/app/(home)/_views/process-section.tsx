"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Tiếp nhận yêu cầu",
    desc: "Đội ngũ Kepler lắng nghe và ghi nhận chính xác nhu cầu, mục tiêu và phạm vi công việc của khách hàng.",
    detail:
      "Chúng tôi bắt đầu bằng việc thu thập thông tin cơ bản, xác định đối tượng dự án, timeline mong muốn và kỳ vọng đầu ra.",
  },
  {
    num: "02",
    title: "Khảo sát và thu thập thông tin",
    desc: "Tiến hành khảo sát hiện trạng, thu thập dữ liệu tài sản, thị trường và các tài liệu liên quan.",
    detail:
      "Đội ngũ kỹ thuật và phân tích sẽ có mặt tại hiện trường để đo đạc, chụp ảnh, thu thập hồ sơ pháp lý và tài chính.",
  },
  {
    num: "03",
    title: "Phân tích",
    desc: "Xử lý dữ liệu thu thập, đánh giá tiềm năng và xác định các yếu tố ảnh hưởng đến giá trị và hiệu quả dự án.",
    detail:
      "Kết hợp công cụ phân tích dữ liệu, báo cáo thị trường và mô hình định giá để đưa ra cái nhìn toàn diện về dự án.",
  },
  {
    num: "04",
    title: "Đề xuất giải pháp",
    desc: "Xây dựng và trình bày chiến lược, phương án tối ưu phù hợp với từng giai đoạn phát triển.",
    detail:
      "Khách hàng nhận được đề xuất rõ ràng về lộ trình thực hiện, nguồn lực cần thiết và các chỉ số đánh giá hiệu quả.",
  },
  {
    num: "05",
    title: "Triển khai",
    desc: "Thực thi giải pháp với sự phối hợp chặt chẽ giữa các bộ phận chuyên môn và khách hàng.",
    detail:
      "Kepler đồng hành trong suốt quá trình triển khai, đảm bảo tiến độ, chất lượng và tuân thủ các cam kết.",
  },
  {
    num: "06",
    title: "Theo dõi và tối ưu",
    desc: "Giám sát kết quả sau triển khai, đo lường hiệu quả và cải tiến liên tục để gia tăng giá trị.",
    detail:
      "Chúng tôi cung cấp báo cáo định kỳ, đánh giá hiệu quả đầu tư và đề xuất điều chỉnh kịp thời khi cần.",
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  const start = Math.max(0, Math.min(active - 1, STEPS.length - 3));
  const activePos = active - start;

  const handleStepClick = (index: number, pos: number) => {
    if (pos === 2 && index < STEPS.length - 1) {
      setActive(index + 1);
    } else if (pos === 0 && index > 0) {
      setActive(index - 1);
    } else {
      setActive(index);
    }
  };

  return (
    <section className="relative bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-red-600 uppercase">
            Quy trình triển khai
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-3">
            Quy trình triển khai chuyên nghiệp
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-red-500" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left: Detail panel */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg p-8 md:p-12">
              <div className="absolute -top-8 -right-4 text-[12rem] font-extrabold text-gray-50 leading-none select-none pointer-events-none">
                {STEPS[active].num}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[active].num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white text-lg font-extrabold">
                      {STEPS[active].num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                      {STEPS[active].title}
                    </h3>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-[60ch]">
                    {STEPS[active].desc}
                  </p>

                  <div className="border-l-2 border-red-200 pl-6">
                    <p className="text-gray-500 leading-relaxed">
                      {STEPS[active].detail}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      href="/dat-lich-tu-van"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all group"
                    >
                      Đăng ký tư vấn
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Arc step swiper */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[360px] flex flex-col items-center justify-center">
              {/* Arc track */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[120%] h-64 rounded-t-full border border-dashed border-gray-300 pointer-events-none" />
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-48 rounded-t-full bg-gradient-to-t from-red-50/0 to-red-50/80 pointer-events-none" />

              <div className="relative z-10 flex items-end justify-center gap-4 md:gap-6 w-full px-4" style={{ perspective: "800px" }}>
                {STEPS.slice(start, start + 3).map((step, pos) => {
                  const globalIndex = start + pos;
                  const isActive = globalIndex === active;
                  const distance = pos - activePos;

                  return (
                    <motion.button
                      key={step.num}
                      onClick={() => handleStepClick(globalIndex, pos)}
                      animate={{
                        y: isActive ? -40 : 10,
                        scale: isActive ? 1.08 : 0.92,
                        rotateY: distance * 8,
                        zIndex: isActive ? 20 : 10 - Math.abs(distance),
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 18 }}
                      className={`relative flex-shrink-0 w-28 md:w-36 rounded-2xl p-5 text-center border-2 shadow-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-white border-red-500 shadow-red-100"
                          : "bg-white border-gray-200 hover:border-red-300"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-extrabold mb-3 ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.num}
                      </div>
                      <h3 className={`text-sm font-bold leading-snug ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                        {step.title}
                      </h3>
                      {isActive && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation dots */}
              <div className="mt-16 flex items-center gap-2">
                {STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === active ? "bg-red-600 w-6" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
