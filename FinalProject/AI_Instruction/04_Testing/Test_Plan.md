# TEST PLAN
**Dự án:** Persona-Based Digital Card
**Phạm vi:** Phiên bản hoàn thiện phục vụ Seminar Chuyên Đề

Tài liệu này định nghĩa Kế hoạch Kiểm thử Tổng thể (Master Test Plan) cho dự án, được phân rã từ các luồng sự kiện mới nhất trong `PRD.md` và kiến trúc API trong `api-tree.md`.

## 1. DANH SÁCH MODULE & CHIẾN LƯỢC KIỂM THỬ

| STT | Module / Tính năng chính | Phân loại | Phương pháp Test | Mức độ ưu tiên | Rủi ro cốt lõi (Risks) |
|:---:|:---|:---:|:---|:---:|:---|
| 1 | **Xác thực & Người dùng (Auth & Users)**<br>- Đăng ký, Đăng nhập, Lấy Profile<br>- **Silent Token Renewal** (Tự động làm mới phiên)<br>- Middleware bảo vệ Token | API / E2E | Jest, Cypress | **High** | Token hết hạn không tự làm mới khiến luồng API bị gián đoạn (Văng đăng nhập). |
| 2 | **Quản lý Thẻ (Cards) & QR Code**<br>- Cấu hình thông tin thẻ (`POST`, `PUT`)<br>- **Sinh QR Code Động** (`GET /qr/:cardId`) | UI / API | Jest, Cypress | **High** | Sinh sai URL trong QR Code khi đổi Domain. Lỗi validate khi Check Slug bị trùng. |
| 3 | **Cấu hình & Tương tác AI (Chatbot RAG)**<br>- Điền form sinh JSON Bối cảnh (`PUT /:cardId/ai-config`)<br>- Chatbot giao tiếp AI (`POST /chat`) | API / AI | Jest | **High** | **AI Hallucination** (Bịa thông tin). **Prompt Injection** (Bị lừa lệnh). Gọi LLM API quá giới hạn. |
| 4 | **Quản lý Tin nhắn & Inbox (Conversations)**<br>- Khách gửi Form tĩnh (`POST /messages`)<br>- Chủ thẻ can thiệp chat tay (`POST /conversations/:id/messages`)<br>- Cờ Takeover (`PUT /:id/takeover`) | UI / API | Cypress, Jest | **Medium** | Xung đột luồng chat: AI tự động chen ngang khi chủ thẻ đang chat tay trực tiếp (Takeover bị lỗi). |
| 5 | **Admin - Quản lý Báo cáo (Reports)**<br>- Khách gửi báo cáo vi phạm (`POST /reports`)<br>- Admin lắng nghe qua `onSnapshot` | API / UI | Cypress, Jest | **Medium** | Dữ liệu báo cáo không đồng bộ ngay lập tức (phải F5 mới thấy). Lỗi rò rỉ bộ nhớ do Firebase Listener. |
| 6 | **Admin - Khóa tài khoản (Real-time Kick-out)**<br>- Admin đổi trạng thái User (`PUT /users/:id/status`)<br>- Frontend tự động đá người dùng | E2E / UI | Cypress | **High** | Khóa tài khoản nhưng Session không bị hủy ngay lập tức (vẫn gọi API được). Popup báo lỗi không xuất hiện. |


## 2. CÁC RỦI RO ĐẶC BIỆT CẦN CHÚ Ý KHI TEST (CORE RISKS)

1. **Thất bại trong Đồng bộ Thời gian thực (Real-time Failures):**
   - **Vấn đề:** Tính năng Kick-out người dùng bị khóa hoặc Hiển thị Báo cáo mới phụ thuộc vào Firebase `onSnapshot`. Nếu Listener không hoạt động, Admin phải tải lại trang, và User bị cấm vẫn xài được tiếp hệ thống.
   - **Hành động Test:** Mở 2 trình duyệt song song. Phía Admin gọi API khóa User -> Kiểm tra phía Client xem có văng ra trang Login `< 0.5s` kèm Popup Đỏ cảnh báo không.

2. **Phiên làm việc gián đoạn do JWT (Token Expiration):**
   - **Vấn đề:** Token Firebase chỉ sống được 1 tiếng. Nếu HTTP Client (apiClient) không tự động gọi hàm làm mới (`getIdToken`) trước mỗi request, thao tác của người dùng sẽ bị từ chối `401 Unauthorized`.
   - **Hành động Test:** Giả lập thao tác ngâm trình duyệt (idle) quá 1 tiếng hoặc fake thời gian sống của Token để kiểm thử cơ chế tự động request Token mới ngầm (Silent Refresh).

3. **AI Hallucination & Prompt Injection (Bảo mật AI):**
   - **Vấn đề:** AI có thể tự ý hứa hẹn giá cả, bịa đặt thông tin không có trong file JSON `persona_data`, hoặc bị khách dùng câu lệnh bẻ khóa (Jailbreak) để văng tục, khai thác thông tin mật.
   - **Hành động Test:** Bắt buộc thiết kế các bộ test case "Tấn công" (Edge cases) bằng những câu hỏi phi logic, câu lệnh hệ thống (`Ignore all previous instructions...`) để kiểm tra độ vững chắc của Guardrails.

4. **API Exhaustion / Bùng nổ cước phí (Rate Limit & Spam):**
   - **Vấn đề:** Khách hoặc Bot chạy Script gọi API Chat hoặc API Gửi tin nhắn tĩnh liên tục gây cạn kiệt ngân sách OpenAI hoặc làm sập Database.
   - **Hành động Test:** Bắn liên tục `> 60 requests` trong thời gian ngắn từ cùng một IP/Session. Kỳ vọng Middleware `rateLimiter.js` chốt chặn và trả về HTTP `429 Too Many Requests`.

5. **Lộ lọt thông tin cá nhân (Privacy Leak):**
   - **Vấn đề:** API `GET /cards/:slug` (Dùng để render Thẻ cho người xem tự do) vô tình trả về JSON chứa Email / SĐT thật của chủ thẻ dù họ đã gạt nút "Ẩn liên hệ".
   - **Hành động Test:** Gọi trực tiếp vào API public, kiểm tra JSON response đảm bảo Backend đã xử lý lọc bỏ hoàn toàn các trường nhạy cảm trước khi ném về Frontend.

---

### ✅ 3. CHECKLIST HOÀN THÀNH (COMPLETION CHECKLIST)
- `[x]` Bảng Module đã bao phủ toàn bộ các Scope có trong PRD và các endpoint trong `api-tree.md`.
- `[x]` Đã đưa ra các chiến lược test phù hợp cho từng loại tính năng (Real-time, UI, AI).
- `[x]` Format chuẩn Markdown, bảng không bị vỡ định dạng.
