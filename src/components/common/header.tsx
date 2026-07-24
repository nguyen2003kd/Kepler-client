"use client";

import { KEPLER_CONFIG, NAV_ITEMS, NavItem } from "@/constants/kepler-data";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"sale" | "rent" | "project" | "news">("sale");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchTypeOptions = [
    { value: "sale", label: "Nhà đất bán", path: "/apartments-for-sale" },
    { value: "rent", label: "Nhà đất cho thuê", path: "/apartments-for-rent" },
    { value: "project", label: "Dự án", path: "/projects" },
    { value: "news", label: "Tin tức", path: "/news" },
  ];

  const locationOptions = [
    { value: "", label: "Tất cả khu vực" },
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
    { value: "", label: "Tất cả loại" },
    { value: "Căn hộ", label: "Căn hộ" },
    { value: "Nhà phố", label: "Nhà phố" },
    { value: "Biệt thự", label: "Biệt thự" },
    { value: "Đất nền", label: "Đất nền" },
    { value: "Shophouse", label: "Shophouse" },
    { value: "Officetel", label: "Officetel" },
  ];

  const showPropertyFilters = searchType === "sale" || searchType === "rent";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const type = searchTypeOptions.find((t) => t.value === searchType);
      const basePath = type?.path || "/properties/search";
      const params = new URLSearchParams();
      params.set("q", searchQuery.trim());
      if (locationFilter) params.set("location", locationFilter);
      if (typeFilter) params.set("type", typeFilter);
      router.push(`${basePath}?${params.toString()}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setLocationFilter("");
      setTypeFilter("");
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main header - White background */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white border-b border-gray-200 transition-all duration-300",
          isScrolled ? "shadow-lg" : "",
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-[60px] md:h-[72px]" : "h-[60px] md:h-[80px]"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Kepler Property"
                width={140}
                height={40}
                priority
                className={cn(
                  "w-auto transition-all duration-300",
                  isScrolled ? "h-[28px] md:h-[40px]" : "h-[32px] md:h-[50px]"
                )}
              />
              <span className={cn(
                "font-bold text-gray-800 transition-all duration-300 hidden sm:inline",
                isScrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
              )}>
                Kepler<span className="text-primary"> Property</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-5 py-2.5 text-[13px] font-medium uppercase tracking-wider transition-colors",
                      isActive(item.href)
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary",
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={12} className="mt-0.5" />}
                  </Link>
                  {item.children && openDropdown === item.href && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-white min-w-[240px] shadow-2xl rounded-xl overflow-hidden">
                      <div className="py-2">
                        {item.children.map((child, index) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 border-l-4",
                              isActive(child.href)
                                ? "text-primary border-primary bg-red-50/50"
                                : "text-gray-600 hover:text-primary hover:border-primary/40 hover:bg-gray-50/80",
                              index === 0 && "rounded-t-xl",
                              index === item.children!.length - 1 && "rounded-b-xl",
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search & Mobile toggle */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                className="w-10 h-10 grid place-items-center text-gray-800 hover:text-primary transition-colors rounded-xl hover:bg-gray-100"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>
              {/* Mobile toggle */}
              <button
                className="lg:hidden w-10 h-10 grid place-items-center text-gray-800 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsSearchOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="max-w-[800px] mx-auto px-4 md:px-6 py-4">
              {/* Search Type Tabs - scrollable on mobile */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:overflow-visible">
                {searchTypeOptions.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSearchType(type.value as typeof searchType)}
                    className={`px-3 md:px-4 py-2 text-xs md:text-sm font-medium rounded-xl transition-colors whitespace-nowrap flex-shrink-0 ${
                      searchType === type.value
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {/* Property Filters */}
              {showPropertyFilters && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <SelectDropdown
                    value={locationFilter}
                    onChange={setLocationFilter}
                    options={locationOptions}
                    placeholder="Khu vực"
                  />
                  <SelectDropdown
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={typeOptions}
                    placeholder="Loại BĐS"
                  />
                </div>
              )}
              <form onSubmit={handleSearch} className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Nhập tên ${searchTypeOptions.find(t => t.value === searchType)?.label.toLowerCase() || 'bất động sản'} cần tìm...`}
                  className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-14 text-sm md:text-base border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                />
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </form>
              <div className="mt-3 text-xs text-gray-500">
                Nhấn Enter để tìm kiếm hoặc ESC để đóng
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <nav
          className="fixed z-40 left-0 right-0 top-[60px] md:top-[80px] bg-white shadow-lg lg:hidden max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-80px)] overflow-y-auto"
          aria-label="Điều hướng di động"
        >
          <div className="px-4 md:px-6 py-4">
            {NAV_ITEMS.map((item: NavItem) => (
              <div key={item.href} className="border-b border-gray-100 last:border-0">
                <Link
                  href={item.href}
                  className={cn(
                    "block py-3 md:py-4 text-sm font-medium uppercase tracking-wide transition-colors",
                    isActive(item.href) ? "text-primary" : "text-gray-700",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block py-2 md:py-3 text-[13px] transition-colors text-gray-500",
                          isActive(child.href) ? "text-primary" : "text-gray-500",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={`tel:${KEPLER_CONFIG.hotlineTel}`}
              className="flex items-center gap-2 py-3 md:py-4 text-primary font-bold text-sm"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">{KEPLER_CONFIG.hotlineDisplay}</span>
              <span className="sm:hidden">Gọi ngay</span>
            </a>
          </div>
        </nav>
      )}
    </>
  );
}
