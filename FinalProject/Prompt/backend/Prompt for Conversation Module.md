“Đóng vai trò là Senior Backend Engineer. Hãy bổ sung module Conversations để quản lý hội thoại của chủ thẻ.
Yêu cầu triển khai:
1. Tạo Service (src/services/conversationService.js):
• getConversations(userId): Lấy danh sách card của user, rồi truy vấn collection conversations theo cardId (where in). Với mỗi conversation, lấy subcollection messages (orderBy createdAt asc) và trả về danh sách hội thoại đã sort theo lastMessageAt desc.
• sendOwnerMessage(conversationId, content): Thêm message mới (sender: "owner"), cập nhật lastMessage, lastMessageAt, status: "read", isArchived: false.
• toggleHumanTakeover(conversationId, enabled): Update mode = "human_takeover" hoặc "ai_active". Đồng thời tạo 1 system message ghi nhận sự kiện.
• markConversationRead(conversationId, read): Update status (read/unread) và unreadCount.
• archiveConversation(conversationId): Update isArchived: true, status: "archived".
• restoreConversation(conversationId): Update isArchived: false, status: "read".
• deleteConversation(conversationId): Soft delete bằng cách update status: "deleted".
2. Tạo Controller (src/controllers/conversationController.js):
• Bọc try...catch và trả JSON chuẩn { status, data, message }.
• Validate input: content không được trống, enabled bắt buộc.
3. Tạo Routes (src/routes/conversationRoutes.js):
• Dùng verifyToken cho toàn bộ routes.
• GET /api/v1/conversations
• POST /api/v1/conversations/:id/messages
• PUT /api/v1/conversations/:id/takeover
• PUT /api/v1/conversations/:id/read
• PUT /api/v1/conversations/:id/archive
• PUT /api/v1/conversations/:id/restore
• DELETE /api/v1/conversations/:id
4. Cập nhật server.js:
• Import và gắn conversationRoutes vào /api/v1/conversations.
Đảm bảo logic phù hợp Firestore và giữ nguyên chuẩn phân lớp Routes -> Controllers -> Services.”