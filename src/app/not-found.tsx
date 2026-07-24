import { KEPLER_CONFIG } from "@/constants/kepler-data";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center bg-white">
      <div className="text-center px-4">
        <strong className="text-primary text-[clamp(60px,10vw,120px)] font-bold leading-none">
          404
        </strong>
        <h1 className="mt-4 text-2xl font-semibold text-[#1a1a1a]">
          Không tìm thấy trang
        </h1>
        <p className="mt-3 text-gray-500 max-w-[420px] mx-auto">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-h-[44px] mt-6 px-6 bg-primary text-white text-xs font-bold uppercase tracking-[0.09em] hover:bg-primary/90 transition-colors rounded-xl"
        >
          Về trang chủ
        </Link>
        <p className="mt-4 text-gray-400 text-sm">
          Hotline: {KEPLER_CONFIG.hotlineDisplay}
        </p>
      </div>
    </div>
  );
}
