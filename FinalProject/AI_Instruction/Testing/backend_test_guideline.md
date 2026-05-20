# Backend Testing Guideline

**Hướng dẫn kiểm thử Backend cho Persona-Based Digital Twin Card System**

---

## 📌 Mục Đích

Tài liệu này cung cấp hướng dẫn chi tiết cho QA/Testing Agent thực hiện kiểm thử Backend sử dụng:
- **Jest** cho Unit Tests và Integration Tests
- **Postman** cho API Testing
- **Firebase Emulator** cho local testing

---

## 🎯 Phạm Vi Backend Testing

### Modules Cần Kiểm Thử

| # | Module | File Test | Ưu Tiên |
|---|--------|-----------|---------|
| 1 | Authentication & Authorization | `Module_1_Auth.test.js` | **Very High** |
| 2 | Card Management & Profile Builder | `Module_2_Card_Profile.test.js` | **Very High** |
| 3 | AI Digital Twin Configuration | `Module_3_AI_Config.test.js` | **Very High** |
| 4 | Chatbot & AI Response | `Module_4_Chatbot_AI.test.js` | **Very High** |
| 5 | Fallback & Inbox Management | `Module_5_Fallback_Inbox.test.js` | **High** |
| 6 | Human Takeover Feature | `Module_6_Human_Takeover.test.js` | **High** |
| 7 | Admin Panel & User Management | `Module_7_Admin_Panel.test.js` | **High** |

---

## 🛠️ Công Cụ & Công Nghệ

### Jest Configuration

```javascript
// Backend/jest.config.js
module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
    '!src/config/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  teardownFilesAfterEnv: ['<rootDir>/tests/teardown.js']
};
```

### Environment Variables (.env.test)

```env
NODE_ENV=test
FIREBASE_PROJECT_ID=digital-twin-test
FIREBASE_DATABASE_URL=http://localhost:9000
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIREBASE_STORAGE_BUCKET=digital-twin-test.appspot.com
OPENAI_API_KEY=sk-test-key-xxx
OPENAI_ORG_ID=org-test-xxx
PORT=3001
```

---

## 📋 Test Case Structure

### Template Cơ Bản

```javascript
describe('Module Name', () => {
  describe('Endpoint or Function', () => {
    let testUser;
    let testCard;

    // Setup trước mỗi test
    beforeEach(async () => {
      // Initialize test data
      testUser = await createTestUser();
      testCard = await createTestCard(testUser.id);
    });

    // Cleanup sau mỗi test
    afterEach(async () => {
      // Clean up test data
      await deleteTestData();
    });

    it('should [expected behavior] when [condition]', async () => {
      // Arrange
      const input = { /* test data */ };

      // Act
      const response = await request(app)
        .post('/api/endpoint')
        .send(input);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('expectedField');
    });
  });
});
```

---

## 🧪 Testing Strategy by Module

### Module 1: Authentication & Authorization

**Điều Kiện Tiên Quyết:**
- Firebase Emulator đang chạy
- Test database được khởi tạo

**Test Cases Quan Trọng:**

1. **User Registration**
   - ✅ Register với email và password hợp lệ
   - ✅ Register fail với email không hợp lệ
   - ✅ Register fail nếu email đã tồn tại
   - ✅ Register fail với password yếu
   - ✅ Email verification

2. **User Login**
   - ✅ Login thành công với credentials đúng
   - ✅ Login fail với password sai
   - ✅ Login fail với email không tồn tại
   - ✅ Token được tạo đúng sau login

3. **Authorization & Roles**
   - ✅ Card Owner chỉ có quyền truy cập dashboard của mình
   - ✅ Admin có quyền truy cập Admin Panel
   - ✅ Public User không có quyền create card
   - ✅ JWT token validation

4. **Session Management**
   - ✅ Token expiration sau 24h
   - ✅ Refresh token mechanism
   - ✅ Logout hủy session

**Performance Targets:**
- Registration: < 500ms
- Login: < 300ms
- Token validation: < 100ms

---

### Module 2: Card Management & Profile Builder

**Test Cases Quan Trọng:**

1. **Create Card**
   - ✅ Create card với valid data
   - ✅ Create card fail nếu missing required fields
   - ✅ Card được lưu vào Firestore đúng
   - ✅ Card slug được generate unique

2. **Update Card**
   - ✅ Update personal info
   - ✅ Update sections (Experience, Skills, Projects)
   - ✅ Update validation
   - ✅ Partial update không overwrite toàn bộ data

3. **Card Publishing**
   - ✅ Publish card để public
   - ✅ Unpublish card
   - ✅ Draft vs Published status

4. **Input Validation**
   - ✅ Avatar upload (max 5MB)
   - ✅ Bio character limit
   - ✅ Email format validation
   - ✅ Social links format

**Performance Targets:**
- Create card: < 1s
- Update card: < 800ms
- Get card: < 300ms

---

### Module 3: AI Digital Twin Configuration

**Test Cases Quan Trọng:**

1. **System Prompt Management**
   - ✅ Set system prompt
   - ✅ Update system prompt
   - ✅ System prompt character limit
   - ✅ Special character handling

2. **Knowledge Base Management**
   - ✅ Add persona data
   - ✅ Update persona data
   - ✅ Delete persona data
   - ✅ Knowledge base size limit

3. **AI Settings**
   - ✅ Configure tone of voice
   - ✅ Set temperature & top_p parameters
   - ✅ Enable/Disable AI Digital Twin
   - ✅ Guardrail settings

4. **Test Chat**
   - ✅ Test chat trong configuration environment
   - ✅ AI response generation
   - ✅ Response validation

**Performance Targets:**
- Save configuration: < 500ms
- Test chat response: < 3s

---

### Module 4: Chatbot & AI Response

**Test Cases Quan Trọng:**

1. **Chat Message Storage**
   - ✅ Save user message
   - ✅ Save AI response
   - ✅ Message metadata (timestamp, user_id)
   - ✅ Real-time sync

2. **AI Response Generation**
   - ✅ AI returns response within timeout
   - ✅ Response contains relevant information
   - ✅ Response respects guardrails
   - ✅ Fallback response nếu AI fail

3. **RAG Integration**
   - ✅ Knowledge base context retrieval
   - ✅ Relevance filtering
   - ✅ Context injection vào prompt

4. **Error Handling**
   - ✅ OpenAI API timeout
   - ✅ Token limit exceeded
   - ✅ Invalid knowledge base
   - ✅ Rate limiting

**Performance Targets:**
- Message storage: < 200ms
- AI response: < 3s
- Overall chat round-trip: < 3.5s

---

### Module 5: Fallback & Inbox Management

**Test Cases Quan Trọng:**

1. **Fallback Form**
   - ✅ Submit fallback form
   - ✅ Form validation
   - ✅ Email notification

2. **Inbox & Conversations**
   - ✅ Store conversation
   - ✅ List conversations with pagination
   - ✅ Get conversation detail
   - ✅ Mark as read/unread

3. **Real-time Sync**
   - ✅ Firestore listener for new messages
   - ✅ Sync across devices
   - ✅ Connection drop handling

**Performance Targets:**
- Store conversation: < 300ms
- List conversations: < 500ms
- Real-time update: < 1s

---

### Module 6: Human Takeover Feature

**Test Cases Quan Trọng:**

1. **Takeover Functionality**
   - ✅ Card owner take over conversation
   - ✅ Switch from AI to human
   - ✅ Conversation history preserved
   - ✅ Notification to visitor

2. **Permission Validation**
   - ✅ Only card owner can takeover
   - ✅ Can't takeover already taken over

3. **Message Flow**
   - ✅ Human message goes to visitor
   - ✅ Visitor message goes to human
   - ✅ AI disabled during takeover

**Performance Targets:**
- Takeover: < 300ms
- Message delivery: < 500ms

---

### Module 7: Admin Panel & User Management

**Test Cases Quan Trọng:**

1. **User Management**
   - ✅ List all users with pagination
   - ✅ View user details
   - ✅ Suspend/unsuspend user
   - ✅ Delete user (soft delete)

2. **Violation Report Management**
   - ✅ List reported cards
   - ✅ View report details
   - ✅ Approve/reject report
   - ✅ Take action on violating card

3. **System Overview**
   - ✅ Get total users count
   - ✅ Get total cards count
   - ✅ Get system stats
   - ✅ Get active conversations

**Performance Targets:**
- List users: < 1s
- Get system stats: < 500ms

---

## ✅ Test Execution Checklist

- [ ] Firebase Emulator started
- [ ] Environment variables configured
- [ ] Test database initialized
- [ ] All dependencies installed
- [ ] Run `npm test` (Backend)
- [ ] All tests passing
- [ ] Coverage ≥ 70%
- [ ] No console errors/warnings
- [ ] API response times within targets

---

## 📊 Test Coverage Goals

| Module | Target Coverage |
|--------|-----------------|
| Authentication | 90% |
| Card Management | 85% |
| AI Configuration | 80% |
| Chatbot | 85% |
| Inbox & Fallback | 80% |
| Human Takeover | 85% |
| Admin Panel | 80% |
| **Overall** | **≥ 85%** |

---

## 🐛 Bug Reporting

When finding bugs during backend testing, report with:

```
Bug ID: BUG_BACKEND_001
Module: Authentication
Title: Login returns 500 error with special characters in email
Severity: High
Steps to Reproduce:
  1. Call POST /api/auth/login
  2. Send email with special characters (e.g., "test+filter@mail.com")
  3. Send valid password
Expected: Login succeeds with 200 status
Actual: Returns 500 Internal Server Error
API Response: [Include full response JSON]
Environment: Node.js 18.x, Firebase Emulator
```

---

## 📚 References

- [Jest Documentation](https://jestjs.io/)
- [Express Testing Guide](https://expressjs.com/en/guide/debugging.html)
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
- [TEST PLAN.md](../TEST%20PLAN.md)

---

**Last Updated:** 2026  
**Version:** 1.0  
**Status:** Active ✅
