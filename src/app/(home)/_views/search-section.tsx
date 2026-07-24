"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectDropdown } from "@/components/ui/select-dropdown";

export default function SearchSection() {
  const [mode, setMode] = useState<"sale" | "rent">("sale");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    const path = mode === "sale" ? "/apartments-for-sale" : "/apartments-for-rent";
    router.push(`${path}${params.toString() ? `?${params}` : ""}`);
  };

  const locationOptions = [
    { value: "", label: "Tất cả" },
    { value: "Quận 1", label: "Quận 1" },
    { value: "Quận 2", label: "Quận 2" },
    { value: "Quận 7", label: "Quận 7" },
    { value: "Quận 9", label: "Quận 9" },
    { value: "Bình Thạnh", label: "Bình Thạnh" },
    { value: "Phú Nhuận", label: "Phú Nhuận" },
    { value: "Tân Phú", label: "Tân Phú" },
    { value: "Gò Vấp", label: "Gò Vấp" },
  ];

  const typeOptions = [
    { value: "", label: "Tất cả loại BĐS" },
    { value: "Căn hộ", label: "Căn hộ" },
    { value: "Nhà phố", label: "Nhà phố" },
    { value: "Biệt thự", label: "Biệt thự" },
    { value: "Đất nền", label: "Đất nền" },
    { value: "Shophouse", label: "Shophouse" },
    { value: "Officetel", label: "Officetel" },
  ];

  return (
    <section className="relative z-10 -mt-10 md:-mt-[54px]">
      <div className="max-w-[1180px] mx-auto px-3 md:px-4">
        <div className="bg-white border-t-4 border-primary shadow-[0_18px_45px_rgba(0,0,0,0.13)] rounded-lg md:rounded-none overflow-hidden">
          {/* Tabs */}
          <div className="h-10 md:h-11 flex border-b border-gray-200">
            <button
              type="button"
              onClick={() => setMode("sale")}
              className={`flex-1 md:flex-none md:min-w-[116px] border-r border-gray-200 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
                mode === "sale"
                  ? "bg-primary text-white"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              Căn hộ bán
            </button>
            <button
              type="button"
              onClick={() => setMode("rent")}
              className={`flex-1 md:flex-none md:min-w-[116px] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
                mode === "rent"
                  ? "bg-primary text-white"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              Căn hộ cho thuê
            </button>
          </div>

          {/* Search row */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr_1fr_auto] gap-2 md:gap-0 p-3 md:p-[18px_20px_22px]"
          >
            <div className="flex flex-col gap-1 md:gap-2 md:px-4 md:border-r md:border-gray-200">
              <label className="text-[9px] font-bold uppercase tracking-[0.11em] text-gray-500 hidden md:block">
                Từ khóa
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Căn hộ, nhà phố..."
                className="w-full min-h-[38px] md:min-h-[42px] border border-gray-200 md:border-0 bg-white text-gray-800 px-3 md:px-0 text-sm outline-none focus:border-primary rounded-lg md:rounded-none"
              />
            </div>
            <div className="flex flex-col gap-1 md:gap-2 md:px-4 md:border-r md:border-gray-200">
              <SelectDropdown
                label=""
                value={location}
                onChange={setLocation}
                options={locationOptions}
                className="md:border-0 md:px-0 min-h-[38px] md:min-h-[42px] text-sm"
                placeholder="Khu vực"
              />
            </div>
            <div className="flex flex-col gap-1 md:gap-2 md:px-4 md:border-r md:border-gray-200">
              <SelectDropdown
                label=""
                value={type}
                onChange={setType}
                options={typeOptions}
                className="md:border-0 md:px-0 min-h-[38px] md:min-h-[42px] text-sm"
                placeholder="Loại"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 min-h-[38px] md:min-h-[45px] md:ml-4 md:self-end px-4 md:px-6 bg-primary border border-primary text-white text-xs font-bold uppercase tracking-[0.09em] hover:bg-primary/90 transition-colors mt-0 md:mt-0 rounded-lg md:rounded-none"
            >
              <Search size={16} />
              <span className="hidden md:inline">Tìm kiếm</span>
              <span className="md:hidden">Tìm</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
