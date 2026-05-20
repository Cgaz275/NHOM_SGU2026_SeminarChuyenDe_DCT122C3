# TEST CASES: Module 4 - Quản lý Tin nhắn & Inbox (Conversations)

Được sinh tự động dựa trên `PRD.md` và `Test_Plan.md`.

### 1. Happy Path
#### **TC-4.01 - Khách gửi Fallback Form**
- **Test Type:** E2E
- **Priority:** Medium
- **Expected Result:** Khách gửi thành công, tin lưu vào DB, không gọi LLM.

### 2. Negative Path & Error Handling
#### **TC-4.02 - Chủ thẻ gửi tin nhắn nhưng Khách đã thoát**
- **Test Type:** E2E
- **Priority:** Medium
- **Expected Result:** Tin vẫn lưu DB. Nếu khách vào lại URL Public Card cũ (còn cookie/session), khách vẫn đọc được tin (nếu kiến trúc hỗ trợ) hoặc hệ thống sẽ fallback gửi Email nếu khách có để lại Email.

### 3. Luồng Tích Hợp (Integration Flows)
#### **TC-4.03 - Đồng bộ tin nhắn Inbox Real-time**
- **Test Type:** Integration
- **Priority:** High
- **Steps to Reproduce:**
  1. Chủ thẻ đang mở Inbox Dashboard.
  2. Khách gửi tin nhắn từ Public Card.
- **Expected Result:**
  - **Frontend (Chủ thẻ):** Màn hình Inbox nhảy dòng tin nhắn mới của khách NGAY LẬP TỨC (Nhờ Firebase `onSnapshot`), không cần F5 trình duyệt. Cờ `Unread` tăng lên 1.

### 4. Edge Cases & Core Risks
#### **TC-4.04 - Xung đột luồng chat (Takeover race condition) - Core Risk**
- **Test Type:** Concurrency
- **Priority:** Critical
- **Steps to Reproduce:**
  1. Khách nhắn tin, chờ LLM xử lý (mất 3 giây).
  2. Tại giây thứ 1, Chủ thẻ bấm "Tạm dừng AI (Takeover)".
- **Expected Result:**
  - **Backend:** Khi OpenAI trả về ở giây thứ 3, Backend check lại DB thấy cờ `isAiPaused = true` nên HUỶ kết quả OpenAI. Tránh AI vô tình cướp lời Chủ thẻ.
