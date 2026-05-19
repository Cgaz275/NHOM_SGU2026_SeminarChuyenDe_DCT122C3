Bạn là một senior frontend engineer và UI/UX designer.

Tiếp tục làm việc bên trong project Next.js 15 App Router hiện có.

IMPORTANT:
Sử dụng đúng casing của folder frontend hiện tại.
Không tạo thêm folder bị trùng như `Frontend` / `FrontEnd`.

Không làm hỏng các route hiện có:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/dashboard/qr-manager`
- `/login`
- `/register`

Task:
Xây dựng lại trang `/dashboard/inbox` dựa trên screenshot đã cung cấp.

Đây là màn hình Persona Inbox, nơi chủ thẻ có thể xem các cuộc hội thoại từ khách truy cập và thông tin liên hệ cơ bản của khách hàng.

Route:
`/dashboard/inbox`

Yêu cầu ngôn ngữ quan trọng:
Toàn bộ text hiển thị trên UI phải là tiếng Việt.
Code, tên component, tên biến và tên file có thể giữ tiếng Anh.

Không implement logic backend thật.
Chỉ sử dụng mock data và local React state.
Không kết nối database, authentication, realtime service, AI API, email service hoặc notification service.

Visual direction:
Bám sát screenshot:
- Sidebar dashboard nền tối ở bên trái
- Cột danh sách hội thoại nền tối
- Khu vực chat transcript nền sáng ở giữa
- Chat header màu xanh
- Panel thông tin khách hàng nền tối ở bên phải
- Search input và filter chips nằm phía trên danh sách hội thoại
- Chat input cố định ở cuối khu vực chat
- UI dashboard tối giản, sạch sẽ
- Không overbuild các chức năng không xuất hiện trong screenshot

Dashboard sidebar:
Sử dụng cùng style dashboard sidebar với các màn hình dashboard hiện có.

Sidebar logo:
“SEMINAR”

Sidebar items:
- “Quản lý thông tin”
- “Quản lý Persona”
- “Quản lý QR”
- “Quản lý tin nhắn”

Active sidebar item:
“Quản lý tin nhắn”

Main layout:
Sử dụng layout desktop 4 cột:
1. Sidebar
2. Conversation list
3. Chat transcript
4. Customer info panel

Recommended widths:
- Sidebar: khoảng 220px
- Conversation list: khoảng 300px
- Chat transcript: flexible
- Customer info panel: khoảng 260px

Mobile:
- Giữ đơn giản.
- Có thể stack các view hoặc cho phép horizontal layout fallback.
- Conversation list và chat area không được bị vỡ giao diện.
- Chat messages phải dễ đọc.

Conversation list column:

Header:
Title:
“Hộp thư Persona”

Subtitle:
“4 hội thoại”

Search input placeholder:
“Tìm theo tên, email, số điện thoại...”

Filter chips:
- “Tất cả”
- “Chưa đọc”
- “Đã lưu trữ”
- “Lead mới”
- “AI tạm dừng”

Conversation item cần hiển thị:
- Avatar initials
- Visitor name
- Email hoặc phone nếu có
- Last message preview
- Last message time
- Các status badge nhỏ

Mock conversations:
Tạo đúng 4 conversations giống screenshot.

Important:
Mock data phải match chính xác với Conversation shape hiện tại của frontend.
Mỗi conversation phải có:
- id
- visitorName
- visitorEmail
- visitorPhone
- source
- status
- mode
- leadTag
- lastMessage
- lastMessageAt
- unreadCount
- isArchived
- emailNotificationEnabled
- lead
- messages

Mỗi lead object phải có:
- name
- email
- phone

Mỗi message phải có:
- id
- sender
- content
- createdAt

Các field optional của message:
- isSystemEvent
- type

Sử dụng ISO string hợp lệ cho `lastMessageAt` và `createdAt`.
Không dùng display-only string như “32 phút trước” làm data value cho `lastMessageAt`.
UI có thể format ISO date thành relative time.

Mock data:

1. Labubu

id:
conv_labubu

visitorName:
Labubu

visitorEmail:
labubu@gmail.com

visitorPhone:
0700700707

source:
qr

status:
unread

mode:
ai_active

leadTag:
new_lead

lastMessage:
“Cho tôi xin thông tin liên hệ.”

lastMessageAt:
Dùng ISO string khoảng 32 phút trước thời điểm hiện tại.

unreadCount:
2

isArchived:
false

emailNotificationEnabled:
true

lead:
name: Labubu
email: labubu@gmail.com
phone: 0700700707

messages:
- visitor: “Xin chào, bạn là AI hả?”
- ai: “Mình là AI Twin của Anthony. Mình có thể trả lời về kỹ năng, dự án và kinh nghiệm của Anthony.”
- visitor: “Cho tôi xin thông tin liên hệ.”

2. Minh Anh

id:
conv_minh_anh

visitorName:
Minh Anh

visitorEmail:
minhanh@example.com

visitorPhone:
0912345678

source:
link

status:
read

mode:
human_takeover

leadTag:
interested

lastMessage:
“Dạ, em cảm ơn anh.”

lastMessageAt:
Dùng ISO string khoảng 2 giờ trước thời điểm hiện tại.

unreadCount:
0

isArchived:
false

emailNotificationEnabled:
true

lead:
name: Minh Anh
email: minhanh@example.com
phone: 0912345678

messages:
- visitor: “Em muốn hỏi thêm về dịch vụ làm portfolio.”
- owner: “Anh có thể tư vấn thêm cho em nhé.”
- visitor: “Dạ, em cảm ơn anh.”

3. Khách ẩn danh

id:
conv_anonymous

visitorName:
Khách ẩn danh

visitorEmail:
empty string

visitorPhone:
empty string

source:
qr

status:
read

mode:
ai_active

leadTag:
none

lastMessage:
“Kể cho tôi nghe về Anthony đi.”

lastMessageAt:
Dùng ISO string khoảng 5 giờ trước thời điểm hiện tại.

unreadCount:
0

isArchived:
false

emailNotificationEnabled:
false

lead:
undefined hoặc omit field này

messages:
- visitor: “Kể cho tôi nghe về Anthony đi.”
- ai: “Anthony là một lập trình viên đang xây dựng portfolio cá nhân và AI Digital Twin để hỗ trợ giao tiếp với khách truy cập.”

4. Công ty ABC

id:
conv_company_abc

visitorName:
Công ty ABC

visitorEmail:
contact@abc.vn

visitorPhone:
0281234567

source:
form

status:
read

mode:
ai_paused

leadTag:
needs_reply

lastMessage:
“Báo giá dịch vụ làm web.”

lastMessageAt:
Dùng ISO string khoảng 1 ngày trước thời điểm hiện tại.

unreadCount:
0

isArchived:
false

emailNotificationEnabled:
true

lead:
name: Công ty ABC
email: contact@abc.vn
phone: 0281234567

messages:
- visitor: “Chào bạn, bên mình cần báo giá dịch vụ làm web.”
- ai: “Mình đã ghi nhận nhu cầu của bạn. Chủ thẻ sẽ phản hồi thêm khi cần.”
- system: “AI đã tạm dừng trong hội thoại này.” với isSystemEvent true và type system
- visitor: “Báo giá dịch vụ làm web.”

Selected conversation:
Default selected conversation phải là “Labubu”.
Selected item cần có blue left border hoặc blue highlight giống screenshot.

Chat transcript area:

Header:
- Visitor name
- Source badge
- Status text
- Button text:
  “Tiếp quản hội thoại”
- Three-dot menu icon

Với selected conversation Labubu:

Visitor name:
“Labubu”

Source badge:
“QR”

Status:
“Chưa đọc”

Chat area:
Dùng nền sáng, gần trắng hoặc #F5F5F5.

Message bubble rules:
- Visitor messages align left
- AI messages align right
- Visitor bubbles màu đen/tối
- AI bubbles màu xanh nhạt
- Message bubbles gọn giống screenshot

Sender labels không bắt buộc trong bubble, trừ khi thật sự hữu ích về mặt UI.

Default messages cho Labubu:

Visitor:
“Xin chào, bạn là AI hả?”

AI:
“Mình là AI Twin của Anthony. Mình có thể trả lời về kỹ năng, dự án và kinh nghiệm của Anthony.”

Visitor:
“Cho tôi xin thông tin liên hệ.”

Chat input:
Nằm ở cuối transcript.

Placeholder:
“Bật Tiếp quản để nhắn trực tiếp với khách.”

Send button:
Dùng send icon button.
Input có thể disabled mặc định nếu AI vẫn đang active.

Human takeover:
Giữ logic đơn giản.

Khi click “Tiếp quản hội thoại”:
- Hiển thị confirmation modal.

Modal title:
“Tiếp quản hội thoại?”

Modal message:
“Khi tiếp quản, AI sẽ tạm dừng trả lời và bạn có thể nhắn trực tiếp với khách.”

Buttons:
- “Hủy”
- “Tiếp quản”

Sau khi confirm:
- Đổi status badge thành “Người thật tiếp quản”
- Đổi header button thành “Trả lại cho AI”
- Enable chat input
- Input placeholder đổi thành:
  “Nhập tin nhắn với tư cách chủ thẻ...”
- Hiển thị một banner nhỏ phía trên messages:
  “Chủ thẻ đang trực tiếp hỗ trợ. AI đã tạm dừng trong hội thoại này.”

Khi typing và gửi message:
- Thêm một owner message mới align right với blue bubble đậm hơn.
- Clear input.
- Show toast:
  “Đã gửi tin nhắn.”

Khi click “Trả lại cho AI”:
- Hiển thị confirmation modal.

Modal title:
“Trả lại hội thoại cho AI?”

Modal message:
“AI Twin sẽ tiếp tục phản hồi tự động dựa trên cấu hình hiện tại.”

Buttons:
- “Hủy”
- “Trả lại cho AI”

Customer info panel:

Right panel title:
“Thông tin khách”

Hiển thị:
- Large circular avatar initial
- Visitor name
- Email
- Phone number

Với Labubu:

Name:
“Labubu”

Email:
“labubu@gmail.com”

Phone:
“0700700707”

Dùng icons cho email và phone nếu có sẵn.

Không thêm các lead management actions không cần thiết.

Không implement:
- Mark as contacted
- Send email
- Copy email
- Copy phone
- Internal note
- Lead drawer
- Email notification toggle
- Delete conversation
- Restore conversation
- Archive confirmation flow
- Complex action menu
- Realtime service

States:
Chỉ implement các state đơn giản:

1. Loading

Text:
“Đang tải hội thoại...”

2. Empty inbox

Text:
“Chưa có hội thoại nào.”

3. No conversation selected

Text:
“Chọn một hội thoại để xem nội dung.”

Mock API:
Create hoặc update:
`lib/mock-inbox-api.ts`

Export các Promise-based mock functions:
- getConversations()
- getConversationById(conversationId)
- toggleHumanTakeover(conversationId, enabled)
- sendOwnerMessage(conversationId, message)

Rules:
- Dùng artificial delay.
- Không dùng random errors.
- Giữ mock API đơn giản và dễ thay thế bằng API thật sau này.

Types:
Create hoặc update:
`types/inbox.ts`

Required types:
- Conversation
- ConversationMode
- ConversationSource
- ConversationStatus
- LeadTag
- LeadInfo
- ChatMessage
- ChatMessageSender
- ConversationFilter
- InboxActionResponse

Conversation shape phải hỗ trợ chính xác frontend UI hiện tại:

Conversation:
- id: string
- visitorName: string
- visitorEmail: string
- visitorPhone: string
- source: ConversationSource
- status: ConversationStatus
- mode: ConversationMode
- leadTag: LeadTag
- lastMessage: string
- lastMessageAt: string
- unreadCount: number
- isArchived: boolean
- emailNotificationEnabled: boolean
- lead?: LeadInfo
- messages: ChatMessage[]

LeadInfo:
- name: string
- email: string
- phone: string

ChatMessage:
- id: string
- sender: ChatMessageSender
- content: string
- createdAt: string
- isSystemEvent?: boolean
- type?: 'text' | 'system' | string

ConversationFilter:
- search: string
- type: 'all' | 'unread' | 'archived' | 'new_lead' | 'ai_paused'

InboxActionResponse:
- success: boolean
- message?: string
- messageId?: string

Allowed ConversationMode:
- ai_active
- human_takeover
- ai_paused

Allowed ConversationStatus:
- unread
- read
- archived

Allowed ConversationSource:
- qr
- link
- form

Allowed LeadTag:
- new_lead
- interested
- needs_reply
- none

Allowed ChatMessageSender:
- visitor
- ai
- owner
- system

Suggested file structure:
- app/dashboard/inbox/page.tsx
- components/dashboard/DashboardSidebar.tsx
- components/inbox/PersonaInboxPage.tsx
- components/inbox/ConversationList.tsx
- components/inbox/ConversationCard.tsx
- components/inbox/TranscriptViewer.tsx
- components/inbox/ChatMessageBubble.tsx
- components/inbox/CustomerInfoPanel.tsx
- components/inbox/ConfirmActionModal.tsx
- components/ui/Toast.tsx
- lib/mock-inbox-api.ts
- types/inbox.ts

Nếu `DashboardSidebar` hoặc `Toast` đã tồn tại, hãy reuse cẩn thận.
Chỉ chỉnh sửa shared components nếu thật sự cần thiết.
Không làm hỏng các page hiện có.

UX requirements:
- Toàn bộ text hiển thị trên UI phải là tiếng Việt.
- Giữ giao diện sát screenshot.
- Không overbuild vượt quá screenshot.
- Conversation list phải scroll được.
- Transcript phải scroll được.
- Chat input phải nằm cố định ở phía dưới.
- Dùng toast feedback cho gửi message và thay đổi takeover.
- Chỉ dùng confirmation modal cho Human Takeover on/off.
- Dùng hover states nhẹ.
- Không hiển thị raw technical errors.

Manual verification checklist:
Sau khi implement, tôi phải có thể:

1. Mở `/dashboard/inbox`.
2. Thấy dark sidebar với “Quản lý tin nhắn” đang active.
3. Thấy “Hộp thư Persona” và “4 hội thoại”.
4. Thấy search input và filter chips.
5. Thấy đúng 4 mock conversations.
6. Thấy Labubu được selected mặc định.
7. Thấy khu vực chat transcript nền sáng.
8. Thấy chat header màu xanh.
9. Thấy messages của Labubu khớp screenshot.
10. Thấy panel bên phải “Thông tin khách”.
11. Click “Tiếp quản hội thoại” và confirm.
12. Thấy banner AI paused.
13. Type và gửi owner message.
14. Click “Trả lại cho AI” và confirm.
15. Xác nhận layout vẫn sát với screenshot đã cung cấp.