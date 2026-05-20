# 🌐 API Guideline (Dành cho AI Agent)

**Vị trí trong Kiến trúc:** Tiêu chuẩn giao tiếp thống nhất và bắt buộc giữa Client (Frontend) và Server (Backend).

> **CHỈ THỊ CỐT LÕI CHO AI AGENT:** Khi viết code cho bất kỳ Controller hay Route nào, AI Agent **bắt buộc** phải tuân thủ các quy tắc trong tài liệu này. Mọi sai lệch về định dạng JSON hay mã HTTP đều không được chấp nhận.

## 1. Nguyên tắc thiết kế cơ bản

- **Base URL:** Tất cả API phải bắt đầu với tiền tố phiên bản: `/api/v1`.
- **Định danh tài nguyên:** Luôn dùng danh từ số nhiều (ví dụ: `/users`, `/cards`, `/reports`, `/messages`). Tránh dùng động từ, trừ các action đặc thù (`/login`, `/register`, `/resolve`).
- **HTTP Methods:**
  - `GET` — Truy xuất dữ liệu (không làm thay đổi state).
  - `POST` — Tạo mới tài nguyên hoặc xử lý hành động nhạy cảm (đăng nhập, AI chat).
  - `PUT` — Cập nhật tài nguyên / toggle flags.
  - `DELETE` — Xóa (ưu tiên Soft Delete bằng cờ trạng thái thay vì xóa cứng).

## 2. Chuẩn định dạng response (JSON)

Mọi API phải trả về JSON theo định dạng thống nhất:

```json
{
  "status": true,
  "message": "Nội dung thông báo kết quả bằng Tiếng Việt",
  "data": { }
}
```

- `status`: boolean (`true` nếu thành công, `false` nếu có lỗi).
- `message`: chuỗi mô tả ngắn gọn (dùng để hiển thị toaster hoặc log).
- `data`: object, array hoặc `null` khi không có dữ liệu trả về.

## 3. HTTP Status Codes (quy ước)

- `200 OK` — Request thành công (GET, PUT, DELETE).
- `201 Created` — Tạo mới thành công (POST tạo resource).
- `400 Bad Request` — Dữ liệu vào sai/thiếu trường bắt buộc.
- `401 Unauthorized` — Xác thực thất bại hoặc thiếu token.
- `403 Forbidden` — Người dùng không có quyền truy cập.
- `404 Not Found` — Không tìm thấy tài nguyên.
- `429 Too Many Requests` — Bị chặn bởi rate limiter.
- `500 Internal Server Error` — Lỗi server/chưa xử lý.

## 4. Cấu trúc đầu mối API (API tree — theo PRD)

### 4.1 Xác thực & Users (`/api/v1/auth`, `/api/v1/users`)

- `POST /auth/register` — Đăng ký.
- `POST /auth/login` — Đăng nhập.
- `POST /auth/forgot-password` — Quên mật khẩu.
- `GET /users/me` — Lấy hồ sơ người dùng hiện tại.
- `PUT /users/me` — Cập nhật profile.
- `GET /users` — (Admin) Lấy danh sách users.
- `PUT /users/:id/status` — (Admin) Khóa/Mở tài khoản (status: `active`/`banned`).

### 4.2 Thẻ AI Card (`/api/v1/cards`)

- `POST /cards` — Tạo thẻ mới.
- `GET /cards/me` — Lấy thẻ của user hiện tại.
- `GET /cards/:slug` — (Public) Lấy thẻ theo slug. **(Đặt sau `/me` để tránh xung đột routes.)**
- `PUT /cards/:cardId` — Cập nhật hiển thị / theme.
- `DELETE /cards/:cardId` — Xóa (Soft Delete — cập nhật `status`).
- `PUT /cards/:cardId/ai-config` — Cấu hình prompt/tri thức AI.
- `PUT /cards/:cardId/takeover` — Bật/Tắt Human Takeover (`isAiPaused`).

### 4.3 Hội thoại & tin nhắn (`/api/v1/chat`, `/api/v1/cards/:cardId/messages`)

- `POST /chat/cards/:cardId/chat` — Gọi LLM để sinh phản hồi (public + rate limited).
- `POST /cards/:cardId/messages` — Khách gửi tin nhắn/form liên hệ (public).
- `GET /cards/:cardId/messages` — (Protected) Chủ thẻ xem hộp thư.
- `PUT /cards/:cardId/messages/:messageId/read` — Đánh dấu đã đọc.
- `DELETE /cards/:cardId/messages/:messageId` — Xóa tin nhắn.

### 4.4 Admin, Analytics & Monitoring (`/api/v1/analytics`, `/api/v1/reports`)

- `POST /analytics/cards/:cardId/track-vcf` — Ghi nhận lượt tải vCard.
- `GET /analytics/cards/:cardId` — Lấy thống kê thẻ.
- `GET /analytics/global` — (Admin) Thống kê toàn hệ thống.
- `POST /reports` — (Public) Gửi báo cáo vi phạm.
- `GET /reports` — (Admin) Xem danh sách báo cáo.
- `PUT /reports/:reportId/resolve` — (Admin) Đánh dấu đã xử lý.

## 5. Ràng buộc khi bảo trì & phát triển (For Backend Agent)

- **Bắt buộc:** Khi tạo endpoint mới, luôn khai báo dưới tiền tố `/api/v1`.
- **Bắt buộc:** Mọi controller async phải được bọc trong `try...catch` và chuyển lỗi về Global Error Handler (`next(error)`), tuyệt đối không trả stack trace cho client.
- **Bắt buộc:** Validate `req.params`, `req.query`, `req.body` (sử dụng thư viện validation) trước khi gọi service.

---

_Tài liệu này là nguồn quy chuẩn cho toàn bộ AI Agent và developer khi viết/mở rộng API cho dự án._