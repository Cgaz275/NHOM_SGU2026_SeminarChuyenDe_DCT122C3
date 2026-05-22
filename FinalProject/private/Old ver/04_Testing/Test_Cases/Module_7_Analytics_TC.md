# TEST CASES: Module 7 - Admin Thống kê (Analytics)

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-7.01 - Lấy thống kê Analytics chính xác**
- **Test Type:** API
- **Priority:** Low
- **Expected Result:** Gọi GET API trả về số lượng Views, Clicks đúng với DB.

### 2. Luồng Tích Hợp (Integration Flows)
#### **TC-7.02 - Tương tác Khách - Thống kê**
- **Test Type:** Integration
- **Priority:** Medium
- **Steps to Reproduce:**
  1. Khách mở Public Card -> Đếm 1 View.
  2. Khách bấm "Lưu danh bạ" -> Đếm 1 Click.
  3. Chủ thẻ mở trang Analytics (hoặc F5).
- **Expected Result:**
  - **Frontend:** Biểu đồ hiển thị tăng thêm 1 view, 1 click so với số cũ. Đảm bảo luồng tracking ghi nhận chính xác hành vi Frontend.

### 3. Edge Cases & Core Risks
#### **TC-7.03 - Ngăn chặn đếm View ảo (Spam Views)**
- **Test Type:** API / Security
- **Priority:** Low
- **Expected Result:** F5 trình duyệt Public Card 100 lần -> Backend chỉ tính 1 View (cơ chế chống spam theo Session / IP).
