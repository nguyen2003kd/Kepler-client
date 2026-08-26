import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, FileSearch, Landmark, LineChart, Rocket, Scale } from "lucide-react";

export const staticServices: Record<string, {
  title: string;
  eyebrow: string;
  description: string;
  items: string[];
}> = {
  "tu-van-dau-tu": { title: "Tư vấn đầu tư", eyebrow: "Investment Advisory", description: "Đánh giá cơ hội, rủi ro và hiệu quả tài chính để nhà đầu tư có cơ sở ra quyết định.", items: ["Phân tích đầu tư", "Nghiên cứu khả thi", "Due Diligence", "Cấu trúc vốn", "Gọi vốn", "IPO"] },
  "phan-tich-dau-tu": { title: "Tư vấn đầu tư", eyebrow: "Investment Advisory", description: "Đánh giá cơ hội, rủi ro và hiệu quả tài chính để nhà đầu tư có cơ sở ra quyết định.", items: ["Phân tích đầu tư", "Nghiên cứu khả thi", "Due Diligence", "Cấu trúc vốn", "Gọi vốn", "IPO"] },
  "tham-dinh-gia": { title: "Thẩm định giá", eyebrow: "Valuation", description: "Cung cấp góc nhìn độc lập về giá trị tài sản cho nhiều mục đích sử dụng.", items: ["Bất động sản", "Máy móc - thiết bị", "Giá trị doanh nghiệp", "Dự án bất động sản", "Tài sản trí tuệ và vô hình", "Đánh giá lại tài sản", "Mục đích, phương pháp, quy trình và hồ sơ"] },
  "phat-trien-du-an": { title: "Phát triển dự án", eyebrow: "Project Development", description: "Biến ý tưởng và quỹ đất thành sản phẩm có chiến lược, thị trường và kế hoạch triển khai khả thi.", items: ["Nghiên cứu thị trường", "Master Planning", "Concept", "Product Strategy", "Feasibility Study", "Business Plan", "Marketing", "Sales"] },
  "phat-trien-du-an-bat-dong-san": { title: "Phát triển dự án bất động sản", eyebrow: "Project Development", description: "Biến ý tưởng và quỹ đất thành sản phẩm có chiến lược, thị trường và kế hoạch triển khai khả thi.", items: ["Nghiên cứu thị trường", "Master Planning", "Concept", "Product Strategy", "Feasibility Study", "Business Plan", "Marketing", "Sales"] },
  "quan-ly-bat-dong-san": { title: "Quản lý bất động sản và tài sản", eyebrow: "Property & Asset Management", description: "Tối ưu vận hành, chất lượng dịch vụ và hiệu quả khai thác trong suốt vòng đời tài sản.", items: ["Building Management", "Property Management", "Asset Management", "Facility Management", "Community Management", "Maintenance", "Operation"] },
  "asset-enhancement": { title: "Asset Enhancement", eyebrow: "Value Creation", description: "Tìm ra đòn bẩy để cải thiện hiệu quả khai thác và gia tăng giá trị tài sản.", items: ["Tăng giá trị tài sản", "Tăng doanh thu", "Tăng công suất", "Chuyển đổi công năng", "Repositioning"] },
  "tu-van-ma": { title: "Tư vấn M&A", eyebrow: "M&A Advisory", description: "Đồng hành từ xác định mục tiêu, thẩm định đến đàm phán và hoàn tất giao dịch.", items: ["Tư vấn bên bán", "Tư vấn bên mua", "Pitch Book và Teaser", "Valuation", "Target Scouting", "Due Diligence", "Negotiation", "Closing", "Hậu M&A"] },
  "moi-gioi-leasing": { title: "Môi giới và Leasing", eyebrow: "Brokerage & Leasing", description: "Kết nối đúng tài sản, đúng nhu cầu và đúng thời điểm để tối ưu hiệu quả giao dịch.", items: ["Môi giới: Office, Retail, Industrial, Land, Project, Investment, Luxury", "Leasing: Office, Retail, Warehouse, Factory, Industrial Park"] },
  "thiet-ke-xay-dung": { title: "Thiết kế và xây dựng", eyebrow: "Design & Build", description: "Từ ý tưởng đến công trình hoàn thiện với giải pháp thiết kế thực tế, đồng bộ và hiệu quả.", items: ["Thiết kế kiến trúc", "Thiết kế nội thất", "Thi công", "Cải tạo", "Hoàn thiện nội - ngoại thất"] },
  "thiet-ke-va-xay-dung": { title: "Thiết kế và xây dựng", eyebrow: "Design & Build", description: "Từ ý tưởng đến công trình hoàn thiện với giải pháp thiết kế thực tế, đồng bộ và hiệu quả.", items: ["Thiết kế kiến trúc", "Thiết kế nội thất", "Thi công", "Cải tạo", "Hoàn thiện nội - ngoại thất"] },
  "giai-phap-so": { title: "Giải pháp số", eyebrow: "PropTech Solutions", description: "Khám phá các giải pháp công nghệ hỗ trợ dữ liệu, tài sản và hoạt động kinh doanh bất động sản.", items: ["Giới thiệu giải pháp PropTech", "Kết nối RealHub Platform"] },
};

const investmentFeatures = [
  { title: "Phân tích đầu tư", description: "Đánh giá cơ hội, hiệu quả, dòng tiền và rủi ro của khoản đầu tư.", icon: LineChart },
  { title: "Nghiên cứu khả thi", description: "Kiểm tra tính khả thi về thị trường, pháp lý, kỹ thuật và tài chính.", icon: FileSearch },
  { title: "Due Diligence", description: "Rà soát toàn diện thông tin, hồ sơ, tài sản và các rủi ro liên quan.", icon: Scale },
  { title: "Cấu trúc vốn", description: "Thiết kế phương án vốn phù hợp với mục tiêu và giai đoạn phát triển.", icon: Landmark },
  { title: "Gọi vốn", description: "Chuẩn bị chiến lược, hồ sơ và kết nối với các nguồn vốn phù hợp.", icon: Rocket },
  { title: "IPO", description: "Tư vấn lộ trình, định giá và chuẩn bị nền tảng cho kế hoạch niêm yết.", icon: BarChart3 },
];

const serviceImages: Record<string, string> = {
  "tham-dinh-gia": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85",
  "phat-trien-du-an": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  "quan-ly-bat-dong-san": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
  "asset-enhancement": "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=85",
  "tu-van-ma": "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=85",
  "moi-gioi-leasing": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  "thiet-ke-xay-dung": "https://images.unsplash.com/photo-1503387762-592dat6db3f8?auto=format&fit=crop&w=1400&q=85",
  "giai-phap-so": "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=85",
};

const serviceThemes: Record<string, { kicker: string; accent: string; bar: string; icon: string; cta: string; overlay: string }> = {
  "tu-van-dau-tu": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "phan-tich-dau-tu": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "tham-dinh-gia": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "phat-trien-du-an": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "quan-ly-bat-dong-san": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "asset-enhancement": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "tu-van-ma": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "moi-gioi-leasing": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "thiet-ke-xay-dung": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  "giai-phap-so": { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
  default: { kicker: "text-red-300", accent: "text-primary", bar: "bg-primary", icon: "text-primary", cta: "bg-primary hover:bg-primary/90", overlay: "from-black/75" },
};

function ServiceItems({ slug, items, theme }: { slug: string; items: string[]; theme: (typeof serviceThemes)["default"] }) {
  if (slug === "tu-van-dau-tu" || slug === "phan-tich-dau-tu") {
    return <div className="grid gap-3 sm:grid-cols-2">{investmentFeatures.map(({ title, description, icon: Icon }, index) => <div key={title} className="group rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-md"><div className="flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div><span className="text-xs font-bold text-primary">0{index + 1}</span></div><h3 className="mt-4 font-bold text-gray-900">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-500">{description}</p></div>)}</div>;
  }

  if (["phat-trien-du-an", "thiet-ke-xay-dung"].includes(slug)) {
    return <div className="relative ml-2 border-l-2 border-slate-200 pl-8">{items.map((item, index) => <div key={item} className="relative pb-7 last:pb-0"><span className={`absolute -left-[2.65rem] flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${theme.bar}`}>{String(index + 1).padStart(2, "0")}</span><div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:bg-white hover:shadow-md"><p className="font-bold text-slate-900">{item}</p><p className="mt-1 text-sm leading-6 text-slate-500">Bước triển khai được thiết kế phù hợp với mục tiêu và quy mô dự án.</p></div></div>)}</div>;
  }

  if (["tham-dinh-gia", "quan-ly-bat-dong-san", "asset-enhancement"].includes(slug)) {
    return <div className="grid gap-3 sm:grid-cols-2">{items.map((item, index) => <div key={item} className={`min-h-36 rounded-2xl p-5 text-white ${index % 3 === 0 ? "bg-gray-900" : index % 3 === 1 ? "bg-gray-800" : "bg-primary"}`}><span className="text-3xl font-extrabold text-white/30">{String(index + 1).padStart(2, "0")}</span><p className="mt-6 font-bold leading-6">{item}</p></div>)}</div>;
  }

  if (slug === "moi-gioi-leasing") {
    return <div className="grid gap-4 sm:grid-cols-2">{items.map((item, index) => <div key={item} className="rounded-2xl border-2 border-slate-100 p-6"><p className={`text-sm font-bold uppercase tracking-wider ${theme.accent}`}>{index === 0 ? "Môi giới" : "Leasing"}</p><h3 className="mt-4 text-xl font-extrabold text-slate-900">{index === 0 ? "Mua bán & đầu tư" : "Cho thuê & khai thác"}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{item.replace(/^Môi giới: |^Leasing: /, "")}</p></div>)}</div>;
  }

  if (slug === "tu-van-ma") {
    return <div className="grid gap-2 sm:grid-cols-3">{items.map((item, index) => <div key={item} className="border-b border-slate-200 py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0"><span className={`text-xs font-bold uppercase tracking-widest ${theme.accent}`}>Giai đoạn {String(index + 1).padStart(2, "0")}</span><p className="mt-3 font-bold text-slate-900">{item}</p></div>)}</div>;
  }

  return <div className="grid gap-3 sm:grid-cols-2">{items.map((item, index) => <div key={item} className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-md"><div className="flex items-center justify-between"><CheckCircle2 className={`h-5 w-5 ${theme.icon}`} /><span className={`text-xs font-bold ${theme.accent}`}>{String(index + 1).padStart(2, "0")}</span></div><p className="mt-4 font-bold leading-6 text-gray-900">{item}</p></div>)}</div>;
}

export default function StaticServiceDetail({ slug, basePath = "/services" }: { slug: string; basePath?: string }) {
  const service = staticServices[slug];
  if (!service) return null;
  const theme = serviceThemes[slug] || serviceThemes.default;

  return <main className="min-h-screen bg-white text-gray-900">
    <section className="relative min-h-[430px] overflow-hidden bg-gray-900 bg-[url('/images/category-banner-investment.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto flex min-h-[430px] max-w-[1400px] items-center px-6 py-16 lg:px-12">
        <div className="max-w-3xl">
          <Link href={basePath} className="text-sm text-white/75 hover:text-white">Dịch vụ Kepler</Link>
          <p className={`mt-10 text-sm font-semibold uppercase tracking-wider ${theme.kicker}`}>{service.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white sm:text-6xl">{service.title}</h1>
          <div className={`mt-5 h-1 w-20 rounded-full ${theme.bar}`} />
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{service.description}</p>
        </div>
      </div>
    </section>
    <section className="bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div><p className={`text-sm font-semibold uppercase tracking-wider ${theme.accent}`}>Phạm vi đồng hành</p><h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900">Giải pháp phù hợp với mục tiêu của bạn</h2><div className={`mt-4 h-1 w-20 rounded-full ${theme.bar}`} /><p className="mt-5 leading-7 text-gray-600">Kepler kết hợp dữ liệu, kinh nghiệm thị trường và năng lực triển khai để đưa ra khuyến nghị có thể hành động.</p><div className="relative mt-8 h-64 overflow-hidden rounded-2xl bg-cover bg-center shadow-lg sm:h-80" role="img" aria-label={`Hình ảnh minh họa dịch vụ ${service.title}`} style={{ backgroundImage: `url('${serviceImages[slug] || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85"}')` }}><div className={`absolute inset-0 bg-gradient-to-t ${theme.overlay} via-black/10 to-transparent`} /><span className="absolute bottom-4 left-5 text-sm font-semibold text-white">Dữ liệu · Kinh nghiệm · Triển khai</span></div></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-8">
          <ServiceItems slug={slug} items={service.items} theme={theme} />
          {slug === "giai-phap-so" && <Link href="/realhub" className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ${theme.cta}`}>Khám phá RealHub Platform <ArrowRight className="h-4 w-4" /></Link>}
        </div>
      </div>
      </div>
    </section>
    <section className="bg-white px-6 py-20 text-center lg:px-10"><h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Trao đổi bài toán của bạn</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">Đội ngũ Kepler sẽ cùng bạn xác định hướng tiếp cận phù hợp.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white hover:bg-gray-800">Liên hệ chuyên gia <ArrowRight className="h-4 w-4" /></Link></section>
  </main>;
}
