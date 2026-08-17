export interface EcosystemUnit {
  name: string;
  eyebrow: string;
  description: string;
  items: string[];
}

export const units: Record<string, EcosystemUnit> = {
  "kepler-property": {
    name: "Kepler Property",
    eyebrow: "Đầu tư & Phát triển",
    description:
      "Tư vấn đầu tư, môi giới, leasing và phát triển dự án.",
    items: ["Tư vấn đầu tư", "Môi giới", "Leasing", "Phát triển dự án"],
  },
  "kpc-appraisal": {
    name: "KPC Appraisal",
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
    name: "KMC Management",
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
    name: "KAC Advisory",
    eyebrow: "Tài chính & M&A",
    description:
      "Tư vấn đầu tư, M&A, tái cấu trúc, tài chính và gọi vốn.",
    items: ["Tư vấn đầu tư", "M&A", "Tái cấu trúc", "Tư vấn tài chính"],
  },
  "k-homes": {
    name: "K-Homes Design & Build",
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
};
