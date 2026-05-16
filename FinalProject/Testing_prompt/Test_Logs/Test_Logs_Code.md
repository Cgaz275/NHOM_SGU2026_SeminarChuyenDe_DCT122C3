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

---

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Frontend/cypress/e2e/Module_2_Card_Profile.cy.js`
**Số lượng Test Cases (it blocks):** 6
**Ghi chú:** Mã nguồn Frontend E2E cho Module 2 đã hoàn thành. Đã mock các API trả về `phoneNumber: null` để test xem giao diện có bị rò rỉ (Privacy Leak) hay không. Xử lý triệt để các luồng Navigation lỗi (404 Not Found, 403 Forbidden) cho thẻ bằng `cy.intercept`. Đã mock thao tác cập nhật thẻ thành công.

---

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Backend/tests/Module_2_Card_Profile.test.js`
**Số lượng Test Cases (it blocks):** 6
**Ghi chú:** Mã nguồn Backend Test (Jest & Supertest) cho Module 2 hoàn tất. Đã tập trung kiểm tra chặt chẽ khâu Data Validation (HTTP 400 khi truyền URL sai định dạng) và kiểm soát bảo mật Privacy Leak (Bắt buộc API không trả về `phoneNumber`, `email` khi xem dạng Public nếu user đang ẩn). Test thành công các luồng gọi thẻ đã bị Soft Delete (404) và Bị khóa (403).

---

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Frontend/cypress/e2e/Module_3_AI_Config.cy.js`
**Số lượng Test Cases (it blocks):** 3
**Ghi chú:** Đã viết mã nguồn Cypress kiểm tra giao diện cấu hình AI. Xử lý mock API lưu thành công `cy.intercept`, kiểm tra kỹ các luồng validation ngay trên form như báo đỏ khi bỏ trống System Prompt, và giả lập dán nội dung quá dài (invoke val) để xem Backend trả về lỗi 413 Payload Too Large có được hứng thành công trên UI không.

---

**Ngày cập nhật:** 2026-05-16
**Tác nhân:** @Test_Agent
**File Code sinh ra:** `Testing/Backend/tests/Module_3_AI_Config.test.js`
**Số lượng Test Cases (it blocks):** 5
**Ghi chú:** Đã viết mã nguồn Backend Test (Jest & Supertest) cho Module 3. Đặc biệt tập trung vào kiểm thử Bảo mật (Security) và Quản lý Rủi ro (Core Risks): Giả lập logic chặn phân quyền Ownership (HTTP 403 khi User B sửa thẻ User A), kiểm tra giới hạn Payload Size chống tràn bộ nhớ Token (HTTP 413), và xác nhận việc sanitize các ký tự đặc biệt không làm crash JSON Parser.
