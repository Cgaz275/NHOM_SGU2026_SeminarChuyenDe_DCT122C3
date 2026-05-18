You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Use the existing frontend project folder casing.
Do not create a duplicated `Frontend` / `FrontEnd` folder.

Do not break existing routes:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/ai-twin`
- `/dashboard/qr-manager`
- `/login`
- `/register`

Task:
Rebuild the `/dashboard/inbox` page based on the provided screenshot.

This page is a Persona Inbox screen where the card owner can view visitor conversations and basic customer contact information.

Route:
`/dashboard/inbox`

Important language requirement:
All visible UI text must be Vietnamese.
Code, component names, variable names, and file names can remain English.

Do not implement real backend logic.
Use mock data and local React state only.
Do not connect database, authentication, realtime service, AI API, email service, or notification service.

Visual direction:
Follow the screenshot closely:
- Dark dashboard sidebar on the left
- Dark conversation list column
- Light chat transcript area in the center
- Blue chat header
- Dark right customer information panel
- Search input and filter chips above conversation list
- Chat input fixed at the bottom of chat area
- Minimal, clean dashboard UI
- Do not overbuild features that are not visible in the screenshot

Dashboard sidebar:
Use the same dashboard sidebar style as existing dashboard screens.

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
Use a 4-column desktop layout:
1. Sidebar
2. Conversation list
3. Chat transcript
4. Customer info panel

Recommended widths:
- Sidebar: around 220px
- Conversation list: around 300px
- Chat transcript: flexible
- Customer info panel: around 260px

Mobile:
- Keep it simple.
- Stack views or allow horizontal layout fallback.
- Conversation list and chat area should not visually break.
- Chat messages should remain readable.

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

Conversation item should show:
- Avatar initials
- Visitor name
- Email or phone if available
- Last message preview
- Last message time
- Small status badges

Mock conversations:
Create exactly 4 conversations like the screenshot:

1. Labubu
Email:
labubu@gmail.com
Phone:
0700700707
Last message:
“Cho tôi xin thông tin liên hệ.”
Time:
“32 phút trước”
Badges:
- “AI đang trả lời”
- “Lead mới”

2. Minh Anh
Email:
minhanh@example.com
Phone:
0912345678
Last message:
“Dạ, em cảm ơn anh.”
Time:
“2 giờ trước”
Badges:
- “Người thật tiếp quản”
- “Có nhu cầu hợp tác”

3. Khách ẩn danh
Email:
empty
Phone:
empty
Last message:
“Kể cho tôi nghe về Anthony đi.”
Time:
“5 giờ trước”
Badges:
- “AI đang trả lời”

4. Công ty ABC
Email:
contact@abc.vn
Phone:
0281234567
Last message:
“Báo giá dịch vụ làm web.”
Time:
“1 ngày trước”
Badges:
- “AI tạm dừng”
- “Cần phản hồi”

Selected conversation:
Default selected conversation should be “Labubu”.
Selected item should have a blue left border or blue highlight like the screenshot.

Chat transcript area:

Header:
- Visitor name
- Source badge
- Status text
- Button text:
  “Tiếp quản hội thoại”
- Three-dot menu icon

For the selected Labubu conversation:
Visitor name:
“Labubu”

Source badge:
“QR”

Status:
“Chưa đọc”

Chat area:
Use light background, close to white or #F5F5F5.

Message bubble rules:
- Visitor messages align left
- AI messages align right
- Visitor bubbles are black/dark
- AI bubbles are light blue
- Keep message bubbles compact like the screenshot

Sender labels are not necessary inside bubbles unless already visually useful.

Default messages for Labubu:
Visitor:
“Xin chào, bạn là AI hả?”

AI:
“Mình là AI Twin của Anthony. Mình có thể trả lời về kỹ năng, dự án và kinh nghiệm của Anthony.”

Visitor:
“Cho tôi xin thông tin liên hệ.”

Chat input:
At bottom of transcript.

Placeholder:
“Bật Tiếp quản để nhắn trực tiếp với khách.”

Send button:
Use a send icon button.
The input can be disabled by default if AI is still active.

Human takeover:
Keep this simple.

When clicking “Tiếp quản hội thoại”:
- Show confirmation modal.

Modal title:
“Tiếp quản hội thoại?”

Modal message:
“Khi tiếp quản, AI sẽ tạm dừng trả lời và bạn có thể nhắn trực tiếp với khách.”

Buttons:
- “Hủy”
- “Tiếp quản”

After confirming:
- Change status badge to “Người thật tiếp quản”
- Change header button to “Trả lại cho AI”
- Enable chat input
- Input placeholder becomes:
  “Nhập tin nhắn với tư cách chủ thẻ...”
- Show a small banner above messages:
  “Chủ thẻ đang trực tiếp hỗ trợ. AI đã tạm dừng trong hội thoại này.”

When typing and sending a message:
- Add a new owner message aligned right with a stronger blue bubble.
- Clear the input.
- Show toast:
  “Đã gửi tin nhắn.”

When clicking “Trả lại cho AI”:
- Show confirmation modal.

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

Show:
- Large circular avatar initial
- Visitor name
- Email
- Phone number

For Labubu:
Name:
“Labubu”

Email:
“labubu@gmail.com”

Phone:
“0700700707”

Use icons for email and phone if available.

Do not add extra lead management actions unless necessary.
Do NOT implement:
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
Implement only simple states:
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
Create or update:
`lib/mock-inbox-api.ts`

Export Promise-based mock functions:
- getConversations()
- getConversationById(conversationId)
- toggleHumanTakeover(conversationId, enabled)
- sendOwnerMessage(conversationId, message)

Rules:
- Use artificial delay.
- Do not use random errors.
- Keep mock API simple and easy to replace later.

Types:
Create or update:
`types/inbox.ts`

Required types:
- Conversation
- ConversationMode
- ConversationSource
- ConversationStatus
- LeadTag
- ChatMessage
- ChatMessageSender

Suggested Conversation shape:
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
- messages

Suggested ChatMessage shape:
- id
- sender
- content
- createdAt

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

Allowed ChatMessageSender:
- visitor
- ai
- owner

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

If `DashboardSidebar` or `Toast` already exists, reuse it carefully.
Only modify shared components if necessary.
Do not break existing pages.

UX requirements:
- All visible UI text must be Vietnamese.
- Keep the interface close to the screenshot.
- Do not overbuild beyond the screenshot.
- Conversation list should be scrollable.
- Transcript should be scrollable.
- Chat input should stay at the bottom.
- Use toast feedback for sending message and takeover changes.
- Use confirmation modal only for Human Takeover on/off.
- Use subtle hover states.
- Do not show raw technical errors.

Manual verification checklist:
After implementation, I should be able to:
1. Open `/dashboard/inbox`.
2. See the dark sidebar with “Quản lý tin nhắn” active.
3. See “Hộp thư Persona” and “4 hội thoại”.
4. See the search input and filter chips.
5. See exactly 4 mock conversations.
6. See Labubu selected by default.
7. See the light chat transcript area.
8. See the blue chat header.
9. See Labubu’s messages matching the screenshot.
10. See the right “Thông tin khách” panel.
11. Click “Tiếp quản hội thoại” and confirm.
12. See the AI paused banner.
13. Type and send an owner message.
14. Click “Trả lại cho AI” and confirm.
15. Confirm the layout stays close to the provided screenshot.