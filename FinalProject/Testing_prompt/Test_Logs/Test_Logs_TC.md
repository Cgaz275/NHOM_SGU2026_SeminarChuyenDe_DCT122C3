# 📜 TEST LOGS

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 1 - Xác thực & Người dùng
**Tổng số Test Cases:** 6
**Ghi chú:** Đã cover đầy đủ luồng đăng nhập Google và Magic Link. Backend cần lưu ý thiết lập Middleware bắt buộc check token cho các API Routes. Frontend đặc biệt chú ý xử lý UI (bỏ block Loading) khi Timeout Firebase, không để màn hình bị treo.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 2 - Quản lý Thẻ & Profile Builder
**Tổng số Test Cases:** 6
**Ghi chú:** Đã tập trung cover nhánh Privacy Leak đặc biệt quan trọng (TC-05) yêu cầu Backend phải lọc dữ liệu cá nhân trước khi trả về. Các rủi ro về sinh file danh bạ VCF chuẩn (tiếng Việt không bị lỗi font) và mã QR Code cũng đã được nhắc nhở cụ thể để Tester/Dev lưu ý kiểm tra trực tiếp trên nền tảng Mobile.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 3 - Cấu hình AI & Nạp tri thức
**Tổng số Test Cases:** 5
**Ghi chú:** Đã bao phủ các trường hợp sinh lỗi cú pháp JSON và vượt Token Limit. Quan trọng nhất là TC-05 (Security) yêu cầu Backend phải kiểm tra chặt chẽ quyền sở hữu (ownership) của cardId trước khi cho phép Cập nhật AI, tránh trường hợp user này sửa cấu hình AI của user khác.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 4 - Tương tác Chatbot AI (RAG)
**Tổng số Test Cases:** 6
**Ghi chú:** Trọng tâm của Module này nằm ở các rủi ro cốt lõi: Spam Rate Limit (TC-04), Prompt Injection (TC-05), và AI Hallucination (TC-06). Backend cần phối hợp với AI Middleware để validate chặt chẽ rate limit cũng như thiết lập Guardrails cho System Prompt nhằm tránh bị khách thao túng.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 5 - Fallback & Inbox
**Tổng số Test Cases:** 6
**Ghi chú:** Đã cover đầy đủ quy trình thao tác gửi Form, xem/xóa tin nhắn. Cần đặc biệt lưu ý TC-06: Đây là tính năng Graceful Degradation (chuyển đổi mềm mại). Nếu API Chat chết, hệ thống phải tự động fallback qua Form tĩnh để không mất Lead. Backend cũng phải thiết lập Rate Limit chặt chẽ (TC-05) để tránh bị phá hoại bằng cách spam form liên hệ.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 6 - Human Takeover
**Tổng số Test Cases:** 5
**Ghi chú:** Đã cover đầy đủ các trường hợp Bật/Tắt chế độ Takeover và Chat Realtime. Vấn đề cốt lõi nhất cần Frontend và Backend phối hợp xử lý là Xung đột luồng chat (Race Condition - TC-05): Phải đảm bảo hủy bỏ (discard) câu trả lời từ AI nếu chủ thẻ đã bấm nút Tiếp quản, tránh việc AI nói leo vào cuộc trò chuyện của người thật.

---

**Ngày cập nhật:** 2026-05-16
**Module hoàn thành:** Module 7 - Quản trị (Admin Panel)
**Tổng số Test Cases:** 5
**Ghi chú:** Trọng tâm đặc biệt của Module này là kiểm thử Security (TC-05: Broken Access Control). Tester bắt buộc phải giả lập tài khoản User thường để gọi các API Admin. Yêu cầu Backend đảm bảo tất cả các endpoint thuộc nhánh `/users` và `/reports` (ngoại trừ hàm tạo report public) đều phải được bọc bởi middleware `verifyAdmin` trả về 403.
