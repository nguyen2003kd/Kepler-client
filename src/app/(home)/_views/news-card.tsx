import { NewsItem } from "@/constants/kepler-data";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  item: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <Link href={`/news/${item.id}`} className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl border border-gray-200 block">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-t-xl">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-primary text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-xl">
            {item.category}
          </span>
          <span className="text-gray-400 text-xs">{item.date}</span>
        </div>
        <h3 className="text-[#1a1a1a] text-[17px] font-semibold leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-[14px] leading-relaxed text-gray-500">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-xs">{item.author}</span>
          <span className="inline-flex items-center gap-2 text-primary text-[13px] font-semibold group-hover:gap-3 transition-all">
            Đọc tiếp
            <span>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
