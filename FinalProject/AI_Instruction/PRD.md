# PRODUCT REQUIREMENT DOCUMENT
## Persona-Based Digital Twin Card Platform

**Học phần:** Seminar Chuyên Đề  
**Giáo viên hướng dẫn:** TS. Đỗ Như Tài  
**Lớp:** DCT122C3  
**Trường:** Đại học Sài Gòn - Khoa Công Nghệ Thông Tin

---

## 📋 Thông Tin Dự Án

| Thông Tin | Chi Tiết |
|-----------|----------|
| **Tên Dự Án** | Persona-Based Digital Twin Card Platform |
| **Mô Tả Ngắn** | Nền tảng web cho phép người dùng tạo thẻ giới thiệu kỹ thuật số (Digital Business Card) với AI Digital Twin - một chatbot đại diện 24/7 |
| **Loại Dự Án** | Seminar Chuyên Đề (Learning Project) |
| **Giai Đoạn Hiện Tại** | Demo MVP |

---

## 👥 Thành Viên Dự Án

| STT | Họ và Tên | MSSV |
|-----|----------|------|
| 1 | Châu Gia Anh | 3122411002 |
| 2 | Dương Lê Khánh | 3122411093 |
| 3 | Phan Thành Đại | 3122411036 |
| 4 | Đào Thị Thanh Tâm | 3122411182 |

---

## 📚 Mục Lục

1. [Giới thiệu](#-giới-thiệu)
2. [Mục tiêu](#-mục-tiêu)
3. [Đối tượng người dùng](#-đối-tượng-người-dùng)
4. [Tổng quan hệ thống](#-tổng-quan-hệ-thống)
5. [Yêu cầu chức năng](#-yêu-cầu-chức-năng)
6. [Yêu cầu phi chức năng](#-yêu-cầu-phi-chức-năng)
7. [Công nghệ và kiến trúc](#-công-nghệ-và-kiến-trúc)
8. [Phạm vi dự án](#-phạm-vi-dự-án)
9. [Rủi ro và giả định](#-rủi-ro-và-giả-định)
10. [User Stories](#-user-stories)
11. [Use Cases](#-use-cases)

---

## 🎯 Giới thiệu

**Persona-Based Digital Card** là một nền tảng web hiện đại cho phép người dùng tạo thẻ giới thiệu kỹ thuật số (Digital Business Card) được cá nhân hóa sâu theo từng persona.

### Vấn đề giải quyết:
- Thay vì tấm name card vật lý tĩnh, hệ thống cung cấp trang hồ sơ **động** được chia sẻ qua QR Code hoặc URL
- Tích hợp **AI Digital Twin** - một chatbot thông minh đóng vai trò là "bản sao kỹ thuật số" của chủ thẻ
- AI được huấn luyện dựa trên thông tin, dự án và tính cách của chủ thẻ
- Có thể giao tiếp, trả lời câu hỏi và tư vấn trực tiếp cho khách truy cập **24/7**

### Đối tượng chính:
1. **Chủ thẻ (Card Owner):** Người dùng tạo Digital Card
2. **Khách truy cập (Guest):** Người nhận QR hoặc link
3. **Quản trị viên (Admin):** Vận hành nền tảng

---

## 🎯 Mục Tiêu

### 2.1. Business Goals

- ✅ Xây dựng thương hiệu cá nhân mạnh mẽ trên môi trường số
- ✅ Tạo công cụ networking hiệu quả, thay thế name card truyền thống
- ✅ Tăng khả năng chuyển đổi từ người xem thành khách hàng/đối tác thực sự

### 2.2. User Goals

**Chủ thẻ:**
- Nhanh chóng thiết lập hồ sơ chuyên nghiệp
- Chia sẻ dễ dàng qua QR / NFC

**Khách truy cập:**
- Xem thông tin rõ ràng
- Trò chuyện trực tiếp với AI đại diện của chủ thẻ
- Tìm hiểu sâu hơn mà không cần chờ đợi

### 2.3. Success Metrics

| Chỉ số | Mục tiêu | Cách đo |
|--------|----------|---------|
| Thời gian trung bình trên site | > 3 phút | Google Analytics |
| Số QR code được tạo (tuần đầu) | > 50 thẻ | Database count |
| Tỷ lệ lưu danh bạ (VCF) | > 30% | Button click tracking |
| Điểm Lighthouse (Performance + SEO) | > 90 | Lighthouse CI |
| Tỷ lệ tương tác AI Chatbot | > 40% | Tracking |
| Tin nhắn chat trung bình/ngày | > 10 tin | Tracking |

---

## 👥 Đối Tượng Người Dùng

| Nhóm | Mô Tả | Nhu Cầu Chính |
|------|-------|--------------|
| **Chủ thẻ** | Cá nhân muốn có hồ sơ số chuyên nghiệp | Tạo, tùy chỉnh và chia sẻ thẻ dễ dàng |
| **Khách hàng tiềm năng** | Người nhận link hoặc quét QR từ chủ thẻ | Xem thông tin nhanh, liên hệ ngay |
| **Quản trị viên** | Vận hành và giám sát nền tảng | Quản lý người dùng, kiểm duyệt nội dung |

---

## 🏗️ Tổng Quan Hệ Thống

### 4.1. Kiến Trúc Client-Server

Hệ thống được thiết kế theo mô hình Client-Server hiện đại, kết hợp với dịch vụ AI của bên thứ 3 (LLM).

**4 Phân hệ chính:**

#### 1. **Chủ thẻ (Card Owner Workspace)**
- Người dùng thực hiện định danh (Auth)
- Xây dựng hồ sơ tĩnh (Avatar, Bio, Link MXH)
- Cung cấp dữ liệu tri thức (Kỹ năng, Kinh nghiệm)
- Backend đóng gói thành `persona_data.json`

#### 2. **Khách truy cập (Guest/Client View)**
- Giao diện Public nhận dạng qua URL Slug hoặc QR Code
- Khách hàng xem thông tin tĩnh
- Tương tác với Widget Chatbot

#### 3. **AI Digital Twin Core**
- Đóng vai trò là "bộ não" trung gian
- Khi khách nhắn tin, Backend kẹp nội dung cùng `persona_data.json` + System Prompt
- Gửi lên LLM API (OpenAI) để sinh ra câu trả lời theo Persona

#### 4. **Quản trị (Admin Panel)**
- Kiểm soát vòng đời tài khoản (Khóa/Mở khóa)
- Theo dõi báo cáo vi phạm (Report Moderation)
- Thống kê dữ liệu lưu lượng truy cập

### 4.2. Luồng Thành Công (Happy Path)

**Luồng 1: Khởi tạo & Xuất bản Thẻ (Chủ thẻ)**

1. Người dùng đăng nhập thành công qua Google OAuth
2. Điền đầy đủ thông tin cá nhân (Tên, Bio, Avatar, MXH)
3. Cung cấp tri thức cho AI (Kinh nghiệm, Dự án, Kỹ năng)
4. Thiết lập System Prompt (Giọng điệu)
5. Nhấn "Xuất bản" → Backend xử lý thành công
6. **Kết quả:** URL công khai hợp lệ + QR Code + AI Ready

**Lutwiluồng 2: Tương tác (Khách hàng)**

1. Khách quét QR → trang mở trong < 2 giây
2. Khách đọc thông tin tĩnh, mở Chatbot AI
3. Đặt câu hỏi → AI phản hồi chính xác (< 4 giây)
4. Khách để lại SĐT/Email trong khung chat
5. **Kết quả:** Hệ thống lưu Lead vào Hộp thư, gửi email cho chủ thẻ

---

## 🎯 Yêu Cầu Chức Năng

### 5.1. Chủ Thẻ (Card Owner)

#### 5.1.1. Đăng Ký & Xác Thực (Authentication)
- ✅ Đăng ký tài khoản qua Email hoặc Số điện thoại
- ✅ Social Login: Google
- ✅ Quản lý phiên đăng nhập
- ✅ Logout và đổi mật khẩu

#### 5.1.2. Thiết Lập Persona - Profile Builder
**Thông tin cá nhân cơ bản:**
- Họ tên, chức danh nghề nghiệp
- Slogan / tagline cá nhân
- Bio / mô tả ngắn (tối đa 300 ký tự)
- Ảnh đại diện (avatar) và ảnh bìa (cover)

**Liên kết mạng xã hội & chuyên môn:**
- Facebook, Instagram, X (Twitter)
- GitHub, Behance, Dribbble, Portfolio website
- Email công việc, Số điện thoại

**Quản lý Card:**
- Mỗi User có thể tạo 1 Digital Card với persona cụ thể
- Tùy chọn ẩn/hiện Số điện thoại, Email

#### 5.1.3. Cấu Hình & Huấn Luyện AI Digital Twin
- ✅ **Persona Setup:** Thiết lập giọng điệu (Tone of voice)
  - Chuyên nghiệp, Hài hước, Ngắn gọn, Chi tiết, Kỹ thuật, Tự tin, Khiêm tốn
- ✅ **Knowledge Base Form:** Cung cấp form nhập liệu có cấu trúc
  - Kỹ năng, Kinh nghiệm, Dự án
  - Backend tự động tổng hợp thành `persona_data.json`
- ✅ **System Prompt Customization:** Nhập "Chỉ thị bí mật" cho AI
  - Ví dụ: "Nếu khách hỏi về giá, hãy yêu cầu để lại SĐT"
- ✅ **AI Guardrails:** Quy tắc an toàn
  - Chỉ trả lời dựa trên knowledge base
  - Không bịa đặt thông tin
  - Luôn xưng là "Trợ lý AI của [Tên]"

#### 5.1.4. Card Visit Động & Hộp Thư Cá Nhân
- ✅ **QR Code Generator**
  - Tự động sinh mã QR duy nhất
  - Tải về dạng PNG / SVG
- ✅ **Unique URL**
  - Smart slug: `digitalcard.app/u/[username]`
- ✅ **Inbox Management**
  - Xem toàn bộ tin nhắn từ khách hàng
  - Đánh dấu đọc/chưa đọc, lưu trữ, xóa
  - Xem lịch sử trò chuyện giữa AI và khách
- ✅ **AI Takeover**
  - Chủ thẻ có thể nhảy vào cuộc trò chuyện
  - Tạm ngắt AI để trực tiếp nhắn tin
- ✅ **Thông báo**
  - Email khi có tin nhắn mới

### 5.2. Khách Hàng (Guest/Client)

#### 5.2.1. Digital Profile Display
- ✅ Hiển thị tất cả liên kết mạng xã hội (icon button)
- ✅ Avatar, ảnh bìa, tên, chức danh, bio nổi bật

#### 5.2.2. Interaction với Digital Twin
- ✅ Cửa sổ chat tích hợp trên trang hồ sơ
- ✅ Khách đặt câu hỏi về kinh nghiệm, dự án, dịch vụ
- ✅ AI hỏi thông tin liên lạc nếu cuộc trò chuyện kéo dài

#### 5.2.3. Thu Nhập Thông Tin Liên Hệ
- ✅ **Consent:** "Bằng cách gửi thông tin, bạn đồng ý cho chủ thẻ liên hệ lại"
- ✅ **Fallback Form:** Form liên hệ tĩnh khi AI lỗi hoặc chủ thẻ tắt AI
- ✅ **Save Contact - VCF Export**
  - Nút "Lưu liên lạc" nổi bật
  - Tự động tạo file VCF (vCard 3.0)
  - Tracking lượt lưu danh bạ

### 5.3. Quản Trị (Admin Panel)

#### 5.3.1. Quản Lý Người Dùng - User Management
- ✅ Xem danh sách toàn bộ tài khoản
- ✅ Bộ lọc và tìm kiếm theo email, tên, trạng thái
- ✅ Thao tác: Kích hoạt / khóa tài khoản
- ✅ Xem chi tiết hồ sơ và Card của từng user

#### 5.3.2. Kiểm Duyệt Nội Dung - Content Moderation
- ✅ Quản lý danh sách các thẻ bị Report (Báo cáo)
- ✅ Đọc lý do vi phạm
- ✅ Quyết định cấm tài khoản theo thời hạn

---

## 📊 Yêu Cầu Phi Chức Năng

### 6.1. Hiệu Năng (Performance)
| Yêu Cầu | Tiêu Chuẩn |
|---------|-----------|
| Tốc độ tải trang công khai | < 2 giây (4G) |
| First Contentful Paint (FCP) | < 1.5 giây |
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 90 |

### 6.2. Bảo Mật (Security)
- ✅ Mật khẩu: bcrypt hoặc Argon2 (không plaintext)
- ✅ API routes: Bảo vệ bằng JWT / session token
- ✅ Rate limiting: Tối đa 60 request/phút per IP
- ✅ Input sanitize: Chống XSS và SQL Injection
- ✅ HTTPS bắt buộc trên production
- ✅ Không expose thông tin nhạy cảm

### 6.3. Trải Nghiệm Người Dùng (UX)
- ✅ Mobile-first design (QR scanning priority)
- ✅ Dark / light mode support
- ✅ Smooth animations (prefers-reduced-motion compliant)
- ✅ UI response time: < 200ms per interaction

---

## 🛠️ Công Nghệ & Kiến Trúc

| Tầng | Công Nghệ | Lý Do Chọn |
|------|-----------|-----------|
| **Frontend** | Next.js 15 (App Router) + Tailwind CSS + Framer Motion | SSR/SSG tốt cho SEO, animation, mobile-first |
| **Backend** | Node.js + Express | Tích hợp nhanh, deploy đơn giản |
| **Database** | Firebase Firestore | Realtime, dễ scale, miễn phí |
| **Auth** | Firebase Auth | OAuth (Google) sẵn có |
| **File Storage** | Firebase Storage | Avatar, cover, QR images |
| **QR Generator** | qrcode.js / qr-code-styling | Tùy chỉnh màu, logo |
| **Analytics** | PostHog / Google Analytics 4 | Event tracking, funnel |
| **AI/LLM** | OpenAI (GPT-4o-mini) | Chất lượng cao, chi phí tối ưu |
| **Version Control** | GitHub | CI/CD integration |

---

## 🎯 Phạm Vi Dự Án

### 8.1. In Scope (Bắt buộc)
- ✅ Authentication cơ bản (Email/Google)
- ✅ Profile Builder
- ✅ Public Digital Card
- ✅ QR Code Generator
- ✅ AI Chatbot dùng profile/knowledge base
- ✅ Inbox xem lịch sử chat
- ✅ Fallback Form liên hệ tĩnh
- ✅ User Management (Admin)
- ✅ Content Moderation (Admin)

### 8.2. Out of Scope (Không bắt buộc)
- ❌ Tải file PDF/DOCX cho RAG
- ❌ Payment / Subscription
- ❌ Booking system
- ❌ Voice chat
- ❌ NFC Integration (thực tế)
- ❌ eKYC nâng cao
- ❌ Admin template builder nâng cao
- ❌ Export báo cáo PDF/CSV

---

## ⚠️ Rủi Ro & Giả Định

### 9.1. Các Giả Định

| ID | Giả Định | Ảnh Hưởng Nếu Sai |
|----|----------|------------------|
| A-01 | Team 4 thành viên hoàn tất MVP kịp thời | Cắt giảm tính năng cốt lõi trước deadline |
| A-02 | Gói Free Tier đủ dùng (Vercel, Firebase, OpenAI) | Phát sinh chi phí hoặc system sập |
| A-03 | Chủ thẻ điền thông tin vào form đầy đủ | AI không có "vốn từ", phản hồi liên tục lỗi |

### 9.2. Các Rủi Ro & Biện Pháp Giảm Thiểu

| Loại Rủi Ro | Mô Tả | Mức Độ | Biện Pháp Giảm Thiểu |
|-------------|-------|--------|----------------------|
| **AI Hallucination** | AI tự động bịa đặt kinh nghiệm, giá cả | **Cao** | Guardrails gắt: "Chỉ trả lời từ JSON, không bịa đặt" |
| **Prompt Injection** | Khách hàng lừa AI bỏ qua System Prompt | **Trung** | Định nghĩa rõ vai trò AI, backend validation |
| **API Exhaustion** | Hệ thống bị spam chat, tiêu token sạch | **Cao** | Rate Limiting: 20 câu/ngày per IP, model rẻ (Haiku) |
| **Spam Form** | Khách spam form liên hệ, hộp thư bị tràn | **Trung** | Spam detection, CAPTCHA, rate limit |

---

## 📖 User Stories

### 10.1. Quản Lý Danh Tính & Thiết Lập Persona

| ID | As a | I want... | to... | Acceptance Criteria |
|----|------|----------|-------|-------------------|
| US-01 | Chủ thẻ | Đăng ký/Đăng nhập qua Email hoặc Google | Tiết kiệm thời gian khởi tạo | - Google OAuth thành công - Tự động lấy Avatar, Hộ tên |
| US-02 | Chủ thẻ | Nhập thông tin cơ bản, MXH, quyền riêng tư | Khách nắm thông tin chính xác | - Form rõ ràng - Validate URL - Toggle ẩn/hiện |
| US-03 | Chủ thẻ | Tải QR PNG/SVG chất lượng cao | Chèn vào name card vật lý | - Nút "Download QR" - File PNG rõ nét |

### 10.2. Cấu Hình AI & Hộp Thư

| ID | As a | I want... | To... | Acceptance Criteria |
|----|------|----------|-------|-------------------|
| US-04 | Chủ thẻ | Nhập kỹ năng, kinh nghiệm, dự án | AI học dữ liệu chuyên môn | - Form → persona_data.json - AI trả lời chính xác |
| US-05 | Chủ thẻ | Viết System Prompt, tone giọng | Kiểm soát cách AI giao tiếp | - Ô nhập ≤ 2000 ký tự - AI tuân guardrail |
| US-06 | Chủ thẻ | Xem lịch sử chat, xử lý Lead | Hiểu mối quan tâm khách | - Hiển thị clear khung chat - Danh sách Lead |

### 10.3. Trải Nghiệm Khách Hàng & Fallback

| ID | As a | I want... | To... | Acceptance Criteria |
|----|------|----------|-------|-------------------|
| US-08 | Khách | Quét QR, xem hồ sơ, lưu danh bạ | Kết nối nhanh chóng | - Load < 2 giây - VCF file chuẩn |
| US-09 | Khách | Chat với AI, để lại SĐT | Được tư vấn 24/7 | - Widget ổn định - Phản hồi < 5 giây - AI hỏi xin SĐT |
| US-10 | Khách | Điền Form tĩnh khi AI ngoại tuyến | Đảm bảo lời nhận được gửi | - Form hiển thị khi AI error - Email báo chủ thẻ |

### 10.4. Quản Trị & Phân Tích

| ID | As a | I want... | To... | Acceptance Criteria |
|----|------|----------|-------|-------------------|
| US-11 | Admin | Xem danh sách Report, quyết định xử phạt | Đánh giá vi phạm nội dung | - Bảng chi tiết Report - Khóa theo thời hạn |
| US-12 | Admin | Xem, tìm kiếm, khóa/kích hoạt user | Kiểm soát vòng đời user | - Bảng đầy đủ info - Search/Filter hoạt động |

---

## 🎭 Use Cases

### Use Case 1: UC-01 - Cấu Hình Digital Card

**Mô Tả:** Chủ thẻ khởi tạo Digital Profile chuyên nghiệp

**Basic Flow:**
1. Chủ thẻ → Dashboard → "Tạo Card mới"
2. Hiển thị form Profile Builder
3. Nhập thông tin cá nhân (Avatar, Tên, Chức danh, Bio, MXH)
4. Chọn template, tùy chỉnh màu sắc
5. Nhấn "Xuất bản"
6. Backend lưu dữ liệu, khởi tạo URL + QR
7. ✅ Thành công: URL + QR + trạng thái "Published"

**Exception Flow:**
- Nếu trường bắt buộc trống: báo lỗi, bôi đỏ
- Nếu URL slug trùng: yêu cầu nhập URL khác

---

### Use Case 2: UC-02 - Cấu Hình AI Digital Twin

**Mô Tả:** Chủ thẻ thiết lập System Prompt và Knowledge Base

**Basic Flow:**
1. Chủ thẻ → Tab "Cấu Hình AI"
2. Hiển thị form: System Prompt + Knowledge Base
3. Nhập System Prompt (hướng dẫn tính cách)
4. Nhập form chuyên môn (Kỹ năng, Kinh nghiệm, Dự án)
5. Nhấn "Lưu & Huấn Luyện"
6. Backend gom thành persona_data.json
7. ✅ Thành công: "Huấn luyện AI thành công"

---

### Use Case 3: UC-03 - Trò Chuyện

**Mô Tả:** Khách hàng chat với AI đại diện

**Basic Flow:**
1. Khách nhấn Chatbot icon
2. AI gửi lời chào tự động
3. Khách nhập câu hỏi
4. AI phân tích, truy xuất KB, phản hồi
5. AI hỏi xin thông tin liên lạc
6. Khách cung cấp SĐT/Email
7. ✅ Hệ thống lưu Lead, thông báo chủ thẻ

**Exception Flow:**
- Mất kết nối LLM: "Hiện AI bảo trì, vui lòng để lại SĐT"
- Câu hỏi vi phạm nội dung: AI từ chối lịch sự

---

### Use Case 4: UC-04 - Human Takeover

**Mô Tả:** Chủ thẻ nhảy vào trả lời trực tiếp

**Basic Flow:**
1. Chủ thẻ xem lịch sử chat realtime trong Inbox
2. Nhấn "Tiếp quản (Takeover)"
3. AI ngừng phản hồi tự động
4. Thông báo khách: "Chủ thẻ đang hỗ trợ"
5. Chủ thẻ nhập tin nhắn
6. ✅ Tin hiển thị trực tiếp khách

---

### Use Case 5: UC-05 - Đăng Nhập & Xác Thực

**Mô Tả:** Người dùng đăng nhập qua Google OAuth

**Basic Flow:**
1. Nhấn "Đăng nhập"
2. Chọn "Đăng nhập với Google"
3. Google xác thực & trả Avatar + Tên
4. Hệ thống tạo tài khoản (nếu mới) hoặc cấp quyền
5. ✅ Dashboard sẵn sàng, huy hiệu "Verified"

---

### Use Case 6: UC-06 - Tải QR Code

**Mô Tả:** Chủ thẻ tải QR PNG/SVG

**Basic Flow:**
1. Chủ thẻ → Thẻ cần chia sẻ → "Mã QR"
2. Popup xem trước QR
3. Nhấn "Tải xuống PNG"
4. ✅ File PNG (1000x1000px) tải về

---

### Use Case 7: UC-07 - Xem Digital Profile

**Mô Tả:** Khách hàng quét QR, xem hồ sơ công khai

**Basic Flow:**
1. Quét QR hoặc bấm link URL
2. Backend truy vấn Card từ DB theo Slug
3. Render trang hồ sơ theo Theme
4. Khách cuộn xem (Avatar, Bio, Kỹ năng)
5. Nhấn icon MXH để chuyển hướng
6. ✅ Analytics ghi nhận +1 pageview

---

### Use Case 8: UC-08 - Lưu Danh Bạ Tự Động (VCF)

**Mô Tả:** Khách hàng lưu thông tin vào điện thoại

**Basic Flow:**
1. Nhấn "Lưu liên lạc"
2. Backend thu thập (Tên, SĐT, Email, Website)
3. Biên dịch thành vCard 3.0 (.vcf)
4. Tải file .vcf xuống
5. Hệ điều hành tự động mở "Thêm liên hệ"
6. ✅ Khách lưu vào điện thoại

---

### Use Case 9: UC-09 - Gửi Form Liên Hệ Tĩnh

**Mô Tả:** Khách hàng để lại lời nhắn khi AI lỗi

**Basic Flow:**
1. Khách nhập (Tên, Email, SĐT, Nội dung) vào Form
2. Tick CAPTCHA (nếu có)
3. Nhấn "Gửi thông tin"
4. Backend validate dữ liệu
5. Lưu tin nhắn, gửi email chủ thẻ
6. ✅ Thông báo: "Gửi thành công"

---

### Use Case 10: UC-10 - Quản Lý Người Dùng (Admin)

**Mô Tả:** Admin xem danh sách user, khóa/kích hoạt

**Basic Flow:**
1. Admin → Tab "Quản lý người dùng"
2. Hiển thị bảng toàn bộ tài khoản
3. Tìm kiếm/lọc theo email, tên, trạng thái
4. Nhấn Toggle ở cột "Thao tác" để khóa/kích hoạt
5. Popup xác nhận thao tác
6. ✅ Trạng thái user cập nhật thành công

---

### Use Case 11: UC-11 - Quản Lý Báo Cáo & Xử Lý Vi Phạm

**Mô Tả:** Admin xem Report, quyết định cấm tài khoản

**Basic Flow:**
1. Admin → Tab "Quản lý báo cáo"
2. Hiển thị bảng Report (ID, Tên, Lý do, Ngày tạo)
3. Đọc lý do báo cáo
4. Nhấn Toggle đỏ để khóa tài khoản
5. Chọn thời hạn khóa (1 tuần / 1 tháng / năm / vĩnh viễn)
6. ✅ User chuyển sang "Đã Khóa", URL public bị vô hiệu

---

## 📝 Danh Mục Thuật Ngữ

| Thuật Ngữ | Ý Nghĩa |
|-----------|---------|
| **Persona** | Bản dạng / Hồ sơ cá nhân hóa (tính cách, phong cách) |
| **Digital Business Card** | Thẻ danh thiếp kỹ thuật số (thay thế name card giấy) |
| **Digital Twin** | Bản sao kỹ thuật số (AI chatbot đại diện) |
| **Lead** | Khách hàng tiềm năng (có khả năng trở thành KH) |
| **Conversion** | Chuyển đổi (người xem → khách hàng) |
| **Networking** | Xây dựng mạng lưới quan hệ |
| **Personal Branding** | Xây dựng thương hiệu cá nhân |
| **Landing Page** | Trang đích công khai (trang hồ sơ khi quét QR) |
| **VCF / vCard** | File danh bạ điện tử (.vcf) |
| **Fallback Form** | Biểu mẫu liên hệ dự phòng (khi AI tắt/lỗi) |
| **Knowledge Base** | Cơ sở kiến thức (dữ liệu cá nhân hóa) |
| **System Prompt** | Lời hướng dẫn hệ thống cho AI |
| **Tone of Voice** | Giọng điệu giao tiếp của AI |
| **Guardrails** | Quy tắc an toàn / rào chắn cho AI |
| **Prompt Injection** | Tấn công lừa AI bỏ qua prompt gốc |
| **Hallucination** | AI tự động bịa đặt thông tin sai lệch |

---

## 📌 Kết Luận

Dự án **Persona-Based Digital Twin Card** là một sáng kiến hiện đại kết hợp:
- ✅ **Digital Business Card** động, chia sẻ dễ dàng
- ✅ **AI Digital Twin** chuyên nghiệp, đại diện 24/7
- ✅ **Lead Generation** tự động qua chat & form
- ✅ **Admin Panel** quản lý toàn diện

Mục tiêu là tạo công cụ **networking hiệu quả**, thay thế name card truyền thống, giúp cá nhân xây dựng **personal branding** mạnh mẽ trên môi trường số.

---

**Version:** 1.0  
**Status:** Active ✅  
**Last Updated:** 2026

*Tài liệu này là Single Source of Truth cho PRD dự án Digital Twin Card Platform.*
