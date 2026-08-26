# Tổng quan Trang chủ — Kepler Frontend

## Tech Stack
- **Framework:** Next.js App Router (`src/app/`)
- **Styling:** TailwindCSS + custom CSS
- **UI Libs:** Swiper (carousel), Framer Motion (animation), shadcn/ui
- **i18n:** react-i18next (vi/en)
- **API:** REST API qua auto-generated hooks (`@/api/endpoints/*`)
- **Backend:** `https://kepler-dev.meucorp.com` (config tại `src/configs/base.ts`)
- **Admin:** `https://kepler-dev.meucorp.com/admin` (login → quản lý posts, categories, page-config)

---

## Cấu trúc Routing
```
src/app/
├── (home)/           → Trang chủ (route group, URL: /)
│   ├── page.tsx      → Home page entry point
│   └── _views/       → Các section components
├── news/             → Trang tin tức
│   ├── page.tsx      → List page
│   ├── [slug]/       → Detail page
│   └── components/   → News-specific components
├── du-an/            → Trang dự án
│   ├── page.tsx      → List page
│   └── [slug]/       → Detail page
├── about/            → Trang giới thiệu
├── services/         → Trang dịch vụ
├── he-sinh-thai/     → Trang hệ sinh thái
└── realhub/          → Trang RealHub
```

---

## API System

### Post API (`useGetApiV10Post`)
Lấy bài viết từ backend. Các params quan trọng:
- `page_id`: ID vị trí (từ `PAGE_IDS`) — xác định bài viết hiện ở section nào
- `category_id`: Lọc theo danh mục (có thể truyền nhiều ID cách nhau bằng dấu phẩy)
- `filters`: `"is_hidden==false"` — chỉ lấy bài viết đã publish
- `position`: `"true"` — sắp xếp theo vị trí
- `sortOrderPosition`: `"ASC"`
- `filterBy`: `"CLIENT"` — chỉ lấy bài viết client
- `pageSize`: Số bài viết mỗi trang

### Category API (`useGetApiV10Category`)
Lấy danh mục. Cấu trúc:
```
Category {
  id: string
  name: string
  link: string        // URL path, vd: "/news", "/du-an", "/khach-hang"
  categories: Category[]  // sub-categories
}
```

### PageConfig API (`useGetApiV10PageConfig`)
Lấy config JSON cho các section đặc biệt (vd: `ECOSYSTEM_MEMBERS`).
- `filters`: `"key==CONFIG_KEY"`
- Trả về JSON string, parse trong component

### PAGE_IDS (`src/constants/page-ids.ts`)
Map các vị trí (position) trên trang → UUID. Admin gán bài viết vào vị trí để hiện đúng section:
- `HOME_PROJECTS` — Dự án tiêu biểu trên trang chủ
- `HOME_NEWS` — Tin tức trên trang chủ
- `HOME_LATEST_NEWS` — Tin mới nhất (sidebar)
- `LATEST_POSTS` — Vị trí chung (dùng cho /du-an)
- `SERVICE_POSITION` — Dịch vụ (English)

---

## Trang chủ — Các Section

### Thứ tự render (file: `src/app/(home)/page.tsx`)

| # | Component | Heading | Trạng thái | Nguồn data |
|---|-----------|---------|------------|------------|
| 1 | `HeroBanner` | "KIẾN TẠO VÀ PHÁT TRIỂN BẤT ĐỘNG SẢN BỀN VỮNG" | Active | Hardcoded + link `/dich-vu`, `/dat-lich-tu-van` |
| 2 | `IntroSection` | "Giải pháp toàn diện cho bất động sản và doanh nghiệp" | Active | Hardcoded + link `/about` |
| 3 | `StatsSection` | "Những con số tạo nên năng lực" | Active | Hardcoded |
| 4 | `EcosystemSection` | "6 thương hiệu thành viên" | Active | PageConfig API (`ECOSYSTEM_MEMBERS`) + fallback hardcoded |
| 5 | `ServicesSection` | "Dự án tiêu biểu" / "Dự án" | Active | Post API (`HOME_PROJECTS` page_id) + fallback mockPosts |
| 6 | `CustomersSection` | "Khách hàng đã đồng hành" | Active | Post API (category `/khach-hang`) + fallback hardcoded |
| 7 | `PartnersSection` | "Đối tác của Kepler" | Active | Post API (category `/doi-tac`) + fallback hardcoded |
| 8 | `NewsSection` | "Góc nhìn thị trường" | Active | Post API (`HOME_NEWS` + `HOME_LATEST_NEWS` page_id) + fallback mockPosts |
| 9 | `WhyChooseUsSection` | "Tại sao chọn Kepler" | Active | Hardcoded |
| 10 | `CtaSection` | "Cùng Kepler kiến tạo giá trị cho dự án của bạn" | Active | Hardcoded + link `/dat-lich-tu-van`, `/lien-he` |

### Các section bị comment out (tạm tắt)
- `ServicesSection` (line 41) — bị comment nhưng chạy lại ở line 54 (dùng cho dự án)
- `SolutionsSection` (line 44) — Giải pháp theo đối tượng
- `ProcessSection` (line 47) — Quy trình làm việc
- `CaseStudySection` (line 56) — Case Study (trang đích `/danh-sach-case-study` chưa tạo)

---

## Chi tiết từng Section

### 1. HeroBanner (`_views/banner-section.tsx`)
- Hero banner chính, ảnh nền + CTA buttons
- Links: `/dich-vu`, `/dat-lich-tu-van`
- Data: Hardcoded trong component

### 2. IntroSection (`_views/intro-section.tsx`)
- Section giới thiệu ngắn, 2 CTA buttons
- Links: `/about`
- Data: Hardcoded

### 3. StatsSection (`_views/stats-section.tsx`)
- Hiển thị con số nổi bật (số năm kinh nghiệm, số dự án, v.v.)
- Data: Hardcoded

### 4. EcosystemSection (`_views/ecosystem-section.tsx`)
- Danh sách 6 thương hiệu thành viên + ảnh preview đổi theo hover
- Data: `PageConfig` API key `ECOSYSTEM_MEMBERS` (JSON: `{ members: EcosystemMember[] }`)
- Fallback: 6 thương hiệu hardcoded (Kepler Property, KPC Appraisal, KMC Management, KAC Advisory, K-Homes, RealHub)
- Mỗi member có: `name`, `description`, `image`, `logo`, `tags`, `link`
- Link: `/he-sinh-thai/{slug}`

### 5. ServicesSection (`_views/services-section.tsx`) — Hiển thị "Dự án tiêu biểu"
- **Lưu ý:** Component tên `ServicesSection` nhưng hiển thị "Dự án tiêu biểu" / "Dự án"
- Swiper carousel 4 slides/desktop
- Data: Post API với `page_id = HOME_PROJECTS` (vi) / `SERVICE_POSITION` (en)
- Mỗi card: ảnh thumbnail, title, summary, date, link `/du-an/{slug}`
- Fallback: `mockPosts` từ `@/utils/mock-data`
- Link "Xem tất cả": `/du-an`

### 6. CustomersSection (`_views/customers-section.tsx`)
- Swiper carousel effect coverflow, hiển thị khách hàng
- Data: Post API lọc theo category `/khach-hang` (root category)
  - Sub-categories: "Khách hàng cá nhân cao cấp", "Khách hàng doanh nghiệp tiêu biểu"
- Mỗi card: logo (thumbnail), tên (title), sector (category name)
- Fallback: 6 khách hàng hardcoded
- Category root ID: `f263de86-ec00-4394-b8df-0b3a828c8cbb`

### 7. PartnersSection (`_views/partners-section.tsx`)
- Swiper carousel auto-scroll, hiển thị đối tác
- Data: Post API lọc theo category `/doi-tac` (root category)
  - Sub-categories: "Đối tác chiến lược", "Quỹ đầu tư", "PropTech", "Mạng lưới phân phối", "Ngân hàng", "Thẩm định giá & pháp lý"
- Mỗi item: logo (thumbnail), tên (title)
- Fallback: 6 đối tác hardcoded
- Category root ID: `72818b3b-3379-4e24-ab93-bb5ebabf2c1d`

### 8. NewsSection (`_views/news-section.tsx`)
- Layout 2 cột: main content (7/10) + sidebar latest news (3/10)
- Main: Post API với `page_id = HOME_NEWS` (vi) / `HOMEPAGE_NEWS_POSITION` (en), lọc theo category `/news`
- Sidebar: Post API với `page_id = HOME_LATEST_NEWS` (vi) / `HOMEPAGE_LATEST_NEWS_POSITION` (en)
- Mỗi card: ảnh, category badge, date, title, summary, link `/news/{slug}`
- Fallback: `mockPosts`
- Tabs: dynamically generated từ sub-categories của `/news`

### 9. WhyChooseUsSection (`_views/why-choose-us-section.tsx`)
- Section "Tại sao chọn Kepler" — lý do chọn Kepler
- Data: Hardcoded

### 10. CtaSection (`_views/cta-section.tsx`)
- CTA cuối trang — 2 buttons
- Links: `/dat-lich-tu-van`, `/lien-he`
- Data: Hardcoded

---

## Category Structure (Backend)

```
/news                          → Tin tức
├── /news/thi-truong           → Thị trường
├── /news/bat-dong-san         → Bất động sản
└── /news/tai-chinh            → Tài chính

/du-an (sub-category dưới /realhub)
├── (sub-categories dự án)

/khach-hang                    → Khách hàng (ID: f263de86-...)
├── /khach-hang/khach-hang-ca-nhan
└── /khach-hang/khach-hang-doanh-nghiep

/doi-tac                       → Đối tác (ID: 72818b3b-...)
├── /doi-tac/doi-tac-chien-luoc
├── /doi-tac/quy-dau-tu
├── /doi-tac/proptech
├── /doi-tac/mang-luoi-phan-phoi
├── /doi-tac/ngan-hang
└── /doi-tac/tham-dinh-gia-phap-ly

/customers-partners            → (Cũ — đã tách thành /khach-hang và /doi-tac)
```

---

## Cách Admin quản lý nội dung trang chủ

### Thêm/sửa dự án (section "Dự án tiêu biểu")
1. Admin → Tạo/sửa bài viết (Post)
2. Gán vào category `/du-an` hoặc sub-category
3. Gán `position` = `HOME_PROJECTS` (ID: `52c42fba-3451-4801-a961-64a6c0db0dd1`)
4. Bài viết sẽ hiện trên trang chủ section "Dự án" và trang `/du-an`

### Thêm/sửa tin tức (section "Góc nhìn thị trường")
1. Admin → Tạo/sửa bài viết
2. Gán vào category `/news` hoặc sub-category
3. Gán `position` = `HOME_NEWS` (ID: `88139632-283c-4fc8-b96d-a717a47a2d0a`)
4. Tin mới nhất: gán `position` = `HOME_LATEST_NEWS` (ID: `c91d06f2-e01d-4ce9-953c-10dfb6866466`)

### Thêm/sửa khách hàng (section "Khách hàng đã đồng hành")
1. Admin → Tạo bài viết mới
2. Title = Tên khách hàng, Thumbnail = Logo
3. Gán vào category `/khach-hang` (sub: "Khách hàng cá nhân cao cấp" hoặc "Khách hàng doanh nghiệp tiêu biểu")
4. Bài viết sẽ hiện trên trang chủ section "Khách hàng"

### Thêm/sửa đối tác (section "Đối tác của Kepler")
1. Admin → Tạo bài viết mới
2. Title = Tên đối tác, Thumbnail = Logo
3. Gán vào category `/doi-tac` (chọn sub-category phù hợp)
4. Bài viết sẽ hiện trên trang chủ section "Đối tác"

### Quản lý hệ sinh thái (section "6 thương hiệu thành viên")
1. Admin → Cài đặt chung → PageConfig
2. Key: `ECOSYSTEM_MEMBERS`
3. Value: JSON `{ "members": [{ "slug", "name", "eyebrow", "description", "image", "logo", "tags", "link" }] }`
4. Nếu không có config, fallback 6 thương hiệu hardcoded sẽ hiện

---

## File Map (Trang chủ)

```
src/app/(home)/
├── page.tsx                          → Entry point, render tất cả sections
└── _views/
    ├── banner-section.tsx            → Hero banner
    ├── intro-section.tsx             → Giới thiệu ngắn
    ├── stats-section.tsx             → Con số nổi bật
    ├── ecosystem-section.tsx         → Hệ sinh thái (PageConfig API)
    ├── services-section.tsx          → Dự án tiêu biểu (Post API, HOME_PROJECTS)
    ├── solutions-section.tsx         → [COMMENTED OUT] Giải pháp theo đối tượng
    ├── process-section.tsx           → [COMMENTED OUT] Quy trình làm việc
    ├── news-section.tsx              → Góc nhìn thị trường (Post API, HOME_NEWS)
    ├── case-study-section.tsx        → [COMMENTED OUT] Case Study
    ├── customers-section.tsx         → Khách hàng (Post API, category /khach-hang)
    ├── partners-section.tsx          → Đối tác (Post API, category /doi-tac)
    ├── why-choose-us-section.tsx     → Tại sao chọn Kepler
    └── cta-section.tsx               → CTA cuối trang
```

---

## Key Imports
- `PAGE_IDS` → `@/constants/page-ids`
- `useGetApiV10Post` → `@/api/endpoints/post`
- `useGetApiV10Category` → `@/api/endpoints/category`
- `useGetApiV10PageConfig` → `@/api/endpoints/page-config`
- `baseConfig` → `@/configs/base` (backendDomain, imgEndpointDomain)
- `getThumbnailSrc` / `getResponsiveImage` → `@/lib/responsive-image`
- `PostExtended` → `@/types/post`
- `mockPosts` → `@/utils/mock-data`
- `slugify` → `@/lib/slugify`
- `SafeImage` → `@/components/common/safe-image`
