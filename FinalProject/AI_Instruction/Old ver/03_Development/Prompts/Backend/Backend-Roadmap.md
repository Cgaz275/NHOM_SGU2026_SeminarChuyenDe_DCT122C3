🗺️ BACKEND DEVELOPMENT ROADMAP - PERSONA DIGITAL CARD
Lộ trình này tuân thủ nghiêm ngặt Kiến trúc Phân lớp (Routes -> Controllers -> Services) và sử dụng Firebase Admin SDK.

Phase 1: Móng nhà & Hạ tầng (🎉 ĐÃ HOÀN THÀNH)
[x] Khởi tạo Project Node.js (package.json).

[x] Cài đặt thư viện (express, cors, dotenv, firebase-admin).

[x] Cấu hình kết nối Database Firestore (src/config/firebase.js).

[x] Khởi chạy Server cơ bản (src/server.js) với route /api/v1/health.

[x] Chuẩn bị bộ từ điển Tone Giọng (src/utils/toneMapper.js).

Phase 2: Nạp Dữ Liệu Khởi Tạo (Seeding) (🎉 ĐÃ HOÀN THÀNH)
Mục tiêu: Bơm dữ liệu Knowledge Base và 4 thẻ Demo lên Firestore.

[x] Viết script src/seed.js đọc file knowledge_base.json.

[x] Code logic lưu Global_AI_Rules vào collection ai_knowledge_base.

[x] Code logic khởi tạo User và Card cho 4 thành viên Demo.

[x] Chạy lệnh node src/seed.js và xác nhận dữ liệu trên Firebase Console.

Phase 3: Phân hệ Xác thực & Người dùng (Auth & Users)
Mục tiêu: Đăng nhập, đăng ký và quản lý profile cá nhân.

[x] Middleware: Viết hàm src/middlewares/authMiddleware.js để verify Firebase ID Token (chặn các request không hợp lệ).

[x] Auth Service: Viết src/services/authService.js xử lý logic tạo user.

[x] Auth API: Tạo POST /api/v1/auth/register và POST /api/v1/auth/login.

[x] User API: Tạo GET /api/v1/users/me (Lấy thông tin cá nhân) và PUT /api/v1/users/me (Cập nhật eKYC).

Phase 4: Phân hệ Thẻ Cá Nhân (Digital Cards - Trái tim hệ thống)
Mục tiêu: CRUD (Tạo, Đọc, Sửa, Xóa) cấu hình thẻ.

[x] Card Service: Viết src/services/cardService.js xử lý logic thao tác với thẻ.

[x] API Tạo thẻ: POST /api/v1/cards (Tự động sinh slug và cấu hình AI mặc định).

[x] API Xem thẻ (Public): GET /api/v1/cards/:slug (Khách xem thẻ bằng Link/QR).

[x] API Quản lý thẻ: GET /api/v1/cards/me (Lấy danh sách thẻ của chủ tài khoản).

[x] API Cập nhật thẻ: PUT /api/v1/cards/:cardId (Đổi avatar, theme, link MXH).

[x] API Kiểm tra slug: GET /api/v1/cards/check-slug (Chỉ chủ thẻ).

[x] API Redirect QR: GET /api/v1/cards/qr/:cardId (Public, redirect sang FE).

Phase 5: Phân hệ AI Digital Twin & Cấu hình (AI Integration)
Mục tiêu: Khớp nối dữ liệu Card với API LLM (OpenAI/Gemini).

[x] AI Config API: PUT /api/v1/cards/:cardId/ai-config (Cập nhật System Prompt, Knowledge Data và Tone Giọng).

[x] AI Service: Hoàn thiện src/services/aiService.js. Viết hàm generateAIResponse(message, cardData).

[x] Logic Prompt: Lắp ráp System Prompt từ Global_AI_Rules, aiConfig.systemPrompt, toneMapper, và knowledgeData.

[x] Chat API: POST /api/v1/chat/cards/:cardId/chat (Nhận tin nhắn của khách -> Gọi AI -> Trả kết quả).

[x] Lưu lịch sử hội thoại theo conversationId và trả về cho FE.

[x] Bổ sung chế độ Human Takeover ở cấp hội thoại.

Phase 6: Phân hệ Hộp thư & Human Takeover (Tương tác trực tiếp)
Mục tiêu: Lưu trữ tin nhắn, cho phép chủ thẻ nhảy vào chat thủ công.

[x] Cấu hình Takeover: Thêm route tắt/bật AI PUT /api/v1/cards/:cardId/takeover (cập nhật trường isAiPaused).

[x] Gửi tin nhắn tĩnh: POST /api/v1/cards/:cardId/messages (Dùng khi AI bị lỗi hoặc khi khách submit Form Liên Hệ).

[x] Quản lý Inbox: GET /api/v1/cards/:cardId/messages (Chủ thẻ xem danh sách tin nhắn khách gửi).

[x] Đánh dấu đọc: PUT /api/v1/cards/:cardId/messages/:messageId/read.

[x] Xây dựng Conversations Module: list, send owner message, archive/restore, delete (soft).

Phase 7: Phân hệ Quản trị & Thống kê (Admin & Analytics)
Mục tiêu: Chấm điểm học thuật cao với Dashboard số liệu.

[x] Middleware Admin: Thêm logic check role: 'admin' vào authMiddleware.js.

[x] Thống kê Card: GET /api/v1/analytics/cards/:cardId (Đếm lượt xem, lượt tải VCF).

[x] Thống kê Tổng (Admin): GET /api/v1/analytics/global (Đếm tổng users, tổng cards).

[x] Báo cáo vi phạm (Reports): POST /api/v1/reports (Khách report) và GET /api/v1/reports (Admin xem list report).

[x] Resolve report: PUT /api/v1/reports/:reportId/resolve.

[x] Enrich dữ liệu Admin: Users + Reports có thêm thông tin liên quan card.

[x] Script set-admin: src/set-admin.js để cấp quyền admin thủ công.

[x] Tinh chỉnh Analytics Routes: bỏ track-vcf nếu không còn dùng.

Phase 8: Dọn dẹp & Tối ưu hóa (Deployment Prep)
[x] Error Handling: Viết src/middlewares/errorHandler.js để chuẩn hóa toàn bộ JSON lỗi trả về cho Frontend (HTTP 400, 404, 500).

[x] Bảo mật: Tích hợp express-rate-limit để chống spam API Chat và API Login.

[x] Tinh chỉnh rate limiter (globalLimiter max 1500) để phù hợp demo.

[x] Clean up code, xóa console.log thừa.

Phase 9: Tài liệu hóa & Trải nghiệm Dev
[x] Tích hợp Swagger UI (/api-docs) + swagger-jsdoc cho toàn bộ routes.

[x] Bổ sung JSDoc đầy đủ trong routes chính.