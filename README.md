# Repo Nhóm - Seminar Chuyên Đề - DCT122C3

## 1. Thông tin tổng quan

- **Nội dung chuyên đề:** Vibe Coding/Low-Code/No-Code trong tương lai của ngành Kỹ nghệ Phần mềm
- **Học phần:** Seminar Chuyên Đề
- **GVHD:** TS. Đỗ Như Tài
- **Lớp:** DCT122C3 - CNTT CLC
- **Thành viên nhóm:**
  - Châu Gia Anh - 3122411002
  - Đào Thị Thanh Tâm - 3122411182
  - Dương Lê Khánh - 3122411093
  - Phan Thành Đại - 3122411036

## 2. Cấu trúc dự án

Repo được chia thành hai phần chính:

### 📚 Exercises (Thư mục bài tập)
Chứa các bài tập thực hành trong suốt khóa học:

| Thư mục | Mô tả |
|---------|-------|
| [Exercises/Week1_WorkshopCopilot](./Exercises/Week1_WorkshopCopilot) | Giới thiệu GitHub Copilot và Vibe Coding |
| [Exercises/Week2_N8N](./Exercises/Week2_N8N) | Thực hành công cụ N8N cho automation |
| [Exercises/Week05_Cơ sở lập trình với GenAI](./Exercises/Week05_Cơ%20sở%20lập%20trình%20với%20GenAI) | Các lab cơ bản về lập trình với GenAI  |
| [Exercises/Week06_Nâng cao lập trình với GenAI](./Exercises/Week06_Nâng%20cao%20lập%20trình%20với%20GenAI) | Các lab nâng cao  |
| [Exercises/Week07_Xây dựng sản phẩm phần mềm dùng GenAI](./Exercises/Week07_Xây%20dựng%20sản%20phẩm%20phần%20mềm%20dùng%20GenAI) | Thực hành xây dựng sản phẩm  |

### 🚀 FinalProject (Dự án cuối kỳ)
Dự án chính: **Persona-based Digital Twin Card**

Một nền tảng web cho phép người dùng tạo thẻ giới thiệu kỹ thuật số (Digital Business Card) với AI Digital Twin - một chatbot đại diện 24/7.

**Cấu trúc FinalProject:**

| Thư mục | Mô tả |
|---------|-------|
| [FinalProject/Frontend](./FinalProject/Frontend) | Ứng dụng Next.js (TypeScript, React) - Giao diện người dùng |
| [FinalProject/Backend](./FinalProject/Backend) | Node.js/Express API - Backend services |
| [FinalProject/AI_Instruction](./FinalProject/AI_Instruction) | Tài liệu hướng dẫn AI, thiết kế hệ thống |
| [FinalProject/Testing](./FinalProject/Testing) | Kế hoạch kiểm thử và báo cáo |

## 3. Sơ đồ cây Repository

```
NHOM_SGU2026_SeminarChuyenDe_DCT122C3/
│
├── 📂 Exercises/                              # Các bài tập thực hành
│   ├── Week1_WorkshopCopilot/                # GitHub Copilot Workshop
│   ├── Week2_N8N/                            # N8N Automation
│   ├── Week05_Cơ sở lập trình với GenAI/     # GenAI Basics (Lab 2-5)
│   ├── Week06_Nâng cao lập trình với GenAI/  # GenAI Advanced (Lab 6-11)
│   └── Week07_Xây dựng sản phẩm...GenAI/    # Product Development (ch12-15)
│
├── 📂 FinalProject/                          # Dự án cuối kỳ: Digital Twin Card
│   ├── 📂 Frontend/                          # Next.js + TypeScript + React
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   │
│   ├── 📂 Backend/                           # Node.js + Express API
│   │   ├── src/
│   │   ├── tests/
│   │   ├── firebase/
│   │   └── package.json
│   │
│   ├── 📂 AI_Instruction/                    # Tài liệu & Hướng dẫn
│   │   ├── PRD.md
│   │   ├── Architecht & Database.md
│   │   ├── System_Core_Features.md
│   │   ├── Backend/
│   │   ├── Frontend/
│   │   └── Testing/
│   │
│   ├── 📂 Testing/                           # Kế hoạch kiểm thử
│   │   └── README.md
│   │
│   └── 📂 private/                           # Tài liệu nội bộ
│       ├── START_HERE.md
│       ├── QUICK_REFERENCE.md
│       └── ...
│
├── 📄 README.md                              # File này
├── 📄 CommitLog.md                           # Nhật ký commit chung
└── 📄 CommitLogBE.md                         # Nhật ký commit Backend
```

### Hướng dẫn sử dụng:
- **Để xem bài tập:** Truy cập thư mục `Exercises/` với các tuần tương ứng
- **Để phát triển dự án:** Xem `FinalProject/Frontend` và `FinalProject/Backend`
- **Để hiểu kiến trúc:** Tham khảo `FinalProject/AI_Instruction/`
- **Để chạy dự án:** Xem phần hướng dẫn sử dụng bên dưới

## 4. Hướng dẫn sử dụng (FinalProject)

### 📋 Yêu cầu
- Node.js (v16+)
- npm hoặc yarn
- ngrok (nếu muốn chạy QR code trên mobile)

### 🚀 Hướng dẫn khởi chạy

#### Bước 1: Cài đặt dependencies riêng cho Frontend và Backend

**Frontend:**
```bash
cd FinalProject/Frontend
npm install
```

**Backend:**
```bash
cd FinalProject/Backend
npm install
```

#### Bước 2: Thiết lập cấu hình

Tạo file `.env` trong mỗi thư mục hoặc sao chép từ `.env.example`:
- `FinalProject/Frontend/.env.local` (nếu cần)
- `FinalProject/Backend/.env` (để kết nối Firebase, OpenAI, etc.)

#### Bước 3: Chạy ứng dụng

**Tuỳ chọn A - Chạy Backend trên localhost:5000 + Frontend trên localhost:3000**

Mở 2 terminal:

**Terminal 1 - Backend:**
```bash
cd FinalProject/Backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd FinalProject/Frontend
npm run dev
```

Truy cập: `http://localhost:3000`

---

**Tuỳ chọn B - Expose Frontend qua ngrok (để chạy QR code trên mobile)**

Chạy Backend trên localhost:5000 (Terminal 1), sau đó expose Frontend:

**Terminal 3 - Ngrok (expose Frontend):**
```bash
# Giả sử Frontend chạy trên localhost:3000
ngrok http 3000
```

Sử dụng URL từ ngrok (ví dụ: `https://xxxxx-xx-xxx.ngrok.io`) để chia sẻ QR code với mobile.

---

**Tuỳ chọn C - Chạy Backend riêng biệt (sử dụng Backend API từ port 5000)**

Nếu chỉ muốn chạy Backend API:
```bash
cd FinalProject/Backend
npm run dev
# Backend chạy trên http://localhost:5000
```

Frontend sẽ kết nối qua API endpoint `http://localhost:5000`

### 📝 Ghi chú
- **Frontend** sử dụng Next.js, chạy mặc định trên port **3000**
- **Backend** sử dụng Express, chạy mặc định trên port **5000**
- Để chạy QR code trên thiết bị mobile, cần expose Frontend qua **ngrok**
- Kiểm tra file `.env` để đảm bảo API endpoints được cấu hình đúng

