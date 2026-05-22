# System Core Features & Architecture
## Persona-Based Digital Twin Card Platform

**Tài liệu này tổng hợp Core Features chính của hệ thống từ 3 tài liệu:**
- `System_Agent_Guideline.md` - Quy trình làm việc & cấu trúc team
- `PRD.md` - Yêu cầu kinh doanh & chức năng
- `Communication_and_Prompt_Strategy.md` - Giao tiếp & Prompt Strategy

---

## 📋 Tóm Tắt Dự Án

| Thông Tin | Chi Tiết |
|-----------|----------|
| **Tên Dự Án** | Persona-Based Digital Twin Card Platform |
| **Mô Tả** | Nền tảng web cho phép tạo Digital Business Card với AI Digital Twin (chatbot 24/7 đại diện) |
| **Giai Đoạn** | Demo MVP |
| **Công Nghệ** | Next.js 15, React 18, Node.js + Express, Firebase Firestore |

---

## 🎯 Business Goals

- ✅ Xây dựng thương hiệu cá nhân mạnh mẽ trên môi trường số
- ✅ Tạo công cụ networking hiệu quả, thay thế name card truyền thống
- ✅ Tăng khả năng chuyển đổi từ người xem thành khách hàng/đối tác

---

## 🏗️ Kiến Trúc Hệ Thống - 4 Phân Hệ Chính

```
┌─────────────────────────────────────────┐
│         PERSONA-BASED DIGITAL TWIN      │
└─────────────────────────────────────────┘
        ↓           ↓           ↓           ↓
┌────────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐
│  Chủ Thẻ   │  │  Khách   │  │    AI    │  │ Admin  │
│  Workspace │  │  Public  │  │   Core   │  │ Panel  │
│            │  │  Profile │  │          │  │        │
└────────────┘  └──────────┘  └──────────┘  └────────┘

1. Card Owner Workspace
   - Profile Builder (Avatar, Bio, Links)
   - AI Twin Config (Knowledge Base, Tone, System Prompt)
   - Inbox & Lead Management
   - QR Code Generator

2. Guest / Client View
   - Public Digital Profile
   - AI Digital Twin Chat Widget
   - Contact Fallback Form
   - Save Contact (VCF)

3. AI Digital Twin Core
   - Persona-based LLM prompt
   - Knowledge base retrieval
   - Guardrails & Safety

4. Admin Panel
   - User Management
   - Content Moderation (Report Management)
   - Analytics
```

---

## 🎭 Core Features (7 Modules)

### **Module 1: Authentication**
- ✅ Email/Password registration
- ✅ Google OAuth login
- ✅ Quản lý session & logout
- ✅ Password reset

### **Module 2: Profile Builder (Digital Card)**
- ✅ Thiết lập thông tin cá nhân (Tên, Bio, Avatar, Cover)
- ✅ Quản lý liên kết (Social media, Website, GitHub...)
- ✅ Privacy settings (Ẩn/hiện SĐT, Email)
- ✅ Tùy chỉnh theme & styling
- ✅ Live preview realtime

### **Module 3: AI Twin Configuration**
- ✅ Setup Persona (Tone of voice: Professional, Humorous, Casual, Technical...)
- ✅ Knowledge Base Management:
  - Skills (Kỹ năng)
  - Experiences (Kinh nghiệm)
  - Projects (Dự án)
- ✅ System Prompt Customization (Chỉ thị cho AI)
- ✅ AI Guardrails (Safety rules: Chỉ trả lời từ KB, không bịa đặt...)
- ✅ Test Chat Widget

### **Module 4: QR Code & Digital Distribution**
- ✅ Auto-generate unique URL slug (e.g., `/u/[username]`)
- ✅ QR Code Generator (PNG/SVG)
- ✅ QR Code download & embed

### **Module 5: Public Profile & AI Chat**
- ✅ Public profile display (tất cả thông tin tĩnh)
- ✅ AI Digital Twin Chat Widget
- ✅ Lead capture (tự động hỏi xin SĐT/Email)
- ✅ VCF Export (Save Contact)

### **Module 6: Inbox & Conversation Management**
- ✅ Xem tất cả tin nhắn từ khách hàng
- ✅ Lịch sử trò chuyện giữa AI ↔ Khách
- ✅ Human Takeover (Chủ thẻ nhảy vào trả lời trực tiếp)
- ✅ Lead Management (Xem danh sách leads)
- ✅ Email notifications

### **Module 7: Admin Panel**
- ✅ User Management (Khóa/Kích hoạt tài khoản)
- ✅ Content Moderation (Xử lý báo cáo vi phạm)
- ✅ Analytics & Tracking

---

## 👥 Đối Tượng Người Dùng & Luồng

### **1. Chủ Thẻ (Card Owner)**
**Luồng chính:**
1. Đăng nhập/Đăng ký
2. Điền hồ sơ cá nhân (Profile Builder)
3. Cấu hình AI Digital Twin (Knowledge Base + Tone + System Prompt)
4. Publish & nhận QR Code + URL
5. Quản lý Inbox, Lead, Human Takeover

### **2. Khách Hàng (Guest/Client)**
**Luồng chính:**
1. Quét QR hoặc bấm link URL
2. Xem thông tin tĩnh của chủ thẻ
3. Chat với AI Digital Twin
4. Để lại SĐT/Email (Lead capture)
5. Lưu danh bạ (VCF) hoặc điền form liên hệ

### **3. Quản Trị Viên (Admin)**
**Luồng chính:**
1. Đăng nhập Admin Panel
2. Quản lý người dùng (khóa/kích hoạt)
3. Xử lý báo cáo nội dung
4. Xem analytics

---

## 🛠️ Technology Stack & Versions

| Tầng | Công Nghệ | Version |
|------|-----------|---------|
| **Frontend** | Next.js + React + TypeScript | 15.x + 18.x + 5.x |
| **Frontend Styling** | Tailwind CSS | 3.x |
| **Backend** | Node.js + Express | 20.x + 4.x |
| **Database** | Firebase Firestore | Latest |
| **Authentication** | Firebase Auth + Google OAuth | Latest |
| **File Storage** | Firebase Storage | Latest |
| **AI/LLM** | OpenAI (GPT-4o-mini) | Stable |
| **QR Code** | qrcode.js / qr-code-styling | Latest |
| **Testing** | Jest + Cypress | 29.x+ / 13.x+ |
| **Analytics** | PostHog / Google Analytics 4 | Latest |

---

## 📊 Non-Functional Requirements

### **Performance**
| Tiêu Chí | Mục Tiêu |
|---------|---------|
| Tốc độ tải trang công khai | < 2 giây (4G) |
| First Contentful Paint (FCP) | < 1.5 giây |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 90 |

### **Security**
- ✅ Password hashing (bcrypt/Argon2)
- ✅ JWT / Session token cho API
- ✅ Rate limiting (60 req/min per IP)
- ✅ Input sanitize (XSS, SQL Injection prevention)
- ✅ HTTPS bắt buộc
- ✅ No sensitive data exposure

### **User Experience**
- ✅ Mobile-first design
- ✅ Dark/Light mode support
- ✅ Smooth animations
- ✅ UI response time < 200ms

---

## 🔄 SDLC Workflow - 4 Pha

```
Phase 1: Requirements Understanding
↓ (Product Manager Agent)
- Xác nhận PRD, user stories, scope (In/Out)

Phase 2: Architecture & Design
↓ (System Architect Agent)
- Thiết kế API contracts, Data Models, Security Rules
- Design GUI & UI Components

Phase 3: Development
↓ (Frontend/Backend Developer Agents)
- Implement components, APIs, logic
- Code review, TypeScript checking, Linting

Phase 4: Testing & QA
↓ (QA/Test Agent)
- Test Cases execution, Automation Scripts
- Bug reporting, Release sign-off
```

**Quy tắc cốt lõi:**
- ❌ Không được phase-jumping (code trước khi design không được duyệt)
- ✅ Tất cả thay đổi phải update documentation
- ✅ Code phải tuân thủ Guidelines & Standards

---

## 🤖 Multi-Agent Collaboration

### Vai Trò Chính

| Agent | Mô Hình | Vai Trò |
|-------|---------|---------|
| **System Agent** | BuilderIO | Điều phối tổng thể, review architecture, giải quyết conflict |
| **Frontend Agent** | Gemini 3.1 High | Next.js 15, React, TailwindCSS, UI/UX, Responsive, Cypress |
| **Backend Agent** | GPT-5.2-Codex | Node.js, Express, Firebase, API, Auth, Business Logic |
| **Testing Agent** | BuilderIO/Gemini | Test Plan, Test Cases, Automation, QA |

### Quy Tắc Sử Dụng
- ✅ Giao task cho Agent chuyên trách chính trước
- ✅ System Agent có thể review & tổng hợp
- ✅ Khi cần ý kiến đa chiều → giới thiệu cùng task cho 2 Agent

---

## 💬 Communication & Prompt Strategy - 5 Nguyên Tắc

### **1. Rõ Ràng – Chính Xác – Đầy Đủ**
- Mọi yêu cầu phải cụ thể, tránh mơ hồ
- Cung cấp context đầy đủ (tài liệu, ràng buộc, tiêu chí)

### **2. Tư Duy Vai Trò**
- Gán **vai trò rõ ràng** cho AI trước khi đưa task
- VD: "Bạn là Senior Frontend Developer chuyên Next.js 15"

### **3. Tham Chiếu Source of Truth**
- **Bắt buộc** trích dẫn hoặc đính kèm tài liệu chính
- VD: "Theo GUI Design v1.2 section 4.1..."

### **4. Phân Tích Từng Bước (Chain-of-Thought)**
- Yêu cầu AI suy nghĩ từng bước trước trả lời
- Tăng độ chính xác & dễ kiểm soát output

### **5. Iterative & Feedback**
- Không chấp nhận output lần đầu nếu chưa đạt
- Luôn đưa **feedback cụ thể** để refine
- Lặp lại (v1 → v2 → v3) cho đến khi đạt chất lượng

---

## 📝 Prompt Engineering Structure

### Cấu Trúc Prompt Chuẩn

```markdown
**Vai Trò (Role):**
Bạn là [vai trò cụ thể - ví dụ: Senior Frontend Developer]

**Context:**
- Dự án: Persona-Based Digital Twin Card
- Tài liệu tham khảo: [PRD v1.0 / GUI Design / Architecture]
- Yêu cầu hiện tại: [Mô tả ngắn]

**Nhiệm Vụ:**
[Chi tiết yêu cầu, cụ thể]

**Ràng Buộc & Tiêu Chuẩn:**
- Tuân thủ [GUI Design / Architecture / PRD section]
- Code phải: [TypeScript, JSDoc, clean, tested]
- Performance: [Lighthouse > 90]
- Security: [No hardcoded secrets, OWASP top 10]

**Output Format:**
- Markdown + Code blocks
- Giải thích từng bước
```

---

## ✅ Quy Tắc Cốt Lõi (Core Rules)

### **Single Source of Truth (SSOT)**
```
Tất cả AI Agents phải tham chiếu:
├── PRD.pdf (Yêu cầu sản phẩm)
├── GUI DESIGN.pdf (Thiết kế giao diện)
├── Architecht & Database.pdf (Kiến trúc & Database)
├── TEST PLAN.pdf (Kế hoạch kiểm thử)
├── Communication and Prompt Strategy.pdf (Giao tiếp)
└── Tech Documents/ (Công nghệ stack)
```

### **Code Quality Standards**
- ✅ **Type safety:** Full TypeScript (no `any`)
- ✅ **Linting:** Pass ESLint, Prettier
- ✅ **Comments:** JSDoc for public methods
- ✅ **Testing:** Unit + Integration + E2E
- ✅ **Performance:** No N+1 queries, lazy loading, bundle < targets
- ✅ **Security:** No hardcoded secrets, proper validation

### **Documentation-Driven Development**
```
Code Change
    ↓
Update Code Comments
    ↓
Update Architecture Docs
    ↓
Update API Docs
    ↓
Update Test Cases
    ↓
Commit with Doc Reference
```

### **Pre-Launch Checklist**
- ✅ Tất cả pages load đúng
- ✅ Mobile responsive (tested on real devices)
- ✅ Accessibility (WCAG 2.1 AA)
- ✅ Tất cả forms validated
- ✅ Error & Loading states handled
- ✅ Images optimized
- ✅ TypeScript strict mode passed
- ✅ ESLint warnings fixed
- ✅ Unit tests passed
- ✅ E2E tests passed
- ✅ Lighthouse score > 90
- ✅ No console errors/warnings

---

## 📋 Testing Strategy - 7 Modules

| Module | Tính Năng | Phạm Vi Test |
|--------|----------|------------|
| **Module 1** | Authentication (Login, Register, OAuth) | Jest + Cypress |
| **Module 2** | Profile Builder + QR Code | Cypress E2E |
| **Module 3** | AI Twin Configuration | Jest + Manual |
| **Module 4** | Chat with AI Twin | Cypress E2E |
| **Module 5** | Inbox & Conversations | Cypress + Realtime |
| **Module 6** | Human Takeover Workflow | Cypress E2E |
| **Module 7** | Admin Panel | Cypress E2E |

**Success Criteria:**
- ✅ Pass rate ≥ 90%
- ✅ Coverage ≥ 80%
- ✅ No Critical/High bugs
- ✅ Performance acceptable

---

## 🚀 Success Metrics

| Chỉ Số | Mục Tiêu | Cách Đo |
|--------|----------|---------|
| Thời gian trung bình trên site | > 3 phút | Google Analytics |
| Số QR code được tạo | > 50 thẻ (tuần đầu) | Database count |
| Tỷ lệ lưu danh bạ (VCF) | > 30% | Button click tracking |
| Lighthouse (Performance + SEO) | > 90 | Lighthouse CI |
| Tỷ lệ tương tác AI Chatbot | > 40% | Tracking |
| Tin nhắn chat trung bình/ngày | > 10 tin | Tracking |

---

## ⚠️ Risks & Mitigation

| Rủi Ro | Mức Độ | Giải Pháp |
|--------|--------|----------|
| **AI Hallucination** | Cao | Guardrails gắt: "Chỉ trả lời từ JSON, không bịa đặt" |
| **Prompt Injection** | Trung | Định nghĩa rõ vai trò AI, backend validation |
| **API Exhaustion** | Cao | Rate Limiting (20 câu/ngày per IP), model rẻ |
| **Spam Form** | Trung | Spam detection, CAPTCHA, rate limit |

---

## 📁 Project Structure

```
FinalProject/
├── AI_Instruction/              ← Source of Truth (THIS IS THE CORE)
│   ├── PRD.md
│   ├── System_Agent_Guideline.md
│   ├── Communication_and_Prompt_Strategy.md
│   ├── System_Core_Features.md  ← THIS FILE
│   ├── Architecht & Database.md
│   ├── TEST PLAN.md
│   └── Source of truth/         ← Official documents
│
├── Frontend/                    ← Next.js 15 + React 18
│   ├── app/, components/, services/, types/, lib/
│   └── AGENTS.md, CLAUDE.md
│
├── Backend/                     ← Node.js + Express
│   ├── src/controllers, routes, middleware, services
│   └── package.json
│
└── Testing/                     ← Jest + Cypress
    ├── Backend/tests/
    └── Frontend/cypress/
```

---

## 🎓 Key Takeaways

**Dự án này là một hệ thống hiện đại kết hợp:**

1. **Digital Business Card động** - Thay thế name card truyền thống
2. **AI Digital Twin** - Chatbot chuyên nghiệp, đại diện 24/7
3. **Lead Generation tự động** - Qua chat & form contact
4. **Personal Branding** - Xây dựng thương hiệu cá nhân trên môi trường số
5. **Multi-Agent AI Workflow** - Giao tiếp hiệu quả giữa múi Agent

**Nguyên tắc làm việc:**
- ✅ **Source of Truth first** - Tuân thủ PRD, GUI Design, Architecture
- ✅ **Quality over speed** - Chất lượng cao, không chỉ nhanh
- ✅ **Automation & Testing** - E2E, Unit tests, Regression tests
- ✅ **Clear communication** - Prompt chuẩn, iterative feedback
- ✅ **Human in the loop** - AI là công cụ hỗ trợ, con người quyết định

---

**Version:** 1.0  
**Status:** Active ✅  
**Last Updated:** 2026

*Tài liệu này tóm tắt Core Features, Architecture, Workflow, Technology Stack, và Communication Strategy của dự án Digital Twin Card Platform.*
