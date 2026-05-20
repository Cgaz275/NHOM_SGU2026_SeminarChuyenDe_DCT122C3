“Đóng vai trò là Senior Backend Engineer. Dựa vào Backend-Roadmap.md, tôi đã xong Phase 1, 2, 3, 4. Nhiệm vụ của bạn bây giờ là thực hiện Phase 5: Phân hệ AI Digital Twin & Cấu hình.
Hãy bám sát api-tree.md và database-schema.md để triển khai các file sau:
1. Cập nhật Card Module (Để cấu hình AI):
•	Service & Controller (cardService.js, cardController.js): Thêm logic hàm updateAiConfig(cardId, userId, aiConfigData). Cho phép cập nhật object aiConfig (gồm systemPrompt, knowledgeData, toneOfVoice, isAiPaused) và trường aiStatus.
•	Route (cardRoutes.js): Thêm endpoint PUT /:cardId/ai-config. Sử dụng middleware verifyToken để bảo vệ. Đảm bảo chỉ chủ thẻ mới được sửa.
2. Hoàn thiện AI Service (src/services/aiService.js):
•	File này đã được khởi tạo trước đó. Hãy import getToneInstruction từ ../utils/toneMapper.js.
•	Viết hàm processChat(cardId, userMessage):
o	Bước 1: Truy vấn Firestore lấy thông tin Card bằng cardId. Nếu không thấy, quăng lỗi 404.
o	Bước 2: Kiểm tra điều kiện: Nếu status != "active" hoặc aiStatus != "Ready" hoặc isAiPaused == true -> Quăng lỗi HTTP 403 báo "AI hiện không khả dụng, vui lòng để lại lời nhắn".
o	Bước 3: Truy vấn collection ai_knowledge_base (doc global_rules) để lấy rules chung. Lấy toneInstruction dựa vào cardData.aiConfig.toneOfVoice.
o	Bước 4 (Mock LLM): Thay vì gọi thẳng API OpenAI/Gemini ngay bây giờ, hãy MOCK (giả lập) kết quả trả về để test luồng trước. Trả về chuỗi: "Ghi nhận tin nhắn: " + userMessage + ". Đây là phản hồi giả lập từ AI của " + cardData.fullName.
3. Tạo Chat Module (Xử lý tin nhắn của khách):
•	Controller (src/controllers/chatController.js): Nhận request body { message }, gọi aiService.processChat, trả về { status, data: { reply }, message }.
•	Route (src/routes/chatRoutes.js): Tạo endpoint POST /cards/:cardId/chat. Lưu ý: Đây là Public API (Khách hàng quét mã QR sẽ dùng), nên KHÔNG DÙNG verifyToken.
4. Cập nhật src/server.js:
•	Import chatRoutes và gắn vào endpoint /api/v1/chat.
Code chuẩn Clean Code, bắt lỗi cẩn thận bằng try...catch và trả về mã HTTP hợp lý.”
