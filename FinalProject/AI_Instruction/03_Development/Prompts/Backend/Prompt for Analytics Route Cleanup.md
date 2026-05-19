“Đóng vai trò là Senior Backend Engineer. Hãy tinh chỉnh Analytics Routes để đồng bộ API mới.
Yêu cầu:
1. Cập nhật src/routes/analyticsRoutes.js:
• Giữ GET /cards/:cardId và GET /global.
• Loại bỏ endpoint POST /cards/:cardId/track-vcf nếu đang tồn tại.
2. Nếu controller có hàm trackVcfDownload nhưng không còn dùng, có thể để lại tạm thời, nhưng routes không được expose nữa.
Mục tiêu: API analytics gọn và đúng theo luồng mới.”