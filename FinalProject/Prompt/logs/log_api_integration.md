# Nhật ký Tích hợp API (API Integration Log)

## Tích hợp Chức năng Đăng nhập (Login)
- **Thời gian hoàn thành:** 2026-05-17 14:30:00
- **Luồng tích hợp (Flow):** `LoginForm.tsx` -> `authService.ts` -> `apiClient.ts` -> `POST http://localhost:5000/api/v1/auth/login`
- **Những gì đã thực hiện:**
  1. `[NEW]` Tạo `Frontend/lib/apiClient.ts` (Sử dụng native Fetch API, setup BaseURL và Interceptor cho Token).
  2. `[NEW]` Tạo `Frontend/services/authService.ts` (Tạo hàm `loginService` mapping payload `{email, password}`).
  3. `[MODIFIED]` Cập nhật `Frontend/components/auth/LoginForm.tsx`: Thay thế hàm mock `loginWithEmail` bằng `loginService`, bắt chuẩn kết quả `{ success, data, message }` và lưu token vào `localStorage`.
  4. `[CHECKED]` Kiểm tra cấu hình CORS trong `Backend/src/server.js`: Đã có `app.use(cors())`.
- **Kết quả:** `Thành công (Success)`
- **Giải thích lý do:** Đã thiết lập thành công API Client và Service Layer, thay thế mock logic cũ bằng việc gọi API thực tế. Component UI cũng đã được điều chỉnh luồng State (`Loading`, `Success`, `Error`) để phù hợp với định dạng JSON Contract chuẩn từ Backend. Do Backend đã có cấu hình CORS nên luồng gọi thẳng từ localhost:3000 -> localhost:5000 là khả thi.
