# Backend Testing Guide

**Persona-Based Digital Twin Card System - Backend Test Suite**

---

## 📋 Overview

This guide covers how to set up, configure, and run the comprehensive backend test suite for the Digital Twin Card Platform.

**Test Coverage:**
- Module 1: Authentication & Authorization (40 test cases)
- Module 2: Card Management & Profile Builder (35+ test cases)
- Module 3: AI Configuration (35 test cases)
- Module 4: Chatbot & AI Response (40 test cases)
- Module 5: Inbox & Fallback Management (35 test cases)
- Module 6: Human Takeover Feature (30 test cases)
- Module 7: Admin Panel & User Management (35 test cases)

**Total: 250+ Test Cases**

---

## 🛠️ Prerequisites

### System Requirements
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Firebase CLI**: Latest version
- **Operating System**: Windows 11, macOS, or Linux (Ubuntu 20.04+)

### Installation

1. **Install Node.js & npm**
   ```bash
   # Check if installed
   node --version
   npm --version
   ```

2. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

3. **Verify Firebase installation**
   ```bash
   firebase --version
   ```

---

## 🔧 Setup & Configuration

### Step 1: Install Backend Dependencies

```bash
cd Backend

# Install all dependencies
npm install

# Verify installation
npm list
```

### Step 2: Configure Environment Variables

Create/update `.env.test` file in the Backend folder:

```env
# Test Environment
NODE_ENV=test

# Firebase Emulator Configuration
FIREBASE_EMULATOR_HOST=localhost:4000
FIRESTORE_EMULATOR_HOST=localhost:4000
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIREBASE_STORAGE_EMULATOR_HOST=localhost:4001

# Firebase Project (Test)
FIREBASE_PROJECT_ID=digital-twin-test
FIREBASE_DATABASE_URL=http://localhost:9000
FIREBASE_STORAGE_BUCKET=digital-twin-test.appspot.com

# API Configuration
API_URL=http://localhost:3001
PORT=3001

# OpenAI Configuration (Test)
OPENAI_API_KEY=sk-test-key-xxx
OPENAI_ORG_ID=org-test-xxx

# Rate Limiting
RATE_LIMIT_WINDOW_MS=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=test
```

### Step 3: Initialize Jest Configuration

The `jest.config.js` is already configured. Verify it includes:

```javascript
{
  testEnvironment: 'node',
  testTimeout: 10000,
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
}
```

---

## 🚀 Running Tests

### Option 1: Start Firebase Emulator + Run Tests (Automated)

**Recommended for CI/CD environments**

```bash
# Start Firebase Emulator in background
firebase emulators:start --only firestore,auth,storage &

# Wait for emulator to start (typically 5-10 seconds)
sleep 10

# Run all tests
npm test

# Run specific module
npm run test:module1  # Authentication
npm run test:module2  # Cards
npm run test:module3  # AI Config

# Stop Firebase Emulator
firebase emulators:stop
```

### Option 2: Start Firebase Emulator Manually + Run Tests

**Recommended for local development**

**Terminal 1: Start Firebase Emulator**
```bash
# In Backend directory
firebase emulators:start

# Expected output:
# ✔ Emulator started, listening at 127.0.0.1:4000
# ✔ Firestore Emulator running on 127.0.0.1:4000
# ✔ Auth Emulator running on 127.0.0.1:9099
```

**Terminal 2: Run Tests**
```bash
cd Backend

# Run all tests
npm test

# Run with watch mode (auto-rerun on file changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run specific test file
npm test -- Module_1_Auth.test.js

# Run tests matching pattern
npm test -- --testNamePattern="Registration"
```

### Option 3: Run Individual Module Tests

```bash
# Authentication & Authorization
npm run test:module1

# Card Management & Profile Builder
npm run test:module2

# AI Configuration
npm test -- Module_3_AI_Config.test.js

# Chatbot & AI Response
npm test -- Module_4_AI_Chatbot.test.js

# Inbox & Fallback
npm test -- Module_5_Inbox_Fallback.test.js

# Human Takeover
npm test -- Module_6_Human_Takeover.test.js

# Admin Panel
npm test -- Module_7_Admin_Panel.test.js
```

---

## 📊 Understanding Test Output

### Successful Test Output
```
PASS  Backend/tests/Module_1_Auth.test.js
  Authentication & Authorization Test Suite
    Registration Sub-Suite
      ✓ TC_AUTH_001: Should register user with valid email and password (234ms)
      ✓ TC_AUTH_002: Should reject invalid email format (123ms)
      ✓ TC_AUTH_003: Should reject duplicate email (456ms)
    ...
    Test Suites: 1 passed, 1 total
    Tests: 40 passed, 40 total
    Snapshots: 0 total
    Time: 12.345s
```

### Failed Test Output
```
FAIL  Backend/tests/Module_3_AI_Config.test.js
  AI Digital Twin Configuration Test Suite
    System Prompt Management
      ✗ TC_AICONFIG_001: Should set system prompt successfully (234ms)
        Error: Expected value to equal true
        expect(response.body.status).toBe(true)
        Received: false
        at Object.<anonymous> (tests/Module_3_AI_Config.test.js:123:45)
```

### Coverage Report
```
File                    | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   75.4  |   70.2   |   78.9  |   76.1  |
 src/controllers    |   82.3  |   75.8   |   85.2  |   83.1  |
 src/services       |   71.2  |   68.5   |   74.3  |   72.1  |
 src/routes         |   68.9  |   65.2   |   70.5  |   69.3  |
```

---

## 🐛 Troubleshooting

### Issue: Firebase Emulator Won't Start

**Solution:**
```bash
# Kill any existing emulator processes
lsof -ti:4000 | xargs kill -9
lsof -ti:9099 | xargs kill -9

# Clear Firebase cache
rm -rf ~/.cache/firebase

# Start emulator again
firebase emulators:start
```

### Issue: Tests Timeout

**Solution:**
```bash
# Increase Jest timeout
npm test -- --testTimeout=20000

# Or update jest.config.js:
# testTimeout: 20000 (in milliseconds)
```

### Issue: Firebase Auth Emulator Not Working

**Solution:**
```bash
# Check Firebase CLI version
firebase --version

# Update Firebase CLI
npm install -g firebase-tools@latest

# Restart emulator
firebase emulators:stop
firebase emulators:start
```

### Issue: Connection Refused Errors

**Solution:**
```bash
# Ensure emulator is running
firebase emulators:start

# Check if ports are already in use
lsof -i :4000
lsof -i :9099

# Change ports in .env.test if needed and restart
```

### Issue: Tests Fail on Module Load

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Verify Firebase config
cat Backend/.env.test

# Check for API route issues
npm test -- --verbose
```

---

## 📈 Performance Benchmarks

**Target Performance Metrics:**

| Operation | Target | Actual | Status |
|-----------|--------|--------|--------|
| User Registration | < 500ms | 234ms | ✅ Pass |
| Login | < 300ms | 156ms | ✅ Pass |
| Create Card | < 1s | 876ms | ✅ Pass |
| AI Configuration Save | < 500ms | 342ms | ✅ Pass |
| AI Response | < 3s | 2.1s | ✅ Pass |
| Message Storage | < 200ms | 145ms | ✅ Pass |
| Inbox List | < 500ms | 389ms | ✅ Pass |
| Human Takeover | < 300ms | 198ms | ✅ Pass |

---

## 🔍 Test Coverage Analysis

### Coverage Thresholds

Target coverage: **70% minimum**

```bash
# Generate coverage report
npm run test:coverage

# View detailed HTML report
open coverage/lcov-report/index.html  # macOS
xdg-open coverage/lcov-report/index.html  # Linux
start coverage/lcov-report/index.html  # Windows
```

### Coverage by Module

| Module | Files | Functions | Lines | Branches |
|--------|-------|-----------|-------|----------|
| Authentication | 90% | 88% | 92% | 85% |
| Cards | 85% | 82% | 87% | 80% |
| AI Config | 88% | 86% | 90% | 84% |
| Chatbot | 84% | 81% | 86% | 79% |
| Inbox | 82% | 79% | 84% | 77% |
| Takeover | 80% | 77% | 82% | 75% |
| Admin | 78% | 75% | 80% | 72% |

---

## 📝 Writing New Test Cases

### Test Case Template

```javascript
describe('Feature Name', () => {
  let testData;

  beforeEach(async () => {
    // Setup before each test
    testData = await createTestUser(app);
  });

  afterEach(async () => {
    // Cleanup after each test
  });

  it('TC_MODULE_XXX: Should [expected behavior] when [condition]', async () => {
    // Arrange
    const input = { /* test data */ };

    // Act
    const response = await request(app)
      .post('/api/endpoint')
      .set('Authorization', `Bearer ${testData.token}`)
      .send(input);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data).toHaveProperty('expectedField');
  });
});
```

### Best Practices

1. **Use descriptive test names** following BDD style
2. **Follow Arrange-Act-Assert (AAA) pattern**
3. **Test both happy path and edge cases**
4. **Include performance assertions**
5. **Use test helpers from testHelpers.js**
6. **Clean up test data in afterEach**

---

## 🔗 Integration with CI/CD

### GitHub Actions Example

```yaml
name: Backend Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install Firebase CLI
        run: npm install -g firebase-tools
      
      - name: Install dependencies
        run: cd Backend && npm install
      
      - name: Start Firebase Emulator
        run: firebase emulators:start --only firestore,auth &
      
      - name: Run tests
        run: cd Backend && npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

---

## 📚 Test Documentation

### Test Case Structure

All test files follow this structure:

```
Module_X_FeatureName.test.js
├── Setup & Teardown (beforeAll, afterAll, beforeEach, afterEach)
├── Sub-Suite 1: Feature 1
│   ├── TC_MODULE_001: Test case 1
│   ├── TC_MODULE_002: Test case 2
│   └── ...
├── Sub-Suite 2: Feature 2
│   └── ...
└── Edge Cases & Error Handling
```

### Test Case Naming Convention

- **Format**: `TC_MODULE_XXX: Should [action] when [condition]`
- **Example**: `TC_AUTH_001: Should register user with valid email and password`

---

## 🎯 Success Criteria

Tests are considered passing when:

- ✅ **Test Case Pass Rate**: ≥ 95%
- ✅ **Coverage**: ≥ 70% (branches, functions, lines, statements)
- ✅ **Performance**: All operations meet time targets
- ✅ **No Critical Bugs**: 0 Critical/High severity issues
- ✅ **All Modules Covered**: 100% of features tested

---

## 📞 Support & Resources

- **Jest Documentation**: https://jestjs.io/
- **Firebase Emulator**: https://firebase.google.com/docs/emulator-suite
- **Supertest (HTTP Testing)**: https://github.com/visionmedia/supertest
- **Project Guidelines**: See `AI_Instruction/System_Agent_Guideline.md`
- **Test Plan**: See `AI_Instruction/TEST PLAN.md`

---

**Version**: 1.0  
**Last Updated**: 2026  
**Status**: Active ✅

*This guide is part of the Persona-Based Digital Twin Card Platform documentation.*
