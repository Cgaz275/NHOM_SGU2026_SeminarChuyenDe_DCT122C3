“Đóng vai trò là Senior Backend Engineer. Hãy tinh chỉnh rate limiter để phù hợp demo.
Yêu cầu:
1. Cập nhật src/middlewares/rateLimiter.js:
• globalLimiter: max = 1500 requests / 15 phút.
• chatLimiter: giữ 10 requests / 1 phút.
• Thêm validate: false cho cả 2 limiter để tránh lỗi validate trong runtime.
2. Không thay đổi message trả về và các cấu hình còn lại.
Mục tiêu: tránh bị block khi demo, vẫn giữ giới hạn phù hợp.”