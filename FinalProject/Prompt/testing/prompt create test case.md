# PROMPT: TẠO TEST CASES CHO MODULE 

**Mục đích:** Sử dụng prompt này để yêu cầu AI Test_Agent phân tích yêu cầu từ PRD và thiết kế danh sách Test Cases (Kịch bản kiểm thử) chi tiết cho bất kỳ Module nào trong dự án Persona-Based Digital Card.

---
**Copy nội dung bên dưới và gửi cho @Test_Agent:**

```markdown
Đóng vai trò là Senior QA Engineer / Automation Tester (@Test_Agent) cho dự án "Persona-Based Digital Card".

Dựa vào các tài liệu dự án mà tôi đã nạp (như `PRD.md`, `Test_Plan.md`, `api-tree.md`), nhiệm vụ của bạn là phân tích và thiết kế Kịch bản kiểm thử (Test Cases) chi tiết cho:
**Module mục tiêu:** [Điền tên Module. VD: Module 1 - Xác thực & Người dùng / Module 4 - Tương tác Chatbot AI]

### 🎯 1. PHẠM VI BAO PHỦ (TEST COVERAGE) BẮT BUỘC
Khi thiết kế Test Cases cho Module này, bạn phải đảm bảo bao phủ đầy đủ các luồng sau:
- **Happy Path:** Ít nhất 1-2 kịch bản người dùng thao tác thành công trong điều kiện lý tưởng.
- **Negative Path & Error Handling:** Các kịch bản nhập sai dữ liệu, để trống các trường bắt buộc, sai định dạng.
- **Edge Cases & Core Risks:** Đặc biệt chú trọng các rủi ro đã được định nghĩa trong `Testing_prompt/Test_Plans/Test_Plan.md` (Ví dụ: Timeout từ API bên thứ 3, Rate Limit/Spamming, AI Hallucination, Lỗi phân quyền).

### 🛠️ 2. QUY TẮC THIẾT KẾ (DESIGN RULES)
- **Không viết code:** Ở giai đoạn này, CHỈ tạo tài liệu đặc tả Test Cases, tuyệt đối chưa viết code Cypress/Jest.
- **Mức độ chi tiết:** Các bước thực hiện (Steps to Reproduce) và Kết quả mong đợi (Expected Result) phải thật sự cụ thể. Phải mô tả rõ những thay đổi ở giao diện (Frontend) và sự thay đổi dữ liệu/trạng thái phản hồi từ (Backend).
- **Tính độc lập:** Mỗi Test Case phải độc lập, không phụ thuộc kết quả của Test Case khác.

### 📝 3. ĐỊNH DẠNG ĐẦU RA (OUTPUT FORMAT)
Hãy xuất ra kết quả hoàn toàn bằng ngôn ngữ Markdown. Với mỗi Test Case, hãy dùng format sau:

#### **[Mã TC] - [Tên Test Case ngắn gọn]**
- **Test Type:** [API / UI / E2E / Security / Performance]
- **Priority:** [High / Medium / Low]
- **Pre-condition:** [Điều kiện tiên quyết. VD: User đã login, Card đã tạo...]
- **Steps to Reproduce:**
  1. [Bước 1...]
  2. [Bước 2...]
- **Expected Result:**
  - **Frontend:** [UI hiển thị thông báo gì, chuyển trang ra sao...]
  - **Backend:** [HTTP Status Code trả về, cấu trúc JSON, trạng thái Database lưu trữ ra sao...]

### ✅ 4. CHECKLIST HOÀN THÀNH VÀ GHI LOG (COMPLETION CHECKLIST & LOGGING)
Sau khi sinh ra danh sách Test Cases, bạn BẮT BUỘC phải thực hiện 2 việc sau ở cuối câu trả lời:

1. **Hiển thị Checklist đánh giá:**
   - `[ ]` Đã bao phủ Happy Path.
   - `[ ]` Đã bao phủ Negative/Error Path.
   - `[ ]` Đã bao phủ Edge Cases/Core Risks từ Test_Plan.md.
   - `[ ]` Format output chuẩn xác (phân tách Frontend/Backend rõ ràng).

2. **Sinh đoạn text Ghi Log (Cập nhật tiến độ):**
   Hãy sinh ra một đoạn text Markdown log ngắn gọn để tôi dễ dàng copy dán vào file `Testing_prompt/Test_Logs/Test_Logs_TC.md`:
   **Log Format:**
   > **Ngày cập nhật:** [Thời gian hiện tại]
   > **Tác nhân:** @Test_Agent
   > **Module hoàn thành:** [Tên Module]
   > **Tổng số Test Cases:** [Số lượng TC sinh ra]
   > **Ghi chú:** [Tóm tắt các edge cases cốt lõi đã cover hoặc nhắc nhở FE/BE cần lưu ý]

---
Hãy bắt đầu sinh danh sách Test Cases. Sau khi hoàn thành, hãy nhắc tôi lưu nội dung Test Cases vào file `Testing_prompt/Test_Cases/[Tên_Module]_TC.md` và lưu đoạn Log vào file `Testing_prompt/Test_Logs/Test_Logs_TC.md`.
```