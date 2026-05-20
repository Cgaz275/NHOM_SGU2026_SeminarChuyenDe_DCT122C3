# PROMPT: TẠO TEST CASES CHO MODULE

**Mục đích:** Sử dụng prompt này để yêu cầu AI Test_Agent phân tích yêu cầu từ PRD và thiết kế danh sách Test Cases (Kịch bản kiểm thử) chi tiết cho bất kỳ Module nào trong 7 Module cốt lõi của dự án Persona-Based Digital Card.

---

```markdown
Đóng vai trò là Senior QA Engineer / Automation Tester (@Test_Agent) cho dự án "Persona-Based Digital Card".

Dựa vào các tài liệu dự án mà tôi đã nạp (như `AI_Instruction/01_Requirements/PRD.md`, `AI_Instruction/04_Testing/Test_Plan.md`, `AI_Instruction/02_Architecture/API_Tree.md`), nhiệm vụ của bạn là phân tích và thiết kế Kịch bản kiểm thử (Test Cases) chi tiết cho:

**Module mục tiêu:** [Điền 1 trong 7 Module sau:
1. Xác thực & Người dùng (Auth & Users)
2. Quản lý Thẻ (Cards) & QR Code
3. Cấu hình & Tương tác AI (Chatbot RAG)
4. Quản lý Tin nhắn & Inbox (Conversations)
5. Admin - Quản lý Báo cáo (Reports)
6. Admin - Khóa tài khoản (Real-time Kick-out)
7. Admin - Thống kê (Analytics)]

### 🎯 1. PHẠM VI BAO PHỦ (TEST COVERAGE) BẮT BUỘC

Khi thiết kế Test Cases cho Module này, bạn phải đảm bảo bao phủ đầy đủ các luồng sau:

- **Happy Path:** Ít nhất 1-2 kịch bản người dùng thao tác thành công trong điều kiện lý tưởng.
- **Negative Path & Error Handling:** Các kịch bản nhập sai dữ liệu, thiếu token, sai định dạng.
- **Luồng Tích Hợp (Integration Flows):** BẮT BUỘC phải test KỸ lưỡng sự liền mạch giữa các luồng. Ví dụ: Sự đồng bộ Real-time trên giao diện khi có thay đổi từ Backend/Firebase, chuyển đổi trạng thái khi mạng chậm/timeout, luồng người dùng đa thiết bị, và tương tác chéo giữa các Module (VD: Admin khóa tài khoản -> User đang dùng bị văng ngay lập tức).
- **Edge Cases & Core Risks:** ĐẶC BIỆT chú trọng các rủi ro đã được định nghĩa trong `AI_Instruction/04_Testing/Test_Plan.md` (Bao gồm: Lỗi Real-time Firebase, Hết hạn JWT, AI Hallucination/Prompt Injection, Rate Limit/Bùng nổ cước phí, Rò rỉ thông tin riêng tư).

### 🛠️ 2. QUY TẮC THIẾT KẾ (DESIGN RULES)

- **Không viết code:** Ở giai đoạn này, CHỈ tạo tài liệu đặc tả Test Cases, tuyệt đối chưa viết code Cypress/Jest.
- **Mức độ chi tiết:** Các bước thực hiện (Steps to Reproduce) và Kết quả mong đợi (Expected Result) phải mô tả RÕ RÀNG sự thay đổi ở Frontend (Popup, Redirect) VÀ Backend (Status Code, Database Update).
- **Tính độc lập:** Mỗi Test Case phải độc lập, không phụ thuộc kết quả của Test Case khác.

### 📝 3. ĐỊNH DẠNG ĐẦU RA (OUTPUT FORMAT)

Hãy xuất ra kết quả hoàn toàn bằng ngôn ngữ Markdown. Với mỗi Test Case, dùng format sau:

#### **[Mã TC] - [Tên Test Case ngắn gọn]**

- **Test Type:** [API / UI / E2E / Security / Performance]
- **Priority:** [High / Medium / Low]
- **Pre-condition:** [Điều kiện tiên quyết. VD: User đã login...]
- **Steps to Reproduce:**
  1. [Bước 1...]
  2. [Bước 2...]
- **Expected Result:**
  - **Frontend:** [UI hiển thị thông báo gì...]
  - **Backend:** [HTTP Code, cập nhật DB ra sao...]

### ✅ 4. CHECKLIST HOÀN THÀNH VÀ GHI LOG (COMPLETION CHECKLIST & LOGGING)

Sau khi sinh ra danh sách Test Cases, bạn BẮT BUỘC phải thực hiện 2 việc sau ở cuối câu trả lời:

1. **Hiển thị Checklist đánh giá:**
   - `[ ]` Đã bao phủ Happy Path.
   - `[ ]` Đã bao phủ Negative/Error Path.
   - `[ ]` Đã bao phủ 5 Core Risks từ Test_Plan.md.
   - `[ ]` Format output chuẩn xác (phân tách Frontend/Backend rõ ràng).

2. **Sinh đoạn text Ghi Log (Cập nhật tiến độ):**
   Hãy sinh ra một đoạn text Markdown log ngắn gọn để tôi dán vào file `AI_Instruction/04_Testing/Test_Logs/Test_Logs_TC.md`:
   **Log Format:**
   > **Ngày cập nhật:** [Thời gian hiện tại]
   > **Tác nhân:** @Test_Agent
   > **Module hoàn thành:** [Tên Module]
   > **Tổng số Test Cases:** [Số lượng TC sinh ra]
   > **Ghi chú:** [Tóm tắt các edge cases cốt lõi đã cover hoặc nhắc nhở FE/BE cần lưu ý]

---

Hãy bắt đầu sinh danh sách Test Cases. Sau khi hoàn thành, hãy nhắc tôi lưu nội dung Test Cases vào file `AI_Instruction/04_Testing/Test_Cases/[Tên_Module]_TC.md` và lưu đoạn Log vào file `AI_Instruction/04_Testing/Test_Logs/Test_Logs_TC.md`.
```
