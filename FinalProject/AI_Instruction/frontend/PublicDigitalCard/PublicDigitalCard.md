Bạn là một senior frontend engineer và UI/UX designer.

Hãy xây dựng một giao diện frontend Next.js 15 App Router hoàn chỉnh, chỉn chu và có tính thẩm mỹ cao cho trang “Public Digital Profile with AI Digital Twin Chat”.

QUAN TRỌNG:
Viết toàn bộ source code bên trong thư mục có tên `Frontend`.

Bối cảnh dự án:
Đây là nền tảng Persona-Based Digital Card. Khách truy cập sẽ mở hồ sơ công khai sau khi quét QR code hoặc mở một URL cá nhân hóa như `/u/[username]`.

Trang này hoạt động như một portfolio hiện đại / digital business card, nhưng đồng thời có thêm một AI Digital Twin chat assistant đại diện cho chủ hồ sơ. AI phải tạo cảm giác là trợ lý của chủ hồ sơ, không phải chính người thật.

Khách truy cập có thể:
- Xem hồ sơ công khai của chủ sở hữu như một portfolio.
- Xem kỹ năng, dự án, kinh nghiệm, tiểu sử và các liên kết mạng xã hội.
- Bắt đầu trò chuyện với AI Digital Twin của chủ hồ sơ.
- Để lại thông tin liên hệ nếu AI bị tắt, bị lỗi, quá tải hoặc không thể trả lời.
- Báo cáo AI nếu AI có hành vi hung hăng, đưa thông tin sai lệch hoặc gây cảm giác không an toàn.
- Tải xuống ảnh contact card chứa tên, vai trò, thông tin ngắn và QR code.
- Xuất vCard như một tùy chọn lưu liên hệ phụ.

Yêu cầu công nghệ:
- Dùng Next.js 15 App Router.
- Dùng TypeScript.
- Dùng Tailwind CSS.
- Dùng Framer Motion cho animation nhẹ.
- Dùng icon từ lucide-react.
- Code sạch, chia component rõ ràng.
- Chỉ dùng mock data.
- Chưa xây backend thật.
- Không tích hợp authentication thật, database thật, AI API thật, file storage thật hoặc analytics thật.
- Code phải sẵn sàng để kết nối API thật sau này.
- Thiết kế responsive theo hướng mobile-first.
- UI phải trông như một product demo thật sự chỉn chu, không phải màn hình CRUD cơ bản.

Định hướng thiết kế:
Dùng phong cách premium dark-tech digital card.

Màu chính:
- Background: #0B0B0B
- Surface/card: #101010
- Brand blue: #2367A2
- Electric blue: #008FEA
- Màu sáng cho user chat bubble / input: #EAF3FC
- Text primary: #FFFFFF
- Text muted: #B7B7B7
- Danger: #E5484D
- Success: #2ECC71

Phong cách visual:
- Nền tối.
- Card bo góc lớn, radius khoảng 20-24px.
- Border mỏng dùng rgba(255,255,255,0.15).
- Có hiệu ứng blue glow quanh profile card chính.
- Button dạng pill, màu xanh, hover mượt.
- Card có shadow mềm và hover state nhẹ.
- Profile card nên giống một digital business card.
- Chat panel có thể dùng vùng message sáng bên trong layout tối để dễ đọc.
- Dùng font hiện đại, sạch sẽ. Tailwind default cũng được, nhưng cảm giác nên gần với Inter / Satoshi / Space Grotesk.
- Chỉ dùng animation nhẹ, không dùng hiệu ứng gây mất tập trung.

Trang chính:
Tạo public profile page cho “Anthony Simon”.

Route:
- `/u/[username]`

Mock username:
- `anthony-simon`

Bố cục trang:
- Mobile-first layout.
- Desktop layout dùng 2 cột:
  - Cột trái:
    - Profile hero card
    - QR / contact card preview
    - Social links
    - Save contact actions
  - Cột phải:
    - About
    - Skills
    - Featured projects
    - Experience
    - AI Twin Chat widget
- Trên mobile, tất cả section xếp dọc.
- Viewport đầu tiên phải hiển thị rõ:
  - Avatar
  - Name
  - Role
  - Short slogan
  - Social icons
  - Primary CTA: “Ask my AI Twin”
  - Secondary CTA: “Save Contact”
  - Small AI status badge

Mock profile data & backend-like data mapping:

Mock data phải mô phỏng đúng shape dữ liệu thô từ backend trả về, sau đó frontend sẽ map dữ liệu đó thành `PublicProfile`.

Không mock trực tiếp theo shape `PublicProfile` ngay từ đầu.

Trong `FrontEnd/lib/mock-public-profile-api.ts`, hãy tạo mock object dạng `card`, sau đó map sang `PublicProfile`.

Mock card phải có các field chính:
- id
- slug
- fullName
- jobTitle
- slogan
- bio
- avatarUrl
- aiStatus
- socialLinks
- aiConfig.knowledgeBase.skills
- aiConfig.knowledgeBase.projects
- aiConfig.knowledgeBase.experiences

Yêu cầu mapping:
- `username` lấy từ `card.slug || username`
- `name` lấy từ `card.fullName || 'No Name'`
- `role` lấy từ `card.jobTitle || 'No Title'`
- `slogan` lấy từ `card.slogan || ''`
- `bio` lấy từ `card.bio || ''`
- `skills` lấy từ `card.aiConfig?.knowledgeBase?.skills?.map(s => s.name) || []`
- `socialLinks` map từ `Object.entries(card.socialLinks || {})`
- `featuredProjects` map từ `card.aiConfig?.knowledgeBase?.projects`
  - `title` lấy từ `projectName`
  - `description` lấy từ `description`
  - `dateRange` để rỗng
  - `tags` để mảng rỗng
- `experience` map từ `card.aiConfig?.knowledgeBase?.experiences`
  - `company` lấy từ `companyName`
  - `description` lấy từ `description`
  - `dateRange` để rỗng
- `avatarUrl` lấy từ `card.avatarUrl`
- `aiStatus` map như sau:
  - `'AI Ready'` → `'ai_ready'`
  - các trạng thái còn lại → `'ai_disabled'`

Yêu cầu quan trọng:
- `getPublicProfile(username)` phải trả về dữ liệu đã được map thành `PublicProfile`.
- Mock data gốc bên trong mock API phải là `mockCard`, tức là shape giống backend.
- UI vẫn dùng type `PublicProfile` sau khi map xong.
- Không hard-code trực tiếp `skills`, `featuredProjects`, `experience`, `socialLinks` theo shape cuối trong component.
- Mục tiêu là FE mock đúng field backend tương lai, nhưng vẫn chưa kết nối API thật.

Các component bắt buộc:
Tạo các component tách biệt, sạch sẽ như sau:

1. PublicProfilePage
2. ProfileHeroCard
3. SocialLinks
4. AboutSection
5. SkillsSection
6. FeaturedProjects
7. ExperienceSection
8. SaveContactCard
9. AITwinChatWidget
10. LeadFallbackModal
11. ReportAIModal
12. StateSwitcher
13. LoadingSkeleton
14. EmptyState
15. Toast

Cấu trúc thư mục đề xuất:
- FrontEnd/app/u/[username]/page.tsx
- FrontEnd/components/public-profile/ProfileHeroCard.tsx
- FrontEnd/components/public-profile/SocialLinks.tsx
- FrontEnd/components/public-profile/AboutSection.tsx
- FrontEnd/components/public-profile/SkillsSection.tsx
- FrontEnd/components/public-profile/FeaturedProjects.tsx
- FrontEnd/components/public-profile/ExperienceSection.tsx
- FrontEnd/components/public-profile/SaveContactCard.tsx
- FrontEnd/components/public-profile/AITwinChatWidget.tsx
- FrontEnd/components/public-profile/LeadFallbackModal.tsx
- FrontEnd/components/public-profile/ReportAIModal.tsx
- FrontEnd/components/public-profile/StateSwitcher.tsx
- FrontEnd/components/public-profile/LoadingSkeleton.tsx
- FrontEnd/components/public-profile/EmptyState.tsx
- FrontEnd/components/ui/Toast.tsx
- FrontEnd/lib/mock-public-profile-api.ts
- FrontEnd/types/public-profile.ts

Yêu cầu kiến trúc:
Xây UI theo hướng frontend-first, nhưng phải dễ kết nối API thật sau này.

Không hard-code business logic quá sâu bên trong UI component. Hãy dùng một mock data layer sạch và các service-like function để sau này chỉ cần thay mock function bằng API thật.

Tạo TypeScript interfaces/types cho:
- PublicProfile
- SocialLink
- Project
- Experience
- AIStatus
- ChatMessage
- LeadFormData
- ReportData
- PublicProfileState

Tạo file mock API riêng:
`FrontEnd/lib/mock-public-profile-api.ts`

File này phải chứa các mock function dạng Promise:
- getPublicProfile(username)
- sendChatMessage(profileId, message)
- submitLeadForm(profileId, leadData)
- submitAIReport(profileId, reportData)
- downloadContactCard(profileId)
- exportVCard(profileId)

Hiện tại, các function này phải:
- Trả về mock data.
- Có delay nhân tạo ngắn.
- Mô phỏng cả success và error state.
- Dễ thay thế sau này bằng fetch / axios / Supabase thật.

Kiến trúc component:
- Page component xử lý state chính và gọi các mock service function.
- Child component nhận props và emit events.
- Tránh đặt mock arrays trực tiếp trong các component lồng sâu.
- Presentation component phải reusable.
- Chuẩn bị loading, success và error state cho hành vi API thật sau này.
- Chưa implement backend thật.

Hành vi AI Twin Chat:
Tạo một mock chat widget có thể tương tác.

Trạng thái chat ban đầu:
- Header: “Anthony’s AI Twin”
- Badge: “AI Ready”
- Disclaimer:
  “This is an AI assistant representing Anthony. It may not be the real person.”
- Tin nhắn assistant ban đầu:
  “Hi, I’m Anthony’s AI Twin. You can ask me about his skills, projects, experience, or collaboration availability.”

Tương tác chat:
- User có thể nhập vào input và gửi tin nhắn.
- Khi gửi:
  - Thêm tin nhắn của user vào chat.
  - Hiển thị typing/loading indicator.
  - Mock phản hồi AI sau một delay ngắn.
- Phản hồi AI dựa trên logic mock đơn giản:
  - Nếu user hỏi về projects, trả lời bằng tóm tắt project.
  - Nếu user hỏi về skills, trả lời bằng danh sách kỹ năng.
  - Nếu user hỏi về experience, trả lời bằng kinh nghiệm.
  - Nếu user hỏi về contact, collaboration, service, price, pricing, hiring hoặc business, gợi ý user để lại thông tin liên hệ.
  - Nếu user hỏi nội dung không biết, AI trả lời:
    “I do not have enough information about that. You can leave your contact information so Anthony can reply directly.”
- Thêm button trong chat:
  “Leave contact info”
- Thêm button nhỏ “Report AI” ở chat header hoặc gần widget.

Lưu ý quan trọng về hành vi AI:
- Không làm AI nói như thể nó chính là Anthony.
- Luôn label nó là “AI Twin”, “AI assistant”, hoặc “Anthony’s AI Twin”.
- AI không bao giờ được tự nhận là người thật.
- Thêm disclaimer rõ ràng trong chat.

Hành vi fallback / lead capture:
Lead form sẽ xuất hiện trong các trường hợp:
1. User tự bấm “Leave contact info”.
2. AI status là “AI Disabled”.
3. AI status là “AI Error”.
4. AI phát hiện visitor đang hỏi câu hỏi chi tiết về business, service, contact, pricing hoặc collaboration.
5. AI không thể trả lời câu hỏi một cách tự tin.

Lead fallback modal:
Tạo modal gồm:
- Title:
  “Leave your contact information”
- Subtitle:
  “Anthony can contact you directly if the AI cannot answer your question.”
- Fields:
  - Name
  - Email
  - Phone number
  - Message / Need
- Consent text:
  “By submitting this form, you agree that the profile owner may contact you back.”
- Buttons:
  - Cancel
  - Send

Hành vi lead form:
- Validate các field required bằng visual feedback.
- Email có basic email validation.
- Phone number là optional.
- Message là required.
- Khi submit, gọi `submitLeadForm`.
- Hiển thị loading state khi đang submit.
- Hiển thị success state:
  “Your information has been sent. Anthony will contact you later.”
- Hiển thị error state nếu mock API fail.

Report AI modal:
Dùng khi phản hồi của AI gây cảm giác hung hăng, không an toàn, sai lệch hoặc không phù hợp.

Trigger:
- Nút màu đỏ/danger:
  “Report AI”

Nội dung modal:
- Title:
  “Report this AI profile”
- Subtitle:
  “Tell us what happened so we can review this Digital Twin.”
- Textarea label:
  “Reason for report”
- Optional quick reason pill buttons:
  - Aggressive response
  - Misleading information
  - Spam
  - Privacy concern
  - Other
- Submit button:
  “Submit report”

Hành vi report:
- Khi submit, gọi `submitAIReport`.
- Hiển thị loading state khi đang submit.
- Hiển thị success message:
  “Thanks. This report has been submitted for review.”
- Modal không nên trông đáng sợ, nhưng phải dễ thấy và dễ truy cập.

Hành vi save contact:
Quan trọng:
Trong UI này, action chính “Save Contact” phải tải xuống contact card image, không chỉ tải `.vcf`.

Tạo component `SaveContactCard`.

Contact card preview phải gồm:
- Avatar
- Name
- Role
- Slogan
- QR placeholder lớn
- URL:
  `digitalcard.app/u/anthony-simon`

Buttons:
1. Primary button:
   “Download Contact Card”
2. Secondary button:
   “Export vCard”

Hành vi:
- Khi bấm “Download Contact Card”:
  - Gọi `downloadContactCard(profileId)`.
  - Mock việc download.
  - Hiển thị toast:
    “Contact card image downloaded.”
- Khi bấm “Export vCard”:
  - Gọi `exportVCard(profileId)`.
  - Mock việc export vCard.
  - Hiển thị toast:
    “vCard exported.”
- Không cần canvas export thật, trừ khi dễ implement.
- UI vẫn phải trông như có thể hỗ trợ download thật sau này.

Xử lý trạng thái:
Thêm một developer/demo state switcher nhỏ để preview các trạng thái của trang.

State switcher hỗ trợ:
1. Published + AI Ready
2. AI Disabled
3. AI Error
4. Profile Updating
5. Card Locked
6. 404 Not Found
7. Loading Skeleton

Quy tắc state:

Published + AI Ready:
- Hiển thị full profile.
- Hiển thị AI chat widget đang hoạt động.
- Chat input được enable.
- AI status badge màu xanh/success.

AI Disabled:
- Hiển thị full profile.
- Disable hoặc ẩn active chat input.
- Hiển thị message:
  “Anthony’s AI Twin is currently unavailable. You can still leave your contact information.”
- Hiển thị fallback lead form CTA.

AI Error:
- Hiển thị full profile.
- Hiển thị safe fallback message:
  “The AI assistant is under maintenance. Please leave your contact information and Anthony will get back to you.”
- Hiển thị fallback lead form CTA.
- Không hiển thị technical error detail.

Profile Updating:
- Ẩn unfinished profile content.
- Hiển thị centered empty state:
  “This profile is being updated.”

Card Locked:
- Ẩn profile content.
- Hiển thị centered empty state:
  “This profile is currently unavailable.”

404 Not Found:
- Hiển thị modern 404 page:
  “Digital profile not found.”

Loading Skeleton:
- Hiển thị skeleton card cho:
  - Profile hero
  - About section
  - Projects
  - Chat widget

Chi tiết UX:
- Social icons mở trong tab mới.
- Button có hover và focus state rõ ràng.
- Modal có backdrop overlay và close button.
- Input và button có accessible labels.
- Button và input thân thiện với keyboard.
- Spacing responsive.
- Trải nghiệm mobile phải tốt vì đa số visitor sẽ scan QR bằng điện thoại.
- Tránh layout shift.
- Dùng toast feedback cho các action.
- Dùng empty state sạch thay vì raw error.
- Không bao giờ hiển thị technical stack trace hoặc raw API error text cho visitor.

Expected output:
- Generate complete working code.
- App phải chạy được mà không thiếu import.
- Không để TODO placeholder.
- Giữ design nhất quán, premium, dark và demo-ready.
- Chỉ dùng mock data và mock API function.
- Code phải dễ kết nối với backend thật sau này.
- Chỉ tập trung vào frontend UI và client-side mock interaction.
