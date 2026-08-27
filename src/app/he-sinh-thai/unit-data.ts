export interface EcosystemUnit {
  name: string;
  eyebrow: string;
  description: string;
  items: string[];
  overview: string;
  industries: string[];
  products: string[];
  clients: string;
  image?: string;
}

export const units: Record<string, EcosystemUnit> = {
  "kepler-property": {
    name: "Kepler Property – KPC Group",
    eyebrow: "Tư vấn & Phát triển BĐS",
    image: "/images/banner-1.png",
    description:
      "Công ty đầu mối chủ lực chính điều phối hệ sinh thái Kepler, cung cấp các dịch vụ tư vấn và giải pháp tổng thể trong lĩnh vực bất động sản, từ đầu tư, thẩm định, phát triển dự án, M&A đến quản lý, khai thác và tối ưu tài sản.",
    items: ["Tư vấn đầu tư", "Môi giới", "Leasing", "Phát triển dự án"],
    overview:
      "Kepler Property – KPC Group định hướng trở thành nền tảng tư vấn và phát triển bất động sản chuyên nghiệp, lấy dữ liệu – chuyên môn – mạng lưới – công nghệ làm nền tảng. KPC tập trung giải quyết các bài toán xuyên suốt vòng đời bất động sản: từ ý tưởng đầu tư, đánh giá cơ hội, phát triển dự án đến đưa tài sản vào vận hành, khai thác và tối ưu giá trị.",
    industries: [
      "Tư vấn phát triển dự án",
      "Tư vấn chiến lược tài sản",
      "Thẩm định và phân tích giá trị",
      "Mua bán & sáp nhập bất động sản",
      "Tư vấn huy động và cấu trúc vốn",
      "Marketing & bán hàng bất động sản",
      "Quản lý và khai thác tài sản",
      "Tư vấn tái cấu trúc và tối ưu tài sản",
      "Lên ý tưởng đầu tư và giải pháp đầu tư",
      "Lập concept thiết kế cho dự án",
      "Phát triển hệ sinh thái và nền tảng công nghệ bất động sản",
    ],
    products: [
      "Tư vấn đầu tư",
      "Tư vấn phát triển dự án",
      "Chiến lược tài sản",
      "Tư vấn M&A",
      "Thẩm định giá bất động sản",
      "Quản lý tài sản & bất động sản",
      "Marketing & bán hàng bất động sản",
      "Nền tảng RealHub",
    ],
    clients:
      "Chủ đầu tư, doanh nghiệp bất động sản, nhà đầu tư cá nhân/tổ chức, quỹ đầu tư, ngân hàng, tổ chức tài chính và chủ sở hữu tài sản.",
  },
  "kpc-appraisal": {
    name: "Kepler Appraisal – KAC",
    eyebrow: "Thẩm định giá & Tư vấn giá trị",
    image: "/images/banner-2.jpg",
    description:
      "Đơn vị chuyên về thẩm định giá và tư vấn giá trị tài sản, cung cấp các giải pháp đánh giá độc lập cho bất động sản, dự án, doanh nghiệp và các tài sản liên quan.",
    items: [
      "Bất động sản",
      "Máy móc - thiết bị",
      "Giá trị doanh nghiệp",
      "Dự án",
    ],
    overview:
      "KAC tập trung xây dựng năng lực chuyên sâu về thẩm định giá, phân tích thị trường và tư vấn giá trị, phục vụ cả mục đích pháp lý, tài chính và đầu tư. KAC kết hợp phương pháp thẩm định chuyên nghiệp với dữ liệu thị trường và phân tích đầu tư để hỗ trợ khách hàng ra quyết định tài chính, đầu tư và giao dịch.",
    industries: [
      "Thẩm định giá bất động sản",
      "Thẩm định giá dự án",
      "Thẩm định giá tài sản",
      "Thẩm định giá doanh nghiệp",
      "Thẩm định giá máy móc thiết bị",
      "Tư vấn giá trị đầu tư",
      "Phân tích thị trường và giá bất động sản",
      "Tư vấn giá trị phục vụ M&A",
      "Tư vấn giá trị tài sản phục vụ tái cấu trúc",
    ],
    products: [
      "Báo cáo thẩm định giá",
      "Báo cáo định giá thị trường",
      "Định giá đầu tư",
      "Phân tích khả thi & tài chính",
      "Định giá M&A",
      "Rà soát & định giá tài sản",
    ],
    clients:
      "Ngân hàng, doanh nghiệp, chủ đầu tư, nhà đầu tư, tổ chức tài chính, cơ quan/tổ chức có nhu cầu xác định giá trị tài sản.",
  },
  "kmc-management": {
    name: "Kepler Management – KMC",
    eyebrow: "Quản lý BĐS & Tài sản",
    image: "/images/bg-home.jpg",
    description:
      "Chuyên quản lý, vận hành, khai thác và tối ưu giá trị bất động sản, từ tòa nhà văn phòng, thương mại đến danh mục tài sản và dự án.",
    items: [
      "Quản lý tòa nhà",
      "Quản lý tài sản",
      "Quản lý kỹ thuật",
      "Quản lý tài chính",
    ],
    overview:
      "KMC cung cấp giải pháp quản lý bất động sản theo vòng đời tài sản, hướng tới chuyển tài sản từ trạng thái 'đang sở hữu' thành 'đang tạo ra giá trị'. KMC kết hợp quản lý vận hành, kỹ thuật, tài chính, khách thuê, cho thuê và quản trị tài sản nhằm nâng cao hiệu suất vận hành, dòng tiền và giá trị tài sản.",
    industries: [
      "Quản lý bất động sản",
      "Quản lý tài sản",
      "Quản lý vận hành tòa nhà",
      "Vận hành công trình",
      "Quản lý kỹ thuật",
      "Quản lý cho thuê",
      "Quản lý khách thuê",
      "Quản lý tài chính & ngân sách",
      "Quản lý bảo trì",
      "Tối ưu hóa tài sản",
      "Marketing bất động sản",
      "Quản lý bất động sản số",
    ],
    products: [
      "Quản lý tòa nhà",
      "Quản lý văn phòng",
      "Quản lý tài sản",
      "Quản lý danh mục bất động sản",
      "Tư vấn tăng hiệu suất khai thác",
      "Dịch vụ cho thuê & khách thuê",
      "Chương trình tối ưu tài sản",
      "Bảng điều khiển tài sản",
    ],
    clients:
      "Chủ sở hữu tòa nhà, chủ đầu tư, doanh nghiệp, nhà đầu tư và các tổ chức sở hữu danh mục bất động sản.",
  },
  "kac-advisory": {
    name: "Kepler M&A – KMAC",
    eyebrow: "M&A & Tư vấn BĐS doanh nghiệp",
    image: "/images/banner-3.jpg",
    description:
      "Chuyên tư vấn mua bán & sáp nhập, chuyển nhượng dự án, doanh nghiệp và tài sản bất động sản, kết nối bên bán, bên mua và nguồn vốn.",
    items: ["Tư vấn đầu tư", "M&A", "Tái cấu trúc", "Tư vấn tài chính"],
    overview:
      "KMAC là đơn vị chuyên trách các giao dịch bất động sản có cấu trúc phức tạp, tập trung vào việc tạo lập và thực hiện các thương vụ có giá trị. KMAC hỗ trợ toàn bộ quá trình từ tìm kiếm cơ hội, định giá, phân tích thương vụ, thẩm định chi tiết, đàm phán đến hoàn tất giao dịch.",
    industries: [
      "Mua bán & sáp nhập doanh nghiệp",
      "Mua bán & sáp nhập dự án bất động sản",
      "Chuyển nhượng dự án",
      "Mua bán tài sản",
      "Tìm kiếm nhà đầu tư",
      "Tư vấn thoái vốn",
      "Tư vấn huy động vốn",
      "Thẩm định chi tiết",
      "Định giá",
      "Cấu trúc giao dịch",
      "Tư vấn giao dịch",
    ],
    products: [
      "Tư vấn M&A",
      "Hồ sơ giới thiệu đầu tư",
      "Bản ghi nhớ thông tin",
      "Định giá & mô hình tài chính",
      "Điều phối thẩm định chi tiết",
      "Quản lý giao dịch",
      "Khởi tạo thương vụ",
    ],
    clients:
      "Chủ đầu tư, doanh nghiệp, nhà đầu tư, quỹ đầu tư, tổ chức tài chính và chủ sở hữu dự án/tài sản.",
  },
  "k-homes": {
    name: "Kepler Construction – KCC",
    eyebrow: "Thiết kế – Xây dựng – Quản lý thi công",
    image: "/images/image-111.png",
    description:
      "Cung cấp giải pháp thiết kế, xây dựng và quản lý triển khai dự án, kết nối giữa ý tưởng đầu tư, thiết kế và công trình thực tế.",
    items: [
      "Thiết kế kiến trúc",
      "Thiết kế nội thất",
      "Thi công",
      "Cải tạo",
    ],
    overview:
      "KCC hướng tới kiểm soát đồng bộ chất lượng – chi phí – tiến độ – công năng – hiệu quả khai thác. KCC kết nối giữa ý tưởng đầu tư, thiết kế và công trình thực tế, đảm bảo giải pháp thiết kế thực tế, đồng bộ và hiệu quả.",
    industries: [
      "Thiết kế kiến trúc",
      "Thiết kế nội thất",
      "Thiết kế đô thị",
      "Thiết kế cảnh quan",
      "Quản lý thiết kế",
      "Quản lý thi công",
      "Thi công tổng thể",
      "Cải tạo & hoàn thiện nội thất",
      "Phối hợp hệ thống cơ điện",
      "Quản lý dự án",
      "Kiểm soát chất lượng",
    ],
    products: [
      "Thiết kế ý tưởng",
      "Phát triển thiết kế",
      "Hoàn thiện văn phòng",
      "Cải tạo công trình",
      "Không gian thương mại",
      "Nâng cấp bất động sản",
      "Quản lý thi công",
    ],
    clients:
      "Kiến trúc sư, kỹ sư, nhà thầu, nhà cung cấp vật liệu, đơn vị cơ điện, nội thất và các đối tác kỹ thuật.",
  },
  "kepler-land": {
    name: "Kepler Land – Sàn giao dịch BĐS",
    eyebrow: "Sàn giao dịch & Tư vấn BĐS",
    image: "/images/bg-home.jpg",
    description:
      "Đơn vị chuyên môi giới, phân phối và tư vấn giao dịch bất động sản, kết nối chủ sở hữu, chủ đầu tư, nhà đầu tư và khách hàng có nhu cầu mua – bán – thuê.",
    items: [
      "Mua bán BĐS",
      "Cho thuê BĐS",
      "Đầu tư BĐS",
      "Tư vấn giao dịch",
    ],
    overview:
      "Kepler Land kết hợp dữ liệu thị trường, tư vấn giá trị và năng lực marketing – bán hàng để nâng cao hiệu quả giao dịch. Kepler Land kết nối chủ sở hữu, chủ đầu tư, nhà đầu tư và khách hàng có nhu cầu mua – bán – thuê bất động sản.",
    industries: [
      "Môi giới bất động sản",
      "Phân phối dự án",
      "Mua bán bất động sản",
      "Cho thuê bất động sản",
      "Cho thuê thương mại",
      "Cho thuê văn phòng",
      "Bất động sản đầu tư",
      "Marketing & bán hàng",
      "Kết nối bất động sản",
    ],
    products: [
      "Nhà ở",
      "Đất",
      "Văn phòng",
      "Mặt bằng thương mại",
      "Bất động sản đầu tư",
      "Dự án bất động sản",
      "Tài sản chuyển nhượng",
    ],
    clients:
      "Chủ đầu tư, chủ sở hữu tài sản, nhà đầu tư, doanh nghiệp và mạng lưới môi giới/đại lý.",
  },
  realhub: {
    name: "RealHub Platform",
    eyebrow: "Nền tảng dữ liệu & công nghệ BĐS",
    image: "/images/category-banner-investment.png",
    description:
      "Nền tảng công nghệ trong hệ sinh thái Kepler, hướng tới kết nối dữ liệu – tài sản – chuyên gia – dịch vụ – nhà đầu tư – giao dịch bất động sản trên một hệ thống số.",
    items: [
      "Giới thiệu nền tảng",
      "Đối tượng sử dụng",
      "Các module dự kiến",
      "Roadmap",
    ],
    overview:
      "RealHub là nền tảng hỗ trợ Kepler phát triển mô hình công nghệ bất động sản (PropTech), từng bước số hóa quy trình tư vấn, quản lý tài sản, giao dịch và khai thác dữ liệu. RealHub kết nối dữ liệu – tài sản – chuyên gia – dịch vụ – nhà đầu tư – giao dịch bất động sản trên một hệ thống số.",
    industries: [
      "Sàn giao dịch bất động sản",
      "Cơ sở dữ liệu bất động sản",
      "Mạng lưới chuyên gia",
      "Quản lý quan hệ khách hàng (CRM)",
      "Quản lý giao dịch",
      "Bảng điều khiển tài sản",
      "Phân tích bất động sản",
      "Định giá bằng trí tuệ nhân tạo",
      "Thẩm định chi tiết số hóa",
      "Dịch vụ bất động sản số",
    ],
    products: [
      "Sàn giao dịch bất động sản",
      "Nền tảng dữ liệu bất động sản",
      "Bảng điều khiển nhà đầu tư",
      "Bảng điều khiển tài sản",
      "Phòng giao dịch số",
      "Phân tích bất động sản bằng AI",
      "Kết nối chuyên gia",
    ],
    clients:
      "Nhà đầu tư, chủ sở hữu tài sản, chủ đầu tư, môi giới, chuyên gia, doanh nghiệp và các đối tác dịch vụ bất động sản.",
  },
  bizoffice: {
    name: "Biz Space",
    eyebrow: "Văn phòng linh hoạt & Hệ sinh thái doanh nghiệp",
    image: "/images/banner-3.jpg",
    description:
      "Thương hiệu phát triển mô hình không gian làm việc linh hoạt và hệ sinh thái dịch vụ doanh nghiệp, cung cấp văn phòng, coworking, phòng họp, đào tạo và các dịch vụ hỗ trợ doanh nghiệp.",
    items: [
      "Văn phòng chia sẻ",
      "Văn phòng ảo",
      "Phòng họp & sự kiện",
      "Dịch vụ hỗ trợ",
    ],
    overview:
      "Biz Space hướng tới xây dựng môi trường làm việc – kết nối – giao thương – phát triển doanh nghiệp trong hệ sinh thái Kepler. Biz Space cung cấp giải pháp không gian làm việc linh hoạt và hệ sinh thái dịch vụ doanh nghiệp.",
    industries: [
      "Tư vấn và khai thác vận hành hệ thống văn phòng cho thuê, mặt bằng thương mại",
      "Tư vấn setup và vận hành các tiện ích văn phòng và tiện ích doanh nghiệp",
      "Xúc tiến thương mại và kết nối",
    ],
    products: [
      "Văn phòng riêng",
      "Không gian làm việc chung",
      "Văn phòng ảo",
      "Phòng họp",
      "Phòng đào tạo",
      "Không gian sự kiện",
      "Phòng chờ doanh nghiệp",
      "Coworking Space",
    ],
    clients:
      "Startup, doanh nghiệp vừa và nhỏ, chuyên gia, doanh nghiệp nước ngoài, nhà đầu tư, nhóm dự án và các doanh nghiệp cần không gian làm việc linh hoạt.",
  },
};
