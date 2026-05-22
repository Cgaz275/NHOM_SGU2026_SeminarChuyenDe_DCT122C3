# System Agent Guideline - Persona-Based Digital Twin Card Project

**Tài liệu này là hướng dẫn chi tiết cho tất cả AI Agents làm việc trên dự án Persona-Based Digital Twin Card. Đây là Single Source of Truth về các quy tắc, quy trình, và tiêu chuẩn làm việc.**

---

## 📋 Mục đích Tài liệu

Tài liệu này định nghĩa rõ ràng:
- **Vai trò và trách nhiệm** của từng loại AI Agent
- **Quy trình làm việc** (SDLC Workflow) theo từng giai đoạn
- **Tiêu chuẩn chất lượng code** (Naming Convention, Structure, Best Practices)
- **Quy tắc giao tiếp và prompt engineering** với AI Agents
- **Danh sách tài liệu Source of Truth** cần tham chiếu
- **Công nghệ Stack** và phiên bản được sử dụng
- **Quy tắc quản lý tài liệu** để đảm bảo tính nhất quán

---

## 🤖 Vai Trò và Trách Nhiệm Của Các AI Agent

### 1. **Product Manager Agent**
**Trách nhiệm:**
- Hiểu rõ yêu cầu kinh doanh, user stories, use cases
- Định nghĩa phạm vi (In Scope / Out Scope)
- Xác định các user personas và journey map
- Đảm bảo sản phẩm đáp ứng nhu cầu khách hàng

**Tài liệu cần tham chiếu:**
- `AI_Instruction/Source of truth/PRD.pdf` — Yêu cầu sản phẩm chính thức

**Quy tắc cốt lõi:**
- Không được bỏ qua chi tiết nào trong PRD
- Phải xác nhận rằng implementation đúng theo PRD
- Khi phát hiện chênh lệch → cập nhật PRD ngay lập tức

---

### 2. **System Architect Agent**
**Trách nhiệm:**
- Thiết kế kiến trúc hệ thống, technology stack
- Thiết kế cơ sở dữ liệu (Firestore data models)
- Định nghĩa API contracts
- Xây dựng sơ đồ luồng dữ liệu và quy trình nghiệp vụ
- Đảm bảo tính scalability, security, performance

**Tài liệu cần tham chiếu:**
- `AI_Instruction/Source of truth/Architecht & Database.pdf` — Kiến trúc hệ thống, Database, API Design

**Quy tắc cốt lõi:**
- Kiến trúc phải tuân thủ Firebase best practices
- Phải ghi rõ Data Models, API endpoints, Security Rules
- Nếu có thay đổi kiến trúc → cập nhật tài liệu ngay

---

### 3. **Backend Developer Agent**
**Trách nhiệm:**
- Implement các API endpoints theo architecture
- Xây dựng controllers, routes, middleware
- Quản lý Firestore operations (create, read, update, delete)
- Implement authentication & authorization
- Implement business logic, validation
- Tối ưu hóa performance, handle errors

**Tài liệu cần tham chiếu:**
- `AI_Instruction/Source of truth/Architecht & Database.pdf` — API Design, Security Rules
- `AI_Instruction/Source of truth/Tech Documents/Firebase Firestore_*.pdf` — Firebase Firestore best practices
- `AI_Instruction/Source of truth/Tech Documents/OpenAI Quickstart.pdf` — OpenAI integration

**Quy tắc cốt lõi:**
- Tuân thủ tuyệt đối API Guidelines
- Tất cả routes phải có request validation
- Implement proper error handling & logging
- Không hardcode sensitive data → sử dụng environment variables
- Code phải có JSDoc comments cho public methods

---

### 4. **Frontend Developer Agent**
**Trách nhiệm:**
- Implement UI components theo GUI Design
- Xây dựng pages và layouts
- Implement client-side logic, state management
- Tối ưu hóa performance (lazy loading, code splitting)
- Implement accessibility (WCAG 2.1 AA)
- Responsive design (mobile-first approach)

**Tài liệu cần tham chiếu:**
- `AI_Instruction/Source of truth/GUI DESIGN.pdf` — Tiêu chuẩn thiết kế giao diện
- `AI_Instruction/Source of truth/Tech Documents/TechnologyDocs.md` — Technology Stack (Next.js, React, Tailwind)
- `Frontend/AGENTS.md` — Next.js specific rules

**Quy tắc cốt lõi:**
- Tuân thủ Design System trong GUI DESIGN.pdf
- Không thay đổi màu sắc, typography, spacing khi không cần
- Sử dụng component-based architecture (React components)
- Mobile-first responsive design
- Implement proper error states & loading states

---

### 5. **QA / Test Agent**
**Trách nhiệm:**
- Lập kế hoạch kiểm thử (Test Planning)
- Viết Test Cases cho từng module/feature
- Viết Automation Scripts (Cypress E2E, Jest Unit)
- Thực hiện manual testing
- Báo cáo bugs & regressions
- Tracking test coverage

**Tài liệu cần tham chiếu:**
- `AI_Instruction/Source of truth/TEST PLAN.pdf` — Chiến lược kiểm thử tổng thể
- `AI_Instruction/Source of truth/Tech Documents/Cypress_*.pdf` — Cypress Documentation
- `AI_Instruction/Source of truth/Tech Documents/Firebase Firestore_*.pdf` — Database testing

**Quy tắc cốt lõi:**
- Test Cases phải cover golden path + edge cases
- Automation Scripts phải stable, không flaky
- Phải verify both positive & negative scenarios
- Test reports phải chi tiết, có evidence (screenshots/videos)

---

## 📖 SDLC Workflow (Quy Trình Làm Việc)

Dự án tuân thủ mô hình **AI-Native Software Development Life Cycle** với 4 pha chính:

### **Phase 1: Requirements Understanding (Product Manager Agent)**
**Đầu vào:**
- Business requirements từ stakeholders
- User needs, personas, journeys

**Đầu ra:**
- Updated PRD.pdf
- Clear user stories & acceptance criteria

**Checkpoint:**
- ✅ PRD đã được xác nhận?
- ✅ Phạm vi (In/Out Scope) rõ ràng?
- ✅ Acceptance criteria cụ thể?

**Nếu không** → Quay lại Phase 1, không được tiến đến Phase 2

---

### **Phase 2: Architecture & Design (System Architect Agent)**
**Đầu vào:**
- Updated PRD.pdf từ Phase 1
- Existing technology stack

**Đầu ra:**
- Updated Architecht & Database.pdf (API Design, Data Models, Security Rules)
- Updated GUI DESIGN.pdf (nếu có UI changes)
- Updated documentation về architecture changes

**Checkpoint:**
- ✅ Kiến trúc đã được duyệt?
- ✅ API contracts rõ ràng?
- ✅ Data Models đã định nghĩa?
- ✅ Security rules đã planed?

**Nếu không** → Quay lại Phase 2, không được tiến đến Phase 3

---

### **Phase 3: Development (Backend/Frontend Developer Agents)**
**Đầu vào:**
- Approved architecture & API design từ Phase 2
- Approved GUI Design từ Phase 2
- Development Guidelines & Prompt Templates

**Đầu ra:**
- Backend implementation (APIs, Controllers, Middleware)
- Frontend implementation (Components, Pages, Services)
- Code commits với clear messages
- Updated API documentation

**Checkpoint:**
- ✅ Code tuân thủ Guidelines?
- ✅ Code review passed?
- ✅ Type checking passed (TypeScript)?
- ✅ Linting passed (ESLint)?
- ✅ Build succeeded?

**Nếu không** → Fix code, rerun checks

---

### **Phase 4: Testing & QA (QA / Test Agent)**
**Đầu vào:**
- Implementation từ Phase 3
- Test Plan & Test Cases mẫu

**Đầu ra:**
- Test Cases execution reports
- Automation scripts (Cypress E2E, Jest Unit)
- Bug reports (nếu có)
- Test coverage reports
- Release readiness sign-off

**Checkpoint:**
- ✅ Tất cả Test Cases passed?
- ✅ Automation coverage đủ?
- ✅ No critical/major bugs?
- ✅ Performance acceptable?

**Nếu không** → Escalate bugs, do rework, retest

---

## 🔄 Quy Tắc Cốt Lõi (Core Rules)

### 1. **Single Source of Truth (SSOT) Principle**
```
Tất cả AI Agents phải tham chiếu Source of Truth:
├── PRD.pdf (Yêu cầu sản phẩm)
├── Architecht & Database.pdf (Kiến trúc & Database)
├── GUI DESIGN.pdf (Thiết kế giao diện)
├── TEST PLAN.pdf (Kế hoạch kiểm thử)
├── Communication and Prompt Strategy.pdf (Hướng dẫn prompt)
└── Tech Documents/ (Công nghệ stack documentation)
```

**Hành động:** 
- Trước khi bắt đầu task → **đọc tài liệu tương ứng**
- Nếu phát hiện không nhất quán → **cập nhật ngay lập tức**
- Không được bỏ qua hoặc "assume"

---

### 2. **No Phase-Jumping Rule**
```
Frontend/Backend Developer KHÔNG ĐƯỢC code (Phase 3)
↓
nếu chưa có approval từ System Architect (Phase 2)
↓
nếu System Architect chưa duyệt lại PRD (Phase 1)

LỜI CẢN BÁOWARNING: Phase-jumping dẫn đến rework lớn!
```

---

### 3. **Documentation-Driven Development (DDD)**
Bất cứ khi nào code thay đổi kiến trúc, logic, hoặc API contracts:
```
Code Change
    ↓
Update Code Comments / Docstrings
    ↓
Update Architecture Documentation
    ↓
Update API Documentation
    ↓
Update Test Cases
    ↓
Commit with Reference to Docs
```

**Ví dụ commit message:**
```
feat: Add user profile endpoint

- POST /api/users/:id/profile
- Implements persona-based customization
- Firestore schema per Architecht & Database.pdf
- Follow API Design guidelines from Source of Truth
```

---

### 4. **Code Quality Standards**
**Tất cả code phải đạt:**
- ✅ **Type safety:** Full TypeScript coverage (no `any`)
- ✅ **Linting:** Pass ESLint (Frontend), no warnings
- ✅ **Formatting:** Prettier formatting applied
- ✅ **Comments:** JSDoc for public methods (Backend), clear logic comments (Frontend)
- ✅ **Testing:** Unit tests + Integration tests (Backend), Component tests (Frontend)
- ✅ **Performance:** No N+1 queries, lazy loading implemented, bundle size < targets
- ✅ **Security:** No hardcoded secrets, proper validation, OWASP top 10 checked

---

### 5. **Communication Rule with Humans**
Khi giao tiếp với Product Manager / Stakeholders:
- ✅ Luôn tham chiếu tài liệu (e.g., "theo PRD section 3.2.1...")
- ✅ Nếu phát hiện conflict → báo cáo ngay với dữ liệu cụ thể
- ✅ Không "assume" hoặc "guess" → hỏi làm rõ
- ✅ Trình bày options khi có trade-offs, không quyết định đơn phương

---

## 🛠️ Technology Stack & Versions

| Công nghệ | Phiên bản | Tài liệu Chính | Ghi chú |
|-----------|----------|---|---|
| **Next.js** | 15.x | [Next.js Docs](https://nextjs.org/docs) | App Router, Server Components |
| **React** | 18.x | [React Docs](https://react.dev) | Component-based UI |
| **TypeScript** | 5.x | [TypeScript Handbook](https://www.typescriptlang.org/docs/) | Strict mode required |
| **Tailwind CSS** | 3.x | [Tailwind Docs](https://tailwindcss.com/docs) | Utility-first CSS |
| **Node.js** | 20.x+ | [Node.js Docs](https://nodejs.org/docs/) | Server runtime |
| **Express.js** | 4.x | [Express Docs](https://expressjs.com/) | Backend framework |
| **Firebase** | Latest | [Firebase Docs](https://firebase.google.com/docs) | Auth + Firestore + Storage |
| **Firestore** | - | [Firestore Docs](https://firebase.google.com/docs/firestore) | NoSQL Database |
| **Firebase Auth** | - | [Firebase Auth](https://firebase.google.com/docs/auth) | Email + OAuth |
| **OpenAI** | gpt-4o-mini | [OpenAI Docs](https://platform.openai.com/docs) | AI Digital Twin |
| **Cypress** | 13.x+ | [Cypress Docs](https://docs.cypress.io/) | E2E Testing |
| **Jest** | 29.x+ | [Jest Docs](https://jestjs.io/) | Unit Testing |

**Quy tắc versioning:**
- Sử dụng phiên bản ổn định, tương thích với hệ thống hiện tại
- Trước khi upgrade → kiểm tra breaking changes
- Update package.json & .lock files, commit sau khi test passed

---

## 📁 Cấu Trúc Dự Án

```
FinalProject/
├── AI_Instruction/
│   ├── Source of truth/          ← Single Source of Truth (SoT)
│   │   ├── PRD.pdf
│   │   ├── GUI DESIGN.pdf
│   │   ├── Architecht & Database.pdf
│   │   ├── TEST PLAN.pdf
│   │   ├── Communication and Prompt Strategy.pdf
│   │   ├── DigitalTwin_Document.md
│   │   └── Tech Documents/       ← Technology Stack docs
│   └── System_Agent_Guideline.md ← THIS FILE
├── Frontend/                     ← Next.js 15 + React 18
│   ├── app/                      ← App Router (Next.js 15)
│   ├── components/               ← React components
│   ├── services/                 ← API client services
│   ├── lib/                      ← Utilities, API mocks
│   ├── types/                    ← TypeScript type definitions
│   ├── public/                   ← Static assets
│   ├── CLAUDE.md                 ← Development guidelines (Claude)
│   ├── AGENTS.md                 ← Next.js agent rules
│   └── package.json
├── Backend/                      ← Node.js + Express
│   ├── src/
│   │   ├── controllers/          ← Business logic
│   │   ├── routes/               ← API endpoints
│   │   ├── middleware/           ← Authentication, validation
│   │   ├── services/             ← Business logic services
│   │   ├── models/               ← Firestore data models
│   │   └── config/               ← Configuration files
│   ├── firebase/                 ← Firebase credentials (git-ignored)
│   └── package.json
├── Testing/                      ← Test automation
│   ├── Backend/
│   │   └── tests/                ← Jest unit/integration tests
│   └── Frontend/
│       └── cypress/              ← Cypress E2E tests
│           ├── e2e/
│           ├── support/
│           └── fixtures/
└── package-lock.json
```

---

## 🔑 Key Documents Reference Table

| Document | Purpose | When to Use | Owner | Update Frequency |
|---|---|---|---|---|
| **PRD.pdf** | Requirements definition | Phase 1 (Planning) | Product Manager | Per sprint |
| **GUI DESIGN.pdf** | UI/UX design standard | Phase 2-3 (Design & Dev) | Designer + Frontend Dev | Per sprint |
| **Architecht & Database.pdf** | System architecture | Phase 2 (Architecture) | System Architect | Per sprint |
| **TEST PLAN.pdf** | Testing strategy | Phase 4 (QA) | QA Manager | Per release |
| **Communication and Prompt Strategy.pdf** | Prompt engineering guide | All phases | Product Manager | Per quarter |
| **DigitalTwin_Document.md** | AI Twin feature spec | Phase 1-3 (Dev) | Product Manager + Dev | Per sprint |
| **System_Agent_Guideline.md** | Agent rules & procedures | All phases (Reference) | System Architect | Per quarter |

---

## 📄 PDF Fallback Reading Strategy

**Khi Agent không thể đọc được file PDF gốc, hãy sử dụng fallback path:**

```
Nếu không thể đọc: AI_Instruction/Source of truth/[PDF_FILE]
↓
Fallback đến: AI_Instruction/Source of truth/Pdf_extracted_to_md/DigitalTwin_Documents/[PDF_DIRECTORY]/full.md
```

### Cấu Trúc Thư Mục Extracted PDF

Mỗi tài liệu PDF được extract thành thư mục riêng có cấu trúc:

```
AI_Instruction/Source of truth/Pdf_extracted_to_md/DigitalTwin_Documents/
├── Architecht & Database.pdf-[UUID]/
│   ├── full.md                    ← Toàn bộ nội dung dạng Markdown
│   ├── images/                    ← Tất cả hình ảnh từ PDF
│   │   ├── [hash].jpg
│   │   ├── [hash].png
│   │   └── ...
│   └── [metadata files]
├── GUI DESIGN.pdf-[UUID]/
│   ├── full.md
│   ├── images/
│   └── ...
├── PRD.pdf-[UUID]/
│   ├── full.md
│   ├── images/
│   └── ...
├── TEST PLAN.pdf-[UUID]/
│   ├── full.md
│   ├── images/
│   └── ...
└── Communication and Prompt Strategy.pdf-[UUID]/
    ├── full.md
    ├── images/
    └── ...
```

### Hướng Dẫn Sử Dụng Fallback

**Khi gặp lỗi đọc PDF:**
1. ✅ Đọc file `full.md` trong thư mục tương ứng
2. ✅ Nếu cần hình ảnh, truy cập folder `images/` của tài liệu đó
3. ✅ Sử dụng nội dung extracted giống như sử dụng nội dung PDF gốc

**Quy tắc:**
- Toàn bộ nội dung PDF nằm trong file `full.md`
- Hình ảnh (images, diagrams, charts) nằm trong folder `images` của cùng thư mục
- Đảm bảo sử dụng phiên bản dữ liệu mới nhất từ `full.md`
- Nếu cả `full.md` và PDF gốc đều không thể truy cập → báo cáo issue với System Architect

**Ví dụ:**
```
❌ Không thể đọc: AI_Instruction/Source of truth/PRD.pdf
↓
✅ Fallback đến: AI_Instruction/Source of truth/Pdf_extracted_to_md/DigitalTwin_Documents/PRD.pdf-[UUID]/full.md
↓
✅ Và hình ảnh từ: AI_Instruction/Source of truth/Pdf_extracted_to_md/DigitalTwin_Documents/PRD.pdf-[UUID]/images/
```

---

## 📝 Naming Conventions

### Backend (Node.js + Express)

**Files & Folders:**
```
controllers/    → userController.js
routes/         → userRoutes.js
services/       → userService.js
models/         → User.js (Firestore model)
middleware/     → authMiddleware.js
```

**Functions:**
```javascript
// Controllers: camelCase, verb-based
getUser()
createUser()
updateUser()
deleteUser()

// Services: camelCase, action-based
fetchUserById()
createUserProfile()
validateUserEmail()

// Firestore methods: descriptive
getFirestoreUserRef()
createFirestoreDocument()
updateFirestoreField()
```

**Variables:**
```javascript
const userId = "user123";           // Primary IDs
const userEmail = "user@mail.com";  // Descriptive
const isAuthenticated = true;       // Boolean with 'is' prefix
const userData = {};                // Data objects
```

### Frontend (React + Next.js)

**Files & Folders:**
```
components/         → PascalCase (React components)
  ui/               → Button.tsx, Input.tsx
  layouts/          → Header.tsx, Layout.tsx
  seminar/          → SeminarHero.tsx
app/                → page.tsx, layout.tsx
services/           → camelCase (utilities)
lib/                → camelCase (utilities)
types/              → PascalCase (type files)
```

**Component Names:**
```typescript
// Pages (PascalCase)
export default function HomePage() {}
export default function DashboardPage() {}

// Components (PascalCase)
function UserCard({ user }: Props) {}
function ProfileHeader({ name }: Props) {}

// Hooks (camelCase with 'use' prefix)
function useAuth() {}
function useUserProfile() {}

// Constants (UPPER_SNAKE_CASE)
const API_BASE_URL = "...";
const DEFAULT_PAGE_SIZE = 10;
```

**Variables & Props:**
```typescript
// Props: PascalCase for interface names
interface ButtonProps {
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

// Variables: camelCase
const isLoading = false;
const userData = {};
const handleClick = () => {};
```

---

## 🐛 Bug Reporting & Issue Tracking

### Bug Report Format
```markdown
## Bug: [Short Title]

### Description
Clear description of the bug

### Steps to Reproduce
1. Step 1
2. Step 2
3. Expected vs Actual result

### Environment
- Browser: ...
- OS: ...
- Build version: ...

### Severity
- Critical (System down)
- Major (Feature broken)
- Minor (Non-critical functionality)
- Trivial (UI/UX improvement)

### Related Documents
- PRD.pdf section X
- API_Tree.md endpoint Y
```

### Issue Labels
```
type: bug
type: feature
type: refactor
type: docs
type: chore

priority: critical
priority: high
priority: medium
priority: low

status: open
status: in-progress
status: blocked
status: done
```

---

## 🚀 Release Checklist

Before each release, verify:

- ✅ **PRD:** All user stories implemented
- ✅ **Code:** All guidelines followed
- ✅ **Testing:** All test cases passed
- ✅ **Documentation:** API docs, README updated
- ✅ **Performance:** Lighthouse score acceptable
- ✅ **Security:** No vulnerabilities detected
- ✅ **Accessibility:** WCAG 2.1 AA compliant
- ✅ **Build:** Production build passes
- ✅ **Deployment:** Environment variables set correctly

---

## 📞 Escalation Path

### When to Escalate

| Situation | Escalate To | Timeline |
|---|---|---|
| Conflicts between PRD & Architecture | System Architect + Product Manager | ASAP |
| Can't estimate effort accurately | Project Lead | 24 hours |
| Blocker due to external dependency | System Architect | ASAP |
| Design conflicts with implementation | Designer + Frontend Lead | 24 hours |
| Test case failures in Phase 4 | Developer + QA Lead | ASAP |
| Performance degradation detected | System Architect + Ops | ASAP |

---

## 📌 Final Checklist for AI Agents

Before starting ANY task:

- ✅ Have I read the relevant Source of Truth documents?
- ✅ Have I understood the requirements (PRD)?
- ✅ Have I checked the architecture (per Architecht & Database.pdf)?
- ✅ Have I reviewed the guidelines (Naming, Code Quality, Testing)?
- ✅ Have I verified no conflicts with existing implementations?
- ✅ Do I have a clear implementation plan before coding?
- ✅ Will I update documentation after implementation?

**If answer is NO to any question** → DO NOT PROCEED, investigate first!

---

## 📞 Support & Questions

For questions about:
- **Requirements** → Refer PRD.pdf + Contact Product Manager
- **Architecture** → Refer Architecht & Database.pdf + Contact System Architect
- **Implementation** → Refer Guidelines + Contact Senior Developer
- **Testing** → Refer TEST PLAN.pdf + Contact QA Lead
- **Technology** → Refer TechnologyDocs.md + Check official docs

---

**Version:** 1.0  
**Last Updated:** 2026 
**Status:** Active ✅

*Tài liệu này là Single Source of Truth cho tất cả AI Agents trên dự án.*
