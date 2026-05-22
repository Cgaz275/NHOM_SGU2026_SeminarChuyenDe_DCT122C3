# Frontend Testing Guide

**Persona-Based Digital Twin Card System - Frontend Test Suite**

---

## 📌 Overview

Frontend testing covers UI components, user flows, responsiveness, accessibility, and performance.

- **E2E Testing**: Cypress 13.x+
- **Component Testing**: Jest + React Testing Library
- **Performance**: Lighthouse
- **Accessibility**: WCAG 2.1 AA
- **Coverage Target**: ≥ 80%

---

## 🎯 Testing Strategy

### 1. Component Tests (Jest + React Testing Library)

Test individual React components in isolation.

**Examples**:
- Button interactions
- Form validation
- State management
- Props handling

### 2. E2E Tests (Cypress)

Test complete user flows from user perspective.

**Examples**:
- User registration flow
- Card creation and publishing
- Chat with AI Digital Twin
- Public profile viewing

### 3. Visual Regression Tests

Verify UI remains consistent across changes.

### 4. Performance Tests (Lighthouse)

Measure page load time, accessibility, SEO.

**Targets**:
- Page load time < 2 seconds
- Lighthouse score ≥ 90
- Mobile-first responsive

### 5. Accessibility Tests

Ensure WCAG 2.1 AA compliance.

**Checks**:
- Color contrast
- Keyboard navigation
- Screen reader support
- ARIA labels

---

## 📊 Test Organization

### Module 1: Authentication UI

**Test Cases**: 20+ (TC_AUTH_UI_001 to TC_AUTH_UI_020)

**Pages**:
- `/login`
- `/register`
- `/forgot-password`

**Test Focus**:
- Form display and validation
- Error messages
- Navigation
- Session handling
- Google OAuth flow

**Example Test**:
```typescript
describe('Registration UI', () => {
  it('TC_AUTH_UI_001: Should register successfully', () => {
    cy.visit('/register');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('SecurePass123!');
    cy.get('[data-testid="register-btn"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

### Module 2: Profile Builder UI

**Test Cases**: 25+ (TC_BUILDER_UI_001+)

**Pages**:
- `/dashboard/cards`
- `/dashboard/cards/new`
- `/dashboard/cards/:id/edit`
- `/dashboard/cards/:id/preview`

**Test Focus**:
- Form fields and validation
- Real-time preview
- Section management
- Draft/publish flow
- Responsive design

---

### Module 3: Public Digital Profile

**Test Cases**: 20+ (TC_PUBLIC_UI_001+)

**Pages**:
- `/:slug` (public profile)
- Public chat widget
- vCard download

**Test Focus**:
- Profile display
- Chat widget interaction
- Save contact
- Mobile responsiveness
- QR code scanning

---

### Module 4: Chat Interface

**Test Cases**: 15+ (TC_CHAT_UI_001+)

**Components**:
- Chat widget
- Message display
- Input field
- Loading states
- Error states

**Test Focus**:
- Message sending/receiving
- Real-time updates
- Typing indicators
- Fallback display
- Mobile chat

---

### Module 5: Admin Panel UI

**Test Cases**: 10+ (TC_ADMIN_UI_001+)

**Pages**:
- `/admin/dashboard`
- `/admin/users`
- `/admin/reports`

**Test Focus**:
- Data display
- Filtering/search
- User management
- Report generation

---

## 🏗️ File Structure

```
Testing/Frontend/
├── cypress/
│   ├── e2e/
│   │   ├── Module_1_Auth_UI.cy.ts
│   │   ├── Module_2_Profile_Builder_UI.cy.ts
│   │   ├── Module_3_Public_Profile_UI.cy.ts
│   │   ├── Module_4_Chat_UI.cy.ts
│   │   ├── Module_5_Admin_UI.cy.ts
│   │   └── User_Journey_Complete.cy.ts
│   │
│   ├── component/
│   │   ├── Button.cy.ts
│   │   ├── Form.cy.ts
│   │   ├── ChatWidget.cy.ts
│   │   └── ProfileCard.cy.ts
│   │
│   ├── support/
│   │   ├── commands.ts (Custom commands)
│   │   └── e2e.ts
│   │
│   ├── fixtures/
│   │   └── data.json
│   │
│   └── cypress.config.ts
│
├── jest/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Form.test.tsx
│   │   └── ChatWidget.test.tsx
│   │
│   └── setup.ts
│
└── README.md
```

---

## 🚀 Running Frontend Tests

### Run Cypress E2E Tests (Interactive)
```bash
npm run cypress:open
```

### Run Cypress Tests (Headless)
```bash
npm run cypress:run
```

### Run Specific Cypress Suite
```bash
npm run cypress:run -- --spec "cypress/e2e/Module_1_Auth_UI.cy.ts"
```

### Run Component Tests (Jest)
```bash
npm run test:components
```

### Run Specific Component Test
```bash
npm run test:components -- Button.test.tsx
```

### Run Lighthouse Tests
```bash
npm run test:lighthouse
```

### Run All Frontend Tests
```bash
npm run test:frontend
```

---

## 🔑 Cypress Best Practices

### Custom Commands

```typescript
// cypress/support/commands.ts

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-btn"]').click();
  cy.url().should('include', '/dashboard');
});

// Create card command
Cypress.Commands.add('createCard', (cardData: CardData) => {
  cy.visit('/dashboard/cards');
  cy.get('[data-testid="new-card-btn"]').click();
  cy.get('[data-testid="name-input"]').type(cardData.name);
  // ... fill other fields
  cy.get('[data-testid="save-btn"]').click();
});

// Usage:
// cy.login('test@example.com', 'Password123!')
// cy.createCard({ name: 'John Doe' })
```

### Test Data Integration

```typescript
import { validUsers } from '../../../Testing/fixtures/auth.fixtures';

describe('Login', () => {
  it('TC_AUTH_UI_001: Should login successfully', () => {
    const user = validUsers.user1;
    cy.login(user.email, user.password);
    cy.get('[data-testid="user-greeting"]').should('contain', user.displayName);
  });
});
```

### Viewport Testing (Mobile-First)

```typescript
describe('Mobile Responsiveness', () => {
  it('should display correctly on iPhone 12', () => {
    cy.viewport('iphone-12');
    cy.visit('/');
    cy.get('[data-testid="nav-menu"]').should('be.visible');
  });

  it('should display correctly on iPad', () => {
    cy.viewport('ipad-2');
    cy.visit('/');
    cy.get('[data-testid="sidebar"]').should('be.visible');
  });

  it('should display correctly on desktop', () => {
    cy.viewport('macbook-13');
    cy.visit('/');
    cy.get('[data-testid="full-layout"]').should('be.visible');
  });
});
```

### Error Handling

```typescript
describe('Error Cases', () => {
  it('TC_AUTH_UI_003: Should show error on invalid email', () => {
    cy.visit('/register');
    cy.get('[data-testid="email-input"]').type('invalid.email');
    cy.get('[data-testid="register-btn"]').click();
    cy.get('[data-testid="email-error"]').should('contain', 'Invalid email');
  });
});
```

---

## 🧪 React Component Testing

### Example Component Test

```typescript
// Frontend/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 📊 Performance Testing (Lighthouse)

### Configure Lighthouse

```typescript
// lighthouse.config.ts
export const lighthouseConfig = {
  extends: 'lighthouse:recommended',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    onlyAudits: [
      'first-contentful-paint',
      'largest-contentful-paint',
      'cumulative-layout-shift',
    ],
  },
};
```

### Run Lighthouse Audit

```bash
npm run lighthouse -- --url=http://localhost:3000/
```

### Expected Results

| Metric | Target | Status |
|--------|--------|--------|
| Performance | ≥ 90 | ✅ |
| Accessibility | ≥ 90 | ✅ |
| Best Practices | ≥ 90 | ✅ |
| SEO | ≥ 90 | ✅ |
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |

---

## ♿ Accessibility Testing

### Manual Accessibility Checks

```typescript
describe('Accessibility', () => {
  it('should have proper ARIA labels', () => {
    cy.visit('/');
    cy.get('button').should('have.attr', 'aria-label');
    cy.get('[role="navigation"]').should('exist');
  });

  it('should be keyboard navigable', () => {
    cy.visit('/');
    cy.get('body').tab();
    cy.focused().should('have.attr', 'href');
  });

  it('should have sufficient color contrast', () => {
    // Use axe-core for automated testing
    cy.injectAxe();
    cy.checkA11y();
  });
});
```

### WCAG 2.1 AA Checklist

- [ ] Color contrast ≥ 4.5:1
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (ARIA)
- [ ] Focus indicators visible
- [ ] Form labels present
- [ ] Page title descriptive
- [ ] Heading hierarchy correct

---

## 🔄 Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/frontend-tests.yml
name: Frontend Tests

on: [push, pull_request]

jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: cypress-io/github-action@v5
        with:
          start: npm run dev
          spec: cypress/e2e/**/*.cy.ts
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

---

## ✅ Test Checklist

### Before Deploying

- [ ] All E2E tests pass
- [ ] Component tests pass
- [ ] Lighthouse score ≥ 90
- [ ] Accessibility tests pass
- [ ] Mobile responsive verified
- [ ] No console errors
- [ ] Performance metrics acceptable

### Test Report

```
Frontend Tests Summary:

E2E Tests:
  ✅ Module 1: Auth UI (20/20 passed)
  ✅ Module 2: Profile Builder (25/25 passed)
  ✅ Module 3: Public Profile (20/20 passed)
  ✅ Module 4: Chat UI (15/15 passed)
  ✅ Module 5: Admin UI (10/10 passed)

Component Tests:
  ✅ Pass Rate: 95%
  ✅ Coverage: 88%

Performance:
  ✅ Lighthouse Score: 94
  ✅ Page Load: 1.8s

Accessibility:
  ✅ WCAG 2.1 AA Compliant
  ✅ Axe Violations: 0

Total: 125/128 tests passed (97%)
```

---

## 📚 References

- [TEST PLAN.md](../../AI_Instruction/TEST PLAN.md)
- [frontend_test_guideline.md](../../AI_Instruction/Testing/frontend_test_guideline.md)
- [test_cases_guideline.md](../../AI_Instruction/Testing/test_cases_guideline.md)
- [Cypress Documentation](https://docs.cypress.io/)
- [React Testing Library](https://testing-library.com/react)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2026  
**Status**: Active ✅
