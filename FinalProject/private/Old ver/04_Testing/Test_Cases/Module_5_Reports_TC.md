# TEST CASES: Module 5 - Admin Quản lý Báo cáo (Reports)

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-5.01 - Gửi báo cáo vi phạm thành công**
- **Test Type:** API
- **Priority:** Medium
- **Expected Result:** Khách gửi báo cáo -> Backend lưu vào DB -> HTTP 200.

### 2. Luồng Tích Hợp (Integration Flows)
#### **TC-5.02 - Quản lý Trạng thái Report (Pending -> Resolved)**
- **Test Type:** Integration
- **Priority:** Medium
- **Steps to Reproduce:**
  1. Admin nhấn "Đã xử lý" cho 1 Report.
  2. Backend cập nhật `status = resolved`.
  3. F5 lại bảng điều khiển.
- **Expected Result:**
  - **Frontend:** Report chuyển sang tab "Lịch sử" hoặc đổi màu xanh.

### 3. Edge Cases & Core Risks
#### **TC-5.03 - Admin theo dõi Report Real-time**
- **Test Type:** E2E
- **Priority:** Medium
- **Expected Result:** Khách vừa bấm Gửi -> Bảng điều khiển của Admin nhảy Notification / Thêm dòng mới ngay lập tức `< 1s` nhờ Firebase Listener.
