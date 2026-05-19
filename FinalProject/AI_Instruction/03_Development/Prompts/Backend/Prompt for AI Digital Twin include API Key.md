“Đóng vai trò là Senior Backend Engineer. Hiện tại hệ thống đã chạy thành công luồng Mock Chat. Nhiệm vụ của bạn bây giờ là tích hợp thẳng OpenAI API vào hệ thống. Hãy làm tự động các bước sau:
Nhiệm vụ 1: Cài đặt thư viện Hãy chạy lệnh terminal sau để cài đặt thư viện: npm install openai
Nhiệm vụ 2: Cấu hình môi trường Mở file .env ở thư mục gốc Backend. Nếu chưa có, hãy thêm dòng này vào cuối file: OPENAI_API_KEY="YOUR_OPENAI_API_KEY_HERE" (Chỉ thêm vào, tuyệt đối không làm xóa mất các cấu hình env khác).
Nhiệm vụ 3: Tích hợp vào src/services/aiService.js Viết lại hàm processChat để gọi OpenAI API thật. Yêu cầu logic:
1.	Import OpenAI từ package openai và khởi tạo client với apiKey lấy từ process.env.OPENAI_API_KEY.
2.	Giữ nguyên logic kiểm tra status, aiStatus, isAiPaused và việc lấy cardData, globalRules, toneInstruction.
3.	Lắp ráp System Prompt hoàn chỉnh bằng Template Literal, bao gồm:
o	Định danh: "Bạn là trợ lý AI ảo đại diện cho [cardData.fullName]."
o	[LUẬT CHUNG]: JSON.stringify(globalRules.Guardrails) và globalRules.AI_Reading_Guide.
4.	Gọi API openai.chat.completions.create:
o	Model: Dùng gpt-4o-mini (hoặc model tối ưu chi phí nhất hiện tại).
o	Messages: Truyền system_prompt (role: system) và userMessage (role: user).
o	Temperature: 0.7.
5.	Lấy nội dung trả về từ LLM (response.choices[0].message.content) và return kết quả đó. Cập nhật try...catch để bắt lỗi khi gọi OpenAI API.”
