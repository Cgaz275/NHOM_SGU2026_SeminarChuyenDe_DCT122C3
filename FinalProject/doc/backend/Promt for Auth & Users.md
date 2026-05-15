“Đóng vai trò là Senior Backend Engineer. Dựa vào file Backend-Roadmap.md, hiện tại tôi đã hoàn thành Phase 1 và Phase 2. Nhiệm vụ của bạn bây giờ là thực hiện Phase 3: Phân hệ Xác thực & Người dùng.
Hãy đọc cấu trúc trong api-tree.md (nhánh /auth và /users) và database-schema.md (Collection users) để viết code chuẩn RESTful.
Yêu cầu chi tiết các file cần tạo/cập nhật:
1.	Middleware (src/middlewares/authMiddleware.js): Viết middleware verifyToken sử dụng firebase-admin để xác thực JWT Token từ request header (Bearer <token>). Gắn req.user nếu hợp lệ.
2.	Services (src/services/authService.js & src/services/userService.js): > - authService: Xử lý logic đăng ký (tạo document trong collection users nếu chưa có). Đăng nhập và Quên mật khẩu chủ yếu do Firebase Auth bên Frontend lo, Backend chỉ cần trả về OK nếu token hợp lệ.
o	userService: Xử lý logic GET /me (lấy profile) và PUT /me (cập nhật thông tin eKYC).
3.	Controllers (src/controllers/authController.js & src/controllers/userController.js): Gọi các hàm từ Service, bọc try...catch, trả về JSON chuẩn { status, data, message }.
4.	Routes (src/routes/authRoutes.js & src/routes/userRoutes.js): Định nghĩa các endpoint tương ứng trong api-tree.md. Áp dụng authMiddleware cho các route của /users.
5.	Cập nhật src/server.js: Import và sử dụng 2 file routes này vào Express app (app.use('/api/v1/auth', authRoutes), v.v.).
Viết code gọn gàng, chia module rõ ràng, tự động tạo thư mục nếu chưa có.”
