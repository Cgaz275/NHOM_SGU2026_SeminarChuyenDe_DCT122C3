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
| **Frontend** | Next.js 16.2 (App Router), React 19, Tailwind CSS v4, Framer Motion | SSR/SSG, SEO, Animation, Mobile-first |
| **Giao diện & UI**| `lucide-react`, `react-icons`, `qrcode.react`, `html-to-image` | Icon đa dạng, render QR động, tải ảnh danh thiếp |
| **Backend / API** | Node.js, Express v5 | Tốc độ cao, linh hoạt tích hợp Middleware |
| **API Docs** | Swagger (`swagger-jsdoc`, `swagger-ui-express`) | Tự động hóa tài liệu API cho Frontend/Mobile |
| **Database** | Firebase Firestore (NoSQL) | Realtime sync (`onSnapshot`), cấu trúc linh hoạt |
| **Auth & Sec** | Firebase Auth (JWT ID Token), `express-rate-limit` | Hỗ trợ OAuth, tự động refresh token ngầm (Silent Renewal), chống Spam API |
| **Storage** | Firebase Storage | Lưu ảnh đại diện, avatar |
| **AI LLM** | OpenAI SDK (`openai` node package) | Giao tiếp mạnh mẽ, sinh phản hồi từ Knowledge Base JSON |

---

## 7. PHẠM VI DỰ ÁN (SCOPE & MODULES COMPLETED)
- **Hệ thống Chủ thẻ (Card Owner Dashboard):** Đăng nhập Firebase Auth, Profile Builder, Cấu hình AI Knowledge Base, Quản lý QR Code sinh động, Quản lý Inbox (Tin nhắn Lead), Tùy chỉnh bật/tắt AI.
- **Hệ thống Khách hàng (Public Card & Digital Twin):** Xem giao diện hồ sơ, Chatbot nổi với AI Twin (RAG JSON), Điền Form tĩnh (Fallback Form) khi AI tắt, Xuất file Danh bạ `.vcf`, Tương tác mạng xã hội.
- **Hệ thống Quản trị (Admin Panel):** Dashboard giám sát, Quản lý Báo cáo vi phạm (Real-time), Khóa/Mở khóa tài khoản (Real-time kick-out), Cấu hình phân quyền Admin.
- **Hệ thống Giới thiệu Seminar (Seminar Landing):** Các trang giới thiệu Đội ngũ (`/about`), Trưng bày Dự án (`/teamproject`), và Thử nghiệm AI chung (`/digital-twin`).
- **Hệ thống Bảo mật & Đồng bộ:** Cơ chế Auto-Refresh Token, Rate Limiting, Giám sát phiên làm việc thời gian thực qua Firestore Listener.

---

## 8. RỦI RO & GIẢ ĐỊNH
### 8.1. Các giả định
- **Tài nguyên:** Hạ tầng miễn phí đủ dùng (Vercel, Firebase) và một khoản chi phí nhỏ nạp vào OpenAI là đủ lưu lượng cho Demo.
- **Nguồn dữ liệu:** Chủ thẻ cung cấp thông tin nghiêm túc vào form chuyên môn để tạo ra `aiConfig` chất lượng, giúp AI trả lời chính xác.

### 8.2. Rủi ro & Biện pháp
- **AI Hallucination & Prompt Injection:** Rủi ro AI bịa đặt hoặc bị thao túng. => **Giải pháp:** Guardrails chặt chẽ trong System Prompt (`promptBuilder.js`), validate input.
- **Spam Form/Inbox & Cạn kiệt API:** => **Giải pháp:** Chặn submit spam bằng Middleware `express-rate-limit` (60 requests/15 phút).
- **Mất phiên đăng nhập:** Token hết hạn sau 1 tiếng. => **Giải pháp:** Áp dụng Silent Token Renewal (Firebase `getIdToken`) trước mỗi request.

---

## 9. CÁC LUỒNG SỰ KIỆN CHÍNH (USE CASES & FLOWS)
1. **Cấu hình Thẻ & AI:** Dashboard -> Nhập Profile & Cấu hình AI -> Lưu dữ liệu Firestore -> Tự động sinh QR Code động dẫn đến URL `/u/[username]`.
2. **Trò chuyện (AI Chat):** Khách quét QR -> Chatbot chào -> Khách hỏi -> API check Rate Limit -> Gọi OpenAI kèm ngữ cảnh `aiConfig` -> AI trả lời JSON -> Hiển thị UI.
3. **Thu thập Lead (Human Fallback):** Chủ thẻ tắt AI hoặc AI lỗi -> Khách hàng thấy Form tĩnh -> Nhập Tên, Email, Tin nhắn -> Lưu vào Firestore Inbox -> Chủ thẻ xem trong Dashboard.
4. **Human Takeover (Chủ thẻ tiếp quản):** Khách đang chat với AI -> Khách để lại thông tin -> Hệ thống khóa AI (Takeover = true) -> Chủ thẻ và Khách hàng chat tay trực tiếp (Real-time).
5. **Đồng bộ mã QR động:** Admin/Chủ thẻ đổi tên miền hệ thống -> API tự động nhận diện Domain hiện tại -> Trả về URL QR mới khớp 100% với môi trường.
6. **Báo cáo vi phạm (Real-time Sync):** Khách nhấn Report thẻ -> API tạo Report trong Firestore -> Admin Panel lắng nghe `onSnapshot` -> Hiển thị Report mới tinh trên bảng điều khiển ngay lập tức (không cần tải lại trang).
7. **Bảo mật & Cấm tài khoản (Real-time Kick-out):** Admin bấm "Khóa tài khoản" -> Cập nhật `status = banned` -> Frontend AuthContext bắt sự kiện `onSnapshot` lập tức (< 0.5s) -> Hiển thị Modal Cảnh báo Đỏ -> Tự động thu hồi Token, xóa Session -> Đẩy chủ thẻ về trang Đăng nhập.
8. **Tự động làm mới phiên làm việc (Silent Refresh):** Chủ thẻ treo máy > 1 tiếng -> Gửi request API -> Frontend Firebase SDK tự động gia hạn Token ngầm -> API thành công không bị gián đoạn.

*(Lưu ý: PRD này được tổng hợp để Agent nắm bắt nhanh Context, Rules và Workflows của hệ thống, hỗ trợ chính xác trong quá trình code, test và review).*
