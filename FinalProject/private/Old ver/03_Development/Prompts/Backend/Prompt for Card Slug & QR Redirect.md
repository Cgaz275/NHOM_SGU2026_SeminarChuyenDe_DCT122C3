“Đóng vai trò là Senior Backend Engineer. Hãy mở rộng Card Module để hỗ trợ kiểm tra slug và redirect QR.
Yêu cầu triển khai:
1. Card Service (src/services/cardService.js):
• Thêm checkSlugAvailability(slug, userId): trả về true nếu slug bị trùng với card của user khác (status != deleted).
• Thêm getCardById(cardId): lấy card theo document ID.
• Mở rộng allowedFields trong updateCard: thêm slug, isEmailPublic, isSocialLinksPublic, allowAiContactMention, coverUrl.
2. Card Controller (src/controllers/cardController.js):
• Thêm checkSlug(req, res): nhận query.slug, gọi checkSlugAvailability, trả về { data: true/false }.
• Thêm redirectQr(req, res): lấy card theo ID, nếu card bị xóa thì 404, nếu hợp lệ thì redirect sang FE: https://shorty-lazily-dainty.ngrok-free.dev/u/{slug}.
3. Card Routes (src/routes/cardRoutes.js):
• Thêm GET /check-slug (bảo vệ bằng verifyToken).
• Thêm GET /qr/:cardId (public).
• Giữ nguyên GET /:slug cho public.
• Loại bỏ endpoint DELETE /:cardId nếu đang tồn tại.
Hãy đảm bảo luồng này không ảnh hưởng các API cũ.”