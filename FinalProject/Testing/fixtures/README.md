# Testing Fixtures - Persona-Based Digital Twin Card

## 📌 Overview

**Testing/fixtures/** contains all standardized test data used across the testing suite.

- **Purpose**: Provide consistent, reusable test data for unit tests, integration tests, and E2E tests
- **Scope**: All modules - Authentication, Cards, AI Digital Twin, etc.
- **Status**: Active ✅
- **Last Updated**: 2026

## 📁 File Structure

```
Testing/fixtures/
├── auth.fixtures.ts              # Authentication test data (40+ test cases)
├── card-profile.fixtures.ts       # Card/Profile management (29+ test cases)
├── ai-chat.fixtures.ts            # AI Digital Twin chatbot (35+ test cases)
├── index.ts                        # Central index & exports
└── README.md                       # This file
```

## 🎯 Test Data Coverage

### Module 1: Authentication (40+ test cases)

**File**: `auth.fixtures.ts`

**Test Data Categories**:

| Category | Test Cases | Coverage |
|----------|-----------|----------|
| Registration | TC_AUTH_001 - TC_AUTH_010 | Valid/invalid emails, passwords, edge cases |
| Login | TC_AUTH_011 - TC_AUTH_020 | Happy path, wrong password, brute force, timeout |
| Google OAuth | TC_AUTH_021 - TC_AUTH_024 | OAuth login, new user creation, token errors |
| Password Reset | TC_AUTH_025 - TC_AUTH_030 | Reset request, token validation, expired tokens |
| Session Management | TC_AUTH_031 - TC_AUTH_036 | Token validity, refresh, logout, expiration |
| Authorization | TC_AUTH_037 - TC_AUTH_040 | Role-based access control, protected routes |

**Test Users**:
```typescript
validUsers.user1          // Regular user (alice@example.com)
validUsers.user2          // Regular user (bob@example.com)
validUsers.cardOwner      // Card owner (john.doe@example.com)
validUsers.admin          // Admin user (admin@example.com)
```

**Invalid Data Sets**:
```typescript
invalidUsers.noEmail
invalidUsers.weakPassword
invalidUsers.sqlInjection
invalidUsers.xssAttempt
// ... and more
```

### Module 2: Card/Profile Management (29+ test cases)

**File**: `card-profile.fixtures.ts`

**Test Data Categories**:

| Category | Test Cases | Coverage |
|----------|-----------|----------|
| Card Creation | TC_CARD_001 - TC_CARD_007 | Valid data, required fields, edge cases |
| Card Editing | TC_CARD_008 - TC_CARD_013 | Update personal info, add sections, performance |
| Card Publishing | TC_CARD_014 - TC_CARD_017 | Publish/unpublish, slug validation, completeness |
| Card Preview | TC_CARD_018 - TC_CARD_019 | Draft/published preview rendering |
| Card Deletion | TC_CARD_020 - TC_CARD_022 | Delete draft, published card restrictions |
| Slug Management | TC_CARD_023 - TC_CARD_025 | Auto-generate, custom slug, validation |
| Section Management | TC_CARD_026 - TC_CARD_029 | Add/edit/delete experience, reorder sections |

**Test Cards**:
```typescript
validCards.card1          // Full John Doe card (published)
validCards.card2          // Jane Smith card (draft)
```

**Helpers**:
```typescript
createTestCard(userId)    // Create test card template
getTestCard(cardId)       // Retrieve test card
```

### Module 3: AI Digital Twin / Chatbot (35+ test cases)

**File**: `ai-chat.fixtures.ts`

**Test Data Categories**:

| Category | Test Cases | Coverage |
|----------|-----------|----------|
| Chat Messages | TC_CHAT_001 - TC_CHAT_012 | Normal questions, out-of-scope, security, timeout |
| Response Validation | TC_CHAT_013 - TC_CHAT_018 | Accuracy, hallucination, guardrails, privacy |
| Conversation History | TC_CHAT_019 - TC_CHAT_021 | Retrieve, save, authorization |
| Human Takeover | TC_CHAT_022 - TC_CHAT_025 | Initiate, respond, return to AI |
| Fallback Mechanism | TC_CHAT_026 - TC_CHAT_029 | Display form, submit, timeout, error handling |
| Accuracy Testing | TC_CHAT_030 - TC_CHAT_034 | Fact verification, context, negation (≥90% accuracy) |

**Knowledge Bases**:
```typescript
validKnowledgeBases.kb_john   // John Doe KB with 5 years experience
validKnowledgeBases.kb_jane   // Jane Smith KB with PM background
```

**Key Metrics**:
- Response Time: ≤ 3 seconds (target)
- Accuracy: ≥ 90%
- Hallucination: Minimize
- Guardrails: Enforce all

## 🚀 Usage Examples

### Example 1: Jest Unit Test

```typescript
// Backend/tests/auth.test.ts
import fixtures from '../Testing/fixtures';

describe('Authentication', () => {
  it('should register user successfully', async () => {
    const testData = fixtures.auth.registrationTestData.TC_AUTH_001;
    
    const response = await registerUser(testData.input);
    
    expect(response.success).toBe(testData.expected.success);
    expect(response.statusCode).toBe(testData.expected.statusCode);
  });

  it('should validate email format', async () => {
    const testData = fixtures.auth.registrationTestData.TC_AUTH_002;
    
    const response = await registerUser(testData.input);
    
    expect(response.success).toBe(false);
    expect(response.errorField).toBe(testData.expected.errorField);
  });
});
```

### Example 2: Cypress E2E Test

```typescript
// Frontend/cypress/e2e/auth.cy.ts
import { validUsers } from '../../../Testing/fixtures/auth.fixtures';

describe('User Registration Flow', () => {
  it('should register new user', () => {
    const user = validUsers.user1;
    
    cy.visit('/register');
    cy.get('[data-testid="email-input"]').type(user.email);
    cy.get('[data-testid="password-input"]').type(user.password);
    cy.get('[data-testid="register-btn"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

### Example 3: Postman API Test

```javascript
// Use in Postman Pre-request Script
const fixtures = JSON.parse(pm.globals.get('fixtures'));
const testUser = fixtures.auth.validUsers.user1;

pm.request.url.query.add('email', testUser.email);
pm.request.url.query.add('password', testUser.password);
```

### Example 4: Manual Testing

```
Login Test:
  Email:    alice@example.com (from validUsers.user1)
  Password: SecurePass123!
  Expected: Redirect to /dashboard
  
Card Creation Test:
  Use testData from cardCreationTestData.TC_CARD_001
  Verify all fields are required
```

## 📊 Test Case Mapping

### How Test Data Maps to Test Cases

Each fixture test case (e.g., `TC_AUTH_001`) corresponds to an actual Test Case (e.g., `test_cases_guideline.md TC_AUTH_001`):

```
Fixture File              Test Case ID      Test Case Description
──────────────────────────────────────────────────────────────
registrationTestData      TC_AUTH_001       Register with valid email/password
TC_AUTH_002              Invalid email format
TC_AUTH_003              Email already exists
...                      ...

cardCreationTestData      TC_CARD_001       Create card with required fields
TC_CARD_002              Create card with all fields
TC_CARD_003              Missing required fields
...                      ...

chatMessageTestData       TC_CHAT_001       Normal question within KB
TC_CHAT_002              Specific experience question
TC_CHAT_003              Question outside KB
...                      ...
```

## 🔄 Fixture Lifecycle

### Before Tests
1. Load fixtures from `Testing/fixtures/`
2. Initialize test database with mock data
3. Configure API endpoints (local/staging)
4. Reset fixtures to clean state

### During Tests
1. Use test data from appropriate fixture
2. Compare actual vs expected results
3. Log failures with fixture reference
4. Track test execution

### After Tests
1. Clean up test data
2. Reset fixtures for next run
3. Generate test report
4. Archive logs

## 🛠️ Fixture Utilities

### TestFixtures Class

```typescript
import { TestFixtures } from '../Testing/fixtures';

// Get all test data for a module
const authData = TestFixtures.getModuleTestData('auth');

// Count test cases
const counts = TestFixtures.countTotalTestCases();
// Returns: { auth: 40, card: 29, chat: 35, total: 104 }

// Print summary
TestFixtures.printSummary();
```

### Helper Functions

```typescript
// Get test user
const user = getTestUser('user1');

// Create random test user
const randomUser = createRandomTestUser();

// Get test case data
const testData = getTestCaseData('registration', 'TC_AUTH_001');

// Reset all fixtures
resetAllFixtures();
```

## 📋 Best Practices

### DO ✅

- Use fixtures instead of creating test data manually
- Reference test case IDs when logging results
- Keep fixtures in sync with requirements (PRD, GUI Design)
- Use provided helper functions
- Reset fixtures after each test run
- Document any new fixture additions

### DON'T ❌

- Hardcode test data in test files
- Modify fixture files during test execution
- Use real user data in fixtures
- Create duplicate test cases
- Use stale fixture data without verification

## 📈 Fixture Maintenance

### Adding New Test Cases

When adding new test cases from TEST PLAN.md:

1. **Identify module**: Authentication, Card, AI Chat, etc.
2. **Create test case data** in appropriate fixture file
3. **Follow naming convention**: `TC_MODULE_NNN`
4. **Include all required fields**:
   - input (test data)
   - expected (expected results)
   - validation criteria
5. **Add to index.ts** exports
6. **Document in this README**

### Example Addition

```typescript
// In ai-chat.fixtures.ts
TC_CHAT_035: {
  // Your new test case
  input: { ... },
  expected: { ... },
}

// Then export in index.ts
export * from './ai-chat.fixtures';
```

### Updating Fixtures

When requirements change:
1. Update fixture test data
2. Update expected results
3. Update this README
4. Commit with reference to PRD/GUI Design changes

## 🔍 Fixture Validation

### Total Test Cases

```
Authentication:          40 test cases
Card/Profile:           29 test cases
AI Digital Twin:        35 test cases
─────────────────────────────────
TOTAL:                 104 test cases
```

**Coverage by Priority**:
- Critical (P0): Authentication
- High (P1): Card/Profile, AI Digital Twin
- Medium (P2): Other modules

## 📚 References

- [test_cases_guideline.md](../../AI_Instruction/Testing/test_cases_guideline.md)
- [TEST PLAN.md](../../AI_Instruction/TEST PLAN.md)
- [test_suite_guideline.md](../../AI_Instruction/Testing/test_suite_guideline.md)
- [System_Agent_Guideline.md](../../AI_Instruction/System_Agent_Guideline.md)

## 📞 Support

For questions about fixtures:
- Check this README first
- Review example usage sections
- Refer to individual fixture files
- Contact QA team for new fixture requirements

---

**Version**: 1.0  
**Status**: Active ✅  
**Last Updated**: 2026

*Fixtures are Single Source of Truth for all test data.*
