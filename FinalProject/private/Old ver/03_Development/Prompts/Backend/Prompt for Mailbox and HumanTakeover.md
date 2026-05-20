“Đóng vai trò là Senior Backend Engineer. Dựa vào Backend-Roadmap.md, tôi đã xong các Phase từ 1 đến 5. Nhiệm vụ của bạn bây giờ là thực hiện Phase 6: Phân hệ Hộp thư & Human Takeover.
Hãy bám sát kiến trúc hiện tại để triển khai các file sau:
1. Tính năng Takeover (Tạm dừng AI):
•	Service & Controller (cardService.js, cardController.js): Thêm hàm toggleTakeover(cardId, userId, isAiPaused). Cập nhật trường isAiPaused (boolean) trong document của thẻ. Đảm bảo chỉ chủ thẻ mới được quyền sửa.
•	Route (cardRoutes.js): Thêm endpoint PUT /:cardId/takeover. Sử dụng authMiddleware.verifyToken.
2. Xây dựng Message Module (Quản lý Hộp thư): Hãy tạo một Collection mới tên là messages trên Firestore để lưu tin nhắn.
•	Service (src/services/messageService.js):
o	leaveMessage(cardId, data): Lưu tin nhắn mới vào collection messages. Data gồm cardId, senderName, senderEmail, content, isRead: false, createdAt: timestamp.
o	getMessages(cardId, userId): Lấy danh sách tin nhắn của 1 thẻ. Nhớ check quyền: userId phải là chủ sở hữu của cardId đó.
o	markAsRead(messageId, cardId, userId): Cập nhật isRead: true. Cũng cần check quyền chủ thẻ.
•	Controller (src/controllers/messageController.js): Xử lý request/response, bọc try...catch, trả JSON chuẩn { status, data, message }.
•	Route (src/routes/messageRoutes.js): Tạo các endpoint sau:
o	POST /:cardId/messages (Public API - Cho khách gửi tin nhắn/form liên hệ).
o	GET /:cardId/messages (Protected - Dùng verifyToken - Chủ thẻ xem inbox).
o	PUT /:cardId/messages/:messageId/read (Protected - Dùng verifyToken - Đánh dấu đã đọc).
3. Cập nhật src/server.js:
•	Import messageRoutes và gắn vào endpoint /api/v1/cards (để khớp với URL /api/v1/cards/:cardId/messages).
Viết code gọn gàng, chia module rõ ràng.”
