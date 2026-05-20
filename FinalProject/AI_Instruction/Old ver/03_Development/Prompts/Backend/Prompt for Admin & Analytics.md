“Đóng vai trò là Senior Backend Engineer. Dựa vào Backend-Roadmap.md, tôi đã xong các Phase từ 1 đến 6. Nhiệm vụ của bạn bây giờ là thực hiện Phase 7: Phân hệ Quản trị & Thống kê (Admin & Analytics).
Hãy bám sát kiến trúc hiện tại để triển khai các file sau:
1. Nâng cấp Auth Middleware (src/middlewares/authMiddleware.js):
•	Thêm và export hàm verifyAdmin. Middleware này chạy sau verifyToken, kiểm tra xem req.user.role có phải là "admin" hay không. Nếu không, trả về HTTP 403 (Forbidden).
2. Xây dựng Analytics Module (Thống kê):
•	Service (src/services/analyticsService.js):
o	getCardAnalytics(cardId, userId): Lấy thống kê của 1 thẻ (Check quyền chủ thẻ). Tạm thời trả về object mock: { views: 150, vcfDownloads: 45, messagesCount: <đếm số lượng doc trong bảng messages của cardId này> }.
o	getGlobalAnalytics(): Lấy thống kê tổng hệ thống (Dành cho Admin). Đếm số lượng thực tế: tổng document trong users, tổng document trong cards, tổng document trong messages.
•	Controller (src/controllers/analyticsController.js): Gọi service, bọc try...catch, trả về chuẩn JSON.
•	Route (src/routes/analyticsRoutes.js): > - GET /cards/:cardId (Dùng middleware verifyToken).
o	GET /global (Dùng middleware verifyToken VÀ verifyAdmin).
3. Xây dựng Report Module (Báo cáo vi phạm):
•	Tạo collection reports trên Firestore.
•	Service (src/services/reportService.js):
o	createReport(data): Lưu report mới (gồm cardId, reason, reporterEmail, status: 'pending', createdAt).
o	getAllReports(): Lấy danh sách toàn bộ report cho Admin.
•	Controller (src/controllers/reportController.js): Xử lý request/response.
•	Route (src/routes/reportRoutes.js):
o	POST / (Public API - Ai cũng có thể report).
o	GET / (Protected - Dùng verifyToken VÀ verifyAdmin - Chỉ Admin mới được xem).
4. Cập nhật src/server.js:
•	Import và gắn analyticsRoutes vào /api/v1/analytics.
•	Import và gắn reportRoutes vào /api/v1/reports.
Code chuẩn Clean Code, bắt lỗi cẩn thận và chia module rõ ràng.”
