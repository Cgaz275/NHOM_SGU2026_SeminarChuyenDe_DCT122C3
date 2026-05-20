# TEST CASES: Module 6 - Admin Khóa tài khoản (Real-time Kick-out)

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-6.01 - Đổi trạng thái user thành banned**
- **Test Type:** API
- **Priority:** High
- **Expected Result:** Admin gọi API -> DB cập nhật trạng thái user thành `banned`.

### 2. Negative Path & Error Handling
#### **TC-6.02 - Admin cố khóa tài khoản Root/SuperAdmin**
- **Test Type:** Security
- **Priority:** Medium
- **Expected Result:** Backend từ chối `HTTP 403`, không cho phép khóa tài khoản có level cao hơn.

### 3. Luồng Tích Hợp (Integration Flows) & Core Risks
#### **TC-6.03 - Thất bại trong Đồng bộ Thời gian thực (Real-time Kick-out) - Core Risk**
- **Test Type:** E2E / Integration / Real-time
- **Priority:** Critical
- **Steps to Reproduce:**
  1. Mở song song: Tab A (Admin Panel), Tab B (User Dashboard).
  2. Tại Tab A, nhấn "Khóa tài khoản (Ban)" đối với User đó.
- **Expected Result:**
  - **Frontend (Tab B):** Không cần tải lại trang. Nhờ Firebase `onSnapshot` lắng nghe trực tiếp document `users/:id`, Frontend của User B ngay lập tức (dưới 0.5s) nảy lên Popup Modal cảnh báo màu đỏ "Tài khoản của bạn đã bị khóa". 
  - Giao diện Dashboard bị mờ đi (Overlay), người dùng BẤT ĐỘNG, chỉ có thể bấm nút duy nhất là "Đăng xuất". Không thể gọi API nào khác. Trải nghiệm khóa tài khoản liền mạch và tàn nhẫn.
