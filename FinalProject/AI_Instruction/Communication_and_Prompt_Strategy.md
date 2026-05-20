# COMMUNICATION AND PROMPT STRATEGY
## For Persona-Based Digital Twin Card Platform

**Học phần:** Seminar Chuyên Đề  
**Giáo viên hướng dẫn:** TS. Đỗ Như Tài  
**Lớp:** DCT122C3  
**Trường:** Đại học Sài Gòn - Khoa Công Nghệ Thông Tin

---

## 📋 Thông Tin Tài Liệu

| Thông Tin | Chi Tiết |
|-----------|----------|
| **Tên Tài Liệu** | Communication and Prompt Strategy |
| **Mục Đích** | Định nghĩa cách giao tiếp và chiến lược Prompt với AI Agent |
| **Phạm Vi Áp Dụng** | Toàn bộ nhóm Seminar Chuyên Đề |
| **Tính Chất** | Source of Truth, bắt buộc tuân thủ |

---

## 📚 Mục Lục

1. [Giới thiệu](#-giới-thiệu)
2. [Nguyên tắc giao tiếp chung](#-nguyên-tắc-giao-tiếp-chung-với-ai-agent)
3. [Phân vai trò Agent](#-phân-vai-trò-agent)
4. [Chiến lược Prompt Engineering](#-chiến-lược-prompt-engineering)
5. [Quy trình trao đổi với Agent](#-quy-trình-trao-đổi-với-agent)
6. [Prompt Templates](#-prompt-templates)
7. [Best Practices & Quy tắc cấm](#-best-practices--quy-tắc-cấm)
8. [Công cụ & Quản lý lịch sử](#-công-cụ-hỗ-trợ--quản-lý-lịch-sử-prompt)

---

## 📖 Giới thiệu

### 1.1. Mục Đích Tài Liệu

**Communication and Prompt Strategy** là một phần quan trọng trong hệ thống Source of Truth của nhóm, định nghĩa:

- ✅ Cách thức giao tiếp rõ ràng với AI Agents
- ✅ Nguyên tắc soạn Prompt hiệu quả
- ✅ Quy trình trao đổi chuẩn hóa
- ✅ Best Practices khi làm việc với AI

**Mục tiêu chính:**
- Đảm bảo sự nhất quán trong giao tiếp
- Tối ưu hóa chất lượng output từ AI
- Giảm thiểu hiểu lầm và rework
- Xây dựng quy trình AI-Native Workflow

### 1.2. Phạm Vi Áp Dụng

Tài liệu này áp dụng cho **toàn bộ nhóm** trong các hoạt động:

- ✅ Phân tích yêu cầu và thiết kế
- ✅ Sinh code (Frontend, Backend)
- ✅ Viết Test Case và Test Plan
- ✅ Debug, tối ưu và review code
- ✅ Viết tài liệu (PRD, GUI Design, Architecture, Test Plan)
- ✅ Xây dựng Prompt Strategy cho AI Digital Twin

### 1.3. Source of Truth Hierarchy

**Ưu tiên tuân thủ theo thứ tự:**

1. **PRD & GUI Design** (yêu cầu nghiệp vụ & giao diện)
2. **Architecture & Database** (kiến trúc hệ thống)
3. **Communication and Prompt Strategy** (cách giao tiếp)
4. **Các Guideline chuyên biệt** (Frontend, Backend, Testing)

---

## 💬 Nguyên Tắc Giao Tiếp Chung Với AI Agent

### 2.1. 5 Nguyên Tắc Vàng

#### 1️⃣ Rõ Ràng – Chính Xác – Đầy Đủ
- Mọi yêu cầu phải **cụ thể**, tránh mơ hồ
- Cung cấp **đầy đủ context** (tài liệu, ràng buộc, tiêu chí)
- Ví dụ:
  - ❌ **Sai:** "Làm giúp mình feature đăng nhập"
  - ✅ **Đúng:** "Implement login page theo GUI Design section 3.2, dùng Google OAuth, tuân thủ Mobile-first, include error states"

#### 2️⃣ Tư Duy Vai Trò (Role-playing)
- Luôn gán **vai trò rõ ràng** cho AI trước khi đưa nhiệm vụ
- Giúp AI tập trung vào chuyên môn cụ thể
- Ví dụ: "Bạn là Senior Frontend Developer chuyên Next.js 15 & TailwindCSS"

#### 3️⃣ Tham Chiếu Source of Truth
- **Bắt buộc** trích dẫn hoặc đính kèm tài liệu chính
- Tùy theo task: PRD, GUI Design, Architecture, Test Plan
- Ví dụ: "Theo GUI Design v1.2 section 4.1, component này phải có dark mode support"

#### 4️⃣ Phân Tích Từng Bước (Chain-of-Thought)
- Yêu cầu AI suy nghĩ và trả lời từng bước
- Tăng độ chính xác và dễ kiểm soát output
- Ví dụ: "Hãy phân tích từng bước trước khi viết code"

#### 5️⃣ Iterative & Feedback
- Không chấp nhận output lần đầu nếu chưa đạt yêu cầu
- Luôn đưa **feedback cụ thể** để Agent tinh chỉnh
- Lặp lại cho đến khi đạt chất lượng mong muốn

### 2.2. Quy Tắc Ứng Xử

| Quy Tắc | Chi Tiết |
|---------|----------|
| **Ngôn Ngữ** | Tiếng Việt rõ ràng + thuật ngữ Anh chuẩn (không dịch máy) |
| **Context Window** | Giữ prompt hợp lý, tóm tắt thông tin cũ |
| **Tính Nhất Quán** | Giữ chung tone, style code, naming convention |
| **Xác Thực Output** | Luôn kiểm tra trước áp dụng (compile, logic, giao diện) |
| **Bảo Mật** | Không chia sẻ API Key, Secret, dữ liệu cá nhân |

### 2.3. Mindset Khi Làm Việc Với AI

- 🤖 AI là **người hỗ trợ mạnh mẽ**, không phải thay thế
- 🎯 Luôn giữ **vai trò kiểm soát cuối cùng** (Human in the loop)
- ⚡ Mục tiêu: **Tốc độ + Chất lượng cao**, không chỉ nhanh
- 🔍 Khi AI sai → Phân tích nguyên nhân, điều chỉnh prompt (đừng bỏ qua)

---

## 🤖 Phân Vai Trò Agent

### 3.1. Tổng Quan Hệ Thống Multi-Agent

Nhóm sử dụng **mô hình Multi-Agent** để tối ưu hiệu quả:

```
┌─────────────────────────────────────────┐
│       SYSTEM AGENT (BuilderIO)          │  ← Điều phối tổng thể
│  (Hỗ trợ tất cả, giải quyết conflict)  │
└─────────────────────────────────────────┘
              ↓         ↓         ↓
     ┌────────┴────┬────┴────┬────┴────┐
     │             │         │         │
  ┌──▼──┐    ┌─────▼──┐ ┌────▼───┐ ┌──▼────┐
  │Front │    │ Backend│ │Testing │ │Others │
  │Agent │    │ Agent  │ │ Agent  │ │       │
  │      │    │        │ │        │ │       │
  │Gemini│    │ GPT-5.2│ │BuilderIO       │
  │5.1H  │    │ -Codex │ │/ Gemini│ │      │
  └──────┘    └────────┘ └────────┘ └──────┘
```

### 3.2. Vai Trò Chi Tiết

| Agent | Mô Hình | Vai Trò | Trách Nhiệm Chính |
|-------|---------|---------|------------------|
| **System Agent** | BuilderIO | Điều phối tổng thể | Phân tích yêu cầu, thiết kế giải pháp, review, hỗ trợ conflict |
| **Frontend Agent** | Gemini 3.1 High | Chuyên gia Frontend | Next.js 15, React, TailwindCSS, UI/UX, Responsive, Cypress E2E |
| **Backend Agent** | GPT-5.2-Codex | Chuyên gia Backend | Node.js, Express, Firebase, API, Auth, Business Logic, Database |
| **Testing Agent** | BuilderIO / Gemini | Chuyên gia Kiểm thử | Test Plan, Test Cases, Automation, AI Testing, Bug Analysis |

### 3.3. Mô Tả Chi Tiết Vai Trò

#### System Agent (BuilderIO)
- ✅ Agent chính, Source of Truth Coordinator
- ✅ Hỗ trợ phân tích yêu cầu tổng thể
- ✅ Đề xuất kiến trúc, giải quyết vấn đề phức tạp
- ✅ Hỗ trợ viết tài liệu & Prompt Strategy
- ✅ Điều phối workflow giữa các Agent khác
- **Được ưu tiên dùng khi:** Cần góc nhìn tổng quan hoặc giải quyết conflict

#### Frontend Agent (Gemini 3.1 High)
- ✅ Chuyên trách giao diện và trải nghiệm người dùng
- ✅ Tuân thủ nghiêm ngặt GUI Design Document
- ✅ Tối ưu performance, accessibility, responsive
- ✅ Viết & tối ưu component, styling (Tailwind), animation
- **Được ưu tiên dùng khi:** Xây dựng UI, component, responsive design

#### Backend Agent (GPT-5.2-Codex)
- ✅ Chuyên trách logic nghiệp vụ, API, tích hợp
- ✅ Thiết kế triển khai kiến trúc Backend
- ✅ Xử lý Firebase (Firestore, Auth, Storage)
- ✅ Security Rules, API routes, tích hợp AI
- **Được ưu tiên dùng khi:** Xây dựng API, business logic, database

#### Testing Agent
- ✅ Chuyên trách kiểm thử & đảm bảo chất lượng
- ✅ Viết Test Plan, Test Cases, Automation Scripts
- ✅ Kiểm thử AI Digital Twin (Accuracy, Guardrails, Hallucination)
- **Được ưu tiên dùng khi:** Lập kế hoạch test, viết test cases

### 3.4. Quy Tắc Sử Dụng Agent

1. ✅ **Mỗi task** nên giao cho Agent chuyên trách chính trước
2. ✅ **System Agent** có thể review hoặc tổng hợp output từ các Agent khác
3. ✅ **Khi cần ý kiến đa chiều:** Đưa cùng task cho 2 Agent để so sánh
4. ✅ **Chuyển Agent** nếu Agent hiện tại không xử lý tốt

---

## 🎯 Chiến Lược Prompt Engineering

### 4.1. 6 Nguyên Tắc Cốt Lõi

| # | Nguyên Tắc | Mô Tả | Ví Dụ |
|---|-----------|-------|-------|
| 1 | **Cụ thể & Chi tiết** | Tránh prompt mơ hồ, nêu rõ yêu cầu | "Implement... chứ không phải "Làm..." |
| 2 | **Context Đầy Đủ** | Luôn đính kèm hoặc trích dẫn tài liệu | "Theo GUI Design v1.2..." |
| 3 | **Gán Vai Trò Rõ** | Role Prompting để AI focus | "Bạn là Senior Frontend Developer..." |
| 4 | **Chain-of-Thought** | Yêu cầu suy nghĩ từng bước | "Phân tích từng bước..." |
| 5 | **Định Nghĩa Output Format** | Chỉ rõ định dạng trả về | "Trả về dưới dạng Markdown, code block..." |
| 6 | **Tiêu Chí Đánh Giá** | Yêu cầu tự đánh giá output | "Kiểm tra xem có tuân thủ không" |

### 4.2. Cấu Trúc Prompt Chuẩn (Framework)

Mọi Prompt quan trọng nên tuân theo cấu trúc này:

```markdown
**Vai Trò (Role):**
Bạn là [Vai trò cụ thể], ví dụ:
- Senior Frontend Developer chuyên Next.js 15 & TailwindCSS
- Backend Engineer chuyên Firebase & Node.js
- QA Engineer chuyên Cypress E2E Testing

**Context:**
- Dự án: Persona-Based Digital Twin Card
- Tài liệu tham khảo: [PRD v1.0 / GUI Design / Architecture]
- Yêu cầu hiện tại: [Mô tả ngắn]

**Nhiệm vụ:**
[Nhiệm vụ chi tiết, cụ thể]

**Ràng Buộc & Tiêu Chuẩn:**
- Phải tuân thủ [GUI Design / Architecture]
- Code phải sạch, có comment, [TypeScript / JSDoc]
- Performance: [yêu cầu cụ thể]
- Security: [yêu cầu cụ thể]

**Output Format:**
- Trả về dưới dạng Markdown
- Code block rõ ràng với ngôn ngữ
- Giải thích từng bước nếu cần
```

### 4.3. Kỹ Thuật Prompt Nâng Cao

| Kỹ Thuật | Mô Tả | Khi Nào Dùng |
|---------|-------|------------|
| **Chain-of-Thought (CoT)** | Yêu cầu suy nghĩ từng bước | Mọi task phức tạp |
| **Few-shot Prompting** | Đưa 1-2 ví dụ tốt để AI học | Code generation, patterns |
| **Multi-step Prompting** | Phân task thành nhiều bước | Phân tích → Thiết kế → Triển khai |
| **Self-Consistency** | Yêu cầu AI kiểm lại output | Critical decisions |
| **Tree of Thoughts** | Giải quyết vấn đề phức tạp | Architecture design |

### 4.4. Context Management

- 🔖 Ưu tiên **đính kèm link hoặc tóm tắt** các tài liệu Source of Truth
- 📝 Giữ **lịch sử chat ngắn gọn**, chỉ giữ thông tin quan trọng
- ♻️ Khi context **quá dài** → Tóm tắt lại và bắt đầu prompt mới
- 📌 Luôn **nhắc Agent** tham chiếu phiên bản tài liệu (ví dụ: GUI Design v1.2)

### 4.5. Xử Lý Output

✅ Yêu cầu Agent:
- Luôn **giải thích** lý do cho quyết định quan trọng
- Liệt kê **các giả định** nếu có
- Đề xuất **cải tiến** hoặc lựa chọn thay thế

---

## 🔄 Quy Trình Trao Đổi Với Agent

### 5.1. Quy Trình 5 Bước Chuẩn Hóa

```
┌──────────────────────────────────┐
│  Bước 1: Chuẩn Bị Task           │
│  - Xác định Agent chuyên trách   │
│  - Thu thập thông tin đầy đủ    │
└──────────────────────────────────┘
              ↓
┌──────────────────────────────────┐
│  Bước 2: Gửi Prompt              │
│  - Dùng cấu trúc chuẩn           │
│  - Gán vai trò rõ ràng           │
│  - Chain-of-Thought              │
└──────────────────────────────────┘
              ↓
┌──────────────────────────────────┐
│  Bước 3: Nhận & Phân Tích Output │
│  - Đọc kỹ output                 │
│  - Tự đánh giá theo tiêu chí     │
│  - Kiểm tra lỗi, logic, style    │
└──────────────────────────────────┘
              ↓
┌──────────────────────────────────┐
│  Bước 4: Refine & Iterate        │
│  - Nếu chưa đạt: Feedback cụ thể│
│  - Đánh version (v1 → v2 → v3) │
└──────────────────────────────────┘
              ↓
┌──────────────────────────────────┐
│  Bước 5: Xác Nhận & Áp Dụng      │
│  - Chỉ áp dụng khi đạt yêu cầu  │
│  - Commit với ghi chú rõ ràng    │
│  - Cập nhật tiến độ              │
└──────────────────────────────────┘
```

### 5.2. Chi Tiết Từng Bước

#### **Bước 1: Chuẩn Bị Task**
- ✅ Xác định Agent chuyên trách (Frontend, Backend, System...)
- ✅ Thu thập thông tin:
  - Tài liệu tham khảo (PRD, GUI Design, Architecture)
  - Yêu cầu cụ thể
  - Ràng buộc kỹ thuật
  - Tiêu chí đánh giá thành công

#### **Bước 2: Gửi Prompt**
- ✅ Sử dụng cấu trúc Prompt chuẩn (mục 4.2)
- ✅ Bắt đầu bằng gán vai trò rõ ràng
- ✅ Đính kèm hoặc trích dẫn Source of Truth
- ✅ Yêu cầu suy nghĩ từng bước (Chain-of-Thought)

#### **Bước 3: Nhận & Phân Tích Output**
- ✅ Đọc kỹ output
- ✅ Tự đánh giá theo tiêu chí:
  - Có đúng yêu cầu không?
  - Có tuân thủ GUI Design / Architecture không?
  - Có lỗi logic, security, performance không?
  - Code có sạch và dễ maintain không?

#### **Bước 4: Refine & Iterate**
Nếu output chưa đạt → Đưa feedback **cụ thể và có cấu trúc:**

```
**Điểm tốt:**
- [Những gì AI làm đúng]

**Điểm cần sửa:**
- [Vấn đề cụ thể]

**Yêu cầu thay đổi chi tiết:**
- [Thay đổi cụ thể, tham chiếu tài liệu]

**Version:** v2 (v1 → v2)
```

**Ví dụ:**
```
Điểm tốt: UI layout đúng theo Design, responsive tốt.

Điểm cần sửa: 
- Validation logic chưa tuân thủ PRD section 4.1.2
- Error message text không match Design token

Yêu cầu chỉnh:
- Thay đổi validation để check field "email" phải đúng format
- Update error message CSS class từ "error-msg" → "validation-error" 
  (theo GUI Design token v1.2)

Version: v2
```

#### **Bước 5: Xác Nhận & Áp Dụng**
- ✅ Chỉ áp dụng code/tài liệu khi đã đạt yêu cầu
- ✅ Commit code kèm ghi chú rõ ràng:
  ```
  feat: Implement login form
  - Add Google OAuth integration
  - Add validation per PRD 4.1.2
  - Responsive mobile-first design
  - Cypress E2E test included
  ```
- ✅ Cập nhật tiến độ task

### 5.3. Quy Trình Xử Lý Khi Agent Trả Lời Sai

1. **Phân tích nguyên nhân:**
   - Context thiếu?
   - Prompt mơ hồ?
   - Agent chưa hiểu ràng buộc?

2. **Cung cấp thêm thông tin:**
   - Trích dẫn chính xác đoạn tài liệu liên quan

3. **Reset context nếu cần:**
   - Bắt đầu prompt mới với tóm tắt ngắn gọn

4. **Chuyển Agent:**
   - Nếu một Agent không giải quyết tốt → System Agent hoặc Agent khác

### 5.4. Best Practices Trong Workflow

- ✅ Giữ mỗi cuộc trò chuyện tập trung vào **một nhiệm vụ chính**
- ✅ Không paste **quá nhiều code** trong một prompt
- ✅ Luôn **đánh số phiên bản** khi refine (v1 → v2 → v3)
- ✅ Ghi lại những **Prompt tốt** để tái sử dụng

---

## 📝 Prompt Templates

### 6.1. Mẫu: Yêu Cầu Feature / User Story

```markdown
**Vai Trò:**
Bạn là Senior Fullstack Developer có 8 năm kinh nghiệm, 
đang tham gia dự án Persona-Based Digital Twin Card.

**Context:**
- Tài liệu tham khảo: PRD v1.0, GUI Design v1.2, Architecture Design
- Tính năng cần triển khai: [Mô tả ngắn gọn]

**Nhiệm Vụ:**
Hãy phân tích và đề xuất giải pháp triển khai chi tiết cho tính năng trên.

**Yêu Cầu:**
- Phân tích theo từng bước (Chain-of-Thought)
- Đề xuất cấu trúc component (Frontend) và API (Backend)
- Tuân thủ Mobile-first và Design System trong GUI Document
- Xử lý lỗi và fallback cases
- Đề xuất Test Cases chính

**Output Format:**
1. Phân tích yêu cầu
2. Giải pháp tổng thể
3. Chi tiết Frontend (component, styling, responsive)
4. Chi tiết Backend (API endpoint, data model, validation)
5. Database & Security notes
6. Test Cases gợi ý
```

### 6.2. Mẫu: Sinh Code

```markdown
**Vai Trò:**
Bạn là Senior [Frontend / Backend] Developer chuyên sâu.

**Context:**
- Dự án: Persona-Based Digital Twin Card
- File hiện tại: [tên file]
- Yêu cầu: [mô tả rõ chức năng theo PRD section X.X]

**Yêu Cầu Code:**
- Sử dụng [Next.js 15 App Router / Express.js]
- Tuân thủ nghiêm ngặt GUI Design (color tokens, component style, dark mode)
- Code sạch, có comment, TypeScript, JSDoc cho public methods
- Xử lý error và loading state
- Responsive hoàn hảo, Mobile-first approach
- Unit test / Cypress E2E test nếu có

**Output:**
Trả về chỉ code trong block ```tsx (hoặc ```ts, ```js) 
kèm giải thích ngắn gọn các phần quan trọng.
```

### 6.3. Mẫu: Debug & Fix Bug

```markdown
**Vai Trò:**
Bạn là Senior Debugging Expert.

**Context:**
- Có lỗi: [Mô tả lỗi cụ thể]
- Dự án: [tên dự án]
- File: [path/to/file.tsx]

**Thông Tin Chi Tiết:**
- Expected behavior: [hành vi mong muốn]
- Actual behavior: [hành vi thực tế]
- Error message / Stack trace: [paste nếu có]

**Code Hiện Tại:**
[paste code liên quan - tối đa 50 dòng]

**Nhiệm Vụ:**
Phân tích nguyên nhân gốc rễ và đưa ra cách fix chi tiết,
kèm giải thích tại sao lỗi xảy ra.
```

### 6.4. Mẫu: Review Code / Architecture

```markdown
**Vai Trò:**
Bạn là Technical Lead / Code Reviewer có kinh nghiệm 10+ năm.

**Nhiệm Vụ:**
Review đoạn code / architecture sau theo các khía cạnh:

- **Tính đúng đắn:** Logic & nghiệp vụ theo PRD
- **Architecture:** Tuân thủ Architecture Design
- **Performance & Security:** Tối ưu, an toàn
- **Code Quality:** Best practices, maintainability
- **GUI Compliance:** Tuân thủ Design Token (nếu Frontend)

**Code / Architecture để review:**
[paste code hoặc mô tả architecture]

**Output:**
- Điểm mạnh
- Điểm cần cải thiện (phân loại: Critical / Important / Nice-to-have)
- Gợi ý cụ thể cho từng điểm
```

### 6.5. Mẫu: Viết Test Case

```markdown
**Vai Trò:**
Bạn là QA Engineer chuyên Automation Testing (Cypress, Jest).

**Nhiệm Vụ:**
Viết Test Cases cho tính năng: [tên tính năng theo PRD]

**Yêu Cầu:**
- Functional Test Cases (happy path + edge cases)
- Negative Test Cases (error scenarios)
- Cypress E2E Test scenarios
- Jest Unit Test (nếu Backend logic phức tạp)
- Test Data gợi ý

**Output Format:**
```markdown
## Test Cases for [Feature Name]

### TC-01: [Test case name]
- Pre-condition: ...
- Steps: ...
- Expected Result: ...
- Priority: High/Medium/Low
```

### 6.6. Mẫu: Viết Tài Liệu

```markdown
**Vai Trò:**
Bạn là Technical Writer chuyên nghiệp.

**Nhiệm Vụ:**
Viết [chương / section] cho tài liệu [tên tài liệu] 
theo phong cách trang trọng, học thuật nhưng dễ hiểu.

**Yêu Cầu:**
- Ngôn ngữ tiếng Việt chuyên nghiệp, rõ ràng
- Có bảng biểu, diagram khi cần
- Tham chiếu đúng các tài liệu Source of Truth
- Độ dài: [số từ gợi ý]

**Nội dung bao gồm:**
- [Điểm chính 1]
- [Điểm chính 2]
- [Điểm chính 3]
```

---

## ✅ Best Practices & Quy Tắc Cấm

### 7.1. Best Practices (Thực Hành Tốt Nhất)

#### 1. ✅ Luôn Tham Chiếu Source of Truth
- Bất kỳ Prompt nào liên quan đến **yêu cầu nghiệp vụ, giao diện hoặc kiến trúc**
- Đều phải **trích dẫn rõ ràng** PRD, GUI Design hoặc Architecture Document
- Ví dụ: "Theo PRD v1.0 section 4.1.2..." hoặc "Tuân thủ GUI Design token v1.2"

#### 2. ✅ Phân Task Nhỏ & Rõ Ràng
- Tốt hơn là giao **nhiều task nhỏ, cụ thể**
- Thay vì **một task lớn, phức tạp**
- Giúp AI focus tốt hơn, output chất lượng cao hơn

#### 3. ✅ Sử Dụng Phiên Bản (Versioning)
- Khi refine prompt, **đánh số rõ ràng** (v1, v2, v3...)
- Tóm tắt **những thay đổi** đã yêu cầu
- Dễ tracking, quản lý output

#### 4. ✅ Kết Hợp Sức Mạnh Nhiều Agent
- 🎨 **Gemini 3.1 High** cho Frontend/UI
- ⚙️ **GPT-5.2-Codex** cho Backend/Logic
- 🏗️ **BuilderIO** để review tổng thể hoặc giải quyết vấn đề khó

#### 5. ✅ Tự Kiểm Tra Trước Áp Dụng
- Luôn **compile, test code** locally trước khi commit
- Kiểm tra **logic, performance, design compliance**
- Không blind apply output từ AI

#### 6. ✅ Ghi Chép Prompt Tốt
- Lưu lại những **Prompt mang lại kết quả xuất sắc**
- Tái sử dụng sau này → tiết kiệm thời gian
- Xây dựng thư viện Prompt chuẩn cho nhóm

#### 7. ✅ Human in the Loop
- **AI chỉ là công cụ hỗ trợ**
- **Thành viên nhóm phải là người quyết định cuối cùng**
- Không bao giờ áp dụng AI output mà không kiểm tra

### 7.2. Quy Tắc CẤM (Prohibited Rules)

| Quy Tắc CẤM | Chi Tiết |
|----------|----------|
| ❌ **Paste code dài dòng** | Chỉ paste phần liên quan (< 50 dòng) |
| ❌ **Prompt mơ hồ** | Tránh kiểu "Làm giúp mình cái này" |
| ❌ **Ngoài phạm vi** | Không yêu cầu tính năng ngoài MVP / Out of Scope |
| ❌ **Chia sẻ bảo mật** | Không chia API Key, Secret, dữ liệu cá nhân |
| ❌ **Apply mà không kiểm** | Luôn kiểm tra output trước áp dụng |
| ❌ **Thay đổi Design System** | Không thay màu sắc, component style tùy ý |
| ❌ **AI quyết định kiến trúc** | Phải có review từ System Agent (BuilderIO) |
| ❌ **Refine vô thời hạn** | Nếu prompt kém → Viết lại từ đầu, đừng refine vô tận |

---

## 🔧 Công Cụ Hỗ Trợ & Quản Lý Lịch Sử Prompt

### 8.1. Công Cụ Chính Được Sử Dụng

| Công Cụ | Mục Đích | Vai Trò |
|---------|----------|---------|
| **BuilderIO** | System Agent, IDE support | Điều phối, review tổng thể |
| **Gemini 3.1 High** | Frontend Agent | Next.js, React, TailwindCSS |
| **GPT-5.2-Codex** | Backend Agent | Node.js, Express, Firebase |
| **Cursor.sh** | IDE integration | Viết & chỉnh sửa code trực tiếp |

### 8.2. Nguyên Tắc Quản Lý Lịch Sử Prompt (Dành Cho AI)

Vì tài liệu này là Source of Truth để AI đọc, tuân thủ các nguyên tắc:

#### 1. ✅ Mỗi Cuộc Trò Chuyện Tập Trung
- Nên tập trung vào **một nhiệm vụ chính**
- Tránh lẫn nhiều task khác nhau

#### 2. ✅ Không Giữ Lịch Sử Quá Dài
- Khi context trở nên **dài và rối**
- Tóm tắt lại tình hình hiện tại
- Bắt đầu **cuộc trò chuyện mới** với tóm tắt ngắn gọn

#### 3. ✅ Luôn Tham Chiếu Source of Truth
- Tham chiếu rõ ràng đến:
  - PRD, GUI Design, Architecture, Test Plan
  - Version hiện tại (v1.0, v1.2...)

#### 4. ✅ Sử Dụng Phiên Bản Khi Tinh Chỉnh
- Khi yêu cầu chỉnh sửa
- Đánh dấu output là **v2, v3, v4...**
- Dễ tracking theo dõi

#### 5. ✅ Tự Động Tóm Tắt
- Nếu cuộc trò chuyện **dài**
- Đề xuất **tóm tắt các quyết định quan trọng**
- Trước khi tiếp tục

### 8.3. Cách Xử Lý Context Cho AI

**Khi context dài:**
```
Tóm tắt lại:
- Task đã hoàn thành: [list]
- Task hiện tại: [mô tả]
- Quyết định quan trọng: [list]
- File đã thay đổi: [list]

Hãy bắt đầu lại với thông tin tóm tắt này.
```

**Khi tham chiếu tài liệu:**
```
Theo [Tài liệu] v[version] section [section]:
[Trích dẫn ngắn]

Hãy [yêu cầu cụ thể] tuân thủ điều trên.
```

### 8.4. Hướng Dẫn Cho AI Khi Làm Việc Với Nhóm

- 📌 **Source of Truth trước tiên:** PRD, GUI Design, Architecture là tiêu chuẩn
- 🎯 **Clarity is king:** Luôn yêu cầu clarification nếu Prompt mơ hồ
- ✅ **Self-check:** Tự kiểm tra output trước trả lại
- 📝 **Explain:** Giải thích lý do cho quyết định quan trọng
- 🔄 **Iterate:** Sẵn sàng refine theo feedback
- 🤝 **Teamwork:** Hỗ trợ các Agent khác khi cần

---

## 📚 Tham Chiếu Nhanh

### Danh Sách Kiểm Tra Prompt

- ✅ Có gán vai trò rõ ràng không?
- ✅ Có trích dẫn Source of Truth không?
- ✅ Có cụ thể & chi tiết không?
- ✅ Có yêu cầu Chain-of-Thought không?
- ✅ Có định nghĩa Output Format không?
- ✅ Có tiêu chí đánh giá không?

### Danh Sách Kiểm Tra Output

- ✅ Có đúng yêu cầu không?
- ✅ Có tuân thủ tài liệu liên quan không?
- ✅ Có lỗi logic, security, performance không?
- ✅ Code có sạch và dễ maintain không?
- ✅ Có comment/documentation không?
- ✅ Có test case không?

### Khi Cần Help

| Vấn Đề | Hành Động |
|--------|----------|
| Prompt output không đúng | Phân tích nguyên nhân → Reset context → Viết lại prompt |
| Agent không giải quyết tốt | Chuyển sang System Agent hoặc Agent khác |
| Task quá phức tạp | Phân chia thành sub-task nhỏ hơn |
| Context quá dài | Tóm tắt → Bắt đầu conversation mới |

---

## 🎓 Kết Luận

**Communication and Prompt Strategy** là nền tảng để nhóm **làm việc hiệu quả với AI Agents**. Tuân thủ các nguyên tắc, cấu trúc và best practices trong tài liệu này sẽ:

- ✅ Tăng chất lượng output từ AI
- ✅ Giảm thời gian rework
- ✅ Xây dựng quy trình chuẩn hóa
- ✅ Hỗ trợ nhóm đạt hiệu quả cao nhất

---

**Version:** 1.0  
**Status:** Active ✅  
**Last Updated:** 2026

*Tài liệu này là Single Source of Truth cho Communication and Prompt Strategy của dự án.*
