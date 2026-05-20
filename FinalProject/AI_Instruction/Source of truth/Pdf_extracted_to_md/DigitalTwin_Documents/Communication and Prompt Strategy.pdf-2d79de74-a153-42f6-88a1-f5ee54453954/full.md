# ĐẠI HỌC SÀI GÒN KHOA CÔNG NGHỆ THÔNG TIN

# COMMUNICATION AND PROMPT STRATEGY FOR PERSONA-BASED WEBSITE DIGITAL TWIN CARD

Học phần: Seminar Chuyên Đề

GVHD: TS. Đỗ Như Tài

Lớp: DCT122C3

Sinh viên thực hiện

<table><tr><td>STT</td><td>Họ và tên</td><td>MSSV</td></tr><tr><td>1</td><td>Châu Gia Anh</td><td>3122411002</td></tr><tr><td>2</td><td>Dương Lê Khánh</td><td>3122411093</td></tr><tr><td>3</td><td>Phan Thành Đại</td><td>3122411036</td></tr><tr><td>4</td><td>Đào Thị Thanh Tâm</td><td>3122411182</td></tr></table>

THÀNH PHỐ HỒ CHÍ MINH

# MỤC LỤC

# MỤC LỤC.....

# 1. GIỚI THIỆU..

1.1. Mục đích tài liệu..   
1.2. Phạm vi áp dụng.. a   
1.3. Source of Truth trong quy trình phát triển.. 3

# 2. NGUYÊN TẮC GIAO TIẾP CHUNG VỚI AI AGENT...

2.1. Nguyên tắc cốt lõi.. 5   
2.2. Quy tắc ứng xử khi làm việc với AI.. 5   
2.3. Mindset khi làm việc với AI..

# 3. PHÂN VAI TRÒ AGENT...

3.1. Tổng quan hệ thống Agent. 6   
3.2. Phân vai trò chi tiết.. 6   
3.3. Mô tả chi tiết vai trò. 6   
3.3.1. System Agent (BuilderIO)... 6   
3.3.2. Frontend Agent (Gemini 3.1 High). 6   
3.3.3. Backend Agent (GPT-5.2-Codex)..   
3.3.4. Testing Agent..   
3.4. Quy tắc sử dụng Agent..

# 4. CHIẾN LƯỢC PROMPT ENGINEERING.... .... 8

4.1. Nguyên tắc Prompt tốt. .8   
4.2. Cấu trúc Prompt chuẩn (Framework).. .8   
4.3. Kỹ thuật Prompt nâng cao.. 8   
4.4. Context Management.. 9   
4.5. Xử lý Output.. 9

# 5. QUY TRÌNH TRAO ĐỔI VỚI AGENT.. . 10

5.1. Quy trình tổng quát.. 10   
5.2. Chi tiết quy trình. 10   
5.3. Quy trình xử lý khi Agent trả lời sai / lệch. 11   
5.4. Best Practices trong Workflow.. 11

# 6. PROMPT TEMPLATES... 12

6.1. Mẫu Prompt yêu cầu Feature / User Story.. . 12   
6.2. Mẫu Prompt sinh Code.. .12   
6.3. Mẫu Prompt Debug & Fix Bug. .13   
6.4. Mẫu Prompt Review Code / Architecture.. .13   
6.5. Mẫu Prompt viết Test Case.. 13   
6.6. Mẫu Prompt viết Tài liệu. 14

# 7. BEST PRACTICES & QUY TẮC CẤM.. .15

7.1. Best Practices (Thực hành tốt nhất).. 15   
7.2. Quy tắc CẤM (Prohibited Rules)... .15

# 8. CÔNG CỤ HỖ TRỢ & QUẢN LÝ LỊCH SỬ PROMPT.. . 16

8.1. Công cụ chính được sử dụng.. .16   
8.2. Nguyên tắc quản lý lịch sử Prompt (dành cho AI).. .16   
8.3. Cách xử lý Context cho AI.. ..16   
8.4. Hướng dẫn cho AI khi làm việc với nhóm. .. 16

# 1. GIỚI THIỆU

# 1.1. Mục đích tài liệu

Tài liệu Communication and Prompt Strategy là một phần quan trọng trong hệ thống Source of Truth của nhóm. Tài liệu này định nghĩa rõ ràng cách thức giao tiếp, nguyên tắc trao đổi và chiến lược sử dụng Prompt hiệu quả khi làm việc với các AI Agents trong suốt quá trình phát triển dự án Persona-Based Website for Digital Twin Card.

Mục đích chính của tài liệu bao gồm:

● Đảm bảo sự nhất quán trong cách giao tiếp giữa các thành viên nhóm và AI Agents.   
● Tối ưu hóa chất lượng output từ AI, giảm thiểu hiểu lầm và rework.   
● Xây dựng quy trình làm việc chuẩn hóa, chuyên nghiệp với AI (AI-Native Workflow).   
● Làm tài liệu hướng dẫn tham khảo lâu dài cho Testing Agent, Frontend Agent, Backend Agent và System Agent.   
● Hỗ trợ nhóm đạt được hiệu quả cao nhất trong thời gian hạn chế của học phần Seminar Chuyên Đề.

# 1.2. Phạm vi áp dụng

Tài liệu này áp dụng cho toàn bộ thành viên Nhóm 1 trong tất cả các hoạt động liên quan đến AI Agent trong dự án, bao gồm:

● Phân tích yêu cầu và thiết kế   
● Sinh code (Frontend, Backend)   
● Viết Test Case và Test Plan   
● Debug, tối ưu và review code   
● Viết tài liệu (PRD, GUI Design, Architecture, Test Plan, Báo cáo…)   
● Xây dựng Prompt Strategy cho AI Digital Twin của sản phẩm

Tài liệu tập trung vào việc giao tiếp với các mô hình AI lớn (LLMs) trong giai đoạn phát triển dự án Seminar Chuyên Đề.

# 1.3. Source of Truth trong quy trình phát triển

Tài liệu Communication and Prompt Strategy là một trong những tài liệu cốt lõi của hệ thống Source of Truth của nhóm, cùng với:

● Product Requirement Document (PRD)   
● GUI Design Document

● Architecture & Database Design   
● Test Plan

Mọi Prompt gửi cho AI Agent đều phải tuân thủ và tham chiếu đến các tài liệu Source of Truth này. Khi có sự mâu thuẫn, ưu tiên tuân theo thứ tự sau:

1. PRD & GUI Design (yêu cầu nghiệp vụ & giao diện)   
2. Architecture & Database (kiến trúc hệ thống)   
3. Communication and Prompt Strategy (cách thức giao tiếp)   
4. Các guideline chuyên biệt (Frontend Guideline, Backend Guideline, Testing Guideline)

# 2. NGUYÊN TẮC GIAO TIẾP CHUNG VỚI AI AGENT

# 2.1. Nguyên tắc cốt lõi

Nhóm tuân thủ 5 nguyên tắc vàng khi giao tiếp với AI Agent:

1. Rõ ràng – Chính xác – Đầy đủ Mọi yêu cầu phải cụ thể, tránh mơ hồ. Cung cấp đầy đủ context cần thiết (tham chiếu tài liệu, yêu cầu chức năng, ràng buộc kỹ thuật).   
2. Tư duy vai trò (Role-playing) Luôn gán vai trò rõ ràng cho AI (System Prompt) trước khi đưa nhiệm vụ. Ví dụ: “Bạn là Senior Frontend Developer chuyên Next.js 15…” hoặc “Bạn là Testing Engineer chuyên Cypress và AI testing…”   
3. Tham chiếu Source of Truth Bắt buộc trích dẫn hoặc đính kèm các tài liệu chính (PRD, GUI Design, Architecture…) khi yêu cầu nội dung liên quan.   
4. Phân tích từng bước (Step-by-step) Yêu cầu AI suy nghĩ và trả lời theo từng bước (Chain-of-Thought) để tăng độ chính xác và dễ kiểm soát output.   
5. Iterative & Feedback Không chấp nhận output lần đầu nếu chưa đạt yêu cầu. Luôn đưa feedback cụ thể để Agent tinh chỉnh (Refine).

# 2.2. Quy tắc ứng xử khi làm việc với AI

● Ngôn ngữ: Ưu tiên sử dụng tiếng Việt rõ ràng, kết hợp thuật ngữ tiếng Anh chuẩn ngành (không dịch máy).   
● Context Window: Giữ prompt trong giới hạn hợp lý, tóm tắt thông tin cũ thay vì paste toàn bộ lịch sử dài.   
● Tính nhất quán: Giữ chung tone, style code, naming convention qua các tương tác.   
● Xác thực output: Luôn kiểm tra output trước khi áp dụng (code phải compile, logic phải đúng, giao diện phải khớp GUI).   
● Bảo mật: Không chia sẻ thông tin nhạy cảm, API keys, hoặc dữ liệu cá nhân với AI.

# 2.3. Mindset khi làm việc với AI

● AI là người hỗ trợ mạnh mẽ, không phải thay thế hoàn toàn tư duy.   
● Luôn giữ vai trò kiểm soát cuối cùng (Human in the loop).   
● Mục tiêu là đạt được tốc độ + chất lượng cao nhất, không phải chỉ nhanh.   
● Khi AI trả lời sai hoặc lệch hướng → Phân tích nguyên nhân và điều chỉnh prompt thay vì bỏ qua.

# 3. PHÂN VAI TRÒ AGENT

# 3.1. Tổng quan hệ thống Agent

Nhóm sử dụng mô hình Multi-Agent để tối ưu hiệu quả phát triển. Mỗi Agent có vai trò chuyên trách rõ ràng, giúp phân công công việc và tận dụng điểm mạnh của từng mô hình AI.

BuilderIO được định nghĩa là System Agent – Agent đa năng, có mặt ở mọi nơi, đóng vai trò trung tâm điều phối và hỗ trợ tổng thể.

# 3.2. Phân vai trò chi tiết

<table><tr><td>Agent</td><td>Mô hình chính</td><td>Vai trò chính</td><td>Trách nhiệm chính</td></tr><tr><td>System Agent</td><td>BuilderIO</td><td>Agent điều phối tổng thể</td><td>Hỗ trợ toàn dự án, phân tích yêu cầu, thiết kế giải pháp, review tổng thể, hỗ trợ đặc lực cho tất cả thành viên</td></tr><tr><td>Frontend Agent</td><td>Gemini 3.1 High</td><td>Chuyên gia Frontend</td><td>Next.js 15, React, TailwindCSS, UI/UX, Component Design, Responsive, Animation, Cypress E2E Testing</td></tr><tr><td>Backend Agent</td><td>GPT-5.2-Codex</td><td>Chuyên gia Backend</td><td>Node.js, Express.js, Firebase, API Design, Authentication, Business Logic, Database Modeling, Security</td></tr><tr><td>Testing Agent</td><td>BuilderIO / Gemini</td><td>Chuyên gia Kiểm thử</td><td>Viết Test Plan, Test Cases, Automation Testing, AI Testing, Bug Analysis, Test Report</td></tr></table>

# 3.3. Mô tả chi tiết vai trò

# 3.3.1. System Agent (BuilderIO)

● Là Agent chính và Source of Truth Coordinator.   
● Hỗ trợ phân tích yêu cầu tổng thể, đề xuất kiến trúc, giải quyết vấn đề phức tạp.   
● Hỗ trợ viết tài liệu, Prompt Strategy, và điều phối workflow giữa các Agent khác.   
● Được ưu tiên sử dụng khi cần góc nhìn tổng quan hoặc giải quyết conflict giữa Frontend và Backend.

# 3.3.2. Frontend Agent (Gemini 3.1 High)

● Chuyên trách toàn bộ phần giao diện và trải nghiệm người dùng.

● Đảm bảo tuân thủ nghiêm ngặt GUI Design Document.   
● Tối ưu performance, accessibility và responsive (Mobile-first).   
● Viết và tối ưu component, styling (Tailwind), animation và Cypress test.

# 3.3.3. Backend Agent (GPT-5.2-Codex)

● Chuyên trách logic nghiệp vụ, API và tích hợp hệ thống.   
● Thiết kế và triển khai kiến trúc Backend theo Architecture & Database Document.   
● Xử lý Firebase (Firestore, Auth, Storage), Security Rules, API routes, và tích hợp AI (OpenRouter/OpenAI).

# 3.3.4. Testing Agent

● Chuyên trách kiểm thử và đảm bảo chất lượng.   
● Hỗ trợ viết Test Plan, Test Cases, Automation Scripts.   
● Thực hiện kiểm thử AI Digital Twin (Accuracy, Guardrails, Hallucination).

# 3.4. Quy tắc sử dụng Agent

● Mỗi task nên giao cho Agent chuyên trách chính trước.   
● Có thể sử dụng System Agent (BuilderIO) để review hoặc tổng hợp output từ các Agent khác.   
● Khi cần ý kiến đa chiều, có thể đưa cùng một task cho 2 Agent để so sánh và chọn giải pháp tốt nhất.

# 4. CHIẾN LƯỢC PROMPT ENGINEERING

# 4.1. Nguyên tắc Prompt tốt

Nhóm tuân thủ 6 nguyên tắc cốt lõi khi soạn Prompt:

1. Cụ thể & Chi tiết – Tránh prompt mơ hồ.   
2. Cung cấp Context đầy đủ – Luôn đính kèm hoặc trích dẫn tài liệu liên quan.   
3. Gán vai trò rõ ràng (Role Prompting).   
4. Yêu cầu suy nghĩ từng bước (Chain-of-Thought).   
5. Định nghĩa Output Format – Chỉ rõ định dạng trả về (code, bảng, JSON, markdown…).   
6. Đưa ra tiêu chí đánh giá – Yêu cầu Agent tự đánh giá output theo tiêu chuẩn.

# 4.2. Cấu trúc Prompt chuẩn (Framework)

Mọi Prompt quan trọng nên tuân theo cấu trúc sau:

\*\*Vai trò (Role):\*\* Bạn là [Vai trò cụ thể, ví dụ: Senior Frontend Developer chuyên Next.js 15 & TailwindCSS].

\*\*Context:\*\* - Dự án: Persona-Based Digital Twin Card - Tài liệu tham khảo: [PRD / GUI Design / Architecture...] - Yêu cầu hiện tại: [Mô tả ngắn]

\*\*Nhiệm vụ:\*\* [Nhiệm vụ chi tiết]

\*\*Ràng buộc & Tiêu chuẩn:\*\* - Phải tuân thủ GUI Design Document (dark mode, color token, component style...) - Phải responsive Mobile-first - Code phải sạch, có comment, tuân thủ naming convention ...

\*\*Output Format:\*\* - Trả về dưới dạng Markdown - Code block rõ ràng với ngôn ngữ - Giải thích từng bước nếu cần

# 4.3. Kỹ thuật Prompt nâng cao

● Chain-of-Thought (CoT): Yêu cầu AI “Hãy suy nghĩ từng bước một trước khi đưa ra giải pháp.”   
● Few-shot Prompting: Đưa 1-2 ví dụ tốt để AI học theo.   
Multi-step Prompting: Phân task thành nhiều bước (Phân tích → Thiết kế → Triển khai → Review).   
● Self-Consistency: Yêu cầu AI kiểm tra lại output của chính mình.   
● Tree of Thoughts: Sử dụng khi giải quyết vấn đề phức tạp.

# 4.4. Context Management

● Ưu tiên đính kèm link hoặc tóm tắt các tài liệu Source of Truth.   
● Giữ lịch sử chat ngắn gọn, chỉ giữ các thông tin quan trọng.   
● Khi context quá dài → Tóm tắt lại và bắt đầu prompt mới với version cập nhật.   
● Luôn nhắc Agent tham chiếu đúng phiên bản tài liệu (ví dụ: GUI Design v1.2).

# 4.5. Xử lý Output

● Yêu cầu Agent luôn giải thích lý do cho các quyết định quan trọng.   
● Yêu cầu liệt kê các giả định nếu có.   
● Luôn yêu cầu đề xuất cải tiến hoặc các lựa chọn thay thế khi phù hợp.

# 5. QUY TRÌNH TRAO ĐỔI VỚI AGENT

# 5.1. Quy trình tổng quát

Nhóm áp dụng quy trình làm việc 5 bước chuẩn hóa khi giao nhiệm vụ cho AI Agent:

1. Chuẩn bị Task   
2. Gửi Prompt   
3. Nhận & Phân tích Output   
4. Refine / Iterate   
5. Xác nhận & Áp dụng

# 5.2. Chi tiết quy trình

# Bước 1: Chuẩn bị Task

● Xác định rõ Agent chuyên trách (Frontend Agent, Backend Agent, System Agent…).   
● Thu thập đầy đủ thông tin:

○ Tài liệu tham khảo (PRD, GUI Design, Architecture…)   
○ Yêu cầu cụ thể   
○ Ràng buộc kỹ thuật   
○ Tiêu chí đánh giá thành công

# Bước 2: Gửi Prompt

● Sử dụng cấu trúc Prompt chuẩn tại Mục 4.2.   
● Bắt đầu bằng việc gán vai trò rõ ràng.   
● Đính kèm hoặc trích dẫn Source of Truth.   
● Yêu cầu suy nghĩ từng bước (Chain-of-Thought).

# Bước 3: Nhận & Phân tích Output

● Đọc kỹ output và tự đánh giá theo tiêu chí đã nêu trong Prompt.   
● Kiểm tra:   
○ Có đúng yêu cầu không?   
○ Có tuân thủ GUI Design / Architecture không?   
○ Có lỗi logic, security, performance không?   
○ Code có sạch và dễ maintain không?

# Bước 4: Refine & Iterate (Tinh chỉnh)

● Nếu output chưa đạt → Đưa feedback cụ thể và có cấu trúc:

○ Điểm tốt   
○ Điểm cần sửa   
○ Yêu cầu thay đổi chi tiết

Ví dụ: “Output tốt ở phần UI, nhưng logic validation chưa đúng theo PRD section 4.1.2. Hãy chỉnh lại theo đúng yêu cầu…”

# Bước 5: Xác nhận & Áp dụng

● Chỉ áp dụng code/tài liệu khi đã đạt yêu cầu.   
● Commit code kèm ghi chú rõ ràng.   
● Cập nhật tiến độ task trong nhóm.

# 5.3. Quy trình xử lý khi Agent trả lời sai / lệch

1. Phân tích nguyên nhân: Context thiếu, prompt mơ hồ, hoặc Agent chưa hiểu ràng buộc.   
2. Cung cấp thêm thông tin: Trích dẫn chính xác đoạn tài liệu liên quan.   
3. Reset context nếu cần: Bắt đầu prompt mới với tóm tắt ngắn gọn.   
4. Chuyển Agent: Nếu một Agent không giải quyết tốt, chuyển sang System Agent (BuilderIO) hoặc Agent khác.

# 5.4. Best Practices trong Workflow

● Giữ mỗi cuộc trò chuyện tập trung vào một nhiệm vụ chính.   
Không paste quá nhiều code trong một prompt.   
● Luôn đánh số phiên bản khi refine (v1 → v2 → v3…).   
● Ghi lại những Prompt tốt để tái sử dụng sau này.

# 6. PROMPT TEMPLATES

Dưới đây là bộ mẫu Prompt chuẩn đã được tối ưu hóa cho dự án. Các thành viên nên sử dụng hoặc chỉnh sửa dựa trên các mẫu này để đảm bảo hiệu quả và tính nhất quán.

# 6.1. Mẫu Prompt yêu cầu Feature / User Story

\*\*Vai trò:\*\*

Bạn là Senior Fullstack Developer có 8 năm kinh nghiệm, đang tham gia dự án Persona-Based Digital Twin Card.

\*\*Context:\*\*

\- Tài liệu tham khảo: PRD v1.0, GUI Design Document, Architecture & Database Design.

\- Tính năng cần triển khai: [Mô tả ngắn gọn tính năng]

\*\*Nhiệm vụ:\*\*

Hãy phân tích và đề xuất giải pháp triển khai chi tiết cho tính năng trên.

\*\*Yêu cầu:\*\*

- Phân tích theo từng bước (Chain-of-Thought)   
- Đề xuất cấu trúc component (Frontend) và API (Backend)   
- Tuân thủ Mobile-first và Design System trong GUI Document   
- Xử lý lỗi và fallback cases   
- Đề xuất Test Cases chính

\*\*Output Format:\*\*

1. Phân tích yêu cầu   
2. Giải pháp tổng thể   
3. Chi tiết Frontend   
4. Chi tiết Backend   
5. Database & Security notes   
6. Test Cases gợi ý

# 6.2. Mẫu Prompt sinh Code

\*\*Vai trò:\*\*

Bạn là Senior [Frontend / Backend] Developer chuyên sâu.

\*\*Context:\*\*

- Dự án: Persona-Based Digital Twin Card   
- File hiện tại: [tên file]   
- Yêu cầu: [mô tả rõ chức năng]

\*\*Yêu cầu code:\*\*

- Sử dụng [Next.js 15 App Router / Express.js]   
- Tuân thủ nghiêm ngặt GUI Design (color tokens, component style, dark mode)   
- Code sạch, có comment, TypeScript   
- Xử lý error và loading state   
- Responsive hoàn hảo

\*\*Output:\*\*

Trả về chỉ code trong block \`\`\`tsx (hoặc \`\`\`ts) kèm giải thích ngắn gọn các phần quan trọng.

# 6.3. Mẫu Prompt Debug & Fix Bug

\*\*Vai trò:\*\*

Bạn là Senior Debugging Expert.

\*\*Context:\*\*

\- Có lỗi: [Mô tả lỗi]

\- Code hiện tại: [paste code]

\- Expected behavior: [hành vi mong muốn]

\- Actual behavior: [hành vi thực tế]

\*\*Nhiệm vụ:\*\*

Hãy phân tích nguyên nhân gây lỗi và đưa ra cách fix chi tiết.

# 6.4. Mẫu Prompt Review Code / Architecture

\*\*Vai trò:\*\*

Bạn là Technical Lead / Code Reviewer có kinh nghiệm 10 năm.

\*\*Nhiệm vụ:\*\*

Review đoạn code sau theo các khía cạnh:

\- Tính đúng đắn logic & nghiệp vụ

\- Tuân thủ Architecture Design

\- Performance & Security

\- Code quality & Best practices

\- Tuân thủ GUI Design (nếu Frontend)

\*\*Code cần review:\*\*

[paste code]

# 6.5. Mẫu Prompt viết Test Case

\*\*Vai trò:\*\*

Bạn là QA Engineer chuyên Automation Testing với Cypress và Jest.

\*\*Nhiệm vụ:\*\*

Viết Test Cases cho tính năng: [tên tính năng]

\*\*Yêu cầu:\*\*

- Functional Test Cases   
- Edge cases & Negative cases   
- Cypress E2E Test scenarios   
- Test Data gợi ý

# 6.6. Mẫu Prompt viết Tài liệu

\*\*Vai trò:\*\*

Bạn là Technical Writer chuyên nghiệp.

\*\*Nhiệm vụ:\*\*

Viết chương [số chương] cho tài liệu [tên tài liệu] với phong cách trang trọng, học thuật nhưng dễ hiểu.

\*\*Yêu cầu:\*\*

- Sử dụng ngôn ngữ tiếng Việt chuyên nghiệp   
- Có bảng biểu khi cần   
- Tham chiếu đúng các tài liệu Source of Truth

# 7. BEST PRACTICES & QUY TẮC CẤM

# 7.1. Best Practices (Thực hành tốt nhất)

1. Luôn tham chiếu Source of Truth Bất kỳ Prompt nào liên quan đến yêu cầu nghiệp vụ, giao diện hoặc kiến trúc đều phải trích dẫn rõ ràng PRD, GUI Design hoặc Architecture Document.   
2. Phân task nhỏ và rõ ràng Tốt hơn là giao nhiều task nhỏ, cụ thể thay vì một task lớn, phức tạp.   
3. Sử dụng phiên bản (Versioning) Khi refine prompt, hãy đánh số rõ ràng (v1, v2, v3…) và tóm tắt những thay đổi đã yêu cầu.   
4. Kết hợp sức mạnh nhiều Agent

○ Dùng Gemini 3.1 High cho Frontend/UI   
○ Dùng GPT-5.2-Codex cho Backend/Logic   
○ Dùng BuilderIO để review tổng thể hoặc giải quyết vấn đề khó.

5. Tự kiểm tra trước khi áp dụng Luôn compile, test code locally trước khi commit.   
6. Ghi chép Prompt tốt Lưu lại những Prompt mang lại kết quả xuất sắc để tái sử dụng sau này.   
7. Human in the Loop AI chỉ là công cụ hỗ trợ. Thành viên nhóm phải là người quyết định cuối cùng.

# 7.2. Quy tắc CẤM (Prohibited Rules)

● Không paste toàn bộ file code dài dòng vào prompt (chỉ paste phần liên quan).   
● Không dùng prompt mơ hồ kiểu “Làm giúp mình cái này”.   
● Không yêu cầu AI tạo tính năng nằm ngoài phạm vi MVP hoặc Out of Scope.   
● Không chia sẻ API Key, Secret Key, hoặc thông tin nhạy cảm với AI.   
● Không chấp nhận output mà không kiểm tra (đặc biệt là code và logic).   
● Không thay đổi Design System (màu sắc, component style) mà không có sự đồng ý của cả nhóm.   
● Không để AI tự quyết định kiến trúc lớn mà không có review từ System Agent (BuilderIO).   
Không tiếp tục refine vô thời hạn với cùng một prompt kém. Hãy viết lại prompt từ đầu nếu cần.

# 8. CÔNG CỤ HỖ TRỢ & QUẢN LÝ LỊCH SỬ PROMPT

# 8.1. Công cụ chính được sử dụng

● BuilderIO — System Agent (Agent đa năng, điều phối tổng thể)   
● Gemini 3.1 High — Frontend Agent   
● GPT-5.2-Codex — Backend Agent   
● Cursor.sh — Hỗ trợ viết và chỉnh sửa code trực tiếp trong IDE

# 8.2. Nguyên tắc quản lý lịch sử Prompt (dành cho AI)

Vì tài liệu này là Source of Truth để AI đọc, vui lòng tuân thủ các nguyên tắc sau khi làm việc với chúng tôi:

1. Mỗi cuộc trò chuyện nên tập trung vào một nhiệm vụ chính.   
2. Không giữ lịch sử quá dài trong một thread. Khi context trở nên dài và rối, hãy tóm tắt lại tình hình hiện tại và bắt đầu một cuộc trò chuyện mới với tóm tắt ngắn gọn.   
3. Luôn tham chiếu rõ ràng đến các tài liệu Source of Truth (PRD, GUI Design, Architecture, Test Plan…).   
4. Sử dụng phiên bản khi tinh chỉnh: Khi tôi yêu cầu chỉnh sửa, hãy đánh dấu output là v2, v3, v4… để dễ theo dõi.   
5. Tự động tóm tắt: Nếu cuộc trò chuyện dài, bạn có thể đề xuất tóm tắt lại các quyết định quan trọng trước khi tiếp tục.

# 8.3. Cách xử lý Context cho AI

● Ưu tiên prompt ngắn gọn nhưng đầy đủ.   
● Khi cần nhiều thông tin, hãy yêu cầu tôi cung cấp tóm tắt hoặc trích dẫn cụ thể thay vì paste toàn bộ tài liệu.   
● Nếu bạn cần thêm thông tin để hiểu rõ task, hãy hỏi trực tiếp và cụ thể.   
● Luôn ưu tiên tuân thủ GUI Design Document và Architecture Document khi có mâu thuẫn.

# 8.4. Hướng dẫn cho AI khi làm việc với nhóm

Khi nhận được task từ thành viên nhóm:

● Đọc kỹ vai trò được gán.   
● Tham chiếu các tài liệu Source of Truth được đề cập.   
● Suy nghĩ từng bước (Chain-of-Thought).   
● Đưa ra output rõ ràng, có cấu trúc.   
● Nếu không chắc chắn → Hỏi lại ngay thay vì đoán.