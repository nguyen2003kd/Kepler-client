export const PAGE_IDS = {
  // ========== TRANG CHỦ ==========
  /** Vị trí dự án ở trang chủ */
  HOME_PROJECTS: "52c42fba-3451-4801-a961-64a6c0db0dd1",
  /** Vị trí case study ở trang chủ */
  HOME_CASE_STUDY: "089305bb-3b3d-46b8-85ec-883dda1c8258",
  /** Vị trí tin tức ở trang chủ */
  HOME_NEWS: "88139632-283c-4fc8-b96d-a717a47a2d0a",

  /** Vị trí tin mới ở trang chủ */
  HOME_LATEST_NEWS: "c91d06f2-e01d-4ce9-953c-10dfb6866466",

  /** Vị trí tài liệu ở trang chủ */
  HOME_CAPABILITIES: "f5577d43-9d31-485e-9eed-08ce8d40e465",

  /** Vị trí tài liệu mới ở trang chủ */
  HOME_NEW_CAPABILITIES: "f21e6667-cdfb-47c6-8b7e-c797bb5d5808",

  /** Vị trí hỗ trợ doanh nghiệp ở trang chủ */
  HOME_BUSINESS_SUPPORT: "04a0fec7-fb7c-42cc-a37d-15626842d9e2",

  // ========== TRANG GIỚI THIỆU ==========
  /** Vị trí cùng chuyên mục ở trang giới thiệu */
  ABOUT_RELATED_SERVICES: "b388e6f9-d867-4826-bb76-324c028f6e0b",

  // ========== TRANG DỊCH VỤ ==========
  /** Vị trí dịch vụ mới nhất ở trang dịch vụ */
  SERVICES_LATEST: "70e5cc0f-eaa9-4da1-9049-13ade4158ffb",

  // ========== VỊ TRÍ CHUNG ==========
  /** Vị trí mới nhất (dùng chung cho nhiều trang) */
  LATEST_POSTS: "8ce2c9ab-2e4b-4821-9f98-3a207a8b29da",

  /** Vị trí tin nổi bật */
  FEATURED_NEWS: "219b8b20-d507-4778-9e18-3a1b9dc13ebd",

  // ========== ADDITIONAL POSITIONS (English) ==========
  /** Service Position */
  SERVICE_POSITION: "c3386da5-c3ef-4f9c-b39c-6049ac853aa5",

  /** Homepage News Position */
  HOMEPAGE_NEWS_POSITION: "c715c39c-d2b6-4735-86b0-2488d988a6bb",

  /** Homepage Latest News Position */
  HOMEPAGE_LATEST_NEWS_POSITION: "8cdc3c59-f648-49e5-8109-24ff51e85b85",

  /** Homepage Document Position */
  HOMEPAGE_DOCUMENT_POSITION: "74daab4d-3a34-49d3-9b5a-03ddf18bf966",

  /** Homepage Capabilities Position */
  HOMEPAGE_CAPABILITIES_POSITION: "d171d7c7-1dfa-4d10-ab83-0cf0acbcade1",

  /** Homepage New Capabilities Position */
  HOMEPAGE_NEW_CAPABILITIES_POSITION: "8af9234b-a963-45e7-949d-8f1e4ae1d41d",
} as const;

export type PageIdKey = keyof typeof PAGE_IDS;

export type PageIdValue = (typeof PAGE_IDS)[PageIdKey];
