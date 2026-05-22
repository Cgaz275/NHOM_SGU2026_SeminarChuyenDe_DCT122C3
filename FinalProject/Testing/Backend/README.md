# Backend Testing Guide

**Persona-Based Digital Twin Card System - Backend Test Suite**

---

## 📌 Overview

Backend testing focuses on API endpoints, business logic, database operations, and security.

- **Framework**: Jest (Unit & Integration Tests)
- **API Testing**: Postman
- **Database**: Firebase Firestore Emulator
- **Coverage Target**: ≥ 85%

---

## 🎯 Testing Strategy

### 1. Unit Tests (Jest)

Test individual functions, services, and controllers in isolation.

**Files**: `Backend/tests/*.test.js`

**Example Test Suite**:
```javascript
// tests/Module_1_Auth.test.js
describe('Authentication Service', () => {
  describe('User Registration', () => {
    it('TC_AUTH_001: Should register user with valid credentials', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_002: Should reject invalid email', async () => {
      // Test implementation
    });
  });
});
```

### 2. Integration Tests (Jest)

Test how multiple components work together (e.g., Auth → Database → Response).

**Example**:
```javascript
// tests/integration/auth-flow.test.js
describe('Registration Flow Integration', () => {
  it('should complete full registration flow', async () => {
    // Test: Input → Service → Database → Response
  });
});
```

### 3. API Tests (Postman)

Test all REST API endpoints with different request/response scenarios.

**Collections**: `Testing/Backend/postman/`

**Test Flow**:
1. Send request with test data
2. Verify response status code
3. Validate response schema
4. Check database state
5. Document results

---

## 📊 Test Organization by Module

### Module 1: Authentication API

**Test Cases**: 40 (TC_AUTH_001 to TC_AUTH_040)

**Endpoints**:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/google-oauth`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-token`
- `POST /api/auth/logout`

**Test Focus**:
- Happy path: Valid registration/login
- Error cases: Invalid email, weak password, duplicate email
- Security: SQL injection, XSS, brute force protection
- Performance: Response time < 500ms
- Session: Token validity, expiration, refresh

**Fixture Reference**: `fixtures/auth.fixtures.ts`

---

### Module 2: Card Management API

**Test Cases**: 29 (TC_CARD_001 to TC_CARD_029)

**Endpoints**:
- `POST /api/cards` (Create)
- `GET /api/cards/:id` (Retrieve)
- `PUT /api/cards/:id` (Update)
- `DELETE /api/cards/:id` (Delete)
- `GET /api/cards/slug/:slug` (Get by slug)
- `POST /api/cards/:id/publish` (Publish)

**Test Focus**:
- CRUD operations
- Authorization (only owner can edit)
- Slug uniqueness and validation
- Draft vs published state
- Performance metrics

**Fixture Reference**: `fixtures/card-profile.fixtures.ts`

---

### Module 3: AI Digital Twin API

**Test Cases**: 35 (TC_CHAT_001 to TC_CHAT_034)

**Endpoints**:
- `POST /api/chat` (Send message)
- `GET /api/conversations/:id` (Retrieve history)
- `POST /api/conversations/:id/takeover` (Human takeover)
- `GET /api/ai-config/:cardId` (Get AI configuration)

**Test Focus**:
- Response accuracy (≥ 90%)
- Hallucination detection
- Guardrails enforcement
- Timeout handling (< 3 seconds)
- Real-time message sync
- Fallback mechanism

**Fixture Reference**: `fixtures/ai-chat.fixtures.ts`

---

## 🏗️ Test File Structure

```
Backend/tests/
├── Module_1_Auth.test.js
│   ├── Registration Sub-Suite
│   ├── Login Sub-Suite
│   └── Session Management Sub-Suite
│
├── Module_2_Card_Profile.test.js
│   ├── Create Card Sub-Suite
│   ├── Update Card Sub-Suite
│   └── Publish Card Sub-Suite
│
├── Module_3_AI_Chat.test.js
│   ├── Message Handling Sub-Suite
│   ├── Response Validation Sub-Suite
│   └── Takeover Sub-Suite
│
├── integration/
│   ├── auth-flow.test.js
│   ├── card-creation-flow.test.js
│   └── chat-flow.test.js
│
├── setup.js (Global setup/teardown)
└── fixtures/ (local if needed)
```

---

## 🚀 Running Backend Tests

### Run All Tests
```bash
npm run test:backend
```

### Run Specific Module
```bash
npm run test:backend -- --testNamePattern="Authentication"
```

### Run with Coverage
```bash
npm run test:backend -- --coverage
```

### Watch Mode
```bash
npm run test:backend -- --watch
```

### Run Single File
```bash
npm test tests/Module_1_Auth.test.js
```

---

## 📊 Expected Test Results

### Test Coverage

| Module | Unit Tests | Integration | Coverage |
|--------|-----------|-------------|----------|
| Authentication | 10 | 5 | 95% |
| Card Management | 12 | 6 | 90% |
| AI Digital Twin | 10 | 5 | 85% |
| Admin Panel | 6 | 3 | 80% |

### Success Criteria

- ✅ Test Case Pass Rate ≥ 95%
- ✅ Code Coverage ≥ 85%
- ✅ No Critical/High bugs
- ✅ Average Response Time < 500ms
- ✅ AI Accuracy ≥ 90%

---

## 🔧 Jest Configuration

### Setup File (jest.setup.js)

```javascript
// Initialize Firebase Emulator
beforeAll(async () => {
  await startFirebaseEmulator();
  await initializeTestDatabase();
});

// Clean up after all tests
afterAll(async () => {
  await clearTestDatabase();
  await stopFirebaseEmulator();
});

// Reset between test suites
beforeEach(async () => {
  await resetTestData();
});
```

### Environment Variables

```env
# .env.test
NODE_ENV=test
API_PORT=3001
FIREBASE_EMULATOR_HOST=localhost:5001
FIRESTORE_EMULATOR_HOST=localhost:4000
```

---

## 📋 Test Case Template

```javascript
describe('Feature Description', () => {
  it('TC_MODULE_001: Should [expected behavior] when [condition]', async () => {
    // Arrange: Setup test data
    const testData = fixtures.getTestData('module', 'TC_MODULE_001');
    
    // Act: Execute the function/API
    const response = await apiCall(testData.input);
    
    // Assert: Verify results
    expect(response.statusCode).toBe(testData.expected.statusCode);
    expect(response.data).toEqual(testData.expected.data);
  });
});
```

---

## 🔍 Debugging Tests

### Enable Debug Logs
```bash
DEBUG=* npm test
```

### Run Single Test
```javascript
// Use .only to run single test
it.only('TC_AUTH_001: ...', async () => {
  // This test runs only
});
```

### Inspect Database State
```javascript
// After test, inspect Firestore
const db = getFirestore();
const users = await getDocs(collection(db, 'users'));
console.log('Users:', users.docs.map(doc => doc.data()));
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Firebase Emulator not starting | Ensure port 5001 is free, restart emulator |
| Tests timeout | Increase timeout: `jest.setTimeout(10000)` |
| Flaky tests | Check for race conditions, use proper waits |
| Database not reset | Verify `beforeEach` cleanup logic |

---

## 📈 Metrics & Reporting

### Generate Coverage Report
```bash
npm run test:backend -- --coverage --coverage-reporters=html
# Open: coverage/index.html
```

### Create Test Report
```bash
npm run test:backend -- --testResultsProcessor=./utils/test-reporter.js
```

### Test Metrics Dashboard
```
Total Tests:          104
Passed:              99 (95%)
Failed:               3 (3%)
Skipped:              2 (2%)
Duration:          12.5s
Coverage:          89%
```

---

## ✅ Checklist Before Deployment

- [ ] All tests pass (≥ 95%)
- [ ] Coverage ≥ 85%
- [ ] No console warnings/errors
- [ ] Performance metrics acceptable
- [ ] Security tests passed
- [ ] Integration tests passed
- [ ] Database migrations applied
- [ ] Environment variables set

---

## 📚 References

- [TEST PLAN.md](../../AI_Instruction/TEST PLAN.md)
- [backend_test_guideline.md](../../AI_Instruction/Testing/backend_test_guideline.md)
- [test_cases_guideline.md](../../AI_Instruction/Testing/test_cases_guideline.md)
- [test_suite_guideline.md](../../AI_Instruction/Testing/test_suite_guideline.md)
- [Jest Docs](https://jestjs.io/)
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)

---

**Last Updated**: 2026  
**Status**: Active ✅
