export type Expert = {
  slug: string;
  name: string;
  prefix: string;
  role: string;
  field: string;
  category: string;
  avatar: string;
  bio: string[];
  experience: string;
  current: string;
  certifications: string[];
  projects: { title: string; description: string; href: string }[];
  articles: { title: string; date: string; href: string }[];
};

export const categories = [
  "Tất cả",
  "Luật",
  "Thẩm định giá",
  "Kiến trúc",
  "Tài chính",
  "Xây dựng",
  "Kế toán",
  "Bất động sản",
  "Quản lý vận hành",
] as const;

export const experts: Expert[] = [
  {
    slug: "ts-nguyen-van-anh",
    name: "Nguyễn Văn Anh",
    prefix: "Tiến sỹ",
    role: "Cố vấn cao cấp — Dịch vụ thẩm định giá bất động sản",
    field: "Thẩm định giá",
    category: "Thẩm định giá",
    avatar: "/images/banner-1.png",
    bio: [
      "Tiến sỹ Quản Trị Kinh Doanh Trường Đại Học Nam California (SCUPS - U.S.A).",
      "Thẩm Định Viên về Giá do Bộ Tài chính cấp thẻ hành nghề.",
      "Đấu Giá Viên do Bộ Tư pháp cấp thẻ hành nghề.",
    ],
    experience:
      "Trong những năm gần đây ông là Giám đốc Công ty TNHH Thẩm Định Giá Sài Gòn (Saigon PA), Giám đốc Công ty TNHH Một Thành Viên Thẩm Định Giá Sài Gòn Nhà Đất, Giám đốc Công ty TNHH Thẩm Định Bất Động Sản Hoàng Quân…",
    current:
      "Hiện nay, ông là cố vấn cao cấp cho Kepler về các kỹ thuật thẩm định giá tài sản, tài chính doanh nghiệp, giúp cho Kepler hoạt động hiệu quả và đảm bảo các nghiệp vụ chuyên môn liên quan đến thẩm định giá.",
    certifications: [
      "Thẻ Thẩm Định Viên về Giá — Bộ Tài chính",
      "Thẻ Đấu Giá Viên — Bộ Tư pháp",
      "Tiến sỹ Quản Trị Kinh Doanh — SCUPS, U.S.A",
    ],
    projects: [
      { title: "Thẩm định giá bất động sản Everrich", description: "Thẩm định giá trị tài sản cho mục đích tài chính.", href: "/news" },
      { title: "Thẩm định giá trị doanh nghiệp Hoàng Quân", description: "Định giá doanh nghiệp cho giao dịch M&A.", href: "/news" },
    ],
    articles: [
      { title: "Phương pháp tiếp cận trong thẩm định giá BĐS", date: "2024-03-15", href: "/news" },
      { title: "Định giá tài sản trong bối cảnh thị trường biến động", date: "2024-01-20", href: "/news" },
    ],
  },
  {
    slug: "tdv-nguyen-thai-hien",
    name: "Nguyễn Thái Hiền",
    prefix: "Thẩm định viên",
    role: "Phụ trách tư vấn thẩm định giá",
    field: "Thẩm định giá",
    category: "Thẩm định giá",
    avatar: "/images/banner-2.jpg",
    bio: [
      "Đã từng là lãnh đạo tại các Công ty thẩm định giá Hoàng Quân, Công ty thẩm định giá Thế Kỷ và Công ty thẩm định giá IVC Việt Nam…",
      "Với kinh nghiệm tiếp xúc và làm việc hơn 5.000 hồ sơ, ông có thể hiểu các loại tài sản.",
    ],
    experience: "",
    current: "",
    certifications: ["Thẻ Thẩm Định Viên — Bộ Tài chính"],
    projects: [
      { title: "Thẩm định 5.000+ hồ sơ tài sản", description: "Đa dạng loại tài sản từ BĐS đến máy móc thiết bị.", href: "/news" },
    ],
    articles: [
      { title: "Kinh nghiệm xử lý 5.000 hồ sơ thẩm định", date: "2024-02-10", href: "/news" },
    ],
  },
  {
    slug: "ls-vu-van-thanh",
    name: "Vũ Văn Thành",
    prefix: "Luật sư",
    role: "Phụ trách mảng tư vấn luật đầu tư và luật bất động sản",
    field: "Pháp lý",
    category: "Luật",
    avatar: "/images/banner-3.jpg",
    bio: [
      "Nhiều năm kinh nghiệm và trực tiếp xử lý rất nhiều trường hợp liên quan.",
    ],
    experience:
      "Đã từng là Phó ban pháp chế Tổng Cty bảo hiểm dầu khí Việt Nam, Trưởng văn phòng luật sư VNG Việt Nam.",
    current: "",
    certifications: ["Chứng chỉ hành nghề Luật sư — Bộ Tư pháp"],
    projects: [
      { title: "Tư vấn pháp lý dự án đầu tư FDI", description: "Cấu trúc pháp lý cho giao dịch đầu tư nước ngoài.", href: "/news" },
    ],
    articles: [
      { title: "Lưu ý pháp lý trong giao dịch BĐS", date: "2024-04-05", href: "/news" },
    ],
  },
  {
    slug: "ks-vo-minh-giao",
    name: "Võ Minh Giáo",
    prefix: "Kỹ sư",
    role: "Cán bộ chủ lực về quản lý và vận hành tòa nhà",
    field: "Quản lý vận hành",
    category: "Quản lý vận hành",
    avatar: "/images/bg-home.jpg",
    bio: [
      "Hơn 10 năm kinh nghiệm trong lĩnh vực quản lý và vận hành kỹ thuật tại các khách sạn lớn (Sofitel Plaza Saigon, Windsor Plaza Hotel, Saigon Center, Asia Refrigeration Corporation, New World Hotel Saigon…).",
      "Quản lý tài sản và vận hành các tòa nhà quy mô lớn như Everrich, Imperia, Nam Á Building, SCB Building…",
    ],
    experience: "",
    current:
      "Hiện ông Giáo là giảng viên hữu cơ của một số trường đào tạo nghề liên quan đến ngành BĐS.",
    certifications: ["Chứng chỉ Quản lý vận hành tòa nhà"],
    projects: [
      { title: "Vận hành Everrich & Imperia", description: "Quản lý kỹ thuật và vận hành các tòa nhà quy mô lớn.", href: "/news" },
    ],
    articles: [
      { title: "Tối ưu chi phí vận hành tòa nhà", date: "2024-05-12", href: "/news" },
    ],
  },
  {
    slug: "ts-nguyen-thi-xuan-trang",
    name: "Nguyễn Thị Xuân Trang",
    prefix: "Thạc sỹ",
    role: "Phụ trách tư vấn marketing và phát triển bất động sản",
    field: "Marketing & Phát triển BĐS",
    category: "Bất động sản",
    avatar: "/images/image-111.png",
    bio: [
      "Nhiều năm kinh nghiệm trong việc triển khai các sản phẩm đầu tư, phân phối bất động sản và hệ thống bán lẻ.",
    ],
    experience: "",
    current: "",
    certifications: ["Thạc sỹ Marketing"],
    projects: [
      { title: "Chiến lược phân phối dự án BĐS", description: "Triển khai sản phẩm đầu tư và hệ thống bán lẻ.", href: "/news" },
    ],
    articles: [
      { title: "Xu hướng marketing BĐS 2024", date: "2024-06-01", href: "/news" },
    ],
  },
  {
    slug: "kts-nguyen-van-tha",
    name: "Nguyễn Văn Thả",
    prefix: "KTS",
    role: "Phụ trách bộ phận tư vấn thiết kế và thi công",
    field: "Thiết kế & Thi công",
    category: "Kiến trúc",
    avatar: "/images/image-112.png",
    bio: [
      "Thâm niên hơn 12 năm trong lĩnh vực thiết kế, xây dựng, lắp đặt trong mọi công trình dân dụng và chuyên dụng.",
      "Tham gia thiết kế và thi công một số dự án quy mô lớn với nhiều giải pháp tối ưu trong kiến trúc hiện đại.",
    ],
    experience: "",
    current: "",
    certifications: ["Chứng chỉ hành nghề Kiến trúc sư"],
    projects: [
      { title: "Thiết kế kiến trúc dự án dân dụng quy mô lớn", description: "Giải pháp tối ưu trong kiến trúc hiện đại.", href: "/news" },
    ],
    articles: [
      { title: "Giải pháp kiến trúc bền vững", date: "2024-07-08", href: "/news" },
    ],
  },
];

export function getExpertBySlug(slug: string): Expert | undefined {
  return experts.find((e) => e.slug === slug);
}
