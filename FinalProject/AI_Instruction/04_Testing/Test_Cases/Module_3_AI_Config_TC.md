# 📋 TEST CASES: MODULE 3 - CẤU HÌNH AI & NẠP TRI THỨC

#### **TC-01 - Cấu hình AI & Knowledge Base thành công (Happy Path)**
- **Test Type:** E2E / API
- **Priority:** High
- **Pre-condition:** User đã tạo Card thành công và truy cập tab "Cấu hình AI".
- **Steps to Reproduce:**
  1. Nhập "System Prompt" (Ví dụ: Bạn là trợ lý ảo thân thiện).
  2. Chọn "Tone of Voice" (Ví dụ: Chuyên nghiệp).
  3. Điền vào form Knowledge Base (Kỹ năng, Kinh nghiệm làm việc, Dự án).
  4. Nhấn nút "Lưu Cấu Hình AI".
- **Expected Result:**
  - **Frontend:** Nút lưu hiển thị trạng thái "Đang xử lý...", sau đó hiện Toast message "Cấu hình AI thành công". Giao diện cập nhật trạng thái AI thành "AI Ready".
  - **Backend:** Nhận request PUT `/:cardId/ai-config`. Chuyển đổi dữ liệu Form thành chuỗi JSON hợp lệ (`persona_data.json` format) lưu vào DB. Trả về HTTP 200 OK.

#### **TC-02 - Bỏ trống các trường cấu hình quan trọng (Negative Path)**
- **Test Type:** UI / API
- **Priority:** Medium
- **Pre-condition:** Đang ở màn hình Cấu hình AI.
- **Steps to Reproduce:**
  1. Xóa trắng nội dung trong ô "System Prompt".
  2. Để trống toàn bộ Form Knowledge Base.
  3. Nhấn nút "Lưu Cấu Hình AI".
- **Expected Result:**
  - **Frontend:** Chặn gửi dữ liệu. Highlight viền đỏ ở ô "System Prompt" kèm dòng chữ báo lỗi "System Prompt không được để trống".
  - **Backend:** (Không được gọi). Nếu test bằng API trực tiếp, trả về HTTP 400 Bad Request kèm message lỗi do rỗng field bắt buộc.

#### **TC-03 - Lỗi cú pháp JSON sinh ra (Core Risk)**
- **Test Type:** API / E2E
- **Priority:** High
- **Pre-condition:** Form cho phép nhập các ký tự đặc biệt (như nháy kép `""`, ký tự escape `\`).
- **Steps to Reproduce:**
  1. Nhập vào ô Kinh nghiệm làm việc: `Tôi đã làm việc tại "Công ty ABC" với \ các đối tác lớn`.
  2. Lưu cấu hình.
  3. (Hành động Test RAG ngầm): Gọi thử API chat với AI xem có bị lỗi Parse JSON không.
- **Expected Result:**
  - **Frontend:** Vẫn báo lưu thành công bình thường.
  - **Backend:** Chuỗi JSON sinh ra `persona_data` phải được xử lý (Sanitize) và Escape các ký tự đặc biệt một cách an toàn. Tuyệt đối không để xảy ra lỗi `JSON.parse()` ở bước RAG sau này.

#### **TC-04 - Nhập nội dung quá dài vượt Token Limit (Core Risk)**
- **Test Type:** API / UI
- **Priority:** High
- **Pre-condition:** Hệ thống có giới hạn độ dài nội dung để tránh tràn context window (Token limit).
- **Steps to Reproduce:**
  1. Dán một đoạn văn bản (Kinh nghiệm làm việc) cực dài (ví dụ > 50,000 ký tự).
  2. Nhấn "Lưu Cấu Hình AI".
- **Expected Result:**
  - **Frontend:** Chặn nhập liệu vượt quá giới hạn ký tự (max-length attribute). Hoặc hiển thị báo lỗi "Nội dung vượt quá giới hạn cho phép (VD: 10,000 ký tự)".
  - **Backend:** Nếu bypass Frontend, API phải bắt lỗi validation giới hạn chuỗi và trả về HTTP 413 Payload Too Large hoặc 400 Bad Request.

#### **TC-05 - Truy cập trái phép Cấu hình AI của người khác (Security)**
- **Test Type:** API / Security
- **Priority:** High
- **Pre-condition:** Đăng nhập bằng tài khoản User A. Biết được `cardId` của User B.
- **Steps to Reproduce:**
  1. Dùng Postman hoặc console, gửi API `PUT /api/v1/cards/<cardId_của_User_B>/ai-config` kèm token của User A.
  2. Đính kèm payload hợp lệ.
- **Expected Result:**
  - **Frontend:** (Không thể test qua UI vì UI không hiển thị thẻ của người khác).
  - **Backend:** Trả về HTTP 403 Forbidden. Nội dung: "Bạn không có quyền chỉnh sửa thẻ này". Dữ liệu AI của User B không bị thay đổi.
