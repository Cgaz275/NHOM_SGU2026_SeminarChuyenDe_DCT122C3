# 📋 TEST CASES: MODULE 6 - HUMAN TAKEOVER

#### **TC-01 - Kích hoạt "Tiếp quản" thành công (Happy Path)**
- **Test Type:** UI / API
- **Priority:** High
- **Pre-condition:** Khách đang nhắn tin với AI. Chủ thẻ đang xem cuộc hội thoại đó trong phần Inbox (Quản trị).
- **Steps to Reproduce:**
  1. Ở giao diện Inbox của chủ thẻ, nhấn vào nút "Tiếp quản trò chuyện" (hoặc Tạm dừng AI).
- **Expected Result:**
  - **Frontend:** Nút chuyển sang trạng thái "Đang tiếp quản" hoặc "Nhường quyền cho AI". UI chatbox của chủ thẻ được mở khóa để có thể nhập tin nhắn. Về phía Khách hàng (nếu áp dụng), có thể hiển thị thông báo "Chủ thẻ đã tham gia trò chuyện".
  - **Backend:** Gửi API `PUT /api/v1/cards/:cardId/takeover` (với body: `{ isAiPaused: true }`). Cập nhật cờ `isAiPaused` thành `true` trong Database. Trả về HTTP 200 OK.

#### **TC-02 - Chat Realtime giữa Khách và Chủ thẻ (Happy Path)**
- **Test Type:** E2E
- **Priority:** High
- **Pre-condition:** Cờ `isAiPaused` đang là `true`.
- **Steps to Reproduce:**
  1. Chủ thẻ nhập tin nhắn và gửi từ Inbox.
  2. Khách hàng nhận được tin nhắn và phản hồi lại.
- **Expected Result:**
  - **Frontend:** Tin nhắn hiển thị ngay lập tức ở cả hai bên (qua WebSocket/Firebase Realtime/Polling). Tin nhắn của chủ thẻ hiển thị avatar thật thay vì avatar của AI.
  - **Backend:** Các tin nhắn gửi từ cả hai phía đều được lưu vào mảng messages của phiên chat đó trên Firestore và KHÔNG kích hoạt webhook gọi sang OpenRouter/LLM.

#### **TC-03 - Tắt chế độ Tiếp quản, trao quyền lại cho AI (Happy Path)**
- **Test Type:** UI / API
- **Priority:** Medium
- **Pre-condition:** Chủ thẻ đang trực tiếp chat với khách (`isAiPaused: true`).
- **Steps to Reproduce:**
  1. Ở giao diện Inbox, chủ thẻ nhấn nút "Nhường quyền cho AI" (Mở lại AI).
  2. Khách nhắn một tin nhắn mới.
- **Expected Result:**
  - **Frontend:** UI chủ thẻ khóa ô nhập liệu (hoặc báo AI đang hoạt động). Phía khách hàng, khi gửi tin nhắn sẽ thấy hiệu ứng "AI đang gõ...".
  - **Backend:** API cập nhật `isAiPaused` thành `false`. Khi khách nhắn tin mới, Backend lại tiếp tục gọi sang LLM API bình thường.

#### **TC-04 - Cố tình gọi API AI Chat khi đang Takeover (Negative Path)**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Thẻ đang được bật `isAiPaused: true`.
- **Steps to Reproduce:**
  1. Dùng Postman bắn trực tiếp tin nhắn vào endpoint `POST /api/v1/chat/cards/:cardId/chat` (API dành riêng cho bot AI).
- **Expected Result:**
  - **Frontend:** (Bypass UI).
  - **Backend:** Middleware/Controller kiểm tra thấy `isAiPaused == true` và lập tức từ chối request, trả về HTTP 403 Forbidden hoặc HTTP 400 kèm message: "Tính năng AI đang bị tạm dừng bởi chủ thẻ. Vui lòng gửi tin nhắn tĩnh." Tránh làm tốn token vô ích.

#### **TC-05 - Xung đột luồng chat / Race Condition (Core Risk)**
- **Test Type:** E2E / Logical
- **Priority:** High
- **Pre-condition:** Khách và AI đang nhắn tin liên tục.
- **Steps to Reproduce:**
  1. Khách vừa nhấn gửi câu hỏi khó cho AI.
  2. Cùng lúc đó (trong vài mili-giây), Chủ thẻ nhấn "Tiếp quản".
  3. AI (do độ trễ) vẫn phản hồi lại sau 3 giây.
- **Expected Result:**
  - **Frontend:** Tránh tình trạng "chen ngang". UI khách hàng có thể hiển thị câu trả lời cuối cùng của AI, sau đó báo chủ thẻ đã tham gia.
  - **Backend:** Dù AI có trả kết quả về, nhưng trước khi lưu kết quả đó vào DB và push xuống client, hệ thống phải check lại cờ `isAiPaused`. Nếu đã thành `true`, vứt bỏ (discard) kết quả của AI để không làm rối mạch chat của chủ thẻ thật. Hoặc lưu dưới dạng hidden message. Mức độ ưu tiên của người thật luôn cao hơn AI.
