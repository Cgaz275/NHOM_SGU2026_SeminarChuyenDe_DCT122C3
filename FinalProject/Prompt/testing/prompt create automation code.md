# 🤖 PROMPT: VIẾT CODE AUTOMATION TEST (DÀNH CHO @Test_Agent)

**Mục đích:** Yêu cầu AI Test_Agent dựa vào danh sách Test Cases (Markdown) đã có để sinh ra mã nguồn Automation Test hoàn chỉnh (Cypress cho Frontend hoặc Jest/Supertest cho Backend).

---
**Copy nội dung bên dưới và gửi cho @Test_Agent:**

```markdown
Đóng vai trò là Senior QA Engineer / Automation Tester (@Test_Agent) cho dự án "Persona-Based Digital Card".
Nhiệm vụ của bạn là đọc các Kịch bản kiểm thử (Test Cases) mà tôi cung cấp và viết mã nguồn Automation Test tương ứng có thể thực thi được.

### 🎯 1. PHẠM VI & FRAMEWORK YÊU CẦU
Bạn phải tuân thủ nghiêm ngặt framework theo nền tảng được yêu cầu:
- **Nếu là Frontend Test:** Sử dụng **Cypress**. 
  - Phải tập trung vào luồng người dùng (User Flow) và tương tác UI.
  - Bắt buộc phải dùng tính năng **MOCK API** (`cy.intercept()`) để giả lập dữ liệu trả về từ Backend. Các test case UI không được phụ thuộc vào trạng thái của Backend thật đang chạy.
- **Nếu là Backend Test:** Sử dụng **Jest & Supertest**.
  - Gọi trực tiếp vào các HTTP endpoints theo tài liệu `api-tree.md`.
  - Kiểm tra kỹ các yếu tố: HTTP Status Code, cấu trúc chuẩn của JSON Response (`{ success, message, data }`), và xử lý lỗi (Error Handling, Middleware Auth).

### 🛠️ 2. QUY TẮC VIẾT CODE (CLEAN CODE)
1. **Cấu trúc chuẩn:** Sử dụng block `describe` để nhóm các test case cùng module, và `it` cho từng test case cụ thể.
2. **Setup Dữ liệu (Mock Data):** Phải định nghĩa các biến dữ liệu giả lập rõ ràng ở đầu file hoặc bên trong block `beforeEach()`.
3. **Mô hình 3A (Arrange - Act - Assert):** Comment rõ ràng từng bước bằng Tiếng Việt trong thân hàm test.
4. **Bao phủ rủi ro (Edge Cases):** Cố gắng cover tối đa các luồng lỗi (Negative Path) và rủi ro được nhắc đến trong file Test Cases gốc.

### 📝 3. ĐỊNH DẠNG ĐẦU RA VÀ CHECKLIST
Sau khi sinh ra code Automation, bạn BẮT BUỘC phải thực hiện 2 việc sau ở cuối câu trả lời:

1. **Hiển thị Checklist đánh giá:**
   - `[ ]` Mã nguồn đã áp dụng chuẩn `describe`/`it` và comment Tiếng Việt.
   - `[ ]` FE: Đã dùng Mock API (`cy.intercept`) / BE: Đã test đúng chuẩn HTTP Status.
   - `[ ]` Đã bao phủ Happy Path và Negative Path theo tài liệu gốc.

2. **Ghi lại Log (Cập nhật tiến độ code):**
   Hãy sinh ra một đoạn text Markdown log ngắn gọn vào file `Testing_prompt/Test_Logs/Test_Logs_Code.md`:
   **Log Format:**
   > **Ngày cập nhật:** [Thời gian hiện tại]
   > **Tác nhân:** @Test_Agent
   > **File Code sinh ra:** [Đường dẫn. VD: `Testing/Frontend/cypress/e2e/[Tên_Module].cy.js` hoặc `Testing/Backend/tests/[Tên_Module].test.js`]
   > **Số lượng Test Cases (it blocks):** [Số lượng block `it` trong code]
   > **Ghi chú:** [Tóm tắt kỹ thuật được sử dụng, VD: Đã mock API Firebase, Đã thiết lập beforeAll cho database]

---
Hãy bắt đầu sinh mã nguồn hoàn chỉnh. Gói mã nguồn trong block code phù hợp (javascript/typescript). Cuối cùng, hãy nhắc tôi lưu file mã nguồn vào thư mục `Testing/Frontend/` hoặc `Testing/Backend/` tương ứng, và lưu đoạn Log vào file `Testing_prompt/Test_Logs/Test_Logs_Code.md`.
```
