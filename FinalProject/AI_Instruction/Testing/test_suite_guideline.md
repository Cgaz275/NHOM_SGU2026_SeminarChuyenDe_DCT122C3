# Test Suite Guideline

**Hướng dẫn tổ chức Test Suite cho Persona-Based Digital Twin Card System**

---

## 📌 Mục Đích

Tài liệu này định nghĩa cách tổ chức, quản lý, và thực thi Test Suites để:
- Tập hợp các test cases liên quan một cách logic
- Đảm bảo comprehensive coverage
- Tối ưu hóa thời gian thực thi test
- Quản lý dependencies giữa các test cases
- Dễ dàng track progress và report kết quả

---

## 🎯 Định Nghĩa Test Suite

**Test Suite** là một bộ sưu tập các test cases liên quan, được tổ chức để kiểm thử một module, feature, hay user journey cụ thể.

**Test Suite = Tập hợp Test Cases + Configuration + Setup/Teardown**

---

## 📊 Test Suite Structure

### Hierarchical Organization

```
All Tests (Master Suite)
│
├── Backend Test Suites
│   ├── Module 1: Authentication Suite
│   │   ├── Registration Test Suite
│   │   ├── Login Test Suite
│   │   └── Session Management Suite
│   │
│   ├── Module 2: Card Management Suite
│   │   ├── Create Card Suite
│   │   ├── Edit Card Suite
│   │   └── Publish Card Suite
│   │
│   └── ... (More modules)
│
├── Frontend Test Suites
│   ├── Module 1: Auth UI Suite
│   ├── Module 2: Profile Builder UI Suite
│   └── ... (More modules)
│
├── Integration Test Suites
│   ├── Auth Flow Integration
│   ├── Card Creation End-to-End
│   └── Chat Flow Integration
│
└── Performance & Accessibility Suites
    ├── Lighthouse Suite
    └── WCAG Compliance Suite
```

---

## 🛠️ Test Suite Components

### 1. Suite Configuration

```typescript
// Example: Authentication Test Suite Configuration
export const AuthTestSuite = {
  name: "Authentication & Authorization Tests",
  description: "Comprehensive suite for user authentication flows",
  
  modules: {
    registration: {
      name: "User Registration",
      priority: "Critical",
      testCases: ["TC_AUTH_001", "TC_AUTH_002", "TC_AUTH_003"]
    },
    login: {
      name: "User Login",
      priority: "Critical",
      testCases: ["TC_AUTH_004", "TC_AUTH_005", "TC_AUTH_006"]
    },
    passwordReset: {
      name: "Password Reset",
      priority: "High",
      testCases: ["TC_AUTH_007", "TC_AUTH_008"]
    }
  },
  
  setup: {
    database: "Firebase Emulator",
    timeout: 10000,
    parallel: false
  },
  
  expectedResults: {
    passRate: 0.95,
    coverage: 0.90,
    performanceTarget: 500
  }
};
```

### 2. Setup & Teardown

```typescript
// setup.ts - Run before suite
beforeAll(async () => {
  // Initialize Firebase Emulator
  await startFirebaseEmulator();
  
  // Create test database
  await initializeTestDatabase();
  
  // Create test users
  await createTestUsers();
  
  // Configure API endpoints
  process.env.API_URL = 'http://localhost:3001';
});

// teardown.ts - Run after suite
afterAll(async () => {
  // Clean up test data
  await clearTestDatabase();
  
  // Stop emulators
  await stopFirebaseEmulator();
  
  // Close connections
  await closeConnections();
});
```

### 3. Test Case Dependencies

```typescript
// Define test case execution order
const authSuiteDependencies = {
  "TC_AUTH_001": {
    name: "User Registration",
    dependsOn: [],  // No dependencies
    blockedBy: []
  },
  "TC_AUTH_004": {
    name: "User Login",
    dependsOn: ["TC_AUTH_001"],  // Must register first
    blockedBy: []
  },
  "TC_AUTH_007": {
    name: "Password Reset",
    dependsOn: ["TC_AUTH_001"],  // Must have user
    blockedBy: []
  }
};
```

---

## 📋 Backend Test Suites

### Module 1: Authentication Test Suite

```typescript
// Backend/tests/Module_1_Auth.test.js

describe('Authentication & Authorization Test Suite', () => {
  
  describe('Registration Sub-Suite', () => {
    // TC_AUTH_001 to TC_AUTH_003
    it('TC_AUTH_001: Should register user with valid credentials', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_002: Should fail registration with invalid email', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_003: Should fail if email already exists', async () => {
      // Test implementation
    });
  });
  
  describe('Login Sub-Suite', () => {
    // TC_AUTH_004 to TC_AUTH_006
    it('TC_AUTH_004: Should login successfully with valid credentials', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_005: Should fail login with wrong password', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_006: Should return JWT token after login', async () => {
      // Test implementation
    });
  });
  
  describe('Session Management Sub-Suite', () => {
    // TC_AUTH_007 to TC_AUTH_010
    it('TC_AUTH_007: Should handle token expiration', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_008: Should refresh token successfully', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_009: Should logout and invalidate token', async () => {
      // Test implementation
    });
    
    it('TC_AUTH_010: Should verify JWT token validity', async () => {
      // Test implementation
    });
  });
});
```

### Module 2: Card Management Test Suite

```typescript
// Backend/tests/Module_2_Card_Profile.test.js

describe('Card Management Test Suite', () => {
  let testUser;
  
  beforeEach(async () => {
    // Create test user
    testUser = await createTestUser();
  });
  
  describe('Create Card Sub-Suite', () => {
    it('TC_CARD_001: Should create card with valid data', async () => {
      // Test
    });
    
    it('TC_CARD_002: Should validate required fields', async () => {
      // Test
    });
    
    it('TC_CARD_003: Should generate unique slug', async () => {
      // Test
    });
  });
  
  describe('Update Card Sub-Suite', () => {
    beforeEach(async () => {
      // Create test card first
      const card = await createTestCard(testUser.id);
    });
    
    it('TC_CARD_004: Should update card information', async () => {
      // Test
    });
    
    it('TC_CARD_005: Should add section to card', async () => {
      // Test
    });
  });
  
  describe('Publish Card Sub-Suite', () => {
    it('TC_CARD_006: Should publish card successfully', async () => {
      // Test
    });
    
    it('TC_CARD_007: Should make card publicly accessible', async () => {
      // Test
    });
    
    it('TC_CARD_008: Should unpublish card', async () => {
      // Test
    });
  });
});
```

### Other Backend Suites

```
Module 3: AI Configuration Test Suite
Module 4: Chatbot & AI Response Test Suite
Module 5: Inbox & Fallback Test Suite
Module 6: Human Takeover Test Suite
Module 7: Admin Panel Test Suite
```

---

## 📋 Frontend Test Suites (Cypress)

### Module 1: Authentication UI Test Suite

```typescript
// Frontend/cypress/e2e/Module_1_Auth.cy.ts

describe('Authentication UI Test Suite', () => {
  
  describe('Registration UI Sub-Suite', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
    
    it('TC_AUTH_UI_001: Should display registration form', () => {
      cy.get('[data-testid="register-form"]').should('be.visible');
      cy.get('[data-testid="email-input"]').should('exist');
      cy.get('[data-testid="password-input"]').should('exist');
    });
    
    it('TC_AUTH_UI_002: Should register user successfully', () => {
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePass123!');
      cy.get('[data-testid="register-btn"]').click();
      cy.url().should('include', '/dashboard');
    });
    
    it('TC_AUTH_UI_003: Should show validation errors', () => {
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="password-input"]').type('weak');
      cy.get('[data-testid="register-btn"]').click();
      cy.get('[data-testid="email-error"]').should('be.visible');
    });
  });
  
  describe('Login UI Sub-Suite', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
    
    it('TC_AUTH_UI_004: Should display login form', () => {
      cy.get('[data-testid="login-form"]').should('be.visible');
    });
    
    it('TC_AUTH_UI_005: Should login successfully', () => {
      cy.login('test@example.com', 'TestPassword123!');
      cy.url().should('include', '/dashboard');
    });
  });
});
```

### Module 8: Public Profile Test Suite

```typescript
// Frontend/cypress/e2e/Public_Profile.cy.ts

describe('Public Profile Test Suite', () => {
  
  describe('Profile Display Sub-Suite', () => {
    beforeEach(() => {
      cy.visit('/john-doe');  // Test profile slug
    });
    
    it('TC_PUBLIC_001: Should display profile information', () => {
      cy.get('[data-testid="profile-name"]').should('contain', 'John Doe');
      cy.get('[data-testid="profile-bio"]').should('be.visible');
      cy.get('[data-testid="profile-avatar"]').should('have.attr', 'src');
    });
    
    it('TC_PUBLIC_002: Should display all sections', () => {
      cy.get('[data-testid="experience-section"]').should('be.visible');
      cy.get('[data-testid="skills-section"]').should('be.visible');
      cy.get('[data-testid="projects-section"]').should('be.visible');
    });
  });
  
  describe('Chat Widget Sub-Suite', () => {
    it('TC_PUBLIC_003: Should open chat widget', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').should('be.visible');
    });
    
    it('TC_PUBLIC_004: Should send message to AI', () => {
      cy.get('[data-testid="chat-widget"]').click();
      cy.get('[data-testid="chat-input"]').type('What do you do?');
      cy.get('[data-testid="send-btn"]').click();
      cy.get('[data-testid="user-message"]').should('be.visible');
    });
  });
  
  describe('Responsive Design Sub-Suite', () => {
    it('TC_PUBLIC_005: Should be responsive on mobile', () => {
      cy.viewport('iphone-12');
      cy.visit('/john-doe');
      cy.get('[data-testid="profile-container"]').should('be.visible');
    });
    
    it('TC_PUBLIC_006: Should be responsive on tablet', () => {
      cy.viewport('ipad-2');
      cy.visit('/john-doe');
      cy.get('[data-testid="profile-container"]').should('be.visible');
    });
  });
});
```

---

## 🔗 Integration Test Suites

### End-to-End User Journey Suite

```typescript
// Frontend/cypress/e2e/User_Journey_Complete.cy.ts

describe('Complete User Journey Integration Suite', () => {
  
  describe('Card Owner Journey', () => {
    it('E2E_001: Should complete full card creation journey', () => {
      // 1. Register
      cy.visit('/register');
      cy.get('[data-testid="email-input"]').type('owner@example.com');
      cy.get('[data-testid="password-input"]').type('SecurePass123!');
      cy.get('[data-testid="register-btn"]').click();
      
      // 2. Create Card
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="new-card-btn"]').click();
      cy.get('[data-testid="name-input"]').type('John Doe');
      cy.get('[data-testid="bio-input"]').type('Full-stack developer');
      
      // 3. Configure AI
      cy.visit('/dashboard/ai-config');
      cy.get('[data-testid="prompt-input"]').type('You are John, a developer');
      
      // 4. Publish Card
      cy.visit('/dashboard/cards');
      cy.get('[data-testid="publish-btn"]').click();
      
      // 5. Verify Public Profile
      cy.visit('/john-doe');
      cy.get('[data-testid="profile-name"]').should('contain', 'John Doe');
    });
  });
  
  describe('Visitor Journey', () => {
    it('E2E_002: Should complete visitor chat journey', () => {
      // 1. Visit public profile
      cy.visit('/john-doe');
      
      // 2. Open chat
      cy.get('[data-testid="chat-widget"]').click();
      
      // 3. Send message
      cy.get('[data-testid="chat-input"]').type('What do you offer?');
      cy.get('[data-testid="send-btn"]').click();
      
      // 4. Receive AI response
      cy.get('[data-testid="ai-message"]', { timeout: 5000 }).should('be.visible');
      
      // 5. Save contact
      cy.get('[data-testid="save-contact-btn"]').click();
      cy.get('[data-testid="success-message"]').should('contain', 'Downloaded');
    });
  });
});
```

---

## 📊 Test Suite Execution Plan

### Execution Order

**Phase 1: Unit Tests (Backend - ~15 minutes)**
```
1. Module 1: Authentication (5 tests)
2. Module 2: Card Management (8 tests)
3. Module 3: AI Configuration (6 tests)
4. Module 4: Chatbot (8 tests)
5. Module 5: Inbox (6 tests)
6. Module 6: Human Takeover (4 tests)
7. Module 7: Admin Panel (6 tests)

Total: 43 tests
```

**Phase 2: Component Tests (Frontend - ~10 minutes)**
```
1. Auth components (4 tests)
2. Profile Builder components (6 tests)
3. Chat Widget components (4 tests)
4. UI components (5 tests)

Total: 19 tests
```

**Phase 3: E2E Tests (Cypress - ~20 minutes)**
```
1. Module 1: Auth UI Suite (5 tests)
2. Module 2: Profile Builder Suite (6 tests)
3. Module 4: Chat UI Suite (4 tests)
4. Integration Journey Suites (3 tests)
5. Public Profile Suite (5 tests)

Total: 23 tests
```

**Phase 4: Performance Tests (Lighthouse - ~5 minutes)**
```
1. Landing page audit
2. Public profile audit
3. Dashboard audit

Total: 3 audits
```

**Phase 5: API Tests (Postman - ~10 minutes)**
```
1. Authentication endpoints (5 requests)
2. Card endpoints (6 requests)
3. AI endpoints (4 requests)
4. Admin endpoints (4 requests)

Total: 19 requests
```

**Total Execution Time: ~60 minutes**

---

## ✅ Test Suite Execution Checklist

Before running test suites:

- [ ] All environment variables configured
- [ ] Test database initialized
- [ ] Firebase Emulator started
- [ ] Backend server running (port 3001)
- [ ] Frontend dev server running (port 3000)
- [ ] Test accounts created
- [ ] No console warnings/errors
- [ ] Network connectivity stable

During execution:

- [ ] Monitor test progress
- [ ] Document any failures
- [ ] Capture screenshots of failures
- [ ] Note performance metrics
- [ ] Track execution time

After execution:

- [ ] Generate test report
- [ ] Update test results
- [ ] Create bug reports for failures
- [ ] Calculate coverage metrics
- [ ] Archive logs and artifacts

---

## 📊 Test Suite Reporting

### Summary Report Template

```markdown
## Test Suite Execution Report

**Suite Name:** Authentication & Authorization Test Suite
**Execution Date:** 2026-01-15
**Duration:** 5 minutes 30 seconds
**Executed By:** QA Team

### Overall Results
- **Total Test Cases:** 10
- **Passed:** 9 (90%)
- **Failed:** 1 (10%)
- **Blocked:** 0 (0%)
- **Skipped:** 0 (0%)

### Breakdown by Sub-Suite
| Sub-Suite | Total | Pass | Fail | Coverage |
|-----------|-------|------|------|----------|
| Registration | 3 | 3 | 0 | 100% |
| Login | 3 | 2 | 1 | 67% |
| Session Management | 4 | 4 | 0 | 100% |

### Failed Test Cases
| TC ID | Title | Error | Bug ID |
|-------|-------|-------|--------|
| TC_AUTH_005 | Should fail login with wrong password | Email field accepts invalid format | BUG_001 |

### Performance Metrics
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Registration | < 500ms | 380ms | ✅ Pass |
| Login | < 300ms | 450ms | ⚠️ Warning |
| Token Validation | < 100ms | 85ms | ✅ Pass |

### Code Coverage
- Lines: 92%
- Functions: 90%
- Branches: 85%

### Recommendations
1. Investigate login performance (450ms > 300ms target)
2. Fix email validation in login endpoint
3. Add more edge case tests for session management

### Next Steps
1. Fix BUG_001 in backend
2. Re-run failed test case
3. Execute Phase 2 (Component tests)
```

---

## 🔄 Test Suite Management

### Continuous Integration Integration

```yaml
# .github/workflows/test.yml
name: Run Test Suites

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run Backend Tests
        run: npm run test:backend
      
      - name: Run Frontend Component Tests
        run: npm run test:components
      
      - name: Run E2E Tests
        run: npm run test:e2e
      
      - name: Run Lighthouse
        run: npm run test:lighthouse
      
      - name: Generate Report
        run: npm run test:report
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v2
```

### Local Execution Commands

```bash
# Run all tests
npm test

# Run specific module suite
npm run test:backend -- --testNamePattern="Authentication"

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific suite file
npm test tests/Module_1_Auth.test.js

# Run E2E tests
npm run cypress:run

# Run E2E with GUI
npm run cypress:open

# Run Lighthouse
npm run lighthouse

# Run API tests
postman run collections/API_Tests.json
```

---

## 📈 Metrics & KPIs

| Metric | Target | Acceptable |
|--------|--------|-----------|
| **Suite Pass Rate** | ≥ 95% | ≥ 90% |
| **Test Execution Time** | < 60 min | < 90 min |
| **Code Coverage** | ≥ 85% | ≥ 70% |
| **Bug Detection Rate** | High | Medium |
| **Regression** | 0% | < 5% |
| **Lighthouse Score** | ≥ 90 | ≥ 80 |

---

## 📚 References

- [TEST PLAN.md](../TEST%20PLAN.md)
- [test_cases_guideline.md](./test_cases_guideline.md)
- [backend_test_guideline.md](./backend_test_guideline.md)
- [frontend_test_guideline.md](./frontend_test_guideline.md)
- [test_result_guideline.md](./test_result_guideline.md)
- [Cypress Documentation](https://docs.cypress.io/)
- [Jest Documentation](https://jestjs.io/)

---

**Last Updated:** 2026  
**Version:** 1.0  
**Status:** Active ✅
