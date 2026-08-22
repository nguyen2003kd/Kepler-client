export interface EcosystemUnit {
  name: string;
  eyebrow: string;
  description: string;
  items: string[];
}

export const units: Record<string, EcosystemUnit> = {
  "kepler-property": {
    name: "Kepler Property – KPC Group",
    eyebrow: "Đầu tư & Phát triển",
    description:
      "Tư vấn đầu tư, môi giới, leasing và phát triển dự án.",
    items: ["Tư vấn đầu tư", "Môi giới", "Leasing", "Phát triển dự án"],
  },
  "kpc-appraisal": {
    name: "Kepler Appraisal - KAC",
    eyebrow: "Thẩm định giá",
    description:
      "Thẩm định bất động sản, máy móc - thiết bị, giá trị doanh nghiệp và dự án.",
    items: [
      "Bất động sản",
      "Máy móc - thiết bị",
      "Giá trị doanh nghiệp",
      "Dự án",
    ],
  },
  "kmc-management": {
    name: "Kepler Managnement – KMC",
    eyebrow: "Quản lý & Vận hành",
    description:
      "Quản lý tòa nhà, tài sản, kỹ thuật, tài chính và vận hành.",
    items: [
      "Quản lý tòa nhà",
      "Quản lý tài sản",
      "Quản lý kỹ thuật",
      "Quản lý tài chính",
    ],
  },
  "kac-advisory": {
    name: "Kepler M&A – KMAC",
    eyebrow: "Tài chính & M&A",
    description:
      "Tư vấn đầu tư, M&A, tái cấu trúc, tài chính và gọi vốn.",
    items: ["Tư vấn đầu tư", "M&A", "Tái cấu trúc", "Tư vấn tài chính"],
  },
  "k-homes": {
    name: "Kepler Contruction – KCC",
    eyebrow: "Design & Build",
    description:
      "Thiết kế kiến trúc, nội thất, thi công và cải tạo công trình.",
    items: [
      "Thiết kế kiến trúc",
      "Thiết kế nội thất",
      "Thi công",
      "Cải tạo",
    ],
  },
  "kepler-land": {
    name: "Kepler Land – Sàn giao dịch bất động sản",
    eyebrow: "Sàn giao dịch BĐS",
    description:
      "Sàn giao dịch bất động sản Kepler Land — kết nối mua bán, cho thuê và đầu tư BĐS minh bạch, hiệu quả.",
    items: [
      "Mua bán BĐS",
      "Cho thuê BĐS",
      "Đầu tư BĐS",
      "Tư vấn giao dịch",
    ],
  },
  realhub: {
    name: "RealHub Platform",
    eyebrow: "PropTech Platform",
    description:
      "Nền tảng kết nối dữ liệu, tài sản, nhà đầu tư và dịch vụ.",
    items: [
      "Giới thiệu nền tảng",
      "Đối tượng sử dụng",
      "Các module dự kiến",
      "Roadmap",
    ],
  },
  bizoffice: {
    name: "BizOffice",
    eyebrow: "Văn phòng chia sẻ & Không gian làm việc",
    description:
      "BizOffice — giải pháp không gian văn phòng chia sẻ, văn phòng ảo và dịch vụ hỗ trợ doanh nghiệp.",
    items: [
      "Văn phòng chia sẻ",
      "Văn phòng ảo",
      "Phòng họp & sự kiện",
      "Dịch vụ hỗ trợ",
    ],
  },
};
