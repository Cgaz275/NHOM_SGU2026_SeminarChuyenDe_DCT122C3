“Đóng vai trò là Senior Backend Engineer. Dựa vào Backend-Roadmap.md, tôi đã xong Phase 1, 2, 3. Nhiệm vụ của bạn bây giờ là thực hiện Phase 4: Phân hệ Thẻ Cá Nhân (Digital Cards).
Hãy đọc cấu trúc nhánh /cards trong api-tree.md và bảng cards trong database-schema.md để triển khai.
Yêu cầu chi tiết các file cần tạo/cập nhật:
1.	Service (src/services/cardService.js): Viết các hàm giao tiếp với Firestore (db.collection('cards')):
-	createCard(userId, data): Tạo thẻ mới. Tự động sinh slug duy nhất từ fullName (hoặc chuỗi random). Gán status: "active", aiStatus: "Draft", và khởi tạo aiConfig mặc định.
-	getCardBySlug(slug): Dùng cho khách Public. Truy vấn thẻ theo slug.
-	getMyCards(userId): Trả về danh sách thẻ thuộc về userId.
-	updateCard(cardId, userId, updateData): Cập nhật thông tin thẻ, đảm bảo chỉ chủ thẻ (userId) mới có quyền sửa.
2.	Controller (src/controllers/cardController.js): Nhận request, gọi Service tương ứng, xử lý lỗi bằng try...catch và trả về JSON chuẩn { status, data, message }.
3.	Routes (src/routes/cardRoutes.js): > - Cần dùng authMiddleware.verifyToken (đã viết ở Phase 3) để bảo vệ các route: POST /, GET /me, PUT /:cardId.
o	Route GET /:slug là Public (không cần middleware).
4.	Cập nhật src/server.js: Import và gắn cardRoutes vào endpoint /api/v1/cards.
Viết code chuẩn Clean Code, bắt lỗi cẩn thận và trả về mã HTTP status code (200, 201, 400, 404) hợp lý.”
