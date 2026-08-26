export const KEPLER_CONFIG = {
  projectName: "Kepler Property",
  siteTagline: "Nền tảng BĐS & dịch vụ chuyên nghiệp",
  hotlineDisplay: "0901 234 567",
  hotlineTel: "+84901234567",
  contactEmail: "contact@keplerproperty.vn",
  projectUrl: "https://kepler-dev.meucorp.com",
  facebookUrl: "https://www.facebook.com/keplerland",
  address: "Tầng 18, Tòa nhà Saigon Centre, 65 Lê Lợi, Quận 1, TP.HCM",
  location: "TP.HCM",
};

export interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Trang chủ" },
  {
    href: "/about",
    label: "Giới thiệu",
    children: [
      { href: "/about/company-overview", label: "Giới thiệu Kepler Group" },
      { href: "/about/vision-mission", label: "Tầm nhìn – Sứ mệnh" },
      { href: "/services", label: "Lĩnh vực hoạt động chính" },
      { href: "/about/board-of-directors", label: "Ban điều hành" },
      { href: "/about/expert-council", label: "Hội đồng cố vấn" },
      { href: "/about/certifications", label: "Chứng chỉ – Giấy phép" },
      { href: "/about/capability-profile", label: "Hồ sơ năng lực" },
    ],
  },
  {
    href: "/services",
    label: "Dịch vụ",
    children: [
      { href: "/services/tu-van-dinh-gia-va-tham-dinh-gia", label: "Tư vấn định giá và thẩm định giá" },
      { href: "/services/phat-trien-du-an-bat-dong-san", label: "Phát triển dự án bất động sản" },
      { href: "/services/quan-ly-va-khai-thac-tai-san", label: "Quản lý và khai thác tài sản" },
      { href: "/services/tu-van-va-thuc-hien-ma", label: "Tư vấn và thực hiện M&A" },
      { href: "/services/tu-van-cac-dich-vu-bat-dong-san", label: "Tư vấn các dịch vụ BĐS" },
      { href: "/services/giai-phap-so-bat-dong-san", label: "Giải pháp số BĐS" },
      { href: "/services/cho-thue-hoi-dong-co-van", label: "Cho thuê hội đồng cố vấn" },
    ],
  },
  {
    href: "/he-sinh-thai",
    label: "Hệ sinh thái",
    children: [
      { href: "/he-sinh-thai/kepler-property", label: "Kepler Property – KPC" },
      { href: "/he-sinh-thai/kpc-appraisal", label: "Kepler Appraisal – KAC" },
      { href: "/he-sinh-thai/kmc-management", label: "Kepler Management – KMC" },
      { href: "/he-sinh-thai/kac-advisory", label: "Kepler M&A – KMAC" },
      { href: "/he-sinh-thai/k-homes", label: "Kepler Construction – KCC" },
      { href: "/he-sinh-thai/kepler-land", label: "Kepler Land" },
      { href: "/he-sinh-thai/realhub", label: "RealHub Platform" },
      { href: "/he-sinh-thai/bizoffice", label: "Biz Space" },
    ],
  },
  { href: "/san-giao-dich", label: "Sàn giao dịch" },
  { href: "/doi-tac-khach-hang", label: "Đối tác & Khách hàng" },
  { href: "/cong-dong-bds-offline", label: "Cộng đồng BĐS" },
  { href: "/chuyen-gia", label: "Chuyên gia" },
  { href: "/news", label: "Tin tức" },
  {
    href: "/kien-thuc",
    label: "Kiến thức",
    children: [
      { href: "/kien-thuc/dau-tu-bat-dong-san", label: "Đầu tư bất động sản" },
      { href: "/kien-thuc/tai-chinh-va-cac-khoan-vay", label: "Tài chính và các khoản vay" },
      { href: "/kien-thuc/tham-dinh-gia-va-dinh-gia", label: "Thẩm định giá và định giá" },
      { href: "/kien-thuc/thiet-ke-va-xay-dung", label: "Thiết kế và xây dựng" },
      { href: "/kien-thuc/quan-ly-va-van-hanh", label: "Quản lý và vận hành" },
      { href: "/kien-thuc/podcast-va-video", label: "Podcast và video" },
      { href: "/kien-thuc/khoa-dao-tao", label: "Khóa đào tạo" },
      { href: "/kien-thuc/tieu-diem-bat-dong-san", label: "Tiêu điểm bất động sản" },
    ],
  },
  {
    href: "/contact",
    label: "Liên hệ",
    children: [
      { href: "/contact/lien-he-kepler", label: "Liên hệ Kepler" },
      { href: "/contact/lien-he-hop-tac", label: "Liên hệ hợp tác" },
      { href: "/contact/yeu-cau-ban-cho-thue", label: "Yêu cầu bán/cho thuê BĐS" },
      { href: "/contact/yeu-cau-tham-dinh-gia", label: "Yêu cầu thẩm định giá" },
      { href: "/contact/yeu-cau-dich-vu", label: "Yêu cầu dịch vụ BĐS" },
      { href: "/contact/tu-van-thuong-vu-ma", label: "Tư vấn thương vụ M&A" },
      { href: "/contact/dat-lich-hen-chuyen-gia", label: "Đặt lịch hẹn chuyên gia" },
    ],
  },
];

export interface SaleProperty {
  id: string;
  title: string;
  location: string;
  district: string;
  type: string;
  price: string;
  priceValue: number;
  beds: number;
  baths: number;
  area: string;
  areaValue: number;
  img: string;
  images?: string[];
  featured: boolean;
  direction: string;
  legal: string;
  description: string;
}

const PROP_IMG = {
  apt1: "https://picsum.photos/seed/apt1/1200/800",
  apt2: "https://picsum.photos/seed/apt2/1200/800",
  apt3: "https://picsum.photos/seed/apt3/1200/800",
  house1: "https://picsum.photos/seed/house1/1200/800",
  house2: "https://picsum.photos/seed/house2/1200/800",
  villa1: "https://picsum.photos/seed/villa1/1200/800",
  villa2: "https://picsum.photos/seed/villa2/1200/800",
  land1: "https://picsum.photos/seed/land1/1200/800",
  land2: "https://picsum.photos/seed/land2/1200/800",
  shop1: "https://picsum.photos/seed/shop1/1200/800",
  studio1: "https://picsum.photos/seed/studio1/1200/800",
  office1: "https://picsum.photos/seed/office1/1200/800",
  interior1: "https://picsum.photos/seed/int1/1200/800",
  interior2: "https://picsum.photos/seed/int2/1200/800",
  interior3: "https://picsum.photos/seed/int3/1200/800",
  interior4: "https://picsum.photos/seed/int4/1200/800",
  bathroom1: "https://picsum.photos/seed/bath1/1200/800",
  kitchen1: "https://picsum.photos/seed/kit1/1200/800",
  balcony1: "https://picsum.photos/seed/bal1/1200/800",
  bedroom1: "https://picsum.photos/seed/bed1/1200/800",
};

export const SALE_PROPERTIES: SaleProperty[] = [
  { id: "bds-001", title: "Căn hộ 2PN Vinhomes Grand Park", location: "Long Thạnh Mỹ, Quận 9, TP.HCM", district: "Quận 9", type: "Căn hộ", price: "3,5 tỷ", priceValue: 3500, beds: 2, baths: 2, area: "72 m²", areaValue: 72, img: PROP_IMG.apt1, images: [PROP_IMG.apt1, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.bedroom1, PROP_IMG.bathroom1], featured: true, direction: "Đông Nam", legal: "Sổ hồng", description: "Căn hộ 2PN tại Vinhomes Grand Park, view hồ, nội thất đầy đủ." },
  { id: "bds-002", title: "Căn hộ 3PN Celadon City", location: "Tân Phú, TP.HCM", district: "Tân Phú", type: "Căn hộ", price: "2,8 tỷ", priceValue: 2800, beds: 3, baths: 2, area: "95 m²", areaValue: 95, img: PROP_IMG.apt2, images: [PROP_IMG.apt2, PROP_IMG.interior3, PROP_IMG.interior4, PROP_IMG.bathroom1], featured: true, direction: "Tây Bắc", legal: "Sổ hồng", description: "Căn hộ 3PN Celadon City, gần công viên, trường học quốc tế." },
  { id: "bds-003", title: "Nhà phố 4 tầng hẻm xe hơi", location: "Phú Nhuận, TP.HCM", district: "Phú Nhuận", type: "Nhà phố", price: "18,5 tỷ", priceValue: 18500, beds: 5, baths: 4, area: "120 m²", areaValue: 120, img: PROP_IMG.house1, images: [PROP_IMG.house1, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.kitchen1, PROP_IMG.bathroom1], featured: true, direction: "Nam", legal: "Sổ hồng", description: "Nhà phố 4 tầng mới xây, hẻm xe hơi, gần mặt tiền." },
  { id: "bds-004", title: "Nhà phố 3 tầng Bình Thạnh", location: "Bình Thạnh, TP.HCM", district: "Bình Thạnh", type: "Nhà phố", price: "6,8 tỷ", priceValue: 6800, beds: 4, baths: 3, area: "100 m²", areaValue: 100, img: PROP_IMG.house2, images: [PROP_IMG.house2, PROP_IMG.interior3, PROP_IMG.bedroom1, PROP_IMG.bathroom1], featured: false, direction: "Đông", legal: "Sổ hồng", description: "Nhà phố 3 tầng, khu dân cư hiện hữu, gần chợ và trường học." },
  { id: "bds-005", title: "Biệt thự song lập Vinhomes Central Park", location: "Bình Thạnh, TP.HCM", district: "Bình Thạnh", type: "Biệt thự", price: "12 tỷ", priceValue: 12000, beds: 4, baths: 4, area: "200 m²", areaValue: 200, img: PROP_IMG.villa1, images: [PROP_IMG.villa1, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.interior3, PROP_IMG.interior4, PROP_IMG.balcony1], featured: true, direction: "Tây Nam", legal: "Sổ hồng", description: "Biệt thự song lập Vinhomes Central Park, view sông, sân vườn." },
  { id: "bds-006", title: "Biệt thự liền kề An Phú", location: "Quận 2, TP.HCM", district: "Quận 2", type: "Biệt thự", price: "15 tỷ", priceValue: 15000, beds: 4, baths: 3, area: "180 m²", areaValue: 180, img: PROP_IMG.villa2, images: [PROP_IMG.villa2, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.bathroom1, PROP_IMG.balcony1], featured: false, direction: "Bắc", legal: "Sổ hồng", description: "Biệt thự liền kề An Phú, khu an ninh, gần trường quốc tế." },
  { id: "bds-007", title: "Đất nền khu dân cư Long Thạnh Mỹ", location: "Quận 9, TP.HCM", district: "Quận 9", type: "Đất nền", price: "2,5 tỷ", priceValue: 2500, beds: 0, baths: 0, area: "150 m²", areaValue: 150, img: PROP_IMG.land1, images: [PROP_IMG.land1, PROP_IMG.land2], featured: false, direction: "Nam", legal: "Sổ hồng", description: "Đất nền 150m², khu dân cư hiện hữu, gần đường cao tốc." },
  { id: "bds-008", title: "Đất nền Phú Mỹ Hưng", location: "Quận 7, TP.HCM", district: "Quận 7", type: "Đất nền", price: "8,5 tỷ", priceValue: 8500, beds: 0, baths: 0, area: "200 m²", areaValue: 200, img: PROP_IMG.land2, images: [PROP_IMG.land2, PROP_IMG.land1], featured: true, direction: "Đông Nam", legal: "Sổ hồng", description: "Đất nền Phú Mỹ Hưng, vị trí đắc địa, phù hợp xây văn phòng." },
  { id: "bds-009", title: "Shophouse mặt tiền Nguyễn Văn Linh", location: "Quận 7, TP.HCM", district: "Quận 7", type: "Shophouse", price: "22 tỷ", priceValue: 22000, beds: 3, baths: 3, area: "180 m²", areaValue: 180, img: PROP_IMG.shop1, images: [PROP_IMG.shop1, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.kitchen1, PROP_IMG.bathroom1], featured: true, direction: "Nam", legal: "Sổ hồng", description: "Shophouse mặt tiền Nguyễn Văn Linh, kinh doanh sầm uất." },
];

export const RENT_PROPERTIES: SaleProperty[] = [
  { id: "bds-010", title: "Căn hộ 2PN Empire City", location: "Quận 1, TP.HCM", district: "Quận 1", type: "Căn hộ", price: "18 triệu/tháng", priceValue: 18, beds: 2, baths: 2, area: "85 m²", areaValue: 85, img: PROP_IMG.apt3, images: [PROP_IMG.apt3, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.bedroom1, PROP_IMG.bathroom1], featured: true, direction: "Đông Nam", legal: "Hợp đồng", description: "Căn hộ 2PN Empire City, nội thất cao cấp, view sông." },
  { id: "bds-011", title: "Studio Quận 4", location: "Quận 4, TP.HCM", district: "Quận 4", type: "Căn hộ", price: "12 triệu/tháng", priceValue: 12, beds: 1, baths: 1, area: "45 m²", areaValue: 45, img: PROP_IMG.studio1, images: [PROP_IMG.studio1, PROP_IMG.interior3, PROP_IMG.bedroom1], featured: false, direction: "Tây", legal: "Hợp đồng", description: "Studio nội thất đầy đủ, gần trung tâm Quận 1." },
  { id: "bds-012", title: "Căn hộ 3PN The Sun Avenue", location: "Quận 2, TP.HCM", district: "Quận 2", type: "Căn hộ", price: "25 triệu/tháng", priceValue: 25, beds: 3, baths: 2, area: "110 m²", areaValue: 110, img: PROP_IMG.apt1, images: [PROP_IMG.apt1, PROP_IMG.interior4, PROP_IMG.interior1, PROP_IMG.bathroom1, PROP_IMG.balcony1], featured: true, direction: "Đông", legal: "Hợp đồng", description: "Căn hộ 3PN The Sun Avenue, full nội thất, view hồ." },
  { id: "bds-013", title: "Nhà nguyên căn 3PN Tân Phú", location: "Tân Phú, TP.HCM", district: "Tân Phú", type: "Nhà phố", price: "25 triệu/tháng", priceValue: 25, beds: 3, baths: 2, area: "150 m²", areaValue: 150, img: PROP_IMG.house2, images: [PROP_IMG.house2, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.kitchen1], featured: false, direction: "Nam", legal: "Hợp đồng", description: "Nhà nguyên căn 3PN, sân để xe, khu an ninh." },
  { id: "bds-014", title: "Phòng trọ Gò Vấp", location: "Gò Vấp, TP.HCM", district: "Gò Vấp", type: "Phòng trọ", price: "3,5 triệu/tháng", priceValue: 3.5, beds: 1, baths: 1, area: "25 m²", areaValue: 25, img: PROP_IMG.studio1, images: [PROP_IMG.studio1, PROP_IMG.interior3], featured: false, direction: "Đông", legal: "Hợp đồng", description: "Phòng trọ sạch sẽ, gần chợ, có chỗ để xe." },
  { id: "bds-015", title: "Biệt thự Vinhomes TP.HCM", location: "Quận 9, TP.HCM", district: "Quận 9", type: "Biệt thự", price: "80 triệu/tháng", priceValue: 80, beds: 4, baths: 4, area: "300 m²", areaValue: 300, img: PROP_IMG.villa1, images: [PROP_IMG.villa1, PROP_IMG.interior1, PROP_IMG.interior2, PROP_IMG.interior3, PROP_IMG.interior4, PROP_IMG.balcony1, PROP_IMG.bathroom1], featured: true, direction: "Tây Nam", legal: "Hợp đồng", description: "Biệt thự Vinhomes, full nội thất, sân vườn, hồ bơi." },
  { id: "bds-016", title: "Officetel Quận 1", location: "Quận 1, TP.HCM", district: "Quận 1", type: "Officetel", price: "15 triệu/tháng", priceValue: 15, beds: 1, baths: 1, area: "50 m²", areaValue: 50, img: PROP_IMG.office1, images: [PROP_IMG.office1, PROP_IMG.interior3, PROP_IMG.interior4], featured: false, direction: "Bắc", legal: "Hợp đồng", description: "Officetel trung tâm Quận 1, phù hợp văn phòng nhỏ." },
];

export interface ProjectInfo {
  id: string;
  slug: string;
  title: string;
  type: string;
  location: string;
  status: string;
  scale: string;
  img: string;
  images?: string[];
  priceRange: string;
  handover: string;
  description: string;
  amenities: string[];
}

const PRJ_IMG = {
  p1: "https://picsum.photos/seed/prj1/1200/800",
  p2: "https://picsum.photos/seed/prj2/1200/800",
  p3: "https://picsum.photos/seed/prj3/1200/800",
  p4: "https://images.pexels.com/photos/12887389/pexels-photo-12887389.jpeg",
  prjInt1: "https://picsum.photos/seed/prjint1/1200/800",
  prjInt2: "https://picsum.photos/seed/prjint2/1200/800",
  prjInt3: "https://picsum.photos/seed/prjint3/1200/800",
  prjInt4: "https://picsum.photos/seed/prjint4/1200/800",
};

export const PROJECTS: ProjectInfo[] = [
  { id: "prj-001", slug: "vinhomes-grand-park", title: "Bối cảnh", type: "Khu đô thị", location: "Long Thạnh Mỹ, Quận 9, TP.HCM", status: "Đang mở bán", scale: "44.000 căn", img: PRJ_IMG.p1, images: [PRJ_IMG.p1, PRJ_IMG.prjInt1, PRJ_IMG.prjInt2, PRJ_IMG.prjInt3, PRJ_IMG.prjInt4], priceRange: "2,8 - 12 tỷ", handover: "2025", description: "Khu đô thị sinh thái thông minh tại Quận 9, TP.HCM với quy mô 271,8 ha. Đầy đủ tiện ích: trường học, bệnh viện, công viên, TTTM.", amenities: ["Trường học quốc tế", "Bệnh viện", "Công viên", "TTTM", "Hồ bơi", "Gym"] },
  { id: "prj-002", slug: "celesta-rise", title: "Thách thức", type: "Khu đô thị", location: "Nhà Bè, TP.HCM", status: "Đang mở bán", scale: "1.200 căn", img: PRJ_IMG.p2, images: [PRJ_IMG.p2, PRJ_IMG.prjInt2, PRJ_IMG.prjInt3, PRJ_IMG.prjInt4], priceRange: "3,5 - 8 tỷ", handover: "2024", description: "Khu đô thị mới tại Nhà Bè với thiết kế hiện đại, không gian xanh mát. Hạ tầng hoàn thiện, giao thông thuận tiện.", amenities: ["Công viên", "Hồ bơi", "Khu vui chơi", "An ninh 24/7"] },
  { id: "prj-003", slug: "method-central-park", title: "Giải pháp", type: "Căn hộ", location: "Bình Thạnh, TP.HCM", status: "Đang mở bán", scale: "3.000 căn", img: PRJ_IMG.p3, images: [PRJ_IMG.p3, PRJ_IMG.prjInt1, PRJ_IMG.prjInt3, PRJ_IMG.prjInt4], priceRange: "4 - 15 tỷ", handover: "2025", description: "Vị trí đắc địa quận Bình Thạnh, view sông Sài Gòn. Thiết kế hiện đại với đầy đủ tiện ích.", amenities: ["View sông", "Pool", "Gym", "Coffee shop", "Co-working"] },
  { id: "prj-004", slug: "the-rive-gate", title: "Kết quả", type: "Khu đô thị", location: "Quận 9, TP.HCM", status: "Đang mở bán", scale: "800 căn", img: PRJ_IMG.p4, images: [PRJ_IMG.p4, PRJ_IMG.prjInt1, PRJ_IMG.prjInt2, PRJ_IMG.prjInt3], priceRange: "3,2 - 7 tỷ", handover: "2024", description: "Khu đô thị biệt lập tại Quận 9 với thiết kế cảnh quan xanh, hồ điều hòa. Phù hợp gia đình muốn không gian sống yên tĩnh.", amenities: ["Hồ điều hòa", "Công viên", "Khu BBQ", "An ninh"] },
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  img: string;
  excerpt: string;
  url: string;
  author: string;
}

export const NEWS: NewsItem[] = [
  { id: "news-001", title: "Thị trường bất động sản TP.HCM quý 3/2025: Nhiều tín hiệu tích cực", date: "15/09/2025", category: "Thị trường", img: "https://picsum.photos/seed/news1/800/600", excerpt: "Thị trường BĐS TP.HCM ghi nhận sự phục hồi mạnh mẽ trong quý 3 với lượng giao dịch tăng 25% so với cùng kỳ.", url: "#", author: "Kepler Property" },
  { id: "news-002", title: "Vinhomes Grand Park mở bán đợt 3 với ưu đãi hấp dẫn", date: "10/09/2025", category: "Dự án", img: "https://picsum.photos/seed/news2/800/600", excerpt: "Chủ đầu tư Vinhomes chính thức mở bán đợt 3 dự án Vinhomes Grand Park với chính sách thanh toán linh hoạt.", url: "#", author: "Kepler Property" },
  { id: "news-003", title: "Top 5 khu đô thị đáng sống nhất TP.HCM 2025", date: "05/09/2025", category: "Tư vấn", img: "https://picsum.photos/seed/news3/800/600", excerpt: "Bảng xếp hạng các khu đô thị có môi trường sống tốt nhất TP.HCM năm 2025 dựa trên tiện ích, giao thông và không gian xanh.", url: "#", author: "Kepler Property" },
  { id: "news-004", title: "Hướng dẫn thủ tục vay vốn mua nhà ở ngân hàng", date: "01/09/2025", category: "Tư vấn", img: "https://picsum.photos/seed/news4/800/600", excerpt: "Cẩm nang chi tiết các bước vay vốn mua nhà, lãi suất ưu đãi và những lưu ý quan trọng cho người mua nhà lần đầu.", url: "#", author: "Kepler Property" },
  { id: "news-005", title: "Quy hoạch giao thông Đông TP.HCM: Cơ hội mới cho BĐS", date: "28/08/2025", category: "Quy hoạch", img: "https://picsum.photos/seed/news5/800/600", excerpt: "Hàng loạt dự án giao thông trọng điểm tại Đông TP.HCM được đẩy mạnh, tạo động lực cho thị trường BĐS khu vực.", url: "#", author: "Kepler Property" },
  { id: "news-006", title: "5 lỗi phổ biến khi mua bán nhà đất cần tránh", date: "20/08/2025", category: "Tư vấn", img: "https://picsum.photos/seed/news6/800/600", excerpt: "Những sai lầm thường gặp khi giao dịch BĐS và cách phòng tránh để bảo vệ quyền lợi của người mua.", url: "#", author: "Kepler Property" },
];

export const PROJECT_FACTS = [
  { value: "4", label: "Dự án nổi bật" },
  { value: "49.000+", label: "Tổng số căn hộ" },
  { value: "271,8 ha", label: "Tổng diện tích" },
  { value: "2024 - 2025", label: "Bàn giao" },
];

export const DELIVERY_ITEMS = [
  { num: "01", title: "Tư vấn miễn phí", desc: "Đội ngũ chuyên viên tư vấn tận tâm, hỗ trợ tìm BĐS phù hợp nhu cầu và ngân sách." },
  { num: "02", title: "Hỗ trợ pháp lý", desc: "Kiểm tra pháp lý, hướng dẫn thủ tục sang tên và cấp sổ hồng nhanh chóng." },
  { num: "03", title: "Vay vốn ngân hàng", desc: "Hỗ trợ vay vốn với lãi suất ưu đãi, thủ tục nhanh gọn từ các ngân hàng đối tác." },
  { num: "04", title: "Sau bán hàng", desc: "Đồng hành sau giao dịch, hỗ trợ thuê lại, bán lại và quản lý BĐS lâu dài." },
];

export const APARTMENT_TYPES = [
  { type: "Căn hộ", area: "45 - 200 m²", img: "https://picsum.photos/seed/type-apt/800/600", desc: "Căn hộ chung cư cao cấp, đầy đủ tiện ích" },
  { type: "Nhà phố", area: "80 - 150 m²", img: "https://picsum.photos/seed/type-house/800/600", desc: "Nhà phố mặt tiền và hẻm xe hơi" },
  { type: "Biệt thự", area: "180 - 500 m²", img: "https://picsum.photos/seed/type-villa/800/600", desc: "Biệt thự song lập, liền kề cao cấp" },
];
