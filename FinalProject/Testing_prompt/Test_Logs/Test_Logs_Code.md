# 💻 TEST CODE LOGS

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Backend/tests/Module_1_Auth.test.js`
**Số lượng Test Cases (it blocks):** 5
**Ghi chú:** Đã sinh mã nguồn tự động sử dụng Jest & Supertest để test cho Module 1 (Auth). Kỹ thuật nổi bật đã sử dụng là mock hàm `verifyIdToken` của thư viện `firebase-admin` để giả lập các luồng đăng nhập thành công và giả lập lỗi Timeout (trả về 503) mà không cần kết nối mạng thực tế. Bắt buộc kiểm tra chuẩn JSON `{ success, data, message }` trên mọi response.

---

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Frontend/cypress/e2e/Module_1_Auth.cy.js`
**Số lượng Test Cases (it blocks):** 6
**Ghi chú:** Đã sinh mã nguồn E2E Frontend sử dụng Cypress. Sử dụng triệt để kỹ thuật `cy.intercept()` để MOCK toàn bộ dữ liệu trả về từ API (Status 200, 401, 503) nhằm đảm bảo test case UI chạy ổn định 100% không phụ thuộc Backend. Có kiểm tra Loading State bằng cách thiết lập property `delay` trong intercept.
