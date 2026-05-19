# AI-NATIVE SDLC WORKFLOW

Chào mừng các AI Agents (Product Manager, Architect, Backend/Frontend Developer, QA) đến với dự án **Persona-Based Digital Card**.

Tài liệu trong dự án này được thiết kế và quy hoạch nghiêm ngặt theo mô hình **AI-Native Software Development Life Cycle (SDLC)**. Để đảm bảo tính nhất quán và chính xác, các AI Agents VUI LÒNG tuân thủ đúng quy trình đọc tài liệu theo từng Giai đoạn (Phases) như sau:

---

## 📖 LỘ TRÌNH ĐỌC TÀI LIỆU (READING WORKFLOW)

### 🔴 Phase 1: Nhận thức Yêu cầu (Product Manager Agent)
Trước khi đưa ra bất kỳ quyết định kỹ thuật nào, Agent PHẢI hiểu rõ mục tiêu kinh doanh và logic nghiệp vụ.
👉 **Tài liệu cần đọc:** `AI_Instruction/01_Requirements/PRD.md`

### 🟡 Phase 2: Nắm bắt Kiến trúc (System Architect Agent)
Sau khi hiểu yêu cầu, Agent PHẢI xem bản đồ hệ thống và tài liệu API để biết các thành phần giao tiếp với nhau như thế nào.
👉 **Tài liệu cần đọc:** 
- `AI_Instruction/02_Architecture/System_Design.md` (Cấu trúc thư mục & Tổng quan hệ thống)
- `AI_Instruction/02_Architecture/API_Tree.md` (Sơ đồ luồng API)

### 🟢 Phase 3: Triển khai Code (Developer Agent)
Chỉ sau khi đã hiểu Yêu cầu và Kiến trúc, Backend/Frontend Agent mới được phép tiến hành code. Khi code, bắt buộc tuân thủ các quy tắc trong Guidelines.
👉 **Tài liệu cần đọc:**
- Thư mục `AI_Instruction/03_Development/Guidelines/` (Chứa quy chuẩn code Backend, Cấu trúc thư mục, Naming Convention...)
- Thư mục `AI_Instruction/03_Development/Prompts/` (Chứa các prompt mẫu để sinh code chuẩn xác)

### 🔵 Phase 4: Kiểm thử và Đảm bảo Chất lượng (QA / Test Agent)
Sau khi code xong, Test Agent có nhiệm vụ viết Test Cases và Automation Scripts dựa vào Test Plan đã duyệt.
👉 **Tài liệu cần đọc:**
- `AI_Instruction/04_Testing/Test_Plan.md` (Chiến lược kiểm thử tổng thể)
- Thư mục `AI_Instruction/04_Testing/Testing_Guidelines/` (Hướng dẫn sử dụng Cypress/Jest)
- Thư mục `AI_Instruction/04_Testing/Prompts/` (Prompt sinh Test Case và Automation Code)

---

## ⚠️ QUY TẮC CỐT LÕI (CORE RULES CHO AI)
1. **Không "nhảy cóc" Phase:** Agent không được viết Code (Phase 3) nếu chưa kiểm tra lại PRD (Phase 1) và API Tree (Phase 2).
2. **Tuân thủ Guidelines:** Mọi mã nguồn sinh ra phải tuân thủ tuyệt đối các file `.md` trong thư mục `03_Development/Guidelines`.
3. **Cập nhật đồng bộ:** Bất cứ khi nào cấu trúc Code hoặc luồng logic thay đổi, AI Agent có trách nhiệm tự động cập nhật lại `PRD.md`, `System_Design.md`, và `Test_Plan.md` để đảm bảo tài liệu luôn là "Single Source of Truth".

Chúc các Agent hoàn thành tốt nhiệm vụ của mình! 🚀
