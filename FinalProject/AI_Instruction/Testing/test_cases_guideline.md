# Test Cases Guideline

**Hướng dẫn viết Test Cases cho Persona-Based Digital Twin Card System**

---

## 📌 Mục Đích

Tài liệu này định nghĩa cách viết, tổ chức, và quản lý Test Cases để đảm bảo:
- Consistency (nhất quán) giữa các test cases
- Clarity (rõ ràng) cho người thực hiện test
- Traceability (có thể truy vết) đến requirements
- Efficiency (hiệu quả) trong test execution

---

## 🎯 Định Nghĩa Test Case

**Test Case** là một bộ điều kiện, đầu vào, và kết quả mong đợi được thiết kế để kiểm thử một chức năng cụ thể của hệ thống.

---

## 📋 Cấu Trúc Test Case Chuẩn

### Template Cơ Bản

```
Test Case ID:        TC_MODULE_001
Title:               [Mô tả ngắn gọn chức năng được test]
Module:              [Tên module: Authentication, Profile Builder, etc]
Feature:             [Tên feature cụ thể]
Priority:            [Critical / High / Medium / Low]
Category:            [Functional / UI/UX / Performance / Security / Integration]
Created By:          [Tên người viết]
Created Date:        [YYYY-MM-DD]
Last Modified:       [YYYY-MM-DD]
Status:              [Ready / In Progress / Blocked]

### Preconditions (Điều Kiện Tiên Quyết)
- Điều kiện 1
- Điều kiện 2
- ...

### Test Data (Dữ Liệu Test)
- Variable: value
- ...

### Test Steps (Các Bước Thực Hiện)
| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | [Hành động người dùng/hệ thống] | [Kết quả mong đợi] |
| 2 | ... | ... |

### Post-Conditions (Điều Kiện Sau Test)
- Điều kiện 1
- Điều kiện 2

### Test Execution Record
| Run Date | Tester | Status | Notes | Bug ID |
|----------|--------|--------|-------|--------|
| YYYY-MM-DD | Name | Pass/Fail | [Ghi chú] | [ID nếu có] |

### Attachments (Tệp Đính Kèm)
- Screenshots: [Links]
- Videos: [Links]
- Test Data: [Links]
```

---

## 📊 Chi Tiết Từng Trường

### 1. Test Case ID
**Format:** `TC_[MODULE]_[NUMBER]`

**Ví dụ:**
```
TC_AUTH_001      (Authentication, test case #1)
TC_PROFILE_005   (Profile Builder, test case #5)
TC_CHAT_012      (Chatbot/AI, test case #12)
```

### 2. Title (Tiêu đề)
- Mô tả **rõ ràng, ngắn gọn** (tối đa 100 ký tự)
- Sử dụng **Behavior-Driven Development (BDD)** style: "Should [expected behavior] when [condition]"
- Không chứa kỹ thuật chi tiết hay implementation details

**✅ Tốt:**
- "Should register new user successfully with valid email and password"
- "Should display error when submitting form with missing required fields"
- "Should update card information and reflect changes in preview"

**❌ Xấu:**
- "Test registration"
- "Check if user can register"
- "Test JWT token generation"

### 3. Module & Feature
Xác định chính xác module và feature được test

**Module List:**
- Authentication & Authorization
- Profile Builder / Card Editor
- AI Digital Twin Configuration
- Chatbot & AI Response
- Fallback & Inbox Management
- Human Takeover
- Admin Panel & User Management
- Public Digital Profile
- Landing Page

### 4. Priority Level

| Level | Definition | Fix Timeline |
|-------|-----------|-------------|
| **Critical (P0)** | Blocks core functionality, prevents demo | Fix immediately |
| **High (P1)** | Major functionality broken | Fix within 24h |
| **Medium (P2)** | Affects user experience significantly | Fix within 3 days |
| **Low (P3)** | Minor issue, cosmetic | Fix when time permits |

### 5. Category Type

| Category | Focus | Example |
|----------|-------|---------|
| **Functional** | Feature works as specified | Login success, card creation |
| **UI/UX** | Interface, layout, responsiveness | Button styling, mobile responsive |
| **Performance** | Speed, load time | Page load < 2s, chat response < 3s |
| **Security** | Authentication, authorization, vulnerabilities | SQL injection, XSS, CSRF |
| **Integration** | System components work together | Frontend-Backend-Firebase sync |
| **Regression** | Previously fixed issues don't reappear | Old bug doesn't recur |
| **Accessibility** | WCAG 2.1 AA compliance | Keyboard navigation, screen reader |

### 6. Preconditions (Điều Kiện Tiên Quyết)

**Định nghĩa:** Trạng thái hệ thống cần có trước khi test case thực thi

**Ví dụ:**
```
- User is logged in with valid account
- User has created at least 1 digital card
- Test database is initialized with sample data
- Firebase Emulator is running
- Browser cache is cleared
```

### 7. Test Data

**Định nghĩa:** Dữ liệu input được sử dụng cho test case

**Cách viết:**
```
Variable Name          | Value              | Description
-----------------------|-------------------|----------
email                 | test@example.com   | Valid email
password              | SecurePass123!     | Valid password
card_name             | John's Business Card | Sample card name
invalid_email         | invalid.email      | Invalid email format
special_characters    | !@#$%^&*()        | Test special chars
```

### 8. Test Steps

**Định nghĩa:** Các hành động cần thực hiện và kết quả mong đợi

**Cách viết:**
```
| # | Action (Hành động) | Expected Result (Kết quả Mong Đợi) |
|---|---|---|
| 1 | Click "Register" link on Login page | Registration form displays |
| 2 | Enter email: test@example.com | Email field accepts input |
| 3 | Enter password: SecurePass123! | Password field accepts input (masked) |
| 4 | Click "Register" button | System sends registration request |
| 5 | Wait for response | Page redirects to Dashboard |
| 6 | Verify in database | User record created in Firestore |
```

**Guidelines:**
- Mỗi step phải **atomic** (không thể chia nhỏ hơn)
- Use **specific selectors** (data-testid preferred)
- Include **wait times** nếu cần
- Avoid **assumptions** - mô tả rõ ràng mọi thứ
- Mỗi expected result phải **verifiable** (có thể kiểm chứng)

### 9. Post-Conditions (Điều Kiện Sau Test)

**Định nghĩa:** Trạng thái hệ thống sau test case hoàn thành

**Ví dụ:**
```
- New user account created in Firebase
- User email verified
- User logged in and on Dashboard
- Test data cleaned up from database
```

### 10. Test Execution Record

**Khi nào điền:** Sau khi thực thi test case

**Cách viết:**
```
| Run Date | Tester | Status | Notes | Bug ID |
|----------|--------|--------|-------|--------|
| 2026-01-15 | Linh | Pass | Form validation works correctly | - |
| 2026-01-16 | Hùng | Fail | Email field accepts invalid format | BUG_001 |
```

**Status Values:**
- **Pass** - Test case passed completely
- **Fail** - Test case failed (create bug report)
- **Blocked** - Cannot execute (preconditions not met, other blockers)
- **Skipped** - Intentionally not executed (document reason)

---

## 🔄 Test Case Lifecycle

### 1. Design Phase
```
Analyze PRD & Requirements 
  ↓
Create Test Case ID & Title
  ↓
Define Preconditions & Test Data
  ↓
Write Test Steps & Expected Results
  ↓
Review & Approve
```

### 2. Execution Phase
```
Verify Preconditions Met
  ↓
Execute Test Steps
  ↓
Record Actual Results
  ↓
Pass/Fail Decision
  ↓
If Fail → Create Bug Report
  ↓
Update Test Execution Record
```

### 3. Management Phase
```
Track Test Execution Rate
  ↓
Monitor Bug Status
  ↓
Update Test Cases Based on Feedback
  ↓
Regression Testing After Fixes
  ↓
Close Test Case (if final)
```

---

## ✅ Test Case Quality Checklist

When writing or reviewing test cases, verify:

- [ ] **Clear Title**: Describes what is being tested clearly
- [ ] **Unique ID**: Follows naming convention (TC_MODULE_NUMBER)
- [ ] **Complete Preconditions**: All prerequisites listed
- [ ] **Valid Test Data**: Realistic and comprehensive
- [ ] **Atomic Steps**: Each step is single, specific action
- [ ] **Verifiable Results**: Expected results are checkable
- [ ] **No Assumptions**: All necessary details included
- [ ] **Traceable**: Can be mapped to requirements
- [ ] **Maintainable**: Easy to update if requirements change
- [ ] **Executable**: Can be run by any tester
- [ ] **No Implementation Details**: Focuses on behavior, not code
- [ ] **Appropriate Category**: Correctly categorized
- [ ] **Correct Priority**: Matches business importance

---

## 📊 Test Case Categorization Strategy

### By Module
- Module 1: Authentication
- Module 2: Profile Builder
- Module 3: AI Configuration
- Module 4: Chatbot & AI
- Module 5: Inbox & Fallback
- Module 6: Human Takeover
- Module 7: Admin Panel
- Module 8: Public Profile
- Module 9: Landing Page

### By Scenario
- **Happy Path**: Main flow with valid data
- **Alternative Flow**: Valid but different path
- **Edge Cases**: Boundary conditions
- **Error Cases**: Invalid data, system failures
- **Negative Cases**: User attempts unauthorized actions

### By Testing Level

| Level | Scope | Tools | Examples |
|-------|-------|-------|----------|
| **Unit** | Single function/component | Jest, React Testing Library | Button click, form validation |
| **Integration** | Multiple components | Jest, Postman | Frontend + Backend API |
| **System** | End-to-end user flow | Cypress | Complete user journey |
| **Acceptance** | Business requirements | Manual + Cypress | Demo to stakeholder |

---

## 📝 Test Case Examples

### Example 1: Happy Path - User Login

```
Test Case ID:        TC_AUTH_001
Title:               Should login successfully with valid email and password
Module:              Authentication & Authorization
Feature:             User Login
Priority:            Critical (P0)
Category:            Functional
Created By:          QA Team
Created Date:        2026-01-10
Status:              Ready

### Preconditions
- User has registered account with email "test@example.com" and password "SecurePass123!"
- User is on Login page (/login)
- Firebase authentication is operational

### Test Data
| Variable | Value | Description |
|----------|-------|-------------|
| email | test@example.com | Registered user email |
| password | SecurePass123! | Correct password |
| expected_page | /dashboard | Expected redirect page |

### Test Steps
| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | Enter email "test@example.com" in email field | Email field contains value |
| 2 | Enter password "SecurePass123!" in password field | Password field contains value (masked) |
| 3 | Click "Login" button | Page shows loading indicator |
| 4 | Wait 2-3 seconds for response | System authenticates user |
| 5 | Verify page redirect | User redirected to /dashboard |
| 6 | Check localStorage has JWT token | Token exists and is valid |
| 7 | Check user profile loads | User info displayed in header |

### Post-Conditions
- User logged in and authenticated
- JWT token stored in localStorage
- User data loaded from Firestore
- Dashboard accessible

### Test Execution Record
| Run Date | Tester | Status | Notes | Bug ID |
|----------|--------|--------|-------|--------|
| 2026-01-15 | Linh | Pass | Works as expected | - |
| 2026-01-20 | Hùng | Pass | Tested on Chrome & Firefox | - |
```

### Example 2: Error Case - Invalid Email

```
Test Case ID:        TC_AUTH_002
Title:               Should display error message when logging in with invalid email format
Module:              Authentication & Authorization
Feature:            User Login
Priority:            High (P1)
Category:            Functional
Created By:          QA Team
Created Date:        2026-01-10
Status:              Ready

### Preconditions
- User is on Login page (/login)
- Email field is empty

### Test Data
| Variable | Value | Description |
|----------|-------|-------------|
| invalid_email | invalid.email | Email without @ symbol |
| password | AnyPassword123! | Any password |

### Test Steps
| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | Enter "invalid.email" in email field | Email field contains value |
| 2 | Enter "AnyPassword123!" in password field | Password field contains value |
| 3 | Click "Login" button | System validates email format |
| 4 | Observe error message | Error message displays: "Please enter a valid email address" |
| 5 | Verify button state | Login button remains enabled |
| 6 | Verify form data retained | Email and password still visible in fields |

### Post-Conditions
- No API request sent
- User remains on Login page
- Form data preserved for correction

### Test Execution Record
| Run Date | Tester | Status | Notes | Bug ID |
|----------|--------|--------|-------|--------|
| 2026-01-15 | Linh | Pass | Validation works correctly | - |
```

### Example 3: Edge Case - Chat Response Timeout

```
Test Case ID:        TC_CHAT_015
Title:               Should show fallback message if AI response timeout exceeds 3 seconds
Module:              Chatbot & AI Response
Feature:             AI Chat Response
Priority:            High (P1)
Category:            Performance / Integration
Created By:          QA Team
Created Date:        2026-01-12
Status:              Ready

### Preconditions
- User is on public digital profile page
- Card owner has AI Digital Twin enabled
- OpenAI API connection is available
- Chat widget is open and ready

### Test Data
| Variable | Value | Description |
|----------|-------|-------------|
| message | "What is your background?" | Normal user question |
| timeout_threshold | 3000ms | Expected AI response timeout |
| fallback_msg | "Taking longer than usual..." | Timeout message |

### Test Steps
| # | Action | Expected Result |
|---|--------|-----------------|
| 1 | Type message "What is your background?" in chat input | Message appears in input field |
| 2 | Click Send button | User message displays in chat with timestamp |
| 3 | Observe loading indicator | Loading spinner shows AI is responding |
| 4 | Wait for 3+ seconds without AI response | System detects timeout |
| 5 | Observe timeout handling | Fallback message displays to user |
| 6 | Verify fallback options | "Try again" button and "Contact owner" form available |
| 7 | Click "Try again" button | Chat resets, allows retry |

### Post-Conditions
- User informed of timeout gracefully
- Conversation history preserved
- Can retry or contact form fallback available
- No error in browser console

### Test Execution Record
| Run Date | Tester | Status | Notes | Bug ID |
|----------|--------|--------|-------|--------|
| 2026-01-18 | Hùng | Pass | Timeout handling works | - |
```

---

## 🔍 Test Case Maintenance

### When to Update Test Cases
- Requirements change
- Features are modified
- New edge cases discovered
- Test data becomes outdated
- System behavior changes

### How to Update
1. Change Status to "In Progress"
2. Update affected sections
3. Document change reason and date
4. Review and re-approve
5. Re-execute to verify updates

### Archiving
- Mark Status as "Archived" when feature removed
- Keep for historical reference
- Document deprecation reason and date

---

## 📚 Test Case Organization

### Google Sheets Structure (Recommended)

```
Columns:
A - TC ID
B - Title
C - Module
D - Feature
E - Priority
F - Category
G - Preconditions
H - Test Data
I - Steps
J - Expected Results
K - Tester
L - Status
M - Bug ID
N - Notes
O - Date
```

### Folder Structure

```
Testing/Docs/
├── Test_Cases_Module_1_Auth.xlsx
├── Test_Cases_Module_2_Profile.xlsx
├── Test_Cases_Module_3_AI_Config.xlsx
├── Test_Cases_Module_4_Chatbot.xlsx
├── Test_Cases_Module_5_Inbox.xlsx
├── Test_Cases_Module_6_Takeover.xlsx
├── Test_Cases_Module_7_Admin.xlsx
└── Test_Cases_Public_Profile.xlsx
```

---

## 📊 Metrics & KPIs

| Metric | Target | Notes |
|--------|--------|-------|
| **Test Case Coverage** | ≥ 95% | % of features covered |
| **Test Case Pass Rate** | ≥ 95% | % of test cases passing |
| **Test Execution Rate** | ≥ 80% | % of planned tests executed |
| **Bug Detection Rate** | High | Critical & High bugs found early |
| **Test Case Reusability** | High | Can be run multiple times |
| **Test Case Maintainability** | High | Easy to update and understand |

---

## 🐛 Creating Bug Report from Failed Test

When a test case fails:

```
Bug ID:              BUG_001
TC ID:               TC_AUTH_001
Title:               Login fails with "Connection timeout" error
Severity:            High
Steps to Reproduce:
  1. Go to /login
  2. Enter valid credentials
  3. Click Login
Expected:            Redirect to /dashboard
Actual:              Error message: "Connection timeout"
Error Message:       [Full error text]
Environment:         Chrome 120, Windows 11, Node 18.x
API Response Time:   > 5 seconds
Console Errors:      [Screenshot of console]
Video:               [Link to screen recording]
Root Cause:          [Identified or unknown]
Assigned To:         Backend Team
Priority:            P1 (Critical)
```

---

## 📚 References

- [TEST PLAN.md](../TEST%20PLAN.md) - Master testing plan
- [backend_test_guideline.md](./backend_test_guideline.md)
- [frontend_test_guideline.md](./frontend_test_guideline.md)
- [test_suite_guideline.md](./test_suite_guideline.md)
- [test_result_guideline.md](./test_result_guideline.md)

---

**Last Updated:** 2026  
**Version:** 1.0  
**Status:** Active ✅
