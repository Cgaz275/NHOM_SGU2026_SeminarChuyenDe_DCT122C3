# 📋 TEST CASES: MODULE 7 - QUẢN TRỊ (ADMIN PANEL)

#### **TC-01 - Xem danh sách và Tìm kiếm Người dùng (Happy Path)**
- **Test Type:** E2E / API
- **Priority:** Medium
- **Pre-condition:** Đăng nhập bằng tài khoản có `role: "admin"`. Hệ thống có sẵn một số lượng user.
- **Steps to Reproduce:**
  1. Truy cập tab "Quản lý người dùng" trên Admin Dashboard.
  2. Tại ô tìm kiếm, nhập tên hoặc email hợp lệ của một user.
- **Expected Result:**
  - **Frontend:** Hiển thị danh sách user dạng bảng. Khi gõ từ khóa, kết quả tìm kiếm tự động thu hẹp lại (có Debounce). Bảng dữ liệu hiển thị đúng cấu trúc: ID, Tên, Email, Trạng thái.
  - **Backend:** Gửi API `GET /api/v1/users` (có thể kèm query `?search=...`). Trả về HTTP 200 OK với danh sách user phù hợp.

#### **TC-02 - Khóa tài khoản User (Happy Path)**
- **Test Type:** UI / API
- **Priority:** High
- **Pre-condition:** Admin đang ở trang "Quản lý người dùng". User mục tiêu đang ở trạng thái "Active".
- **Steps to Reproduce:**
  1. Ở cột Thao tác, nhấn nút Khóa (hoặc Toggle đổi trạng thái) ứng với User mục tiêu.
  2. Bấm "Xác nhận" trên popup cảnh báo.
- **Expected Result:**
  - **Frontend:** Cập nhật UI ngay lập tức (dòng của user đó chuyển sang trạng thái "Bị khóa" hoặc hiện nhãn màu đỏ). Hiện Toast "Khóa tài khoản thành công".
  - **Backend:** Gửi API `PUT /api/v1/users/:id/status` với payload `{ status: 'banned' }`. Cập nhật Database và có thể buộc các session hiện tại của User đó đăng xuất (thu hồi JWT Token). Trả về HTTP 200 OK.

#### **TC-03 - Xử lý Báo cáo vi phạm (Happy Path)**
- **Test Type:** E2E / API
- **Priority:** High
- **Pre-condition:** Có các báo cáo (Reports) ở trạng thái `pending`.
- **Steps to Reproduce:**
  1. Vào tab "Quản lý báo cáo".
  2. Đọc một báo cáo và chọn hành động "Khóa thẻ vi phạm".
  3. Chọn thời hạn khóa (VD: 1 tháng) và Xác nhận.
- **Expected Result:**
  - **Frontend:** Trạng thái Report chuyển thành `resolved`. Hiển thị thông báo xử lý thành công.
  - **Backend:** Gửi API `PUT /api/v1/reports/:reportId/resolve`. Thay đổi trạng thái của Report. Thay đổi trạng thái của Card tương ứng thành khóa. Gửi email cảnh báo (nếu có config). Trả về HTTP 200 OK.

#### **TC-04 - Xử lý dữ liệu đầu vào sai (Negative Path)**
- **Test Type:** API
- **Priority:** Low
- **Pre-condition:** Tài khoản Admin hợp lệ.
- **Steps to Reproduce:**
  1. Gửi request `PUT /api/v1/users/id-khong-ton-tai/status`.
- **Expected Result:**
  - **Frontend:** Nếu xảy ra lỗi, báo "Người dùng không tồn tại".
  - **Backend:** Trả về HTTP 404 Not Found.

#### **TC-05 - Kiểm tra Lỗ hổng phân quyền - Broken Access Control (Core Risk)**
- **Test Type:** API / Security
- **Priority:** Critical
- **Pre-condition:** Đăng nhập bằng tài khoản có `role: "user"` (Người dùng thông thường). Lấy được JWT Token của user này.
- **Steps to Reproduce:**
  1. Dùng Postman, đính kèm JWT Token của User thường.
  2. Gửi request `GET /api/v1/users` (API lấy toàn bộ danh sách User) HOẶC `PUT /api/v1/users/:id/status`.
- **Expected Result:**
  - **Frontend:** UI của người dùng thường không bao giờ hiển thị nút/link vào Admin Dashboard.
  - **Backend:** (QUAN TRỌNG NHẤT) Middleware `verifyAdmin` phát hiện `req.user.role !== 'admin'`. Ngay lập tức chặn request. Trả về HTTP 403 Forbidden kèm message "Bạn không có quyền thực hiện hành động này". Kẻ tấn công không thể xem được danh sách users hay khóa tài khoản người khác.
