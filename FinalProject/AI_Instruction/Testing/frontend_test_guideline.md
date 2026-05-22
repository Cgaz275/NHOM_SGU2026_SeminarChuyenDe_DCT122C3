# Frontend Testing Guideline

**Hướng dẫn kiểm thử Frontend cho Persona-Based Digital Twin Card System**

---

## 📌 Mục Đích

Tài liệu này cung cấp hướng dẫn chi tiết cho QA/Testing Agent thực hiện kiểm thử Frontend sử dụng:
- **Cypress** cho E2E Testing
- **Jest + React Testing Library** cho Component & Unit Tests
- **Lighthouse** cho Performance & Accessibility Testing

---

## 🎯 Phạm Vi Frontend Testing

### Modules Cần Kiểm Thử

| # | Module | File Test | Focus Areas | Ưu Tiên |
|---|--------|-----------|-------------|---------|
| 1 | Authentication UI | `Module_1_Auth.cy.js` | Login, Register, Password Reset | **Very High** |
| 2 | Profile Builder | `Module_2_Card_Profile.cy.js` | Create, Edit, Preview, Publish Card | **Very High** |
| 3 | AI Twin Configuration UI | `Module_3_AI_Config.cy.js` | Set Prompt, Knowledge Base, Settings | **Very High** |
| 4 | Chat & AI Interaction | `Module_4_Chatbot_AI.cy.js` | Real-time Chat, AI Responses | **Very High** |
| 5 | Inbox & Conversations | `Module_5_Fallback_Inbox.cy.js` | View Messages, Human Takeover | **High** |
| 6 | Human Takeover UI | `Module_6_Human_Takeover.cy.js` | Takeover Flow, Message Handling | **High** |
| 7 | Admin Panel | `Module_7_Admin_Panel.cy.js` | User Management, Reports | **High** |
| 8 | Public Profile | `Public_Profile.cy.js` | Display, Responsiveness, Share | **Very High** |
| 9 | Landing Page | `Landing_Page.cy.js` | Demo, Navigation, UX | **Medium** |

---

## 🛠️ Công Cụ & Công Nghệ

### Cypress Configuration

```typescript
// Frontend/cypress.config.ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    setupNodeEvents(on, config) {
      // cypress plugins
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
```

### Jest Component Testing Config

```javascript
// Frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/pages/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
```

### Environment Variables (.env.test)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=digital-twin-test
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ENVIRONMENT=test
```

---

## 📋 Test Case Structure

### Cypress E2E Test Template

```typescript
// Frontend/cypress/e2e/Module_Name.cy.ts
describe('Module Name', () => {
  beforeEach(() => {
    // Login with test account
    cy.login('test@mail.com', 'TestPassword123!');
    // Navigate to module
    cy.visit('/dashboard/module');
  });

  describe('Feature: [Feature Name]', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange - prepare test data
      cy.fixture('testData.json').then(data => {
        // Act - perform user actions
        cy.get('[data-testid="input-field"]').type(data.inputValue);
        cy.get('[data-testid="submit-btn"]').click();

        // Assert - verify results
        cy.get('[data-testid="success-message"]').should('be.visible');
      });
    });
  });
});
```

### Component Test Template

```typescript
// Frontend/__tests__/components/Component.test.tsx
import { render, screen, userEvent } from '@testing-library/react';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    const button = screen.getByRole('button', { name: /click/i });
    await user.click(button);
    
    expect(screen.getByText('Result')).toBeInTheDocument();
  });
});
```

---

## 🧪 Testing Strategy by Module

### Module 1: Authentication UI

**Test Scenarios:**

1. **Registration Flow**
   - ✅ Fill registration form correctly
   - ✅ Show error for invalid email
   - ✅ Show error for weak password
   - ✅ Show error if email already exists
   - ✅ Redirect to dashboard after successful registration
   - ✅ Google OAuth button visible and clickable

2. **Login Flow**
   - ✅ Fill login form and submit
   - ✅ Show error for wrong credentials
   - ✅ Show error for non-existent email
   - ✅ Redirect to dashboard after login
   - ✅ Remember me functionality
   - ✅ Forgot password link

3. **Password Reset**
   - ✅ Request password reset
   - ✅ Validate email
   - ✅ Reset token handling
   - ✅ New password validation
   - ✅ Success message

4. **UI/UX Checks**
   - ✅ Form validation messages display correctly
   - ✅ Loading state during submission
   - ✅ Responsive on mobile viewport
   - ✅ Accessible form labels and inputs
   - ✅ Password visibility toggle

**Performance Targets:**
- Page load: < 2s
- Form submission: < 1s
- Redirect: Immediate

---

### Module 2: Profile Builder & Card Editor

**Test Scenarios:**

1. **Create Card Flow**
   - ✅ Card form loads correctly
   - ✅ Fill basic info (name, email, phone)
   - ✅ Upload avatar image
   - ✅ Preview card while editing
   - ✅ Save as draft
   - ✅ Publish card

2. **Edit Card Sections**
   - ✅ Add/Edit/Delete Experience
   - ✅ Add/Edit/Delete Skills
   - ✅ Add/Edit/Delete Projects
   - ✅ Add/Edit/Delete Social Links
   - ✅ Reorder sections (drag & drop if applicable)

3. **Real-time Preview**
   - ✅ Preview updates as user types
   - ✅ Avatar preview works
   - ✅ Layout switches between mobile/desktop
   - ✅ Dark mode preview toggle

4. **Input Validation**
   - ✅ Required field validation
   - ✅ Email format validation
   - ✅ File size validation (avatar max 5MB)
   - ✅ Bio character limit display
   - ✅ Character count indicators

5. **Save & Publish**
   - ✅ Save draft without publishing
   - ✅ Publish card to public
   - ✅ Unpublish card
   - ✅ Success notifications
   - ✅ Error handling & retry

**Responsive Design Checks:**
- ✅ Mobile (375px): Portrait mode, touch-friendly
- ✅ Tablet (768px): Balanced layout
- ✅ Desktop (1920px): Full layout

**Performance Targets:**
- Page load: < 2s
- Form autosave: < 500ms
- Image upload: < 3s
- Preview update: < 200ms

---

### Module 3: AI Twin Configuration UI

**Test Scenarios:**

1. **System Prompt Configuration**
   - ✅ Text editor loads correctly
   - ✅ Input system prompt
   - ✅ Character counter displays
   - ✅ Save prompt
   - ✅ Load saved prompt

2. **Knowledge Base Management**
   - ✅ Add persona data
   - ✅ View existing data
   - ✅ Edit data
   - ✅ Delete data with confirmation
   - ✅ Reorder data (if drag-enabled)
   - ✅ Search within knowledge base

3. **AI Settings**
   - ✅ Set tone of voice dropdown
   - ✅ Adjust temperature slider
   - ✅ Adjust top_p slider
   - ✅ Toggle AI enable/disable
   - ✅ Save settings

4. **Test Chat**
   - ✅ Test chat interface appears
   - ✅ Send test message
   - ✅ AI response displays
   - ✅ Loading state during response
   - ✅ Error message if AI fails
   - ✅ Clear chat history

**UI/UX Checks:**
- ✅ Tooltips for configuration options
- ✅ Confirmation before deleting data
- ✅ Save status indicator
- ✅ Unsaved changes warning

**Performance Targets:**
- Load configuration: < 1s
- Save settings: < 500ms
- Test chat response: < 3s

---

### Module 4: Chat & AI Interaction

**Test Scenarios:**

1. **Chat Interface**
   - ✅ Chat widget loads on public profile
   - ✅ Message input focuses on click
   - ✅ Send button enabled only with content
   - ✅ Message appears immediately on send
   - ✅ Loading indicator shows AI is responding
   - ✅ AI response displays

2. **Message Display**
   - ✅ User messages aligned to right
   - ✅ AI messages aligned to left
   - ✅ Timestamps display correctly
   - ✅ Avatar images display
   - ✅ Long messages wrap correctly
   - ✅ Images/links in messages render

3. **Real-time Behavior**
   - ✅ Messages sync across browser tabs
   - ✅ Handle network latency gracefully
   - ✅ Handle offline state
   - ✅ Reconnect after connection loss

4. **Input Handling**
   - ✅ Handle special characters
   - ✅ Handle very long messages
   - ✅ Handle emoji input
   - ✅ Handle rapid message sending
   - ✅ Disallow XSS attempts (sanitization)

5. **Error Scenarios**
   - ✅ Show error if AI fails
   - ✅ Fallback form appears if AI disabled
   - ✅ Retry mechanism for failed messages
   - ✅ Clear error messages

**Responsive Design:**
- ✅ Mobile: Full-width chat, virtual keyboard handling
- ✅ Desktop: Chat sidebar or full-width

**Performance Targets:**
- Message send: < 500ms
- AI response: < 3s
- Real-time sync: < 1s
- Scroll performance: 60fps

---

### Module 5: Inbox & Conversations

**Test Scenarios:**

1. **Conversation List**
   - ✅ Load all conversations
   - ✅ Display recent first
   - ✅ Show unread count
   - ✅ Display last message preview
   - ✅ Search conversations
   - ✅ Filter by AI/Human

2. **Conversation Detail**
   - ✅ Load full chat history
   - ✅ Scroll to load older messages
   - ✅ Display timestamps
   - ✅ Display sender info
   - ✅ Mark as read

3. **Inbox Actions**
   - ✅ Delete conversation
   - ✅ Archive conversation
   - ✅ Pin important conversation
   - ✅ Export conversation

**Performance Targets:**
- Load conversation list: < 1s
- Load conversation detail: < 1s
- Pagination: < 500ms

---

### Module 6: Human Takeover UI

**Test Scenarios:**

1. **Takeover Button**
   - ✅ Button visible in conversation
   - ✅ Button disabled if already taken over
   - ✅ Click triggers takeover flow

2. **Takeover Confirmation**
   - ✅ Show confirmation dialog
   - ✅ Explain takeover to user
   - ✅ Confirm/Cancel options

3. **Takeover State**
   - ✅ UI changes to show human mode
   - ✅ Visitor sees "connected to human"
   - ✅ Card owner can send messages
   - ✅ Messages marked as from owner

4. **Message Flow**
   - ✅ Visitor messages arrive in real-time
   - ✅ Owner messages send to visitor
   - ✅ Conversation history preserved

---

### Module 7: Admin Panel

**Test Scenarios:**

1. **Admin Dashboard**
   - ✅ Load admin page (auth check)
   - ✅ Display key metrics
   - ✅ Display charts/graphs
   - ✅ Responsive design

2. **User Management**
   - ✅ Load user list with pagination
   - ✅ Search users by email/name
   - ✅ View user details
   - ✅ Suspend user with confirmation
   - ✅ Delete user with confirmation

3. **Report Management**
   - ✅ Load reported cards list
   - ✅ View report details
   - ✅ Approve/reject report
   - ✅ Take action (suspend card/user)
   - ✅ Add notes to report

**Permission Checks:**
- ✅ Non-admin cannot access
- ✅ Protected routes redirect to login

---

### Module 8: Public Profile

**Test Scenarios:**

1. **Profile Display**
   - ✅ Load profile by URL slug
   - ✅ Display all sections correctly
   - ✅ Display formatted contact info
   - ✅ Display card owner info with avatar
   - ✅ Responsive on all devices

2. **Share & Export**
   - ✅ QR Code visible and scannable
   - ✅ Copy URL to clipboard
   - ✅ vCard export button works
   - ✅ Social share buttons

3. **Chat Widget**
   - ✅ Chat opens in modal/drawer
   - ✅ Chat is responsive
   - ✅ Send message to AI
   - ✅ Close chat widget

4. **Inactive/Not Found**
   - ✅ 404 page for non-existent profile
   - ✅ Message for inactive profile
   - ✅ Suggest going to home page

**Performance Targets (Lighthouse):**
- ✅ Performance: ≥ 90
- ✅ Accessibility: ≥ 90
- ✅ SEO: ≥ 90
- ✅ Best Practices: ≥ 90

---

## ✅ Test Execution Checklist

- [ ] Development server running on http://localhost:3000
- [ ] Backend API running on http://localhost:3001
- [ ] Firebase Emulator started
- [ ] Environment variables configured
- [ ] Cypress installed: `npm install cypress`
- [ ] Test accounts created in Firebase
- [ ] Run Cypress: `npx cypress open` (GUI mode)
- [ ] Or run headless: `npm run cypress:run`
- [ ] All tests passing
- [ ] Check Lighthouse scores on public pages
- [ ] Verify responsive design on mobile devices
- [ ] No console errors/warnings

---

## 📊 Test Coverage Goals

| Module | Target Coverage |
|--------|-----------------|
| Authentication UI | 90% |
| Profile Builder | 85% |
| AI Configuration | 80% |
| Chat & AI | 90% |
| Inbox & Conversations | 80% |
| Human Takeover | 85% |
| Admin Panel | 75% |
| Public Profile | 85% |
| Landing Page | 70% |
| **Overall** | **≥ 85%** |

---

## 🔍 Accessibility Testing (WCAG 2.1 AA)

Every component must be tested for:

- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader compatibility (ARIA labels)
- [ ] Color contrast (≥ 4.5:1 for text)
- [ ] Form labels associated correctly
- [ ] Focus indicators visible
- [ ] Error messages clear and associated with fields
- [ ] Alternative text for images

---

## 🐛 Bug Reporting

When finding bugs during frontend testing, report with:

```
Bug ID: BUG_FRONTEND_001
Module: Profile Builder
Title: Avatar preview not updating when image changes
Severity: High
Steps to Reproduce:
  1. Go to Profile Builder
  2. Click "Upload Avatar"
  3. Select image file (avatar.jpg)
  4. Wait for upload
Expected: Avatar preview updates immediately
Actual: Preview shows old image until page refresh
Browser: Chrome 120, macOS Monterey
Viewport: 1920x1080
Screenshots: [Attached]
Console Errors: [If any]
```

---

## 📚 Custom Cypress Commands

Create helpful commands in `cypress/support/commands.ts`:

```typescript
// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.get('button[type=submit]').click();
  cy.url().should('include', '/dashboard');
});

// Create test card
Cypress.Commands.add('createCard', (cardData: CardData) => {
  cy.visit('/dashboard/cards');
  cy.get('[data-testid="new-card-btn"]').click();
  cy.get('[data-testid="name-input"]').type(cardData.name);
  // ... more actions
});
```

---

## 📚 References

- [Cypress Documentation](https://docs.cypress.io/)
- [React Testing Library](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [TEST PLAN.md](../TEST%20PLAN.md)

---

**Last Updated:** 2026  
**Version:** 1.0  
**Status:** Active ✅
