“Đóng vai trò là Senior Backend Engineer. Hãy nâng cấp luồng chat để lưu lịch sử hội thoại, hỗ trợ human takeover, và trả lại conversationId cho frontend.
Yêu cầu chi tiết:
1. Cập nhật AI Service (src/services/aiService.js):
• processChat nhận thêm tham số: (cardId, userMessage, conversationId, guestName, guestContact, forceHumanTakeover).
• Nếu card status không active/published hoặc aiStatus không Ready/AI Ready hoặc aiConfig.isAiPaused = true và KHÔNG forceHumanTakeover → trả lỗi 403.
• Tạo/Reuse conversation:
  - Nếu có conversationId hợp lệ → dùng lại.
  - Nếu không có, nhưng có guestContact → tìm conversation mới nhất theo cardId + visitorEmail.
  - Nếu vẫn không có → tạo mới document conversations với: cardId, createdAt, lastMessage, lastMessageAt, status: "unread", isArchived: false, mode, visitorName, visitorEmail, visitorPhone, leadTag.
• Lưu message của khách vào subcollection conversations/{id}/messages (sender: "visitor").
• Nếu mode = "human_takeover" → return { reply: null, conversationId } để FE biết AI đang tắt.
• Nếu mode = "ai_active" → gọi OpenAI, lưu message AI vào subcollection, update lastMessage và lastMessageAt.
• System prompt phải bao gồm: họ tên, jobTitle, bio, knowledgeBase (skills, projects, experiences) + Guardrails + AI_Reading_Guide + toneInstruction.
2. Cập nhật Chat Controller (src/controllers/chatController.js):
• chatWithCard trả về { reply, conversationId }.
• Thêm getChatHistory: nhận cardId và guestContact (query). Tìm conversation mới nhất theo cardId + visitorEmail, load messages theo createdAt asc, trả { conversationId, messages, mode }.
3. Cập nhật Chat Routes (src/routes/chatRoutes.js):
• POST /api/v1/chat/cards/:cardId/chat (giữ chatLimiter).
• GET /api/v1/chat/cards/:cardId/history.
Hãy đảm bảo lưu lịch sử chat đầy đủ cho cả AI và người dùng.”