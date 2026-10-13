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
  "Bất động sản",
  "Thẩm định giá",
  "Luật",
  "Quản lý vận hành",
  "Tài chính",
  "Quy hoạch đô thị",
  "Kiến trúc",
  "Thiết kế đô thị",
] as const;

export const experts: Expert[] = [
  {
    slug: "ths-nguyen-thai-hien",
    name: "Nguyễn Thái Hiền",
    prefix: "Thạc sỹ",
    role: "Nhà sáng lập & Điều hành — Chuyên gia lĩnh vực bất động sản, tư vấn chiến lược, tư vấn quản trị",
    field: "Bất động sản",
    category: "Bất động sản",
    avatar: "/images/banner-1.png",
    bio: [
      "Thạc sỹ quản trị kinh doanh, thẩm định viên quốc gia.",
      "Chuyên gia lĩnh vực bất động sản, tư vấn chiến lược, tư vấn quản trị.",
      "Hơn 25 năm công tác liên tục trong các lĩnh vực bất động sản, tư vấn đầu tư và thẩm định giá.",
    ],
    experience:
      "Đã giữ các vị trí quản lý lãnh đạo tại Tập đoàn bất động sản Hoàng Quân, Tập đoàn Cengroup, Tập đoàn BĐS quốc tế Henry Butcher Malaysia, Công ty CP thẩm định giá VNG.",
    current:
      "Hiện là Nhà sáng lập và Điều hành Kepler Group, định hướng chiến lược và đồng hành cùng khách hàng trong các quyết định bất động sản quan trọng.",
    certifications: [
      "Thạc sỹ Quản trị Kinh doanh",
      "Thẻ Thẩm định viên quốc gia",
    ],
    projects: [
      { title: "Sáng lập Kepler Group", description: "Xây dựng hệ sinh thái tư vấn bất động sản khép kín.", href: "/about" },
      { title: "Định hướng chiến lược hệ sinh thái Kepler", description: "Phát triển 8 đơn vị thành viên trong hệ sinh thái.", href: "/he-sinh-thai" },
    ],
    articles: [
      { title: "Xu hướng thị trường bất động sản 2024", date: "2024-06-01", href: "/news" },
    ],
  },
  {
    slug: "kts-mai-thanh-tung",
    name: "Mai Thanh Tùng",
    prefix: "KTS",
    role: "Giám đốc dự án — Phụ trách tư vấn thiết kế và thi công",
    field: "Kiến trúc",
    category: "Kiến trúc",
    avatar: "/images/banner-2.jpg",
    bio: [
      "Kiến trúc sư với thâm niên gần 30 năm trong lĩnh vực thiết kế, xây dựng, lắp đặt trong mọi công trình dân dụng và chuyên dụng.",
      "Tham gia thiết kế và thi công nhiều dự án quy mô lớn với nhiều giải pháp tối ưu trong kiến trúc hiện đại.",
    ],
    experience:
      "Phụ trách bộ phận tư vấn thiết kế và thi công cho các dự án bất động sản và công trình dân dụng.",
    current:
      "Giám đốc dự án tại Kepler, phụ trách mảng thiết kế và thi công cho các dự án bất động sản và công trình dân dụng.",
    certifications: ["Chứng chỉ hành nghề Kiến trúc sư"],
    projects: [
      { title: "Thiết kế và thi công dự án quy mô lớn", description: "Giải pháp tối ưu trong kiến trúc hiện đại.", href: "/news" },
    ],
    articles: [
      { title: "Giải pháp kiến trúc bền vững", date: "2024-07-08", href: "/news" },
    ],
  },
  {
    slug: "tdv-nguyen-quoc-dat",
    name: "Nguyễn Quốc Đạt",
    prefix: "Thẩm định viên",
    role: "Thẩm định viên — Phụ trách kỹ thuật thẩm định giá tài sản",
    field: "Thẩm định giá",
    category: "Thẩm định giá",
    avatar: "/images/banner-3.jpg",
    bio: [
      "Thành viên, cổ đông của Kepler Property.",
      "Chịu trách nhiệm về các kỹ thuật thẩm định giá tài sản, tài chính doanh nghiệp.",
    ],
    experience:
      "Từng là trưởng phó phòng định giá của Công ty TNHH Thẩm Định Bất Động Sản Hoàng Quân.",
    current:
      "Giám đốc Công ty TNHH Thẩm định giá — phụ trách các nghiệp vụ thẩm định giá cho Kepler.",
    certifications: ["Thẻ Thẩm định viên — Bộ Tài chính"],
    projects: [
      { title: "Thẩm định giá tài sản doanh nghiệp", description: "Định giá tài sản cho mục đích tài chính và M&A.", href: "/news" },
    ],
    articles: [
      { title: "Phương pháp tiếp cận trong thẩm định giá BĐS", date: "2024-03-15", href: "/news" },
    ],
  },
  {
    slug: "ls-luu-quang-phu",
    name: "Lưu Quang Phú",
    prefix: "Luật sư",
    role: "Tư vấn luật — Phụ trách mảng tư vấn luật đầu tư và pháp lý bất động sản",
    field: "Pháp lý",
    category: "Luật",
    avatar: "/images/bg-home.jpg",
    bio: [
      "Nhiều năm kinh nghiệm và trực tiếp xử lý rất nhiều trường hợp liên quan đến luật đầu tư và pháp lý bất động sản.",
    ],
    experience:
      "Từng là Giám đốc Công ty luật Hoàng Quân (Thành viên của Hệ thống bất động sản Hoàng Quan Group).",
    current:
      "Hiện là Giám đốc Công ty Luật OpenLaw — phụ trách mảng tư vấn luật đầu tư và pháp lý bất động sản cho Kepler.",
    certifications: ["Chứng chỉ hành nghề Luật sư — Bộ Tư pháp"],
    projects: [
      { title: "Tư vấn pháp lý dự án đầu tư", description: "Cấu trúc pháp lý cho giao dịch đầu tư bất động sản.", href: "/news" },
    ],
    articles: [
      { title: "Lưu ý pháp lý trong giao dịch BĐS", date: "2024-04-05", href: "/news" },
    ],
  },
  {
    slug: "ks-vo-minh-giao",
    name: "Võ Minh Giáo",
    prefix: "Kỹ sư",
    role: "Khai thác vận hành — Cán bộ chủ lực về quản lý và vận hành tòa nhà",
    field: "Quản lý vận hành",
    category: "Quản lý vận hành",
    avatar: "/images/image-111.png",
    bio: [
      "Hơn 20 năm kinh nghiệm trong lĩnh vực tư vấn và quản lý – vận hành kỹ thuật tại các bất động sản.",
      "Quản lý tài sản và vận hành các tòa nhà quy mô lớn như Everrich, Imperia, Nam Á Building, SCB Building.",
      "Kinh nghiệm tại các khách sạn lớn: Sofitel Plaza Saigon, Windsor Plaza Hotel, Saigon Center, Asia Refrigeration Corporation, New World Hotel Saigon.",
    ],
    experience:
      "Cán bộ chủ lực về việc quản lý và vận hành tòa nhà tại Kepler.",
    current:
      "Hiện ông Giáo là Giám đốc viện đào tạo quản lý VCG.",
    certifications: ["Chứng chỉ Quản lý vận hành tòa nhà"],
    projects: [
      { title: "Vận hành Everrich & Imperia", description: "Quản lý kỹ thuật và vận hành các tòa nhà quy mô lớn.", href: "/news" },
    ],
    articles: [
      { title: "Tối ưu chi phí vận hành tòa nhà", date: "2024-05-12", href: "/news" },
    ],
  },
  {
    slug: "cg-nguyen-hoang-nam",
    name: "Nguyễn Hoàng Nam",
    prefix: "Chuyên gia",
    role: "Quản lý dự án — Cán bộ chủ lực về quản lý và điều phối phát triển dự án bất động sản",
    field: "Bất động sản",
    category: "Bất động sản",
    avatar: "/images/image-112.png",
    bio: [
      "Nhiều năm kinh nghiệm trong quản lý tiến độ, chi phí, pháp lý, thiết kế, lựa chọn nhà thầu và điều phối các bên liên quan.",
      "Quản lý từ giai đoạn chuẩn bị đầu tư đến triển khai và bàn giao dự án.",
    ],
    experience:
      "Cán bộ chủ lực về quản lý và điều phối phát triển dự án bất động sản tại Kepler.",
    current:
      "Phụ trách quản lý và điều phối phát triển dự án bất động sản tại Kepler.",
    certifications: ["Chứng chỉ Quản lý dự án"],
    projects: [
      { title: "Quản lý dự án bất động sản", description: "Điều phối từ giai đoạn chuẩn bị đến bàn giao.", href: "/news" },
    ],
    articles: [
      { title: "Quản lý tiến độ dự án BĐS hiệu quả", date: "2024-08-01", href: "/news" },
    ],
  },
  {
    slug: "cg-tran-minh-duc",
    name: "Trần Minh Đức",
    prefix: "Chuyên gia",
    role: "Tài chính bất động sản — Cán bộ chủ lực về phân tích tài chính và cấu trúc vốn",
    field: "Tài chính",
    category: "Tài chính",
    avatar: "/images/banner-1.png",
    bio: [
      "Chuyên xây dựng mô hình tài chính, phân tích dòng tiền, hiệu quả đầu tư, IRR, NPV.",
      "Đánh giá khả năng huy động vốn và các phương án tài chính phù hợp với từng giai đoạn phát triển dự án.",
    ],
    experience:
      "Cán bộ chủ lực về phân tích tài chính và cấu trúc vốn cho dự án bất động sản tại Kepler.",
    current:
      "Phụ trách phân tích tài chính và cấu trúc vốn cho các dự án bất động sản tại Kepler.",
    certifications: ["Chứng chỉ Phân tích tài chính"],
    projects: [
      { title: "Mô hình tài chính dự án BĐS", description: "Xây dựng mô hình tài chính và cấu trúc vốn cho dự án.", href: "/news" },
    ],
    articles: [
      { title: "Phân tích IRR, NPV trong đầu tư BĐS", date: "2024-09-01", href: "/news" },
    ],
  },
  {
    slug: "cg-pham-quoc-anh",
    name: "Phạm Quốc Anh",
    prefix: "Chuyên gia",
    role: "Quy hoạch đô thị — Cán bộ chủ lực về quy hoạch và phát triển không gian đô thị",
    field: "Quy hoạch đô thị",
    category: "Quy hoạch đô thị",
    avatar: "/images/banner-2.jpg",
    bio: [
      "Kinh nghiệm nghiên cứu quy hoạch sử dụng đất, quy hoạch đô thị, tổ chức không gian, hạ tầng.",
      "Định hướng phát triển dự án phù hợp với chiến lược phát triển của khu vực.",
    ],
    experience:
      "Cán bộ chủ lực về quy hoạch và phát triển không gian đô thị tại Kepler.",
    current:
      "Phụ trách quy hoạch và phát triển không gian đô thị cho các dự án tại Kepler.",
    certifications: ["Chứng chỉ Quy hoạch đô thị"],
    projects: [
      { title: "Nghiên cứu quy hoạch dự án BĐS", description: "Định hướng phát triển phù hợp với chiến lược khu vực.", href: "/news" },
    ],
    articles: [
      { title: "Quy hoạch đô thị và phát triển BĐS", date: "2024-10-01", href: "/news" },
    ],
  },
  {
    slug: "cg-le-minh-khoa",
    name: "Lê Minh Khoa",
    prefix: "Chuyên gia",
    role: "Thiết kế đô thị thông minh — Cán bộ chủ lực về thiết kế đô thị và ứng dụng giải pháp thông minh",
    field: "Thiết kế đô thị",
    category: "Thiết kế đô thị",
    avatar: "/images/banner-3.jpg",
    bio: [
      "Tập trung vào tổ chức không gian đô thị, kiến trúc cảnh quan, giao thông, hạ tầng số, dữ liệu.",
      "Ứng dụng các giải pháp công nghệ nhằm nâng cao hiệu quả vận hành, chất lượng môi trường sống và giá trị tài sản.",
    ],
    experience:
      "Cán bộ chủ lực về thiết kế đô thị và ứng dụng giải pháp thông minh trong phát triển bất động sản tại Kepler.",
    current:
      "Phụ trách thiết kế đô thị thông minh cho các dự án tại Kepler.",
    certifications: ["Chứng chỉ Thiết kế đô thị"],
    projects: [
      { title: "Giải pháp đô thị thông minh", description: "Ứng dụng công nghệ trong phát triển BĐS.", href: "/news" },
    ],
    articles: [
      { title: "Đô thị thông minh và BĐS", date: "2024-11-01", href: "/news" },
    ],
  },
];

export function getExpertBySlug(slug: string): Expert | undefined {
  return experts.find((e) => e.slug === slug);
}
