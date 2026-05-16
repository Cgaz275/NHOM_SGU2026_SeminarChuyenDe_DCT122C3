# 📋 MASTER TEST PLAN (MVP)
**Dự án:** Persona-Based Digital Card
**Phạm vi:** Phiên bản MVP phục vụ Seminar Chuyên Đề
**Đối tượng sử dụng:** @Test_Agent, @Leader_Agent

Tài liệu này định nghĩa Kế hoạch Kiểm thử Tổng thể (Master Test Plan) cho dự án, phân rã từ `PRD.md` và `api-tree.md`.

## 1. DANH SÁCH MODULE & CHIẾN LƯỢC KIỂM THỬ

| STT | Module / Tính năng chính | Phân loại | Phương pháp Test (Tools) | Mức độ ưu tiên | Rủi ro cốt lõi (Risks) |
|:---:|:---|:---:|:---|:---:|:---|
| 1 | **Xác thực & Người dùng (Auth)**<br>- Đăng nhập Google / Magic Link<br>- Middleware xác thực Token | API / E2E | Jest, Cypress | **High** | Bỏ qua middleware check token. Không bắt được lỗi Firebase Auth timeout. |
| 2 | **Quản lý Thẻ & Profile Builder**<br>- Cập nhật Bio, Link MXH<br>- Tải QR/VCF, Ẩn/hiện thông tin liên lạc | UI / API | Jest, Cypress | **High** | File VCF sai chuẩn (không lưu được danh bạ). QR tải xuống bị lỗi UI. Rò rỉ SĐT cá nhân. |
| 3 | **Cấu hình AI & Nạp tri thức**<br>- Điền form chuyên môn sinh ra JSON<br>- Viết System Prompt | API | Jest | **High** | Chuỗi JSON sinh ra bị sai cú pháp làm lỗi luồng RAG. Nội dung quá dài gây vượt Token Limit. |
| 4 | **Tương tác Chatbot AI (RAG)**<br>- Khách chat với AI trên trang Public<br>- Thu thập Lead (SĐT khách) | API / AI | Jest (Mock LLM) | **High** | **AI Hallucination** (Bịa thông tin). **Prompt Injection** (Bị thao túng). API bị gọi lặp vô hạn. |
| 5 | **Fallback & Inbox**<br>- Chuyển sang Form liên hệ khi AI Error<br>- Xem và đánh dấu tin nhắn đã đọc | UI / E2E | Cypress, Jest | **Medium** | Form tĩnh bị lỗi không hoạt động khi API của AI sập (mất kết nối Lead). |
| 6 | **Human Takeover**<br>- Cờ `isAiPaused`<br>- Chủ thẻ chat trực tiếp thay AI | API / E2E | Cypress, Jest | **Medium** | Xung đột luồng chat: Chủ thẻ đang chat tay nhưng AI vẫn tự động chen ngang trả lời. |
| 7 | **Quản trị (Admin Panel)**<br>- Quản lý User (Khóa/Mở, tìm kiếm)<br>- Xử lý báo cáo, Khóa thẻ vi phạm | API | Jest | **Low** | Lỗ hổng phân quyền: Người dùng thường (`role: user`) gọi được API của Admin. |

## 2. CÁC RỦI RO ĐẶC BIỆT CẦN CHÚ Ý KHI TEST (CORE RISKS)

1. **AI Hallucination & Prompt Injection (Bảo mật AI):**
   - *Vấn đề:* AI tự ý hứa hẹn giá cả, nói những điều không có trong file JSON `persona_data`, hoặc bị khách lừa lệnh để văng tục.
   - *Hành động Test:* Test Agent bắt buộc phải tạo các test case "Tấn công" (Edge cases) bằng những câu hỏi ngoài lề hoặc lệnh thao túng để kiểm tra System Prompt Guardrails.

2. **API Exhaustion / Spam Rate Limit (Tài chính & Hiệu năng):**
   - *Vấn đề:* Khách hoặc Bot spam gọi API Chat liên tục gây cạn kiệt tiền trong tài khoản OpenRouter. Hoặc dùng tool submit Spam vào Form liên hệ tĩnh.
   - *Hành động Test:* Mô phỏng việc bắn `> 20 requests` liên tiếp từ cùng một IP/User. Kỳ vọng hệ thống trả về HTTP `429 Too Many Requests`.

3. **Lộ lọt thông tin cá nhân (Privacy Leak):**
   - *Vấn đề:* API `GET /cards/:slug` (dùng để render trang công khai) trả về nguyên cục JSON chứa cả Số điện thoại / Email thật của chủ thẻ dù họ đã gạt nút "Ẩn số điện thoại".
   - *Hành động Test:* Test API response, đảm bảo Backend đã xử lý lọc bỏ (omit) các trường nhạy cảm trước khi trả về Frontend.

4. **Quản lý kết nối bên thứ 3 (Third-party Timeout):**
   - *Vấn đề:* API của OpenRouter hoặc Firebase bị nghẽn mạng, treo (timeout).
   - *Hành động Test:* Mock giả lập API trả về lỗi 503 hoặc delay 10 giây. Đảm bảo Frontend tự động fallback sang "Form liên hệ tĩnh" thay vì để màn hình trắng báo lỗi.
