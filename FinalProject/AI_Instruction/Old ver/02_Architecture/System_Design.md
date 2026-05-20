# Cấu trúc thư mục dự án

## Tổng quan
Dự án được cấu trúc theo dạng Monorepo bao gồm hai phần chính:
- **Frontend (FE):** Ứng dụng Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- **Backend (BE):** Ứng dụng Node.js, Express v5 kết hợp Firebase Admin SDK.

## Cấu trúc thư mục tổng quát

```text
.
├── AI_Instruction/      # Tài liệu hướng dẫn, PRD, WebStructure
├── Backend/             # Máy chủ API Node.js/Express
│   ├── src/
│   │   ├── config/      # Khởi tạo Firebase Admin, Swagger
│   │   ├── controllers/ # Xử lý logic API (Request/Response)
│   │   ├── middlewares/ # Trạm trung chuyển (Xác thực JWT, Rate Limiter)
│   │   ├── routes/      # Định tuyến API
│   │   ├── services/    # Logic lõi, kết nối CSDL (Firestore, OpenAI)
│   │   ├── utils/       # Hàm hỗ trợ (vd: promptBuilder)
│   │   └── server.js    # Điểm khởi chạy Backend
│   ├── .env             # Biến môi trường Backend
│   └── package.json     # Chứa thư viện Backend
├── Frontend/            # Ứng dụng Giao diện Next.js
│   ├── app/             # Kiến trúc Next.js App Router
│   ├── components/      # Các thành phần UI có thể tái sử dụng
│   ├── context/         # Quản lý trạng thái toàn cục (AuthContext)
│   ├── lib/             # Hàm tiện ích (apiClient, firebase config)
│   ├── services/        # Các hàm gọi API từ Frontend
│   ├── types/           # Định nghĩa kiểu dữ liệu TypeScript
│   ├── .env.local       # Biến môi trường Frontend
│   └── package.json     # Chứa thư viện Frontend
├── AGENTS.md            # Quy ước hoạt động cho AI
├── CLAUDE.md            # Tham chiếu quy tắc AI
└── README.md            # Mô tả tổng quan dự án
```

---

## Giải thích chi tiết các phân hệ

### 1. `AI_Instruction/` (Tài liệu Hướng dẫn Trí tuệ Nhân tạo & Quy ước)
Đây là thư mục não bộ chứa các tài liệu định hướng để AI (Agent) và Lập trình viên hiểu ngữ cảnh dự án.
- **`PRD.md` (Product Requirements Document):** Tài liệu đặc tả yêu cầu sản phẩm. Liệt kê mục tiêu, các tính năng (Scope), công nghệ (Tech Stack) và các luồng sự kiện (Use Cases) chính như Real-time Kick-out, Sync QR.
- **`WebStructure.md`:** (Chính là file này) - Bản đồ chi tiết giải phẫu cấu trúc thư mục toàn hệ thống.

### 2. Các file Cấu hình & Tài liệu Quy ước (Root & Config Files)
- **`AGENTS.md` & `CLAUDE.md`:** Khai báo các quy tắc ứng xử, System Prompt đặc thù để định hướng các trợ lý AI (như Antigravity/Claude) không phá vỡ cấu trúc code.
- **`README.md`:** Tài liệu giới thiệu dự án dành cho con người đọc khi clone repo.
- **`Frontend/next.config.ts`:** Cấu hình cốt lõi của Next.js (như cấu hình CORS, Image domains).
- **`Frontend/tailwind.config.ts` (hoặc `postcss.config.mjs`):** Cấu hình hệ thống Design System, màu sắc giao diện.
- **`Frontend/tsconfig.json` & `eslint.config.mjs`:** Bộ quy chuẩn kiểm tra lỗi và biên dịch TypeScript.
- **`.env` (BE) & `.env.local` (FE):** Các tệp chứa khóa bí mật (Secret Keys), URL API và Firebase Config. Tuyệt đối không commit lên Git.

---

### 3. `Frontend/` (Giao diện & Trải nghiệm Người dùng)
#### Các Trang (Routing - `app/`)
- `app/layout.tsx`: Giao diện bọc toàn app (Navbar chung, Auth Provider).
- `app/login/` & `app/register/`: Phân hệ Xác thực.
- `app/dashboard/`: Phân hệ quản trị dành cho Chủ thẻ (Cấu hình thẻ, tạo AI, Inbox).
- `app/admin/`: Phân hệ quản trị hệ thống dành cho Admin (Quản lý User, Báo cáo vi phạm).
- `app/u/[username]/`: Đường dẫn động (Dynamic Route) hiển thị Trang Danh thiếp Công khai.
- `app/about/`, `app/teamproject/`, `app/digital-twin/`: Các trang Landing giới thiệu Đề tài Seminar.

#### Các Thành phần tái sử dụng (`components/`)
- `admin/`, `ai-twin/`, `dashboard/`, `inbox/`, `public-profile/`: Từng cụm UI phục vụ cho các trang phía trên.
- `ui/`: Các thành phần nguyên thủy (Button, Input, Modal, Toast...).

#### Xử lý trạng thái & Tiện ích (`context/` & `lib/`)
- `context/AuthContext.tsx`: Quản lý toàn bộ phiên đăng nhập bằng Firebase Auth. **Đặc biệt:** Tích hợp tính năng Real-time listener (`onSnapshot`) để đá (kick-out) người dùng văng ra khỏi hệ thống tức thì nếu tài khoản bị Admin khóa.
- `lib/apiClient.ts`: HTTP Client giao tiếp với Backend. **Đặc biệt:** Tích hợp cơ chế *Silent Refresh* (Tự động gia hạn Token ngầm qua Firebase SDK) để tránh văng phiên làm việc.

---

### 4. `Backend/` (Hệ thống Xử lý & Cơ sở dữ liệu)
Toàn bộ sức mạnh tính toán và kết nối API nằm trong `src/`:
- **`config/`:** Nơi khởi tạo kết nối Database (Firebase Admin) và tài liệu hóa API tự động bằng Swagger.
- **`middlewares/`:** 
  - `authMiddleware.js`: Trạm gác kiểm tra Token có hợp lệ và tài khoản có bị `banned` hay không.
  - `rateLimiter.js`: Trạm gác chống Spam (DDoS) bảo vệ API và ngăn cháy ngân sách OpenAI.
- **`services/` (Nghiệp vụ lõi):**
  - `aiService.js`: Kết nối OpenAI SDK, xử lý RAG, truyền JSON bối cảnh để AI Chatbot hóa thân thành chủ thẻ.
  - `cardService.js`: CRUD dữ liệu danh thiếp số.
  - `authService.js` & `userService.js`: Đồng bộ tài khoản, xử lý cấp quyền (Admin/User).
  - `reportService.js`: Xử lý báo cáo vi phạm, ánh xạ `cardId` ra `userId` để phục vụ tính năng khóa tài khoản.
- **`server.js`:** Điểm khởi chạy của toàn bộ máy chủ API Express.
