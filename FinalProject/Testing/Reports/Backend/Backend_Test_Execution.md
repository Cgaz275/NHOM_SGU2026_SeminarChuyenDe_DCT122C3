# Báo Cáo Thực Thi Kiểm Thử Backend

**Nền Tảng Thẻ Kỹ Thuật Số Dựa Trên Nhân Vật**  
**Ngày Báo Cáo**: 2026  
**Trạng Thái**: 📋 Chuẩn Bị Thực Thi

---

## 📌 Tóm Tắt Chuẩn Bị

### ✅ Hoàn Thành
- ✅ Cài đặt npm dependencies (Jest, Supertest, Firebase)
- ✅ Cấu hình Jest (jest.config.js)
- ✅ Tạo test fixtures (Testing/fixtures)
- ✅ Viết 8 test modules (250+ test cases)
- ✅ Cấu hình test setup/teardown
- ✅ Thêm Firebase SDK cho backend

### ⚠️ Cần Giải Quyết

1. **Firebase Emulator**
   - Cần chạy Firebase Emulator trước khi test
   ```bash
   firebase emulators:start
   ```

2. **Biến Môi Trường**
   - Cần file `.env` trong Backend folder
   ```
   API_URL=http://localhost:3001
   NODE_ENV=test
   FIREBASE_PROJECT_ID=...
   ```

3. **Module Exports**
   - Testing/fixtures dùng TypeScript export
   - Cần convert sang CommonJS hoặc thêm Babel config

---

## 📊 Cấu Trúc Tests Sẵn Có

### 8 Test Modules

```
Backend/tests/
├── Module_1_Auth.test.js                    ✅ 40 kiểm thử
├── Module_2_Card_Profile.test.js            ✅ 35+ kiểm thử
├── Module_3_AI_Config.test.js               ✅ 35 kiểm thử
├── Module_4_AI_Chatbot.test.js              ✅ 40 kiểm thử
├── Module_5_Inbox_Fallback.test.js          ✅ 35 kiểm thử
├── Module_6_Human_Takeover.test.js          ✅ 30 kiểm thử
├── Module_7_Admin_Panel.test.js             ✅ 35 kiểm thử
└── utils/
    └── testHelpers.js                       ✅ Helper functions
```

**Tổng: 250+ test cases**

---

## 🧪 Module 1: Authentication & Authorization

### Tệp: `Backend/tests/Module_1_Auth.test.js`
**Test Cases**: 40 (TC_AUTH_001 → TC_AUTH_040)

#### 1.1 Registration (10 kiểm thử)
```
TC_AUTH_001: Register with valid email & password
TC_AUTH_002: Reject invalid email format
TC_AUTH_003: Reject duplicate email
TC_AUTH_004: Reject mismatched passwords
TC_AUTH_005: Enforce password strength requirements
TC_AUTH_006: Require email verification
TC_AUTH_007: Auto-generate user profile
TC_AUTH_008: Hash password securely
TC_AUTH_009: Handle registration timeout
TC_AUTH_010: Log registration attempt
```

#### 1.2 Login (12 kiểm thử)
```
TC_AUTH_011: Login with valid credentials
TC_AUTH_012: Reject incorrect password
TC_AUTH_013: Reject non-existent user
TC_AUTH_014: Generate JWT token
TC_AUTH_015: Set HTTP-only cookie
TC_AUTH_016: Prevent brute force attacks
TC_AUTH_017: Handle expired tokens
TC_AUTH_018: Refresh token mechanism
TC_AUTH_019: Logout & clear session
TC_AUTH_020: Multi-device login
TC_AUTH_021: Remember me functionality
TC_AUTH_022: Login rate limiting
```

#### 1.3 OAuth (8 kiểm thử)
```
TC_AUTH_023: Google OAuth registration
TC_AUTH_024: Google OAuth login
TC_AUTH_025: Link Google to existing account
TC_AUTH_026: Unlink OAuth provider
TC_AUTH_027: Handle OAuth token refresh
TC_AUTH_028: Prevent duplicate OAuth links
TC_AUTH_029: Merge OAuth profiles
TC_AUTH_030: Handle OAuth errors
```

#### 1.4 Password Management (10 kiểm thử)
```
TC_AUTH_031: Send password reset email
TC_AUTH_032: Verify reset token
TC_AUTH_033: Update password from reset
TC_AUTH_034: Invalidate old passwords
TC_AUTH_035: Enforce password history
TC_AUTH_036: Handle reset token expiry
TC_AUTH_037: Change password when logged in
TC_AUTH_038: Password complexity validation
TC_AUTH_039: Handle concurrent reset requests
TC_AUTH_040: Audit password changes
```

---

## 🧪 Module 2: Card Profile Management

### Tệp: `Backend/tests/Module_2_Card_Profile.test.js`
**Test Cases**: 35+ (TC_CARD_001 → TC_CARD_035+)

#### 2.1 Create Card (8 kiểm thử)
```
TC_CARD_001: Create card with basic info
TC_CARD_002: Validate required fields
TC_CARD_003: Upload avatar image
TC_CARD_004: Generate public card URL
TC_CARD_005: Set card status to draft
TC_CARD_006: Auto-save card
TC_CARD_007: Limit card creation per user
TC_CARD_008: Handle large payloads
```

#### 2.2 Update Card (8 kiểm thử)
```
TC_CARD_009: Update card information
TC_CARD_010: Change avatar
TC_CARD_011: Update contact details
TC_CARD_012: Modify bio/description
TC_CARD_013: Add social media links
TC_CARD_014: Validate updates
TC_CARD_015: Track update timestamp
TC_CARD_016: Preserve original data
```

#### 2.3 Publish & Share (10 kiểm thử)
```
TC_CARD_017: Publish card (live)
TC_CARD_018: Generate public URL
TC_CARD_019: QR code generation
TC_CARD_020: Share with specific users
TC_CARD_021: Public view access
TC_CARD_022: Analytics tracking
TC_CARD_023: Schedule publishing
TC_CARD_024: Unpublish card
TC_CARD_025: Archive card
TC_CARD_026: Restore archived card
```

#### 2.4 Delete & Cleanup (9 kiểm thử)
```
TC_CARD_027: Soft delete card
TC_CARD_028: Hard delete card
TC_CARD_029: Delete avatar file
TC_CARD_030: Remove public access
TC_CARD_031: Clean up associated data
TC_CARD_032: Permanent deletion after 30 days
TC_CARD_033: Recovery from trash
TC_CARD_034: Prevent unauthorized delete
TC_CARD_035: Audit trail for deletion
```

---

## 🧪 Module 3: AI Configuration

### Tệp: `Backend/tests/Module_3_AI_Config.test.js`
**Test Cases**: 35 (TC_AICONFIG_001 → TC_AICONFIG_035)

#### 3.1 System Prompt (5 kiểm thử)
```
TC_AICONFIG_001: Set system prompt
TC_AICONFIG_002: Update system prompt
TC_AICONFIG_003: Validate prompt length (max 5000)
TC_AICONFIG_004: Handle special characters
TC_AICONFIG_005: Save in < 500ms
```

#### 3.2 Knowledge Base (7 kiểm thử)
```
TC_AICONFIG_006: Add skill to KB
TC_AICONFIG_007: Add experience to KB
TC_AICONFIG_008: Add project to KB
TC_AICONFIG_009: Update KB item
TC_AICONFIG_010: Delete KB item
TC_AICONFIG_011: Validate KB size limit
TC_AICONFIG_012: Handle empty KB
```

#### 3.3 AI Settings (8 kiểm thử)
```
TC_AICONFIG_013: Set tone to Professional
TC_AICONFIG_014: Set tone to Casual
TC_AICONFIG_015: Set tone to Humorous
TC_AICONFIG_016: Validate tone value
TC_AICONFIG_017: Adjust temperature (0.0-1.0)
TC_AICONFIG_018: Reject invalid temperature
TC_AICONFIG_019: Set top_p parameter
TC_AICONFIG_020: Toggle AI enable/disable
```

#### 3.4 Guardrails (4 kiểm thử)
```
TC_AICONFIG_021: Only answer from KB
TC_AICONFIG_022: Prevent hallucinations
TC_AICONFIG_023: Forbidden topics list
TC_AICONFIG_024: Max response length
```

#### 3.5 Retrieval (2 kiểm thử)
```
TC_AICONFIG_025: Get full AI config
TC_AICONFIG_026: Limit data for unauthorized
```

#### 3.6 Authorization (3 kiểm thử)
```
TC_AICONFIG_027: Require authentication
TC_AICONFIG_028: Reject non-owner updates
TC_AICONFIG_029: Only owner can modify
```

#### 3.7 Chat Validation (6 kiểm thử)
```
TC_AICONFIG_030: Test chat with config
TC_AICONFIG_031: Response in < 3s
TC_AICONFIG_032: Handle empty KB chat
TC_AICONFIG_033: Validate config before chat
TC_AICONFIG_034: Concurrent updates
TC_AICONFIG_035: Config reset functionality
```

---

## 🧪 Module 4: AI Chatbot & Responses

### Tệp: `Backend/tests/Module_4_AI_Chatbot.test.js`
**Test Cases**: 40 (TC_CHATBOT_001 → TC_CHATBOT_040)

#### 4.1 Message Storage (6 kiểm thử)
```
TC_CHATBOT_001: Save user message
TC_CHATBOT_002: Save AI response with metadata
TC_CHATBOT_003: Store with timestamp
TC_CHATBOT_004: Track visitor email
TC_CHATBOT_005: Retrieve chat history
TC_CHATBOT_006: Save in < 200ms
```

#### 4.2 AI Response (7 kiểm thử)
```
TC_CHATBOT_007: Generate relevant response
TC_CHATBOT_008: Provide expert answers
TC_CHATBOT_009: Handle out-of-scope questions
TC_CHATBOT_010: Response in < 3s
TC_CHATBOT_011: Handle AI timeout gracefully
TC_CHATBOT_012: Maintain persona tone
TC_CHATBOT_013: Complete round < 3.5s
```

#### 4.3 RAG Integration (5 kiểm thử)
```
TC_CHATBOT_014: Retrieve relevant KB context
TC_CHATBOT_015: Inject KB into prompt
TC_CHATBOT_016: Filter irrelevant items
TC_CHATBOT_017: Handle empty KB
TC_CHATBOT_018: Relevant result ranking
```

#### 4.4 Error Handling (6 kiểm thử)
```
TC_CHATBOT_019: Reject empty message
TC_CHATBOT_020: Reject oversized message (>5000 chars)
TC_CHATBOT_021: Handle AI API timeout
TC_CHATBOT_022: Handle token limit exceeded
TC_CHATBOT_023: Fallback response if AI unavailable
TC_CHATBOT_024: Handle corrupted conversation data
```

#### 4.5 Guardrails (4 kiểm thử)
```
TC_CHATBOT_025: Prevent hallucinations
TC_CHATBOT_026: Respect forbidden topics
TC_CHATBOT_027: Limit response length
TC_CHATBOT_028: Handle prompt injection attempts
```

#### 4.6 Conversation (5 kiểm thử)
```
TC_CHATBOT_029: Maintain context across turns
TC_CHATBOT_030: List all conversations
TC_CHATBOT_031: Get conversation with messages
TC_CHATBOT_032: Mark conversation read
TC_CHATBOT_033: Support pagination
```

#### 4.7 Real-time Sync (2 kiểm thử)
```
TC_CHATBOT_034: Store for real-time sync
TC_CHATBOT_035: Support message subscriptions
```

#### 4.8 Advanced (5 kiểm thử)
```
TC_CHATBOT_036: Handle multi-turn conversations
TC_CHATBOT_037: Handle rapid messages
TC_CHATBOT_038: Support special characters
TC_CHATBOT_039: Support multiple languages
TC_CHATBOT_040: Maintain chat quality under load
```

---

## 🧪 Module 5: Inbox & Fallback

### Tệp: `Backend/tests/Module_5_Inbox_Fallback.test.js`
**Test Cases**: 35 (TC_INBOX_001 → TC_INBOX_035)

#### 5.1 Fallback Form (10 kiểm thử)
```
TC_INBOX_001: Send fallback form with valid data
TC_INBOX_002: Require email field
TC_INBOX_003: Validate email format
TC_INBOX_004: Require message field
TC_INBOX_005: Store with timestamp
TC_INBOX_006: Save in < 300ms
TC_INBOX_007: Handle long messages (1000 chars)
TC_INBOX_008: Reject oversized (>5000 chars)
TC_INBOX_009: Store phone number
TC_INBOX_010: Handle special characters
```

#### 5.2 Conversation List (6 kiểm thử)
```
TC_INBOX_011: List all conversations
TC_INBOX_012: Support pagination (limit, offset)
TC_INBOX_013: Support different sort orders
TC_INBOX_014: Filter unread conversations
TC_INBOX_015: List in < 500ms
TC_INBOX_016: Show conversation preview
```

#### 5.3 Conversation Detail (7 kiểm thử)
```
TC_INBOX_017: Get full conversation
TC_INBOX_018: Mark as read
TC_INBOX_019: Mark as unread
TC_INBOX_020: Add notes to conversation
TC_INBOX_021: Delete conversation
TC_INBOX_022: Search by visitor name
TC_INBOX_023: Search by email
```

#### 5.4 Lead Management (5 kiểm thử)
```
TC_INBOX_024: Capture visitor as lead
TC_INBOX_025: Tag conversation as lead
TC_INBOX_026: Get all leads list
TC_INBOX_027: Filter leads by status (hot, warm, cold)
TC_INBOX_028: Update lead status
```

#### 5.5 Owner Messaging (2 kiểm thub)
```
TC_INBOX_029: Allow owner replies
TC_INBOX_030: Store with sender ID
```

#### 5.6 Real-time (2 kiểm thử)
```
TC_INBOX_031: Real-time inbox updates
TC_INBOX_032: Sync updates < 1s
```

#### 5.7 Security (3 kiểm thử)
```
TC_INBOX_033: Require authentication
TC_INBOX_034: Prevent non-owner access
TC_INBOX_035: Allow public fallback submission
```

---

## 🧪 Module 6: Human Takeover

### Tệp: `Backend/tests/Module_6_Human_Takeover.test.js`
**Test Cases**: 30 (TC_TAKEOVER_001 → TC_TAKEOVER_030)

#### 6.1 Takeover Initiation (8 kiểm thử)
```
TC_TAKEOVER_001: Allow owner to start takeover
TC_TAKEOVER_002: Mark conversation as human-managed
TC_TAKEOVER_003: Disable AI responses after takeover
TC_TAKEOVER_004: Preserve conversation history
TC_TAKEOVER_005: Complete in < 300ms
TC_TAKEOVER_006: Allow manual responses
TC_TAKEOVER_007: Send notification to visitor
TC_TAKEOVER_008: Support instant messaging
```

#### 6.2 Authorization (4 kiểm thử)
```
TC_TAKEOVER_009: Reject non-owner takeover
TC_TAKEOVER_010: Require authentication
TC_TAKEOVER_011: Only one active takeover
TC_TAKEOVER_012: Prevent double takeover
```

#### 6.3 Message Routing (5 kiểm thử)
```
TC_TAKEOVER_013: Route owner messages to visitor
TC_TAKEOVER_014: Deliver in < 500ms
TC_TAKEOVER_015: Maintain message order
TC_TAKEOVER_016: Timestamp owner messages
TC_TAKEOVER_017: Handle rapid messages
```

#### 6.4 Visitor Interaction (3 kiểm thử)
```
TC_TAKEOVER_018: Allow visitor messages
TC_TAKEOVER_019: Route to owner
TC_TAKEOVER_020: Show human is responding
```

#### 6.5 Handback (3 kiểm thử)
```
TC_TAKEOVER_021: Allow handback to AI
TC_TAKEOVER_022: Send handback notification
TC_TAKEOVER_023: Resume AI responses
```

#### 6.6 Notifications (2 kiểm thử)
```
TC_TAKEOVER_024: Notify owner of new messages
TC_TAKEOVER_025: Include visitor info in notification
```

#### 6.7 Edge Cases (5 kiểm thử)
```
TC_TAKEOVER_026: Handle non-existent conversation
TC_TAKEOVER_027: Handle ended conversation
TC_TAKEOVER_028: Handle concurrent takeover attempts
TC_TAKEOVER_029: Handle state transitions
TC_TAKEOVER_030: Handle disabled AI card
```

---

## 🧪 Module 7: Admin Panel

### Tệp: `Backend/tests/Module_7_Admin_Panel.test.js`
**Test Cases**: 35 (TC_ADMIN_001 → TC_ADMIN_035)

#### 7.1 User Management (8 kiểm thử)
```
TC_ADMIN_001: List all users
TC_ADMIN_002: Support pagination
TC_ADMIN_003: List in < 1s
TC_ADMIN_004: Get user details
TC_ADMIN_005: Filter by role
TC_ADMIN_006: Filter by status
TC_ADMIN_007: Search by email
TC_ADMIN_008: Search by display name
```

#### 7.2 User Actions (6 kiểm thử)
```
TC_ADMIN_009: Suspend user account
TC_ADMIN_010: Prevent suspended login
TC_ADMIN_011: Unsuspend account
TC_ADMIN_012: Soft delete user
TC_ADMIN_013: Prevent deleted user access
TC_ADMIN_014: Preserve deleted data
```

#### 7.3 Violation Reports (9 kiểm thử)
```
TC_ADMIN_015: List all reports
TC_ADMIN_016: Create violation report
TC_ADMIN_017: Get report details
TC_ADMIN_018: List with pagination
TC_ADMIN_019: Filter by status
TC_ADMIN_020: Filter by reason
TC_ADMIN_021: Approve report
TC_ADMIN_022: Reject report
TC_ADMIN_023: Action on approved report
```

#### 7.4 Dashboard & Analytics (7 kiểm thử)
```
TC_ADMIN_024: Get system overview
TC_ADMIN_025: Dashboard in < 500ms
TC_ADMIN_026: Total users count
TC_ADMIN_027: Total cards count
TC_ADMIN_028: Active conversations
TC_ADMIN_029: User signup trends
TC_ADMIN_030: Conversation activity trends
```

#### 7.5 Security (5 kiểm thử)
```
TC_ADMIN_031: Require authentication
TC_ADMIN_032: Require admin role
TC_ADMIN_033: Only admin sees all users
TC_ADMIN_034: Only admin manages reports
TC_ADMIN_035: Audit admin actions
```

---

## 📈 Chỉ Số Hiệu Suất Kiểm Thử

### Mục Tiêu Hiệu Suất Theo Module

| Module | Hoạt Động | Mục Tiêu | Test ID |
|--------|-----------|---------|---------|
| **Auth** | Đăng ký | < 500ms | TC_AUTH_001 |
| **Auth** | Đăng nhập | < 300ms | TC_AUTH_011 |
| **Card** | Tạo | < 1s | TC_CARD_001 |
| **AI Config** | Lưu config | < 500ms | TC_AICONFIG_005 |
| **AI Chat** | Lưu tin nhắn | < 200ms | TC_CHATBOT_006 |
| **AI Chat** | Phản hồi | < 3s | TC_CHATBOT_010 |
| **Inbox** | Gửi form | < 300ms | TC_INBOX_006 |
| **Inbox** | Liệt kê | < 500ms | TC_INBOX_015 |
| **Takeover** | Khởi tạo | < 300ms | TC_TAKEOVER_005 |
| **Takeover** | Cung cấp tin nhắn | < 500ms | TC_TAKEOVER_014 |
| **Admin** | Liệt kê users | < 1s | TC_ADMIN_003 |
| **Admin** | Dashboard | < 500ms | TC_ADMIN_025 |

---

## 🛠️ Cấu Hình & Thiết Lập

### Jest Configuration
- ✅ Node test environment
- ✅ Test timeout: 10,000ms
- ✅ Coverage threshold: 70%
- ✅ Setup files: jest.setup.js
- ✅ Global setup: setup.js

### Test Fixtures
- ✅ Valid users data
- ✅ Invalid users data
- ✅ Registration test data
- ✅ Login test data
- ✅ OAuth test data
- ✅ Password reset data
- ✅ Authorization test data

### Dependencies
```json
{
  "jest": "^29.7.0",
  "supertest": "^6.3.3",
  "firebase-admin": "^13.10.0",
  "firebase": "^12.13.0"
}
```

---

## 📋 Hướng Dẫn Chạy Tests

### 1️⃣ Chuẩn Bị Môi Trường

```bash
# Cài dependencies
cd Backend
npm install

# Tạo file .env
cat > .env << EOF
NODE_ENV=test
API_URL=http://localhost:3001
FIREBASE_PROJECT_ID=test-project
EOF
```

### 2️⃣ Chạy Firebase Emulator

```bash
firebase emulators:start
```

### 3️⃣ Chạy Tests

```bash
# Tất cả tests
npm test

# Từng module
npm run test:module1   # Auth
npm run test:module2   # Card
npm run test:module3   # AI Config

# Với coverage
npm run test:coverage

# Watch mode
npm test -- --watch
```

---

## 📊 Mục Tiêu Kết Quả

### Coverage Goals
```
Branches:    ≥ 70%
Functions:   ≥ 70%
Lines:       ≥ 70%
Statements:  ≥ 70%
```

### Test Success Rate
```
Overall:     ≥ 95%
Auth:        ≥ 95%
Card:        ≥ 95%
AI Features: ≥ 90% (do external AI API)
```

### Performance Targets
```
Average test: < 500ms
Slow test: < 3000ms
Full suite: < 60s
```

---

## 📌 Chú Ý Quan Trọng

### Firebase Emulator Bắt Buộc
- Tests cần Firebase Emulator chạy
- Port: 4000, 5000, 8085, 9000, 9099
- Tự động reset dữ liệu giữa tests

### External API (OpenAI)
- Cần mock OpenAI API để test
- Có thể sử dụng MSW (Mock Service Worker)
- Hoặc viết API mock responses

### Async/Await
- Tất cả async operations phải được await
- Sử dụng `done` callback nếu cần
- Không quên return promises

---

## 🚀 Bước Tiếp Theo

1. **Chuẩn Bị Môi Trường**
   - Cài Firebase CLI
   - Config Firebase Emulator
   - Thiết lập test database

2. **Chạy Kiểm Thử**
   - Chạy module 1 đầu tiên
   - Xác minh kết quả
   - Debug các lỗi

3. **Tạo Chi Tiết Report**
   - Chạy tất cả modules
   - Collect coverage data
   - Generate HTML report

4. **CI/CD Integration**
   - Thêm vào pipeline
   - Setup GitHub Actions
   - Auto-run trên PR

---

## 📚 Tài Liệu Tham Khảo

- `Backend/jest.config.js` - Jest configuration
- `Backend/tests/jest.setup.js` - Test setup
- `Backend/tests/Module_*.test.js` - Test files
- `Testing/fixtures/` - Test data
- `TEST PLAN.md` - Overall test strategy

---

**Báo Cáo Được Tạo**: 2026  
**Phiên Bản**: 1.0 - Chuẩn Bị Thực Thi  
**Trạng Thái**: 📋 Sẵn Sàng Chạy  

*Báo cáo này tóm tắt cấu trúc kiểm thử backend và hướng dẫn thực thi chi tiết.*
