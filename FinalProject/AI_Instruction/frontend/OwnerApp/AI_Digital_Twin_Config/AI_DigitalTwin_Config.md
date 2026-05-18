You are a senior frontend engineer and UI/UX designer.

Continue working inside the existing Next.js 15 App Router project.

IMPORTANT:
Use the existing frontend project folder casing. Do not create a duplicated `Frontend` / `FrontEnd` folder.

Do not break existing routes:
- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/qr-manager`
- `/dashboard/inbox`
- `/login`
- `/register`

Task:
Rebuild the `/dashboard/ai-twin` page based on the provided screenshots.

This page is the AI Digital Twin configuration page for the card owner.
The goal is to recreate the current dark dashboard UI, but convert all visible UI text to Vietnamese.

Route:
`/dashboard/ai-twin`

Important language requirement:
All visible UI text must be Vietnamese.
Code, component names, variable names, and file names can remain English.

Do not implement real backend logic.
Use mock data and local React state only.
Do not connect database, authentication, AI API, file upload, or real training logic.

Visual direction:
Follow the screenshots closely:
- Dark full-screen dashboard layout
- Left sidebar with SEMINAR logo
- Sidebar items:
  - Manage Profile
  - Manage Persona
  - Manage QR
  - Manage Messages
- Main content on the right
- Page title and subtitle
- Two tabs:
  - Persona
  - Knowledge Base
- Rounded dark cards
- Thin borders
- Blue active states
- Dark input fields
- Minimal, clean dashboard style

Translate sidebar text to Vietnamese:
- Manage Profile → Quản lý hồ sơ
- Manage Persona → Quản lý Persona
- Manage QR → Quản lý QR
- Manage Messages → Quản lý tin nhắn

Active sidebar item:
- “Quản lý Persona”

Page header:
Title:
“Cấu hình AI Digital Twin”

Subtitle:
“Cấu hình cách trợ lý AI giới thiệu, phản hồi và sử dụng thông tin cá nhân của bạn.”

Tabs:
1. “Persona”
2. “Kho kiến thức”

Tab 1: Persona

This tab contains 2 main cards:

Card 1: AI Identity

Vietnamese title:
“Danh tính AI”

Vietnamese description:
“Cấu hình cách AI giới thiệu bản thân với người truy cập.”

Fields:
1. Public AI Display Name
Label:
“Tên hiển thị công khai của AI”

Default value:
“AI Twin của Anthony”

2. Default Greeting Message
Label:
“Tin nhắn chào mặc định”

Default value:
“Xin chào, tôi là AI Twin của Anthony. Bạn có thể hỏi tôi về kỹ năng, dự án, kinh nghiệm hoặc khả năng hợp tác.”

Card 2: AI Personality

Vietnamese title:
“Tính cách AI”

Vietnamese description:
“Chọn phong cách phản hồi chính của trợ lý AI.”

Tone options:
- “Chuyên nghiệp”
- “Thân thiện”
- “Ngắn gọn”
- “Chi tiết”
- “Kỹ thuật”
- “Tự tin”
- “Khiêm tốn”

Behavior:
- User can select one tone.
- Selected tone has blue border/background accent and check icon.
- Default selected tone: “Chuyên nghiệp”.

Tab 2: Knowledge Base

Vietnamese tab title:
“Kho kiến thức”

This tab contains 4 cards:

1. Skills
Vietnamese title:
“Kỹ năng”

Add button:
“Thêm kỹ năng”

Empty state:
“Chưa có kỹ năng nào.”

Example existing item:
“React.js”

Actions:
- Edit icon
- Delete icon

2. Experience
Vietnamese title:
“Kinh nghiệm”

Add button:
“Thêm kinh nghiệm”

Empty state:
“Chưa có kinh nghiệm nào.”

Actions:
- Edit icon
- Delete icon

3. Projects
Vietnamese title:
“Dự án”

Add button:
“Thêm dự án”

Empty state:
“Chưa có dự án nào.”

Actions:
- Edit icon
- Delete icon

4. Services
Vietnamese title:
“Dịch vụ”

Add button:
“Thêm dịch vụ”

Empty state:
“Chưa có dịch vụ nào.”

Actions:
- Edit icon
- Delete icon

Important:
Only implement the sections visible in the screenshots:
- Persona tab
- Knowledge Base tab
- AI Identity card
- AI Personality card
- Skills card
- Experience card
- Projects card
- Services card

Do NOT implement:
- Prompt Rules
- Guardrails
- Test Chat
- Publish AI
- Train AI
- AI status bar
- FAQ section
- PDF upload
- DOCX upload
- RAG upload
- Real AI API
- Real database
- Real backend
- Voice chat
- Payment
- Booking
- NFC integration

Add/Edit behavior:
Use simple modal forms for adding and editing items.

Add Skill Modal:
Title:
“Thêm kỹ năng”

Fields:
- “Tên kỹ năng”
- “Mô tả”

Buttons:
- “Hủy”
- “Lưu”

Add Experience Modal:
Title:
“Thêm kinh nghiệm”

Fields:
- “Tên công ty”
- “Vai trò”
- “Thời gian”
- “Mô tả”

Buttons:
- “Hủy”
- “Lưu”

Add Project Modal:
Title:
“Thêm dự án”

Fields:
- “Tên dự án”
- “Mô tả”
- “Liên kết dự án”

Buttons:
- “Hủy”
- “Lưu”

Add Service Modal:
Title:
“Thêm dịch vụ”

Fields:
- “Tên dịch vụ”
- “Mô tả”
- “Ghi chú giá”

Buttons:
- “Hủy”
- “Lưu”

Edit behavior:
- Clicking edit opens the same modal with existing values.
- Modal title should become:
  - “Chỉnh sửa kỹ năng”
  - “Chỉnh sửa kinh nghiệm”
  - “Chỉnh sửa dự án”
  - “Chỉnh sửa dịch vụ”

Delete behavior:
- Delete can use a simple confirmation modal.

Delete confirmation modal:
Title:
“Xóa mục này?”

Message:
“Hành động này không thể hoàn tác.”

Buttons:
- “Hủy”
- “Xóa”

Toast messages:
Use Vietnamese messages:
- “Đã lưu thay đổi.”
- “Đã thêm thành công.”
- “Đã cập nhật thành công.”
- “Đã xóa thành công.”

Suggested file structure:
- app/dashboard/ai-twin/page.tsx
- components/dashboard/DashboardSidebar.tsx
- components/ai-twin/AITwinConfigPage.tsx
- components/ai-twin/AITwinTabs.tsx
- components/ai-twin/PersonaSection.tsx
- components/ai-twin/ToneSelector.tsx
- components/ai-twin/KnowledgeBaseSection.tsx
- components/ai-twin/KnowledgeCard.tsx
- components/ai-twin/KnowledgeItemModal.tsx
- components/ai-twin/ConfirmDeleteModal.tsx
- components/ui/Toast.tsx
- types/ai-twin.ts
- lib/mock-ai-twin-api.ts

Types:
Create or update `types/ai-twin.ts`.

Required types:
- AITwinConfig
- ToneOption
- KnowledgeBase
- SkillItem
- ExperienceItem
- ProjectItem
- ServiceItem
- KnowledgeItemType

Suggested AITwinConfig shape:
- id
- ownerName
- aiDisplayName
- greetingMessage
- tone
- knowledgeBase
- updatedAt

Suggested KnowledgeBase shape:
- skills
- experiences
- projects
- services

Mock API:
Create or update `lib/mock-ai-twin-api.ts`.

Export Promise-based mock functions:
- getAITwinConfig()
- saveAITwinConfig(config)
- addKnowledgeItem(type, item)
- updateKnowledgeItem(type, itemId, item)
- deleteKnowledgeItem(type, itemId)

Rules:
- Use artificial delay.
- Do not make random errors.
- Keep mock API simple and easy to replace later.

Layout details:
Desktop:
- Sidebar width around 220px.
- Main content centered with max width around 900px to 1000px.
- Use spacing similar to the screenshot.
- Cards should have dark background, rounded corners, subtle border.
- Inputs should be dark with light text.
- Active tab should use blue text and blue underline.

Mobile:
- Sidebar should collapse or become a top navigation.
- Main content should have proper padding.
- Cards should stack vertically.
- Modals should be responsive.

Manual verification checklist:
After implementation, I should be able to:
1. Open `/dashboard/ai-twin`.
2. See the dark dashboard layout.
3. See the Vietnamese sidebar.
4. See “Quản lý Persona” as the active sidebar item.
5. See the Vietnamese page title and subtitle.
6. Switch between “Persona” and “Kho kiến thức”.
7. Edit AI display name.
8. Edit default greeting message.
9. Select AI tone.
10. See the selected tone highlighted in blue.
11. See the Knowledge Base sections:
    - Kỹ năng
    - Kinh nghiệm
    - Dự án
    - Dịch vụ
12. Add, edit, and delete skills.
13. Add, edit, and delete experiences.
14. Add, edit, and delete projects.
15. Add, edit, and delete services.
16. See Vietnamese empty states.
17. See Vietnamese toast messages.
18. Confirm mobile layout does not break.

Keep the implementation practical and close to the provided screenshots.
Do not overbuild the feature beyond what appears in the screenshots.