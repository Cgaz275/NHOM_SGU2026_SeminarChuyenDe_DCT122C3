# 🔌 PROMPT: KẾT NỐI API (FRONTEND - BACKEND INTEGRATION)

## 1. VAI TRÒ & NGỮ CẢNH (ROLE & CONTEXT)
- **Vai trò:** Senior Full-Stack AI Engineer.
- **Ràng buộc cốt lõi:** Tuân thủ tuyệt đối các quy định về kiến trúc và giao tiếp dữ liệu được định nghĩa trong `system_guideline.md`.
- **Trạng thái hiện tại:** Frontend UI Component (`[Tên_Component.tsx]`) và Backend API Endpoint (`[METHOD] [URL_API]`) đã được khởi tạo độc lập.
- **Nhiệm vụ:** Thực hiện quy trình tích hợp (API Integration) để Frontend có thể giao tiếp và xử lý dữ liệu từ Backend.

## 2. QUY TRÌNH TÍCH HỢP (INTEGRATION WORKFLOW)

Vui lòng thực hiện việc kết nối theo đúng trình tự 4 bước kỹ thuật sau:

### Bước 1: Khởi tạo/Kiểm tra API Client (Frontend Base Config)
- **Mục tiêu:** Cấu hình module HTTP Client tập trung (sử dụng `Axios` hoặc `Fetch`).
- **Yêu cầu kỹ thuật:**
  - Set Base URL mặc định là `http://localhost:5000/api/v1` (Ưu tiên tham chiếu qua biến môi trường như `NEXT_PUBLIC_API_URL` nếu có).
  - Setup Interceptors: Cấu hình cơ chế tự động đính kèm `Authorization: Bearer <Token>` vào Request Headers đối với các Private Routes.

### Bước 2: Xây dựng Service Layer (Frontend Data Fetching)
- **Mục tiêu:** Khởi tạo file Service riêng biệt (VD: `[Tên_Feature]Service.ts`) để đóng gói logic gọi API.
- **Yêu cầu kỹ thuật:**
  - Viết các hàm xử lý bất đồng bộ (async/await).
  - Định nghĩa Type/Interface (TypeScript) rõ ràng cho Payload Request và cấu trúc Response.
  - **Bắt buộc:** Logic trả về phải tuân thủ chuẩn Data Contract: `{ success: boolean, data: any, message: string }`.

### Bước 3: Tích hợp vào UI Component (State & UI Rendering)
- **Mục tiêu:** Cập nhật UI Component hiện tại (`[Tên_Component.tsx]`) để gọi Service và phản hồi dữ liệu lên giao diện.
- **Yêu cầu kỹ thuật:**
  - Cấu hình các React Hooks quản lý luồng dữ liệu (`useState`, `useEffect` hoặc các thư viện Fetching hiện có).
  - Bắt buộc xử lý toàn vẹn 3 trạng thái vòng đời của một HTTP Request:
    - **Pending (Loading):** Render các element chờ (Spinner/Skeleton) để tránh block UI.
    - **Fulfilled (Success):** Cập nhật state với dữ liệu từ `res.data` và render UI tương ứng.
    - **Rejected (Error):** Bắt ngoại lệ (`try...catch` hoặc check `res.success === false`), hiển thị cơ chế Error Boundary hoặc Toast Notification chứa nội dung từ `res.message`.

### Bước 4: Kiểm thử Cấu hình Middleware (Backend CORS)
- **Mục tiêu:** Đảm bảo Backend không chặn Cross-Origin Resource Sharing từ Frontend.
- **Yêu cầu kỹ thuật:**
  - Phân tích code khởi tạo server hiện hành (Ví dụ: `server.js`, `app.ts`).
  - Cung cấp đoạn code bổ sung cấu hình `cors` middleware nếu Backend chưa được mở port cho origin của Frontend (thường là `http://localhost:3000`).

### Bước 5: Ghi nhận Nhật ký Tích hợp (Integration Logging)
- **Mục tiêu:** Lưu vết lịch sử và đánh giá kết quả của quá trình tích hợp API.
- **Yêu cầu kỹ thuật:**
  - Sau khi sinh code hoàn tất, tự động khởi tạo hoặc cập nhật file log tại đường dẫn: `Prompt/logs/log_api_integration.md`.
  - Cấu trúc nội dung log **BẮT BUỘC** phải có đủ các trường sau:
    1. **Thời gian hoàn thành:** Timestamp tại thời điểm hoàn tất.
    2. **Luồng tích hợp (Flow):** Tóm tắt luồng dữ liệu (VD: `Component X -> Service Y -> Route Z`).
    3. **Những gì đã thực hiện:** Liệt kê rõ các file đã được chỉnh sửa/tạo mới.
    4. **Kết quả:** Đánh giá `Thành công (Success)` hoặc `Thất bại (Failed)`.
    5. **Giải thích lý do:** Giải thích vì sao thành công (đã map đúng `{ success, data, message }`...) hoặc vì sao thất bại (gặp lỗi CORS, sai kiểu dữ liệu...) kèm hướng khắc phục.

---
**THÔNG TIN ĐẦU VÀO TỪ USER:**
- **Chức năng cần tích hợp:** `[Nhập tên chức năng]`
- **File UI Component đích:** `[Nhập tên file FE]`
- **API Endpoint đích:** `[Nhập Method & URL BE]`

*Lưu ý: Bắt buộc ghi rõ đường dẫn tuyệt đối/tương đối tại dòng đầu tiên của mỗi block code được sinh ra.*
