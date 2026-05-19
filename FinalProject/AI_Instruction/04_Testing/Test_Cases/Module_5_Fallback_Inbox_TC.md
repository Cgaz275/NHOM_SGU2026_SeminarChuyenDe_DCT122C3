# 📋 TEST CASES: MODULE 5 - FALLBACK & INBOX

#### **TC-01 - Gửi Form liên hệ tĩnh thành công (Happy Path)**
- **Test Type:** E2E / UI
- **Priority:** High
- **Pre-condition:** Thẻ đang ở trạng thái Tắt AI (AI Disabled) hoặc AI gặp sự cố. Giao diện đang hiển thị Form liên hệ tĩnh thay cho Chatbot.
- **Steps to Reproduce:**
  1. Khách điền đầy đủ các trường: Họ tên, Email, Số điện thoại, Nội dung tin nhắn.
  2. Nhấn "Gửi tin nhắn".
- **Expected Result:**
  - **Frontend:** Hiển thị hiệu ứng loading. Sau đó hiển thị thông báo "Đã gửi tin nhắn thành công, chúng tôi sẽ liên hệ lại sớm". Xóa trắng form.
  - **Backend:** Gọi API `POST /api/v1/messages/cards/:cardId`. Lưu tin nhắn mới vào collection `messages`. (Hệ thống có thể gửi email thông báo cho chủ thẻ thông qua SMTP/SendGrid nếu được cấu hình). Trả về HTTP 201 Created.

#### **TC-02 - Chủ thẻ xem Inbox và đánh dấu đã đọc (Happy Path)**
- **Test Type:** E2E / API
- **Priority:** High
- **Pre-condition:** Chủ thẻ đã đăng nhập, vào trang Dashboard -> "Hộp thư (Inbox)". Có ít nhất 1 tin nhắn chưa đọc (isRead: false).
- **Steps to Reproduce:**
  1. Xem danh sách tin nhắn.
  2. Nhấp vào 1 tin nhắn chưa đọc để xem chi tiết.
- **Expected Result:**
  - **Frontend:** Tin nhắn hiển thị đầy đủ thông tin (Tên khách, SĐT, nội dung). Chuyển UI trạng thái tin nhắn từ "in đậm" (chưa đọc) sang bình thường (đã đọc). Giảm số lượng notification (badge đếm số tin chưa đọc) đi 1.
  - **Backend:** Gửi API `PUT /api/v1/messages/:messageId/read`. Cập nhật trường `isRead` thành `true`. Trả về HTTP 200 OK.

#### **TC-03 - Chủ thẻ xóa tin nhắn (Happy Path)**
- **Test Type:** UI / API
- **Priority:** Medium
- **Pre-condition:** Đang ở màn hình danh sách tin nhắn trong Inbox.
- **Steps to Reproduce:**
  1. Nhấn nút "Xóa" (icon thùng rác) tại 1 tin nhắn cụ thể.
  2. Bấm "Xác nhận" trên popup cảnh báo.
- **Expected Result:**
  - **Frontend:** Dòng tin nhắn bị xóa khỏi danh sách ngay lập tức, hiển thị Toast "Đã xóa tin nhắn".
  - **Backend:** Gửi API `DELETE /api/v1/messages/:messageId`. Xóa document khỏi Firestore (hoặc chuyển isDeleted = true). Trả về HTTP 200 OK.

#### **TC-04 - Nhập thiếu thông tin Form tĩnh (Negative Path)**
- **Test Type:** UI
- **Priority:** Medium
- **Pre-condition:** Form tĩnh đang hiển thị.
- **Steps to Reproduce:**
  1. Bỏ trống ô Họ tên và nhập Email sai định dạng (Ví dụ: `khongphaimail`).
  2. Nhấn "Gửi tin nhắn".
- **Expected Result:**
  - **Frontend:** Form ngăn chặn submit, viền đỏ ô Họ tên với lỗi "Vui lòng nhập Họ tên" và viền đỏ ô Email với lỗi "Email không hợp lệ".
  - **Backend:** Nếu vẫn bị lọt qua FE, API trả về HTTP 400 Bad Request kèm Joi/Yup validation message.

#### **TC-05 - Tấn công Spam Form tĩnh (Core Risk)**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Chức năng chặn Spam/Rate Limit được kích hoạt (Ví dụ: tối đa 3 requests/phút).
- **Steps to Reproduce:**
  1. Dùng tool (Postman/cURL) gọi liên tục API `POST /api/v1/messages/cards/:cardId` hơn 5 lần trong vòng 1 phút.
- **Expected Result:**
  - **Frontend:** Từ lần thứ 4, nút Gửi bị disable hoặc hiển thị lỗi "Bạn thao tác quá nhanh, vui lòng thử lại sau".
  - **Backend:** Từ request thứ 4, chặn tại Middleware và trả về HTTP 429 Too Many Requests. Không ghi dữ liệu rác vào Database, tránh cạn kiệt dung lượng.

#### **TC-06 - Graceful Degradation khi LLM API sập (Core Risk)**
- **Test Type:** E2E / Logical
- **Priority:** High
- **Pre-condition:** Thẻ đang ở trạng thái Bật AI Chatbot bình thường.
- **Steps to Reproduce:**
  1. Giả lập chặn kết nối API OpenRouter/LLM (Timeout hoặc 503).
  2. Khách gửi tin nhắn chat đầu tiên.
- **Expected Result:**
  - **Frontend:** Sau 10 giây chờ phản hồi từ LLM thất bại, Chatbot hiển thị thông báo "Xin lỗi, AI đang bảo trì. Vui lòng để lại lời nhắn" và TỰ ĐỘNG CHUYỂN ĐỔI giao diện từ Chat UI sang Form liên hệ tĩnh. Khách vẫn điền Form tĩnh bình thường.
  - **Backend:** Việc sập API Chat (`/chat`) không được ảnh hưởng đến API Lưu Form Tĩnh (`/messages`). Hai API này hoạt động độc lập để đảm bảo không bao giờ đánh rơi Lead của khách hàng.
