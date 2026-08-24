# Tổng quan Hệ thống — Kepler

## Kiến trúc tổng thể

```
kepler/
├── kepler-backend/          → Backend API (Node.js + Express + Sequelize + PostgreSQL)
├── kepler-frontend-2/       → Frontend Client (Next.js App Router)
└── kepler-frontend-admin/   → Admin Panel (Next.js App Router)
```

- **Backend:** Chạy ở `http://localhost:4100` (dev) / `https://kepler-dev.meucorp.com` (prod)
- **Frontend Client:** Chạy ở `http://localhost:3000` (dev)
- **Admin Panel:** Chạy ở `http://localhost:3001` (dev) / `https://kepler-dev.meucorp.com/admin` (prod)
- **Database:** PostgreSQL
- **Auth:** JWT (access_token + refresh_token), encrypt device fingerprint

---

## 1. Backend (`kepler-backend/`)

### Tech Stack
- Node.js + Express + TypeScript
- Sequelize ORM + PostgreSQL
- JWT auth + device fingerprint validation
- File upload (local storage)

### API Endpoints (auto-generated cho frontend)
Base URL: `/api/v1.0/`

| Endpoint | Mô tả |
|----------|-------|
| `/auth/login` | Đăng nhập (email + password) |
| `/auth/refresh` | Refresh token |
| `/post` | CRUD bài viết (Post) |
| `/post/slug/{slug}` | Lấy bài viết theo slug |
| `/category` | CRUD danh mục (Category) |
| `/page-config` | CRUD config JSON (PageConfig) |
| `/file` | Upload/download file |
| `/banner` | CRUD banner |
| `/footer` | CRUD footer |
| `/logo` | CRUD logo |
| `/service` | CRUD dịch vụ |
| `/quotation` | CRUD báo giá |
| `/quotation-status` | Trạng thái báo giá |
| `/contact` | CRUD liên hệ |
| `/recruitment` | CRUD tuyển dụng |
| `/candidate` | CRUD ứng viên |
| `/department` | CRUD phòng ban |
| `/user` | CRUD người dùng |
| `/role` | CRUD vai trò |
| `/permission` | CRUD quyền |
| `/role-permission` | Gán quyền cho vai trò |
| `/user-role` | Gán vai trò cho user |
| `/user-department` | Gán phòng ban cho user |
| `/notification` | CRUD thông báo |
| `/organization-chart` | CRUD sơ đồ tổ chức |
| `/work-schedule` | CRUD lịch công tác |
| `/schedule-participant` | Người tham gia lịch công tác |
| `/appointment` | CRUD lịch hẹn |
| `/calibration` | CRUD hiệu chuẩn |
| `/receive-method` | Phương thức nhận |
| `/question` | CRUD câu hỏi tuyển dụng |
| `/province` | Danh sách tỉnh thành |
| `/analytics` | Thống kê |
| `/email` | Gửi email |
| `/health` | Health check |
| `/page-post` | Vị trí bài viết trên page |
| `/post-category` | Gán bài viết vào danh mục |
| `/post-approval-history` | Lịch sử duyệt bài |
| `/page` | CRUD page |

### Auth System
- Login: `POST /auth/login` → trả `access_token` + `refresh_token`
- Token lưu trong localStorage (client) / cookie (admin)
- Device fingerprint validation (canvas fingerprint + session key)
- Account lockout sau 5 lần sai liên tiếp (15 phút)
- Password hash: bcrypt

### Post System (Quan trọng nhất)
Post (bài viết) là entity trung tâm, dùng cho:
- Tin tức (news)
- Dự án (du-an)
- Khách hàng (khach-hang)
- Đối tác (doi-tac)
- Dịch vụ (services)
- Kiến thức (kien-thuc)

Mỗi Post có:
- `title`, `slug`, `summary`, `post_content` (HTML)
- `thumbnail_path`, `thumbnail_compress_info`
- `category_id` → gán vào 1 danh mục
- `position` → gán vào 1 vị trí (page_id) để hiện trên trang cụ thể
- `is_hidden` → ẩn/hiện
- `created_at`, `updated_at`
- `created_by` → UUID người tạo

### Category System
- Cấu trúc cây: Root category → Sub-categories
- Mỗi category có: `name`, `code`, `link` (URL path), `parent_category_id`, `is_service`
- Multi-language: `language` field (vi/en)

### PageConfig System
- Lưu config JSON cho các section đặc biệt
- Key quan trọng:
  - `ECOSYSTEM_MEMBERS` — Danh sách thương hiệu thành viên
  - `Customers_partners_config` — (Cũ, đã thay bằng Post API)

---

## 2. Frontend Client (`kepler-frontend-2/`)

### Tech Stack
- **Framework:** Next.js 14+ App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS + custom CSS
- **UI Components:** shadcn/ui (44 components trong `src/components/ui/`)
- **Carousel:** Swiper.js
- **Animation:** Framer Motion
- **State:** Zustand (auth-store, cart-store) + TanStack Query (server state)
- **i18n:** react-i18next (vi/en) — locales tại `src/locales/`
- **Auth:** JWT + Zustand persist + device fingerprint
- **ACL:** CASL (ability-based permissions)
- **Fonts:** Geist Sans/Mono (local), Noto Serif + Inter (Google Fonts)
- **Analytics:** Google Analytics (G-S1WZBLT72V)
- **SEO:** Next.js Metadata API + `constructMetadata()` helper

### Cấu trúc thư mục
```
src/
├── app/                    → Next.js App Router (pages + layouts)
│   ├── (home)/             → Trang chủ (route group)
│   ├── (auth)/             → Login, Register, Forgot password
│   ├── (protected)/        → Trang cần auth (quotation, user)
│   ├── [...slug]/          → Dynamic catch-all route
│   ├── news/               → Trang tin tức
│   ├── du-an/              → Trang dự án
│   ├── about/              → Trang giới thiệu (9 sub-pages)
│   ├── services/           → Trang dịch vụ
│   ├── he-sinh-thai/       → Trang hệ sinh thái (7 thương hiệu)
│   ├── kien-thuc/          → Trang kiến thức
│   ├── chuyen-gia/         → Trang chuyên gia
│   ├── contact/            → Trang liên hệ
│   ├── careers/            → Trang tuyển dụng
│   ├── customers/          → Trang khách hàng
│   ├── customers-partners/ → Trang khách hàng & đối tác (cũ)
│   ├── partners/           → Trang đối tác
│   ├── realhub/            → Trang RealHub
│   ├── booking/            → Đặt lịch hẹn
│   ├── appraisal-request/  → Yêu cầu thẩm định
│   ├── survey-registration/→ Đăng ký khảo sát
│   ├── report-subscription/→ Đăng ký nhận báo cáo
│   ├── work-schedule/      → Lịch công tác
│   ├── faq/                → FAQ
│   ├── legal/              → Pháp lý
│   ├── dieu-khoan-su-dung/ → Điều khoản sử dụng
│   ├── chinh-sach-bao-mat/ → Chính sách bảo mật
│   ├── chinh-sach-cookie/  → Chính sách cookie
│   ├── certification/      → Chứng nhận
│   ├── products/           → Sản phẩm
│   ├── search/             → Tìm kiếm
│   ├── view-only/          → View only mode
│   ├── ma-consulting/      → MA Consulting
│   ├── layout.tsx          → Root layout (Header, Footer, Providers)
│   ├── globals.css         → Global styles
│   └── not-found.tsx       → 404 page
├── api/                    → Auto-generated API hooks (Orval)
│   ├── endpoints/          → 38 API endpoint files
│   ├── models/             → 488 TypeScript models
│   └── mutator/            → Axios custom instance + fetch instance
├── components/             → Shared components
│   ├── common/             → Header, Footer, SafeImage, Pagination, etc.
│   ├── ui/                 → 44 shadcn/ui components
│   ├── organisms/          → 12 organism components
│   ├── quotation-popup/    → Popup báo giá
│   ├── providers.tsx       → React providers wrapper
│   └── analytics-tracker.tsx
├── configs/                → App configuration
│   ├── base.ts             → Backend/frontend domain config
│   ├── acl.ts              → CASL ability builder
│   ├── app-routes.ts       → Route access rules
│   └── permissions-matrix.ts → Permission definitions
├── constants/              → Constants
│   ├── page-ids.ts         → PAGE_IDS (UUID cho vị trí bài viết)
│   ├── kepler-data.ts      → Hardcoded Kepler data
│   └── auth-cookie.ts      → Auth cookie names
├── hooks/                  → Custom hooks (13 files)
│   ├── use-header-menu-layout.ts → Header menu construction
│   ├── use-query.ts        → Query helpers
│   ├── use-ability.ts      → CASL ability hook
│   ├── use-user-permissions.ts → User permissions
│   ├── use-toast.ts        → Toast notifications
│   └── ...
├── lib/                    → Utilities (19 files)
│   ├── seo.ts              → constructMetadata() helper
│   ├── api.ts              → API helpers
│   ├── responsive-image.ts → Image URL helpers
│   ├── slugify.ts          → Slug generator
│   ├── auth-cookie.ts      → Auth cookie management
│   ├── permission-*.ts     → Permission utilities
│   ├── page-config-helpers.ts → PageConfig helpers
│   ├── prefetch-helpers.ts → SSR data prefetch
│   └── ...
├── stores/                 → Zustand stores
│   ├── auth-store.ts       → Auth state (login, logout, token, user)
│   └── cart-store.ts       → Cart state
├── providers/              → React providers
│   └── query-provider.tsx  → TanStack Query provider
├── types/                  → TypeScript types (11 files)
├── utils/                  → Utilities
│   ├── mock-data.ts        → Mock data (mockPosts)
│   └── authEncryption.ts   → Auth encryption utils
├── locales/                → i18n translation files (vi/en)
├── acl/                    → CASL ability definitions
├── i18n.ts                 → i18n config
└── styles/                 → Additional styles
```

### Layout System
```
RootLayout (src/app/layout.tsx)
├── <html lang="vi">
├── Google Analytics scripts
├── <Providers>              → QueryProvider + React Query
│   ├── <AbilityProvider>    → CASL ability context
│   ├── <HydrationBoundary>  → SSR data hydration
│   │   └── <Header />       → Fixed header (51KB, phức tạp nhất)
│   ├── <main>{children}</main>
│   ├── <Footer />           → Footer với dynamic data
│   ├── <QuotationPopup />   → Popup báo giá (lazy)
│   └── <Toaster />          → Toast notifications
```

### Routing Groups
- `(home)` — Trang chủ, URL: `/`
- `(auth)` — Login/Register/Forgot, không có Header/Footer
- `(protected)` — Cần auth, có layout riêng

### API Integration
- **Auto-generated hooks** (Orval) từ `src/api/endpoints/`
- **Axios custom instance** tại `src/api/mutator/custom-instance.ts`
  - Base URL: `baseConfig.backendDomain`
  - `withCredentials: true`
  - 401 handler: clear auth + redirect to `/login`
- **TanStack Query** cho server state (caching, refetch, SSR hydration)
- **SSR prefetch** qua `prefetchLayoutData()` trong layout.tsx

### Auth Flow (Client)
1. User login tại `/login` → POST `/auth/login`
2. Token lưu trong Zustand `auth-store` (persist localStorage)
3. Device fingerprint generate (canvas) + session key
4. Mỗi request: Axios instance gửi cookie auth
5. 401 → clear auth + redirect `/login`
6. ACL: CASL `buildAbilityFor(permissions, roles)` → `AbilityProvider`

### PAGE_IDS System (`src/constants/page-ids.ts`)
Map UUID → vị trí bài viết trên các trang. Admin gán bài viết vào vị trí để hiện đúng section:
- `HOME_PROJECTS` — Dự án trang chủ
- `HOME_NEWS` — Tin tức trang chủ
- `HOME_LATEST_NEWS` — Tin mới trang chủ (sidebar)
- `LATEST_POSTS` — Vị trí chung (dùng cho /du-an)
- `SERVICE_POSITION` — Dịch vụ (English)
- Xem chi tiết trong file `HOMEPAGE_OVERVIEW.md`

### Category Structure (Frontend sử dụng)
```
/news                          → Tin tức
├── /news/thi-truong
├── /news/bat-dong-san
└── /news/tai-chinh

/du-an (sub-category dưới /realhub)
└── (sub-categories dự án)

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
```

### Key Components
| Component | File | Mô tả |
|-----------|------|-------|
| Header | `components/common/header.tsx` (51KB) | Navigation chính, mega menu, mobile menu, language switcher, user nav |
| Footer | `components/common/footer.tsx` (16KB) | Footer với dynamic data từ API |
| SafeImage | `components/common/safe-image.tsx` | Image component với fallback |
| Pagination | `components/common/pagination.tsx` | Phân trang |
| ServiceCard | `components/common/components/service-card.tsx` | Card hiển thị dịch vụ/dự án |
| MenuItem | `components/common/components/menu-item.tsx` | Menu item cho header |
| UserNav | `components/common/user-nav.tsx` | User navigation (login/avatar) |
| QuotationPopup | `components/quotation-popup/` | Popup báo giá |
| ErrorBoundary | `components/common/error-boundary.tsx` | Error boundary |
| Loading | `components/common/loading.tsx` | Loading skeletons |

### Key Hooks
| Hook | File | Mô tả |
|------|------|-------|
| `use-header-menu-layout` | `hooks/use-header-menu-layout.ts` | Xây dựng menu header từ API + hardcoded |
| `use-query` | `hooks/use-query.ts` | Query helpers cho API hooks |
| `use-ability` | `hooks/use-ability.ts` | CASL ability hook |
| `use-user-permissions` | `hooks/use-user-permissions.ts` | Lấy permissions của user |
| `use-toast` | `hooks/use-toast.ts` | Toast notifications |
| `use-mobile` | `hooks/use-mobile.ts` | Detect mobile device |
| `use-drag-scroll` | `hooks/use-drag-scroll.ts` | Drag to scroll |

### SEO
- `constructMetadata()` tại `src/lib/seo.ts` — generate Next.js Metadata
- Hỗ trợ: title, description, image, url, type, keywords, noIndex
- OpenGraph + Twitter Cards
- Sitemap: Next.js built-in
- Robots: index/follow enabled

---

## 3. Admin Panel (`kepler-frontend-admin/`)

### Tech Stack
- Next.js App Router + TypeScript
- TailwindCSS + shadcn/ui
- TanStack Query
- Zustand (auth)
- CASL permissions

### Dashboard Modules (`src/app/(dashboard)/`)
| Module | Mô tả |
|--------|-------|
| `dashboard/` | Trang tổng quan |
| `news/` | Quản lý bài viết (Post) |
| `category/` | Quản lý danh mục + gán bài viết |
| `post-approval-l1/` | Duyệt bài cấp 1 |
| `post-approval-l2/` | Duyệt bài cấp 2 |
| `base-config/` | Cấu hình chung (PageConfig, EcosystemConfig, etc.) |
| `service/` | Quản lý dịch vụ |
| `quotation/` | Quản lý báo giá |
| `quotation-status/` | Trạng thái báo giá |
| `contact/` | Quản lý liên hệ |
| `recruitment/` | Quản lý tuyển dụng |
| `candidate/` | Quản lý ứng viên |
| `question/` | Câu hỏi tuyển dụng |
| `department/` | Quản lý phòng ban |
| `permissions/` | Quản lý quyền + vai trò |
| `organizational-chart/` | Sơ đồ tổ chức |
| `work-schedule/` | Lịch công tác |
| `footer/` | Quản lý footer |
| `list-img/` | Kho ảnh |
| `list-video/` | Kho video |
| `list-file/` | Kho tài liệu |
| `customers/` | Quản lý khách hàng |
| `certification-config/` | Cấu hình chứng nhận |
| `introduction/` | Quản lý trang giới thiệu |

### Admin Login
- URL: `/admin/login` (prod) hoặc `http://localhost:3001` (dev)
- Auth: JWT token lưu trong localStorage (`auth-token`)
- Permissions: CASL-based, kiểm tra per module

---

## 4. Data Flow

```
Admin tạo/sửa nội dung
        ↓
Backend API (PostgreSQL)
        ↓
Frontend Client fetch qua API hooks
        ↓
TanStack Query cache + render
        ↓
User xem trang
```

### Ví dụ: Admin thêm dự án mới
1. Admin login → `/admin/news` (hoặc category → posts)
2. Tạo bài viết mới: title, thumbnail, content
3. Gán category: `/du-an` hoặc sub-category
4. Gán position: `HOME_PROJECTS` (để hiện trên trang chủ)
5. Publish (is_hidden = false)
6. Frontend client: `useGetApiV10Post({ page_id: HOME_PROJECTS })` → tự động refetch → hiện trên trang chủ + trang `/du-an`

### Ví dụ: Admin thêm đối tác mới
1. Admin → Tạo bài viết mới
2. Title = "Ngân hàng Vietcombank", Thumbnail = logo
3. Gán category: `/doi-tac` → sub "Ngân hàng và tổ chức tài chính"
4. Publish
5. Frontend: `useGetApiV10Post({ category_id: <doi-tac-sub-ids> })` → hiện trên trang chủ section "Đối tác"

---

## 5. Environment & Deployment

### Environment Variables
**Frontend Client (`kepler-frontend-2/`):**
- `NEXT_PUBLIC_BACKEND_DOMAIN` — Backend API URL
- `NEXT_PUBLIC_FRONTEND_DOMAIN` — Frontend URL

**Backend (`kepler-backend/`):**
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` — PostgreSQL
- `JWT_SECRET`, `JWT_REFRESH_EXPIRES_IN` — JWT config
- `TOKEN_ENCRYPTION_KEY` — Token encryption
- `DEFAULT_PASSWORD` — Default password for reset
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` — Email
- `UPLOAD_PATH` — File upload path

### Dev Servers
- Backend: `http://localhost:4100`
- Frontend Client: `http://localhost:3000`
- Admin Panel: `http://localhost:3001` (hoặc qua path `/admin` trên prod)

### Production
- `https://kepler-dev.meucorp.com` — Frontend + Backend + Admin
- Admin: `https://kepler-dev.meucorp.com/admin`

---

## 6. Important Notes

### Pattern: Post dùng cho nhiều loại nội dung
Post (bài viết) là entity universal. Khác biệt chỉ ở `category_id` và `page_id`:
- **Tin tức:** category `/news` + page_id `HOME_NEWS`
- **Dự án:** category `/du-an` + page_id `HOME_PROJECTS` hoặc `LATEST_POSTS`
- **Khách hàng:** category `/khach-hang`
- **Đối tác:** category `/doi-tac`
- **Dịch vụ:** category `/services` + page_id `SERVICE_POSITION`
- **Kiến thức:** category `/kien-thuc`

### Pattern: Fallback data
Hầu hết các section có fallback data (hardcoded) khi API trả về rỗng:
- `mockPosts` — Fallback cho news, projects
- `FALLBACK_CUSTOMERS` — Fallback cho customers
- `FALLBACK_PARTNERS` — Fallback cho partners
- `FALLBACK_MEMBERS` — Fallback cho ecosystem

### Pattern: SSR + Client hydration
1. `layout.tsx` prefetch data qua `prefetchLayoutData()`
2. `HydrationBoundary` truyền data xuống client
3. Client components dùng `useGetApiV10*` hooks (TanStack Query)
4. Nếu data đã có từ SSR → dùng cache, không refetch

### Pattern: i18n
- `react-i18next` với namespaces: `pages/home`, `common`, etc.
- Locales tại `src/locales/vi/` và `src/locales/en/`
- Language switcher trong Header
- API hỗ trợ `language` param (vi/en)

### Files quan trọng cần biết
| File | Vai trò |
|------|---------|
| `src/configs/base.ts` | Backend/frontend domain config |
| `src/constants/page-ids.ts` | UUID map cho vị trí bài viết |
| `src/api/mutator/custom-instance.ts` | Axios instance + 401 handler |
| `src/stores/auth-store.ts` | Auth state (Zustand) |
| `src/lib/seo.ts` | SEO metadata helper |
| `src/lib/responsive-image.ts` | Image URL helpers |
| `src/hooks/use-header-menu-layout.ts` | Header menu construction |
| `src/components/common/header.tsx` | Header component (phức tạp nhất, 51KB) |
| `src/app/(home)/page.tsx` | Trang chủ entry point |
| `HOMEPAGE_OVERVIEW.md` | Chi tiết trang chủ |
