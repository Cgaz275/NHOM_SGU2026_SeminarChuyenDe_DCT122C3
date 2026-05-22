# ĐẠI HỌC SÀI GÒN KHOA CÔNG NGHỆ THÔNG TIN

# TEST PLAN

# PERSONA-BASED WEBSITE FOR DIGITAL TWIN CARD

Học phần: Seminar Chuyên Đề

GVHD: TS. Đỗ Như Tài

Lớp: DCT122C3

Sinh viên thực hiện

<table><tr><td>STT</td><td>Họ và tên</td><td>MSSV</td></tr><tr><td>1</td><td>Châu Gia Anh</td><td>3122411002</td></tr><tr><td>2</td><td>Dương Lê Khánh</td><td>3122411093</td></tr><tr><td>3</td><td>Phan Thành Đại</td><td>3122411036</td></tr><tr><td>4</td><td>Đào Thị Thanh Tâm</td><td>3122411182</td></tr></table>

THÀNH PHỐ HỒ CHÍ MINH

# MỤC LỤC

# MỤC LỤC.....

# CHƯƠNG 1: GIỚI THIỆU..

1.1. Mục đích của tài liệu Test Plan.. 3   
1.2. Phạm vi áp dụng.. a   
1.3. Tài liệu tham khảo.   
1.4. Tổng quan về hệ thống.. 4

# CHƯƠNG 2: MỤC TIÊU KIỂM THỬ..

2.1. Mục tiêu tổng quát..   
2.2. Mục tiêu cụ thể.. 5   
2.2.1. Mục tiêu theo chức năng..   
2.2.2. Mục tiêu phi chức năng.. 5   
2.2.3. Mục tiêu đặc thù cho AI Digital Twin. 6   
2.3. Tiêu chí thành công của kiểm thử.. 6

# CHƯƠNG 3: PHẠM VI KIỂM THỬ..

3.1. Phạm vi tổng quát..   
3.2. In Scope (Các chức năng nằm trong phạm vi kiểm thử)..   
3.2.1. Phân hệ Chủ thẻ (Owner Dashboard)..   
3.2.2. Phân hệ Khách truy cập (Public)..   
3.2.3. Phân hệ Landing Page..   
3.2.4. Phân hệ Admin Panel.   
3.2.5. Tính năng chung. 8

3.3. Out of Scope (Ngoài phạm vi kiểm thử).. 8   
3.4. Tiêu chí chấp nhận (Acceptance Criteria).. 8

# CHƯƠNG 4: CÁC ĐỐI TƯỢNG KIỂM THỬ..

4.1. Phân hệ Authentication & Authorization.   
4.2. Phân hệ Profile Builder / Card Editor. 9   
4.3. Phân hệ AI Digital Twin Configuration. 9   
4.4. Phân hệ Public Digital Profile.. 9   
4.5. Phân hệ QR Code Manager.. .10   
4.6. Phân hệ Persona Inbox & Human Takeover.. 10   
4.7. Phân hệ Admin Panel.. 10   
4.8. Tính năng chung & Hệ thống.. . 10

# CHƯƠNG 5: CHIẾN LƯỢC KIỂM THỬ (Test Strategy).... 11

5.1. Tổng quan chiến lược kiểm thử..   
5.2. Các loại kiểm thử sẽ thực hiện.. 11   
5.3. Kỹ thuật kiểm thử.. 11   
5.4. Tiêu chí dừng kiểm thử (Test Exit Criteria).. . 12

5.5. Tiêu chí tạm dừng kiểm thử (Suspension Criteria).. 12   
5.6. Cách tiếp cận kiểm thử AI Digital Twin. 12

# CHƯƠNG 6: MÔI TRƯỜNG KIỂM THỬ. 13

6.1. Tổng quan môi trường kiểm thử.. 13   
6.2. Môi trường Phần cứng & Phần mềm.. 13   
6.3. Công cụ hỗ trợ kiểm thử.. .13   
6.4. Chi tiết sử dụng các công cụ chính.. . 13

6.4.1. Cypress.. 14   
6.4.2. Jest.. . 14   
6.4.3. Postman.. .14   
6.4.4. Lighthouse.. . 14

6.5. Môi trường Dữ liệu Kiểm thử (Test Data).. . 14   
6.6. Cấu hình môi trường.. . 14

# CHƯƠNG 7: CÁC TÀI LIỆU ĐẦU RA...... .15

7.1. Danh sách tài liệu cần bàn giao. .. 15   
7.2. Định dạng và lưu trữ tài liệu.. . 15   
7.3. Tiêu chuẩn chất lượng tài liệu.. 15   
7.4. Phê duyệt tài liệu. . 16

# CHƯƠNG 1: GIỚI THIỆU

# 1.1. Mục đích của tài liệu Test Plan

Tài liệu Test Plan này được lập ra nhằm định hướng toàn bộ hoạt động kiểm thử cho hệ thống Persona-Based Website for Digital Twin Card.

Mục đích chính của tài liệu bao gồm:

● Xác định rõ mục tiêu, phạm vi, chiến lược và phương pháp kiểm thử cho hệ thống.   
Đảm bảo hệ thống đáp ứng đầy đủ các yêu cầu chức năng và phi chức năng đã nêu trong PRD và GUI Design Document.   
● Xác định các rủi ro tiềm ẩn, đặc biệt là các vấn đề liên quan đến AI Digital Twin (hallucination, guardrails, tính chính xác của persona).   
● Làm cơ sở để theo dõi, đánh giá chất lượng và báo cáo kết quả kiểm thử trong quá trình phát triển và trước khi demo seminar.   
● Hỗ trợ nhóm phát triển khắc phục lỗi kịp thời, đảm bảo hệ thống hoạt động ổn định, an toàn và thân thiện với người dùng.

# 1.2. Phạm vi áp dụng

Tài liệu này áp dụng cho toàn bộ quá trình kiểm thử của dự án Persona-Based Digital Twin Card trong khuôn khổ học phần Seminar Chuyên Đề – Lớp DCT122C3.

Phạm vi kiểm thử bao gồm:

● Tất cả các module chính đã hoàn thành trong giai đoạn MVP.   
● Các luồng người dùng chính: Chủ thẻ (Card Owner), Khách truy cập (Public User) và Quản trị viên (Admin).   
Tập trung mạnh vào tính năng cốt lõi: AI Digital Twin, Public Digital Profile, Profile Builder, và Realtime Inbox.

Tài liệu này không bao gồm kiểm thử cho các tính năng Out of Scope đã nêu trong PRD (Payment, Voice Chat, NFC tích hợp, Advanced RAG với PDF, v.v.).

# 1.3. Tài liệu tham khảo

1. Product Requirement Document (PRD) - Persona-Based Website for Digital Twin Card.   
2. GUI Design Document - Persona-Based Website for Digital Twin Card.   
3. Architecture & Database Design Document.   
4. Báo cáo Đồ án Tổng hợp (BÁO CÁO TỔNG).

5. IEEE Standard 829-2008 – Standard for Software and System Test Documentation.

6. Firebase Documentation (Firestore, Authentication, Cloud Storage).

7. OpenAI / OpenRouter API Documentation.

# 1.4. Tổng quan về hệ thống

Persona-Based Digital Twin Card là nền tảng web cho phép người dùng tạo Thẻ Danh thiếp Kỹ thuật số (Digital Business Card) được cá nhân hóa sâu. Hệ thống không chỉ hiển thị thông tin tĩnh mà còn tích hợp AI Digital Twin – một chatbot thông minh đóng vai trò là bản sao kỹ thuật số của chủ thẻ.

Các phân hệ chính của hệ thống gồm:

● Landing Page: Giới thiệu dự án và demo. ● Public Digital Profile: Trang hồ sơ công khai, chia sẻ qua QR Code hoặc URL.

● Owner Dashboard: Profile Builder, AI Configuration, QR Manager, Persona Inbox.

● AI Digital Twin: Chatbot sử dụng RAG và Multi-layer Prompt để trả lời theo persona.

● Admin Panel: Quản lý người dùng và báo cáo.

● Tính năng hỗ trợ: Save vCard, Fallback Form, Human Takeover, Realtime messaging.

Hệ thống được xây dựng theo mô hình Mobile-first, sử dụng công nghệ Next.js 15 (Frontend), Node.js + Express (Backend), Firebase (Auth, Firestore, Storage) và OpenAI (AI Digital Twin).

# CHƯƠNG 2: MỤC TIÊU KIỂM THỬ

# 2.1. Mục tiêu tổng quát

Mục tiêu chính của công tác kiểm thử hệ thống Persona-Based Website for Digital Twin Card là đảm bảo chất lượng tổng thể của sản phẩm, giúp hệ thống đạt được độ tin cậy, ổn định và trải nghiệm người dùng tốt trước khi trình bày tại buổi Seminar Chuyên Đề.

Cụ thể, kiểm thử nhằm:

Xác nhận rằng hệ thống hoạt động đúng theo các yêu cầu đã nêu trong PRD và GUI Design Document.   
● Đảm bảo tính chính xác, an toàn và hiệu suất của AI Digital Twin – tính năng cốt lõi của dự án.   
● Phát hiện sớm các lỗi, lỗ hổng bảo mật và vấn đề trải nghiệm người dùng (UX).   
● Xây dựng niềm tin cho người dùng cuối (chủ thẻ và khách truy cập).   
● Đáp ứng các tiêu chí chất lượng để hệ thống có thể demo mượt mà và chuyên nghiệp.

# 2.2. Mục tiêu cụ thể

# 2.2.1. Mục tiêu theo chức năng

● Kiểm tra đầy đủ các luồng chức năng chính của Chủ thẻ (Card Owner), Khách truy cập (Public User) và Admin.   
● Đảm bảo Profile Builder cho phép tạo và chỉnh sửa thẻ một cách chính xác và mượt mà.   
Xác nhận AI Digital Twin trả lời đúng persona, tuân thủ guardrails và giảm thiểu hallucination.   
● Kiểm tra khả năng lưu trữ, quản lý và realtime của Persona Inbox & Human Takeover.   
● Đảm bảo chức năng QR Code hoạt động ổn định và vCard export đúng chuẩn.   
● Xác nhận Public Digital Profile hiển thị đẹp, responsive và thân thiện trên thiết bị di động.

# 2.2.2. Mục tiêu phi chức năng

● Hiệu năng: Thời gian tải trang dưới 2 giây, chat AI phản hồi dưới 3 giây (trung bình).   
● Tính tương thích: Hoạt động tốt trên các trình duyệt phổ biến và các thiết bị di động (Mobile-first).

● Bảo mật: Đảm bảo xác thực an toàn, bảo vệ dữ liệu cá nhân và chống các tấn công cơ bản (XSS, Prompt Injection).   
Trải nghiệm người dùng (Usability): Giao diện trực quan, dễ sử dụng, tuân thủ thiết kế đã phê duyệt trong GUI Document.   
● Độ tin cậy: Hệ thống xử lý lỗi tốt (fallback khi AI lỗi, realtime đồng bộ).

# 2.2.3. Mục tiêu đặc thù cho AI Digital Twin

● Độ chính xác của câu trả lời theo persona ≥ 90%.   
● AI không bịa đặt thông tin (hallucination) và luôn tuân thủ guardrails.   
● Hỗ trợ Human Takeover hoạt động mượt mà.   
● Xử lý tốt các trường hợp input lạ, toxic hoặc prompt injection.

# 2.3. Tiêu chí thành công của kiểm thử

<table><tr><td>Tiêu chí</td><td>Mục tiêu</td></tr><tr><td>Tỷ lệ Test Case Pass</td><td> $\geq 95\%$ </td></tr><tr><td>Critical &amp; High bugs</td><td>0 bug còn tồn tại</td></tr><tr><td>AI Response Accuracy</td><td> $\geq 90\%$ </td></tr><tr><td>Thời gian phần hồi chat AI</td><td> $\leq 3$  giây (trung bình)</td></tr><tr><td>Lighthouse Score (Performance + SEO + Accessibility)</td><td> $\geq 90$ </td></tr><tr><td>Tỷ lệ bao phủ chức năng</td><td>100% các lường chính</td></tr></table>

# CHƯƠNG 3: PHẠM VI KIỂM THỬ

# 3.1. Phạm vi tổng quát

Phạm vi kiểm thử của tài liệu này tập trung vào việc xác nhận chất lượng của tất cả các tính năng đã được triển khai trong phiên bản MVP (Minimum Viable Product) của hệ thống Persona-Based Website for Digital Twin Card.

Kiểm thử sẽ bao quát đầy đủ ba nhóm người dùng chính:

● Chủ thẻ (Card Owner)   
● Khách truy cập (Public User)   
Quản trị viên (Admin)

# 3.2. In Scope (Các chức năng nằm trong phạm vi kiểm thử)

Dưới đây là các module và tính năng sẽ được kiểm thử chi tiết:

# 3.2.1. Phân hệ Chủ thẻ (Owner Dashboard)

● Authentication & Authorization (Login, Register, Google OAuth)   
● Profile Builder / Card Editor (tạo, chỉnh sửa, preview thẻ)   
● AI Digital Twin Configuration (cài đặt persona, knowledge base, system prompt)   
● QR Code Manager (tạo, tải, quản lý QR code)   
● Persona Inbox & Human Takeover (xem lịch sử chat, tiếp quản hội thoại)   
● Basic Analytics (số lượt xem, tương tác)

# 3.2.2. Phân hệ Khách truy cập (Public)

● Public Digital Profile (hiển thị thông tin cá nhân hóa)   
● Tương tác với AI Digital Twin (chat realtime)   
● Save Contact (xuất VCF / vCard)   
● Fallback Form (biểu mẫu liên hệ khi AI tắt hoặc lỗi)   
● Report Card / Feedback

# 3.2.3. Phân hệ Landing Page

● Giao diện giới thiệu dự án, demo Digital Twin   
● Điều hướng và trải nghiệm người dùng

# 3.2.4. Phân hệ Admin Panel

● Quản lý người dùng (User Management)

● Quản lý báo cáo vi phạm (Reported Cards)   
● Tổng quan hệ thống (Platform Overview)

# 3.2.5. Tính năng chung

● Realtime messaging (Firestore)   
● Responsive Design (Mobile-first)   
● Dark mode & Design System   
● Error Handling & Fallback mechanisms

# 3.3. Out of Scope (Ngoài phạm vi kiểm thử)

Các tính năng sau không nằm trong phạm vi kiểm thử của phiên bản MVP này:

● Tích hợp Payment / Subscription   
● Voice Chat với AI   
● Upload PDF/DOCX để huấn luyện RAG nâng cao   
● Tích hợp NFC thực tế   
● Advanced eKYC   
Export báo cáo chi tiết (PDF/CSV)   
● Multi-language support   
● Admin Template Builder nâng cao   
● Load testing quy mô lớn (hàng nghìn người dùng đồng thời)

# 3.4. Tiêu chí chấp nhận (Acceptance Criteria)

Một tính năng được coi là đạt khi:

● Hoàn thành ≥ 95% các Test Case thuộc tính năng đó.   
● Không còn bug ở mức Critical hoặc High.   
● Đáp ứng đầy đủ yêu cầu đã ghi trong PRD và GUI Design.   
● Đảm bảo hiệu năng và trải nghiệm người dùng theo tiêu chuẩn đề xuất.   
● AI Digital Twin tuân thủ guardrails và có tỷ lệ trả lời chính xác theo persona cao.

# CHƯƠNG 4: CÁC ĐỐI TƯỢNG KIỂM THỬ

Chương này liệt kê chi tiết tất cả các đối tượng (modules/tính năng) sẽ được kiểm thử trong phạm vi dự án. Mỗi đối tượng được phân loại theo phân hệ và mức độ ưu tiên kiểm thử.

# 4.1. Phân hệ Authentication & Authorization

● Đăng ký tài khoản (Email/Password và Google OAuth)   
● Đăng nhập / Đăng xuất   
● Quên mật khẩu & Đổi mật khẩu   
● Phân quyền người dùng (Card Owner và Admin)   
● Protected Routes (Dashboard, Admin Panel)   
Session management & Token expiration

# 4.2. Phân hệ Profile Builder / Card Editor

● Tạo mới Digital Card   
● Chỉnh sửa thông tin cá nhân (Avatar, Cover, Bio, Thông tin liên hệ)   
● Thêm/Sửa/Xóa các phần: Kinh nghiệm, Kỹ năng, Dự án, Social Links   
● Preview Card thời gian thực   
● Lưu nháp (Draft) và Publish Card   
● Validation dữ liệu đầu vào

# 4.3. Phân hệ AI Digital Twin Configuration

● Cấu hình System Prompt   
Quản lý Knowledge Base (Persona Data)   
● Thiết lập Tone of Voice & Personality   
Guardrails & Safety Settings   
● Test Chat với AI trong môi trường cấu hình   
● Bật/Tắt AI Digital Twin

# 4.4. Phân hệ Public Digital Profile

● Hiển thị thông tin thẻ công khai theo Slug/URL   
● Responsive trên mobile và desktop   
Tương tác Chat Widget với AI Digital Twin   
● Nút Save Contact (Export VCF)   
● Fallback Contact Form   
● Report / Feedback form   
● 404 Page & Inactive Card handling

# 4.5. Phân hệ QR Code Manager

● Tạo QR Code cho card   
● Tải QR Code (PNG/SVG)   
● Quản lý nhiều QR Code (nếu có)   
● Kiểm tra QR Code quét chuyển hướng đúng

# 4.6. Phân hệ Persona Inbox & Human Takeover

● Hiển thị danh sách hội thoại realtime   
● Xem chi tiết lịch sử chat   
● Chức năng Human Takeover (tiếp quản từ AI)   
● Gửi tin nhắn từ Inbox   
● Đánh dấu Read/Unread   
● Lọc và tìm kiếm hội thoại   
● Lead capture (khách hàng tiềm năng)

# 4.7. Phân hệ Admin Panel

● Dashboard tổng quan   
● Quản lý người dùng (View, Suspend, Delete)   
● Quản lý báo cáo vi phạm   
● Xem thống kê hệ thống   
● Duyệt / Từ chối card

# 4.8. Tính năng chung & Hệ thống

● Realtime synchronization (Firestore)   
● Error Handling & Fallback mechanisms   
Toast Notification   
● Loading States & Skeleton UI   
● Dark Mode consistency   
● Accessibility (ARIA labels, Keyboard navigation)   
● Performance & Page Load Speed

# CHƯƠNG 5: CHIẾN LƯỢC KIỂM THỬ (Test Strategy)

# 5.1. Tổng quan chiến lược kiểm thử

Chiến lược kiểm thử cho hệ thống Persona-Based Digital Twin Card được xây dựng theo hướng Risk-Based Testing và Mobile-First, tập trung mạnh vào chất lượng cốt lõi của AI Digital Twin và trải nghiệm người dùng.

Chúng tôi kết hợp giữa kiểm thử thủ công và tự động hóa ở mức phù hợp với thời gian của đồ án sinh viên.

# 5.2. Các loại kiểm thử sẽ thực hiện

<table><tr><td>STT</td><td>Loại kiểm thử</td><td>Mô tả</td><td>U serve tiên</td></tr><tr><td>1</td><td>Functional Testing</td><td>Kiểm tra chức năng theo yêu cầu PRD</td><td>Cao</td></tr><tr><td>2</td><td>UI/UX Testing</td><td>Kiểm tra giao diện, responsive, tuân thủ GUI Design</td><td>Cao</td></tr><tr><td>3</td><td>AI-Specific Testing</td><td>Kiểm tra độ chính xác persona, guardrails, hallucination, RAG</td><td>Rất cao</td></tr><tr><td>4</td><td>Integration Testing</td><td>Kiểm tra tích hợp giữa Frontend - Backend - Firebase - AI</td><td>Cao</td></tr><tr><td>5</td><td>Realtime Testing</td><td>Kiểm tra đồng bộ chat, inbox, Human Takeover</td><td>Cao</td></tr><tr><td>6</td><td>API Testing</td><td>Kiểm tra các API Backend (Postman)</td><td>Trung bình</td></tr><tr><td>7</td><td>Performance Testing</td><td>Tải trang, thời gian phần hồi AI, Lighthouse</td><td>Trung bình</td></tr><tr><td>8</td><td>Security Testing</td><td>XSS, Prompt Injection, Authentication, Authorization</td><td>Cao</td></tr><tr><td>9</td><td>Compatibility Testing</td><td>Các trình duyệt và thiết bị di động</td><td>Trung bình</td></tr><tr><td>10</td><td>Usability Testing</td><td>Trải nghiệm người dùng thực tế</td><td>Cao</td></tr></table>

# 5.3. Kỹ thuật kiểm thử

● Black-box Testing: Chủ yếu cho Functional và UI/UX.   
● Grey-box Testing: Kiểm tra tích hợp với Database và AI.

● Exploratory Testing: $\dot { \mathrm { A p } }$ dụng mạnh cho AI Digital Twin (kiểm tra các trường hợp bất ngờ).

● Regression Testing: Thực hiện sau mỗi lần sửa lỗi lớn.

# 5.4. Tiêu chí dừng kiểm thử (Test Exit Criteria)

● Tất cả Test Case mức Critical và High đều đạt Pass.

● Không còn bug Critical hoặc High nào còn tồn đọng.

Tỷ lệ Pass của Test Case ≥ 95%.

● AI Accuracy ≥ 90% trên tập Test Data.

● Đáp ứng các tiêu chí hiệu năng (Lighthouse ≥ 90, phản hồi $\mathrm { A I } \le 3$ giây trung bình).

Hoàn thành kiểm thử trên ít nhất 3 thiết bị di động khác nhau.

# 5.5. Tiêu chí tạm dừng kiểm thử (Suspension Criteria)

● Hệ thống không thể truy cập được do lỗi môi trường hoặc Firebase.

● Có lỗi blocker ảnh hưởng đến luồng chính (ví dụ: không chat được với AI).

● Chi phí gọi AI quá cao (cần tối ưu prompt trước khi tiếp tục test).

# 5.6. Cách tiếp cận kiểm thử AI Digital Twin

● Sử dụng Test Scenarios đa dạng: Normal case, Edge case, Adversarial case (prompt injection, toxic input).

● So sánh câu trả lời của AI với kiến thức đã cung cấp trong Knowledge Base.

● Kiểm tra Guardrails: AI từ chối trả lời thông tin nhạy cảm, không bịa đặt kinh nghiệm.

● Human Takeover: Kiểm tra chuyển đổi mượt mà giữa AI và chủ thẻ.

# CHƯƠNG 6: MÔI TRƯỜNG KIỂM THỬ

# 6.1. Tổng quan môi trường kiểm thử

Môi trường kiểm thử được thiết lập nhằm mô phỏng gần nhất với môi trường Production, đồng thời hỗ trợ tối đa cho việc phát triển và kiểm tra tự động. Hệ thống sử dụng Firebase Emulator cho môi trường local và các công cụ chuyên dụng để kiểm thử từng lớp của ứng dụng.

# 6.2. Môi trường Phần cứng & Phần mềm

● Hệ điều hành: Windows 11 / macOS / Linux (Ubuntu)   
● Trình duyệt: Google Chrome (phiên bản mới nhất), Firefox, Safari   
● Thiết bị kiểm thử:

○ Desktop (1920x1080 và 1366x768)   
○ Mobile: iPhone 12/13/14, Samsung Galaxy S21/S23 (sử dụng Chrome DevTools)

● Mạng: Internet ổn định (có kiểm tra cả trường hợp mạng yếu)

# 6.3. Công cụ hỗ trợ kiểm thử

<table><tr><td>Công cụ</td><td>Mục đích sử dụng</td><td>Phiên bản / Ghi chú</td></tr><tr><td>Cypress</td><td>End-to-End Testing (E2E), UI/UX Testing, Realtime Testing</td><td>v13.x (chính)</td></tr><tr><td>Jest</td><td>Unit Testing, Component Testing (React/Next.js)</td><td>v29.x</td></tr><tr><td>Postman</td><td>API Testing, Collection &amp; Environment Management</td><td>Version mới nhất</td></tr><tr><td>Lighthouse</td><td>Performance, SEO, Accessibility, Best Practices</td><td>Chrome DevTools + Lighthouse CI</td></tr><tr><td>Firebase Emulator Suite</td><td>Local testing (Firestore, Auth, Storage, Functions)</td><td>Official Firebase Tools</td></tr><tr><td>React Testing Library</td><td>Component Testing</td><td>Kết hợp với Jest</td></tr><tr><td>Chrome DevTools</td><td>Debugging, Performance Profiling, Responsive Test</td><td>Built-in</td></tr><tr><td>GitHub</td><td>Version Control &amp; CI/CD (tùy chọn)</td><td>-</td></tr></table>

# 6.4. Chi tiết sử dụng các công cụ chính

# 6.4.1. Cypress

● Dùng để viết và chạy các E2E Test Cases cho toàn bộ luồng người dùng.   
● Ưu tiên kiểm thử:

○ Luồng Public Digital Profile + AI Chat   
○ Profile Builder & Preview   
○ Human Takeover   
○ Responsive Design trên nhiều viewport

● Tích hợp screenshot và video recording khi test fail.

# 6.4.2. Jest

Thực hiện Unit Test và Component Test cho các component quan trọng của Frontend (Next.js).   
Tập trung kiểm tra logic xử lý form, validation, state management và utility functions.

# 6.4.3. Postman

● Kiểm thử toàn bộ RESTful API của Backend (Node.js + Express).   
● Tạo Collection riêng cho từng module: Auth, Cards, Chat, Inbox, Admin.   
● Sử dụng Environment variables (Local, Staging, Production).   
● Kiểm tra Response Time, Status Code, Schema Validation.

# 6.4.4. Lighthouse

● Đánh giá chất lượng tổng thể của các trang chính:

○ Landing Page   
○ Public Digital Profile   
○ Dashboard

● Tiêu chí mục tiêu: Performance + Accessibility + SEO ≥ 90   
● Chạy định kỳ sau mỗi lần deploy lớn.

# 6.5. Môi trường Dữ liệu Kiểm thử (Test Data)

● Dữ liệu giả lập (Test Account, Sample Cards, Sample Knowledge Base).   
● Dữ liệu nhạy cảm được mock hoặc anonymized.   
● Dataset riêng để test AI Digital Twin (các bộ câu hỏi chuẩn và adversarial).

# 6.6. Cấu hình môi trường

● Local Development: firebase emulators:start   
● Staging: Deploy lên Firebase Hosting + Functions   
● Sử dụng .env.local để quản lý API keys và configuration

# CHƯƠNG 7: CÁC TÀI LIỆU ĐẦU RA

# 7.1. Danh sách tài liệu cần bàn giao

Trong quá trình và sau khi hoàn thành kiểm thử, nhóm sẽ sản xuất và bàn giao các tài liệu sau:

<table><tr><td>STT</td><td>Tên tài liệu</td><td>Mô tả</td><td>Trạng thái</td></tr><tr><td>1</td><td>Test Plan</td><td>Tài liệu định hướng tổng thể chiến lược kiểm thử (tài liệu này)</td><td>Hoàn thành</td></tr><tr><td>2</td><td>Test Cases</td><td>Bộ test case chi tiết cho tất cả các chức năng</td><td>Đang thực hiện</td></tr><tr><td>3</td><td>Test Execution Report</td><td>Báo cáo kết quả chạy test (Pass/Fail, số lượng bug)</td><td>Sẽ thực hiện</td></tr><tr><td>4</td><td>Bug Report / Defect Log</td><td>Danh sách lỗi phát hiện, mức độ nghiêm trọng và trạng thái xử lý</td><td>Sẽ thực hiện</td></tr><tr><td>5</td><td>AI Testing Report</td><td>Báo cáo chuyên sâu về kiểm thử AI Digital Twin (Accuracy, Hallucination, Guardrails)</td><td>Sẽ thực hiện</td></tr><tr><td>6</td><td>Lighthouse Reports</td><td>Báo cáo hiệu năng, Accessibility và SEO của các trang chính</td><td>Sẽ thực hiện</td></tr><tr><td>7</td><td>Test Summary Report</td><td>Báo cáo tóm tắt cuối cùng cho Seminar</td><td>Sẽ thực hiện</td></tr><tr><td>8</td><td>Test Data</td><td>Bộ dữ liệu kiểm thử (accounts, cards, knowledge base)</td><td>Hoàn thành</td></tr></table>

# 7.2. Định dạng và lưu trữ tài liệu

● Tất cả tài liệu kiểm thử được quản lý trên Google Drive và GitHub Repository.   
Test Cases được viết dưới dạng bảng Excel/Google Sheets và Cypress test scripts.   
Bug Report sử dụng template chuẩn (Bug ID, Severity, Priority, Steps to Reproduce, Actual Result, Expected Result, Screenshot/Video).   
● Tất cả báo cáo đều có phiên bản và ngày cập nhật.

# 7.3. Tiêu chuẩn chất lượng tài liệu

Test Cases phải bao gồm: Test Case ID, Mô tả, Preconditions, Steps, Expected Result, Actual Result, Status.

● Mỗi bug phải có mức độ nghiêm trọng rõ ràng (Critical, High, Medium, Low).

● Báo cáo cuối cùng phải dễ hiểu, có biểu đồ và screenshot minh họa.

# 7.4. Phê duyệt tài liệu

Tất cả tài liệu đầu ra sẽ được nhóm xem xét nội bộ và trình giảng viên hướng dẫn (TS. Đỗ Như Tài) phê duyệt trước khi sử dụng trong buổi Seminar.