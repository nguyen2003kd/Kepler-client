import { SaleProperty } from "@/constants/kepler-data";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: SaleProperty;
  listingLabel: string;
}

export default function PropertyCard({ property, listingLabel }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl border border-gray-200 block">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-xl">
        <Image
          src={property.img}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-primary text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide rounded-xl">
          {listingLabel}
        </span>
      </div>
      <div className="p-4">
        <span className="block text-primary text-base font-bold mb-2">
          {property.price}
        </span>
        <h3 className="text-[#1a1a1a] text-[17px] font-semibold leading-snug">
          {property.title}
        </h3>
        <p className="flex items-start gap-2 mt-2 text-gray-500 text-[13px]">
          <MapPin size={14} className="min-w-[14px] mt-0.5 shrink-0" />
          {property.location}
        </p>
        <div className="flex flex-wrap gap-4 pt-4 mt-4 border-t border-gray-200 text-gray-600 text-xs">
          {property.beds > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={14} />
              {property.beds} PN
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={14} />
              {property.baths} WC
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Maximize size={14} />
            {property.area}
          </span>
        </div>
        <span className="inline-flex items-center gap-2 mt-4 text-primary text-[13px] font-semibold group-hover:gap-3 transition-all">
          Xem chi tiết
          <span>→</span>
        </span>
      </div>
    </Link>
  );
}
