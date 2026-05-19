# PROMPT: TẠO TEST PLAN

**Mục đích:** Sử dụng prompt này để yêu cầu AI Test_Agent đọc tài liệu đặc tả dự án (PRD.md) và thiết lập một Bản kế hoạch Kiểm thử Tổng thể (Master Test Plan) hoàn chỉnh. Kế hoạch này sẽ làm kim chỉ nam cho toàn bộ quá trình viết Test Cases và Test Automation sau này.

---
**Copy nội dung bên dưới và gửi cho @Test_Agent:**

```markdown
Đóng vai trò là QA Lead / Automation Architect (@Test_Agent) cho dự án "Persona-Based Digital Card".

Dựa vào các tài liệu đặc tả hệ thống (như `PRD.md` và `api-tree.md` / API Docs) mà tôi đã cung cấp, nhiệm vụ của bạn là thiết kế một Kế hoạch Kiểm thử Tổng thể (Master Test Plan).

### 🎯 1. PHẠM VI YÊU CẦU (REQUIREMENTS)
Bản Master Test Plan phải tóm tắt chiến lược kiểm thử cho toàn bộ các module có trong dự án. Đặc biệt chú ý đến:
- Phân tách rõ ràng phương pháp kiểm thử (Manual, API, E2E) và công cụ dự kiến (Jest, Cypress).
- Bám sát các công nghệ lõi như Firebase (Auth, Firestore real-time), Next.js, và LLM (OpenAI API).

### 🛠️ 2. CẤU TRÚC ĐẦU RA (OUTPUT FORMAT)
Hãy xuất kết quả hoàn toàn bằng ngôn ngữ Markdown để tôi có thể lưu trực tiếp thành file `Test_Plan.md`. Cấu trúc BẮT BUỘC như sau:

#### **Phần 1: DANH SÁCH MODULE & CHIẾN LƯỢC KIỂM THỬ**
Trình bày dưới dạng Bảng (Table) với các cột:
- **STT**
- **Module / Tính năng chính:** (VD: Xác thực, Chatbot RAG, Admin Dashboard, v.v.)
- **Phân loại:** [API / UI / E2E]
- **Phương pháp Test:** [Jest / Cypress / Manual]
- **Mức độ ưu tiên:** [High / Medium / Low]
- **Rủi ro cốt lõi (Risks):** (Ghi chú rủi ro lớn nhất nếu module này hỏng).

#### **Phần 2: CÁC RỦI RO ĐẶC BIỆT CẦN CHÚ Ý KHI TEST (CORE RISKS)**
Hãy liệt kê chi tiết từ 3-5 rủi ro lớn nhất mang tính hệ thống (ví dụ: Timeout API bên thứ 3, AI bị tiêm nhiễm Prompt, Token hết hạn, v.v.). Với mỗi rủi ro:
- **Vấn đề:** Giải thích ngắn gọn lỗi có thể xảy ra.
- **Hành động Test:** Hướng dẫn ngắn gọn cách QA cần làm để tái hiện hoặc ngăn chặn rủi ro này.

### ✅ 3. CHECKLIST HOÀN THÀNH (COMPLETION CHECKLIST)
Sau khi sinh ra Master Test Plan, bạn BẮT BUỘC hiển thị Checklist này để xác nhận:
- `[ ]` Bảng Module đã bao phủ toàn bộ các Scope có trong PRD.
- `[ ]` Đã đưa ra các chiến lược test phù hợp cho từng loại tính năng (Real-time, UI, AI).
- `[ ]` Format chuẩn Markdown, bảng không bị vỡ định dạng.

---
Hãy bắt đầu sinh tài liệu Test Plan. Sau khi hoàn thành, hãy lưu nội dung vào file `Testing_prompt/Test_Plans/Test_Plan.md`.
```
