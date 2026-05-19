# 📋 TEST CASES: MODULE 1 - XÁC THỰC & NGƯỜI DÙNG

#### **TC-01 - Đăng nhập thành công bằng Google OAuth**
- **Test Type:** E2E / UI
- **Priority:** High
- **Pre-condition:** Hệ thống tích hợp Firebase Auth / Google OAuth hoạt động bình thường.
- **Steps to Reproduce:**
  1. Truy cập trang chủ, nhấn nút "Đăng nhập".
  2. Chọn phương thức "Đăng nhập với Google".
  3. Chọn một tài khoản Google hợp lệ và cấp quyền.
- **Expected Result:**
  - **Frontend:** Popup Google đóng lại, UI chuyển hướng người dùng đến trang `Dashboard`. Hiển thị thông báo "Đăng nhập thành công". Avatar và Họ tên tự động được lấy từ Google.
  - **Backend:** Nhận thông tin từ client hoặc Firebase, tạo mới user document trong Firestore (nếu chưa có). Trả về HTTP 200 OK.

#### **TC-02 - Đăng nhập bằng Email (Magic Link) thành công**
- **Test Type:** E2E / UI
- **Priority:** High
- **Pre-condition:** User có email hợp lệ và có thể nhận thư.
- **Steps to Reproduce:**
  1. Truy cập trang "Đăng nhập".
  2. Nhập email hợp lệ vào ô Đăng nhập bằng Email và nhấn "Gửi Magic Link".
  3. Mở hòm thư email, nhấn vào link xác thực được gửi từ hệ thống.
- **Expected Result:**
  - **Frontend:** Sau bước 2, UI báo "Link đăng nhập đã được gửi". Sau bước 3, trình duyệt mở ra và tự động chuyển hướng vào `Dashboard`.
  - **Backend:** Firebase Auth sinh token hợp lệ, backend xác minh thành công (nếu có call API) và trả về HTTP 200 OK.

#### **TC-03 - Nhập sai định dạng Email khi gửi Magic Link**
- **Test Type:** UI
- **Priority:** Medium
- **Pre-condition:** Đang ở trang Đăng nhập.
- **Steps to Reproduce:**
  1. Nhập email sai định dạng (VD: `test@.com` hoặc `abcxyz`).
  2. Nhấn "Gửi Magic Link".
- **Expected Result:**
  - **Frontend:** Ngăn chặn submit form, hiển thị thông báo/chữ đỏ dưới ô input: "Email không đúng định dạng".
  - **Backend:** (Không gọi API do bị chặn từ Frontend). Nếu test trực tiếp qua API, trả về HTTP 400 Bad Request và thông báo lỗi validation.

#### **TC-04 - Cố tình truy cập Route bảo vệ không có Token**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Middleware `verifyToken` đã được cài đặt cho các API cần bảo vệ.
- **Steps to Reproduce:**
  1. Dùng Postman hoặc test script gọi API được bảo vệ (VD: `GET /api/v1/users/me`).
  2. Không đính kèm Header `Authorization: Bearer <token>`.
- **Expected Result:**
  - **Frontend:** Bị redirect về trang Đăng nhập nếu fetch API lỗi.
  - **Backend:** Middleware bắt lỗi và trả về HTTP 401 Unauthorized kèm message "Không tìm thấy token xác thực" (hoặc lỗi tương tự).

#### **TC-05 - Truy cập Route bảo vệ với Token hết hạn / Không hợp lệ**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Đã có một token giả mạo hoặc token Firebase đã hết hạn.
- **Steps to Reproduce:**
  1. Gọi API `PUT /api/v1/users/me` với Header `Authorization: Bearer <token_khong_hop_le>`.
- **Expected Result:**
  - **Frontend:** Bắt được lỗi 401, tự động xóa phiên đăng nhập cũ và đưa người dùng về trang Đăng nhập.
  - **Backend:** Trả về HTTP 401 Unauthorized kèm message "Token không hợp lệ hoặc đã hết hạn".

#### **TC-06 - Xử lý khi Firebase Auth bị Timeout (Edge Case)**
- **Test Type:** E2E / Error Handling
- **Priority:** High
- **Pre-condition:** Giả lập mạng chậm hoặc server Firebase đang bị lỗi (Timeout / 503).
- **Steps to Reproduce:**
  1. Chặn request đến server Firebase hoặc set timeout ngắn.
  2. Người dùng nhấn "Đăng nhập với Google" hoặc "Gửi Magic Link".
- **Expected Result:**
  - **Frontend:** Hiển thị trạng thái Loading tối đa 10s. Nếu không phản hồi, ẩn Loading và hiển thị thông báo "Hệ thống xác thực đang quá tải, vui lòng thử lại sau". Giao diện không được bị treo (crash).
  - **Backend:** Bắt lỗi ngoại lệ và trả về HTTP 503 Service Unavailable (hoặc tương tự) nếu luồng xử lý đi qua Backend.
