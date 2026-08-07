import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { ArrowRight, Calendar, ImageOff } from "lucide-react";
import Image from "@/components/common/safe-image";
import Link from "next/link";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  date?: string;
  imageAlt?: string;
  className?: string;
}

export default function ServiceCard({
  image,
  title,
  description,
  link,
  date,
  imageAlt = title,
  className,
}: ServiceCardProps) {
  const hasImage = image && image.trim() !== "";

  return (
    <Link
      href={link}
      className={cn(
        "group flex flex-col w-full bg-white overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        {hasImage ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
            <ImageOff
              className="w-10 h-10 text-gray-300 mb-2"
              strokeWidth={1.5}
            />
            <p className="text-gray-400 font-medium text-xs">
              Không có hình ảnh
            </p>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {date ? (
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        ) : (
          <div className="h-4 mb-3" />
        )}

        <h3 className="text-gray-900 text-lg font-semibold leading-snug mb-2 line-clamp-2">
          {title}
        </h3>
        <div className="text-sm leading-relaxed text-gray-500 line-clamp-2">
          {parse(description)}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-gray-400 text-xs">Dịch vụ</span>
          <span className="inline-flex items-center gap-2 text-red-600 text-sm font-semibold group-hover:gap-3 transition-all">
            Xem chi tiết
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
