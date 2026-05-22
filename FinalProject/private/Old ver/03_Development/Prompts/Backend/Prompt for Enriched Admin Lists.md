“Đóng vai trò là Senior Backend Engineer. Hãy nâng cấp dữ liệu trả về cho Admin khi xem danh sách Users và Reports.
Yêu cầu triển khai:
1. User Service (src/services/userService.js):
• getAllUsers(): Với mỗi user, truy vấn 1 card của user để lấy fullName ưu tiên (card.fullName hoặc card.title). Nếu không có card, dùng fullName từ user.
2. Report Service (src/services/reportService.js):
• getAllReports(): Khi lấy report, nếu có cardId thì truy vấn card và user chủ thẻ để trả về thêm các trường: userId, userStatus, fullName, email.
3. User Controller (src/controllers/userController.js):
• getMe(): Dùng authService.registerUser(req.user) để tự tạo user nếu chưa có.
• Nếu status của user là "banned" thì trả 403 với message phù hợp.
Giữ nguyên cấu trúc JSON { status, data, message } cho mọi response.”