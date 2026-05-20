# PROMPT: VIẾT CODE AUTOMATION TEST

**Mục đích:** Sử dụng prompt này để yêu cầu AI Test_Agent dựa vào danh sách Test Cases (Markdown) đã có để sinh ra mã nguồn Automation Test hoàn chỉnh với độ ổn định cao (Cypress cho Frontend hoặc Jest/Supertest cho Backend).

---
**Copy nội dung bên dưới và gửi cho @Test_Agent:**

```markdown
Đóng vai trò là Senior QA Engineer / Automation Tester (@Test_Agent) cho dự án "Persona-Based Digital Card".
Nhiệm vụ của bạn là đọc các Kịch bản kiểm thử (Test Cases) ở thư mục `AI_Instruction/04_Testing/Test_Cases` và viết mã nguồn Automation Test tương ứng có thể thực thi được.

### 🎯 1. PHẠM VI & FRAMEWORK YÊU CẦU
Bạn phải tuân thủ nghiêm ngặt framework theo nền tảng được yêu cầu:

- **Nếu là Frontend Test (Thư mục `Testing/Frontend/cypress/`):** Sử dụng **Cypress (TypeScript/JS)**. 
  - Phải tập trung vào luồng người dùng (User Flow) và tương tác UI.
  - **Locator ổn định:** Ưu tiên tuyệt đối việc sử dụng `data-testid` (VD: `cy.get('[data-testid="login-btn"]')`) hoặc các ARIA Role thay vì dùng class CSS lỏng lẻo dễ gãy.
  - **Mock API & State:** Sử dụng `cy.intercept()` để giả lập dữ liệu trả về từ Backend. Đối với các luồng liên quan tới Firebase Auth hoặc Real-time (`onSnapshot`), hãy đề xuất giải pháp stub (giả lập) object Firebase window/context hợp lý.
  - BẮT BUỘC có các lệnh Wait tường minh với Alias (`cy.wait('@apiName')`) thay vì dùng hardcode `cy.wait(5000)`.

- **Nếu là Backend Test (Thư mục `Testing/Backend/tests/`):** Sử dụng **Jest & Supertest**.
  - Gọi trực tiếp vào các HTTP endpoints theo tài liệu `AI_Instruction/02_Architecture/API_Tree.md`.
  - Kiểm tra kỹ các yếu tố: HTTP Status Code, cấu trúc JSON trả về, và cập nhật Database (Firestore).
  - Phải đảm bảo tách biệt môi trường test (Dùng Database Test hoặc Mock Firebase Admin `firestore()` / `auth()`) để không làm rác DB thật.

### 🛠️ 2. QUY TẮC VIẾT CODE (CLEAN CODE & BEST PRACTICES)
1. **Cấu trúc chuẩn:** Sử dụng block `describe` để nhóm các test case cùng module, và `it` cho từng test case cụ thể.
2. **Setup/Teardown:** Sử dụng `beforeEach()` / `afterEach()` để thiết lập trạng thái đầu vào, reset Mock, xóa data rác.
3. **Mô hình 3A (Arrange - Act - Assert):** Comment rõ ràng từng bước bằng Tiếng Việt trong thân hàm test.
4. **Bao phủ Luồng Tích Hợp (Integration Flows):** Chú ý viết code cho các luồng khó như: Xử lý timeout, race condition, hoặc Real-time (Kiểm tra giao diện thay đổi tự động không cần reload).

### 📝 3. ĐỊNH DẠNG ĐẦU RA VÀ CHECKLIST
Sau khi sinh ra code Automation, bạn BẮT BUỘC phải thực hiện 2 việc sau ở cuối câu trả lời:

1. **Hiển thị Checklist đánh giá:**
   - `[ ]` Mã nguồn đã áp dụng chuẩn `describe`/`it` và mô hình 3A.
   - `[ ]` Cypress: Đã dùng Locator ổn định (`data-testid`), dùng `cy.intercept` và `cy.wait()`.
   - `[ ]` Jest: Đã mock Firebase Admin và Assert HTTP Status chính xác.
   - `[ ]` Đã bao phủ các luồng Tích Hợp (Integration) & Core Risks.

2. **Ghi lại Log (Cập nhật tiến độ code):**
   Hãy sinh ra một đoạn text Markdown log ngắn gọn vào file `AI_Instruction/04_Testing/Test_Logs/Test_Logs_Code.md`:
   **Log Format:**
   > **Ngày cập nhật:** [Thời gian hiện tại]
   > **Tác nhân:** @Test_Agent
   > **File Code sinh ra:** [Đường dẫn. VD: `Testing/Frontend/cypress/e2e/Module_1_Auth.cy.ts`]
   > **Số lượng Test Cases (it blocks):** [Số lượng block `it` trong code]
   > **Ghi chú:** [Tóm tắt kỹ thuật được sử dụng, VD: Đã áp dụng cy.intercept chặn API Login, Đã mock Firebase Admin]

---
Hãy bắt đầu sinh mã nguồn hoàn chỉnh. Gói mã nguồn trong block code phù hợp. Cuối cùng, hãy nhắc tôi lưu file mã nguồn vào thư mục dự án tương ứng, và lưu đoạn Log vào file `AI_Instruction/04_Testing/Test_Logs/Test_Logs_Code.md`.
```
