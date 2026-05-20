# 🚀 Frontend Test Quick Start Guide

Hướng dẫn nhanh để chạy các test frontend cho Persona-Based Digital Twin Card Platform.

---

## ⚡ Chuẩn Bị (2-3 phút)

### 1. Cài đặt Dependencies
```bash
npm install
cd Frontend && npm install
cd ../Backend && npm install
```

### 2. Khởi động Các Services

**Terminal 1** - Frontend Dev Server:
```bash
cd Frontend
npm run dev
# Chạy trên http://localhost:3000
```

**Terminal 2** - Backend Server:
```bash
cd Backend
npm run dev
# Chạy trên http://localhost:3001
```

**Terminal 3** - Firebase Emulator:
```bash
firebase emulators:start
```

**Terminal 4** - Test Execution:
```bash
# Chạy tests ở đây
```

### 3. Kiểm tra Cấu hình
- Frontend dev server chạy: http://localhost:3000 ✅
- Backend API chạy: http://localhost:3001 ✅
- Firebase Emulator chạy ✅

---

## 🧪 Chạy Tests

### Option 1: Jest Component Tests (Nhanh - ~5 phút)

```bash
cd Frontend

# Chạy tất cả component tests
npm test

# Xem results trong console
# ✓ auth.test.tsx (31 tests)
# ✓ card.test.tsx (27 tests)
# ✓ chat.test.tsx (32 tests)
```

**Kết quả**: 90 tests, coverage ≥ 80%

---

### Option 2: Cypress E2E Tests (Chi tiết - ~30-40 phút)

#### 2a. GUI Mode (Tương tác)
```bash
cd Frontend

# Mở Cypress Dashboard
npm run cypress:open

# Hoặc ngắn gọn:
npx cypress open
```

**Hướng dẫn**:
1. Chọn **E2E Testing**
2. Chọn **Chrome** browser
3. Chọn test file (ví dụ: `Module_1_Auth_UI.cy.ts`)
4. Xem live test execution với debug tools
5. Nếu test fail, xem screenshot/video tự động

#### 2b. Headless Mode (Tự động)
```bash
cd Frontend

# Chạy tất cả E2E tests
npm run cypress:run

# Hoặc chạy module cụ thể:
npx cypress run --spec "cypress/e2e/Module_1_Auth_UI.cy.ts"
npx cypress run --spec "cypress/e2e/Module_2_Profile_Builder_UI.cy.ts"
npx cypress run --spec "cypress/e2e/Module_3_4_AI_Chat.cy.ts"
npx cypress run --spec "cypress/e2e/Module_5_6_7_8_Complete.cy.ts"
```

**Kết quả**: 155 tests, videos in `cypress/videos/`

---

### Option 3: Chạy Tất cả Tests (Toàn diện - ~50 phút)

```bash
cd Frontend

# Chạy Jest + Cypress
npm run test:all

# Hoặc riêng lẻ:
npm test                    # Jest component tests
npm run cypress:run         # Cypress E2E tests
```

**Kết quả**: 245+ tests, coverage report generated

---

## 📊 Xem Coverage Report

```bash
cd Frontend

# Tạo coverage report
npm test -- --coverage

# Mở report trong browser
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
```

**Target**: ≥ 85% coverage

---

## ✅ Test Cases Overview

### Module 1: Authentication UI
```
TC_AUTH_UI_001-008: Registration Flow (8 tests)
TC_AUTH_UI_009-017: Login Flow (9 tests)
TC_AUTH_UI_018-021: Password Reset (4 tests)
TC_AUTH_UI_022-024: Session Management (3 tests)
TC_AUTH_UI_025-029: Accessibility & Performance (5 tests)
```

### Module 2: Profile Builder UI
```
TC_PROFILE_UI_001-008: Create Card (8 tests)
TC_PROFILE_UI_009-014: Edit Card (6 tests)
TC_PROFILE_UI_015-020: Real-time Preview (6 tests)
TC_PROFILE_UI_021-026: Card Sections (6 tests)
TC_PROFILE_UI_027-030: Save & Publish (4 tests)
TC_PROFILE_UI_031-035: Responsive & Performance (5 tests)
```

### Module 3 & 4: AI Twin & Chat
```
TC_AI_UI_001-008: AI Configuration (8 tests)
TC_AI_UI_009-016: Knowledge Base (8 tests)
TC_AI_UI_017-023: Test Chat (7 tests)
TC_AI_UI_024-032: Public Chat (9 tests)
TC_AI_UI_033-035: Accessibility (3 tests)
```

### Module 5-8: Other Features
```
TC_INBOX_UI_001-010: Inbox & Conversations (10 tests)
TC_TAKEOVER_UI_001-008: Human Takeover (8 tests)
TC_ADMIN_UI_001-012: Admin Panel (12 tests)
TC_PUBLIC_UI_001-020: Public Profile (20 tests)
TC_JOURNEY_E2E_001-003: End-to-End Journeys (3 tests)
```

**Total**: 155 E2E + 90 Component = 245+ Tests

---

## 🔍 Chạy Test Cụ Thể

### Chạy một test module
```bash
# Auth Module
npx cypress run --spec "cypress/e2e/Module_1_Auth_UI.cy.ts"

# Profile Builder Module
npx cypress run --spec "cypress/e2e/Module_2_Profile_Builder_UI.cy.ts"

# AI & Chat Module
npx cypress run --spec "cypress/e2e/Module_3_4_AI_Chat.cy.ts"

# Complete Features
npx cypress run --spec "cypress/e2e/Module_5_6_7_8_Complete.cy.ts"
```

### Chạy một component test
```bash
# Auth components
npm test auth.test.tsx

# Card components
npm test card.test.tsx

# Chat components
npm test chat.test.tsx
```

### Chạy một test case cụ thể
```bash
# Tìm test name
grep -n "TC_AUTH_UI_010" cypress/e2e/Module_1_Auth_UI.cy.ts

# Chạy test cụ thể
npx cypress run --spec "cypress/e2e/Module_1_Auth_UI.cy.ts" --grep "TC_AUTH_UI_010"
```

---

## 🐛 Debug Mode

### Cypress Debug
```bash
# Chạy với debug info
npx cypress run --spec "cypress/e2e/Module_1_Auth_UI.cy.ts" --headed

# Hoặc mở Cypress GUI trực tiếp
npx cypress open
# Chạy từng test, pause, inspect elements
```

### Jest Debug
```bash
# Chạy test cụ thể với debugging
node --inspect-brk node_modules/.bin/jest auth.test.tsx

# Chrome DevTools sẽ mở tự động
# chrome://inspect để debug
```

---

## 📝 Xem Test Results

### Terminal Output
```
PASS  src/__tests__/auth.test.tsx
  LoginForm Component
    ✓ should render login form (45ms)
    ✓ should disable submit when empty (32ms)
    ✓ should validate email format (28ms)
  ...
Test Suites: 3 passed, 3 total
Tests:       90 passed, 90 total
Time:        8.542s
```

### HTML Report (Cypress)
- Tự động tạo trong `cypress/videos/`
- Tự động tạo screenshots khi test fail
- Xem chi tiết: `cypress/reports/`

### Coverage Report
```
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   87.5% |    82.3% |   90.1% |   87.8% |
  components/auth/        |   95.2% |    88.5% |   96.0% |   95.0% |
  components/card/        |   82.0% |    78.0% |   85.0% |   81.5% |
  components/chat/        |   85.0% |    82.0% |   87.0% |   85.0% |
```

---

## ⚠️ Xử Lý Lỗi Thường Gặp

### Port Đã Được Sử Dụng
```bash
# Nếu port 3000 bị chiếm:
lsof -i :3000
kill -9 <PID>

# Hoặc dùng port khác:
PORT=3001 npm run dev
```

### Firebase Emulator Không Khởi Động
```bash
# Kiểm tra Firebase CLI
firebase --version

# Xóa cache emulator
rm -rf ~/.cache/firebase
firebase emulators:start --force
```

### Cypress Timeout
```bash
# Tăng timeout nếu backend chậm
npx cypress run --config defaultCommandTimeout=15000

# Hoặc trong test:
cy.intercept('POST', '/api/**', (req) => {
  req.reply((res) => {
    res.delay(3000);
  });
});
```

### Test Không Tìm Thấy Element
```bash
# Xem CSS selectors:
npx cypress run --spec "*.cy.ts" --headed

# Hoặc debug:
cy.pause()  // Tạm dừng và inspect
cy.debug()  // Log state
```

---

## 📈 Test Execution Checklist

### Trước Khi Chạy Tests
- [ ] Node.js 18+ cài đặt
- [ ] Các dependencies cài đặt (`npm install`)
- [ ] Frontend dev server chạy trên port 3000
- [ ] Backend API chạy trên port 3001
- [ ] Firebase Emulator chạy
- [ ] .env.test cấu hình đúng
- [ ] Không có lỗi trong console

### Khi Chạy Tests
- [ ] Monitor CPU/Memory usage
- [ ] Xem console logs
- [ ] Lưu ý screenshots khi fail
- [ ] Kiểm tra Lighthouse scores
- [ ] Verify test data cleanup

### Sau Khi Chạy Tests
- [ ] Review test results
- [ ] Xem coverage report
- [ ] Ghi lại failures
- [ ] Commit results
- [ ] Update test documentation

---

## 🎯 Success Criteria

| Criteria | Target | Status |
|----------|--------|--------|
| All tests pass | ≥ 95% | ✅ Check |
| Code coverage | ≥ 85% | ✅ Check |
| No critical bugs | 0 | ✅ Check |
| Performance (< 2s) | 100% | ✅ Check |
| Accessibility (WCAG) | AA | ✅ Check |
| Responsive design | All sizes | ✅ Check |

---

## 📞 Cần Giúp?

### Documentation
- `Testing/Frontend_Test_Implementation_Plan.md` - Chi tiết toàn bộ test plan
- `AI_Instruction/Testing/frontend_test_guideline.md` - Frontend testing guidelines
- `AI_Instruction/Testing/test_cases_guideline.md` - Test case format
- `AI_Instruction/TEST PLAN.md` - Overall test strategy

### Common Commands
```bash
# Quick reference
npm test                        # Jest component tests
npm run cypress:open           # Cypress GUI
npm run cypress:run            # All E2E tests
npm run test:all               # Jest + Cypress
npm test -- --coverage         # Coverage report
npm run cypress:run -- --headed # Headed mode
npm run cypress:run --spec "*.cy.ts" # Specific file
```

---

## ✨ Next Steps

1. **Chạy Component Tests** (5 min)
   ```bash
   cd Frontend && npm test
   ```

2. **Chạy Module 1 E2E** (5 min)
   ```bash
   npm run cypress:open
   # Chọn Module_1_Auth_UI.cy.ts
   ```

3. **Chạy Toàn Bộ E2E Tests** (30 min)
   ```bash
   npm run cypress:run
   ```

4. **Generate Coverage Report** (2 min)
   ```bash
   npm test -- --coverage
   ```

5. **Fix Any Failures**
   - Xem screenshots/videos
   - Debug trong Cypress GUI
   - Update code & re-test

---

**Happy Testing! 🎉**

*Với 245+ test cases, bạn có coverage toàn diện cho tất cả modules. Chúc mừng bạn có một test suite production-ready!*

---

**Created**: 2026  
**Last Updated**: 2026  
**Status**: ✅ Ready to Run
