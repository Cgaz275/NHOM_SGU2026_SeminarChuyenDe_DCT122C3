# TEST CASES: Module 2 - Quản lý Thẻ (Cards) & QR Code

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-2.01 - Tạo thẻ & Lấy danh sách thẻ**
- **Test Type:** API
- **Priority:** High
- **Steps to Reproduce:**
  1. Khởi tạo thẻ mới, sau đó gọi `GET /api/v1/cards/me`.
- **Expected Result:**
  - **Backend:** Trả về HTTP 200 kèm danh sách thẻ.

### 2. Negative Path & Error Handling
#### **TC-2.02 - Truy cập trái phép thẻ của người khác**
- **Test Type:** Security
- **Priority:** High
- **Steps to Reproduce:**
  1. User A cố gọi `PUT /api/v1/cards/<card_id_cua_B>`.
- **Expected Result:**
  - **Backend:** HTTP 403 Forbidden.

### 3. Luồng Tích Hợp (Integration Flows)
#### **TC-2.03 - Đồng bộ Profile Builder Real-time trên đa thiết bị**
- **Test Type:** E2E / Integration
- **Priority:** Medium
- **Steps to Reproduce:**
  1. Chủ thẻ mở Profile Builder trên Laptop và trên Mobile.
  2. Sửa Job Title trên Laptop và nhấn Publish.
  3. Quan sát bản Preview trên Mobile.
- **Expected Result:**
  - **Frontend:** Nếu có Firebase listener, bản Preview trên Mobile sẽ tự động cập nhật Job Title mới (nếu kiến trúc hỗ trợ), hoặc ít nhất khi tải lại, dữ liệu không bị xung đột (Overwrite).

### 4. Edge Cases & Core Risks
#### **TC-2.04 - Lỗi Validate trùng Slug**
- **Test Type:** API
- **Priority:** High
- **Expected Result:** Nhập trùng slug -> Frontend báo lỗi viền đỏ, Backend từ chối `duplicate: true`.

#### **TC-2.05 - Sinh QR Code động (Redirect 302) - Core Risk**
- **Test Type:** API
- **Priority:** High
- **Steps to Reproduce:** Khách quét QR -> Backend xử lý `/qr/123`.
- **Expected Result:** Kể cả khi chủ thẻ đổi slug, `/qr/123` vẫn redirect 302 về slug mới nhất. Khách không bao giờ gặp lỗi 404.

#### **TC-2.06 - Rò rỉ thông tin cá nhân (Privacy Leak) - Core Risk**
- **Test Type:** Security
- **Priority:** Critical
- **Expected Result:** Nếu `isEmailPublic = false`, API GET Public Card tuyệt đối trả về `email: null`.
