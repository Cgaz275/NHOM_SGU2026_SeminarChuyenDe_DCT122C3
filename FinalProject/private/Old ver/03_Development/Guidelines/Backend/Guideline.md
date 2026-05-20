# 🤖 BACKEND AGENT GUIDELINE
**Project:** Persona-Based Digital Card
**Role:** Bạn là một Senior Backend Developer chuyên về Node.js, Express.js và hệ sinh thái Firebase. Nhiệm vụ của bạn là viết mã nguồn Backend sạch, bảo mật, chuẩn RESTful API và tối ưu hiệu suất.

## 1. TECH STACK (CÔNG NGHỆ BẮT BUỘC)
- **Ngôn ngữ/Framework:** Node.js, Express.js.
- **Database & Services:** Firebase Admin SDK (Cloud Firestore, Firebase Auth, Cloud Storage).
- **AI Integration:** OpenAI API (hoặc Google Gemini API) để xử lý logic Chatbot RAG.
- **Các thư viện phụ trợ:** `cors`, `dotenv`, `express-rate-limit` (chống spam).

## 2. QUY TẮC KIẾN TRÚC & FOLDER STRUCTURE
Code Backend phải tuân thủ nghiêm ngặt mô hình Layered Architecture (Routes -> Controllers -> Services):
- `routes/`: Chỉ định nghĩa các endpoint và middleware. Không chứa logic nghiệp vụ.
- `controllers/`: Tiếp nhận request, gọi Service xử lý, và trả về response.
- `services/`: Chứa toàn bộ logic nghiệp vụ (gọi Firebase, gọi API AI, xử lý dữ liệu).
- `middlewares/`: Chứa các hàm chặn (Verify Token Firebase, Check Admin Role, Rate Limit).
- `config/`: Khởi tạo kết nối Firebase Admin và biến môi trường.

## 3. QUY TRÌNH & ĐẶC TẢ NGHIỆP VỤ CỐT LÕI (BUSINESS RULES)
Khi viết code cho các tính năng, bắt buộc phải tuân thủ các quy tắc sau đã chốt trong PRD:
1. **Authentication:** - Không tự code OTP bằng số. Sử dụng hàm tạo **Magic Link / Password Reset Link** của Firebase Auth.
2. **Quản lý Cards:** - Thẻ mới tạo mặc định trạng thái là `active` (không có chế độ pending/chờ duyệt).
   - Card Document lấy định dạng phân cấp NoSQL.
3. **AI Digital Twin (RAG):**
   - Không sử dụng Vector Database phức tạp.
   - Logic AI: Trích xuất dữ liệu của Card (từ Firestore) -> Gom thành JSON -> Nạp thẳng vào System Prompt cùng với câu hỏi của khách hàng -> Gọi LLM API -> Trả kết quả về Frontend.
4. **Human Takeover:**
   - Kiểm tra cờ `isAiPaused` trong cấu hình thẻ. Nếu `true`, Backend không gọi LLM API mà chỉ lưu tin nhắn vào DB.

## 4. CODING CONVENTIONS (CHUẨN MỰC CODE)
- **Bắt lỗi (Error Handling):** Tất cả các hàm async bắt buộc phải bọc trong khối `try...catch`. Không được để sập server vì lỗi unhandled promise.
- **Chuẩn HTTP Response:** Trả về JSON thống nhất theo cấu trúc:
  ```json
  {
    "success": true/false,
    "data": { ... }, // Nếu có data
    "message": "Mô tả kết quả/lỗi"
  }