“Đóng vai trò là Senior Backend Engineer. Dựa vào Backend-Roadmap.md, tôi đã hoàn thành xuất sắc các Phase từ 1 đến 7. Nhiệm vụ cuối cùng của bạn là thực hiện Phase 8: Dọn dẹp & Tối ưu hóa (Deployment Prep).
Hãy thực hiện các công việc sau:
1. Bảo mật hệ thống (Rate Limiting):
•	Hãy chạy lệnh terminal: npm install express-rate-limit
•	Tạo file src/middlewares/rateLimiter.js. Cấu hình 2 limiter:
o	globalLimiter: Giới hạn 100 requests / 15 phút cho toàn hệ thống.
o	chatLimiter: Giới hạn khắt khe hơn, 10 requests / 1 phút cho riêng nhánh AI Chat (chống spam API LLM).
2. Xử lý lỗi tập trung (Global Error Handler):
•	Tạo file src/middlewares/errorHandler.js. Bắt tất cả các lỗi văng ra và format lại trả về JSON chuẩn: { status: false, message: err.message || "Lỗi máy chủ nội bộ", error: ... }.
3. Cập nhật src/server.js:
•	Import và gắn globalLimiter lên đầu (ngay dưới cors và express.json).
•	Import và gắn errorHandler ở CÚI CÙNG (sau tất cả các route).
•	Import chatLimiter và bổ sung vào route chatRoutes trong file src/routes/chatRoutes.js.
4. Tài liệu hóa (README.md):
•	Viết lại file README.md ở thư mục gốc thật chuyên nghiệp. Bao gồm: Giới thiệu project, Yêu cầu hệ thống (Node.js), Các bước cài đặt (Clone, npm install), Thiết lập biến môi trường .env, Thiết lập Firebase Admin Key, và Lệnh khởi chạy.
Chạy script và hoàn thiện các bước trên để project sẵn sàng deploy!”
