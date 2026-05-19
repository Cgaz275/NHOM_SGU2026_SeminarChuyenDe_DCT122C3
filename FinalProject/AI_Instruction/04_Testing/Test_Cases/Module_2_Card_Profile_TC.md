# 📋 TEST CASES: MODULE 2 - QUẢN LÝ THẺ & PROFILE BUILDER

#### **TC-01 - Tạo & Cập nhật Profile (Happy Path)**
- **Test Type:** E2E / UI
- **Priority:** High
- **Pre-condition:** User đã đăng nhập thành công.
- **Steps to Reproduce:**
  1. Truy cập trang Quản lý Thẻ (Dashboard).
  2. Chọn "Sửa thông tin thẻ".
  3. Cập nhật đầy đủ các trường: Bio, Link mạng xã hội (Facebook, LinkedIn), Công việc.
  4. Nhấn "Lưu lại".
- **Expected Result:**
  - **Frontend:** Nút lưu hiển thị trạng thái "Đang lưu...", sau đó hiện Toast message "Cập nhật thành công". Màn hình xem trước (Preview) cập nhật thông tin ngay lập tức.
  - **Backend:** Nhận request PUT `/:cardId`. Cập nhật Document thẻ trên Firestore thành công. Trả về HTTP 200 OK với data thẻ mới nhất.

#### **TC-02 - Tải xuống file VCF hợp lệ (Happy Path)**
- **Test Type:** API / UI
- **Priority:** High
- **Pre-condition:** Thẻ đã có đầy đủ thông tin Họ tên, SĐT, Email (đang bật public).
- **Steps to Reproduce:**
  1. Mở link Card Public (`/cards/:slug`).
  2. Nhấn nút "Lưu Danh Bạ" (Save Contact).
- **Expected Result:**
  - **Frontend:** Trình duyệt tự động tải xuống file có đuôi `.vcf`.
  - **Backend (nếu tạo động):** Endpoint trả về nội dung file đúng chuẩn định dạng vCard 3.0 (BEGIN:VCARD, VERSION:3.0, FN:, TEL:, END:VCARD). Kiểm tra bằng cách mở file trên điện thoại (iOS/Android) sẽ import được thẳng vào danh bạ mà không lỗi tiếng Việt.

#### **TC-03 - Tải ảnh mã QR Code**
- **Test Type:** UI
- **Priority:** Medium
- **Pre-condition:** Thẻ đang ở trạng thái Published (Đã xuất bản) và có link public hợp lệ.
- **Steps to Reproduce:**
  1. Ở trang Dashboard, chọn mục "Mã QR".
  2. Nhấn "Tải xuống PNG" (hoặc SVG).
- **Expected Result:**
  - **Frontend:** Popup chọn vị trí lưu hiển thị. Ảnh tải xuống rõ nét, đúng mã QR dẫn vào link thẻ. Không bị đứt nét hay lỗi khoảng trắng UI.
  - **Backend:** (Thường xử lý sinh QR bằng thư viện tại Frontend, Backend không can thiệp. Nếu lưu trữ trên Storage, link tải phải truy cập được).

#### **TC-04 - Cập nhật URL mạng xã hội sai định dạng (Negative Path)**
- **Test Type:** UI / API
- **Priority:** Medium
- **Pre-condition:** Đang ở màn hình Sửa thông tin thẻ.
- **Steps to Reproduce:**
  1. Ở trường "Link Facebook", nhập `not-a-link` hoặc chuỗi không bắt đầu bằng `http`/`https`.
  2. Nhấn "Lưu lại".
- **Expected Result:**
  - **Frontend:** Ngăn chặn submit form, báo lỗi "Đường dẫn không hợp lệ" viền đỏ ngay dưới ô input.
  - **Backend:** Nếu request vẫn lọt qua được, API trả về HTTP 400 Bad Request kèm message báo lỗi chuẩn (Joi / Yup validation failed).

#### **TC-05 - Rò rỉ thông tin cá nhân (Core Risk / Privacy Leak)**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Trong cấu hình thẻ, User đã **GẠT TẮT** tuỳ chọn "Hiển thị Số điện thoại / Email trên trang Public".
- **Steps to Reproduce:**
  1. Gửi HTTP GET request `GET /api/v1/cards/:slug` bằng Postman (Không dùng token).
  2. Xem cấu trúc cục JSON trả về ở thuộc tính `data`.
- **Expected Result:**
  - **Frontend:** Không hiển thị icon/chữ số điện thoại và email trên giao diện Public Card.
  - **Backend:** (QUAN TRỌNG) Khối JSON trả về **TUYỆT ĐỐI KHÔNG ĐƯỢC CHỨA** key `phoneNumber` hoặc `email` của chủ thẻ, hoặc giá trị của chúng phải là `null`. Việc ẩn thông tin phải thực hiện tại Backend (`omit` keys) chứ không phải gửi về Frontend rồi mới giấu bằng CSS.

#### **TC-06 - Truy cập Thẻ bị khóa / Đã xóa (Soft Delete)**
- **Test Type:** E2E / API
- **Priority:** Medium
- **Pre-condition:** Một thẻ cụ thể đã bị admin khóa, hoặc chủ thẻ đã tự xóa (isDeleted = true).
- **Steps to Reproduce:**
  1. Khách hàng nhấp vào link URL của thẻ đó (`/cards/:slug`).
- **Expected Result:**
  - **Frontend:** Hiển thị màn hình 404 Custom hoặc "Thẻ này không tồn tại / Đã bị khóa".
  - **Backend:** API `GET /cards/:slug` nhận biết trạng thái `isDeleted` hoặc `status === 'banned'` và trả về HTTP 404 Not Found hoặc 403 Forbidden thay vì trả về nội dung thẻ.
