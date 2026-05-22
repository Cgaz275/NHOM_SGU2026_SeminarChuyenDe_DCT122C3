# Kế Hoạch Thực Thi Kiểm Thử Backend

**Nền Tảng Thẻ Kỹ Thuật Số Dựa Trên Nhân Vật**  
**Ngày Lập Kế Hoạch**: 2026  
**Thời Gian Ước Tính**: 2-3 giờ hoàn thành

---

## 📋 Danh Sách Công Việc Trước Thực Thi

### Phase 1: Chuẩn Bị Môi Trường (30 phút)

- [ ] **1.1 Cài Firebase CLI**
  ```bash
  npm install -g firebase-tools
  firebase login
  firebase init emulators
  ```

- [ ] **1.2 Thiết Lập Firebase Emulator Config**
  - Tạo file `firebase.json` nếu chưa có
  - Config ports: 4000 (Firestore), 9099 (Auth), 8085 (Realtime)

- [ ] **1.3 Tạo File .env**
  ```
  NODE_ENV=test
  API_URL=http://localhost:3001
  FIREBASE_PROJECT_ID=seminar-digital-twin
  FIREBASE_EMULATOR_HOST=localhost
  ```

- [ ] **1.4 Xác Nhận Dependencies**
  ```bash
  cd Backend && npm install
  npm list jest firebase firebase-admin
  ```

### Phase 2: Khắc Phục TypeScript Exports (30 phút)

- [ ] **2.1 Convert Testing/fixtures sang CommonJS**
  - Chuyển `export * from` thành `module.exports = { ... }`
  - Hoặc thêm Babel config cho TypeScript

- [ ] **2.2 Cập Nhật Jest Config**
  ```js
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { presets: ['@babel/preset-typescript'] }]
  }
  ```

- [ ] **2.3 Kiểm Tra Import Paths**
  - Xác minh tất cả require statements đúng
  - Test một file nhỏ trước

### Phase 3: Chạy Module Tests (1-1.5 giờ)

#### 3.1 Module 1: Authentication (15 phút)
```bash
# Terminal 1: Start Firebase Emulator
firebase emulators:start

# Terminal 2: Run tests
cd Backend
npm run test:module1 -- --no-coverage
```

**Kỳ Vọng**: 40 tests vượt qua, 0 failures

#### 3.2 Module 2: Card Profile (15 phút)
```bash
npm run test:module2 -- --no-coverage
```

**Kỳ Vọng**: 35+ tests vượt qua, 0 failures

#### 3.3 Module 3: AI Config (15 phút)
```bash
npm run test:module3 -- --no-coverage
```

**Kỳ Vọng**: 35 tests vượt qua, 0 failures

#### 3.4 All Modules Together (15 phút)
```bash
npm test -- --no-coverage
```

**Kỳ Vọng**: 250+ tests, ≥95% vượt qua

### Phase 4: Generate Coverage Report (15 phút)

- [ ] **4.1 Chạy Coverage**
  ```bash
  npm run test:coverage
  ```

- [ ] **4.2 Kiểm Tra Coverage**
  - `coverage/` folder được tạo
  - Kiểm tra `coverage/lcov-report/index.html`
  - Target: ≥70% per module

- [ ] **4.3 Generate Coverage Summary**
  ```bash
  npm run test:coverage -- --verbose
  ```

### Phase 5: Tạo Chi Tiết Report (30 phút)

- [ ] **5.1 Collect Test Results**
  ```bash
  npm test -- --json > test-results.json
  ```

- [ ] **5.2 Analyze Results**
  - Tổng tests: ____ (target: 250+)
  - Vượt qua: ____ (target: ≥95%)
  - Thất bại: ____ (target: 0-5)
  - Skipped: ____

- [ ] **5.3 Performance Analysis**
  - Slowest tests (>1000ms)
  - Coverage gaps
  - Flaky tests

- [ ] **5.4 Document Results**
  - Create `Testing/Reports/Backend_Test_Results.md`
  - Include test output, coverage report, metrics

---

## 📊 Template Chi Tiết Report

### Backend_Test_Results_YYYY-MM-DD.md

```markdown
# Backend Test Execution Results

**Date**: YYYY-MM-DD HH:MM
**Environment**: Node.js v16+, Firebase Emulator
**Total Tests**: XXX
**Pass Rate**: XX%

## Summary
- Passed: XXX ✅
- Failed: X ❌
- Skipped: X ⏭️
- Duration: XX.XXs

## By Module
| Module | Tests | Passed | Failed | Coverage |
|--------|-------|--------|--------|----------|
| Auth | 40 | 40 | 0 | XX% |
| Card | 35+ | 35+ | 0 | XX% |
| AI Config | 35 | 35 | 0 | XX% |
| AI Chatbot | 40 | 40 | 0 | XX% |
| Inbox | 35 | 35 | 0 | XX% |
| Takeover | 30 | 30 | 0 | XX% |
| Admin | 35 | 35 | 0 | XX% |

## Performance Metrics
- Fastest test: XXms
- Slowest test: XXXms
- Average: XXms

## Coverage Report
- Branches: XX%
- Functions: XX%
- Lines: XX%
- Statements: XX%

## Issues Found
(if any)

## Recommendations
- ...

## Next Steps
- [ ] Integrate into CI/CD
- [ ] Monitor coverage trends
- [ ] Schedule regular runs
```

---

## 🔧 Troubleshooting Guide

### Issue 1: Firebase Emulator Not Starting
```bash
# Solution 1: Check ports
lsof -i :4000
lsof -i :9099

# Solution 2: Kill existing processes
kill -9 <PID>

# Solution 3: Restart
firebase emulators:start --only firestore,auth
```

### Issue 2: Test Timeout
```js
// Add to jest.setup.js
jest.setTimeout(15000); // 15 seconds
```

### Issue 3: Module Not Found
```bash
# Check node_modules
npm ls firebase
npm ls @firebase/app

# Reinstall
npm ci
npm install
```

### Issue 4: TypeScript Errors
```bash
# Install necessary packages
npm install --save-dev @babel/preset-typescript ts-jest

# Update jest.config.js
transform: {
  '^.+\\.tsx?$': 'ts-jest'
}
```

---

## ⏰ Timeline

| Phase | Duration | Start | End |
|-------|----------|-------|-----|
| **1. Chuẩn Bị** | 30 min | 00:00 | 00:30 |
| **2. Khắc Phục** | 30 min | 00:30 | 01:00 |
| **3. Chạy Tests** | 60 min | 01:00 | 02:00 |
| **4. Coverage** | 15 min | 02:00 | 02:15 |
| **5. Report** | 30 min | 02:15 | 02:45 |
| **TOTAL** | **2h 45m** | | |

---

## 🎯 Success Criteria

- ✅ All 250+ tests identified and accounted for
- ✅ ≥95% pass rate across all modules
- ✅ ≥70% code coverage per module
- ✅ Performance targets met (see Backend_Test_Execution.md)
- ✅ Detailed results report generated
- ✅ Issues documented with solutions
- ✅ Next steps identified for CI/CD integration

---

## 📁 Output Files

After execution, create:
1. `Testing/Reports/Backend_Test_Results_YYYY-MM-DD.md` - Detailed results
2. `Testing/Reports/coverage-report.html` - HTML coverage
3. `Testing/Reports/test-output.json` - Machine-readable results
4. `Testing/Reports/performance-metrics.csv` - Performance data

---

## 🚀 Next Phase: CI/CD Integration

After successful execution:
1. Create `.github/workflows/backend-test.yml`
2. Setup auto-run on push/PR
3. Add coverage tracking
4. Setup notifications
5. Create test failure reports

---

**Kế Hoạch Được Lập**: 2026  
**Phiên Bản**: 1.0  
**Trạng Thái**: 📋 Sẵn Sàng Thực Thi

*Thực thi theo từng bước để đảm bảo thành công.*
