# TEST CASES: Module 1 - Xác thực & Người dùng (Auth & Users)

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-1.01 - Đăng nhập thành công và nạp Profile**
- **Test Type:** E2E
- **Priority:** High
- **Pre-condition:** Không có.
- **Steps to Reproduce:**
  1. Người dùng bấm Đăng nhập bằng Google.
  2. Firebase cấp Token, gọi `POST /api/v1/auth/login`.
- **Expected Result:**
  - **Frontend:** Lưu `localStorage`, tự động fetch `/users/me` và chuyển sang Dashboard.
  - **Backend:** HTTP 200, tạo User trong DB nếu chưa có.

### 2. Negative Path & Error Handling
#### **TC-1.02 - Đăng nhập với Token sai hoặc Timeout**
- **Test Type:** API / Security
- **Priority:** High
- **Steps to Reproduce:**
  1. Giả lập lỗi mạng khi Firebase Auth đang gọi, hoặc gửi Token fake lên Backend.
- **Expected Result:**
  - **Frontend:** API Client hiển thị thông báo "Không thể kết nối", xóa sạch session ảo.
  - **Backend:** HTTP 401 Unauthorized nếu token sai, không sập server.

### 3. Luồng Tích Hợp (Integration Flows)
#### **TC-1.03 - Xung đột trạng thái giữa 2 Tab (Đăng xuất ở Tab B)**
- **Test Type:** E2E / Integration
- **Priority:** Medium
- **Steps to Reproduce:**
  1. Mở hệ thống ở Tab A và Tab B (cùng trình duyệt). Đăng nhập thành công.
  2. Tại Tab B, bấm "Đăng xuất".
  3. Quay lại Tab A, bấm vào "Cập nhật Profile".
- **Expected Result:**
  - **Frontend (Tab A):** Firebase Auth Listener phát hiện session đã mất, ngay lập tức báo lỗi và Force Redirect Tab A về `/login` trước cả khi gọi API.

### 4. Edge Cases & Core Risks
#### **TC-1.04 - Gián đoạn phiên làm việc do Token hết hạn (Silent Token Renewal)**
- **Test Type:** E2E / Security
- **Priority:** High
- **Steps to Reproduce:**
  1. Để nguyên tab Dashboard treo quá 1 tiếng (JWT expired).
  2. Gửi request bất kỳ.
- **Expected Result:**
  - **Frontend:** `apiClient` tự động gọi `getIdToken(true)` lấy Token mới, gắn vào request và gửi lại. User không hề bị văng ra Login (Trải nghiệm mượt).
