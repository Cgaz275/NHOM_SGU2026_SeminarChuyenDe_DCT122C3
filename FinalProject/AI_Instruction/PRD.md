# PRODUCT REQUIREMENT DOCUMENT (PRD)
**Dự án:** Persona-Based Digital Card
**Học phần:** Seminar Chuyên Đề
**Nhóm:** SGU2026_SeminarChuyenDe_DCT122C3

---

## 1. GIỚI THIỆU (INTRODUCTION)
**Persona-Based Digital Card** là một nền tảng web hiện đại cho phép người dùng tạo thẻ giới thiệu kỹ thuật số (Digital Business Card) được cá nhân hóa sâu theo từng persona. 
Khác biệt với name card truyền thống, hệ thống tích hợp **AI Digital Twin** – một chatbot thông minh đóng vai trò "bản sao kỹ thuật số" của chủ thẻ, có khả năng giao tiếp, trả lời câu hỏi và tư vấn khách truy cập 24/7 dựa trên dữ liệu (Knowledge Base) của chủ thẻ. Thẻ có thể chia sẻ dễ dàng qua QR Code hoặc link URL.

---

## 2. MỤC TIÊU DỰ ÁN (GOALS & METRICS)

### 2.1. Business & User Goals
- **Chủ thẻ:** Thiết lập hồ sơ số chuyên nghiệp, mạng lưới networking hiệu quả thay thế name card giấy, tăng tỷ lệ chuyển đổi khách hàng.
- **Khách truy cập:** Xem thông tin nhanh chóng, chat trực tiếp với AI để tìm hiểu sâu mà không cần chờ đợi.

### 2.2. Success Metrics
| Chỉ số | Mục tiêu | Cách đo |
| :--- | :--- | :--- |
| Thời gian trung bình trên site | > 3 phút | Google Analytics |
| Tỷ lệ tương tác form liên hệ | > 20% | Event tracking |
| Số QR code tạo ra (tuần đầu) | > 50 thẻ | Database count |
| Tỷ lệ lưu danh bạ (VCF) | > 30% | Button click tracking |
| Điểm Lighthouse (Perf + SEO) | > 90 | Lighthouse CI |
| Tỷ lệ tương tác AI Chatbot | > 40% | Tracking |
| Tin nhắn chat trung bình / ngày | > 10 tin | Tracking |

---

## 3. ĐỐI TƯỢNG NGƯỜI DÙNG (TARGET AUDIENCE)
| Nhóm | Mô tả | Nhu cầu chính |
| :--- | :--- | :--- |
| **Chủ thẻ (Card Owner)** | Cá nhân muốn hồ sơ số chuyên nghiệp | Tạo, tùy chỉnh, cấu hình AI và chia sẻ thẻ. |
| **Khách hàng tiềm năng** | Người quét QR / Truy cập link | Xem thông tin, chat với AI, lưu danh bạ, để lại lời nhắn. |
| **Quản trị viên (Admin)** | Người vận hành nền tảng | Quản lý user, kiểm duyệt nội dung, xem analytics. |

---

## 4. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 4.1. Chủ Card (Card Owner)
- **Authentication:** Đăng nhập/Đăng ký qua Email (Magic Link) hoặc Google OAuth.
- **Profile Builder:** Xây dựng hồ sơ (Avatar, Bio, Social links...). Quản lý tùy chọn ẩn/hiện SĐT, Email public.
- **Cấu hình AI Digital Twin:**
  - Setup System Prompt, Tone of Voice.
  - Điền Knowledge Base Form (Kỹ năng, Kinh nghiệm, Dự án) để hệ thống sinh ra file `persona_data.json` làm context cho AI.
  - Cấu hình Guardrails (Quy tắc an toàn).
- **Hệ thống & Hộp thư (Inbox):**
  - Quản lý QR Code (Tạo URL unique, tải PNG/SVG).
  - Quản lý tin nhắn từ khách hàng/Lead.
  - Trạng thái AI: Draft, Published, AI Disabled, AI Ready, AI Error.
  - **Human Takeover:** Tạm ngắt AI để chủ thẻ chat trực tiếp với khách (realtime).

### 4.2. Khách hàng (Client)
- **Digital Profile Display:** Xem giao diện hồ sơ public, click link social.
- **Tương tác AI:** Chatbot nổi trên màn hình. AI sẽ xin thông tin liên lạc (Lead) nếu phù hợp.
- **Thu thập Lead:** 
  - Gửi SĐT/Email qua Chatbot (Có Consent).
  - Gửi qua Fallback Form tĩnh (khi AI tắt/lỗi).
- **Save Contact:** Lưu danh bạ chuẩn vCard 3.0 (.vcf).

### 4.3. Quản trị viên (Admin Panel)
- Quản lý User (Khóa/Mở, xem chi tiết).
- Kiểm duyệt nội dung (Xử lý các thẻ bị report).

---

## 5. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)
- **Hiệu năng:** Tải trang < 2s, FCP < 1.5s, Lighthouse > 90.
- **Bảo mật:** JWT/Session token cho API. Rate limit (60 req/phút). Chống XSS/SQL Injection. Hash password. Ẩn thông tin nhạy cảm.
- **UX/UI:** Mobile-first, Dark/Light mode, Phản hồi UI < 200ms. Thời gian AI trả lời < 4s.

---

## 6. CÔNG NGHỆ (TECH STACK)
| Tầng | Công nghệ | Lý do chọn |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, Framer Motion | SSR/SSG, SEO, Animation, Mobile-first |
| **Backend / API** | Next.js API Routes / Node.js Express | Tích hợp nhanh, dễ deploy |
| **Database** | Firebase Firestore / Supabase (PostgreSQL) | Realtime, dễ scale |
| **Auth** | Firebase Auth / NextAuth.js | Hỗ trợ OAuth dễ dàng |
| **Storage** | Firebase Storage / Cloudinary | Lưu ảnh, QR |
| **AI LLM** | OpenAI / Gemini / Claude via OpenRouter | Trí tuệ nhân tạo linh hoạt |

---

## 7. PHẠM VI DỰ ÁN (SCOPE)
- **In Scope:** Auth cơ bản, Profile Builder, Public Card, QR Generator, AI Chatbot (RAG JSON), Inbox, Fallback Form.
- **Out of Scope:** Upload file PDF/DOCX cho RAG, Thanh toán, Booking, Voice Chat, eKYC nâng cao.

---

## 8. RỦI RO & GIẢ ĐỊNH
### 8.1. Các giả định
- **Tài nguyên:** Hạ tầng miễn phí đủ dùng (Vercel, Firebase/Supabase) và một khoản chi phí nhỏ nạp vào OpenRouter là đủ lưu lượng cho MVP.
- **Nguồn dữ liệu:** Chủ thẻ cung cấp thông tin nghiêm túc vào form chuyên môn để tạo ra `persona_data.json` chất lượng, giúp AI trả lời chính xác.

### 8.2. Rủi ro & Biện pháp
- **AI Hallucination & Prompt Injection:** Rủi ro AI bịa đặt hoặc bị thao túng. => **Giải pháp:** Guardrails chặt chẽ trong System Prompt, validate input.
- **API Exhaustion (Cháy Token):** => **Giải pháp:** Rate limiting (20 câu/ngày/IP), dùng model rẻ/nhanh cho Demo.
- **Spam Form/Inbox:** => **Giải pháp:** CAPTCHA, chặn submit > 3 lần/phút/IP.
- **Rò rỉ thông tin riêng tư:** => **Giải pháp:** Chỉ cho phép AI đọc SĐT/Email nếu user chủ động bật "Cho phép AI cung cấp thông tin liên lạc".

---

## 9. CÁC LUỒNG SỰ KIỆN CHÍNH (USE CASES)
1. **Cấu hình Thẻ:** Dashboard -> Tạo thẻ -> Nhập Profile -> Xuất bản (Tạo URL & QR).
2. **Cấu hình AI:** Dashboard -> Cấu hình AI -> Nhập Prompt & Form dữ liệu -> Lưu & Huấn luyện (Sinh `persona_data.json`).
3. **Trò chuyện (Chat):** Khách quét QR -> Chatbot chào -> Khách hỏi -> AI đọc JSON trả lời -> Xin SĐT (Lead).
4. **Human Takeover:** Khách đang chat AI -> Chủ thẻ xem Inbox realtime -> Nhấn "Tiếp quản" -> AI ngưng -> Chủ thẻ chat tay.
5. **Fallback:** AI lỗi hoặc chủ thẻ tắt AI -> Hiện Form liên hệ tĩnh -> Khách nhập Form -> Gửi email báo chủ thẻ.
6. **Lưu Danh Bạ:** Khách xem thẻ -> Nhấn "Lưu liên lạc" -> Tải file `.vcf`.
7. **Quản lý Người dùng (Admin):** Admin xem danh sách toàn bộ User -> Tìm kiếm/Lọc theo tên hoặc email -> Kích hoạt hoặc Khóa tài khoản -> Xem chi tiết các Digital Card của User.
8. **Quản lý Báo cáo & Xử lý vi phạm (Admin):** Admin xem danh sách Report -> Xem chi tiết lý do -> Ra quyết định Khóa thẻ (chọn thời hạn) hoặc bỏ qua báo cáo -> Vô hiệu hóa URL vi phạm.

*(Lưu ý: PRD này được tổng hợp để Agent nắm bắt nhanh Context, Rules và Workflows của hệ thống, hỗ trợ chính xác trong quá trình code, test và review).*
