# Testing Quick Reference

**Fast lookup guide for Testing/fixtures**

---

## 🔍 Test Case Lookup (104 test cases)

### Authentication (40 cases)

```
Registration        → TC_AUTH_001 to TC_AUTH_010 (10 cases)
Login               → TC_AUTH_011 to TC_AUTH_020 (10 cases)
Google OAuth        → TC_AUTH_021 to TC_AUTH_024 (4 cases)
Password Reset      → TC_AUTH_025 to TC_AUTH_030 (6 cases)
Session Mgmt        → TC_AUTH_031 to TC_AUTH_036 (6 cases)
Authorization       → TC_AUTH_037 to TC_AUTH_040 (4 cases)
```

**File**: `Testing/fixtures/auth.fixtures.ts`

### Card/Profile (29 cases)

```
Creation            → TC_CARD_001 to TC_CARD_007 (7 cases)
Editing             → TC_CARD_008 to TC_CARD_013 (6 cases)
Publishing          → TC_CARD_014 to TC_CARD_017 (4 cases)
Preview             → TC_CARD_018 to TC_CARD_019 (2 cases)
Deletion            → TC_CARD_020 to TC_CARD_022 (3 cases)
Slug Mgmt           → TC_CARD_023 to TC_CARD_025 (3 cases)
Sections            → TC_CARD_026 to TC_CARD_029 (4 cases)
```

**File**: `Testing/fixtures/card-profile.fixtures.ts`

### AI Digital Twin (35 cases)

```
Chat Messages       → TC_CHAT_001 to TC_CHAT_012 (12 cases)
Validation          → TC_CHAT_013 to TC_CHAT_018 (6 cases)
History             → TC_CHAT_019 to TC_CHAT_021 (3 cases)
Human Takeover      → TC_CHAT_022 to TC_CHAT_025 (4 cases)
Fallback            → TC_CHAT_026 to TC_CHAT_029 (4 cases)
Accuracy Testing    → TC_CHAT_030 to TC_CHAT_034 (5 cases)
```

**File**: `Testing/fixtures/ai-chat.fixtures.ts`

---

## 📖 How to Use Test Data

### Option 1: JavaScript/TypeScript

```typescript
// Import fixture
import { registrationTestData } from './Testing/fixtures/auth.fixtures';

// Get test case
const testData = registrationTestData.TC_AUTH_001;

// Use in test
const { input, expected } = testData;
expect(response).toBe(expected.success);
```

### Option 2: Jest Unit Test

```javascript
describe('Auth', () => {
  it('TC_AUTH_001: Register success', () => {
    const { input, expected } = registrationTestData.TC_AUTH_001;
    const response = register(input);
    expect(response.statusCode).toBe(expected.statusCode);
  });
});
```

### Option 3: Cypress E2E Test

```typescript
import { validUsers } from '../Testing/fixtures/auth.fixtures';

it('TC_AUTH_011: Login success', () => {
  const user = validUsers.user1;
  cy.login(user.email, user.password);
  cy.url().should('include', '/dashboard');
});
```

### Option 4: Manual Testing

Use test data from fixtures as reference:
- Email: `validUsers.user1.email`
- Password: `validUsers.user1.password`
- Expected: Check `expected` field in test case

---

## 🚀 Common Commands

### Run Tests

```bash
# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend

# Specific module
npm run test:backend -- --testNamePattern="Authentication"

# With coverage
npm run test:backend -- --coverage

# Watch mode
npm run test:backend -- --watch

# Cypress GUI
npm run cypress:open

# Cypress headless
npm run cypress:run

# Lighthouse
npm run test:lighthouse

# Full test suite
npm run test
```

### Check Fixtures

```bash
# View fixture summary
npm run test:fixtures:summary

# Count test cases
npm run test:fixtures:count

# List all auth tests
grep "TC_AUTH" Testing/fixtures/auth.fixtures.ts

# Find test case data
grep -A 20 "TC_CARD_001" Testing/fixtures/card-profile.fixtures.ts
```

---

## 🎯 Test Data Reference

### Valid Users

```typescript
// From auth.fixtures.ts
validUsers.user1         // alice@example.com / SecurePass123!
validUsers.user2         // bob@example.com / BobSecure456!
validUsers.cardOwner     // john.doe@example.com / JohnDoePwd789!
validUsers.admin         // admin@example.com / AdminSecure999!
```

### Valid Cards

```typescript
// From card-profile.fixtures.ts
validCards.card1         // John Doe (published)
validCards.card2         // Jane Smith (draft)
```

### Knowledge Bases

```typescript
// From ai-chat.fixtures.ts
validKnowledgeBases.kb_john   // John's experience (5 years)
validKnowledgeBases.kb_jane   // Jane's PM background
```

---

## 📋 Find Test Case by Description

### "User registers with valid email"
→ `TC_AUTH_001` in `auth.fixtures.ts`

### "Invalid email format"
→ `TC_AUTH_002` in `auth.fixtures.ts`

### "Create card with all fields"
→ `TC_CARD_002` in `card-profile.fixtures.ts`

### "Chat response timeout"
→ `TC_CHAT_011` in `ai-chat.fixtures.ts`

### "AI hallucination detection"
→ `TC_CHAT_016` in `ai-chat.fixtures.ts`

---

## 🔧 Fixture Utilities

```typescript
import fixtures from './Testing/fixtures';

// Get all test data for module
const authData = fixtures.TestFixtures.getModuleTestData('auth');

// Count test cases
const counts = fixtures.TestFixtures.countTotalTestCases();
// Returns: { auth: 40, card: 29, chat: 35, total: 104 }

// Print summary
fixtures.TestFixtures.printSummary();

// Reset fixtures
fixtures.resetAllFixtures();

// Get mock Firestore data
const mockData = fixtures.firestoreMockData;
```

---

## ✅ Test Execution Priority

### Phase 1 (CRITICAL - P0)
- Authentication module (40 cases)
- Command: `npm run test:backend -- --testNamePattern="Authentication"`

### Phase 2 (HIGH - P1)
- Card/Profile (29 cases)
- AI Digital Twin (35 cases)
- Command: `npm run test:backend` && `npm run cypress:run`

### Phase 3 (MEDIUM - P2)
- Performance (Lighthouse)
- Accessibility (WCAG 2.1 AA)
- Command: `npm run test:lighthouse`

---

## 🐛 Quick Debugging

### Find fixture for failing test

```bash
# Get test case ID from error
# Example: "TC_AUTH_001"

# Search fixture
grep -n "TC_AUTH_001" Testing/fixtures/auth.fixtures.ts

# View test data
cat Testing/fixtures/auth.fixtures.ts | grep -A 15 "TC_AUTH_001"
```

### Check expected results

```typescript
// In fixture file, look for:
expected: {
  statusCode: 200,
  success: true,
  // etc.
}
```

### Compare actual vs expected

```
Expected: { statusCode: 200, success: true }
Actual:   { statusCode: 400, success: false }
// Error: Invalid input or bug in code
```

---

## 📊 Test Coverage Summary

```
Module              Cases    File
─────────────────────────────────────────────
Authentication      40       auth.fixtures.ts
Card/Profile        29       card-profile.fixtures.ts
AI Digital Twin     35       ai-chat.fixtures.ts
────────────────────────────────────────────
TOTAL              104       All fixtures
```

**Status**: ✅ 104/104 test cases ready  
**Priority**: Auth (P0) > Card/AI (P1) > Other (P2)

---

## 🎓 Learn More

- **Fixtures guide**: `Testing/fixtures/README.md`
- **Backend testing**: `Testing/Backend/README.md`
- **Frontend testing**: `Testing/Frontend/README.md`
- **Main testing docs**: `Testing/README.md`
- **AI instructions**: `AI_Instruction/TEST PLAN.md`

---

## 💡 Pro Tips

✅ **DO**
- Use fixtures instead of hardcoding test data
- Reference TC_ID in commits: `feat: Add auth (TC_AUTH_001)`
- Check fixture before writing test
- Reset fixtures after each test run

❌ **DON'T**
- Create test data manually
- Modify fixtures during test execution
- Use real user data
- Skip fixture documentation

---

**Last Updated**: 2026  
**Total Test Cases**: 104  
**Status**: Ready ✅
