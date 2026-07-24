"use client";

import { SaleProperty, SALE_PROPERTIES, RENT_PROPERTIES } from "@/constants/kepler-data";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import PropertyCard from "@/app/(home)/_views/property-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/fade-in";
import { SelectDropdown } from "@/components/ui/select-dropdown";

interface ListingPageProps {
  mode: "sale" | "rent";
}

export default function ListingPage({ mode }: ListingPageProps) {
  const isSale = mode === "sale";
  const allData: SaleProperty[] = isSale ? SALE_PROPERTIES : RENT_PROPERTIES;

  const title = isSale
    ? "Nhà đất đang bán"
    : "Nhà đất cho thuê";
  const subtitle = isSale
    ? "Tìm BĐS phù hợp với nhu cầu và ngân sách của bạn."
    : "Tìm BĐS cho thuê với giá tốt và vị trí thuận tiện.";
  const heroImg = isSale
    ? "https://picsum.photos/seed/sale-hero/1920/1080"
    : "https://picsum.photos/seed/rent-hero/1920/1080";
  const listingLabel = isSale ? "Bán" : "Cho thuê";

  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [areaFilter, setAreaFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const locations = useMemo(
    () => Array.from(new Set(allData.map((x) => x.district))).sort(),
    [allData],
  );
  const types = useMemo(
    () => Array.from(new Set(allData.map((x) => x.type))).sort(),
    [allData],
  );

  const filtered = useMemo(() => {
    let result = allData.filter((p) => {
      const matchKeyword =
        !keyword ||
        p.title.toLowerCase().includes(keyword.toLowerCase()) ||
        p.type.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation = !locationFilter || p.district === locationFilter;
      const matchType = !typeFilter || p.type === typeFilter;
      const maxArea = areaFilter ? Number(areaFilter) : Infinity;
      const matchArea = p.areaValue <= maxArea;
      return matchKeyword && matchLocation && matchType && matchArea;
    });

    if (sortBy === "asc") {
      result = [...result].sort((a, b) => a.areaValue - b.areaValue);
    } else if (sortBy === "desc") {
      result = [...result].sort((a, b) => b.areaValue - a.areaValue);
    }

    return result;
  }, [allData, keyword, locationFilter, typeFilter, areaFilter, sortBy]);

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section
        className="relative h-[200px] md:h-[320px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('${heroImg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 w-full pb-6 md:pb-10">
          <FadeIn direction="up" duration={0.6}>
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3 text-white/70 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
                <span>/</span>
                <span className="text-white">{title}</span>
              </div>
              <h1 className="text-[clamp(22px,4vw,42px)] font-bold text-white leading-tight">
                {title}
              </h1>
              <p className="mt-1 md:mt-2 text-white/80 text-sm md:text-[15px] max-w-[560px] hidden md:block">{subtitle}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">

          {/* Filter panel */}
          <FadeIn direction="up" delay={0.1} duration={0.5}>
            <div className="bg-gray-50 p-3 md:p-5 mb-6 md:mb-8 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_auto] gap-2 md:gap-3 items-end">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1">Từ khóa</label>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Căn hộ, nhà phố..."
                    className="w-full min-h-[38px] md:min-h-[42px] border border-gray-200 bg-white text-gray-800 px-3 text-sm outline-none focus:border-primary rounded-lg md:rounded-xl"
                  />
                </div>
                <SelectDropdown
                  label="Khu vực"
                  value={locationFilter}
                  onChange={setLocationFilter}
                  options={[
                    { value: "", label: "Tất cả" },
                    ...locations.map((loc: string) => ({ value: loc, label: loc })),
                  ]}
                  className="min-h-[38px] md:min-h-[42px] text-sm"
                />
                <SelectDropdown
                  label="Loại căn"
                  value={typeFilter}
                  onChange={setTypeFilter}
                  options={[
                    { value: "", label: "Tất cả" },
                    ...types.map((t: string) => ({ value: t, label: t })),
                  ]}
                  className="min-h-[38px] md:min-h-[42px] text-sm"
                />
                <SelectDropdown
                  label="Diện tích"
                  value={areaFilter}
                  onChange={setAreaFilter}
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: "60", label: "Đến 60 m²" },
                    { value: "80", label: "Đến 80 m²" },
                    { value: "110", label: "Đến 110 m²" },
                    { value: "130", label: "Đến 130 m²" },
                  ]}
                  className="min-h-[38px] md:min-h-[42px] text-sm hidden lg:block"
                />
                <button
                  onClick={() => {}}
                  className="inline-flex items-center justify-center gap-2 min-h-[38px] md:min-h-[42px] px-4 md:px-5 bg-primary text-white text-xs md:text-sm font-semibold hover:bg-primary/90 transition-colors rounded-lg md:rounded-xl"
                >
                  <Search size={16} />
                  <span className="md:hidden">Tìm</span>
                  <span className="hidden md:inline">Tìm</span>
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Toolbar */}
          <FadeIn direction="up" delay={0.2} duration={0.5}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-gray-200">
              <p className="text-sm md:text-[15px] text-gray-600">
                <span className="text-primary font-bold">{filtered.length}</span> lựa chọn phù hợp
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Sắp xếp</label>
                <SelectDropdown
                  value={sortBy}
                  onChange={setSortBy}
                  options={[
                    { value: "", label: "Mặc định" },
                    { value: "asc", label: "Diện tích tăng dần" },
                    { value: "desc", label: "Diện tích giảm dần" },
                  ]}
                  className="min-h-[36px] md:min-h-[38px] text-sm"
                />
              </div>
            </div>
          </FadeIn>

          {/* Grid */}
          {filtered.length > 0 ? (
            <Stagger delay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <StaggerItem key={p.id}>
                  <PropertyCard property={p} listingLabel={listingLabel} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <FadeIn direction="up" delay={0.2} duration={0.5}>
              <div className="text-center py-12 md:py-20 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Không tìm thấy BĐS phù hợp với bộ lọc của bạn.</p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </div>
  );
}
