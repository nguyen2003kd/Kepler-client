# Pending Tasks — Kepler Project

_Cập nhật: 2026-08-24_

## Đã xử lý

### Frontend: Cập nhật fallback addresses
- File: `src/app/contact/components/dynamic-contact-form/index.tsx`, `src/app/contact/components/contact-registration/index.tsx`
- Đã thay địa chỉ CASE/SMEQ cũ bằng địa chỉ Kepler Group (TP.HCM, Hà Nội, Đà Nẵng, Cần Thơ).
- Lưu ý: Số điện thoại và địa chỉ chính xác cần cập nhật khi có thông tin thực tế từ Kepler.

### Frontend: Rebrand i18n
- File: `src/locales/vi/pages/contact.json`, `src/locales/en/pages/contact.json`
- Đã đổi "CASE-SMQ" thành "Kepler Group" trong subtitle.

### Frontend: Verify i18n keys
- Tất cả keys cần thiết đã tồn tại: name, namePlaceholder, email, emailPlaceholder, phone, phonePlaceholder, submit, sending, success, successMessage, error, errorMessage, contactInfo, branchesOffices, hotline.

### Backend: Email template rebrand
- File: `src/templates/email/contactConfirmation.ts` — Đã rebrand từ trước.
- File: `src/providers/ContactProvider.ts` — Đã đổi email subject từ "[CASE-SMQ]" thành "[Kepler Group]".

## Còn lại — Cần người làm

### 1. Backend: Restart server để nhận field `type`
- Repo: kepler-backend
- DB đã có column `type`, code model đã push, nhưng backend server chưa restart nên vẫn ignore field `type` khi lưu.
- Cách làm: Restart Node.js process trên server.
- Verify: Sau restart, POST /api/v1.0/contact với type: "yeu-cau-tham-dinh-gia" → query DB → type phải là "yeu-cau-tham-dinh-gia".

### 2. QA: Chạy manual test plan
- File: `docs/qa/qa-dynamic-contact-form-2026-08-23.md`
- Chạy các test case sau khi restart backend (đặc biệt TC-2.1).

### 3. Cập nhật địa chỉ Kepler thực tế
- Fallback addresses hiện dùng placeholder (SĐT 028 0000 000, địa chỉ chung). Khi có thông tin thực tế, cập nhật vào:
  - `src/app/contact/components/dynamic-contact-form/index.tsx`
  - `src/app/contact/components/contact-registration/index.tsx`
