# Pending Tasks — Kepler Project

_Cập nhật: 2026-08-24_

## 🔴 High Priority

### 1. Backend: Restart server để nhận field `type`
- **Repo:** kepler-backend
- **Mô tả:** DB đã có column `type`, code model đã cập nhật, nhưng backend server chưa restart nên vẫn ignore field `type` khi lưu. Mọi submit đều lưu `type: "general"` (default).
- **Cách làm:** Restart Node.js process trên server (pm2 restart / docker restart / systemd restart).
- **Verify:** Sau restart, POST `/api/v1.0/contact` với `type: "yeu-cau-tham-dinh-gia"` → query DB → `type` phải là `"yeu-cau-tham-dinh-gia"`, không phải `"general"`.

### 2. QA: Chạy manual test plan TC-2.1 sau khi restart backend
- **File:** `docs/qa/qa-dynamic-contact-form-2026-08-23.md`
- **Mô tả:** Sau khi restart backend, chạy TC-2.1 để verify `type` field persist đúng vào DB.
- **Cần làm:** Submit form trên `/contact/tu-van-thuong-vu-ma` → query DB → check `type` = `"tu-van-thuong-vu-ma"`.

## 🟡 Medium Priority

### 3. Frontend: Cập nhật fallback addresses trong DynamicContactForm
- **File:** `src/app/contact/components/dynamic-contact-form/index.tsx`
- **Mô tả:** `fallbackAddresses` đang dùng địa chỉ CASE/SMEQ cũ (Số 2 Nguyễn Văn Thủ, Điện Biên Phủ, v.v.). Cần thay bằng địa chỉ thực tế của Kepler Group.
- **Cần làm:** Cập nhật `fallbackAddresses` với địa chỉ Kepler thực tế.

### 4. Frontend: Cập nhật i18n keys cho DynamicContactForm
- **File:** `src/app/contact/components/dynamic-contact-form/index.tsx`
- **Mô tả:** Form đang dùng `t("name")`, `t("email")`, `t("submit")` từ namespace `pages/contact`. Cần verify các key này đã tồn tại trong file i18n, nếu thiếu thì thêm.
- **Cần làm:** Check `public/locales/vi/pages/contact.json` và `public/locales/en/pages/contact.json` có đủ các key: `name`, `namePlaceholder`, `email`, `emailPlaceholder`, `phone`, `phonePlaceholder`, `submit`, `sending`, `success`, `successMessage`, `error`, `errorMessage`, `contactInfo`, `branchesOffices`, `hotline`.

## 🟢 Low Priority

### 5. Frontend: Address sidebar có thể lấy từ API thay vì hardcode
- **Mô tả:** Hiện tại address list lấy từ `pageConfigData` hoặc fallback hardcode. Có thể cân nhắc tạo API riêng cho addresses hoặc config trong admin panel.

### 6. Frontend: Email confirmation template cần rebrand
- **File (backend):** `src/templates/email/contactConfirmation.ts`
- **Mô tả:** Email xác nhận liên hệ có thể vẫn dùng branding CASE/SMEQ cũ. Cần check và rebrand sang Kepler.
